var isHeroTransitioning;

$(document).ready(function(){
    $("html").addClass("loaded");

    $("a.hero-link[href]").click(function(e){
      e.preventDefault();
      if (this.href) {
          var target = this.href;
          setTimeout(function(){
              window.location = target;
          }, 1500);
      }


      if ($(".grey-background").hasClass("fullscreen")){
        $(".grey-background").removeClass("fullscreen");
        $(".elbot-navbar").removeClass("active");
        $(".hero-elbot-logo-wrapper").removeClass("transition");
        //isHeroTransitioning = false;
      } else {
        $(".grey-background").addClass("fullscreen");
        $(".elbot-navbar").addClass("active");
        $(".hero-elbot-logo-wrapper").addClass("transition");
        isHeroTransitioning = true;
      }
    })

});

























$(document).ready( function(){
  readyResize();
  readyScrollActive();
} );
$(window).resize( readyResize );
$(window).scroll( function(){
  readyScrollActive();
} );

var windowHeight;
var isHeroActive = true;
var isStatic = true;
var scrollPosition;



function readyResize(){

  windowHeight = $(window).height();
  scrollPosition = $(document).scrollTop();

  
  if (scrollPosition > 0) {
    isHeroActive = false;
  } else {
    isHeroActive = true;
  }
  
}



function readyScrollActive(){

  scrollPosition = $(document).scrollTop();
  console.log("is " + scrollPosition + " equal to " + windowHeight);
  var tolerance = 100;
  

  if (isHeroActive && (scrollPosition - tolerance > 0) && isStatic) {

    isStatic = false;
    $('body').addClass('stop-scrolling');
    
    $('html').animate({
      scrollTop: windowHeight
    }, function(){
      isHeroActive = false;
      setTimeout(function(){
        isStatic = true;
        $('body').removeClass('stop-scrolling')
      }, 1000);
      
    });

  } else if (!isHeroActive && (scrollPosition - tolerance < windowHeight) && isStatic) {
    
    isStatic = false;
    $('body').addClass('stop-scrolling');

    $('html').animate({
      scrollTop: 0
    }, function(){
      isHeroActive = true;
      setTimeout(function(){
        isStatic = true;
        $('body').removeClass('stop-scrolling');
      }, 1000);
    });

  }

}