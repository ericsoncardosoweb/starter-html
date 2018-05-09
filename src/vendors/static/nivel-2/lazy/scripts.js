function initLazy(){
  $('.lazy').Lazy({
    effect: 'fadeIn',
    zoom: true
  });
}

jQuery(document).ready(function($) {
  initLazy();
}); 