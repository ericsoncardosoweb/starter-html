// Slick - Carousel para grupos
;(function($) {

  $('.groups-carousel .carousel').slick({
		dots: false,
		arrows: true,
		infinite: true,
    autoplay: false,
		speed: 900,
		draggable: true,
    slidesToScroll: 1,
    slidesToShow: 4,
		fade: false,
		cssEase: 'linear',
    autoplaySpeed: 4000,
    variableWidth: false,
    prevArrow: '<button class="slick-arrow slick-prev"><i class="icon-chevron-left"></i><span>Voltar</span></button>',
    nextArrow: '<button class="slick-arrow slick-next"><span>Mais</span><i class="icon-chevron-right"></i></button>'
  });

  $('.groups-carousel .carousel .slick-prev').css({
    opacity: 0,
    visibility: 'hidden'
  });
  
  $('.groups-carousel .carousel .slick-next').on('click', function () {
    ('.groups-carousel .carousel .slick-prev').css({
      opacity: 1,
      visibility: 'visible'
    });   
  });
  


})(jQuery)
 