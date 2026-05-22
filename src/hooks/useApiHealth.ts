import { useState, useEffect, useCallback } from 'react';

// @ts-ignore - import.meta.env is a Vite feature
const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:3001/api';

export interface ApiHealthStatus {
  isHealthy: boolean;
  isLoading: boolean;
  error: string | null;
  retryCount: number;
}

/**
 * Hook to check if the API server is healthy
 * Automatically retries on failure
 */
export function useApiHealth(maxRetries: number = 15, intervalMs: number = 2000): ApiHealthStatus {
  const [status, setStatus] = useState<ApiHealthStatus>({
    isHealthy: false,
    isLoading: true,
    error: null,
    retryCount: 0,
  });

  const checkHealth = useCallback(async (retryCount: number = 0) => {
    try {
      const response = await fetch(`${API_BASE}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'healthy') {
          setStatus({
            isHealthy: true,
            isLoading: false,
            error: null,
            retryCount,
          });
          return true;
        }
      }

      // If not healthy, retry
      if (retryCount < maxRetries) {
        setStatus(prev => ({
          ...prev,
          isLoading: true,
          error: `Waiting for server... (attempt ${retryCount + 1}/${maxRetries})`,
          retryCount: retryCount + 1,
        }));
        setTimeout(() => checkHealth(retryCount + 1), intervalMs);
        return false;
      }

      setStatus({
        isHealthy: false,
        isLoading: false,
        error: 'Server is not responding. Please check if the backend is running.',
        retryCount,
      });
      return false;
    } catch (err) {
      if (retryCount < maxRetries) {
        setStatus(prev => ({
          ...prev,
          isLoading: true,
          error: `Waiting for server... (attempt ${retryCount + 1}/${maxRetries})`,
          retryCount: retryCount + 1,
        }));
        setTimeout(() => checkHealth(retryCount + 1), intervalMs);
        return false;
      }

      setStatus({
        isHealthy: false,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to connect to server',
        retryCount,
      });
      return false;
    }
  }, [maxRetries, intervalMs]);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return status;
}

/**
 * Check if API is healthy (one-time check)
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/health`);
    if (response.ok) {
      const data = await response.json();
      return data.status === 'healthy';
    }
    return false;
  } catch {
    return false;
  }
}
