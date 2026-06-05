const API_BASE = (typeof CONFIG !== 'undefined' && CONFIG.API_URL) ? CONFIG.API_URL : 'http://localhost:3000';

const contenedor = document.getElementById("contenedor-servicios");

const obtenerServicios = async () => {

    try {

        const respuesta = await fetch(API_BASE + "/servicios");

        const servicios = await respuesta.json();

        servicios.forEach(servicio => {

            contenedor.innerHTML += `
                <article class="card">
                    <h4>${servicio.nombre}</h4>
                    <p>${servicio.descripcion}</p>
                    <div class="meta">
                        <span class="pill">Dev: ${servicio.desarrollador || 'Agus y Manu'}</span>
                        <span class="pill">Precio: $${servicio.precio || 'Consultar'}</span>
                    </div>
                </article>
            `;
        });

    } catch (error) {

        console.log("Error al cargar servicios:", error);
        contenedor.innerHTML = '<p class="error">Error al cargar servicios. Intenta nuevamente.</p>';
    }
};

obtenerServicios();
