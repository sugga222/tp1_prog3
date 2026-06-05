document.addEventListener('DOMContentLoaded', function () {

    cargarPerfil();

    async function cargarPerfil() {

        try {

            const API_BASE = (typeof CONFIG !== 'undefined' && CONFIG.API_URL) ? CONFIG.API_URL : 'http://localhost:3000';

            const response = await fetch(API_BASE + '/perfil/1');

            const data = await response.json();

            mostrarDatosUsuario(data);

            mostrarServicios(
                data.ultimosPedidos.map(pedido => ({
                    nombre: pedido,
                    fecha: new Date()
                }))
            );

        } catch (error) {

            console.error('Error al cargar perfil:', error);

        }
    }

    function mostrarDatosUsuario(user) {

        // Actualizar nombre principal
        const nombreElement = document.querySelector('.perfil-nombre');

        if (nombreElement) {

            nombreElement.textContent = `👤 ${user.nombre}`;

        }

        // Actualizar email
        const emailElement = document.querySelector('.perfil-email');

        if (emailElement) {

            emailElement.innerHTML = `<strong>Email:</strong> ${user.email}`;

        }

        // Actualizar año de registro
        const registroElement = document.querySelector('.perfil-registro');

        if (registroElement) {

            registroElement.innerHTML = `
                <strong>Miembro desde:</strong>
                ${new Date(user.fechaRegistro).getFullYear()}
            `;

        }

        // Actualizar nombre completo
        const completoElement = document.querySelector('.perfil-completo');

        if (completoElement) {

            completoElement.innerHTML = `
                <strong>Nombre completo:</strong>
                ${user.nombre}
            `;

        }

        // Actualizar foto
        const fotoElement = document.querySelector('.perfil-foto');

        if (fotoElement) {

            fotoElement.src = user.foto;

            fotoElement.alt = user.nombre;

        }
    }

    function mostrarServicios(servicios) {

        const serviciosContainer = document.querySelector('.servicios-grid');

        if (!serviciosContainer) return;

        serviciosContainer.innerHTML = '';

        servicios.forEach(servicio => {

            const card = document.createElement('article');

            card.className = 'card';

            card.innerHTML = `
                <h4>${servicio.nombre}</h4>
                <p>
                    Solicitado el
                    ${new Date(servicio.fecha).toLocaleDateString('es-ES')}
                </p>
            `;

            serviciosContainer.appendChild(card);

        });
    }

    // Botón cerrar sesión
    const logoutBtn = document.getElementById('logout-btn');

    if (logoutBtn) {

        logoutBtn.addEventListener('click', function () {

            alert('Sesión cerrada');

            window.location.href = '../index.html';

        });
    }

});
