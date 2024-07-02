function checkDisabled(c, e){
  e.find(".main-graph-arrow-btn").prop('disabled', false);

  if (c >= 2) {
    e.find(".main-graph-arrow-btn.next").prop('disabled', true);
    e.find(".main-graph-nav-pill").removeClass("center left").addClass("right");
  } else if (c <= 0) {
    e.find(".main-graph-arrow-btn.previous").prop('disabled', true);
    e.find(".main-graph-nav-pill").removeClass("center right").addClass("left");
  } else {
    e.find(".main-graph-nav-pill").removeClass("right left").addClass("center");
  }

  e.find(".main-graph-input-radio").prop('checked', false);
  e.find(".main-graph-input-radio[data-index='" + c + "']").prop('checked', true);
}

function refreshGraph(c, e){

  //if (c != previousCount){
    e.find(".bar").each(function(){
      if (c == 0){
        var temp = $(this).parent(".bar-wrapper").data("0");
        $(this).parent(".bar-wrapper").find(".percentage").html(temp + "%");
        $(this).css("height", ((temp * 100) / 80) * 5);
      } else if (c == 1){
        var temp = $(this).parent(".bar-wrapper").data("1");
        $(this).parent(".bar-wrapper").find(".percentage").html(temp + "%");
        $(this).css("height", ((temp * 100) / 80) * 5);
      } else if (c == 2){
        var temp = $(this).parent(".bar-wrapper").data("2");
        $(this).parent(".bar-wrapper").find(".percentage").html(temp + "%");
        $(this).css("height", ((temp * 100) / 80) * 5);
      }
    });

    //previousCount = counter;
  //}
}


$(document).ready(function(){
  checkDisabled(1, $(".main-graph-wrapper"));
  refreshGraph(1, $(".main-graph-wrapper"));

  $(".main-graph-radio-group .btn").click(function(){
    var counter = $(this).data("index");
    var element = $(this).parent().parent().parent();

    $(".main-graph-arrow-btn").removeClass("pulsing");

    checkDisabled(counter, element);
    refreshGraph(counter, element);
  })



  $(".main-graph-arrow-btn").click(function(){
    $(".main-graph-arrow-btn").removeClass("pulsing");

    var element = $(this).parent().parent();
    var counter = element.find(".main-graph-input-radio:checked").data("index");

    if ($(this).hasClass("next")) {
      counter++;
      if (counter >= 2){counter = 2}
    } else if ($(this).hasClass("previous")) {
      counter--;
      if (counter <= 0){counter = 0}
    }

    console.log("CONTANDO::::: " + counter);

    checkDisabled(counter, element);
    refreshGraph(counter, element);
  })



})
