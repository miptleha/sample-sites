$(function () {
    $('#load-more-button').click(function () {
        var $btn = $(this);
        $btn.attr('disabled', true);
        $('.wait-me').removeClass('d-none');
        $('.error-load-more').addClass('d-none')

        setTimeout(function () {
            $.ajax({
                url: 'template.html'
            }).done(function (res) {
                $('.wait-me')
                    .before(fillTemplate(res))
                    .before(fillTemplate(res));
                $('.wait-img').on('load', function() {
                    $('.load-more')[0].scrollIntoView();
                });

            }).fail(function (xhr, text, text2) {
                $('.error-load-more').removeClass('d-none').find('div').html(xhr.responseText);
            }).always(function () {
                $('.wait-me').addClass('d-none');
                $btn.attr('disabled', false);
            });
        }, 1000);
    });

    var _cnt = 10;
    function fillTemplate(template) {
        var lorem = new Lorem;
        template = template.replace("{category}", ["lifestyle", "photodiary", "music", "travel"][lorem.randomInt(0, 3)]);
        var title = lorem.createText(lorem.randomInt(3, 10), Lorem.TYPE.WORD);
        template = template.replace("{title}", title[0].toUpperCase() + title.slice(1));
        template = template.replace("{text}", lorem.createText(lorem.randomInt(3, 7), Lorem.TYPE.SENTENCE));
        template = template.replace("{img}", "https://picsum.photos/540/350?grayscale&rnd=" + (_cnt++));
        return template;
    }
});