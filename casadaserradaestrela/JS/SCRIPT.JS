var navHeight;

var draggerSliderLastElementOffset = [];
var draggerSliderFirstElementOffset = [];
var draggerSliderLastElementWidth = [];
var viewportWidth;

$(document).ready(function() {



var draggableSliderOffset = [];
var draggableSliderIsDragging = [];
var oldPos = [];

$(".draggable-slider ").each(function(index){

  var activeDraggableSlider = $(this);
  activeDraggableSlider.find("img").on('dragstart', function(event) { event.preventDefault(); });

  draggableSliderIsDragging[index] = false;
  draggableSliderOffset[index] = 0;
  oldPos[index] = 0;


  activeDraggableSlider
  .on("mouseup",function(e){
    draggableSliderIsDragging[index] = false;
    oldPos[index] = 0;
  })
  .on("touchend",function(e){
    draggableSliderIsDragging[index] = false;
    oldPos[index] = 0;
  })
  .on("mousedown", function(e){
    draggableSliderIsDragging[index] = true;
    oldPos[index] = e.pageX;
  })
  .on("touchstart", function(e){
    draggableSliderIsDragging[index] = true;
    oldPos[index] = e.originalEvent.touches[0].pageX;
  })
  .on("mousemove", function(e){
    var tempLastOffset = $(this).find("div:last-child").offset();
    draggerSliderLastElementOffset[index] = tempLastOffset.left;

    var tempFirstOffset = $(this).find("div:first-child").offset();
    draggerSliderFirstElementOffset[index] = tempFirstOffset.left;

    draggerSliderLastElementWidth[index] = activeDraggableSlider.find("div:last-child").width();

    if (draggableSliderIsDragging[index]) {
      var temp = e.pageX - oldPos[index];
      draggableSliderOffset[index] += temp;

      if (draggableSliderOffset[index] > 0) {
        draggableSliderOffset[index] = 0;
      } else if (draggableSliderOffset[index] < ((draggerSliderFirstElementOffset[index] - draggerSliderLastElementOffset[index] ) + (activeDraggableSlider.width() - draggerSliderLastElementWidth[index]) )) {
        draggableSliderOffset[index] = ((draggerSliderFirstElementOffset[index] - draggerSliderLastElementOffset[index] ) + (activeDraggableSlider.width() - draggerSliderLastElementWidth[index]) );
      }

      activeDraggableSlider.css("transform", "translateX(" + draggableSliderOffset[index] + "px)")

      oldPos[index] = e.pageX;
    }
    $("#debug").html(draggableSliderOffset[0]);
  })
  .on("touchmove", function(e){
    var tempLastOffset = $(this).find("div:last-child").offset();
    draggerSliderLastElementOffset[index] = tempLastOffset.left;

    var tempFirstOffset = $(this).find("div:first-child").offset();
    draggerSliderFirstElementOffset[index] = tempFirstOffset.left;

    draggerSliderLastElementWidth[index] = activeDraggableSlider.find("div:last-child").width();

    if (draggableSliderIsDragging[index]) {
      var temp = e.originalEvent.touches[0].pageX - oldPos[index];
      draggableSliderOffset[index] += temp;

      if (draggableSliderOffset[index] > 0) {
        draggableSliderOffset[index] = 0;
      } else if (draggableSliderOffset[index] < ((draggerSliderFirstElementOffset[index] - draggerSliderLastElementOffset[index] ) + (activeDraggableSlider.width() - draggerSliderLastElementWidth[index]) )) {
        draggableSliderOffset[index] = ((draggerSliderFirstElementOffset[index] - draggerSliderLastElementOffset[index] ) + (activeDraggableSlider.width() - draggerSliderLastElementWidth[index]) );
      }

      activeDraggableSlider.css("transform", "translateX(" + draggableSliderOffset[index] + "px)")

      oldPos[index] = e.originalEvent.touches[0].pageX;
    }
    $("#debug").html(draggableSliderOffset[0]);
  })
  .on("mouseleave", function(e){
    draggableSliderIsDragging[index] = false;
    oldPos[index] = 0;
  });



})









/*



  dragElement(document.getElementById("teste"));

  function dragElement(elmnt) {
    console.log("clicking");
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
    //  document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  //  } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
    //  elmnt.onmousedown = dragMouseDown;
    //}

    /*function dragMouseDown(e) {
      console.log("clicking");
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      console.log("clicking");
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos3 = e.clientX;
      // set the element's new position:

      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
*/
  //  function closeDragElement() {
    //  console.log("clicking");
      /* stop moving when mouse button is released:*/
      //document.onmouseup = null;
      //document.onmousemove = null;
  //  }
//  }














  navHeight = $(".fixed-nav-wrapper").height();
  console.log(navHeight);

  $(".navbar-toggler").click(function() {

    if ($("#mobile-toggle").attr("aria-expanded") === "true") {
      $("#mobile-toggle").attr("aria-expanded", false);
      $(".fixed-nav-wrapper").removeClass("expanded");
    } else {
      $("#mobile-toggle").attr("aria-expanded", true);
      $(".fixed-nav-wrapper").addClass("expanded");
    }

  });



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


  $(".nav-item").click(function(){
    if (!$(this).hasClass("active")) {
      $(".nav-item").removeClass("active");
      $(this).addClass("active");
    }
  });

  $(document).on('click', 'a[href^="#"]', function (event) {

    if ( $(this).hasClass("animate-scroll") ) {
      event.preventDefault();

      

      $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
      }, 500);
    }
});
  /*
  $(function(){
    //$("nav a").click(function(evt){
    $("a").click(function(evt){
      if (!$(this).hasClass("prevent-animation")){

        evt.preventDefault();
        if ($(this).hasClass("destination-dark-theme")){
          $("html").addClass("dark-theme").removeClass("light-theme");
        } else {
          $("html").addClass("light-theme").removeClass("dark-theme");
        }
        $("html").addClass("is-animating");
        var link = $(this).attr("href");
        setTimeout(function() {
            window.location.href = link;
        }, 500);
      }

    });
  });*/

});

var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();

   if (st > navHeight) {
     //$(".fixed-nav-wrapper .navbar").removeClass("transparent");

     if (st > lastScrollTop){
       //DOWN
       if ($("#mobile-toggle").attr("aria-expanded") === "false") {
         $(".fixed-nav-wrapper").addClass("occult");
       }
     } else {
       //UP
       $(".fixed-nav-wrapper").removeClass("occult");
     }
     lastScrollTop = st;
   } else {
     //$(".fixed-nav-wrapper .navbar").addClass("transparent");
   }
});

function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > (viewportTop + navHeight) && elementTop < viewportBottom;
};

//Does not run on document ready YET!!
function readyResizeScroll() {
  $('.animate-entry').each(function() {
      var thisElement = $(this);
    if ($(this).isInViewport()) {
      thisElement.addClass('visible');
    } /*else {
      thisElement.removeClass('visible');
    }*/
  });
}

function readyResize() {

}

$(window).on("resize", function(){
  navHeight = $(".fixed-nav-wrapper").height();
  readyResize();
});

$(window).on("resize scroll", readyResizeScroll);
$(document).ready(function(){
  readyResizeScroll();
  readyResize();
});
