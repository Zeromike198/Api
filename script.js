
document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("guardar");
  var cedulaInput = document.getElementById("cedula");
  var nombresInput = document.getElementById("nombres");
  var apellidosInput = document.getElementById("apellidos");
  var edadInput = document.getElementById("edad");
  var correoInput = document.getElementById("correo");
  var tablaProfesores = document.getElementById("tabla-profesores");

  // Función para guardar un profesor
  function guardarProfesor(event) {
    event.preventDefault();

    var cedula = cedulaInput.value.trim();
    var nombres = nombresInput.value.trim();
    var apellidos = apellidosInput.value.trim();
    var edad = edadInput.value.trim();
    var correo = correoInput.value.trim();

    if (cedula === "" || nombres === "" || apellidos === "" || edad === "" || correo === "") {
      alert("Por favor, complete todos los campos");
      return;
    }

    var profesor = {
      cedula: cedula,
      nombres: nombres,
      apellidos: apellidos,
      edad: edad,
      correo: correo
    };

    var profesores = obtenerProfesores();
    profesores.push(profesor);
    localStorage.setItem("profesores", JSON.stringify(profesores));

    mostrarProfesores();
    form.reset();
  }

  // Función para obtener los profesores almacenados en localStorage
  function obtenerProfesores() {
    var profesores = localStorage.getItem("profesores");

    if (profesores) {
      return JSON.parse(profesores);
    }

    return [];
  }

  // Función para mostrar los profesores en la tabla
  function mostrarProfesores() {
    var profesores = obtenerProfesores();
    var tbody = tablaProfesores.querySelector("tbody");
    tbody.innerHTML = "";

    profesores.forEach(function(profesor, index) {
      var row = document.createElement("tr");
      row.innerHTML = `
        <td>${profesor.cedula}</td>
        <td>${profesor.nombres}</td>
        <td>${profesor.apellidos}</td>
        <td>${profesor.edad}</td>
        <td>${profesor.correo}</td>
        <td>
          <button class="editar" data-index="${index}">Editar</button>
          <button class="eliminar" data-index="${index}">Eliminar</button>
        </td>
      `;

      tbody.appendChild(row);
    });
  }

  // Función para eliminar un profesor

  function eliminarProfesor(index) {
    var profesores = obtenerProfesores();
    profesores.splice(index, 1);
    localStorage.setItem("profesores", JSON.stringify(profesores));
    mostrarProfesores();
  }

  // Función para editar un profesor
  function editarProfesor(index) {
    var profesores = obtenerProfesores();
    var profesor = profesores[index];

    cedulaInput.value = profesor.cedula;
    nombresInput.value = profesor.nombres;
    apellidosInput.value = profesor.apellidos;
    edadInput.value = profesor.edad;
    correoInput.value = profesor.correo;

    // Eliminamos el profesor existente
    eliminarProfesor(index);
  }

  // Event listener para el botón "Guardar"
  form.addEventListener("click", guardarProfesor);

  // Event delegation para los botones de "Editar" y "Eliminar"
  tablaProfesores.addEventListener("click", function(event) {
    if (event.target.classList.contains("editar")) {
      var index = parseInt(event.target.getAttribute("data-index"));
      editarProfesor(index);
    } else if (event.target.classList.contains("eliminar")) {
      var index = parseInt(event.target.getAttribute("data-index"));
      eliminarProfesor(index);
    }
  });

  // Mostrar los profesores almacenados al cargar la página
  mostrarProfesores();
});
