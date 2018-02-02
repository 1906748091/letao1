window.addEventListener('load', function() {
    var letao = new Letao();
    letao.scroll();
});
var Letao = function() {

}
Letao.prototype = {
    scroll: function() {
        mui.init({
            pullRefresh: {　　
                container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {

                    callback: function() {

                        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                },
                　　up: {　　　　
                    contentrefresh: '正在加载...',
                    　　　　contentnomore: '没有更多数据了',
                    　　　　callback: function() {

                        } //上拉加载下一页
                        　　
                }
            }
        });

    },
    getProductlist: function(options, callback) {
        $.ajax({
            url: '/product/queryProduct',
            data: options,
            success: function(data) {}
        })
    }
}