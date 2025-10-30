document.addEventListener('DOMContentLoaded', function() {
    const botonHamburguesa = document.getElementById('botonHamburguesa');
    const menuDesplegable = document.getElementById('menuDesplegable');
    
    if (botonHamburguesa && menuDesplegable) {
        botonHamburguesa.addEventListener('click', function() {
            menuDesplegable.classList.toggle('activo');
        });
        
        menuDesplegable.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {

                if (menuDesplegable.classList.contains('activo')) {
                    menuDesplegable.classList.remove('activo');
                }
            });
        });
    }
});