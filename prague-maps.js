// prague-maps.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Google Maps when the DOM is fully loaded
    initMaps();
});

// Main function to initialize all maps
function initMaps() {
    // Only proceed if Google Maps API is loaded
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.error("Google Maps API not loaded");
        return;
    }

    // Initialize map for Day 1 (Old Town & Charles Bridge)
    initDayMap('day1-map', 
        { lat: 50.0874, lng: 14.4213 }, // Center on Old Town Square
        [
            {
                position: { lat: 50.0874, lng: 14.4213 },
                title: "Place de la Vieille Ville",
                content: "<h6>Place de la Vieille Ville</h6><p>Centre historique avec l'horloge astronomique médiévale</p>"
            },
            {
                position: { lat: 50.0865, lng: 14.4111 },
                title: "Pont Charles",
                content: "<h6>Pont Charles</h6><p>Pont médiéval emblématique avec 30 statues</p>"
            },
            {
                position: { lat: 50.0880, lng: 14.4230 },
                title: "Église Notre-Dame de Týn",
                content: "<h6>Église Notre-Dame de Týn</h6><p>Architecture gothique remarquable</p>"
            },
            {
                position: { lat: 50.0875, lng: 14.4282 },
                title: "Tour Poudrière",
                content: "<h6>Tour Poudrière</h6><p>Porte emblématique de la ville</p>"
            },
            {
                position: { lat: 50.0838, lng: 14.4074 },
                title: "Île de Kampa",
                content: "<h6>Île de Kampa</h6><p>Zone paisible avec parc</p>"
            }
        ]
    );

    // Initialize map for Day 2 (Petřín Hill & Castle District)
    initDayMap('day2-map', 
        { lat: 50.0855, lng: 14.3980 }, // Center on Prague Castle
        [
            {
                position: { lat: 50.0814, lng: 14.3953 },
                title: "Colline de Petřín",
                content: "<h6>Colline de Petřín</h6><p>Jardins et tour d'observation avec vue panoramique</p>"
            },
            {
                position: { lat: 50.0802, lng: 14.3930 },
                title: "Tour d'observation de Petřín",
                content: "<h6>Tour d'observation</h6><p>Vue panoramique sur Prague</p>"
            },
            {
                position: { lat: 50.0865, lng: 14.3892 },
                title: "Monastère de Strahov",
                content: "<h6>Monastère de Strahov</h6><p>Point de vue magnifique</p>"
            },
            {
                position: { lat: 50.0909, lng: 14.4005 },
                title: "Château de Prague",
                content: "<h6>Château de Prague</h6><p>Le plus grand château ancien du monde</p>"
            },
            {
                position: { lat: 50.0891, lng: 14.3999 },
                title: "Cathédrale Saint-Guy",
                content: "<h6>Cathédrale Saint-Guy</h6><p>Chef d'œuvre d'architecture gothique</p>"
            }
        ]
    );

    // Initialize map for Day 3 (Jewish Quarter & Vyšehrad)
    initDayMap('day3-map', 
        { lat: 50.0901, lng: 14.4195 }, // Center between Jewish Quarter and Vyšehrad
        [
            {
                position: { lat: 50.0901, lng: 14.4195 },
                title: "Quartier Juif (Josefov)",
                content: "<h6>Quartier Juif (Josefov)</h6><p>Ancien ghetto avec synagogues historiques</p>"
            },
            {
                position: { lat: 50.0899, lng: 14.4192 },
                title: "Vieille-Nouvelle Synagogue",
                content: "<h6>Vieille-Nouvelle Synagogue</h6><p>La plus ancienne synagogue active d'Europe</p>"
            },
            {
                position: { lat: 50.0895, lng: 14.4175 },
                title: "Cimetière Juif",
                content: "<h6>Cimetière Juif</h6><p>Vieux cimetière juif avec des milliers de pierres tombales</p>"
            },
            {
                position: { lat: 50.0669, lng: 14.4183 },
                title: "Vyšehrad",
                content: "<h6>Vyšehrad</h6><p>Forteresse historique avec vues panoramiques</p>"
            },
            {
                position: { lat: 50.0648, lng: 14.4171 },
                title: "Église Saint-Pierre-et-Saint-Paul",
                content: "<h6>Église Saint-Pierre-et-Saint-Paul</h6><p>Église néo-gothique emblématique</p>"
            }
        ]
    );

    // Initialize map for the hotel
    initHotelMap('hotel-map', 
        { lat: 50.0739, lng: 14.4034 }, // Hotel Petr location
        "Hôtel Petr, Drtinova 17, Prague, 15000"
    );
}

// Helper function to initialize a map for a specific day
function initDayMap(mapElementId, center, markers) {
    const mapElement = document.getElementById(mapElementId);
    if (!mapElement) {
        console.warn(`Map element with ID '${mapElementId}' not found`);
        return;
    }

    // Create the map
    const map = new google.maps.Map(mapElement, {
        center: center,
        zoom: 15,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
        zoomControl: true,
        styles: [
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "poi.business",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "transit",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            }
        ]
    });

    // Create info window for all markers
    const infoWindow = new google.maps.InfoWindow();

    // Create a bounds object to fit all markers
    const bounds = new google.maps.LatLngBounds();

    // Create a marker for each location and extend bounds
    markers.forEach((markerInfo, index) => {
        const marker = new google.maps.Marker({
            position: markerInfo.position,
            map: map,
            title: markerInfo.title,
            animation: google.maps.Animation.DROP,
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }
        });

        // Extend the bounds to include this marker's position
        bounds.extend(markerInfo.position);

        // Add click event to show info window
        marker.addListener('click', () => {
            infoWindow.setContent(markerInfo.content);
            infoWindow.open(map, marker);
        });

        // Draw a line between points (if not the first marker)
        if (index > 0) {
            const previousMarker = markers[index - 1];
            const line = new google.maps.Polyline({
                path: [previousMarker.position, markerInfo.position],
                geodesic: true,
                strokeColor: '#c0392b', // Prague primary red color
                strokeOpacity: 0.8,
                strokeWeight: 3,
                map: map
            });
        }
    });

    // Fit the map to show all markers with some padding
    map.fitBounds(bounds);
    
    // Add a small zoom out for better context
    const listener = google.maps.event.addListenerOnce(map, 'idle', function() {
        if (map.getZoom() > 16) {
            map.setZoom(16);
        }
    });
}

// Helper function to initialize the hotel map
function initHotelMap(mapElementId, position, title) {
    const mapElement = document.getElementById(mapElementId);
    if (!mapElement) {
        console.warn(`Map element with ID '${mapElementId}' not found`);
        return;
    }

    // Create the map
    const map = new google.maps.Map(mapElement, {
        center: position,
        zoom: 15,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: true,
        zoomControl: true
    });

    // Create a marker for the hotel
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
    });

    // Add info window for the hotel
    const infoWindow = new google.maps.InfoWindow({
        content: `<h6>${title}</h6><p>Notre hébergement à Prague</p>`
    });

    // Open info window on marker click
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}
