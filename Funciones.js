const BotonGET = document.getElementById("btnGET");
const BotonPOST = document.getElementById("btnPOST");
const listaUsuarios = document.getElementById("Lista");
let listaRecibida = null;
let BotonDELETE = null;
const url = "https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios";
// const url = 'http://laravel.test/apiprojects';

function listarUsuarios() {
  let listaRenderizada = listaRecibida
    .map(
      (usuario, id) =>
        `<tr>
    <td > ${usuario.nombre ? usuario.nombre : "Vacío"} </td>
    <td > ${usuario.apellido ? usuario.apellido : "Vacío"} </td>
    <td > 
        <a href='/Prueba/See.html?Usuario=${id}'>
            <button 
                class='btnVer'
                >
                Ver
            </button>
        </a>
        <button 
            class='btnEditar'
            onclick = 'EditData(${id})'
            >
            Editar
        </button> 
        <button 
            class='btnEliminar'
            onclick = 'DeleteData(${id})'
            >
            Eliminar
        </button> 
    </td>
    </tr>`
    )
    .join("");

  listaUsuarios.innerHTML = listaRenderizada;
  BotonDELETE = document.getElementsByClassName("btnEliminar");
}

function GetData() {
  // data.preventDefault();

  fetch(url, {
    method: 'GET',
    // credentials: 'include'
  })
    .then((response) => response.json())
    .then((response) => {
      listaRecibida = response;
       listarUsuarios();
    });
  // var datos = new XMLHttpRequest();
  // datos.onreadystatechange = function (){
  //     if (this.readyState == 4 && this.status == 200) {
  //         listarUsuarios(JSON.parse(this.responseText));
  //     }
  // }
  // // datos.addEventListener('load',Usuarios);
  // // datos.open('GET','http://laravel.test/API');
  // datos.open('GET','https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios');
  // datos.send();
}

function PostData() {
  // var url = 'https://example.com/profile';

  // var data = {username: 'example'};

  let nNombre = document.getElementById("name").value;
  let nApellido = document.getElementById("lastname").value;
  let data = { nombre: `${nNombre}`, apellido: `${nApellido}` };
  let postUrl = null;
  let id = BotonPOST.value;

  if (id) {
    postUrl = `${url}/${id}`;
    method = "PUT";
  } else {
    postUrl = url;
    method = "POST";
  }

  fetch(postUrl, {
    credentials: "omit",
    method: method, // 'POST' or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((data) => {
      GetData();
    });

  nNombre = document.getElementById("name").value = "";
  nApellido = document.getElementById("lastname").value = "";
  FormatBoton();
}

function DeleteData(ind) {
  // ind.preventDefault();

  fetch(`${url}/${ind}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      GetData();
    });
}

function EditData(id) {
  nNombre = document.getElementById("name").value = listaRecibida[id].nombre;
  nApellido = document.getElementById("lastname").value =
    listaRecibida[id].apellido;

  FormatBoton("Editar", id);
}

function FormatBoton(formato, id) {
  if (formato == "Editar") {
    BotonPOST.textContent = "Actualizar registro";
    BotonPOST.value = id;
  } else {
    BotonPOST.textContent = "Guardar registro";
    BotonPOST.value = "";
  }
}

// FormatBoton();
BotonGET.onclick = GetData;
BotonPOST.onclick = PostData;



