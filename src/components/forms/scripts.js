// Função para controlar o momento de interação com cada campo do formulário
function focusFields() {
  $('body').on('click', '.input .placeholder', function(){
    var th = $(this);
    var input = th.closest('.input');

    $(input).addClass('focus');
    th.closest('.group-divider').addClass('focused');

    $(input).find('input, select').focus();
  });

  var fields = '.input input, .input select';
  $('body').on('focus', fields, function(){
    var th = $(this);
    var input = th.closest('.input');
    var input = th.closest('.input');

    $(input).addClass('focus');

    th.closest('.group-divider').addClass('focused');
  });

  $('body').on('focusout', fields, function(){
    var th = $(this);
    var input = th.closest('.input');

    $(input).removeClass('focus');

    th.closest('.group-divider').removeClass('focused');
  });

}
focusFields();

// Verificar se um campo do form possui algum valor declarado
function fieldsHasVal() {
  var fields = $('input, select, textarea');
  
  fields.each(function() {
    var th = $(this);

    if(th.val() != '' && th.val() != undefined) {
      th.closest('.form-group').addClass('has-value');
    } else {
      th.closest('.form-group').removeClass('has-value');
    }

    var path = window.location.pathname; 
    var step = 1;

    if (path.indexOf("passo-2") > 0) {
        step = 2;
    }

    if (path.indexOf("passo-3") > 0) {
        step = 3;
    }

    if (path.indexOf("passo-4") > 0) {
        step = 4;
    }

  });
}

jQuery(document).ready(function($) {
  fieldsHasVal();

  $('body').on('keyup', 'input, select, textarea', function(){
    fieldsHasVal();
  });

});


// START - Register reservation  -----------------------------------------
// Estou tirando aos poucos a validação daqui e a colocando em assets\modules\finalization\finalization.js
// Termos e condições
$('.flow-wrap__actions--end').on('click', '.step-4-next', function (event) {

  // Verifica se o usuário está ciente e de acordo com os requisitos para locação
  // e com as condições contratuais
  if (!$('.terms-and-conditions').is(':checked')) {
   
  }

  // Verifica se checkbox CPF ou Passaporte foi selecionado pelo cliente
  if (!$('.check-cpf').is(':checked') && !$('.check-passport').is(':checked')) {
    $('.check-cpf').closest('.form-group').addClass('has-error')
    $('.check-passport').closest('.form-group').addClass('has-error')
  } else {
    $('.check-cpf').closest('.form-group').removeClass('has-error')
    $('.check-passport').closest('.form-group').removeClass('has-error')
  }

  // Verifica campos vazio
  if (!$('.input-cpf-passport').val().length) {
    $('.input-cpf-passport').closest('.form-group').addClass('has-error')
    $('.help-text.input-cpf-passport').text('Campo obrigatório')
  }
  if (!$('.fullname').val().length) {
    $('.fullname').closest('.form-group').addClass('has-error')
    $('.help-text.fullname').text('Campo obrigatório')
  }
  if (!$('.email').val().length) {
    $('.email').closest('.form-group').addClass('has-error')
    $('.help-text.email').text('Campo obrigatório')
  }
  if (!$('.phone').val().length) {
    $('.phone').closest('.form-group').addClass('has-error')
    $('.help-text.phone').text('Campo obrigatório')
  }

  if ($('.check-airline').is(':checked')) {
    if (!$('.name-airline').val().length) {
      $('.name-airline').closest('.form-group').addClass('has-error')
      $('.help-text.name-airline').text('Campo obrigatório')
    }
    if (!$('.number-airline').val().length) {
      $('.number-airline').closest('.form-group').addClass('has-error')
      $('.help-text.number-airline').text('Campo obrigatório')
    }
  }

  event.preventDefault()
})

// Verificação do campo CPF/Passport
// Click
$('.check-cpf, .check-passport').on('click', function (event) {
  $('.input-cpf-passport').focus()
})
// Keyup
$('.input-cpf-passport').on('keyup', function (event) {

  if (!$('.check-cpf').is(':checked') && !$('.check-passport').is(':checked')) {
    $(this).closest('.form-group').addClass('has-error')
    $('.help-text.input-cpf-passport').text('Selecione CPF ou Passaporte')
  } else {
    
    if ($(this).val().length) {
      $(this).closest('.form-group').removeClass('has-error')
      $('.help-text.input-cpf-passport').text('')
    } else {
      // $(this).closest('.form-group').addClass('has-error')
      // $('.help-text.input-cpf-passport').text('Campo obrigatório')
    }
  }
}) 
$('.fullname').on('keyup', function (event) {
  if ($(this).val().length) {
    $(this).closest('.form-group').removeClass('has-error')
    $('.help-text.fullname').text('')
  }
   else {
    $(this).closest('.form-group').addClass('has-error')
    $('.help-text.fullname').text('Campo obrigatório')
  }
});


