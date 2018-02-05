window.addEventListener('load', function() {
    var letao = new Letao();
    letao.addHistory();
    letao.queryHistory();
    letao.deleteHistory();
    letao.clearHistory();
});
var Letao = function() {

}
Letao.prototype = {
    addHistory: function() {
        var that = this;
        $('.btn-search').on('click', function() {
            var search = $('.search-input input').val();
            var historyData = JSON.parse(localStorage.getItem('historyData') || '[]');
            if (!search) {
                alert("请输入要搜索的商品");
                return;
            } else {
                var id = 0;
                if (historyData.length == 0) {
                    id = 1
                } else {
                    id = historyData[historyData.length - 1].id + 1;
                }
                var obj = { id: id, 'search': search }
                historyData.push(obj);
                localStorage.setItem('historyData', JSON.stringify(historyData))
                that.queryHistory();
            }
            window.location = 'productlist.html?search=' + search;
        })

    },
    queryHistory: function() {
        var historyData = JSON.parse(localStorage.getItem('historyData') || '[]')
        historyData = historyData.reverse();
        var html = template('historyListTmp', { 'rows': historyData })
            // console.log(html)
        $('.search-history-body').html(html);
    },
    deleteHistory: function() {
        var that = this;
        $('.search-history-body').on('click', '.fa-close', function() {
            var id = $(this).parent().data('id');
            var historyData = JSON.parse(localStorage.getItem('historyData') || '[]')
            for (var i = 0; i < historyData.length; i++) {
                if (historyData[i].id == id) {
                    historyData.splice(i, 1);
                }
            }
            localStorage.setItem('historyData', JSON.stringify(historyData))
            that.queryHistory();
        })
    },
    clearHistory: function() {
        console.log(this);
        var that = this;
        $('.clear-history').on('click', function() {
            localStorage.removeItem('historyData');
            that.queryHistory();
        })

    }
}