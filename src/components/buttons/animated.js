$(function() {
  // toggle status
  $(document).on('click', '[data-toggle="status"]', function(){
    var btn = $(this);
    var btnTarget = btn.data('target');

    btnTarget = btnTarget || btn;

    $(btnTarget).toggleClass('active ');

  });
  $('[data-toggle="close"], .close').on('click', function(){
    $('.button.toggle').removeClass('active');
  });
});
