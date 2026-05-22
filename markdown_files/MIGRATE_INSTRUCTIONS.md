# 🔄 Nihongo Learning - Data Migration Guide

## The Problem

You tried to run `npm run db:migrate-all` but got a PostgreSQL connection error. This is because:

1. The `db:migrate-all` script is designed for **PostgreSQL databases** (server-side)
2. Your app uses **IndexedDB** (browser-based storage)
3. There's no PostgreSQL server running in your Docker container

## Solution

Since your app uses IndexedDB in the browser, you have **3 options** to migrate all data:

---

## ✅ Option 1: Use Browser Console (Recommended & Easiest)

1. **Open your Nihongo Learning app** in Chrome, Firefox, or Edge
2. **Open Developer Tools**: Press `F12` or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Opt+I` (Mac)
3. Go to the **Console** tab
4. **Copy and paste** this code, then press Enter:

```javascript
// Load the migration data and seed function
import('./src/data/migrationVocabulary.ts').then(async (module) => {
  const { seedMigrationData, migrationVocabulary } = module;
  
  if (confirm(`⚠️ MIGRATE ALL DATA: This will REPLACE all existing vocabulary with ${migrationVocabulary.length} sample data items. Are you sure?`)) {
    try {
      // Get the storage instance from your app
      const storage = window.storage || (await import('./src/services/IndexedDBVocabularyStorage.ts')).indexedDBStorage;
      
      // Clear and seed
      await storage.clear?.();
      await seedMigrationData(storage);
      
      // Refresh the page
      alert(`✅ Database migrated! ${migrationVocabulary.length} vocabulary items loaded.`);
      location.reload();
    } catch (error) {
      alert(`❌ Migration failed: ${error.message}`);
      console.error('Migration error:', error);
    }
  }
}).catch(err => {
  console.error('Failed to load module:', err);
  alert('❌ Could not load migration data. Please try Option 2 or 3.');
});
```

**Note**: If you get a module import error, try this alternative:

```javascript
// Alternative if module import doesn't work
const seedMigrationData = window.seedMigrationData || (() => {
  alert('seedMigrationData not available. Please use Option 2 or 3.');
});
seedMigrationData();
```

---

## 🌐 Option 2: Use the Browser Migration Tool (HTML Page)

A standalone HTML migration tool has been created:

1. **Copy** the file `db/migrate-browser.html` to your app's root directory
2. **Open** this HTML file directly in your browser (double-click or drag into browser)
3. **Follow the on-screen instructions** to migrate data

**Important**: The HTML tool needs access to the vocabulary data. You have two sub-options:

### Option 2A: Pre-load Data (Recommended)

First, create a JSON file from the migration data:

```bash
# Extract the vocabulary array (requires Node.js and manual editing)
# Or use this Python one-liner if you have Python:
python3 -c "
import re
with open('./src/data/migrationVocabulary.ts', 'r') as f:
    content = f.read()
    # Extract array content
    match = re.search(r'export const migrationVocabulary.*?= (\[.*?\]);', content, re.DOTALL)
    if match:
        vocab_array = match.group(1)
        # Remove TypeScript types and export
        vocab_array = re.sub(r': \w+', '', vocab_array)
        with open('./db/migrationVocabulary.json', 'w') as out:
            out.write(vocab_array)
        print('✅ Created migrationVocabulary.json')
"
```

Then place both `migrate-browser.html` and `migrationVocabulary.json` in the same directory and open the HTML file.

### Option 2B: Open in App Directory

1. Make sure your app is running on `http://localhost:5173` (or similar)
2. Place `migrate-browser.html` in your app's `public` folder
3. Access it via `http://localhost:5173/migrate-browser.html`
4. The page will try to load data from the parent window

---

## 📦 Option 3: Use PostgreSQL (For Server Deployments)

If you **do** have a PostgreSQL database and want to use it:

1. **Start PostgreSQL** or ensure it's running
2. **Set the connection string**:
   ```bash
   export DATABASE_URL=postgresql://username:password@localhost:5432/nihongo_learning
   npm run db:migrate-all
   ```

3. **Or use the full command**:
   ```bash
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/simstudio npm run db:migrate-all
   ```

**Note**: Replace the connection string with your actual PostgreSQL credentials.

---

## 📋 What Each Option Does

| Option | Method | Requires | Best For |
|--------|--------|----------|----------|
| 1 | Browser Console | Running app in browser | Quick migration |
| 2A | HTML + JSON | Browser, JSON file | Offline migration |
| 2B | HTML in App | Running dev server | Integration with app |
| 3 | PostgreSQL CLI | PostgreSQL server | Production deployments |

---

## 🔍 Verification

After migration, verify the data was loaded:

1. Open your app
2. Go to 📚 Vocabulary section
3. Check if all units appear with vocabulary items
4. The total should be **272+ vocabulary items** across Units 1-21

---

## ⚠️ Important Notes

- **Backup your data**: Migration will **REPLACE** all existing data
- **IndexedDB is browser-specific**: Data is stored per browser and per origin
- **No PostgreSQL needed**: Your app works fine with IndexedDB for local development
- **The button is removed**: The "🔄 Migrate All Data" button no longer appears in the UI

---

## 🚨 Troubleshooting

### Error: "Module not found" or "Import failed"
→ Use Option 2 or ensure your app is built with Vite in dev mode

### Error: "storage is not defined"
→ Make sure you're on the Vocabulary page where storage is initialized

### Error: "IndexedDB not available"
→ Run in a real browser (not Node.js or some containers)

### Error: "Connection refused" (PostgreSQL)
→ Your PostgreSQL server is not running. Use Option 1 or 2 instead.

---

## 🎯 Quick Start (Most Users)

**Just use Option 1**:

1. Open your app in Chrome
2. Press `F12` to open DevTools
3. Go to Console tab
4. Copy-paste the JavaScript code from Option 1
5. Press Enter and confirm the migration
6. Refresh the page

You're done! 🎉
