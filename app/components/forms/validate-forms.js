$.validator.setDefaults({
    debug:true,
    errorElement: 'span',
    errorClass: 'help-block',
    focusCleanup: true,
    focusInvalid: false,
    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error').removeClass( "has-success" );
    },

    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error').addClass( "has-success" );
    }
});
// Function
 
$(function(){

  $("input[type=email]").attr('data-rule-email', 'true');
  $("input[type=url]").attr('data-rule-url', 'true');

  
});


/*----------  Validations forms by id  ----------*/
$("#form-newsletter").validate({
  submitHandler: function(form) {
    $(form).slideUp(300);
    $(form).next('.form-message').slideDown(700);
  }
});

// Custom events to register
$('#field_cep').keyup(function(){
  $(this).parent().next().collapse('show')
});

$("#form-login").validate({
  submitHandler: function(form) {
    $(form).slideUp(300);
    $(form).next('.form-message').slideDown(700);
  }
});