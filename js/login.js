document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.getElementById('login-form');

    if (loginForm) {

        loginForm.addEventListener('submit', async function (e) {

            e.preventDefault();

            const email = document.getElementById('email').value;

            const password = document.getElementById('password').value;

            console.log(`🔐 Iniciando login para: ${email}`);

            try {

                // Mostrar spinner si existe elemento
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Cargando...';
                }

                const response = await fetch(
                    CONFIG.API_URL + '/login',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json',
                        },

                        body: JSON.stringify({
                            email,
                            password
                        }),
                    }
                );

                console.log(`✓ Respuesta recibida con código: ${response.status}`);

                const data = await response.json();

                if (response.ok) {

                    console.log(`✓ Login exitoso para usuario: ${data.user.nombre}`);

                    // Guardar usuario
                    localStorage.setItem(
                        'user',
                        JSON.stringify(data.user)
                    );

                    alert('✓ Login exitoso');

                    // Redirigir
                    window.location.href = './perfil.html';

                } else {

                    console.error(`✗ Login falló: ${data.mensaje}`);
                    alert(`❌ ${data.mensaje}`);

                }

            } catch (error) {

                console.error('✗ Error de conexión:', error);

                alert('❌ Error de conexión con el servidor. Verifica que esté online.');

            } finally {
                // Re-habilitar botón
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Ingresar';
                }
            }
        });
    }
});
