const countries = [
    "Afganistán",
    "Albania",
    "Alemania",
    "Andorra",
    "Angola",
    "Antigua y Barbuda",
    "Arabia Saudita",
    "Argelia",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaiyán",
    "Bahamas",
    "Bahréin",
    "Bangladés",
    "Barbados",
    "Bielorrusia",
    "Bélgica",
    "Belice",
    "Benín",
    "Bhután",
    "Bolivia",
    "Bosnia y Herzegovina",
    "Botsuana",
    "Brasil",
    "Brunéi",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Camerún",
    "Canadá",
    "Catar",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoras",
    "Congo",
    "Costa Rica",
    "Croacia",
    "Cuba",
    "Dinamarca",
    "Dominica",
    "Ecuador",
    "Egipto",
    "El Salvador",
    "Emiratos Árabes Unidos",
    "Eslovaquia",
    "Eslovenia",
    "España",
    "Estados Unidos",
    "Estonia",
    "Eswatini",
    "Etiopía",
    "Fiji",
    "Filipinas",
    "Finlandia",
    "Francia",
    "Gabón",
    "Gambia",
    "Georgia",
    "Ghana",
    "Grecia",
    "Granada",
    "Guatemala",
    "Guinea",
    "Guinea-Bisáu",
    "Guinea Ecuatorial",
    "Haití",
    "Holanda",
    "Honduras",
    "Hungría",
    "India",
    "Indonesia",
    "Irán",
    "Irak",
    "Irlanda",
    "Islândia",
    "Israel",
    "Italia",
    "Jamaica",
    "Japón",
    "Jordania",
    "Kazajistán",
    "Kenia",
    "Kirguistán",
    "Kiribati",
    "Kuwait",
    "Laos",
    "Lesoto",
    "Letonia",
    "Líbano",
    "Liberia",
    "Libia",
    "Liechtenstein",
    "Lituania",
    "Luxemburgo",
    "Madagascar",
    "Malasia",
    "Malawi",
    "Maldivas",
    "Malta",
    "Marruecos",
    "Mauricio",
    "Mauritania",
    "México",
    "Micronesia",
    "Moldavia",
    "Mónaco",
    "Mongolia",
    "Montenegro",
    "Mozambique",
    "Namibia",
    "Nauru",
    "Nepal",
    "Nicaragua",
    "Níger",
    "Nigeria",
    "Noruega",
    "Nueva Zelanda",
    "Omán",
    "Pakistán",
    "Palaos",
    "Panamá",
    "Papúa Nueva Guinea",
    "Paraguay",
    "Perú",
    "Polonia",
    "Portugal",
    "Reino Unido",
    "República Centroafricana",
    "República Checa",
    "República Dominicana",
    "República del Congo",
    "República de Corea",
    "República del Sudán",
    "República Islámica de Irán",
    "Rumania",
    "Rusia",
    "Rwanda",
    "San Cristóbal y Nieves",
    "San Marino",
    "Santa Lucía",
    "Santo Tomé y Príncipe",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leona",
    "Singapur",
    "Eslovenia",
    "Somalia",
    "Sri Lanka",
    "Sudáfrica",
    "Sudán",
    "Suecia",
    "Suiza",
    "Siria",
    "Tailandia",
    "Tanzania",
    "Timor Oriental",
    "Togo",
    "Tonga",
    "Trinidad y Tobago",
    "Túnez",
    "Turkmenistán",
    "Turquía",
    "Tuvalu",
    "Ucrania",
    "Uganda",
    "Uruguay",
    "Uzbekistán",
    "Vanuatu",
    "Vaticano",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabue"
];


document.addEventListener('DOMContentLoaded', () => {
    const ul = document.getElementById('op');
    const input = document.getElementById('search');
    let selectedCountry = ''; // Variable para almacenar el país seleccionado

    // Cargar la lista de países
    countries.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);

        li.addEventListener('click', () => {
            selectedCountry = item; // Guardar el país seleccionado en la variable
            document.getElementById('span_pais').innerHTML = selectedCountry; // Limpiar el campo de búsqueda
            let content = document.getElementById('content');
            let wrapper = document.getElementById('wrapper-img');
            content.style.opacity = '0'; // Iniciar opacidad a 0
            setTimeout(() => {
                content.classList.remove('content_active'); // Remover la clase después de la transición de opacidad
                wrapper.classList.remove('img-active');
            }, 50);
        });
    });

    // Filtrar la lista según la búsqueda
    input.addEventListener('input', () => {
        const searchTerm = input.value.toLowerCase();
        const listItems = ul.getElementsByTagName('li');

        for (let i = 0; i < listItems.length; i++) {
            const li = listItems[i];
            if (li.textContent.toLowerCase().includes(searchTerm)) {
                li.style.display = ''; // Mostrar
            } else {
                li.style.display = 'none'; // Ocultar
            }
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {

    img = document.getElementById('wrapper-img');
    let content = document.getElementById('content');
    let wrapper = document.getElementById('wrapper-img');

    img.addEventListener('click', (event) => {
        event.preventDefault();
        if (content.classList.contains("content_active")) {
            content.style.opacity = '0'; // Iniciar opacidad a 0
            setTimeout(() => {
                content.classList.remove('content_active'); // Remover la clase después de la transición de opacidad
                wrapper.classList.remove('img-active');
            }, 50);
        } else {
            content.classList.add("content_active");
            wrapper.classList.add('img-active');
            setTimeout(() => {
                content.style.opacity = '1'; // Cambiar opacidad a 1 después de expandir
            }, 200);
        }
    });
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



//limitar fecha 
var today = new Date().toISOString().split('T')[0];
document.getElementById("date").setAttribute('max', today);
