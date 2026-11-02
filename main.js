// Inicialización de Popovers y Tooltips de Bootstrap 5
document.addEventListener('DOMContentLoaded', function () {
    // Tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// Lógica de la Calculadora de Huella de Carbono
function calcularHuella() {
    const km = parseFloat(document.getElementById('inputKm').value) || 0;
    const transporte = parseFloat(document.getElementById('selectTransporte').value) || 0;
    
    const resultado = (km * transporte * 365) / 1000; // Toneladas de CO2 al año
    const bar = document.getElementById('progressBar');
    const texto = document.getElementById('textoResultado');

    let porcentaje = Math.min((resultado / 5) * 100, 100);
    bar.style.width = porcentaje + '%';
    bar.innerText = resultado.toFixed(2) + ' Toneladas CO2/año';

    if (resultado < 1.5) {
        bar.className = 'progress-bar bg-success';
        texto.innerText = "¡Excelente! Tu huella de carbono es muy baja.";
    } else if (resultado <= 3) {
        bar.className = 'progress-bar bg-warning text-dark';
        texto.innerText = "Promedio moderado. Puedes optimizar tus traslados.";
    } else {
        bar.className = 'progress-bar bg-danger';
        texto.innerText = "Huella elevada. Considera el uso de transporte público o bicicleta.";
    }
}