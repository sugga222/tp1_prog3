const contenedor = document.getElementById("contenedor-servicios");

let serviciosGlobal = []; // Guardar servicios para búsqueda

const obtenerServicios = async () => {

    try {
        // Mostrar spinner
        contenedor.innerHTML = '<div class="spinner">Cargando servicios...</div>';

        console.log("✓ Iniciando petición GET /servicios");

        const respuesta = await fetch(CONFIG.API_URL + "/servicios");

        console.log("✓ Respuesta recibida con código:", respuesta.status);

        const servicios = await respuesta.json();

        serviciosGlobal = servicios; // Guardar para búsqueda

        console.log(`✓ ${servicios.length} servicios obtenidos`);

        // Limpiar spinner y mostrar servicios
        contenedor.innerHTML = '';

        servicios.forEach(servicio => {

            contenedor.innerHTML += `
                <article class="card">
                    <h4>${servicio.nombre}</h4>
                    <p>${servicio.descripcion}</p>
                    <div class="meta">
                        <span class="pill">ID: ${servicio.id}</span>
                        <span class="pill">Dev: ${servicio.desarrollador || 'Agus y Manu'}</span>
                    </div>
                </article>
            `;
        });

        console.log("✓ Servicios renderizados en el DOM");

    } catch (error) {

        console.error("✗ Error al cargar servicios:", error);
        contenedor.innerHTML = '<p class="error">Error al cargar servicios. Intenta nuevamente.</p>';
    }
};

// Función de búsqueda de servicios
const buscarServicio = (termino) => {
    console.log(`🔍 Buscando servicios con término: "${termino}"`);

    const serviciosFiltrados = serviciosGlobal.filter(servicio =>
        servicio.nombre.toLowerCase().includes(termino.toLowerCase()) ||
        servicio.descripcion.toLowerCase().includes(termino.toLowerCase())
    );

    console.log(`✓ ${serviciosFiltrados.length} servicios coinciden`);

    contenedor.innerHTML = '';

    if (serviciosFiltrados.length === 0) {
        contenedor.innerHTML = '<p class="error">No se encontraron servicios</p>';
        return;
    }

    serviciosFiltrados.forEach(servicio => {
        contenedor.innerHTML += `
            <article class="card">
                <h4>${servicio.nombre}</h4>
                <p>${servicio.descripcion}</p>
                <div class="meta">
                    <span class="pill">ID: ${servicio.id}</span>
                </div>
            </article>
        `;
    });
};

// Agregar event listener al buscador si existe
const buscador = document.getElementById("buscador-servicios");
if (buscador) {
    buscador.addEventListener("input", (e) => {
        const termino = e.target.value;
        if (termino.length > 0) {
            buscarServicio(termino);
        } else {
            obtenerServicios();
        }
    });
}

obtenerServicios();