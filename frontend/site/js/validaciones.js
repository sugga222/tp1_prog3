// Validaciones de formularios
document.addEventListener('DOMContentLoaded', function() {
    const API_BASE = (typeof CONFIG !== 'undefined' && CONFIG.API_URL) ? CONFIG.API_URL : 'http://localhost:3000';
    // Validación del formulario de pedido
    const pedidoForm = document.querySelector('#contenido form');
    if (pedidoForm && pedidoForm.querySelector('input[name="nombre"]')) {
        pedidoForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Recopilar datos
            const formData = new FormData(pedidoForm);
            const data = Object.fromEntries(formData);

            // Validar campos requeridos
            const requiredFields = ['nombre', 'apellido', 'email', 'servicio'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = pedidoForm.querySelector(`[name="${field}"]`);
                if (!data[field] || data[field].trim() === '') {
                    input.style.borderColor = 'var(--danger)';
                    isValid = false;
                } else {
                    input.style.borderColor = 'var(--border)';
                }
            });

            if (!isValid) {
                alert('Por favor completa todos los campos requeridos');
                return;
            }

            // Enviar al backend
            try {
                const response = await fetch(API_BASE + '/pedidos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    alert('Pedido enviado exitosamente. Te contactaremos pronto.');
                    pedidoForm.reset();
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || 'Error al enviar el pedido');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error de conexión. Intenta nuevamente.');
            }
        });
    }

    // Validación del formulario de contacto
    const contactoForm = document.querySelector('#contenido form');
    if (contactoForm && contactoForm.querySelector('input[name="email"]')) {
        contactoForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(contactoForm);
            const data = Object.fromEntries(formData);

            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = contactoForm.querySelector('[name="email"]');

            if (!emailRegex.test(data.email)) {
                emailInput.style.borderColor = 'var(--danger)';
                alert('Por favor ingresa un email válido');
                return;
            } else {
                emailInput.style.borderColor = 'var(--border)';
            }

            // Enviar al backend
            try {
                const response = await fetch(API_BASE + '/contacto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    alert('Mensaje enviado exitosamente. Te responderemos pronto.');
                    contactoForm.reset();
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || 'Error al enviar el mensaje');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error de conexión. Intenta nuevamente.');
            }
        });
    }

    // Limpiar estilos de error al escribir
    document.addEventListener('input', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
            e.target.style.borderColor = 'var(--border)';
        }
    });
});
