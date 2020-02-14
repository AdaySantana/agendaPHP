<?php 

//Obtiene un listado de los contactos existentes en la base de datos
function obtenerContactos(){

    require 'db-conexion.php';
    try {
        return $conn->query("SELECT usuarioID, nombre_contacto, empresa_contacto, telefono_contacto FROM usuarios");
    } catch (Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()
        );
        return false;
    }
}

//Obtiene un contacto por ID de URL
function obtenerContacto($id){
    require 'db-conexion.php';
    try {
        return $conn->query("SELECT usuarioID, nombre_contacto, empresa_contacto, telefono_contacto FROM usuarios WHERE usuarioID = $id");
    } catch (Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()
        );
        return false;
    }
}


?>