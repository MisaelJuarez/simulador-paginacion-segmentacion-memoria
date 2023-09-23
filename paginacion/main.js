const $btnIniciarProceso = document.getElementById('iniciar-proceso');
const $procesosActivos = document.getElementById('procesos-activos');

let memoria = ['','','','','','','',''];

$btnIniciarProceso.addEventListener('click', () => {
    const $tipoProceso = document.getElementById('lista-procesos').value;
    const $tamanioProceso = document.getElementById('tamanio-proceso').value;
    let espacioEnMemoria = 0;

    memoria.forEach((e) => {
        if (e === '') espacioEnMemoria++;
    });

    if (espacioEnMemoria >= $tamanioProceso) {
        let p = document.createElement("p");
        p.textContent = $tipoProceso;
        p.classList.add('p');
        $procesosActivos.appendChild(p);
    
        let $paguinas = document.querySelectorAll('.pagina');
        let $arrayPaguinas = Array.from($paguinas);
        
        for (let i = 0; i < parseInt($tamanioProceso); i++) {
            for (let j = 0; j < $arrayPaguinas.length; j++) {
                if (memoria[j] === '') {
                    $arrayPaguinas[j].textContent = $tipoProceso;
                    memoria[j] = $tipoProceso;
                    if ($tipoProceso == 'A') {
                        $arrayPaguinas[j].classList.add('color-memoria-a');
                    } else if($tipoProceso == 'B'){
                        $arrayPaguinas[j].classList.add('color-memoria-b');
                    } else if($tipoProceso == 'C'){
                        $arrayPaguinas[j].classList.add('color-memoria-c');
                    } else if($tipoProceso == 'D'){
                        $arrayPaguinas[j].classList.add('color-memoria-d');
                    }else if($tipoProceso == 'E'){
                        $arrayPaguinas[j].classList.add('color-memoria-e');
                    }
                    break;
                }
            }
        }
    } else {
        alert('No hay suficiente espacio');
    }

    console.log(memoria);
    console.log(espacioEnMemoria);
});

