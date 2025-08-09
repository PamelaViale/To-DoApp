const $ = (selector) => document.querySelector(selector)

const form = $("#formulario")
const inputTarea = $("#tarea")
const selectCategoria = $("#categoria")
const contenedorTareas = $("#lista-tareas")
const botonBorrarTodo = $("#borrar-todo")

let tareas = [] // lista de invitados

document.addEventListener("DOMContentLoaded", function () {
  form.addEventListener("submit", agregarALista)
  botonBorrarTodo.addEventListener("click", borrarTodas)
}) // agrego un evento al dom para colocar el envío del formulario, carga el evento submit

function agregarALista(e) { // unción de agregar a la lista de tareas
  e.preventDefault() // previene el envio automático de los datos

  const texto = inputTarea.value.trim(); // guardo el valor del input 
  const categoria = selectCategoria.value // guardo el balor de la catagoria seleccionada pr el usuario

  if (!texto) {
    alert("Tenés que agregar una tarea")
    return
  } // si no hay un texto en el input salta el alert

  const nuevaTarea = {
    id: Date.now(),
    texto,
    categoria
  } // creo un objeto nuevo cada vez que agrego algo a la lista(por cada valor que ingresa el usuario)

  tareas.push(nuevaTarea) // lo guardo en el array vacío
  renderTareas() // ejecuto mi funcion que guarda 
  form.reset() //restablece todos los campos del formulario a su valor inicial
} 

function borrarTodas() {
  tareas = []
  renderTareas()
}

function eliminarTarea(id) { // para borrar cada tarea undividual uso el id de cada tarea
  tareas = tareas.filter(t => t.id !== id) // la condición es que esa tarea sea diferente al id que le paso. Me devulve todos excepto el que tenga ede id
  renderTareas() // elimino con cada btn individual
}  // elimino cada invitado

function renderTareas() { // muestro la lista de tareas, recorre la lista de tareas, con el map y hace un innerHTML de cada texto agragdo
  contenedorTareas.innerHTML = tareas.map(tarea => 
    `  <div>
          <p>${tarea.texto}</p>
          <p>Categoría: ${tarea.categoria}</p>
          <button type="button" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
        </div>
      `
    ) // muestra el contenido del array de tareas
   
}


