const contenedorEquipo = document.getElementById("contenedor-equipo");

const obtenerEquipo = async () => {

    try {

        console.log("✓ Iniciando petición GET /equipo");

        const respuesta = await fetch(CONFIG.API_URL + "/equipo");

        console.log("✓ Respuesta recibida con código:", respuesta.status);

        const integrantes = await respuesta.json();

        console.log(`✓ ${integrantes.length} integrantes del equipo obtenidos`);

        integrantes.forEach(persona => {

            contenedorEquipo.innerHTML += `
                <article class="card">
                    <h3>${persona.nombre}</h3>
                    <p><strong>Rol:</strong> ${persona.rol}</p>
                    <p><strong>Email:</strong> ${persona.email}</p>
                </article>
            `;
        });

        console.log("✓ Equipo renderizado en el DOM");

    } catch (error) {

        console.error("✗ Error al cargar equipo:", error);
        contenedorEquipo.innerHTML = '<p class="error">Error al cargar equipo. Intenta nuevamente.</p>';
    }
};

obtenerEquipo();