$('.email').on('blur', function (event) {

  // var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // regex.test($('.email'))

  if (!event.target.validity.valid) {
    $(this).closest('.form-group').addClass('has-error')
    $('.help-text.email').text('E-mail inválido')
  } else {
    
    if ($(this).val().length) {
      $(this).closest('.form-group').removeClass('has-error')
      $('.help-text.email').text('')
    } else {
      $(this).closest('.form-group').addClass('has-error')
      $('.help-text.email').text('Campo obrigatório')
    }
  }
}) 


$('.phone').on('blur', function (event) {
  if ($(this).val().length >= 14) {
    $(this).closest('.form-group').removeClass('has-error')
    $('.help-text.phone').text('')
  } else {
    $(this).closest('.form-group').addClass('has-error')
    $('.help-text.phone').text('Campo obrigatório')
  }
})

// Blur
$('.input-cpf-passport').on('blur', function (event) {
  // if (!$(this).val().length) {
  //   $(this).closest('.form-group').addClass('has-error')
  //   $('.help-text.input-cpf-passport').text('Campo obrigatório')
  // }
})
$('.fullname').on('blur', function (event) {
  if (!$(this).val().length) {
    $(this).closest('.form-group').addClass('has-error')
    $('.help-text.fullname').text('Campo obrigatório')
  }
})
$('.email').on('blur', function (event) {
  if (!$(this).val().length) {
    $(this).closest('.form-group').addClass('has-error')
    $('.help-text.email').text('Campo obrigatório')
  }
})
$('.phone').on('blur', function (event) {
  if (!$(this).val().length) {
    $(this).closest('.form-group').addClass('has-error')
    $('.help-text.phone').text('Campo obrigatório')
  }
})

// Verifica se as lojas estão setadas 


  var modelJson = modelJson || null;
  if (modelJson) {
    
    // Verifica se o usuário vem por companhia aérea
    var airlineStoreOut = modelJson.Stores.filter(store => store.Initial === modelJson.InitialStoreOut);
    var airlineStoreDev = modelJson.Stores.filter(store => store.Initial === modelJson.InitialStoreDev);
    
    if (airlineStoreOut.length !== 0 && airlineStoreDev.length !== 0){
    
      if (airlineStoreOut[0].TypeStoreCode !== 1 && airlineStoreDev[0].TypeStoreCode !== 1) {
        
        var airlineCompany = document.querySelector('[data-js="airline-company"]');
        if (airlineCompany) {
          airlineCompany.setAttribute('class', 'hidden-xl-down');
        }
      
      } else {
      
        $('.check-airline').on('click', function() {
        
          if ($('.check-airline').is(':checked')) {
            $( ".wrapper-airline-inputs" ).slideDown(300)
        
            // Keyup
            $('.name-airline').on('keyup', function (event) {
              if ($(this).val().length) {
                $(this).closest('.form-group').removeClass('has-error')
                $('.help-text.name-airline').text('')
              } else {
                $(this).closest('.form-group').addClass('has-error')
                $('.help-text.name-airline').text('Campo obrigatório')
              }
            })
        
            $('.number-airline').on('keyup', function (event) {
              if ($(this).val().length) {
                $(this).closest('.form-group').removeClass('has-error')
                $('.help-text.number-airline').text('')
              } else {
                $(this).closest('.form-group').addClass('has-error')
                $('.help-text.number-airline').text('Campo obrigatório')
              }
            })
        
            // Blur
            $('.name-airline').on('blur', function (event) {
              if (!$(this).val().length) {
                $(this).closest('.form-group').addClass('has-error')
                $('.help-text.name-airline').text('Campo obrigatório')
              }
            })
            $('.number-airline').on('blur', function (event) {
              if (!$(this).val().length) {
                $(this).closest('.form-group').addClass('has-error')
                $('.help-text."number-airline').text('Campo obrigatório')
              }
            })
          } else {
            $( ".wrapper-airline-inputs" ).slideUp(300)
          }
        })
      }
    }
  }


