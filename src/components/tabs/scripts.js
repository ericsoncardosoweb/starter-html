// Script para função de tabs
$('.tab__nav a').on('click', function(e){
  let link = $(this);
  let linkParent = link.closest('li');
  let target = link.attr('href');
  let nav = link.closest('.tab__nav');
  let navItem = link.closest('.tab__nav').find('li');
  let pageFooter = $('#company-rent + .page-footer');
  let currentPageFooter = pageFooter.contents('.page-footer-wrapper' +'.'+ target.replace('#', ''));
  
  e.preventDefault();
  
  $(navItem).removeClass('active');
  $(linkParent).addClass('active');
  
  $(target).closest('.tab').find('.tab__panel').removeClass('active');
  $(target).addClass('active');
  
  $('.page-footer-wrapper').removeClass('active');
  if ($(currentPageFooter).next().hasClass('page-footer-wrapper')){
    $(currentPageFooter).next().addClass('active')
  }else {
    $(pageFooter).contents('.page-footer-wrapper:first-child').addClass('active');
  }
});

$('#company-rent + .page-footer a').on('click', function(){
  let link = $(this);
  let target = link.attr('href');
  let pageOffset = $('.page-content-wrapper').position().top + 1;
  console.log(target);
  console.log($('#company-rent-nav').find(target));
  
  
  $('body').animate({
    scrollTop: pageOffset
  }, 1000);
  $('#company-rent-nav a[href="'+target+'"]').trigger('click');
});

// carregar tab através de link
$('.tab__nav a').each(function(){
  let link = $(this);
  let linkParent = link.closest('li');
  let target = link.attr('href');
  let nav = link.closest('.tab__nav');
  let navItem = link.closest('.tab__nav').find('li');
  
  if (window.location.href.indexOf(target) > -1) {
    $(navItem).removeClass('active');
    $(linkParent).addClass('active');
    
    $(target).closest('.tab').find('.tab__panel').removeClass('active');
    $(target).addClass('active');
  }
  
  
  
});