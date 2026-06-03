document.addEventListener('DOMContentLoaded', function () {

    cargarPerfil();

    async function cargarPerfil() {

        try {

            console.log("✓ Iniciando carga de perfil desde API");

            const response = await fetch(CONFIG.API_URL + '/perfil/1');

            console.log("✓ Respuesta recibida con código:", response.status);

            const data = await response.json();

            console.log(`✓ Perfil de ${data.nombre} cargado correctamente`);

            mostrarDatosUsuario(data);

            mostrarServicios(
                data.ultimosPedidos.map(pedido => ({
                    nombre: pedido,
                    fecha: new Date()
                }))
            );

        } catch (error) {

            console.error('✗ Error al cargar perfil:', error);
            alert('Error al cargar el perfil. Intenta nuevamente.');

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

            console.log("✓ Cerrando sesión del usuario");
            localStorage.removeItem('user');
            alert('✓ Sesión cerrada');

            window.location.href = '../index.html';

        });
    }

});