$(document).ready(function(){
    $("html").addClass("loaded");

    $(".grey-background").click(function(){
      if ($(this).hasClass("fullscreen")){
        $(this).removeClass("fullscreen");
        $(".hero-elbot-logo-wrapper").removeClass("transition");
      } else {
        $(this).addClass("fullscreen");
        $(".hero-elbot-logo-wrapper").addClass("transition");
      }
    })
});