/*----------  Quantity  ----------*/
jQuery(document).ready(function($) {
  quantity();
});

function quantity() {

  var obj = $('.quantity');

  obj.find('input').val('1');

  $('.quantity button').click(function() {
    var th = $(this);
    var qtd = th.closest('.quantity');
    var input = $(qtd).find('input');
    var min = $(input).attr('min');
    var max = $(input).attr('max');
    var oldValue = $(input).val();
    var newVal = oldValue;

    // console.log(oldValue);

    if(oldValue == '' || oldValue == undefined){
      oldValue = 1;
    }

    // Init
    if(!$(qtd).hasClass('init')) {
      $(qtd).addClass('init');
      $(input).attr('disabled', true);
    }

    // Controls
    if (th.hasClass('plus')) {
        if (oldValue == th.closest('.box--add__actions').data('maxqtd')) {
            var newVal = parseFloat(oldValue);
        } else {
            var newVal = parseFloat(oldValue) + 1;
            $(qtd).find('.minus').removeClass('disabled');
        }
    } else {
      if (oldValue > 1) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 1;
        th.addClass('disabled');
      }
    }

    $(input).val(newVal);


  });
}
