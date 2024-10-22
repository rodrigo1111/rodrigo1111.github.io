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
  readyScrollVisible();
} );
$(window).resize( readyResize );
$(window).scroll( function(){
  readyScrollActive();
  readyScrollVisible();
} );

var sectionsHeights = [];
var activeSection, previousActiveSection, visibleSection, previousVisibleSection;



function readyResize(){

  sectionsHeights = [];

  $("section").each(function(index){

    sectionsHeights[index] = $(this).height();

  })


  $(".scroller").click(function(){
    var tempHref = $(this).data("href");
    $([document.documentElement, document.body]).scrollTop($(tempHref).offset().top);
  })

  $(".bullet-scroll").click(function(){
    var temp = $(this).data("index");

    $([document.documentElement, document.body]).scrollTop($("section").eq(temp - 1).offset().top);
  })
}






















function readyScrollActive(){
  var scrollPosition = $(document).scrollTop() /* none? /2? /4?*/;
  var aggregateHeight = sectionsHeights[0];

  for (let i = 0; i < sectionsHeights.length; i++ ){

    if (scrollPosition < aggregateHeight){
      activeSection = i;
      break;
    }

    aggregateHeight += sectionsHeights[i + 1];
  }



  if (activeSection != previousActiveSection) {
    $("section").removeClass("active");
    $("section").eq(activeSection).addClass("active");

/*
    if (activeSection < 3) {
      $("#three-techman , #three-techman-label").removeClass("fixed");
    } else {
      $("#three-techman , #three-techman-label").addClass("fixed");
    }

  }
*/
  previousActiveSection = activeSection;
}
}



















function readyScrollVisible() {
  var scrollPosition = $(document).scrollTop() + sectionsHeights[0]/4 /* none? /2? /4?*/;
  var aggregateHeight = sectionsHeights[0];

  for (let i = 0; i < sectionsHeights.length; i++ ){

    if (scrollPosition < aggregateHeight){
      visibleSection = i;
      break;
    }

    aggregateHeight += sectionsHeights[i + 1];
  }



  if (visibleSection != previousVisibleSection) {
    $("section").removeClass("visible");
    $("section").eq(visibleSection).addClass("visible");
    
    $(".bullet-scroll").removeClass("active");
    $('.bullet-scroll[data-index=' + (visibleSection + 1) + ']').addClass("active");

    $("section").each(function(index){
      if (index < visibleSection) {

        $('.section-bg-wrapper[data-section=' + (index + 1) + ']').css("opacity","0");

        if (visibleSection == 1) {
          $('.section-bg-wrapper[data-section=1]').css("opacity","1");
          $('.first-section').css("opacity","0");
        } else if (visibleSection == 0) {
          $('.first-section').css("opacity","1");
        }
        
      } else {
        $('.section-bg-wrapper[data-section=' + (index + 1) + ']').css("opacity","1");
      }
    })
  }

  previousVisibleSection = visibleSection;
}