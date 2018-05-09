// Slick - Slider página home
;(function($) {

	function bannerHomeResponsive() {
		// Lista todas as imagens do slider
		$.each($('.img-slider'), function() {

			// Pega imagem atual
			$(this).attr('src', function(i, imageSrc) {

				// Verifica tamanho da tela e se caso o dimensionamento for menor que 768px retorna imagem para tela mobile
				if ($(window).width() < 650) {
					$(this).removeClass('desktop').addClass('mobile');
					return $(this).data('mobile')
				}

				// Retorna imagem para tela desktop caso o if seja falso
				$(this).removeClass('mobile').addClass('desktop');
				return $(this).data('desktop')
			})
		})
	}

	function sliderButtonsAdjust(slider, wrapper) {
		setTimeout(function(){
			var _slider = slider,
			_wrapper =  '<div class="' + wrapper + '" />',
			_wrapperSelector = '.' + wrapper;

			//cria o wrapper dentro do slider selecionado
			slider.append(_wrapper);

			//localiza as setas do slider selecionado e adiciona ao wrapper criado
			slider.find('.slick-arrow').appendTo(_wrapperSelector);
		}, 700)
	}

	$('.banner-slide').slick({
		dots: false,
		arrows: true,
		infinite: true,
		autoplay: true,
		speed: 500,
		draggable: true,
		fade: false,
		cssEase: 'linear',
		autoplaySpeed: 5000,
		prevArrow: '<button class="slick-arrow slick-prev"><i class="icon-arrow-left-circle"></i></button>',
		nextArrow: '<button class="slick-arrow slick-next"><i class="icon-arrow-right-circle"></i></button>',
		responsive: [
		{
			breakpoint: 767,
			settings: {
				arrows: false,
			}
		}
		]
	});

	// Verifica redimencionamento da tela
	$(window).resize(function() {
		bannerHomeResponsive()
	});

	bannerHomeResponsive()

})(jQuery)
