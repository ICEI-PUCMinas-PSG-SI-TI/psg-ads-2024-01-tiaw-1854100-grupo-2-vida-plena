function initMap() {
    const map = L.map('map').setView([-19.921747, -43.937778], 13); // Inicializa o mapa com a visão padrão de Belo Horizonte

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
// Recebe a localização em endereço e retorna em lat e lng
function geoCodeConvert(address) {
    return new Promise((resolve, reject) => {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Verifica os dados recebidos pelo serviço de geocodificação
                if (data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lng = parseFloat(data[0].lon);
                    if (!isNaN(lat) && !isNaN(lng)) { // Verifica se lat e lng são números válidos
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



document.addEventListener('DOMContentLoaded', () => {
    const map = initMap(); 

    const selectedEventLocation = localStorage.getItem('selectedEventLocation'); //Acessa um local storage previamente criado na página de eventos contendo apenas a localização do evento

    if (selectedEventLocation) {
        const address = JSON.parse(selectedEventLocation);
        geoCodeConvert(address)
            .then(result => {
                console.log(`Localização convertida: ${result.lat}, ${result.lng}`);
// A localização deve ser passada como o recomendado pelo Open Street Map. Ex: Avenida Cristiano Machado, 300, Belo Horizonte. Caso contrário a geocodificação pode não funcionar corretamente

                updateMapLocation(map, result.lat, result.lng); // Atualiza o mapa com a localização convertida
            })
            .catch(error => {
                console.error("Falha na conversão", error);
            });
    } else {
        console.error("Localização do evento selecionado não encontrada.");
    }

    const ul = document.getElementById('event-description');

    function createLi(className, textContent) {
        const li = document.createElement('li');
        li.classList.add(className);
        li.textContent = textContent;
        return li;
    }

    // Gera uma hora aleatória para ser exibida como horário do evento
    function randomTime() {
        const startHour = new Date().setHours(8, 0, 0, 0);

        const endHour = new Date().setHours(20, 0, 0, 0);

        const randomGenerator = Math.random() * (endHour - startHour);

        const randomHour = new Date(startHour + randomGenerator);

        const minutes = randomHour.getMinutes();
        randomHour.setMinutes(minutes + (30 - minutes % 30)); // Formatada para gerar um horário de 30 em 30 minutos apenas para condizer com horários geralmente utilizados.

        if (randomHour > endHour) {
            randomTime = new Date(endHour);
        }

        return randomHour;
    }

    function formattedTime(time) {
        const hours = time.getHours();
        const minutes = time.getMinutes();

        const formattedHour = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        return `${formattedHour}:${formattedMinutes}`;
    }

    function createInfo(ul, nome, date, hour, location, description) {
        const liName = createLi('li-name', nome);
        const liData = createLi('li-data', "Data: " + date);
        const liHour = createLi('li-hour', "Horário: " + hour);
        const liLocation = createLi('li-location', "Endereço: " + location);
        const liDescription = createLi('li-description', "Descrição: " + description);
        ul.appendChild(liName);
        ul.appendChild(liData);
        ul.appendChild(liHour);
        ul.appendChild(liLocation);
        ul.appendChild(liDescription);
    }

    const timeToFormat = randomTime();
    const eventHour = formattedTime(timeToFormat);

    function readLiInfo() {
        const events = localStorage.getItem('selectedEvent') || [];
        const parsedEvent = JSON.parse(events);

        const randomHour = randomTime()
        createInfo(ul, parsedEvent.name, parsedEvent.date, eventHour, parsedEvent.location, parsedEvent.description);
    }

    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('selectedEvent');
        localStorage.removeItem('selectedEventLocation');
    });

    readLiInfo();
});