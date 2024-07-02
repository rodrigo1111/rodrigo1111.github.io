var miniGraphs = $(".mini-graph-wrapper");
var timer

var Timer = function(callback, delay) {
  var timerId, start, remaining = delay;

  this.pause = function() {
      window.clearTimeout(timerId);
      timerId = null;
      remaining -= Date.now() - start;
  };

  this.resume = function() {
      if (timerId) {
          return;
      }

      start = Date.now();
      timerId = window.setTimeout(callback, remaining);
  };

  this.resume();
};



counting();

function counting() {
  timer = new Timer(function() {
    if ($(".mini-graph-wrapper").hasClass("move")) {
      $(".mini-graph-wrapper").removeClass("move");
    } else {
      $(".mini-graph-wrapper").addClass("move");
    }

    clearTimeout(timer);
    counting();

  }, 10000);
}

$(document).ready(function(){
  $(".mini-graph-button").click(function(){
    $(".mini-graph-button").removeClass("pulsing");

    if ($(".mini-graph-wrapper").hasClass("move")) {
      $(".mini-graph-wrapper").removeClass("move");
    } else {
      $(".mini-graph-wrapper").addClass("move");
    }
    clearTimeout(timer);
    counting();
  })

  $(".mini-graph-wrapper").hover(
				
    function () {
      timer.pause();
    }, 

    function () {
      timer.resume();
    }
 );
})