// Seleciona input CPF
$('.check-cpf').on('click', function (event) {
  document.querySelector('.check-passport').checked = false

  if (event.target.checked) {
    event.target.setAttribute('checked', 'checked')
    document.querySelector('.check-passport').removeAttribute('checked')

    document.querySelector('.input-cpf-passport').classList.add('cpf')
    document.querySelector('.input-cpf-passport').classList.remove('passport')
    $('#input-cpf-passport').attr('pattern', '[0-9]*')
  }
})

// Seleciona input Passport
$('.check-passport').on('click', function (event) {
  document.querySelector('.check-cpf').checked = false
  
  if (event.target.checked) {
    event.target.setAttribute('checked', 'checked')
    document.querySelector('.check-cpf').removeAttribute('checked')
    document.querySelector('.input-cpf-passport').classList.add('passport')
    document.querySelector('.input-cpf-passport').classList.remove('cpf')
    $("#input-cpf-passport").removeAttr('placeholder');
    $("#input-cpf-passport").unmask();
    $('#input-cpf-passport').attr('pattern', '')
    $('#input-cpf-passport').attr('maxlength', '11')
  }
})
// END - Register reservation  -----------------------------------------





//Validação de campo vazio


$('.requiredInput').on('blur input', function (event) {
  if ($.trim($(this).val()) == '') {
    $(this).addClass('has-error');
    $(this).removeClass('has-success');
    $(this).closest('.form-field').find('.help-text').text('Campo obrigatório'); 
  }
  else{
    $(this).addClass('has-success');
    $(this).removeClass('has-error');
    $(this).closest('.form-field').find('.help-text').text('');
  }
});

$(".requiredInput").bind("change keyup",function(event){
  console.log($.trim($(this).val()))
  if ($.trim($(this).val()) == ''|| $(this).val().indexOf(' ')>=0) {
    $(this).addClass('has-error');
    $(this).removeClass('has-success');
    $(this).closest('.form-field').find('.help-text').text('Campo obrigatório'); 
  }
  else{
    console.log('teste')
    $(this).addClass('has-success');
    $(this).removeClass('has-error');
    $(this).closest('.form-field').find('.help-text').text('');
  }
});


$('.address-input').on('change', function() {
    $(this).valid();
});


//Validação E-mail




//Envio de Fale Conosco
(function () {
    'strict use';

    // Setup form validation on the #register-form element
    $("#form-contact-us").validate({
        rules: {
            fullname: "required",
            email: "required",
            cep: "required",
            address: "required",
            district: "required",
            number: "required",
            state: "required",
            city: "required",
            phone: "required",
            message: "required",
        },
        messages: {
            fullname: "Campo obrigatório!",
            email: "Por favor, informe um e-mail válido.",
            cep: "Campo obrigatório!",
            address: "Campo obrigatório!",
            district: "Campo obrigatório!",
            number: "Campo obrigatório!",
            state: "Campo obrigatório!",
            city: "Campo obrigatório!",
            phone: "Campo obrigatório!",
            message: "Campo obrigatório!",
        },
        onkeyup: false,
        onclick: false,
        onsubmit: true,
        focusCleanup: true,
        submitHandler: function(form) {
            //form.submit();
            //alert('enviar')
            dataLayer.push({'event' : 'gaevent' , 'eventcategory' : 'Formulario fale com o presidente' , 'eventaction' : 'Enviado com Sucesso' , 'eventlabel' : 'Fale Conosco'})
             modalComponent.output.success('contactSuccess', 'Seu contato foi enviado!')
        },
        errorPlacement: function(error, element) {
          element.after(error);
        },
        invalidHandler: function(event, validator) {
            $("html, body").animate({ scrollTop: 0 }, 600);
            $(".alert--warning.all-fields-necessary").slideDown(300, function () {
                $(this).delay(4000).slideUp(300)
            });
            //if(validator.valid()) show your modal then use validator.errors() to show custom errors
        },
        onfocusout: function(element) {
            // "eager" validation
            this.element(element);  
        }
      });
    
})();




