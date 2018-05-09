$.validator.setDefaults({
  debug:false,
  errorElement: 'span',
  errorClass: 'help-block',
  focusCleanup: true,
  focusInvalid: false,
  onkeyup: true,
  highlight: function (element) {
    $(element).closest('.form-group').addClass('has-error');
  },

  unhighlight: function (element) {
    $(element).closest('.form-group').removeClass('has-error');
  }
});
// Function

$(function(){

  $("input[type=email]").attr('data-rule-email', 'true');
  $("input[type=url]").attr('data-rule-url', 'true');


});

