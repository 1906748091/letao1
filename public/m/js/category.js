window.addEventListener('load', function() {
    var letao = new Letao();
    letao.scrollInit();
    letao.getCategoryLeft();
    letao.getCategoryRight();
})
var Letao = function() {

}
Letao.prototype = {
    scrollInit: function() {
        mui('.mui-scroll-wrapper').scroll({
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏 值越小滚动速度越快 值越大速度越慢
            bounce: true //是否启用回弹  弹簧
        });
    },
    getCategoryLeft: function() {
        $.ajax({
            url: '/category/queryTopCategory',
            success: function(data) {
                var html = template('categoryLeftTmp', data);
                $('.category-left ul').html(html);
                $('.category-left ul li').eq(0).addClass('active');
            }
        })
    },
    getCategoryRight: function() {
        $('.category-left').on('click', 'ul li a', function() {
            $('.category-left ul li').removeClass('active');
            $(this).parent().addClass('active');
            var id = $(this).data('id');
            console.log(id);
            getData(id);
        });
        getData(1);

        function getData(id) {
            $.ajax({
                url: '/category/querySecondCategory',
                data: { 'id': id },
                success: function(data) {
                    console.log(data);
                    var html = template('categoryRightTmp', data);
                    console.log(html);
                    $('.category-list').html(html);
                }
            })
        }
    }
}