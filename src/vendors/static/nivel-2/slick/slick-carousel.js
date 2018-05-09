function destroy_slide(element) {
  element = element || '.slick-initialized';
  $(element).slick('destroy');     
}

function create_slide() {
  $("*[slide]").each(function(index, el) {
    var arrow = $(this).data('arrow');
    var dots = $(this).data('dots');
    var fade = $(this).data('fade');
    var breakpoints = $(this).data('show');
    var autoplay = $(this).data('autoplay');
    var numberStart = $(this).data('slide-from');
    var numberItems = $(this).find('.column').length;
    var slideEnable = false;

    if (typeof breakpoints != 'undefined') {
      var mobile      = breakpoints[0] || 1,
          tabletSmall = breakpoints[1] || breakpoints[0],
          tablet      = breakpoints[2] || breakpoints[0],
          desktop     = breakpoints[3] || breakpoints[0];
    } else{
      var mobile      = 1,
          tabletSmall = 1,
          tablet      = 1,
          desktop     = 1;
    }

    if (typeof numberStart != 'undefined') { 
      if ( numberItems > numberStart) {
        $(this).addClass('columns-slide'); 
        slideEnable = true;          
      }
    } else {
        slideEnable = true;   
    } 

    if (typeof arrow != 'undefined') {
      arrow = true; 
    } else { 
      arrow = false;  
    }

    if (typeof dots != 'undefined') {
      dots = true;  
    } else {
      dots = false;  
    }

    if (typeof fade != 'undefined') {
      fade = true;  
    } else {
      fade = false;  
    }

    if (typeof autoplay != 'undefined') {
      autoplay = true;  
    } else {
      autoplay = false;  
    }

    if (slideEnable) {
      $(this).slick({
        dots: dots,
        arrows: arrow,
        autoplay: autoplay,
        autoplaySpeed: 4000,
        infinite: true,
        speed: 500,
        cssEase: 'linear', 
        fade: fade,
        slidesToShow: desktop,
        slidesToScroll: desktop, 
        nextArrow: '<button class="slick-arrow slick-next"><i class="material-icons">keyboard_arrow_right</i></button>',
        prevArrow: '<button class="slick-arrow slick-prev"><i class="material-icons">keyboard_arrow_left</i></button>',
        lazyLoad: 'ondemand',
        responsive: [ 
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: desktop,
              slidesToScroll: desktop, 
            }
          },
          {
            breakpoint: 960,
            settings: {
              slidesToShow: tablet,
              slidesToScroll: tablet, 
              arrows: false 
            }
          },
          {
            breakpoint: 720,
            settings: {
              slidesToShow: tabletSmall,
              slidesToScroll: tabletSmall, 
              arrows: false
            }
          },
          {
            breakpoint: 420,
            settings: {
              slidesToShow: mobile,
              slidesToScroll: mobile,
              arrows: false
            }
          }
        ]
      });      
    }
    
  });

  // Controles personalizados para slides
  $('.slide-button-next').on('click', function(){
    var carousel = $(this).closest(".slide-wrap").find(".slick-slider");
    $(carousel).slick('slickNext');
  });

  $('.slide-button-prev').on('click', function(){
    var carousel = $(this).closest(".slide-wrap").find(".slick-slider");
    $(carousel).slick('slickPrev');
  });
 

}//create_slide

jQuery(document).ready(function($) {
  create_slide();
});