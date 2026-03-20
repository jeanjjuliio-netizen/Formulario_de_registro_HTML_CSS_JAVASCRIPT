const formulario = document.getElementById('formulario-registro');
const passwordInput = document.getElementById('contraseña');
const barraSeguridad = document.getElementById('nivel-seguridad');
const alertaExito = document.getElementById('mensaje-exito');

passwordInput.addEventListener('input', () => {
    const valor = passwordInput.value;
    let fortaleza = 0;

    if (valor.length >= 8) fortaleza += 30;
    if (valor.match(/[A-Z]/)) fortaleza += 30;
    if (valor.match(/[0-9]/)) fortaleza += 40;

    barraSeguridad.style.width = fortaleza + '%';

    if (fortaleza < 40) {
        barraSeguridad.style.background = '#ef4444';
    } else if (fortaleza < 70) {
        barraSeguridad.style.background = '#f59e0b';
    } else {
        barraSeguridad.style.background = '#22c55e';
    }
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (formulario.checkValidity()) {
        const usuario = document.getElementById('nombreusuario').value;
        const correo = document.getElementById('correo').value;

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push({ nombre: usuario, email: correo });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alertaExito.style.display = 'block';
        formulario.reset();
        barraSeguridad.style.width = '0%';

        setTimeout(() => {
            alertaExito.style.display = 'none';
        }, 3000);
    } else {
        alert("Por favor, completa los campos correctamente.");
    }
});