var isHeroTransitioning;


$(document).ready( function(){
  readyResize();
  readyScrollActive();



  $("html").addClass("loaded");



  $(".chevron-link").click(function(){
    $('html').animate({
      scrollTop: (windowHeight + 350)
    });
  })

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
  //console.log("#mainHeight=  " + $("#main").height());

  
  
  if (scrollPosition > 0) {
    isHeroActive = false;
    //add/remove class accordingly
    $("body").addClass("content-active");
  } else {
    isHeroActive = true;
    //add/remove class accordingly
    //$("body").addClass("hero-active");
  }
  /*
  console.log("#mainHeight*(aftIFELSE)=  " + $("#main").height());
  setTimeout(function(){
    console.log("#mainHeight*(aftTimeout)=  " + $("#main").height());
  }, 1000);
  */
}



function readyScrollActive(){

  scrollPosition = $(document).scrollTop();
  //console.log("is " + scrollPosition + " equal to " + windowHeight);
  var tolerance = 10;
  

  if (isHeroActive && (scrollPosition - tolerance > 350) && isStatic) {

    isStatic = false;

    $("body").addClass("content-active scrolling-down").removeClass("hero-active");
    isHeroTransitioning = true;
    
    $('html').animate({
      scrollTop: (windowHeight + 350)
    }, function(){
      isHeroActive = false;
      setTimeout(function(){
        isStatic = true;
        $("body").removeClass("scrolling-down");
      }, 1000);
      
    });

  } else if (!isHeroActive && (scrollPosition + tolerance < (windowHeight)) && isStatic) {
    
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

  if (isHeroActive) {
    var tempScrollPosition = scrollPosition;

    if (scrollPosition > 350) {
      tempScrollPosition = 350;
    }

    var chevronMarginTop = 30 - tempScrollPosition * .5429;
    var chevronHeight = 50 + Math.pow(tempScrollPosition, 3) * (1 / 430000);

    $("body:not(.content-active) .down .chevron-icon").css({"margin-top": chevronMarginTop, "height": chevronHeight});
  } else {
    var tempScrollPosition = (windowHeight + 350) - scrollPosition;

    if (scrollPosition < windowHeight) {
      tempScrollPosition = 350;
    } else if (scrollPosition > windowHeight + 350) {
      tempScrollPosition = 0;
    }

    var chevronMarginTop = 30 + tempScrollPosition * .2714;
    var chevronHeight = 50 + Math.pow(tempScrollPosition, 3) * (1 / 430000);

    $("body:not(.hero-active) .up .chevron-icon").css({"margin-top": chevronMarginTop, "height": chevronHeight});
  }

}