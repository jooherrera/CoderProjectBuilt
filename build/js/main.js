"use strict";
$(() => {
    loadItems(jsonURL).then(res => {
        router(res);
        sessionStorage.setItem("item", "0");
    });
});
const app = new ProductController(new ProductModel(), new ProductVista());
const routes = [
    { path: '/', action: 'home' },
    { path: '/home', action: 'home' },
    { path: '/carrito', action: 'carrito' },
    { path: '/productos', action: 'productos' },
    { path: '/descriptionitem', action: 'item' },
    { path: '/buscar', action: 'buscar' },
    { path: '/error', action: 'error' },
    { path: '/construccion', action: 'construccion' },
];
const ErrorComponent = (padre) => {
    let html = "";
    html = `
    <div class="w-100 h-100 text-center mt-5">
      <i class="fas fa-times-circle size text-danger"></i>
      <p class="fs-3 fw-bold">
       No se han encontrado elementos!
      </p>
    </div>>
  `;
    $(padre).html(html);
};
const ErrorComponentConstruccion = (padre) => {
    let html = "";
    html += `
    <div class="w-100 mt-5">
      <img src="./assets/images/error.png" class="image-construccion" alt="error">
    </div>
  `;
    $(padre).html(html);
};
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findActionByPath = (path, routes) => routes.find(r => r.path == path || undefined);
const router = (data) => {
    const path = parseLocation();
    const { action = 'distinto' } = findActionByPath(path, routes) || {};
    switch (action) {
        case 'home':
            app.irInicio('#app', data);
            break;
        case 'carrito':
            app.irCarrito('#app');
            break;
        case 'productos':
            app.irProductos('#app', data);
            break;
        case 'item':
            app.irDescripcionItem('#app', data);
            break;
        case 'buscar':
            app.irBuscar('#app', data);
            break;
        case 'error':
            ErrorComponent('#app');
            break;
        case 'construccion':
            ErrorComponentConstruccion('#app');
            break;
        default:
            app.irBuscar('#app', data);
            break;
    }
};
$(window).on('load', function () {
    loadItems(jsonURL).then(res => {
        router(res);
    });
});
$(window).on('hashchange', () => {
    loadItems(jsonURL).then(res => {
        router(res);
    });
});
