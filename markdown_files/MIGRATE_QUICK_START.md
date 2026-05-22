# 🚀 Quick Start: Migrate All Vocabulary Data

## The Issue

You tried to run `npm run db:migrate-all` but got a **PostgreSQL connection error** because:
- Your app uses **IndexedDB** (browser storage), not PostgreSQL
- The CLI script is designed for PostgreSQL servers
- Your Docker container doesn't have PostgreSQL running

## ✅ Simple Solution: Use Browser Console

**This is the easiest method for most users:**

### Step 1: Open your app in Chrome
Run your app with `npm run dev` and open it in Chrome at `http://localhost:5173`

### Step 2: Open Developer Tools
- **Windows/Linux**: Press `F12` or `Ctrl+Shift+I`
- **Mac**: Press `Cmd+Opt+I`

### Step 3: Navigate to Vocabulary Page
Click on 📚 Vocabulary in your app to ensure storage is initialized.

### Step 4: Run Migration in Console
Copy and paste **one of these commands** into the Console tab and press Enter:

---

## 🎯 Method A: Direct Console Command (Recommended)

```javascript
// Step 1: Check if storage is available
if (!window.appStorage) {
  // Expose storage from React app
  const reactApp = document.querySelector('#root')?.__reactFiberKey;
  // For Vite/React 18, try accessing the storage from the component
  const fiberNode = Object.values(document.querySelector('#root') || {}).find(n => n?.memoizedProps?.storage);
  if (fiberNode?.memoizedProps?.storage) {
    window.appStorage = fiberNode.memoizedProps.storage;
    console.log('✅ Storage exposed as window.appStorage');
  } else {
    console.log('⚠️ Storage not accessible. Try Method B or C.');
  }
}

// Step 2: Load and run migration
if (window.appStorage) {
  import('./src/data/migrationVocabulary.ts').then(async ({ seedMigrationData, migrationVocabulary }) => {
    if (confirm(`⚠️ MIGRATE ALL DATA: Replace all vocabulary with ${migrationVocabulary.length} items?`)) {
      try {
        await window.appStorage.clear?.();
        await seedMigrationData(window.appStorage);
        alert(`✅ Success! ${migrationVocabulary.length} items migrated.`);
        location.reload();
      } catch (e) {
        alert('❌ Error: ' + e.message);
      }
    }
  });
}
```

---

## 🔧 Method B: Import and Run Directly

If Method A doesn't work, try this simpler version:

```javascript
// Load migration module
import('./src/data/migrationVocabulary.ts').then(async (mod) => {
  const { seedMigrationData, migrationVocabulary } = mod;
  
  // Find storage from React internals
  const findStorage = () => {
    const root = document.querySelector('#root');
    if (!root) return null;
    
    // Try to find the App component
    const fiberKey = Object.keys(root).find(k => k.startsWith('__reactFiber'));
    if (!fiberKey) return null;
    
    let node = root[fiberKey];
    while (node) {
      if (node.memoizedProps?.storage) {
        return node.memoizedProps.storage;
      }
      node = node.return;
    }
    return null;
  };
  
  const storage = findStorage();
  if (!storage) {
    alert('❌ Cannot access storage. Please use Method C.');
    return;
  }
  
  if (confirm(`⚠️ MIGRATE ALL DATA: Replace ${migrationVocabulary.length} items?`)) {
    try {
      await storage.clear?.();
      await seedMigrationData(storage);
      alert(`✅ Success! ${migrationVocabulary.length} items migrated.`);
      location.reload();
    } catch (e) {
      alert('❌ Error: ' + e.message);
      console.error(e);
    }
  }
}).catch(err => {
  alert('❌ Failed to load migration data: ' + err.message);
});
```

---

## 📄 Method C: Use the HTML Migration Tool

1. **Open a new browser tab**
2. **Drag and drop** `db/migrate-browser.html` into the browser
3. **Or double-click** the file to open it directly
4. **Click "Start Migration"** and follow the prompts

**Note**: You may need to first create a JSON data file. See instructions below.

---

## 🔄 Method D: Manual IndexedDB Clear and Import

If all else fails, you can manually clear and re-import:

### Step 1: Clear existing data
```javascript
// In browser console
const clearDB = async () => {
  const dbName = 'NihongoLearningDB';
  await new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(dbName);
    request.onsuccess = resolve;
    request.onerror = reject;
  });
  console.log('✅ Database cleared');
  alert('Database cleared! Refresh the page to start fresh.');
};
clearDB();
```

### Step 2: Refresh and Load Sample Data
After clearing, refresh the page. The app should load sample data automatically on first run.

If it doesn't, the "Load Sample Vocabulary" button in the empty state will appear.

---

## 📝 What to Expect After Migration

✅ **272 vocabulary items** across Units 1-21  
✅ All sample vocabulary loaded  
✅ Custom lists and flashcards cleared (if any)  
✅ Fresh start with full dataset  

---

## ❓Troubleshooting

| Problem | Solution |
|---------|----------|
| `Module not found` | Make sure dev server is running (`npm run dev`) |
| `storage is undefined` | Navigate to Vocabulary page first |
| `IndexedDB not available` | Use a real browser (not Node.js) |
| `Import failed` | Use Method C (HTML tool) or Method D (manual) |
| `Connection refused` | You're trying PostgreSQL. Use browser methods instead. |

---

## 🎉 You're Done!

After successful migration:
1. ✅ The "🔄 Migrate All Data" button is **removed** from the UI
2. ✅ You can migrate anytime using these console commands
3. ✅ Data is safely stored in your browser's IndexedDB

**Need help?** Check `db/MIGRATE_INSTRUCTIONS.md` for detailed documentation.