//Envio de Fale com o Presidente
(function () {
    'strict use';

    // Setup form validation on the #register-form element
    $("#form-talk-president").validate({
        rules: {
            fullname: "required",
            email: "required",
            cep: "required",
            address: "required",
            district: "required",
            number: "required",
            state: "required",
            city: "required",
            phone: "required",
            message: "required",
        },
        messages: {
            fullname: "Campo obrigatório!",
            email: "Por favor, informe um e-mail válido.",
            cep: "Campo obrigatório!",
            address: "Campo obrigatório!",
            district: "Campo obrigatório!",
            number: "Campo obrigatório!",
            state: "Campo obrigatório!",
            city: "Campo obrigatório!",
            phone: "Campo obrigatório!",
            message: "Campo obrigatório!",
        },
        onkeyup: false,
        onclick: false,
        onsubmit: true,
        focusCleanup: true,
        submitHandler: function(form) {
            //form.submit();
            dataLayer.push({'event' : 'gaevent' , 'eventcategory' : 'Formulario fale com o presidente' , 'eventaction' : 'Enviado com Sucesso' , 'eventlabel' : 'Fale com Presidente'});
            modalComponent.output.success('presidentSuccess', 'Seu contato foi enviado!');
        },
        errorPlacement: function(error, element) {
          element.after(error);
        },
        invalidHandler: function(event, validator) {
            $("html, body").animate({ scrollTop: 0 }, 600);
            $(".alert--warning.all-fields-necessary").slideDown(300, function () {
                $(this).delay(4000).slideUp(300)
            });
            //if(validator.valid()) show your modal then use validator.errors() to show custom errors
        },
        onfocusout: function(element) {
            // "eager" validation
            this.element(element);  
        }
      });
    
})();


//Envio de Ouvidoria
(function () {
    'strict use';

    // Setup form validation on the #register-form element
    $("#form-ouvidoria").validate({
        rules: {
            fullname: "required",
            email: "required",
            cep: "required",
            address: "required",
            district: "required",
            number: "required",
            state: "required",
            city: "required",
            phone: "required",
            message: "required",
        },
        messages: {
            fullname: "Campo obrigatório!",
            email: "Por favor, informe um e-mail válido.",
            cep: "Campo obrigatório!",
            address: "Campo obrigatório!",
            district: "Campo obrigatório!",
            number: "Campo obrigatório!",
            state: "Campo obrigatório!",
            city: "Campo obrigatório!",
            phone: "Campo obrigatório!",
            message: "Campo obrigatório!",
        },
        onkeyup: false,
        onclick: false,
        onsubmit: true,
        focusCleanup: true,
        submitHandler: function(form) {
            //form.submit();
            //alert('enviar')
            dataLayer.push({'event' : 'gaevent' , 'eventcategory' : 'Formulario ouvidoria' , 'eventaction' : 'Enviado com Sucesso' , 'eventlabel' : 'Ouvidoria'});
            
            modalComponent.output.success('ouvidoriaSuccess', 'Seu contato foi enviado!')
        },
        errorPlacement: function(error, element) {
          element.after(error);
        },
        invalidHandler: function(event, validator) {
            $("html, body").animate({ scrollTop: 0 }, 600);
            $(".alert--warning.all-fields-necessary").slideDown(300, function () {
                $(this).delay(4000).slideUp(300)
            });
            //if(validator.valid()) show your modal then use validator.errors() to show custom errors
        },
        onfocusout: function(element) {
            // "eager" validation
            this.element(element);  
        }
      });
    
})();


//Envio Seja um franqueado | Solicite Online
(function () {
    'strict use';

    // Setup form validation on the #register-form element
    $("#form-be-a-franchise").validate({
        rules: {
            fullname: "required",
            email: "required",
            cep: "required",
            address: "required",
            district: "required",
            number: "required",
            state: "required",
            city: "required",
            phone: "required",
            message: "required",
        },
        messages: {
            fullname: "Campo obrigatório!",
            email: "Por favor, informe um e-mail válido.",
            cep: "Campo obrigatório!",
            address: "Campo obrigatório!",
            district: "Campo obrigatório!",
            number: "Campo obrigatório!",
            state: "Campo obrigatório!",
            city: "Campo obrigatório!",
            phone: "Campo obrigatório!",
            message: "Campo obrigatório!",
        },
        onkeyup: false,
        onclick: false,
        onsubmit: true,
        focusCleanup: true,
        submitHandler: function(form) {
            //form.submit();
            //alert('enviar')
            dataLayer.push({'event' : 'gaevent' , 'eventcategory' : 'Seja um franqueado' , 'eventaction' : 'Enviar Formulario Sucesso' , 'eventlabel' : 'Sucesso'});
            modalComponent.output.success('franchiseSuccess', 'Seu contato foi enviado!')
        },
        errorPlacement: function(error, element) {
          element.after(error);
        },
        invalidHandler: function(event, validator) {
            $("html, body").animate({ scrollTop: 0 }, 600);
            $(".alert--warning.all-fields-necessary").slideDown(300, function () {
                $(this).delay(4000).slideUp(300)
            });
            //if(validator.valid()) show your modal then use validator.errors() to show custom errors
        },
        onfocusout: function(element) {
            // "eager" validation
            this.element(element);  
        }
      });
    
})();
