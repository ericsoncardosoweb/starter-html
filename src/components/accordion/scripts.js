window.onload = (function() {
  //funcionamento dos itens de accordion
  function accordionOpenClose() {
    var accordion = $('.accordion-wrap');
    var accordionItem = accordion.contents('.accordion');
    var accordionHeader = accordionItem.contents('.accordion__header');
    var accordionContent = accordionItem.contents('.accordion__content');
    
    //fecha todos os itens quando a pág é carregada
    if (!accordion.parents().hasClass('flow-wrap__sidebar') && !accordion.parents().hasClass('modal-body')) {
      accordionContent.slideUp();
      //remove a classe que deixa o item fechado
      setTimeout(
        function () {
          accordionItem.removeClass('closed');
        }, 500
      );
    }
    
    // click no header ou botão do accordion
    accordionHeader.on('click', function (ev) {
      ev.preventDefault();
      var _this = $(this);
      var thisContent = _this.next('.accordion__content');
      var thisParent = _this.parent('.accordion');
      
      if (accordion.hasClass('calculate-wrap')) {
        thisContent.slideToggle();
        thisParent.toggleClass('active');
      }else {
        //abre e fecha um item, ou fecha todos e abre o atual
        if (thisParent.hasClass('active')) {
          //fecha o item atual
          thisContent.slideUp();
          thisParent.removeClass('active');
        } else {
          //fecha todos os itens e abre o atual
          accordionContent.slideUp();
          accordionItem.removeClass('active');
          thisParent.addClass('active');
          thisContent.slideDown();
        }
      }
    });
  }
  accordionOpenClose();
})