<!-- *******************************************************
TEXT UND BILD IN SPALTEN
******************************************************** -->

<script type="text/javascript">
jQuery(function($){
    $(document).ready(function(){

        $('select#choices').change(function() {
            $('.off').hide();

            for(var i = 1; i <= parseInt($(this).val()); i++) {
                $('#col' + i).show();
            }
        });

        $('select#choices').change();

    })
});
</script>

<fieldset class="form-horizontal">
    <div class="form-group">
        <label class="col-sm-2 control-label" for="choices">Spalten</label>
        <div class="col-sm-10">
            <?php
                $options = array(
                '1'=>'volle Breite',
                '2'=>'zwei Spalten',
                '3'=>'drei Spalten'
            );
            ?>
            <select name="REX_INPUT_VALUE[9]" id="choices" class="form-control">
            <?php foreach ($options as $k=>$v) : ?>
            <option value="<?php echo $k; ?>"<?php if ($k == "REX_VALUE[9]") echo ' selected="selected"' ?>><?php echo $v; ?></option>
            <?php endforeach ?>
            </select>
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-2 control-label" for="headline">Überschrift</label>
        <div class="col-sm-10">
            <input class="form-control" id="headline" type="text" name="REX_INPUT_VALUE[10]" value="REX_VALUE[10]" />
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-2 control-label" for="headline-level">Überschrift-Ebene</label>
        <div class="col-sm-10">
            <?php
                $options = array(
                'h1'=>'1. Ebene',
                'h2'=>'2. Ebene',
                'h3'=>'3. Ebene'
            );
            ?>
            <select name="REX_INPUT_VALUE[11]" id="headline-level" class="form-control">
            <?php foreach ($options as $k=>$v) : ?>
            <option value="<?php echo $k; ?>"<?php if ($k == "REX_VALUE[11]") echo ' selected="selected"' ?>><?php echo $v; ?></option>
            <?php endforeach ?>
            </select>
        </div>
    </div>
</fieldset>

<fieldset class="form-horizontal">
    <legend>1. Spalte</legend>

    <div class="form-group">
        <label class="col-sm-2 control-label">Bild</label>
        <div class="col-sm-10">
            REX_MEDIA[id="1" widget="1"]
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-2 control-label" for="markitup_textile_1">Text</label>
        <div class="col-sm-10">
            <textarea cols="1" rows="6" class="form-control markitupEditor-textile_full" id="markitup_textile_1" name="REX_INPUT_VALUE[1]">REX_VALUE[1]</textarea>
        </div>
    </div>
</fieldset>



<fieldset class="form-horizontal off" id="col2">
    <legend>2. Spalte</legend>

    <div class="form-group">
        <label class="col-sm-2 control-label">Bild</label>
        <div class="col-sm-10">
            REX_MEDIA[id="2" widget="1"]
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-2 control-label" for="markitup_textile_2">Text</label>
        <div class="col-sm-10">
            <textarea cols="1" rows="6" class="form-control markitupEditor-textile_full" id="markitup_textile_2" name="REX_INPUT_VALUE[2]">REX_VALUE[2]</textarea>
        </div>
    </div>
</fieldset>


<fieldset class="form-horizontal off" id="col3">
    <legend>3. Spalte</legend>

    <div class="form-group">
        <label class="col-sm-2 control-label">Bild</label>
        <div class="col-sm-10">
            REX_MEDIA[id="3" widget="1"]
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-2 control-label" for="markitup_textile_3">Text</label>
        <div class="col-sm-10">
            <textarea cols="1" rows="6" class="form-control markitupEditor-full" id="markitup_textile_3" name="REX_INPUT_VALUE[3]">REX_VALUE[3]</textarea>
        </div>
    </div>
</fieldset>
