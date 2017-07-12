; (function ($) {
    $.fn.extend({
        "Tjj": function (ldDiv, Obj) {
            //鼠标滑过
            $(ldDiv).live("mouseover", function () {
                //console.log($(this).attr("name") + ', mouseover first');
                //隐藏
                $(".tccTx").hide();
                //默认不显示
                xsimg = false;
                //上下文
                var _this = $(this);
                var objTop = Obj ? Obj.Top : 0;
                var top = _this.offset().top - 30 - objTop;
                var left = _this.offset().left;
                var uid = _this.attr("id");
                var texts = _this.attr("name") || _this.attr("title");
                var widthType = Obj ? Obj.widthType : true;
                addimg(top, left, texts, _this.width(), false, widthType);
            });
            //鼠标离开
            $(ldDiv).live("mouseout", function () {
                //console.log($(this).attr("name") + ', mouseout first');
                xsimg = true;
                var ks = setTimeout("imggb()", 100);
            });
            //鼠标滑过
            //$(ldDiv).live("mouseover", function () {
            //    console.log($(this).attr("name") + ', mouseover second');
            //    xsimg = false;
            //});
            //未知
            //$(ldDiv).live("mouseout", function () {
            //    console.log($(this).attr("name") + ', mouseout second');
            //    xsimg = true;
            //    var ks = setTimeout("imggb()", 100);
            //});
            //鼠标按下
            $(ldDiv).live("mousedown", function () {
                //console.log($(this).attr("name") + ', mousedown first');
                xsimg = true;
                var ks = setTimeout("imggb()", 100);
            });
        }
    });
})(jQuery);

/*  */
function addimg(top, left, texts, this_w, max_w, widthType) {

    if (!max_w) { max_w = 80 };
    var imgcom = $('.Tjj');
    //alert(imgcom.length)
    var tw = texts.length * 14;

    if (widthType) { (tw > max_w) ? tw = max_w : tw = 50; }
    var tw2 = tw / 2;
    (tw2 < 19) ? 19 : tw2;

    if (imgcom.length == 0) {
        var tcon = $('<div class="Tjj" style="width:' + tw + 'px;">' +
						 '<span>' + texts + '</span>' +
						 '<div class="tj"></div>' +
					'</div>');
        $("body").append(tcon);
        var obj_h = tcon.height() - 15;
        $('.Tjj').css({ "top": top - obj_h + "px", "left": (left - tw2 + this_w / 2 - 5) + "px" });
        $('.tj').css({ "top": obj_h + 24 + "px", "left": tw2 + "px" });
    } else {
        imgcom.find("span").text(texts);
        var imgcom = $('.Tjj');
        imgcom.css({ "width": tw + "px", "left": (left - tw2 + this_w / 2 - 5) + "px" });
        var obj_h = imgcom.height() - 15;
        imgcom.css({ "top": top - obj_h + "px" });
        imgcom.find('.tj').css({ "top": obj_h + 24 + "px", "left": tw2 + "px" });
        imgcom.show();
    }
}

/*  */
function imggb() {
    if (xsimg) {
        $(".Tjj").hide();
    }
}