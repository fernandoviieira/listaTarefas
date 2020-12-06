const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')
btnTarefa.setAttribute('title', 'Apagar essa tarefa')


function criaLi() {
    const li = document.createElement('li')
    return li
}

inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
    }
})

function limpaInput() {
    inputTarefa.value = ''
    inputTarefa.focus()
}

function criarBotaoApagar(li) {
    li.innerText += ''
    const btnApagar = document.createElement('button')
    btnApagar.innerText = 'Apagar'
    btnApagar.setAttribute('class', 'apagar')
    btnApagar.setAttribute('title', 'Apagar essa tarefa')
    li.appendChild(btnApagar)
}

function criaTarefa(textInput) {
    const li = criaLi()
    li.innerText = textInput
    tarefas.appendChild(li)
    limpaInput()
    criarBotaoApagar(li)
    salvarTarefas()
}

btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return
    criaTarefa(inputTarefa.value)

})

document.addEventListener('click', function (e) {
    const el = e.target
    if (el.classList.contains('apagar')) {
        el.parentElement.remove()
        salvarTarefas()
    }
})

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', ' ').trim()
        listaDeTarefas.push(tarefaTexto)
        
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas' , tarefasJSON)
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}

adicionaTarefasSalvas()