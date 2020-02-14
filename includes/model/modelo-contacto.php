<?php 

if($_POST['accion'] === 'crear'){
    
    require '../functions/db-conexion.php';
    
    //Validar las entradas
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
    
    try {
        $stmt = $conn -> prepare("INSERT INTO usuarios (nombre_contacto, empresa_contacto, telefono_contacto) VALUES(?, ?, ?)");
        $stmt->bind_param("sss", $nombre, $empresa, $telefono);
        $stmt->execute();
        if($stmt->affected_rows == 1){
            $respuesta= array(
                'respuesta' => 'inserción realizada',
                
                'datos' => array(
                    'nombre' => $nombre,
                    'empresa' => $empresa,
                    'telefono' => $telefono,
                    'id' => $stmt->insert_id,
                    )
                );
            }
            
            $stmt ->close();
            $conn ->close();
        } catch (Exception $e) {
            $respuesta = array(
                'error' => $e -> getMessage()
            );
        }
        
        echo json_encode($respuesta);
        
    }
    
    if($_GET['accion'] === 'borrar'){
        require '../functions/db-conexion.php';
        
        $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
        
        if($id){
            try {
                $stmt = $conn ->prepare("DELETE FROM usuarios WHERE usuarioID = ? ");
                $stmt ->bind_param("i", $id);
                $stmt ->execute();
                if($stmt->affected_rows === 1){
                    $respuesta= array(
                        'respuesta' => 'correcto'
                    );
                }
                $stmt ->close();
                $conn ->close();
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        }
        echo json_encode($respuesta);
    }
    
    if($_POST['accion'] === 'editar'){
        
        require '../functions/db-conexion.php';
        
        try {
            
            $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
            $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
            $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
            $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
            
            
            $stmt = $conn ->prepare("UPDATE usuarios SET nombre_contacto = ?, empresa_contacto = ?, telefono_contacto = ? WHERE usuarioID = ?");
            $stmt ->bind_param("sssi", $nombre, $empresa,$telefono,$id);
            $stmt ->execute();
            if($stmt ->affected_rows === 1){
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'nombre' => $nombre,
                    'empresa' => $empresa,
                    'telefono' => $telefono,
                    'idActualizado' => $id
                );
            }
            $stmt ->close();
            $conn ->close();
        } catch (Exception $e) {
            $respuesta = array(
                
                'error' =>  $e -> getMessage()
            );
        }
        
        
        
        echo json_encode($respuesta);
    }
    
    ?>