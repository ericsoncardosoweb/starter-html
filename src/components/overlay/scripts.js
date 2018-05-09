$('[data-toggle="overlay"]').on('click', function(e){
	e.preventDefault();
	var th = $(this);
	var target = th.data('target');

	$(target).toggleClass('active');


});


$('[data-dismiss="overlay"], .close').on('click', function(e){
	$('.overlay').removeClass('active');
});

 