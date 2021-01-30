var mapReady = false;

function colorRegion(region) {
    switch (region) {
        case 'Central':
            return 'red';
        case 'Southeast':
            return 'yellow';
        case 'Northwest':
            return 'blue';
        case 'Midwest':
            return 'orange';
        case 'Southwest':
            return 'green';
        case 'Northeast':
            return 'purple';
        case 'Western':
            return 'brown'
        case 'Rocky Mountain':
            return 'pink';
        case 'Middle Atlantic':
            return 'cyan'
        case 'Great Lakes':
            return 'gold';
        default:
            return 'black';
    }
  }

var map = L.map('map', {
    center: [39.8283, -98.5795],
    scrollWheelZoom: false,
    zoom: 4
});

console.log('Loading geojson (this may take ~20 seconds)...')

d3.json('/geojson').then(data => {

    baseMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'American Chemical Society | Chemistry for Life',
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: 'mapbox/light-v10',
        accessToken: API_KEY
        });
        
    baseMap.addTo(map);

    geodata = data['features'];
        
    zip_code_layer = L.geoJson(geodata, {
    style: function(feature) {
        return {
        color: 'white',
        fillColor: colorRegion(feature.properties.region),
        fillOpacity: 0.5,
        weight: 1.5
        };
    },
    onEachFeature: function(feature, layer) {
    
        layer.on({
        
            mouseover: function(event) {
                layer = event.target;
                layer.setStyle({
                fillOpacity: 0.9
                });
            },
        
            mouseout: function(event) {
                layer = event.target;
                layer.setStyle({
                fillOpacity: 0.5
                });
            },
            
            /*
            click: function(event) {
            map.fitBounds(event.target.getBounds());
            }
            */
        });
        
        layer.bindPopup(`${feature.properties.region} Region<hr/>County: ${feature.properties.county_name}<br/>State: ${feature.properties.state_name}`);

    }

    });

    zip_code_layer.addTo(map);

    mapReady = true;

    console.log('Done loading geojson')
});