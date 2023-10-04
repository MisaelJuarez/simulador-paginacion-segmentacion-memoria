const $btnIniciarProceso = document.getElementById('iniciar-proceso');
const $procesosActivos = document.getElementById('procesos-activos'); 
const $numeroProcesos = document.getElementById('numeros-procesos');
const $numeroPaginasOcupadas = document.getElementById('numero-paguinas-ocupadas');
const $terminarProceso = document.getElementById('terminar-proceso');
const $procesosEspera = document.getElementById('procesos-espera');
const $btnTerminarProceso = document.getElementById('btn-terminar-proceso');
const $reinicarProceso = document.getElementById('reiniciar-proceso');
const $reinicarTamanio = document.getElementById('reiniciar-tamanio');
const $btnReinicarProceso = document.getElementById('btn-reiniciar-proceso');
const $btnBorrar = document.getElementById('btn-borrar');

let memoria = ['','','','','','','',''];

let contadorProcesos = 0;
let contadorPaginas = 0;

let procesoEnEsperaSeleccionado = '';
let tamanioEnEsperaSeleccionado = '';

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

const agregarProcesoEspera = (tipoProceso,tamanioProceso) => {
    let p = document.createElement('p');
    p.textContent = tipoProceso;
    p.classList.add('p');
    p.setAttribute('data-proceso',`${tipoProceso}`);
    p.setAttribute('data-tamanio',`${tamanioProceso}`);
    p.setAttribute('id',`${tipoProceso}`);
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

const mostrarProcesoSeleccionado = (proceso,tamanio) => {
    $reinicarProceso.textContent = proceso;
    if (tamanio == '1') {
        $reinicarTamanio.textContent = '128';
    } else if(tamanio == '2') {
        $reinicarTamanio.textContent = '256';
    } else if(tamanio == '4') {
        $reinicarTamanio.textContent = '512';
    } else if(tamanio == '8') {
        $reinicarTamanio.textContent = '1,024';
    }
}
const reiniciarProcesoSeleccionado = (proceso,tamanio) => {
    let $procesosEliminar = document.querySelector(`#procesos-espera > #${proceso}`);
    if (parseInt(tamanio) <= espacioEnMemoria()) {
        agregarProceso(proceso);
        llenarmemoria(tamanio,proceso);
        procesosParaTerminar(proceso,tamanio);
        contarProcesos_contarPaginas(tamanio);
        $procesosEliminar.remove();
        $reinicarProceso.textContent = '';
        $reinicarTamanio.textContent = '';
    } else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes suficiente espacio para reinicar este proceso'
        });
    }
}

$btnIniciarProceso.addEventListener('click', () => {
    const $tipoProceso = document.getElementById('lista-procesos').value;
    const $tamanioProceso = document.getElementById('tamanio-proceso').value;
    
    if (espacioEnMemoria() >= $tamanioProceso) {
        agregarProceso($tipoProceso);
        llenarmemoria($tamanioProceso,$tipoProceso);
        contarProcesos_contarPaginas($tamanioProceso);
        procesosParaTerminar($tipoProceso,$tamanioProceso);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay espacio en la memoria, el proceso estara en espera'
        });
        agregarProcesoEspera($tipoProceso,$tamanioProceso);
    }
    arrayProcesosActivos = Array.from($terminarProceso);
});

$btnTerminarProceso.addEventListener('click', () => {
    const $procesoSeleccionado = $terminarProceso.value;
    quitarProcesoMemoria($procesoSeleccionado);
    removerProceso($procesoSeleccionado);
    quitarProcesoMemoriaVisual($procesoSeleccionado);
    actualizarNprocesosNpaginas($procesoSeleccionado);
});

$procesosEspera.addEventListener('click',(e) => {
    procesoEnEsperaSeleccionado = e.target.dataset.proceso;
    tamanioEnEsperaSeleccionado = e.target.dataset.tamanio;
    
    if (e.target.id) {
        $reinicarProceso.textContent = '';
        $reinicarTamanio.textContent = '';
    }
    mostrarProcesoSeleccionado(procesoEnEsperaSeleccionado,tamanioEnEsperaSeleccionado);
});

$btnReinicarProceso.addEventListener('click',() => {
    reiniciarProcesoSeleccionado(procesoEnEsperaSeleccionado,tamanioEnEsperaSeleccionado);
    arrayProcesosActivos = Array.from($terminarProceso);
});

$btnBorrar.addEventListener('click', (e) => {
    document.location.reload();
});