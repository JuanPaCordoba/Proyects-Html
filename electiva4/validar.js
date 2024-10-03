const inputElements = document.querySelectorAll('.inputs input:not(#telefono):not(#date)');

    inputElements.forEach(input => {
        // Agrega un evento de 'input' para eliminar números
        input.addEventListener('input', function() {
            // Reemplaza los caracteres no permitidos (no se permiten números)
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
        });

        // (Opcional) Agrega un evento de 'keypress' para prevenir la entrada de números
        input.addEventListener('keypress', function(event) {
            const charCode = event.charCode;
            // Permite letras (A-Z, a-z) y espacios (32)
            if (charCode !== 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
                event.preventDefault(); // Evita la entrada
            }
        });
    });

    // Selecciona el campo de teléfono
    const telefonoInput = document.getElementById('telefono');

    // Agrega un evento de 'input' para permitir solo números
    telefonoInput.addEventListener('input', function() {
        // Reemplaza los caracteres no permitidos (no se permiten letras)
        this.value = this.value.replace(/[^0-9]/g, ''); // Solo permite números
    });

    // (Opcional) Agrega un evento de 'keypress' para prevenir la entrada de letras
    telefonoInput.addEventListener('keypress', function(event) {
        const charCode = event.charCode;
        // Permite solo números (0-9)
        if (charCode < 48 || charCode > 57) {
            event.preventDefault(); // Evita la entrada
        }
    });