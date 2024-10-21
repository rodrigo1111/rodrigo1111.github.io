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