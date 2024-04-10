let articulosCarrito = [];
const listaProductos = document.querySelector("#lista-productos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const carrito = document.querySelector('#carrito')


function agregarProducto(evt){
    //console.log(evt.target.classList.contains('agregar-carrito'))
    evt.preventDefault()
    if(evt.target.classList.contains('agregar-carrito')){
        //console.log(evt.target.parentElement.parentElement)
        const producto = evt.target.parentElement.parentElement
        //console.log(producto)
        leerDatosProducto(producto)
    }
}

function leerDatosProducto(item){
    //console.dir(item)
//console.log(item.querySelector('a').getAttribute('data-id'))
    const infoProducto = {
      imagen: item.querySelector("img").src,
      titulo: item.querySelector("h4").textContent,
      precio: item.querySelector(".precio span").textContent,
      id: item.querySelector("a").getAttribute("data-id"),
      cantidad: 1
    };
    //console.log(infoProducto);

    if(articulosCarrito.some( product => product.id === infoProducto.id)){
        const productos = articulosCarrito.map( prod => {
            if(prod.id === infoProducto.id) {
                let cantidad = parseInt(prod.cantidad)
                cantidad+=1
                prod.cantidad = cantidad
                return prod
            }else {
                return prod
            }
        })
        articulosCarrito = [...productos]
    } else {
        //articulosCarrito.push(infoProducto);
        articulosCarrito = [...articulosCarrito, infoProducto]
    }
    //console.log(articulosCarrito);
    dibujarCarritoHTML();
    //console.log(articulosCarrito);
}

function dibujarCarritoHTML(){
    limpiarHTML()
    articulosCarrito.forEach( producto => {
        const fila = document.createElement('tr')
        fila.innerHTML = `
        <td><img src="${producto.imagen}" width="100" /></td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td><a href="#" class="borrar-producto" data-id="${producto.id}">❌</a></td>
        `;
        contenedorCarrito.appendChild(fila)
    })
    sincronizarStorage();
}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function limpiarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
  articulosCarrito = [];
  sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

function eliminarProducto(evt){
    evt.preventDefault();
    if(evt.target.classList.contains('borrar-producto')){
        //console.log(evt.target.parentElement.parentElement);
        const producto = evt.target.parentElement.parentElement
        const productId = producto.querySelector('a').getAttribute('data-id')
        console.log(productId)
        articulosCarrito = articulosCarrito.filter( 
            (prod) => prod.id !== productId
        );
        dibujarCarritoHTML();
    }
}

listaProductos.addEventListener('click', agregarProducto)
vaciarCarrito.addEventListener('click', limpiarCarrito)
carrito.addEventListener('click', eliminarProducto)
window.addEventListener('DOMContentLoaded', ()=>{
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

    dibujarCarritoHTML();
})
