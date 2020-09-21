$(window).scroll(function () {
   var scroll = $(window).scrollTop();

   if (scroll >= 500) {
      $("nav").addClass("nav--scrolled");
   } else {
      $("nav").removeClass("nav--scrolled");
   }
});