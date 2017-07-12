
//输入框默认文字处理
function inputVal(id, style) {

    //Modernizr 插件判断浏览器兼容状况
    if (!Modernizr.input.placeholder) {

        $(id).each(function (index, element) {
            var _this = $(this);
            var ysval = _this.attr('placeholder');
            if (ysval == "") return;
            var type = _this.attr('type');

            //处理password
            if (type == "password") {
                if (!style) { style = {} }
                if (!style.size) { style.size = 12 };
                if (!style.px) { style.px = 0 };
                if (!style.py) { style.py = 0 };
                var x = _this.offset().left + style.px;
                var y = _this.offset().top + style.py + 1;
                var con = $('<span style="position:absolute; font-size:' + style.size + 'px; top:' + y + 'px; left:' + x + 'px;">' + ysval + '</span>');
                $('body').append(con);
                _this.focus(function () {
                    con.hide();
                }).blur(function () {
                    if ($(this).val() == '') { con.show(); }
                });

            } else {

                $(this).val(ysval);
                $(this).focus(function () {
                    if ($(this).val() == ysval) {
                        $(this).val("");
                    }
                }).blur(function () {
                    if ($(this).val() == '') {
                        $(this).val(ysval);
                    }
                });
            }
        });
    }

}

