/* Definir nuevo mapa y almacenar en variable */


const isMobile = window.innerWidth < 800;

var map = L.map('map', {
    crs: L.CRS.Simple,          // Sistema de coordenadas en píxeles
    zoom: isMobile ? 3 : 2, 
    zoomSnap: 0,                // Permite niveles de zoom intermedios
    minZoom: -2,                // Permite alejarse más si es necesario
    zoomControl: false,         // Permite botones de zoom (default)
    scrollWheelZoom: false,     // Permite zoom con la rueda
    doubleClickZoom: false,     // Permite zoom con doble clic
    touchZoom: isMobile ? true : false,
    scrollWheelZoom: isMobile ? true : false,
    dragging: true,            // Permite arrastre del mapa 
});

/* Imagenes que aparecen en el mapa */
var images = {
    hallownest: './assets/img/map/hallownest.png',
    boca_sucia: './assets/img/map/boca_sucia.png',
    nido_profundo: './assets/img/map/nido_profundo.png',
};

/* Dimensiones de las imagenes */
var w = 1920, h = 1080;

/* Limites del mapa */
var bounds = [[0, 0], [h, w]];

/* Establecer imagen principal y almacenar en variable*/
var currentImage = L.imageOverlay(images.hallownest, bounds).addTo(map);

/* Ajustar el mapa a los límites de la imagen */
map.fitBounds(bounds);

function changeImage(newImage) {
    map.removeLayer(currentImage);
    currentImage = L.imageOverlay(newImage, bounds);
    currentImage.addTo(map);
    currentImage.getElement().classList.add('fade');
}


const markers = [
    L.marker([750, 800]).addTo(map).on('click', () => showZone('Zona 1', images.boca_sucia)),
    L.marker([400, 700]).addTo(map).on('click', () => showZone('Zona 2', images.nido_profundo))
];


function showZone(zoneName, newImage) {
    map.removeLayer(currentImage); // Quitar la imagen anterior
    markers.forEach(marker => map.removeLayer(marker)); // Ocultar los marcadores
    currentOverlay = L.imageOverlay(newImage, bounds).addTo(map); // Agregar nueva imagen
    document.getElementById('info').innerHTML = `<h3>${zoneName}</h3><p>Descripción de la zona.</p>`;
    document.getElementById('info').style.display = 'block';
    document.getElementById('backButton').style.display = 'block';
}


// Volver al estado inicial
document.getElementById('backButton').addEventListener('click', () => {
    map.removeLayer(currentOverlay);
    currentOverlay = L.imageOverlay(images.hallownest, bounds).addTo(map);
    markers.forEach(marker => marker.addTo(map));
    document.getElementById('info').style.display = 'none';
    document.getElementById('backButton').style.display = 'none';
});