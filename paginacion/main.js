const $btnIniciarProceso = document.getElementById('iniciar-proceso');
const $procesosActivos = document.getElementById('procesos-activos');
const $numeroProcesos = document.getElementById('numeros-procesos');
const $numeroPaginasOcupadas = document.getElementById('numero-paguinas-ocupadas');
const $terminarProceso = document.getElementById('terminar-proceso');
const $procesosEspera = document.getElementById('procesos-espera');

let memoria = ['','','','','','','',''];

let contadorProcesos = 0;
let contadorPaginas = 0;

const procesosEnEspera = [];
const datosProceso = {
    tipo: '',
    tamanio: ''
}

let $paguinas = document.querySelectorAll('.pagina');
let $arrayPaguinas = Array.from($paguinas);

const agregarProceso = (tipoProceso) => {
    let p = document.createElement("p");
    p.textContent = tipoProceso;
    p.classList.add('p');
    $procesosActivos.appendChild(p);
}
const llenarmemoria = (tamanioProceso,tipoProceso) => {
    for (let i = 0; i < parseInt(tamanioProceso); i++) {
        for (let j = 0; j < $arrayPaguinas.length; j++) {
            if (memoria[j] === '') {
                $arrayPaguinas[j].textContent = tipoProceso;
                memoria[j] = tipoProceso;
                if (tipoProceso == 'A') {
                    $arrayPaguinas[j].classList.add('color-memoria-a');
                } else if(tipoProceso == 'B'){
                    $arrayPaguinas[j].classList.add('color-memoria-b');
                } else if(tipoProceso == 'C'){
                    $arrayPaguinas[j].classList.add('color-memoria-c');
                } else if(tipoProceso == 'D'){
                    $arrayPaguinas[j].classList.add('color-memoria-d');
                }else if(tipoProceso == 'E'){
                    $arrayPaguinas[j].classList.add('color-memoria-e');
                }
                break;
            }
        }
    }
}
const contarProcesos_contarPaginas = (tamanioProceso) => {
    contadorProcesos++;
    $numeroProcesos.textContent = contadorProcesos;
    contadorPaginas += parseInt(tamanioProceso);
    $numeroPaginasOcupadas.textContent = contadorPaginas;
}
const procesosParaTerminar = (tipoProceso) => {
    let option = document.createElement('option');
    option.textContent = tipoProceso;
    option.setAttribute('value',`${tipoProceso}`);
    $terminarProceso.appendChild(option);
}
const espacioEnMemoria = () => {
    let espacio = 0;
    memoria.forEach((e) => {
        if (e === '') espacio++;
    });
    return espacio;
}
const obtenerDatosProceso = (tipoProceso,tamanioProceso) => {
    datosProceso.tipo = tipoProceso;
    datosProceso.tamanio = tamanioProceso;
    let copiaDatos = Object.assign({}, datosProceso);
    procesosEnEspera.push(copiaDatos); 
    console.log(procesosEnEspera);
}
const agregarProcesoEspera = (tipoProceso) => {
    let p = document.createElement('p');
    p.textContent = tipoProceso;
    p.classList.add('p');
    $procesosEspera.appendChild(p);
}

$btnIniciarProceso.addEventListener('click', () => {
    const $tipoProceso = document.getElementById('lista-procesos').value;
    const $tamanioProceso = document.getElementById('tamanio-proceso').value;

    console.log(espacioEnMemoria());

    if (espacioEnMemoria() >= $tamanioProceso) {
        agregarProceso($tipoProceso);
        llenarmemoria($tamanioProceso,$tipoProceso);
        contarProcesos_contarPaginas($tamanioProceso);
        procesosParaTerminar($tipoProceso);
    } else {
        obtenerDatosProceso($tipoProceso,$tamanioProceso);
        agregarProcesoEspera($tipoProceso);
    }

    console.log(memoria);
});

