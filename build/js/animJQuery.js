"use strict";
const anim = () => {
    $('.logo-img').fadeIn(2000, () => {
        $('.logo-img').fadeOut(2000, anim);
    });
};
$('.logo-img').animate({
    'opacity': 1
}, 1000);
anim();
$('#title').animate({
    'opacity': 1
}, 3000);
