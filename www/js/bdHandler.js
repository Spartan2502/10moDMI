// dbHandler.js
async function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('FinalProject', 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;

            const productos = db.createObjectStore('producto', { keyPath: 'id', autoIncrement: true });
            productos.createIndex('nombre', 'nombre', { unique: false });
            productos.createIndex('cantidad', 'cantidad', { unique: false });
            productos.createIndex('precio', 'precio', { unique: false });

            const clientes = db.createObjectStore('cliente', { keyPath: 'id', autoIncrement: true });
            clientes.createIndex('nombre', 'nombre', { unique: false });
            clientes.createIndex('apellido', 'apellido', { unique: false });
            clientes.createIndex('credito', 'credito', { unique: false });

            const compras = db.createObjectStore('compras', { keyPath: 'id', autoIncrement: true });
            compras.createIndex('id_producto', 'id_producto', { unique: false });
            compras.createIndex('id_cliente', 'id_cliente', { unique: false });
            compras.createIndex('fecha', 'fecha', { unique: false });
        };

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

window.dbHandler = {
    openDB
};
