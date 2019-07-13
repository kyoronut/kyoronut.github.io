function navbar(dir){
    $.ajax({
        url: dir + "navbar.html",
        cache: false,
        success: function(html){
            document.write(html);
        }
    });
}
