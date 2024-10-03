

let personas = JSON.parse(localStorage.getItem('personas')) || [];
let isDeleted = false;
let isEdited = false;


const lista = document.getElementById('listas');
const input = document.getElementById('input');

function renderPersonasPorNombre(personaName) {
    let filtrados;
    if (personaName === '') {
        filtrados = personas;
    } else {
        filtrados = personas.filter(persona => persona.nombre.toLowerCase().includes(personaName.toLowerCase()));
    }

    lista.innerHTML = '';
    filtrados.forEach(persona => {
        const fechaNacimiento = new Date(persona.edad);
        const edadUser = new Date().getFullYear() - fechaNacimiento.getFullYear();
        const elemento = document.createElement('li');
        elemento.classList.add('new-item');
        elemento.innerHTML = `<div class="leftcontainer">
                                <h4>${persona.nombre}</h4>
                                <p style="font-size: 11px"><b>${edadUser}</b> Años</p>
                            </div>
                            <div class="rigthcontainer">
                                <h3>${persona.pais}</h3>
                                <i style="display: none" id="editar" class="fa-regular fa-pen-to-square editar"></i>
                                <i style="display: none" class="fa-solid fa-trash delete"></i>
                            </div>`;
        lista.appendChild(elemento);
        openModalEdit();
        eliminarRegistro();
    });

    // Mostrar/ocultar botones según el input
    const botonesEditar = document.querySelectorAll('.editar');
    const botonesEliminar = document.querySelectorAll('.delete');
    
    if (isDeleted == true) {
        botonesEditar.forEach((boton) => {
            boton.style.display = 'none';
        });
        botonesEliminar.forEach((boton) => {
            boton.style.display = 'block';
        });
    } else if (isEdited == true) {
        botonesEditar.forEach((boton) => {
            boton.style.display = 'block';
        });
        botonesEliminar.forEach((boton) => {
            boton.style.display = 'none';
        });
    }
    else {
        botonesEditar.forEach((boton) => {
            boton.style.display = 'none';
        });
        botonesEliminar.forEach((boton) => {
            boton.style.display = 'none';
        });
    }
}

let value = '';
const filtro = document.getElementById('filtro');

input.addEventListener('input', () => {
    value = input.value;
    renderPersonasPorNombre(value);
})

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
        personas.unshift({ nombre, sexo, edad, pais, dpto, ciudad, telefono, temperatura });
        localStorage.setItem('personas', JSON.stringify(personas));
        renderPersonasPorNombre('');
        document.getElementsByClassName('overlay')[0].style.display = 'none';
        document.getElementsByClassName('formulario')[0].style.display = 'none';
        limpiarCampos();
    }
});

let valTemp = '';
let temp = document.getElementById('temperatureValue');
let tempColor = document.getElementById('temperatura');
function updateTemperature(value) {
    temp.innerText = value + '°C';
    if(value > 25){
        console.log(value);
        tempColor.style.background = 'linear-gradient(90deg, rgba(235, 83, 13, 0.5) 50%, rgba(226, 188, 63, 0.5) 100%)';
    }else{
        tempColor.style.background = 'linear-gradient(90deg, rgba(54, 13, 235, 0.5) 50%, rgba(101, 116, 253, 0.5) 100%)';
    }
}


document.getElementById('btn-agregar').addEventListener('click', (event) => {
    document.getElementsByClassName('overlay')[0].style.display = 'block';
    document.getElementsByClassName('formulario')[0].style.display = 'block';
});

document.getElementById('close-btn').addEventListener('click', (event) => {
    document.getElementsByClassName('overlay')[0].style.display = 'none';
    document.getElementsByClassName('formulario')[0].style.display = 'none';
    limpiarCampos();
});

let indiceA = 0;

