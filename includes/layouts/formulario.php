<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input 
        type="text" 
        id="nombre" 
        placeholder="nombre del contacto"
        value="<?php echo $contacto['nombre_contacto'] ? $contacto['nombre_contacto'] : "" ?>"
         >
    </div>
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input 
        type="text" 
        id="empresa" 
        placeholder="Nombre de la empresa"
        value="<?php echo $contacto['empresa_contacto'] ? $contacto['empresa_contacto'] : "" ?>"
         >
    </div>
    <div class="campo">
        <label for="telefono">Telefono:</label>
        <input 
        type="tel" 
        id="telefono" 
        placeholder="telefono del contacto"
        value="<?php echo $contacto['telefono_contacto'] ? $contacto['telefono_contacto'] : "" ?>"
         >
    </div>
</div>
<div class="campo enviar">
    <?php $btnText = ($contacto['nombre_contacto'])? 'Guardar' : 'Añadir' ?>

    <?php $accion = ($contacto['nombre_contacto']) ? 'editar' : 'crear' ?>
    <input type="hidden" id="accion" value="<?php echo $accion ?>">
    <?php if(isset($contacto['usuarioID'])){?>
    <input type="hidden" id="id" value="<?php echo $contacto['usuarioID'] ?>">
    <?php  } ?>
    <input type="submit" value="<?php echo $btnText ?>">
</div>