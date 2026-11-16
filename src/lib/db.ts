import type { Note } from '../types'
const DB_NAME = 'noteweave-db'
const STORE = 'documents'
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => { if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE, { keyPath: 'id' }) }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}
export async function getAll(): Promise<Note[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => { const req = db.transaction(STORE, 'readonly').objectStore(STORE).getAll(); req.onsuccess = () => resolve(req.result as Note[]); req.onerror = () => reject(req.error) })
}
export async function put(note: Note): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => { const tx = db.transaction(STORE, 'readwrite'); tx.objectStore(STORE).put(note); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error) })
}
export async function remove(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => { const tx = db.transaction(STORE, 'readwrite'); tx.objectStore(STORE).delete(id); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error) })
}
export async function replaceAll(notes: Note[]): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => { const tx = db.transaction(STORE, 'readwrite'); const store = tx.objectStore(STORE); store.clear(); notes.forEach(n => store.put(n)); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error) })
}
