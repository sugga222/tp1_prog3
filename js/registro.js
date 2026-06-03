document.addEventListener('DOMContentLoaded', function () {

    const registroForm = document.getElementById('registro-form');

    if (registroForm) {

        registroForm.addEventListener('submit', async function (e) {

            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log(`✓ Iniciando registro para: ${nombre} ${apellido}`);

            try {

                // Mostrar spinner
                const submitBtn = registroForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Registrando...';
                }

                const response = await fetch(
                    CONFIG.API_URL + '/registro',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            nombre,
                            apellido,
                            email,
                            password
                        }),
                    }
                );

                console.log(`✓ Respuesta: ${response.status}`);

                const data = await response.json();

                if (response.ok) {
                    console.log(`✓ Registro exitoso para: ${data.user.nombre}`);
                    alert('✓ Registro exitoso. Redirigiendo...');
                    window.location.href = './login.html';
                } else {
                    console.error(`✗ ${data.mensaje}`);
                    alert(`❌ ${data.mensaje}`);
                }

            } catch (error) {
                console.error('✗ Error:', error);
                alert('❌ Error de conexión.');
            } finally {
                const submitBtn = registroForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Registrarse';
                }
            }
        });
    }
});