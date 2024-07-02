var lottieAnimation;
var resettable = false;
var clickableArrows = true;

function playIdle(){
  lottieAnimation.playSegments([[0, 39]], true);
  lottieAnimation.loop = true;
}

$(document).ready(function(){

  lottieAnimation = bodymovin.loadAnimation({
    container: document.getElementById("player"),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "lottie/d-pad.json"
  });

  setTimeout(function(){
     playIdle();
  }, 5000);



  $(".d-pad-button").click(function(){

    if (clickableArrows) {
      resettable = false;
      $(this).removeClass("pulsing");

      $(".d-pad-wrapper").addClass("animation-done");
      $(".d-pad-companion").removeClass("active");


      if ($(this).hasClass("right")) {
        lottieAnimation.playSegments([[40, 88]], true);
        lottieAnimation.loop = false;
        $(".d-pad-companion.engagement").addClass("visible");

        setTimeout(function(){
          lottieAnimation.playSegments([[80, 87]], true);
          lottieAnimation.loop = true;
          $(".d-pad-companion.engagement").addClass("active");
          $(".d-pad-reset-button").addClass("visible");

          resettable = true;
        }, ((88 - 40) / 30 ) * 1000);

      } else if ($(this).hasClass("top")) {
        lottieAnimation.playSegments([[88, 148]], true);
        lottieAnimation.loop = false;
        $(".d-pad-companion.burnout").addClass("visible");

        setTimeout(function(){
          lottieAnimation.playSegments([[136, 147]], true);
          lottieAnimation.loop = true;
          $(".d-pad-companion.burnout").addClass("active");
          $(".d-pad-reset-button").addClass("visible");

          resettable = true;
        }, ((148 - 88) / 30 ) * 1000);

      } else if ($(this).hasClass("left")) {
        lottieAnimation.playSegments([[148, 216]], true);
        lottieAnimation.loop = false;
        $(".d-pad-companion.9to5").addClass("visible");

        setTimeout(function(){
          lottieAnimation.playSegments([[199, 215]], true);
          lottieAnimation.loop = true;
          $(".d-pad-companion.9to5").addClass("active");
          $(".d-pad-reset-button").addClass("visible");

          resettable = true;
        }, ((216 - 148) / 30 ) * 1000);

      } else if ($(this).hasClass("bottom")) {
        lottieAnimation.playSegments([[216, 381]], true);
        lottieAnimation.loop = false;
        $(".d-pad-companion.boredom").addClass("visible");

        setTimeout(function(){
          lottieAnimation.playSegments([[348, 380]], true);
          lottieAnimation.loop = true;
          $(".d-pad-companion.boredom").addClass("active");
          $(".d-pad-reset-button").addClass("visible");

          resettable = true;
        }, ((381 - 216) / 30 ) * 1000);
      }
    }
  });

  $(".d-pad-reset-button").click(function(){
    if (resettable){
      clickableArrows = false;
      $(".d-pad-wrapper").removeClass("animation-done");
      $(".d-pad-reset-button").removeClass("visible");
      $("#player").addClass("fade-out");
      $(".d-pad-companion").removeClass("active visible");
      setTimeout(function(){
        $("#player").removeClass("fade-out");
        lottieAnimation.playSegments([[381, 410]], true);
        lottieAnimation.loop = false;
        $(".d-pad-companion.idle").addClass("active");

        setTimeout(function(){
          clickableArrows = true;
          playIdle()
        }, ((410 - 381) / 30 ) * 1000);
      }, 310);
    }
  });
})
