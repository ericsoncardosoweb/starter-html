'use strict'

const focusBlur = (function() {

  const fnPublick = {};

  /* ========= Private =========  */
  function createMask(a, b){
    if (!$('.mask-blur').length) {
      $('body, #app').append(`<div class="mask-blur active"></div>`);
    } else {
      $('.mask-blur').addClass('active');
    }

 
    $('.mask-blur').on('click', function (e) {
      focusBlur.end();
    });

    clickOutMask(a, b);

  }

  function destroyMask() {
    $('.mask-blur').removeClass('active');
  }

  function clickOutMask(a, b) {
    $(document).on('click', function (e) {

      if ($(e.target) != $('.mask-blur') && $(e.target).closest(a).length === 0) {
        focusBlur.end();
      }

      e.stopPropagation()

      $(document).off('click')
    });
  }
  
  /* ========= Public =========  */
  const disableArea = $('.container, .section, section, .wrapper, main, .nav-bar');

  fnPublick.init = function (a, b) {

    createMask(a, b);

    disableArea.addClass('focus-blur-static');


    if (!!a) {
      $(a).addClass('focus-blur-enable');
    }

    if (!!b) {
      $(b).addClass('focus-blur-enable');
    }


  }

  fnPublick.end = function () {
    
    disableArea.removeClass('focus-blur-static');
    
    $('.focus-blur-enable').removeClass('focus-blur-enable active');

    destroyMask()

  }

  return fnPublick; 


})();

function initFocusBlur() {
  if ($('[class*="focus-blur"]').length) { //Verifica se existe um elemento ativador da função
    const onMobile = $('.focus-blur--mobile');
    const onDesktop = $('.focus-blur--desktop');
    const initMobile = 991;

    if ($(window).innerWidth > initMobile) {
      onDesktop.on('click', function () {
        // Adaptação para o dropdown-ui
        if ($(this).hasClass('dropdown-ui')) {
          const target = $("#" + $(this).attr('data-target'));

          focusBlur.init($(this), target);
        } else { 
          focusBlur.init($(this));
        }
 

      });
    } else {
      onMobile.on('click', function () {
        // Adaptação para o dropdown-ui
        if ($(this).hasClass('dropdown-ui')) {
          const target = $("#" + $(this).attr('data-target'));

          focusBlur.init($(this), target);
        } else {
          focusBlur.init($(this));
        }
      });
    }

  }

} 