$(document).ready(function() {
    var anim = [];
    $(".lottie").each(function (index){
      var activePlayer = $(this);
      var jsonPath = activePlayer.data("json-path");
  
      anim[index] = {
        container: activePlayer.get(0),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: jsonPath
      };
      anim[index] = bodymovin.loadAnimation(anim[index]);
    })
  })