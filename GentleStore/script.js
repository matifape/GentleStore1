/*categoria de productos

1- billeteras
2- cinturones
3- collares
4- perfumes
5- pulseras
6- relojes
7- anillos
8- anteojos


*/

document.addEventListener("DOMContentLoaded", function () {
  fetch("productos.json")
    .then((response) => response.json())
    .then((data) => {
      const contenedores = document.getElementById("contenedores");
      data.productos.forEach((producto) => {
        const contenedorProducto = document.createElement("div");
        contenedorProducto.classList.add("contenedorProducto");

        const enlace = document.createElement("a");
        enlace.href = "detalles_producto.html?id=" + producto.id_producto;

        const imagen = document.createElement("img");
        imagen.src = producto.imagen_producto;
        imagen.alt = producto.nombre_producto;

        const nombre = document.createElement("h4");
        nombre.textContent = producto.nombre_producto;

        const descrip = document.createElement("p");
        descrip.classList.add("descrip");
        descrip.textContent = "Descripción: " + producto.descripcion_producto;

        const precio = document.createElement("p");
        precio.classList.add("precio");
        precio.textContent = "Precio: $" + producto.precio_producto.toFixed(3);

        enlace.appendChild(imagen);
        contenedorProducto.appendChild(enlace);
        contenedorProducto.appendChild(nombre);
        contenedorProducto.appendChild(descrip);
        contenedorProducto.appendChild(precio);

        contenedores.appendChild(contenedorProducto);
      });
    })
    .catch((error) => console.error("Error al cargar el archivo JSON:", error));
});

let productosJSON;

fetch("productos.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo JSON");
    }
    return response.json();
  })
  .then((data) => {
    productosJSON = data;
    console.log("Archivo JSON cargado exitosamente:", productosJSON);

    
    document
      .getElementById("categoriaSelect")
      .addEventListener("change", function () {
        
        const categoriaSeleccionada = this.value;

        
        filtrarPorCategoria(categoriaSeleccionada);
      });
  })
  .catch((error) => console.error("Error al cargar el archivo JSON:", error));

function filtrarPorCategoria(categoriaSeleccionada) {
  
  if (!productosJSON) {
    console.error("El array de productos no está definido o no ha sido cargado correctamente.");
    return;
  }

  const productosFiltrados = productosJSON.filter((producto) => {
    
    return producto.categoria_producto === categoriaSeleccionada;
  });

  
  mostrarResultados(productosFiltrados);
}


function mostrarResultados(resultados) {
  
  console.log("Resultados filtrados:", resultados);
}


document.getElementById("boton_promociones").addEventListener("click", function (){
  window.location.href = "promociones.html"
})