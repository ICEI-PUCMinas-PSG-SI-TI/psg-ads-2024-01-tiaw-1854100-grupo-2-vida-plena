function initMap() {
    const map = L.map('map').setView([-23.55052, - 46.633308], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([-23.55052, -46.633308]).addTo(map)
    .bindPopup('Local do Evento')
    .openPopup();
}

function getAddress () {
    const events = localStorage.getItem('events');
    if(events) {
        const parsedEvents = JSON.parse(events);
        if(parsedEvents.location) {
            const location = parsedEvents.location;
            return location;
        } else {
            console.error("Campo 'location' não encontrado.");
            return null;
        }
    } else {
        console.error("Nenhum dado encontrado.");
        return null;
    }
}

function geoCodeConvert (location) {
    return new Promise ((resolve, reject) => {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
        
        fetch(url)
        .then (response => response.json())
        .then (data => {
            if(data.length > 0) {
                const location = {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lng)
                };
                resolve(location);
            } else {
                reject("Endereço inválido");
            }
        })
        .catch(error => reject(error));
    })
}

const address = getAddress();
if(address) {
    geoCodeConvert(address)
    .then (result => {
        console.log(`Localização convertida, ${result.lat}`);
        console.log(`Localização convertida, ${result.lng}`);
    })
    .catch(error => {
        console.error("Falha na conversão", error);
    })
}
document.addEventListener('DOMContentLoaded', initMap);