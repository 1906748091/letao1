var letao = null;
var id = 0;
$(function() {
    id = getQueryString('id')
    letao = new Letao();
    letao.slideshowRendering();

})
var Letao = function() {

}
Letao.prototype = {
    sliderInit: function() {
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 1000
        });
    },
    slideshowRendering: function() {
        $.ajax({
            url: '/product/queryProductDetail',
            data: { 'id': id },
            success: function(data) {

                var html = template('sildershowTmp', data);
                $('.mui-slider').html(html);
                var first = $('.mui-slider-group .mui-slider-item:first-of-type').clone().addClass('mui-slider-item-duplicate');
                var last = $('.mui-slider-group .mui-slider-item:last-of-type').clone().addClass('mui-slider-item-duplicate');
                $('.mui-slider-group').append(first);
                $('.mui-slider-group .mui-slider-item:first-of-type').before(last);
                letao.sliderInit();
                var start = data.size.split('-')[0];
                var end = data.size.split('-')[1];
                data.size = [];
                for (var i = start; i <= end; i++) {
                    data.size.push(parseInt(i));
                }
                console.log(data);
                var pHtml = template('particularsTmp', data);
                $('.product').html(pHtml);
                mui('.product-num').numbox();
            }
        })
    }

}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}