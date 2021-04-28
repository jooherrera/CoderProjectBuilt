"use strict";
class ProductModel {
    constructor() {
        let carrito = [];
        localStorage.getItem("Carrito") ? carrito = JSON.parse(localStorage.getItem("Carrito")) : localStorage.setItem("Carrito", "");
        this.carrito = carrito.map(producto => new Product(producto.title, producto.image, producto.price));
    }
    guardarProducto() {
        localStorage.setItem("Carrito", JSON.stringify(this.carrito));
        location.href = "#/carrito";
    }
    agregarProducto(producto) {
        this.carrito.push(new Product(producto.title, producto.image, producto.price));
        this.guardarProducto();
    }
    searchProducto(data, palabra) {
        let filter = data.title[0].Productos.filter(el => {
            const lower = el.title.toLowerCase();
            if (lower.includes(palabra)) {
                return el.title.toLowerCase();
            }
        });
        return filter;
    }
    eliminarProducto() {
        let deleteNumber = parseInt(sessionStorage.getItem("delete"));
        console.log(deleteNumber);
        this.carrito = this.carrito.filter((_producto, idx) => {
            return idx != deleteNumber;
        });
        console.table(this.carrito);
        this.guardarProducto();
        location.reload();
    }
}
class ProductVista {
    home(padre, data, _callback) {
        let element;
        let html = "";
        html = `<div class=" row  row-cols-md-3 g-4 text-center mt-0">`;
        for (element of data.title) {
            html += ` 
            <div class="col-6">
              <div class="card">
                <div class="">
                  <img src="${element.image}" class="card-img-top img-thumb" alt="item">
                </div>
                <div class="card-footer itemButton" id="${element.id}">
                  <h5 class="card-title">${element.title}</h5>
                </div>
              </div>
            </div>
       `;
            $(padre).html(html);
        }
        html = ` </div>`;
        for (const element of $(".itemButton")) {
            $(element).on('click', () => {
                switch (element.id) {
                    case "0":
                        sessionStorage.setItem("item", "0");
                        location.href = "#/productos";
                        break;
                    case "1":
                        sessionStorage.setItem("item", "1");
                        location.href = "#/productos";
                        break;
                    default:
                        location.href = "#/construccion";
                        break;
                }
            });
        }
    }
    ;
    carrito(padre, carrito, Carro, callbackDelete, _callback) {
        let element;
        if (!carrito) {
            $(padre).html("");
        }
        let html = "";
        for (element of carrito) {
            html += `
        <div class="container m-auto row text-center mt-5 bg-white p-3 border-custom">
          <div class=" bg-white col-5 rounded ">
           <img src="${element.image}" class="card-img-top img-thumb" alt="...">
          </div>
          <div class="col-7  container bg-white rounded mx-auto  d-flex flex-column justify-content-around">
            <h4 class="fs-3 ">${element.title}</h4>
            <hr class="w-75 mx-auto ">
            <h2>$ ${element.price}</h2>
            <button class="btnDelete" id="${carrito.indexOf(element)}">
             <i class="fas fa-times-circle text-danger fs-1" ></i>
            </button>
          </div>
        </div>
      `;
        }
        $(padre).html(html);
        // $(padre).append(seguirComprandoBtn)
        $(padre).append(`
     <div class="container my-5 text-center" id="seguirComprandoBtn" >
      <button class="btn btn-primary fs-4 fw-bold" id="seguirComprando"><i class="fas fa-chevron-left"></i> SEGUIR COMPRANDO <i class="fas fa-chevron-right"></i></button>
     </div>
    `);
        $(padre).append(`
      <div class="container mb-5" id="contentPagar" >
        <div class="row text-center mt-5 bg-white p-3 border-custom">
          <div class="col-6 container bg-white rounded">
            <h3>Total a Pagar</h3>
            <hr class="w-75 mx-auto">
            <h2>$${Carro.total}</h2>
            <hr class="w-75 mx-auto">
            <button class="btn btn-success fs-3 w-100"  data-bs-toggle="modal" data-bs-target="#exampleModalPayment" id="payment" >Pagar</button>
          </div>
        </div>
      </div>
    `);
        $('#seguirComprando').on('click', () => {
            window.history.go(-2);
        });
        for (const element of $(".btnDelete")) {
            $(element).on('click', () => {
                sessionStorage.setItem("delete", element.id);
                console.log(element.id);
                callbackDelete();
            });
        }
        $('#close').on('click', () => {
            location.href = "#/home";
            location.reload();
        });
        const payment = $('#payment');
        const btn = $('#seguirComprandoBtn');
        if (Carro.total > 0) {
            payment.on('click', () => {
                return Carro.pagar;
            });
        }
        else {
            payment.css({
                display: "none"
            });
            btn.css({
                display: "none"
            });
        }
    }
    productos(padre, data) {
        let parseNumber = parseInt(sessionStorage.getItem("item"));
        let items = data.title[parseNumber].Productos;
        let element;
        let html = "";
        html = `  <div class=" row  row-cols-md-3 g-4 text-center mt-0"  >`;
        for (element of items) {
            html += `
      <div class="col-6">
        <div class="card">
          <div class="">
           <img src="${element.image}" class="card-img-top img-thumb" alt="item">
          </div>
          <div class="card-footer itemButton" id="${element.id}">
           <h5 class="card-title">${element.title}</h5>
          </div>
        </div>
      </div>
        `;
        }
        $(padre).html(html);
        html += `</div>`;
        for (const el of $('.itemButton')) {
            $(el).on('click', () => {
                sessionStorage.setItem("producto", el.id);
                location.href = "#/descriptionItem";
            });
        }
    }
    descripcionItem(padre, items, callback) {
        let html = "";
        html = `
      <div class="container m-auto row text-center mt-5 bg-white p-3 border-custom">
        <div class=" bg-white col-5 rounded ">
         <img src="${items.image}" class="card-img-top img-thumb" alt="...">
        </div>
        <div class="col-7  container bg-white rounded mx-auto  d-flex flex-column justify-content-around">
          <h4 class="fs-3 ">${items.title}</h4>
          <hr class="w-75 mx-auto ">
          <h2>$ ${items.price}</h2>
          <hr class="w-75 mx-auto ">
          <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" id="addCarrito">Agregar al carrito</button>
        </div>
      </div> 
    `;
        $(padre).html(html);
        const addCarritoBtn = $('#addCarrito');
        addCarritoBtn.click(callback);
    }
    buscar(padre, array) {
        let element;
        let html = "";
        if (array.length === 0) {
            $(padre).html("");
            location.href = "#/error";
        }
        html = `<div class=" row  row-cols-md-3 g-4 text-center mt-0">`;
        for (element of array) {
            html += `
        <div class="col-6">
          <div class="card">
            <div class="">
              <img src="${element.image}" class="card-img-top img-thumb" alt="item">
            </div>
            <div class="card-footer itemButton" id="${element.id}">
              <h5 class="card-title">${element.title}</h5>
            </div>
          </div>
        </div>
      `;
        }
        $(padre).html(html);
        html += `</div>`;
        for (const el of $('.itemButton')) {
            $(el).on('click', () => {
                sessionStorage.setItem("producto", el.id);
                location.href = "#/descriptionItem";
            });
        }
        //  $(padre).html("")
    }
}
class ProductController {
    constructor(productoModel, productoVista) {
        this.productoModel = productoModel;
        this.productoView = productoVista;
        this.func = () => {
            $('#form').on('submit', (e) => {
                e.preventDefault();
                const searchTerm = $('#exampleDataList').val();
                if (searchTerm && searchTerm !== '') {
                    sessionStorage.setItem("palabra", String(searchTerm));
                    location.href = "#/buscar=" + searchTerm;
                }
            });
        };
    }
    irInicio(app, data) {
        this.productoView.home(app, data, this.func());
    }
    irCarrito(app) {
        let Carro = new Carrito(this.productoModel.carrito);
        this.productoView.carrito(app, this.productoModel.carrito, Carro, () => {
            this.productoModel.eliminarProducto();
        }, this.func());
    }
    irProductos(app, data) {
        this.productoView.productos(app, data);
    }
    irDescripcionItem(app, data) {
        let pNumber = parseInt(sessionStorage.getItem("producto"));
        let iNumber = parseInt(sessionStorage.getItem("item"));
        let items = data.title[iNumber].Productos[pNumber];
        this.productoView.descripcionItem(app, items, () => {
            this.productoModel.agregarProducto(items);
        });
    }
    irBuscar(app, data) {
        this.productoView.buscar(app, this.productoModel.searchProducto(data, sessionStorage.getItem("palabra")));
    }
}