function openModalEdit() {
    const botonesEditar = document.querySelectorAll('.editar');
    botonesEditar.forEach((boton) => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            btn.style.display = 'none';

            const nombrePersona = boton.closest('li').querySelector('.leftcontainer h4').textContent;
            const personaArray = personas.find(persona => persona.nombre === nombrePersona);
            const indice = personas.findIndex(persona => persona.nombre === nombrePersona);
            indiceA = indice;

            document.getElementsByClassName('overlay')[0].style.display = 'block';
            document.getElementsByClassName('formulario')[0].style.display = 'block';
            document.getElementById('nombre').value = personaArray.nombre;
            document.getElementById('date').value = personaArray.edad;
            document.getElementById('sexo').value = personaArray.sexo;
            document.getElementById('span_pais').textContent = personaArray.pais;
            document.getElementById('departamento').value = personaArray.dpto;
            document.getElementById('ciudad').value = personaArray.ciudad;
            document.getElementById('telefono').value = personaArray.telefono;
            let temperaturaString = personaArray.temperatura;
            let temperatura = parseInt(temperaturaString.replace('°', ''));
            updateTemperature(temperatura);
            document.getElementById('temperature').value = temperatura;
            document.getElementById('temperatureValue').textContent = personaArray.temperatura;
            actu.style.display = 'block';
            
        });
    });
}

function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('sexo').value = 'Sexo';
    document.getElementById('date').value = '';
    document.getElementById('span_pais').textContent = 'País';
    document.getElementById('departamento').value = '';
    document.getElementById('ciudad').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('temperature').value = '0';
    document.getElementById('temperatureValue').textContent = '0°';
}

actu.addEventListener('click', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const sexo = document.getElementById('sexo').value;
    const edad = document.getElementById('date').value; // La fecha de nacimiento
    const pais = document.getElementById('span_pais').textContent;
    const dpto = document.getElementById('departamento').value;
    const ciudad = document.getElementById('ciudad').value;
    const telefono = document.getElementById('telefono').value;
    const temperatura = document.getElementById('temperatureValue').textContent;

    personas[indiceA] = { nombre, sexo, edad, pais, dpto, ciudad, telefono, temperatura };
    localStorage.setItem('personas', JSON.stringify(personas));
    renderPersonasPorNombre(value);
    limpiarCampos();
    actu.style.display = 'none';
    btn.style.display = 'block';
    document.getElementsByClassName('overlay')[0].style.display = 'none';
    document.getElementsByClassName('formulario')[0].style.display = 'none';
});

function eliminarRegistro() {
    const botonesEliminar = document.querySelectorAll('.delete');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', event => {
            event.preventDefault();
            const nombrePersona = boton.closest('li').querySelector('.leftcontainer h4').textContent;
            const indice = personas.findIndex(persona => persona.nombre === nombrePersona);
            if (indice !== -1) {
                personas.splice(indice, 1);
                localStorage.setItem('personas', JSON.stringify(personas));
                renderPersonasPorNombre(value);
            }
        });
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


const editarMenu = document.getElementById('edit');
const remove = document.getElementById('remove');
const addbutton = document.getElementById('btn-agregar');
const editarBtn = document.getElementById('filtro');
const removebtn = document.getElementById('removebtn');
const add = document.getElementById('add');
const noBtn = document.querySelectorAll('.editar');

editarMenu.addEventListener('click', (event) => {
    isEdited = true;
    isDeleted = false;
    console.log(isEdited);
    addbutton.style.display = 'none';
    editarBtn.style.display = 'block';
    input.style.display = 'block';
    const botonesEditar = document.querySelectorAll('.editar');
    botonesEditar.forEach((boton) => {
        boton.style.display = 'block'
    }
    );

    const botonesEliminar = document.querySelectorAll('.delete');
    botonesEliminar.forEach((boton) => {
        boton.style.display = 'none'
    }
    );
})

remove.addEventListener('click', (event) => {
    isDeleted = true;
    isEdited = false;
    addbutton.style.display = 'none';
    editarBtn.style.display = 'block';
    input.style.display = 'block';
    const botonesEditar = document.querySelectorAll('.editar');
    botonesEditar.forEach((boton) => {
        boton.style.display = 'none'
    }

    );
    const botonesEliminar = document.querySelectorAll('.delete');
    botonesEliminar.forEach((boton) => {
        boton.style.display = 'block'
    }
    );
})

add.addEventListener('click', (event) => {
    isDeleted = false;
    isEdited = false;
    addbutton.style.display = 'block';
    editarBtn.style.display = 'none';
    input.style.display = 'none';
})



renderPersonasPorNombre('');





