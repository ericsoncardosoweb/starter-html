// target element on checked
$('.checkbox, .radio').on('change', function(){
  var th = $(this);
  var target = th.data('target');

  if(th.is(':checked')) {

    if($(target).hasClass('collapse')) {
      $(target).collapse('show');
    } else {
      $(target).addClass('active');
    }

  } else {

    if($(target).hasClass('collapse')) {
      $(target).collapse('hide');
    } else {
      $(target).removeClass('active');
    }

  }
});
