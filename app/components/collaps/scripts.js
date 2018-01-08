$('.text-collapse > button').on('click', function(){
  var th =  $(this);
  var elHeight = th.closest('.text-collapse').find('.text-collapse__body').innerHeight();
  console.log(elHeight);
  th.closest('.text-collapse').toggleClass('active').css('height', elHeight);
});