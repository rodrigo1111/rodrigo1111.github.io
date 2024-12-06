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
    })

});

























$(document).ready( function(){
  readyResize();
  readyScrollActive();
/*
  $(".accordion-wrapper").click(function(){
    setTimeout(function(){
      $(".accordion-wrapper").each(function(){
        var temp = $(this);
        if ($(this).find(".accordion-title a").attr("aria-expanded") === "true") {
          temp.removeClass("closed");
        } else {
          temp.addClass("closed");
        }
      });
    }, 10);

  });
  */
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
    //add/remove class accordingly
    $("body").addClass("content-active");
  } else {
    isHeroActive = true;
    //add/remove class accordingly
    //$("body").addClass("hero-active");
  }
  
}



function readyScrollActive(){

  scrollPosition = $(document).scrollTop();
  console.log("is " + scrollPosition + " equal to " + windowHeight);
  var tolerance = 0;
  

  if (isHeroActive && (scrollPosition - tolerance > 0) && isStatic) {

    isStatic = false;

    $("body").addClass("content-active scrolling-down").removeClass("hero-active");
    isHeroTransitioning = true;
    
    $('html').animate({
      scrollTop: windowHeight
    }, function(){
      isHeroActive = false;
      setTimeout(function(){
        isStatic = true;
        $("body").removeClass("scrolling-down");
      }, 1000);
      
    });

  } else if (!isHeroActive && (scrollPosition + tolerance < windowHeight) && isStatic) {
    
    isStatic = false;

    $("body").addClass("hero-active scrolling-up").removeClass("content-active");
    //isHeroTransitioning = false;

    $('html').animate({
      scrollTop: 0
    }, function(){
      isHeroActive = true;
      setTimeout(function(){
        isStatic = true;
        $("body").removeClass("scrolling-up");
      }, 1000);
    });

  }

}