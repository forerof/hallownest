/* Definir nuevo mapa y almacenar en variable */
const isMobile = window.innerWidth < 800;   // Verificar dispotivimos moviles

var map = L.map('map', {
    crs: L.CRS.Simple,                      // Sistema de coordenadas en píxeles
    zoomSnap: 0,                            // Permite niveles de zoom intermedios
    minZoom: -2,                            // Permite alejarse más si es necesario
    zoomControl: false,                     // Permite botones de zoom (default)
    scrollWheelZoom: false,                 // Permite zoom con la rueda
    doubleClickZoom: false,                 // Permite zoom con doble clic
    touchZoom: isMobile ? true : false,     // Permite zoom desde pantallas tactiles
    dragging: false,                        // Permite arrastre del mapa 
});

/* Imagenes de zonas que aparecen en el mapa */
var images = {
    hallownest: './assets/img/map/hallownest.webp',
    boca_sucia: './assets/img/map/boca_sucia.webp',
    nido_profundo: './assets/img/map/nido_profundo.webp',
    limites_reino: './assets/img/map/limites_reino.webp',
    tierras_reposo: './assets/img/map/tierras_reposo.webp',
    ciudad_lagrimas: './assets/img/map/ciudad_lagrimas.webp',
};


const customIcon = L.icon({
    iconUrl: './assets/img/map/marker.webp',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

/* Dimensiones de las imagenes */
var w = 1920, h = 1080;

/* Limites del mapa */
var bounds = [[0, 0], [h, w]];

/* Establecer imagen principal y almacenar en variable*/
var currentImage = L.imageOverlay(images.hallownest, bounds).addTo(map);

/* Ajustar el mapa a los límites de la imagen */
map.fitBounds(bounds);

/* Marcadores de las zonas que aparecen en el mapa */
const zonas = [
    L.marker([750, 800], { icon: customIcon }).addTo(map).on('click', () => showZone('Bocasucia', images.boca_sucia, 'Pueblo desolado que sirve como punto de inicio en Hollow Knight. Se encuentra en la superficie, justo sobre Hallownest, y actúa como un refugio para los pocos habitantes que aún permanecen en el reino caído.')),
    L.marker([400, 700], { icon: customIcon }).addTo(map).on('click', () => showZone('Nido Profundo', images.nido_profundo, ' Es una de las zonas más peligrosas y opresivas de Hollow Knight. Es un laberinto oscuro y enredado de túneles infestados de criaturas hostiles, con un ambiente claustrofóbico y sonidos inquietantes que refuerzan su tono aterrador.')),
    L.marker([400, 1400], { icon: customIcon }).addTo(map).on('click', () => showZone('Limites del reino', images.limites_reino, 'Es una región extensa y vertical, con múltiples plataformas y acantilados. Alberga enemigos poderosos como los Guerreros Alados (Winged Sentries) y los Colmipiedras (Primal Aspids), conocidos por su agresividad.')),
    L.marker([700, 1300], { icon: customIcon }).addTo(map).on('click', () => showZone('Tierras de reposo', images.tierras_reposo, 'Es una zona tranquila y melancólica en Hollow Knight, conocida por ser un antiguo cementerio lleno de tumbas y monumentos a los habitantes de Hallownest. Se encuentra en una elevación sobre la Ciudad de Lágrimas y está envuelta en un aura de serenidad y misterio.')),
    L.marker([500, 1200], { icon: customIcon }).addTo(map).on('click', () => showZone('Ciudad de lagrimas', images.ciudad_lagrimas, 'Es el corazón de Hallownest y una de las zonas más impresionantes de Hollow Knight. Es una vasta metrópoli en ruinas, caracterizada por su arquitectura majestuosa y su lluvia eterna, que cae debido a la apertura en el techo del reino.') )

];

/* Funcion para inspeccionar una zona */
function showZone(zoneName, newImage, description) {
    map.removeLayer(currentImage);                                                              // Quitar la imagen anterior
    zonas.forEach(marker => map.removeLayer(marker));                                           // Ocultar los marcadores
    currentOverlay = L.imageOverlay(newImage, bounds).addTo(map);                               // Agregar nueva imagen
    document.getElementById('info').innerHTML = `<h3>${zoneName}</h3><p>${description}</p>`;    // Informacion de la zona
    document.getElementById('info').style.display = 'block';                                    // Habilitar tarjeta de informacion
    document.getElementById('backButton').style.display = 'block';                              // Habilitar boton de regreso
}

/* Volver al estado inicial */
document.getElementById('backButton').addEventListener('click', () => {
    map.removeLayer(currentOverlay);                                                            // Quitar la imagen anterior
    currentOverlay = L.imageOverlay(images.hallownest, bounds).addTo(map);                      // Establecer imagen principal
    zonas.forEach(marker => marker.addTo(map));                                                 // Habilitar los marcadores
    document.getElementById('info').style.display = 'none';                                     // Deshabilitar la tarjeta de informacion
    document.getElementById('backButton').style.display = 'none';                               // Deshabilitar boton de regreso
});