
async function addProduct(product) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['producto'], 'readwrite');
        const objectStore = transaction.objectStore('producto');
        const request = objectStore.add(product);

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

// Listar todos los productos
async function getAllProducts() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['producto']);
        const objectStore = transaction.objectStore('producto');
        const request = objectStore.getAll();

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

async function getProduct(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['producto']);
        const objectStore = transaction.objectStore('producto');
        const request = objectStore.get(Number(id));

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}


async function updateProduct(id, product) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['producto'], 'readwrite');
        const objectStore = transaction.objectStore('producto');
        product.id = Number(id);  // Asegurarse de que la propiedad id está presente en el objeto
        const request = objectStore.put(product);

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

// Eliminar un producto
async function deleteProduct(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['producto'], 'readwrite');
        const objectStore = transaction.objectStore('producto');
        const request = objectStore.delete(id);

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

// Asignar las funciones al objeto global
window.dbHandler = {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct, 
    getProduct
};

