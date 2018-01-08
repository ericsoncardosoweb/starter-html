$(function() {
  $('.button.toggle').on('click', function(){
    var btnToggle = $(this);
    $(btnToggle).toggleClass('active'); 

  });
  $('[data-toggle="close"], .close').on('click', function(){
    $('.button.toggle').removeClass('active');
  });
});