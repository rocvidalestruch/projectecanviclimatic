class StorageManager {
    constructor() {
        this.dbName = 'CanviClimaticDB';
        this.dbVersion = 1;
        this.storeName = 'gameHistory';
        this.db = null;
    }

    setLocal(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
            return true;
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.error("StorageManager: LocalStorage quota exceeded!", e);
                alert("Atenció: No s'ha pogut guardar l'estat localment per falta d'espai.");
            } else {
                console.error("StorageManager: Error saving to LocalStorage", e);
            }
            return false;
        }
    }


    getLocal(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error("StorageManager: Error reading/parsing from LocalStorage", e);
            return null;
        }
    }




    async initDB() {
        if (this.db) return this.db;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error("StorageManager: IndexedDB error", event.target.error);
                reject(event.target.error);
            };
        });
    }


    async logHistory(data) {
        try {
            const db = await this.initDB();
            const tx = db.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);
            store.add(data);
            return tx.complete;
        } catch (e) {
            console.error("StorageManager: Failed to log history", e);
        }
    }


    async getHistory() {
        try {
            const db = await this.initDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(this.storeName, 'readonly');
                const store = tx.objectStore(this.storeName);
                const request = store.getAll();

                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        } catch (e) {
            console.error("StorageManager: Failed to get history", e);
            return [];
        }
    }
}

const storageManager = new StorageManager();

window.StorageManager = storageManager;
