function setAnimateModal(animation) {
  $('.modal .modal-dialog').attr('class', 'modal-dialog  ' + animation + '  animated');
};

function animateModal(el, setAnimateIn, setAnimateOut) {
  animateIn = (typeof setAnimateIn !== 'undefined') ? setAnimateIn : 'zoomIn';
  animateOut = (typeof setAnimateOut !== 'undefined') ? setAnimateOut : 'zoomOut';

  $(el).on('show.bs.modal', function (e) {
    setAnimateModal(animateIn);
    $(el).addClass('active');
  });
  $(el).on('hide.bs.modal', function (e) {
    setAnimateModal(animateOut);
  });

  $(el).on('hidden.bs.modal', function (e) {
    $(el).removeClass('active').modal('hide');
  });
}


$('[data-toggle=modal]').on('click', function(e){
  var th         = $(this);
  var target     = th.data('target');
  var href       = th.attr('href');
  var animateIn  = th.attr('data-animateIn');
  var animateOut = th.attr('data-animateOut');
  var el         = '';

  e.preventDefault();

  if (typeof target !== 'undefined') {
    el = target;
  } else {
    el = href;
  }
  animateModal(el, animateIn, animateOut);

});

$('[data-dismiss="modal"], .modal .close').on('click', function(){  
  $(this).closest('.modal').on('hide.bs.modal', function (e) {
    setAnimateModal('zoomOut');
  });
});
