$(document).ready(function () {

    // lazyloading images
    $('section').find('img[data-src]').each(function () {
        $(this).attr('src', $(this).data('src')).removeAttr('data-src');
    });

    // lazyloading videos
    $('section').find('video[data-src]').each(function () {
        $(this).attr('src', $(this).data('src')).removeAttr('data-src');
    });

    // remove gallery links
    $('section').find('a.gallery').each(function () {
        $(this).removeAttr('href');
    });

    // remove lightbox links
    $('section').find('a.lightboxcontent').each(function () {
        $(this).removeAttr('href');
    });

    // externe links in neuem Fenster öffnen
    $(".uk-container a[href^='http://']:not(.lightboxcontent)").addClass('extern');
    $(".uk-container a[href^='https://']:not(.lightboxcontent)").addClass('extern');
    $('a.extern, a.newwindow').click(function (e) {
        e.preventDefault();
        window.open($(this).attr('href'));
    });

    // externe Links um Icon erweitern
    $('a.extern').each(function (e) {
        $(this).html('<i class="fas fa-external-link-alt"></i>' + $(this).html());
    });
});