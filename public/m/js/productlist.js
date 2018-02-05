var letao = null;
window.addEventListener('load', function() {
    letao = new Letao();
    letao.scroll();
    letao.searchProduct();
    letao.sortProduct();
});
var page = 1;
var Letao = function() {

}
Letao.prototype = {
    scroll: function() {
        mui.init({
            pullRefresh: {　　
                container: ".mui-scroll-wrapper",
                //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                auto: true,
                down: {

                    callback: downCallback
                        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                },
                　　up: {　　　　　　　　
                    callback: upCallback
                        //上拉加载下一页
                }
            }
        });

        function downCallback() {
            letao.getProductlist({
                proName: "鞋",
                page: 1,
                pageSize: 2

            }, function(data) {
                setTimeout(function() {
                    var html = template('productlistTmp', data)
                    $('.producst-list-body .mui-row').html(html);
                    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    page = 1;
                    mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                }, 1000)
            });
        }

        function upCallback() {
            page++;
            letao.getProductlist({
                proName: '鞋',
                page: page,
                pageSize: 2
            }, function(data) {
                console.log(data);
                setTimeout(function() {
                    var html = template('productlistTmp', data)
                    if (data.data.length <= 0) {
                        mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        return;
                    }
                    $('.producst-list-body .mui-row').append(html);
                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                }, 1000)
            })
        }
    },
    //下拉上拉公共获取数据方法
    getProductlist: function(options, callback) {
        options.page = options.page || 1;
        options.pageSize = options.pageSize || 2;
        $.ajax({
            url: '/product/queryProduct',
            data: options,
            success: function(data) {
                callback && callback(data);
            }
        })
    },
    //搜索按钮
    searchProduct: function() {
        $('.mui-btn-primary').on('click', function() {
            var search = $('.search-input input').val();
            console.log(search);
            if (!search) {
                alert('请输入关键字')
                return;
            }
            letao.getProductlist({
                proName: search,
                page: 1,
                pageSize: 2
            }, function(data) {
                console.log(data);
                var html = template('productlistTmp', data)
                setTimeout(function() {
                    $('.producst-list-body .mui-row').html(html);
                }, 1000)
            })
        })
    },
    sortProduct: function() {
        $('.product-list-title>div>div>a').on('tap', function() {

        })
    }

}