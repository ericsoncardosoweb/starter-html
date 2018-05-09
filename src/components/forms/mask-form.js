jQuery(document).ready(function(jQuery) {
	jQuery('.date').mask('00/00/0000');
	jQuery('.time').mask('00:00:00');
	jQuery('.date_time').mask('00/00/0000 00:00:00');
    jQuery('.cep, .field_cep').mask('00000-000');


    var options =  {
        placeholder:   '___.___.___-__',
        onChange: function(cep){

            var cep = cep.replace(/\D/g, '')

            $('.cpf').on('blur', function(){
                if (cep.length < 11) {
                    $(this).parents('.form-group').removeClass('has-value');
                    $(this).parents('.form-group').addClass('has-error');
                    $('.help-text.input-cpf-passport').html('CPF inválido');
                } else {
                    $(this).parents('.form-group').removeClass('has-error');
                    $(this).parents('.form-group').addClass('has-value');
                    $('.help-text.input-cpf-passport').html('');
                }
            });

        }
    };
	jQuery('.cpf').mask('000.000.000-00', options);



    jQuery('.cnpj').mask('00.000.000/0000-00', {reverse: true});
    jQuery('.cnpj').unmask();

    jQuery('#number-airline').mask('00000000')

    jQuery('.cnpj-corporativo').mask('00.000.000/0000-00');
    
/*	jQuery('.passport').mask('AA000000', {
        translation: {
            'A': {pattern: /[a-zA-Z]/},
            '0': {pattern: /[0-9]/}
        },
        placeholder:   '________'
    });*/

    // Para telefone e celular
    //no step 3
    jQuery('phone-step-3').mask('(99) 99999-9999');


//   $('.phone, input[type=tel]').mask("(00) 00000-0000")
  $('.phone, input[type=tel]').prop("maxLength", 15);
  $('.phone, input[type=tel]').on('keyup', function(e){
      mascara($(this), mtel);
  });
});

/* Máscaras ER */
function mascara(el, fn){
    el.val(fn(el.val()));    
}
function mtel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}
