const $ = (selector) => document.querySelector(selector)

const form = $("#formulario")
const inputTarea = $("#tarea")
const selectCategoria = $("#categoria")
const contenedorTareas = $("#lista-tareas")
const botonBorrarTodo = $("#borrar-todo")

let tareas = [] // lista de invitados

document.addEventListener("DOMContentLoaded", function () {

const tareasGuardadas = localStorage.getItem("tareas")
  if (tareasGuardadas) {
    tareas = JSON.parse(tareasGuardadas) // convierto de texto a array
    renderTareas()
  }

  // Si hay categoría en la URL, filtramos
  const params = new URLSearchParams(window.location.search)
  const categoriaFiltrada = params.get("categoria")
  if (categoriaFiltrada) {
    renderTareas(categoriaFiltrada)
    selectCategoria.value = categoriaFiltrada // para que aparezca seleccionada
  } else {
    renderTareas()
  }

  form.addEventListener("submit", agregarALista)
  botonBorrarTodo.addEventListener("click", borrarTodas)
  selectCategoria.addEventListener("change", () => {
    filtrarPorCategoria(selectCategoria.value)
  })
}) // agrego un evento al dom para colocar el envío del formulario, carga el evento submit

function agregarALista(e) { // unción de agregar a la lista de tareas
  e.preventDefault() // previene el envio automático de los datos

  const texto = inputTarea.value.trim() // guardo el valor del input 
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
  guardarTareasLocal() // guardar cada vez que agrego
  renderTareas() // ejecuto mi funcion que guarda 
  form.reset() //restablece todos los campos del formulario a su valor inicial
} 

function borrarTodas() {
  tareas = []
   guardarTareasLocal()
  renderTareas()
}

function eliminarTarea(id) { // para borrar cada tarea undividual uso el id de cada tarea
  tareas = tareas.filter(t => t.id !== id) // la condición es que esa tarea sea diferente al id que le paso. Me devulve todos excepto el que tenga ede id
  guardarTareasLocal()
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
    ) .join("") // junto todo en un solo string

    // muestra el contenido del array de tareas
   
}

// en esta función guardo los invitados, en una función separada.
//con setItem guardo los datos

function guardarTareasLocal() {
  localStorage.setItem("tareas", JSON.stringify(tareas))
  console.log("Guardado en localStorage:", tareas)
} //guardo el array tareas en el local storage

//  Filtrar por categoría, usando URLSearchParams 
function filtrarPorCategoria(categoria) {
  const url = new URL(window.location) // URL actual

  if (categoria) {
    url.searchParams.set("categoria", categoria)
  } else {
    url.searchParams.delete("categoria")
  }

window.history.pushState({}, "", url) // cambia la URL sin recargar
  renderTareas(categoria)
}



//Local Storage (Clase 9)
//URLSearchParams (Clase 10)