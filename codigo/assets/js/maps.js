function initMap() {
    const map = L.map('map').setView([-19.921747, -43.937778], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map;
}

function updateMapLocation(map, lat, lng) {
    map.setView([lat, lng], 13);
    L.marker([lat, lng]).addTo(map)
        .bindPopup('Local do Evento')
        .openPopup();
}

function geoCodeConvert(address) {
    return new Promise((resolve, reject) => {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Verificar os dados recebidos pelo serviço de geocodificação
                if (data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lng = parseFloat(data[0].lon);
                    if (!isNaN(lat) && !isNaN(lng)) { // Verificar se lat e lng são números válidos
                        resolve({ lat, lng });
                    } else {
                        reject("Coordenadas inválidas");
                    }
                } else {
                    reject("Endereço não encontrado");
                }
            })
            .catch(error => reject(error));
    });
}

function createLi(className, textContent) {
    const li = document.createElement('li');
    li.classList.add(className);
    li.textContent = textContent;
    return li;
}

function createLocationInfo(nomeEvento, data, local, descricao) {
    
}

document.addEventListener('DOMContentLoaded', () => {
    const map = initMap(); // Inicializa o mapa com a visão padrão de Belo Horizonte

    const selectedEventLocation = localStorage.getItem('selectedEventLocation');
    const ulDescription = document.getElementById('event-description');
    if (selectedEventLocation) {
        const address = JSON.parse(selectedEventLocation);
        geoCodeConvert(address)
            .then(result => {
                console.log(`Localização convertida: ${result.lat}, ${result.lng}`);
                updateMapLocation(map, result.lat, result.lng); // Atualiza o mapa com a localização convertida
            })
            .catch(error => {
                console.error("Falha na conversão", error);
            });
    } else {
        console.error("Localização do evento selecionado não encontrada.");
    }
});