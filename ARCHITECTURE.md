# 🏗️ Architecture Overview

## System Design

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                   │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  Flashcard  │  │  Mode Switch │  │  Vocabulary   │  │
│  │  Component  │  │  Component   │  │  Manager      │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│                    Business Logic Layer                  │
│  ┌─────────────────┐         ┌──────────────────────┐  │
│  │  Flashcard      │         │  Vocabulary Service  │  │
│  │  State Manager  │◄────────┤  (CRUD Operations)   │  │
│  └─────────────────┘         └──────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│                    Data Access Layer                     │
│  ┌──────────────────┐       ┌──────────────────────┐   │
│  │  Storage         │       │  API Client          │   │
│  │  Interface       │       │  (Future: REST API)  │   │
│  └────────┬─────────┘       └──────────────────────┘   │
│           │                                              │
│  ┌────────┴─────────┐                                   │
│  │  localStorage    │                                   │
│  │  Implementation  │                                   │
│  └──────────────────┘                                   │
└──────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Presentation Layer
- **Flashcard Component**: Displays card, handles flip animation
- **Mode Switch**: Toggle between learning modes
- **Vocabulary Manager**: CRUD interface for word management

### 2. Business Logic Layer
- **Flashcard State Manager**: 
  - Manages current card state (front/back, flipped)
  - Handles mode switching (VI→HIRA, HIRA→KANJI)
  - Navigation logic (next, previous, shuffle)
- **Vocabulary Service**: 
  - CRUD operations
  - Data validation
  - Business rules

### 3. Data Access Layer
- **Storage Interface**: Abstract storage contract
- **localStorage Implementation**: MVP storage solution
- **API Client**: Future database integration

## Data Flow

```
User Action → Component → Service → Storage → Component Update
     ↓
  UI Event → State Change → Persist → Re-render
```

## Design Patterns Used

1. **Repository Pattern**: Abstracted storage interface
2. **Service Layer**: Business logic separation
3. **State Management**: Controlled component state
4. **Factory Pattern**: Flashcard mode creation

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: CSS Modules (or Tailwind)
- **Storage**: localStorage (MVP) → REST API (v2)
- **Build**: Vite
- **State**: React hooks (useState, useEffect)

## Key Design Decisions

### 1. Extensibility
- Data model supports optional fields (kanji)
- Easy to add new modes
- Storage interface allows swapping implementations

### 2. Type Safety
- Full TypeScript coverage
- Strict type checking for vocabulary items
- Enum-based mode definitions

### 3. Performance
- Lazy loading vocabulary data
- Memoized components
- Efficient localStorage serialization

### 4. UX Considerations
- Smooth flip animations (CSS transforms)
- Keyboard navigation support
- Visual feedback on interactions
- Mobile-responsive design
