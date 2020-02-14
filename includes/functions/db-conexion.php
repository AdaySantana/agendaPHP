<?php 

    $conn = new mysqli('localhost', 'root', 'root', 'agendaPhp');

    if($conn ->connect_error){
        echo $conn ->connect_error;
    }

?>