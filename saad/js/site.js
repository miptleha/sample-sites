$(document).ready(function () {
    $("header").on("click", "a", function () {
        var id = $(this).attr('href'),
            top = $(id).offset().top - 100;
        $('body,html').animate({ scrollTop: top }, 500);
        return false;
    });
});