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

let procesoRepetido = 1;

let $paguinas = document.querySelectorAll('.pagina');
let $arrayPaguinas = Array.from($paguinas);

const obtenerColorAleatorio = () => {
    const letras = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}
const procesoExiste = (proceso) => {
    let existe = false;
    for (let i = 0; i < memoria.length; i++){
        if (memoria[i] == proceso) existe = true;
    }
    return existe;
}
const agregarProceso = (tipoProceso,bandera=true) => {
    let p = document.createElement("p");
    if (procesoExiste(tipoProceso)) {
        p.textContent = tipoProceso+procesoRepetido;
        p.setAttribute('class',`p ${tipoProceso+procesoRepetido}`);
    } else {
        p.textContent = tipoProceso;
        p.setAttribute('class',`p ${tipoProceso}`);
    }
    $procesosActivos.appendChild(p);
}
const llenarmemoria = (tamanioProceso,tipoProceso) => {
    let procesoIguales = procesoExiste(tipoProceso);
    let colorAleatorio = obtenerColorAleatorio();
    let hayProcesosRepetidos = false;
    for (let i = 0; i < parseInt(tamanioProceso); i++) {
        for (let j = 0; j < $arrayPaguinas.length; j++) {
            if (procesoIguales) {
                if (memoria[j] === '') {
                    $arrayPaguinas[j].textContent = tipoProceso+procesoRepetido;
                    memoria[j] = tipoProceso+procesoRepetido;
                    $arrayPaguinas[j].style.backgroundColor = colorAleatorio;
                    $arrayPaguinas[j].style.textAlign = 'center';
                    hayProcesosRepetidos = true;
                    break;
                }
            } else {
                if (memoria[j] === '') {
                    $arrayPaguinas[j].textContent = tipoProceso;
                    memoria[j] = tipoProceso;
                    $arrayPaguinas[j].classList.add(`color-memoria-${tipoProceso.toLowerCase()}`);
                    break;
                }
            }
        }
    }
    if (hayProcesosRepetidos) procesoRepetido++;
    console.log(procesoIguales);
    console.log(memoria);
}
const contarProcesos_contarPaginas = (tamanioProceso) => {
    contadorProcesos++;
    $numeroProcesos.textContent = contadorProcesos;
    contadorPaginas += parseInt(tamanioProceso);
    $numeroPaginasOcupadas.textContent = contadorPaginas;
}
const procesosParaTerminar = (tipoProceso,tamanioProceso) => {
    let option = document.createElement('option');
    if (procesoExiste(tipoProceso)) {
        option.textContent = tipoProceso+procesoRepetido;
        option.setAttribute('value',`${tipoProceso+procesoRepetido}`);
        option.setAttribute('class',`${tipoProceso+procesoRepetido}`);
        option.setAttribute('id',`${tamanioProceso}`);
    } else {
        option.textContent = tipoProceso;
        option.setAttribute('value',`${tipoProceso}`);
        option.setAttribute('class',`${tipoProceso}`);
        option.setAttribute('id',`${tamanioProceso}`);
    }
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
            if(procesoSeleccionado == 'A' || 
                procesoSeleccionado == 'B' || 
                procesoSeleccionado == 'C' || 
                procesoSeleccionado == 'D' || 
                procesoSeleccionado == 'E') {
                e.classList.remove(`color-memoria-${procesoSeleccionado.toLowerCase()}`);
            } else {
                e.style.backgroundColor = '';
            }
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
    $btnReinicarProceso.removeAttribute('disabled','true');
    $btnReinicarProceso.classList.remove('boton-dasactivado');
}
const reiniciarProcesoSeleccionado = (proceso,tamanio) => {
    if (procesoExiste(proceso)) {
        Swal.fire({
            icon: 'warning',
            title: 'El proceso existe',
            text: `Se reiniciara como: ${proceso+procesoRepetido}`,
          });
    }
    let $procesosEliminar = document.querySelector(`#procesos-espera > #${proceso}`);
    if (parseInt(tamanio) <= espacioEnMemoria()) {
        agregarProceso(proceso);
        procesosParaTerminar(proceso,tamanio);
        llenarmemoria(tamanio,proceso);
        contarProcesos_contarPaginas(tamanio);
        $procesosEliminar.remove();
        $reinicarProceso.textContent = '';
        $reinicarTamanio.textContent = '';
        $btnReinicarProceso.setAttribute('disabled','true');
        $btnReinicarProceso.classList.add('boton-dasactivado');
        $btnTerminarProceso.removeAttribute('disabled');
        $btnTerminarProceso.classList.remove('boton-dasactivado');
    } else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes suficiente espacio para reinicar este proceso'
        });
    }
}

window.addEventListener('load',(E) => {
    $btnTerminarProceso.setAttribute('disabled','true');
    $btnTerminarProceso.classList.add('boton-dasactivado');
    $btnReinicarProceso.setAttribute('disabled','true');
    $btnReinicarProceso.classList.add('boton-dasactivado');
});

$btnIniciarProceso.addEventListener('click', () => {
    $btnTerminarProceso.removeAttribute('disabled');
    $btnTerminarProceso.classList.remove('boton-dasactivado');

    const $tipoProceso = document.getElementById('lista-procesos').value;
    const $tamanioProceso = document.getElementById('tamanio-proceso').value;
    
    if (espacioEnMemoria() >= $tamanioProceso) {
        agregarProceso($tipoProceso);
        procesosParaTerminar($tipoProceso,$tamanioProceso);
        llenarmemoria($tamanioProceso,$tipoProceso);
        contarProcesos_contarPaginas($tamanioProceso);
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
    quitarProcesoMemoriaVisual($procesoSeleccionado);
    quitarProcesoMemoria($procesoSeleccionado);
    removerProceso($procesoSeleccionado);
    actualizarNprocesosNpaginas($procesoSeleccionado);
    if (contadorProcesos==0) {
        $btnTerminarProceso.setAttribute('disabled','true');
        $btnTerminarProceso.classList.add('boton-dasactivado');
    }
});

$procesosEspera.addEventListener('click',(e) => {
    procesoEnEsperaSeleccionado = e.target.dataset.proceso;
    tamanioEnEsperaSeleccionado = e.target.dataset.tamanio;
    
    if (e.target.id == 'procesos-espera') {
        $reinicarProceso.textContent = '';
        $reinicarTamanio.textContent = '';
        $btnReinicarProceso.setAttribute('disabled','true');
        $btnReinicarProceso.classList.add('boton-dasactivado');
    } else {
        mostrarProcesoSeleccionado(procesoEnEsperaSeleccionado,tamanioEnEsperaSeleccionado);
    }
});

$btnReinicarProceso.addEventListener('click',() => {
    reiniciarProcesoSeleccionado(procesoEnEsperaSeleccionado,tamanioEnEsperaSeleccionado);
    arrayProcesosActivos = Array.from($terminarProceso);
});

$btnBorrar.addEventListener('click', (e) => {
    document.location.reload();
});