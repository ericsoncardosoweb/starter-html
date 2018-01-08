jQuery(document).ready(function(jQuery) {
	// jQuery('.date').mask('00/00/0000');
	// jQuery('.time').mask('00:00:00');
	// jQuery('.date_time').mask('00/00/0000 00:00:00');
	jQuery('.cep, .field_cep').mask('00000-000');
	// jQuery('.telefone, input[type=tel]').mask('(00) 000000000');
	// jQuery('.celular').mask('(00) 0.0000-0000');
	// jQuery('.cpf').mask('000.000.000-00', {reverse: true});
	// jQuery('.cnpj').mask('00.000.000/0000-00', {reverse: true});

  // Para telefone e celular
  // jQuery('.phone').mask("(99) 9999*-9999");
  // jQuery(".phone").mask("(99) 99999-9999");
  // jQuery(".phone").on("blur", function() {
      
  //     var last = jQuery(this).val().substr( jQuery(this).val().indexOf("-") + 1 );
  //     if (last.length == 3) {

  //         var move = jQuery(this).val().substr( jQuery(this).val().indexOf("-") - 1, 1 );
  //         var lastfour = move + last;
  //         var first = jQuery(this).val().substr( 0, 9 );

  //         jQuery(this).val(first + '-' + lastfour);

  //     }
  
  // });

  jQuery('#fique_por_dentro_email').bind('focus', function(){
            if( jQuery(this).val() == '')
                jQuery(this).val('');
  }).bind('blur', function(){
      if( jQuery(this).val() == '' )
          jQuery(this).val('');
  }).bind('keyup change', function(e) {
      customMask(e, jQuery(this));
  });

  customMask = function(evt, field) {

      var charCode    = evt.keyCode || evt.which;
      var value       = field.val();
      field.removeAttr('maxlength');

      //8 = backspace - 27 = esc - 46 = del
      if (charCode == 8 || charCode == 27 || charCode == 46) {
          return;
      }

      if (/^[0-9()\- ]+$/.test(value)) {

          field.attr('maxlength', 15);
          maskApplied = true;
          field.val(mtel(value));
      }
  }
  


  // Para telefone e celular
  $('.phone, input[type=tel]').prop("maxLength", 16);
  $('.phone, input[type=tel]').on('keyup', function(e){
      customMask(e, jQuery(this));
  });
});   

/* Máscaras ER */
function mascara(o,f){
    v_obj=o;
    v_fun=f;
    setTimeout("execmascara()",1);
}
function execmascara(){ 
    v_obj.value=v_fun(v_obj.value);
}
function mtel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}