document.getElementById('finance-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    // 1. Obtener valores de los inputs
    const ingresos = parseFloat(document.getElementById('ingreso-input').value);
    const gastos = parseFloat(document.getElementById('gasto-input').value);

    // 2. Validación básica
    if (isNaN(ingresos) || isNaN(gastos) || ingresos <= 0) {
        alert("Por favor, ingresa montos válidos.");
        return;
    }

    // 3. Calcular salud financiera
    actualizarInterfaz(ingresos, gastos);
});

function actualizarInterfaz(ingresos, gastos) {
    // Cálculo de porcentaje de gasto (Salud)
    // Usaremos una fórmula donde: 100% de salud es 0 gastos, y 0% salud es gastar todo.
    const porcentajeGasto = (gastos / ingresos) * 100;
    let score = 100 - porcentajeGasto;
    
    // Limitar el score entre 0 y 100
    score = Math.max(0, Math.min(100, score));

    const scoreElement = document.getElementById('health-score');
    const fill = document.getElementById('health-fill');
    const badge = document.getElementById('health-badge');
    const msg = document.getElementById('health-msg');

    // Actualizar Texto y Barra
    scoreElement.innerText = Math.floor(score);
    fill.style.width = score + "%";

    // Lógica de colores y mensajes interactivos
    if (score >= 70) {
        fill.style.backgroundColor = "#2ecc71"; // Verde
        badge.innerText = "EXCELENTE";
        badge.style.backgroundColor = "#e8f8f0";
        badge.style.color = "#2ecc71";
        msg.innerText = "¡Tu cosecha es próspera! Estás ahorrando más del 30%.";
    } else if (score >= 40) {
        fill.style.backgroundColor = "#f1c40f"; // Amarillo
        badge.innerText = "EN TRATAMIENTO";
        badge.style.backgroundColor = "#fef9e7";
        badge.style.color = "#f1c40f";
        msg.innerText = "Cuidado, los gastos están consumiendo gran parte de tu siembra.";
    } else {
        fill.style.backgroundColor = "#e74c3c"; // Rojo
        badge.innerText = "CRÍTICO";
        badge.style.backgroundColor = "#fdeaea";
        badge.style.color = "#e74c3c";
        msg.innerText = "¡Atención! Tus gastos superan el límite de seguridad.";
    }
}