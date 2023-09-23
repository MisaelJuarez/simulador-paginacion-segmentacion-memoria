const $btnIniciarProceso = document.getElementById('iniciar-proceso');
const $procesosActivos = document.getElementById('procesos-activos');
const $numeroProcesos = document.getElementById('numeros-procesos');
const $numeroPaginasOcupadas = document.getElementById('numero-paguinas-ocupadas');

let memoria = ['','','','','','','',''];

let $paguinas = document.querySelectorAll('.pagina');
let $arrayPaguinas = Array.from($paguinas);

let contadorProcesos = 0;
let contadorPaginas = 0;

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
const espacioEnMemoria = () => {
    let espacio = 0;
    memoria.forEach((e) => {
        if (e === '') espacio++;
    });
    return espacio;
}

$btnIniciarProceso.addEventListener('click', () => {
    const $tipoProceso = document.getElementById('lista-procesos').value;
    const $tamanioProceso = document.getElementById('tamanio-proceso').value;

    console.log(espacioEnMemoria());

    if (espacioEnMemoria() >= $tamanioProceso) {
        agregarProceso($tipoProceso);
        llenarmemoria($tamanioProceso,$tipoProceso);
        contadorProcesos++;
        $numeroProcesos.textContent = contadorProcesos;
        contadorPaginas += parseInt($tamanioProceso);
        $numeroPaginasOcupadas.textContent = contadorPaginas;
    } else {
        alert('No hay suficiente espacio');
    }

    console.log(memoria);
});

