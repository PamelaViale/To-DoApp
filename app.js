const $ = (selector) => document.querySelector(selector)

const form = $("#formulario")
const inputTarea = $("#tarea")
const selectCategoria = $("#categoria")
const contenedorTareas = $("#lista-tareas")
const botonBorrarTodo = $("#borrar-todo")

let tareas = [] // lista de tareas

document.addEventListener("DOMContentLoaded", function () {

  // Cargar tareas desde sessionStorage al iniciar 
  cargarTareasSession()

  // Si hay categoría en la URL, filtramos
  const params = new URLSearchParams(window.location.search)
  const categoriaFiltrada = params.get("categoria")
  if (categoriaFiltrada) {
    renderTareas(categoriaFiltrada)
    selectCategoria.value = categoriaFiltrada // para que aparezca seleccionada
  } else {
    renderTareas()
  }

  // Eventos principales
  form.addEventListener("submit", agregarALista)
  botonBorrarTodo.addEventListener("click", borrarTodas)
  selectCategoria.addEventListener("change", () => {
    filtrarPorCategoria(selectCategoria.value)
  })
}) // agrego un evento al DOM para colocar el envío del formulario, carga el evento submit

// Función para agregar una tarea
function agregarALista(e) { 
  e.preventDefault() // previene el envío automático de los datos

  const texto = inputTarea.value.trim() // guardo el valor del input 
  const categoria = selectCategoria.value // guardo el valor de la categoría seleccionada por el usuario

  if (!texto) {
    alert("Tenés que agregar una tarea")
    return
  } // si no hay un texto en el input salta el alert

  const nuevaTarea = {
    id: Date.now(), // identificador único basado en la hora actual
    texto,
    categoria
  } // creo un objeto nuevo cada vez que agrego algo a la lista (por cada valor que ingresa el usuario)

  tareas.push(nuevaTarea) // lo guardo en el array vacío
  guardarTareasSession() // guardar cada vez que agrego
  renderTareas() // actualizo la vista
  form.reset() // restablece todos los campos del formulario a su valor inicial
} 

// Función para borrar todas las tareas 
function borrarTodas() {
  tareas = []
  guardarTareasSession()
  renderTareas()
}

// Función para borrar una tarea individual 
function eliminarTarea(id) { 
  tareas = tareas.filter(t => t.id !== id) // devuelve todas las tareas excepto la que tenga el id que pasamos
  guardarTareasSession()
  renderTareas() // actualiza la vista después de eliminar
}  

// Función para mostrar las tareas en pantalla
function renderTareas(categoriaFiltro = null) { 
  let tareasParaMostrar = tareas

  // Si hay filtro por categoría, filtramos el array
  if (categoriaFiltro) {
    tareasParaMostrar = tareas.filter(t => t.categoria === categoriaFiltro)
  }

  // Muestro la lista de tareas usando map para crear el HTML
  contenedorTareas.innerHTML = tareasParaMostrar.map(tarea => 
    `  <div>
          <p>${tarea.texto}</p>
          <p>Categoría: ${tarea.categoria}</p>
          <button type="button" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
        </div>
      `
    ).join("") // junto todo en un solo string
}

// Guardar tareas en sessionStorage 
// Con setItem guardo los datos
function guardarTareasSession() {
  sessionStorage.setItem("tareas", JSON.stringify(tareas))
  console.log("✅ Guardado en sessionStorage:", tareas)
} 

// Cargar tareas desde sessionStorage 
function cargarTareasSession() {
  const guardadas = sessionStorage.getItem("tareas")
  if (guardadas) {
    tareas = JSON.parse(guardadas) // convierto de texto a array
    console.log("📂 Cargadas desde sessionStorage:", tareas)
  }
}

// Filtrar por categoría usando URLSearchParams 
function filtrarPorCategoria(categoria) {
  const url = new URL(window.location) // URL actual

  if (categoria) {
    url.searchParams.set("categoria", categoria) // agrego el filtro a la URL
  } else {
    url.searchParams.delete("categoria") // borro el parámetro de la URL
  }

  window.history.pushState({}, "", url) // cambia la URL sin recargar
  renderTareas(categoria) // actualiza la vista según el filtro
}


//Local Storage (Clase 9)
//URLSearchParams (Clase 10)