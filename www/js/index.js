document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    dbHandler.openDB();
}

var cursor = {
    id: -1,
    nombre: "",
    cantidad: -1
}

async function addProduct() {
    var nombre = document.getElementById("txtName").value;
    var cantidad = parseInt(document.getElementById("txtQuantity").value);
    var precio = parseFloat(document.getElementById("txtPrice").value);

    if (nombre == "" || nombre == null) {
        alert("Agrega un nombre al producto")
    } else if (cantidad > 0) {
        var res = confirm("¿ Deseas realmente agregar el producto " + nombre + " con la cantidad de " + cantidad + "?");
        if (res == true) {
            const id = await dbHandler.addProduct({ nombre, cantidad, precio });
            console.log('Producto añadido con ID:', id);
            $('#txtName').val("");
            $('#txtQuantity').val("");
            $('#txtPrice').val("");
        }
    } else {
        alert("Agrega una cantidad al producto")
    }
}

async function displayProduct() {
    const products = await dbHandler.getAllProducts();
    var lstProducts = $('#lstProducts');
    lstProducts.empty();
    for (var i = 0; i < products.length; i++) {
        var item = products[i];
        var a = $("<a />");
        var h3 = $("<h3 />").text("Nombre del producto: ");
        var h4 = $("<h4 />").text("Cantidad: ");
        var h5 = $("<h4 />").text("Precio: ");
        var p = $("<p />").text("id: ");
        var span1 = $("<span />").text(item.nombre);
        span1.attr("name", "nombre");
        var span2 = $("<span />").text(item.cantidad);
        span2.attr("name", "cantidad");
        var span3 = $("<span />").text(item.precio);
        span3.attr("name", "precio");
        var span4 = $("<span />").text(item.id);
        span4.attr("name", "id");
        h3.append(span1);
        h4.append(span2);
        h5.append(span3);
        p.append(span4);
        a.append(h3);
        a.append(h4);
        a.append(h5);
        a.append(p);
        var lista = $("<li/>");
        lista.attr("data-filtertext", item.nombre);
        lista.append(a);
        lstProducts.append(lista);
    }
    lstProducts.listview("refresh");
    lstProducts.on("tap", "li", function () {
        cursor.id = $(this).find("[name='id']").text();
        cursor.nombre = $(this).find("[name='nombre']").text();
        cursor.cantidad = $(this).find("[name='cantidad']").text();
        cursor.precio = $(this).find("[name='precio']").text();
        $("#popupUpdateDelete").popup("open");
    });
}


$(document).on("pagebeforeshow", "#loadpage", function () {
    displayProduct();
});
function updateProduct() {
    var nuevoNombre = $("#txtNewName").val();

    dbHandler.getProduct(cursor.id)
        .then(originalProduct => {

            const updatedProduct = {
                nombre: nuevoNombre,
                cantidad: originalProduct.cantidad,
                precio: originalProduct.precio
            };

            // Llamar a la función updateProduct de dbHandler
            dbHandler.updateProduct(cursor.id, updatedProduct)
                .then(() => {
                    // Actualizar la lista de productos
                    dbHandler.getAllProducts().then(displayProduct);
                    $.mobile.back(); // Cierra el diálogo y vuelve a la página anterior
                })
                .catch(error => {
                    console.log('Error al actualizar el producto:', error);
                });
        })
        .catch(error => {
            console.log('Error al recuperar el producto original:', error);
        });
}

function deleteProduct() {
    var res = confirm("Deseas eliminar el producto: " + cursor.nombre + "\ncon la cantidad de: " + cursor.cantidad);
    if (res == true) {
        var idToDelete = parseInt(cursor.id);
        dbHandler.deleteProduct(idToDelete)
            .then(() => {
                // Actualizar la lista de productos
                dbHandler.getAllProducts().then(displayProduct);
                $("#popupUpdateDelete").popup().popup("close"); // Inicializar y cerrar el popup
            })
            .catch(error => {
                console.log('Error al eliminar el producto:', error);
            });
    }
}

