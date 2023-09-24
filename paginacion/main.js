const $btnIniciarProceso = document.getElementById('iniciar-proceso');
const $procesosActivos = document.getElementById('procesos-activos');
const $numeroProcesos = document.getElementById('numeros-procesos');
const $numeroPaginasOcupadas = document.getElementById('numero-paguinas-ocupadas');
const $terminarProceso = document.getElementById('terminar-proceso');
const $procesosEspera = document.getElementById('procesos-espera');
const $btnTerminarProceso = document.getElementById('btn-terminar-proceso');

let memoria = ['','','','','','','',''];

let contadorProcesos = 0;
let contadorPaginas = 0;

const procesosEnEspera = [];
const datosProceso = {
    tipo: '',
    tamanio: ''
}
let arrayProcesosActivos;

let $paguinas = document.querySelectorAll('.pagina');
let $arrayPaguinas = Array.from($paguinas);

const agregarProceso = (tipoProceso) => {
    let p = document.createElement("p");
    p.textContent = tipoProceso;
    p.setAttribute('class',`p ${tipoProceso}`);
    $procesosActivos.appendChild(p);
}
const llenarmemoria = (tamanioProceso,tipoProceso) => {
    for (let i = 0; i < parseInt(tamanioProceso); i++) {
        for (let j = 0; j < $arrayPaguinas.length; j++) {
            if (memoria[j] === '') {
                $arrayPaguinas[j].textContent = tipoProceso;
                memoria[j] = tipoProceso;
                $arrayPaguinas[j].classList.add(`color-memoria-${tipoProceso.toLowerCase()}`);
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
const procesosParaTerminar = (tipoProceso,tamanioProceso) => {
    let option = document.createElement('option');
    option.textContent = tipoProceso;
    option.setAttribute('value',`${tipoProceso}`);
    option.setAttribute('class',`${tipoProceso}`);
    option.setAttribute('id',`${tamanioProceso}`);
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

const quitarProcesoMemoria = (procesoSeleccionado) => {
    for (let i = 0; i < memoria.length; i++) {
        if (memoria[i] == procesoSeleccionado) {
            memoria[i] = '';
        }
    }
} 
const removerProceso = (procesoSeleccionado) => {
    const $procesoRemover = document.querySelectorAll(`.${procesoSeleccionado}`);
    let $arrayProcesosRemover = Array.from($procesoRemover);
    $arrayProcesosRemover.forEach(r => {
        r.remove();
    });
}
const quitarProcesoMemoriaVisual = (procesoSeleccionado) => {
    $arrayPaguinas.forEach(e => {
        if (e.textContent == procesoSeleccionado) {
            e.textContent = '';
            e.classList.remove(`color-memoria-${procesoSeleccionado.toLowerCase()}`);
        }
    })
}
const actualizarNprocesosNpaginas = (procesoSeleccionado) => {
    contadorProcesos--;
    $numeroProcesos.textContent = contadorProcesos; 
    arrayProcesosActivos.forEach(e => {
        if (e.id == '1' && e.className == procesoSeleccionado) {
            contadorPaginas -= 1;
        } else if (e.id == '2' && e.className == procesoSeleccionado) {
            contadorPaginas -= 2;
        } else if (e.id == '4' && e.className == procesoSeleccionado) {
            contadorPaginas -= 4;
        } else if (e.id == '8' && e.className == procesoSeleccionado) {
            contadorPaginas -= 8;
        }
    });
    $numeroPaginasOcupadas.textContent = contadorPaginas;
}

$btnIniciarProceso.addEventListener('click', () => {
    const $tipoProceso = document.getElementById('lista-procesos').value;
    const $tamanioProceso = document.getElementById('tamanio-proceso').value;
    
    console.log(espacioEnMemoria());

    if (espacioEnMemoria() >= $tamanioProceso) {
        agregarProceso($tipoProceso);
        llenarmemoria($tamanioProceso,$tipoProceso);
        contarProcesos_contarPaginas($tamanioProceso);
        procesosParaTerminar($tipoProceso,$tamanioProceso);
    } else {
        obtenerDatosProceso($tipoProceso,$tamanioProceso);
        agregarProcesoEspera($tipoProceso);
    }
    arrayProcesosActivos = Array.from($terminarProceso);
    console.log(memoria);
});

$btnTerminarProceso.addEventListener('click', () => {
    const $procesoSeleccionado = $terminarProceso.value;
    
    console.log($procesoSeleccionado);
    quitarProcesoMemoria($procesoSeleccionado);
    removerProceso($procesoSeleccionado);
    quitarProcesoMemoriaVisual($procesoSeleccionado);
    actualizarNprocesosNpaginas($procesoSeleccionado);
    console.log(memoria);
});