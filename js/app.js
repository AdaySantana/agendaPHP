const formularioContacto = document.querySelector('#contacto'),
listadoContacto = document.querySelector('#listado-contactos tbody'),
inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners(){
    
    //Cuando el formulario de crear o editar se ejecuta
    
    formularioContacto.addEventListener('submit', leerFormulario);
    
    //Listener para eliminar un contacto
    if(listadoContacto){
        
        listadoContacto.addEventListener('click', eliminarContacto);
    }
    
    //Listener Buscador 
    
    inputBuscador.addEventListener('input', buscarResultados);
    mostrarContactos();
    
    
}

function leerFormulario(e){
    e.preventDefault();
    
    const nombre = document.querySelector('#nombre').value,
    empresa = document.querySelector('#empresa').value,
    telefono = document.querySelector('#telefono').value,
    accion = document.querySelector('#accion').value;
    if( nombre === '' || empresa === '' || telefono === ''){
        //2 Parámetros texto y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    }else{
        //Pasa la validación, crear llamado a ajax
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);
        
        if(accion === 'crear'){
            insertDB(infoContacto);
            
        }else{
            
            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);
            
        }
        
    }
}
/* Inserta en la base de datos por AJAX */
function insertDB(datos){
    //Llamado a AJAX
    
    //Crear el objeto
    const xhr = new XMLHttpRequest();
    
    //Abrir la conexión 
    xhr.open('POST', 'includes/model/modelo-contacto.php', true)
    
    
    //Pasar los datos
    xhr.onload = function(){
        if(this.status === 200 && this.readyState === 4){
            //Leemos la respuesta de PHP
            const respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta);
            
            //Crear el nuevo elemento desde la respuesta de nuestro archivo PHP
            const newContact = document.createElement('tr');
            newContact.innerHTML = `
            <td>${respuesta.datos.nombre}</td>   
            <td>${respuesta.datos.empresa}</td>   
            <td>${respuesta.datos.telefono}</td>
            `
            //Contenedor para los botones
            const contenedorAcciones = document.createElement('td');
            
            //Icono editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');
            
            //Crear el enlace de editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id${respuesta.datos.id}`;
            btnEditar.classList.add('btn', 'btn-editar');
            
            //Agregarlo al padre
            
            contenedorAcciones.appendChild(btnEditar);
            
            //Icono borrar
            const iconoBorrar = document.createElement('i');
            iconoBorrar.classList.add('fas', 'fa-trash-alt');
            
            //Crear el botón de eliminar
            const btnBorrar= document.createElement('button');
            btnBorrar.appendChild(iconoBorrar);
            btnBorrar.classList.add('btn', 'btn-borrar');
            btnBorrar.setAttribute('data-id', respuesta.datos.id)
            
            //Agregarlo al padre
            
            contenedorAcciones.appendChild(btnBorrar);
            
            //Agregarlo al tr
            newContact.appendChild(contenedorAcciones);
            
            //Agregarlo al listado de contacto de table
            listadoContacto.appendChild(newContact);
            
            //Actualizar número de contador
            mostrarContactos();
            
            
            //Resetear el formulario
            document.querySelector('form').reset();
            
            //Mostrar notificación
            mostrarNotificacion('Contacto creado correctamente', 'correcto');
        }
    }
    //Enviar los datos
    xhr.send(datos);
}
//Actualizar un registro ya creado con petición AJAX
function actualizarRegistro(datos){
    
    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', 'includes/model/modelo-contacto.php', true);
    
    xhr.onload = function(){
        if(this.readyState === 4 && this.status === 200){
            const respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta);
            
            if(respuesta.respuesta === 'correcto'){
                mostrarNotificacion('Contacto actualizado correctamente', 'correcto');
            }else{
                mostrarNotificacion('Hubo un error, vuelva a intentarlo', 'error');
            }
            //Redireccionar al home
            setTimeout(() => {
                window.location.href="index.php";
            }, 2000);
        }
    }
    
    xhr.send(datos);
    
}

//Buscar Contactos
function buscarResultados(e){
    const expresion = new RegExp(e.target.value, "i"),
    registros = document.querySelectorAll('tbody tr');
    
    registros.forEach(registro => {
        registro.style.display = 'none';
        
        if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1){
            registro.style.display = 'table-row';
        }
        mostrarContactos();
        
    });
    
}

//Eliminar Contacto
function eliminarContacto(e){
    
    if(e.target.parentElement.classList.contains('btn-borrar')){
        const id = e.target.parentElement.getAttribute('data-id');
        respuesta = confirm ('¿Estás seguro de eliminar el contacto?');
        
        if(respuesta){
            //Llamado a ajax
            //instanciando el objeto XMLHttpRequest
            const xhr = new XMLHttpRequest();
            
            //Abrir la conexión
            xhr.open('GET', `includes/model/modelo-contacto.php?id=${id}&accion=borrar`, true)
            //Leer la respuesta
            xhr.onload= function(){
                if(this.status === 200 && this.readyState === 4){
                    
                    const respuesta = JSON.parse(xhr.responseText);
                    if(respuesta.respuesta === 'correcto'){
                        e.target.parentElement.parentElement.parentElement.remove();
                        //Mostrar notificacion
                        mostrarNotificacion('Contacto eliminado', 'correcto');
                        //Actualizar número de contador
                        mostrarContactos();
                        
                    }else {
                        mostrarNotificacion('Hubo un error', 'error')
                    }
                }
            }
            
            //Enviar la petición
            
            xhr.send();
            
        }
        
    }
}

//Notificación en pantalla 
function mostrarNotificacion(mensaje, clase){
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;
    
    //Formulario
    formularioContacto.insertBefore(notificacion, document.querySelector('form legend'));
    
    //Ocultar y mostrar la notificación
    setTimeout(() => {
        notificacion.classList.add('visible');
        
        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 3000);
    }, 100);
}

function mostrarContactos(){
    const registros = document.querySelectorAll('tbody tr'),
    contenedorNumero = document.querySelector('.total-contactos span');
    
    let total= 0;
    
    registros.forEach(registro => {
        if(registro.style.display === 'table-row' || registro.style.display === ''){
            total++;
        }
    });
    contenedorNumero.textContent = `${total} contactos`;
    
}