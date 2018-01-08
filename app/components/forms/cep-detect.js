jQuery(document).ready(function(jQuery) {
	jQuery('form .cep, .field_cep').each(function(index, el) {
		var number = jQuery(this).closest('form').find('.number');
		var address = jQuery(this).closest('form').find('.address');
		var district = jQuery(this).closest('form').find('.district');
		var city = jQuery(this).closest('form').find('.city');
		var state = jQuery(this).closest('form').find('.state');

		if(typeof number == 'undefined'){
			number = '#number';
		}

		if(typeof address == 'undefined'){
			address = '#address';
		}

		if(typeof district == 'undefined'){
			district = '#district';
		}

		if(typeof city == 'undefined'){
			city = '#city';
		}

		if(typeof state == 'undefined'){
			state = '#state';
		}
 
		jQuery(this).consultarCep({
		  evento:        'blur',
		  focarAposPara: number,
		  campos: {
		    logradouro:  address,
		    bairro:      district,
		    localidade:  city,
		    uf:          state
		  }
		});
	});

	jQuery(".cep, .field_cep").keyup(function(event) {
		jQuery(this).closest('form').find('.collapse').slideDown('fast');

		var fieldVal = jQuery(this).closest('form').find('input');
		setInterval(function(){
			fieldVal.each(function(index, el) {
				var element = jQuery(this);
				if (element.val() != "") {
					element.closest('.form-group').addClass('has-success');
				}
			});			
		},800);

	});
});