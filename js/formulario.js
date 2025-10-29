document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const statusMessage = document.getElementById('formStatus');
    const submitButton = document.getElementById('submitButton');

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyVCheDsQgRhfLBSPIAt4YiSUUPwDM2iWp2YK_gpmUTxxO-HE2DfmJXsNQDuFvxXfOf/exec"; 

    if (!form || !statusMessage || !submitButton) {
        console.error("No se encontraron todos los elementos del formulario (ID: contactForm, submitButton, formStatus).");
        return;
    }
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        
        statusMessage.textContent = 'Enviando mensaje...';
        statusMessage.style.color = 'var(--color-dorado-fuerte)';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.6';

        const formData = new FormData(form);
        const urlSearchParams = new URLSearchParams(formData);
        const data = urlSearchParams.toString();
        
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, { 
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data
            });

            if (response.ok) {
                statusMessage.textContent = '✅ ¡Mensaje enviado con éxito! Recibido en la base de datos.';
                statusMessage.style.color = 'green';
                form.reset(); 
            } else {
                throw new Error('Error al conectar con el servicio de Google.');
            }
        } catch (error) {
            console.error('Error de envío:', error);
            statusMessage.textContent = '❌ Error al enviar. Por favor, inténtelo de nuevo más tarde.';
            statusMessage.style.color = 'red';
        } finally {
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
        }
    });
});