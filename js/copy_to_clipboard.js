
$(document).ready(function(){
    $(".copy-to-clipboard").click(function(){
        var tempHref = $(this).data("href");
        navigator.clipboard.writeText(tempHref);

        var copiedEl = $(this).closest(".main-button").find(".copied");
        copiedEl.addClass("visible");
        
        setTimeout(function(){
            copiedEl.removeClass("visible");
        }, 2000);
    })
})