/* eslint-disable */

export const displayMap = locations => {

    mapboxgl.accessToken = 'pk.eyJ1Ijoic21ldiIsImEiOiJjanp4c2Z2eTQwMDJtM21xeGIxcTN5c242In0._lXUax37hhR2zv48jmp0Mw';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/smev/cjzxsqosm21k11cnrbj63qids',
    scrollZoom: false
    });
    
    const bounds = new mapboxgl.LngLatBounds();
    
    locations.forEach(loc => {
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';
    
        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        })
            .setLngLat(loc.coordinates)
            .addTo(map);
    
        // Add popup
        new mapboxgl.Popup({
            offset: 30
        })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);
    
        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    
    map.fitBounds(bounds, {
        padding:{
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
}
