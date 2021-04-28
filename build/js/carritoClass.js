"use strict";
class Carrito {
    constructor(productos) {
        this.productos = productos;
    }
    get total() {
        let sumaTotal = 0;
        for (let el of this.productos) {
            sumaTotal += el.price;
        }
        return sumaTotal;
    }
    get borrarCarrito() {
        return localStorage.clear();
    }
    get pagar() {
        console.log("Carrito Pagado");
        return this.borrarCarrito;
    }
}
