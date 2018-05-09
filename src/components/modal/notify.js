function notify(el, type, text) {

  el = el || '#notify';

  type = type || 'info';

  text = text || '';

  if($(el).length == 0) {
    $('body').append('\
      <div class="modal fade notify" id="notify" tabindex="-1" role="dialog" aria-hidden="true">\
        <div class="modal-dialog" role="document">\
          <div class="modal-content">\
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">fechar <i class="material-icons">close</i></button>\
            <div class="modal-body">\
              <div class="icon"></div>\
              <div class="text"></div>\
            </div>\
          </div>\
        </div>\
      </div>\
      ');
  }
  animateModal($(el));

  $(el).modal('show');


  if(type == 'info') {
    $(el).find('.icon').html('<i class="icon-alert-triangle"></i>');
  }

  if(type == 'error') {
    $(el).find('.icon').html('<i class="icon-alert-triangle"></i>');
  }

  if(type == 'alert') {
    $(el).find('.icon').html('<i class="icon-alert-triangle"></i>');
  }

  if(type == 'success') {
    $(el).find('.icon').html('<i class="icon-checked"></i>');
  }


  $(el).find('.text').html(text);

  $(el).find('.close').on('click', function(){
    $(el).modal('hide');

    setTimeout(function(){
      $(el).remove();
    }, 3000);
  });



}
