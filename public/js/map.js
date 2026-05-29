// const mapToken = mapToken;
mapboxgl.accessToken = mapToken;
// console.log(mapToken);

const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

// @marker: create a marker at a coordinate

// const marker = new mapboxgl.Marker({ color: "red" })
//     .setLngLat(coordinates)
//     .addTo(map);

const popup = new mapboxgl.Popup()
    .setHTML('<h6>You are living here!</h6>');
map.once('style.load', () => {
    map.setConfigProperty('basemap', 'showPointOfInterestLabels', false);
    map.setConfigProperty('basemap', 'showPlaceLabels', false);
    map.setConfigProperty('basemap', 'showRoadLabels', false);
    map.setConfigProperty('basemap', 'showTransitLabels', false);
});

// add cat on coordinates 
map.once('load', () => {
    map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
        (error, image) => {
            map.addImage('cat', image);
            map.addSource('buildings', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: coordinates
                            }
                        }
                    ]
                }
            });
            map.addLayer({
                id: 'cat-on-building',
                source: 'buildings',
                slot: 'top',
                type: 'symbol',
                'layout': {
                    'icon-image': 'cat',
                    'icon-size': 0.1,
                    'symbol-placement': 'point',
                    'symbol-z-elevate': true
                }
            });
        }
    );
});
marker.setPopup(popup);