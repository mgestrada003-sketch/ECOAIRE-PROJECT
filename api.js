// Conexión con la API RESTful de World Air Quality Index (WAQI)
const API_TOKEN = 'demo'; // Usar token 'demo' o tu API Key pública de WAQI

async function obtenerClimaAQI(ciudad) {
    const contenedor = document.getElementById('resultado-api');
    if (!contenedor) return;

    contenedor.innerHTML = `<div class="spinner-border text-success" role="status"><span class="visually-hidden">Cargando...</span></div>`;

    try {
        const response = await fetch(`https://api.waqi.info/feed/${ciudad}/?token=${API_TOKEN}`);
        const data = await response.json();

        if (data.status === 'ok') {
            const aqi = data.data.aqi;
            let claseBg = 'bg-success';
            let estado = 'Excelente';

            if (aqi > 50 && aqi <= 100) {
                claseBg = 'bg-warning text-dark';
                estado = 'Moderado';
            } else if (aqi > 100) {
                claseBg = 'bg-danger';
                estado = 'Daños a la Salud';
            }

            contenedor.innerHTML = `
                <div class="card ${claseBg} text-white shadow p-3 mt-3">
                    <h3>${data.data.city.name}</h3>
                    <h4>Índice AQI: <strong>${aqi}</strong> (${estado})</h4>
                    <p class="mb-0">Dominante: ${data.data.dominentpol.toUpperCase()}</p>
                </div>
            `;
        } else {
            contenedor.innerHTML = `<div class="alert alert-warning mt-3">No se encontraron datos para la ciudad ingresada.</div>`;
        }
    } catch (error) {
        contenedor.innerHTML = `<div class="alert alert-danger mt-3">Error al conectar con la API RESTful.</div>`;
    }
}