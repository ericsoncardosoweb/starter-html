if($(window).innerWidth() < 481) {
	$('.link-phone').map(function(i,e){
		var linkPhone = $(e);
		var Phone = linkPhone.data('phone');
		var Text = linkPhone.text();

		linkPhone.html('<a href="tel:'+Phone+'" class="phone-number">'+Text+'</a>');
	});
}else {
	$('.link-phone').addClass('phone-number');

}