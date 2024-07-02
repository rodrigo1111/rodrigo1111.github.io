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
var activeSection, previousActiveSection, visibleSection, previousVisibleSection, meetTechmanEnd, meetTechmanStart;
var techmanBalanceIsInFlow = false;



function readyResize(){

  sectionsHeights = [];

  $("section").each(function(index){

    sectionsHeights[index] = $(this).height();

  })

  meetTechmanEnd = sectionsHeights[0] + sectionsHeights[1] + sectionsHeights[2] + sectionsHeights[3] - $(window).height();
  meetTechmanStart = sectionsHeights[0] + sectionsHeights[1] + sectionsHeights[2];
  //console.log(sectionsHeights);
  meetTechmanBalanceEnd = sectionsHeights[0] + sectionsHeights[1] + sectionsHeights[2] + sectionsHeights[3] + sectionsHeights[4] + sectionsHeights[5] + sectionsHeights[6] + sectionsHeights[7] + sectionsHeights[8] + sectionsHeights[9] + sectionsHeights[10] + sectionsHeights[11] + sectionsHeights[12] + sectionsHeights[13] + sectionsHeights[14] + sectionsHeights[15] - $(window).height();
  meetTechmanBalanceStart = sectionsHeights[0] + sectionsHeights[1] + sectionsHeights[2] + sectionsHeights[3] + sectionsHeights[4] + sectionsHeights[5] + sectionsHeights[6] + sectionsHeights[7] + sectionsHeights[8] + sectionsHeights[9] + sectionsHeights[10] + sectionsHeights[11] + sectionsHeights[12] + sectionsHeights[13] + sectionsHeights[14];

  var temppp = sectionsHeights[0] + sectionsHeights[1] + sectionsHeights[2] +sectionsHeights[3];
  var tem2 = $("section").eq(4).offset();

  //console.log("SECTION0123.AGGREGATE == " + temppp );
  //console.log("SECTION4.TOP == " + $("section").eq(4).offset().top );

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
    $("section").each(function(index){
      if (index < activeSection) {
        $('.section-bg-wrapper[data-section=' + (index + 1) + ']').css("opacity","0");
      } else {
        $('.section-bg-wrapper[data-section=' + (index + 1) + ']').css("opacity","1");
      }
    })
    */

    if (activeSection < 3) {
      $("#three-techman , #three-techman-label").removeClass("fixed");
    } else {
      $("#three-techman , #three-techman-label").addClass("fixed");
    }

  }

  previousActiveSection = activeSection;

  if (activeSection == 3){
    meetTechmanSection(scrollPosition);
  }
  if (activeSection == 15){
    meetTechmanSectionBalance(scrollPosition);
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







function meetTechmanSection(scrollPosition) {
  /*
  if (scrollPosition > meetTechmanEnd) {
    $(".meet-techman .meet-techman-mobile-div").removeClass("fixed sticky-top").addClass("sticky-bottom");
  } else {
    $(".meet-techman .meet-techman-mobile-div").removeClass("sticky-top sticky-bottom").addClass("fixed");
  }
  */

  if (scrollPosition <= meetTechmanStart + (sectionsHeights[3] / 3)) {
    //green
    $(".section-4-wrapper .gradient-vertical.green").removeClass("hide");
    $(".section-4-wrapper .gradient-vertical.yellow").removeClass("hide");
    $(".meet-techman-meet .termometer-wrapper").removeClass("yellow red").addClass("green");
    //$(".termometer-status").html("low");
    $("#three-techman, #three-techman-label").removeClass("burnt semi-burnt");
    $(".techman-p-1").addClass("visible");
  } else if (scrollPosition > meetTechmanStart + (2 * (sectionsHeights[3] / 3))) {
    //red
    $(".section-4-wrapper .gradient-vertical.green").addClass("hide");
    $(".section-4-wrapper .gradient-vertical.yellow").addClass("hide");
    $(".meet-techman-meet .termometer-wrapper").removeClass("yellow green").addClass("red");

    $("#three-techman, #three-techman-label").addClass("burnt").removeClass("semi-burnt");
    //$(".termometer-status").html("high");
  } else if (scrollPosition > meetTechmanStart + (sectionsHeights[3] / 3)) {
    //yellow
    $(".section-4-wrapper .gradient-vertical.green").addClass("hide");
    $(".section-4-wrapper .gradient-vertical.yellow").removeClass("hide");
    $(".meet-techman-meet .termometer-wrapper").removeClass("green red").addClass("yellow");
    //$(".termometer-status").html("moderate");
    $("#three-techman, #three-techman-label").removeClass("burnt").addClass("semi-burnt");
    $(".techman-p-2, .techman-p-1").addClass("visible");
  }

  var temp = (( (scrollPosition - meetTechmanStart)) / sectionsHeights[3] ) * 100 + 20;

  if (temp > 100) {
    temp = 100;
  } else if (temp < 20) {
    temp = 33.333;
  }

  $(".meet-techman-meet .termometer .termometer-pill").css("width",  temp + "%");
}














function meetTechmanSectionBalance(scrollPosition) {

  var temp = 100 - ( (scrollPosition - meetTechmanBalanceStart) / (sectionsHeights[15] / 2) ) * 80;

  if (scrollPosition <= meetTechmanBalanceStart + (sectionsHeights[15] / 2)) {
    //red
    $(".section-16-wrapper .gradient-vertical.red").removeClass("hide");
    $(".meet-techman-balance .termometer-wrapper").removeClass("white").addClass("red");
    $("#three-techman-balance, #three-techman-balance-label").addClass("semi-burnt");

    $(".meet-techman-balance .termometer .termometer-pill").css("width",  temp + "%");
    $(".balance-p-1").addClass("visible");
    techmanBalanceIsInFlow = false;

  } else if (scrollPosition > meetTechmanBalanceStart + (sectionsHeights[15] / 2)) {
    //white
    $(".section-16-wrapper .gradient-vertical.red").addClass("hide");
    $(".meet-techman-balance .termometer-wrapper").removeClass("red").addClass("white");
    $("#three-techman-balance, #three-techman-balance-label").removeClass("semi-burnt");

    $(".meet-techman-balance .termometer .termometer-pill").css("width", "0");
    $(".balance-p-1, .balance-p-2").addClass("visible");
    techmanBalanceIsInFlow = true;
  }

  
  

  
}
