let personas = JSON.parse(localStorage.getItem('personas')) || [

];

const lista = document.getElementById('listas');

function renderPersonas() {
    lista.innerHTML = '';
    personas.forEach(persona => {
        var today = new Date().toISOString().split('T')[0]; 
        const edadUser = today - persona.edad;
        console.log(today);
        const elemento = document.createElement('li');
        elemento.classList.add('new-item'); // Aplicar la clase de animación
        elemento.innerHTML = `<div class="leftcontainer">
                        <h4>${persona.nombre}</h4>
                        <p style="font-size: 11px"> <b>${edadUser}</b> Años</p>
                    </div>
                    <div class="rigthcontainer">
                        <h3 style="font-size: 17px">${persona.pais}</h3>
                        <i id="editar" class="fa-regular fa-pen-to-square editar"></i>
                        <i class="fa-solid fa-trash delete"></i>
                    </div>`
        lista.appendChild(elemento);
        openModalEdit();
        eliminarRegistro();
    });
}

const btn = document.getElementById('btn');
const actu = document.getElementById('actualizar');

btn.addEventListener('click', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const sexo = document.getElementById('sexo').value;
    const edad = document.getElementById('date').value;
    const pais = document.getElementById('span_pais').textContent;
    const dpto = document.getElementById('departamento').value;
    const ciudad = document.getElementById('ciudad').value;
    const telefono = document.getElementById('telefono').value;
    const temperatura = document.getElementById('temperatureValue').textContent;

    if (nombre === '' || edad === '' || sexo === '' || pais === '' || dpto === '' || ciudad === '' || telefono === '' || temperatura === '') {
        alert('Por favor diligencie todos los campos');
    } else {
        personas.unshift({ nombre, sexo, edad, pais, dpto, ciudad, telefono, temperatura});
        localStorage.setItem('personas', JSON.stringify(personas));
        renderPersonas();
        document.getElementsByClassName('overlay')[0].style = 'display: none';
        document.getElementsByClassName('formulario')[0].style = 'display: none';
        limpiarCampos();
    }
});

document.getElementById('btn-agregar').addEventListener('click', (event) => {
    document.getElementsByClassName('overlay')[0].style = 'display: block';
    document.getElementsByClassName('formulario')[0].style = 'display: block';
});

let indiceA = 0;

function openModalEdit() {
    const botonesEditar = document.querySelectorAll('.editar');
    botonesEditar.forEach((boton) => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            const nombrePersona = boton.closest('li').querySelector('.leftcontainer h4').textContent;

            const personaArray = personas.find(persona => persona.nombre === nombrePersona);

            const indice = personas.findIndex(persona => persona.nombre === nombrePersona);

            indiceA = indice;

            console.log(indice);
            console.log(personaArray.edad);

            document.getElementsByClassName('overlay')[0].style = 'display: block';
            document.getElementsByClassName('formulario')[0].style = 'display: block';
            document.getElementById('nombre').value = personaArray.nombre;
            document.getElementById('edad').value = personaArray.edad;
            document.getElementById('eps').value = personaArray.eps;
            btn.style = 'display: none';
            actu.style = 'display: block';
        });
    });
}

function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('date').value = '';
    document.getElementById('span_pais').textContent = ''; 
    document.getElementById('departamento').value = '';
    document.getElementById('ciudad').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('temperatureValue').textContent = '';


}

actu.addEventListener('click', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const eps = document.getElementById('eps').value;
    personas[indiceA] = { nombre, edad, eps };
    localStorage.setItem('personas', JSON.stringify(personas));
    document.getElementsByClassName('overlay')[0].style = 'display: none';
    document.getElementsByClassName('formulario')[0].style = 'display: none';
    actu.style = 'display: none';
    btn.style = 'display: block';
    limpiarCampos();
    renderPersonas();
});

function eliminarRegistro(){
    const botonesEliminar = document.querySelectorAll('.delete');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', event => {
            event.preventDefault();
            const nombrePersona = boton.closest('li').querySelector('.leftcontainer h4').textContent;
            const indice = personas.findIndex(persona => persona.nombre === nombrePersona);
            personas.splice(indice, 1);
            localStorage.setItem('personas', JSON.stringify(personas));
            renderPersonas();
        })
    });
}

const elemetosHover = document.querySelectorAll('.menu-list ul li');
elemetosHover.forEach((elemento) => {
    elemento.addEventListener('click', (event) => {
        elemetosHover.forEach((elemento) => {
            elemento.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    })
});

renderPersonas();


