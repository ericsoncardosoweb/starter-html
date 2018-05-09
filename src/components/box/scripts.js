function boxChild(e) {
  var th = e;
  var parent = th.closest('.list-box__item');
  var children = parent.find('.list-box__children');
  var parentPosition= $(parent).position().top;

  if ($(parent).hasClass('active')) {
    $(parent).removeClass('active');
    $(children).collapse('hide');
    //console.log(th)
    $(th).removeClass('openButton');
    
    // $('html, body').animate({
      //   scrollTop: parentPosition - 20
      // }, 1600);
    } else {
      //console.log(th)
      $(th).addClass('openButton');
      //$(th).children('span').html('Ver menos proteções');
      $(parent).addClass('active');
      $(children).collapse('show');
    }

}

$('body').on('click', '.list-box__item .show-children', function() {
  boxChild($(this))
});


/*----------  Box ADD  ----------*/
$(document).on('click', '.box--add__actions', function() {
  var th = $(this);
  var checkbox = th.find('.checkbox');

if (checkbox.is(':checked')) {
  th.addClass('active');
} else {
  th.removeClass('active');
}

});
