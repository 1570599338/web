var inputblur = false;

function fallback() {
    //绑定keydown事件
    $(document).keydown(function (event) {
        // var elem = event.relatedTarget || event.srcElement || event.target ||event.currentTarget;
        // if(event.keyCode==8){
        //     if(($('.zon-edit').length == 0 || inputblur==true) && $(elem).hasClass('add-edit')){
        //       fallbacklayer();
        //       event.preventDefault();
        //       var elem = event.srcElement || event.currentTarget;   
        //       var name = elem.nodeName;
        //       if(name!='INPUT' && name!='TEXTAREA'){  
        //           return _stopIt(event);
        //       }
        //       var type_e = elem.type.toUpperCase();
        //       if(name=='INPUT' && (type_e!='TEXT' && type_e!='TEXTAREA' && type_e!='PASSWORD' && type_e!='FILE')){
        //           return _stopIt(event);  
        //       }
        //       if(name=='INPUT' && (elem.readOnly==true || elem.disabled ==true)){  
        //           return _stopIt(event);  
        //       }
        //     }
        // }
    });
    //
    function _stopIt(e) {
        if (e.returnValue) {
            e.returnValue = false;
        }
        if (e.preventDefault) {
            e.preventDefault();
        }
        return false;
    }
    //
    function fallbacklayer() {
        //移除fallback-layer
        $('.fallback-layer').remove();
        //插入提示
        var str =
            '<div class="fallback-layer">' +
            '<div class="fallback">' +
            '<h3>离开确认 </h3>' +
            '<i id="fallback_close"></i>' +
            '<p>你编辑的内容尚未保存，确定离开此页吗？</p>' +
            '<div class="btn">' +
            '<a href="/list/" class="sure_btn" style="background-color: #ccc;">确定</a>' +
            '<a id="fallback_closeT"  style="background-color: #53a4f4;">取消</a>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('body').append(str);
        //绑定关闭按钮单击事件
        $('#fallback_close, #fallback_closeT').die().live('click', function () {
            //移除fallback-layer
            $('.fallback-layer').remove();
        });
    }
}

//
function save_cq() {
    $('.btn .save_zt, .btn .ceng').fadeIn(200);
    setTimeout(function () {
        $('.btn .save_zt, .btn .ceng').fadeOut(200, function () {
            $('.btn .save_zt,.btn .ceng').remove();
        });
    }, 1500);
}

//
function click_cq() {
    //判断点击对象  
    var _idThis = $('.right-operate').attr('oid');
    setTimeout(function () {
        var _class = $('#question_box').attr('_class');
        var _name = $('#question_box').attr('_name');
        var _idUl = $('#question_box').attr('_id');
        var _html = $('#question_box').attr('_html');
        if (_idUl) {
            if (_html) {
                $('#' + _idUl).html(_html);
            }
            //单选下拉式菜单焦点
            if ($('#' + _idUl).parents('ul').hasClass('xllist')) {
                $('#' + _idUl).parents('ul').prev('.drop-zon').find('.bj-drop').click();
                $('#' + _idUl).click();
            } else if ($('#' + _idUl).hasClass('option-Fill')) {
                $('#' + _idUl).find('input,textarea').focus();
            } else {
                $('#' + _idUl).click();
            }
            /*else if($('#'+_idUl).find('#'+_idUl)){
             //$('#'+_idUl).find('#'+_idUl).click();
             }*/
        } else {
            if (_html) {
                $('#question_box li[oid=' + _idThis + '] div[name=' + _name + ']').html(_html);
            }
            //title
            $('#question_box li[oid=' + _idThis + '] div[name=' + _name + ']').click();
        }
    }, 200);
}

//右侧悬浮滚动
function moveTop(obj) {
    var offTop = $(obj).offset().top; //点击当前对象距文档高度
    var scrTop = $(window).scrollTop(); //滚动条距屏幕顶部高度
    var winHeight = $(window).outerHeight(); //窗口高度
    var cliTop = offTop - scrTop; //需移动距离
    var xfHeight = $('.right-operate').outerHeight(); //右侧弹出框自身高度，包括margin
    var top = 0,
        chaH = 0,
        _topCha = 0;
    console.log(scrTop)
    console.log(offTop);
    //右侧弹出框左边的小三角位置设置
    if (offTop > (winHeight + scrTop)) {
        $('.jt').css({
            'top': offTop - 48
        });
    } else {
        $('.jt').css({
            'top': offTop - 57
        });
    }
    /*if (offTop > (winHeight + scrTop)) {
     $('.jt').css({
     'top': offTop
     });
     } else {
     $('.jt').css({
     'top': offTop-66
     });
     }*/
    /*if(!$('.right-operate').hasClass('show')){
     $('.right-operate').css('top', offTop).stop(true, true).animate({
     'right': 0
     }, 300, function () { $('.jt').fadeIn(100); }).addClass('show');
     }*/
    //悬浮窗是否显示
    if (!$('.right-operate').hasClass('show')) {
        if (cliTop < (winHeight / 3)) {
            //document.title = '上部分' ;
            top = scrTop - 123;
            if (cliTop + 50 > xfHeight) {
                $('.right-operate').css('top', offTop - 123).stop(true, true).animate({
                    'right': 21
                }, 300, function () {
                    $('.jt').fadeIn(100);
                });
            } else {
                if (top > 0) {
                    $('.right-operate').css('top', top).stop(true, true).animate({
                        'right': 21
                    }, 300, function () {
                        $('.jt').fadeIn(100);
                    });
                } else {
                    $('.right-operate').css('top', 0).stop(true, true).animate({
                        'right': 21
                    }, 300, function () {
                        $('.jt').fadeIn(100);
                    });
                }
            }
        } else if (cliTop > (winHeight / 3) && cliTop < ((winHeight / 3) * 2)) {
            //document.title = '中部分' ;
            chaH = winHeight - xfHeight;
            top = scrTop - 123;
            _topCha = winHeight - cliTop;
            //点击位置距离底部的距离是否大于悬浮高度
            if (_topCha > xfHeight) {
                $('.right-operate').css('top', offTop - 123).stop(true, true).animate({
                    'right': 21
                }, 300);
                $('.jt').fadeIn(10);
            } else {
                //window高度是否大于悬浮窗高度
                if (chaH > 0) {
                    $('.right-operate').css('top', top + chaH).stop(true, true).animate({
                        'right': 21
                    }, 300, function () {
                        $('.jt').fadeIn(100);
                    });
                } else {
                    $('.right-operate').css('top', top).stop(true, true).animate({
                        'right': 21
                    }, 300, function () {
                        $('.jt').fadeIn(100);
                    });
                }
            }
        } else {
            //document.title = '下部分' ;
            chaH = winHeight - xfHeight;
            top = scrTop - 123;
            _topCha = winHeight - cliTop;
            //点击位置距离底部的距离是否大于悬浮高度
            if (_topCha + 50 > xfHeight) {
                $('.right-operate').css('top', offTop - 123).stop(true, true).animate({
                    'right': 21
                }, 300, function () {
                    $('.jt').fadeIn(100);
                });
            } else {
                //window高度是否大于悬浮窗高度
                if (chaH > 0) {
                    $('.right-operate').css('top', top + chaH).stop(true, true).animate({
                        'right': 21
                    }, 300, function () {
                        $('.jt').fadeIn(100);
                    });
                } else {
                    $('.right-operate').css('top', top).stop(true, true).animate({
                        'right': 21
                    }, 300, function () {
                        $('.jt').fadeIn(100);
                    });
                }
            }
        }
        $('.right-operate').addClass('show');
    } else {
        if (cliTop < (winHeight / 3)) {
            //document.title = '上部分' ;

            top = scrTop - 123;
            if (cliTop + 50 > xfHeight) {
                $('.right-operate').stop(true, true).animate({
                    'top': offTop - 123
                }, 300);
            } else {
                if (top > 0) {
                    $('.right-operate').stop(true, true).animate({
                        'top': top
                    }, 300);
                } else {
                    $('.right-operate').stop(true, true).animate({
                        'top': 0
                    });
                }
            }
            $('.jt').fadeIn(10);
        } else if (cliTop > (winHeight / 3) && cliTop < ((winHeight / 3) * 2)) {
            //document.title = '中部分' ;
            chaH = winHeight - xfHeight;
            top = scrTop - 123;
            _topCha = winHeight - cliTop;
            //点击位置距离底部的距离是否大于悬浮高度
            if (_topCha > xfHeight) {
                $('.right-operate').stop(true, true).animate({
                    'top': offTop - 123
                }, 300, function () {
                    $('.jt').fadeIn(100);
                });
            } else {
                //window高度是否大于悬浮窗高度
                if (chaH > 0) {
                    $('.right-operate').stop(true, true).animate({
                        'top': top + chaH
                    }, 300, function () {
                        $('.jt').fadeIn(100);
                    });
                } else {
                    $('.right-operate').stop(true, true).animate({
                        'top': top
                    }, 300, function () {
                        $('.jt').fadeIn(100);
                    });
                }
            }
        } else {
            //document.title = '下部分' ;
            chaH = winHeight - xfHeight;
            top = scrTop - 123;
            var _topCha = winHeight - cliTop;
            //点击位置距离底部的距离是否大于悬浮高度
            if (_topCha + 50 > xfHeight) {
                $('.right-operate').stop(true, true).animate({
                    'top': offTop - 123
                }, 300, function () {
                    $('.jt').fadeIn(100);
                });
            } else {
                //window高度是否大于悬浮窗高度
                if (chaH > 0) {
                    $('.right-operate').stop(true, true).animate({
                        'top': top + chaH
                    }, 300, function () {
                        $('.jt').fadeIn(100);
                    });
                } else {
                    $('.right-operate').stop(true, true).animate({
                        'top': top
                    }, 300, function () {
                        $('.jt').fadeIn(100);
                    });
                }
            }
        }
    }
}

//关闭
function moveLeft() {
    $('.jt').fadeOut(100); // todo
    var rightOperate = $('.right-operate');
    rightOperate.animate({
        'right': "309"
    }, 350, function () {
        /*$('.right-operate').css('top', 0);*/
        //$(".right-operate .panel-box").html('');
        $('#question_box').attr('_class', '');
        $('#question_box').attr('_name', '');
        $('#question_box').attr('_id', '');
    }).removeClass('show');
}
//预览
function previewq(that,index){
    var templateId = getParameterByName('templateid', window.parent.location.href);
    var projectname = getParameterByName('projectname', window.parent.location.href);
    $(that).attr('href','preview.html?templateid='+templateId+'&projectname='+projectname+'&dispIndex='+(index-1));
}

//显示宽度判断
function changeWid() {
    var winW = $(window).outerWidth();
    var winH = $(window).outerHeight();
    /*if (winW >= 1440) {
        $('#css_url').attr('href', '/static/css/edit_cq_v2.css');
    } else if (winW < 1440) {
        $('#css_url').attr('href', '/static/css/edit_cq.css');
    }*/
    $('.cq-content,.rows2').css("min-height", winH - 123);

}

//end
$(window).resize(function () {
    changeWid();
});
//
$(function () {
    //题目类型变化
    $('.right-operate').delegate('.sel-cq', 'click', function () {
        if ($('.cq-dx').hasClass('active')) {
            loadMack({
                off: 'on',
                Limg: 0,
                text: '本题题型为多选，选项布局不能改为下拉菜单',
                set: 2800
            });
            $(this).parents('dl').find('.vertical').click();
        }
    });
    //题目类型变化
    $('.right-operate').delegate('.cq-dx', 'click', function () {
        if ($('.sel-cq').hasClass('active')) {
            loadMack({
                off: 'on',
                Limg: 0,
                text: '本题选项布局为下拉式菜单，题型不能改为多选',
                set: 2800
            });
            $(this).prev().click();
        }
    });
    //js响应式
    changeWid();
    //统一hover样式
    var txt = "",
        left = 0,
        top = 0,
        now = 0;
    //题目左边浮动菜单
    function pophover_left(e, obj) {
        //移除已有的pophover
        $("#pophover").remove();
        //计算位置父元素的位置
        left = $(obj).parent('.setup-group').offset().left;
        top = $(obj).parent('.setup-group').offset().top;
        //获取当前按钮在父元素中的位置
        now = $(obj).index();
        //构建pophover
        if ($(obj).hasClass('cq_fgx')) {
            var pophover = '<div id="pophover" style="display:none;position:absolute;left:-15px;top: 23px;width:85px;z-index:1000"><span style="background-color:#454545;font-size:14px; padding:5px 0px; border-radius:5px; color:#fff;opacity:0.9;display:block;text-align:center">删除分割线</span></div>';
        } else {
            var pophover = '<div id="pophover" style="display:none;position:absolute;left:-15px;top: 23px;width:70px;z-index:1000"><span style="background-color:#454545;font-size:14px; padding:5px 0px; border-radius:5px; color:#fff;opacity:0.9;display:block;text-align:center">' + txt + '</span></div>';
        }
        //添加pophover到body中
        $('body').append(pophover);
        //定位pophover
        $("#pophover").css({
            "top": top + (now * 30),
            "left": left + 40
        });
        //显示pophover
        $("#pophover").show();
    }
    //题目下面浮动菜单
    function pophover_hor(obj) {
        //移除已有的pophover
        $("#pophover").remove();
        //计算位置父元素的位置
        left = $(obj).parent('.operation-hor').offset().left;
        top = $(obj).parent('.operation-hor').offset().top;
        //获取当前按钮在父元素中的位置
        now = $(obj).index();
        //构建pophover
        var pophover = '<div id="pophover" style="display:none;position:absolute;left:-15px;top: 23px;width:70px;z-index:1000"><span style="background-color:#454545;font-size:14px; padding:5px 0px; border-radius:5px; color:#fff;opacity:0.9;display:block;text-align:center">' + txt + '</span></div>';
        //添加pophover到body中
        $('body').append(pophover);
        //定位pophover
        $("#pophover").css({
            "top": top + 25,
            "left": left + (now * 28) - 20
        });
        //显示pophover
        $("#pophover").show();
    }
    //题目右边浮动菜单
    function pophover_cq3(obj) {
        //移除已有的pophover
        $("#pophover").remove();
        //计算位置父元素的位置
        left = $(obj).parent('.operation-ver').offset().left;
        top = $(obj).parent('.operation-ver').offset().top;
        //获取当前按钮在父元素中的位置
        now = $(obj).index();
        //构建pophover
        var pophover = '<div id="pophover" style="display:none;position:absolute;left:-15px;top: 23px;width:70px;z-index:1000"><span style="background-color:#454545;font-size:14px; padding:5px 0px; border-radius:5px; color:#fff;opacity:0.9;display:block;text-align:center">' + txt + '</span></div>';
        //添加pophover到body中
        $('body').append(pophover);
        //定位pophover
        $("#pophover").css({
            "top": top + (now * 27) - 6,
            "left": left + 25
        });
        //显示pophover
        $("#pophover").show();
    }
    //
    function pophover_move(obj) {
        //移除已有的pophover
        $("#pophover").remove();
        //构建pophover
        var pophover = '<div id="pophover" style="display:none;position:absolute;left:50%;top: 45px;z-index:1000"><span style="background-color:#454545;font-size:14px;padding:5px 10px; border-radius:5px; color:#fff;opacity:0.9;display:block;text-align:center">' + txt + '</span></div>';
        //添加pophover到body中
        $('body').append(pophover);
        //跟随鼠标移动pophover
        $(obj).live("mousemove", function (e) {
            //计算位置父元素的位置
            left = e.clientX;
            top = e.clientY + $(window).scrollTop();
            //定位pophover
            if ($(obj).hasClass('q-title') || $(obj).parents('.module').hasClass('paging') || $(obj).parents('.module').hasClass('split-line')) {
                $("#pophover").css({
                    "left": left + 10,
                    'top': top + 8
                });
            } else {
                $("#pophover").css({
                    "left": left + 16,
                    'top': top + 20
                });
            }
        });
        //显示pophover
        $("#pophover").show();
    }
    //当点击左边菜单或者左边的工具箱的时候移除pophover
    $(".setup-group a, .rows1 ul li").live('click', function () {
        $("#pophover").remove();
    });
    //上移本题
    $(".setup-group a.up").live('mouseenter', function (e) {
        txt = "上移本题";
        pophover_left(e, this);
    });
    //下移本题
    $(".setup-group a.down").live('mouseenter', function (e) {
        txt = "下移本题";
        pophover_left(e, this);
    });
    //复制题目
    $(".setup-group a.bulk").live('mouseenter', function (e) {
        txt = "复制题目";
        pophover_left(e, this);
    });
    //删除题目
    $(".setup-group a.del").live('mouseenter', function (e) {
        txt = "删除题目";
        pophover_left(e, this);
    });
    //删除分组
    $(".paging .setup-group a.del").live('mouseenter', function (e) {
        txt = "删除分组";
        pophover_left(e, this);
    });
    //添加选项
    $('.operation-hor .add').live('mouseenter', function (e) {
        $(this).show();
        txt = "添加选项";
        pophover_hor(this);
    });
    //批量编辑
    $('.operation-hor .bulk').live('mouseenter', function (e) {
        $(this).show();
        txt = "批量编辑";
        pophover_hor(this);
    });
    //添加选项-矩阵列
    $('.operation-ver .add').live('mouseenter', function (e) {
        $(this).show();
        txt = "添加选项";
        pophover_cq3(this);
    });
    //批量编辑-矩阵列
    $('.operation-ver .bulk').live('mouseenter', function (e) {
        $(this).show();
        txt = "批量编辑";
        pophover_cq3(this);
    });
    //题目排序
    $(".module .q-title").live('mouseenter', function (e) {
        txt = "按住拖动题目排序";
        pophover_move(this);
    });
    //上移本题
    $(".cq_lj_ts").live('mouseenter', function (e) {
        $("#pophover").remove();
        txt = "逻辑设置";
        left = $(this).offset().left;
        top = $(this).offset().top;
        now = $(this).index();
        var pophover = '<div id="pophover" style="display:none;position:absolute;left:-15px;top: 23px;width:70px;z-index:1000"><span style="background-color:#454545;font-size:14px; padding:5px 0px; border-radius:5px; color:#fff;opacity:0.9;display:block;text-align:center">' + txt + '</span></div>';
        $('body').append(pophover);
        $("#pophover").css({
            "top": top - 5,
            "left": left + 42
        });
        $("#pophover").show();
    });
    //未知
    $(".Lock_ico").live('mouseenter', function (e) {
        $("#pophover").remove();
        $(this).attr('title', '');
        txt = "本题仅表单制作者可见,对普通填写者不显示";
        var pophover = '<div id="pophover" style="display:none;position:absolute;left:50%;top: 45px;z-index:1000"><span style="background-color:#454545;font-size:14px;padding:5px 10px; border-radius:5px; color:#fff;opacity:0.9;display:block;text-align:left; width:270px;">' + txt + '</span></div>';
        $('body').append(pophover);
        $(this).live("mousemove", function (e) {
            left = e.clientX;
            top = e.clientY + $(window).scrollTop();
            if ($(window).outerWidth() < $(this).offset().left + 270) {
                $("#pophover").css({
                    "left": left - 270,
                    'top': top + 15
                });
            } else {
                $("#pophover").css({
                    "left": left + 15,
                    'top': top + 15
                });
            }
        });
        $("#pophover").show();
    });
    //未知
    $(".cq-ts-wh").live('mouseenter', function (e) {
        $("#pophover").remove();
        $(this).attr('title', '');
        txt = "唯一性检查，填写内容不能与已提交的内容重复";
        var pophover = '<div id="pophover" style="display:none;position:absolute;left:50%;top: 45px;z-index:1000"><span style="background-color:#454545;font-size:14px;padding:5px 10px; border-radius:5px; color:#fff;opacity:0.9;display:block;text-align:left; width:296px;">' + txt + '</span></div>';
        $('body').append(pophover);
        $(this).live("mousemove", function (e) {
            left = e.clientX;
            top = e.clientY + $(window).scrollTop();
            if ($(window).outerWidth() < $(this).offset().left + 320) {
                $("#pophover").css({
                    "left": left - 320,
                    'top': top + 15
                });
            } else {
                $("#pophover").css({
                    "left": left + 15,
                    'top': top + 15
                });
            }
        });
        $("#pophover").show();
    });
    //
    $("#question_box .paging .topic-type-con, .split-line .topic-type-con").live('mouseenter', function (e) {
        txt = "按住拖动排序";
        pophover_move(this);
    });
    /*$(".uploader").live('mouseenter',function(e){ 
     txt="添加图片";
     pophover_cq4(this);
     }); */
    $('.setup-group a,.module .q-title,.cq_lj_ts,.operation-hor a,.Lock_ico,.cq-ts-wh,.operation-ver a,.paging .topic-type-con,.split-line .topic-type-con').live('mouseleave', function () {
        $("#pophover").remove();
    });
    //focus
    $('.cq-content .right-operate input[type="text"]').live('focus', function () {
        $(this).css('border', '1px solid #53a4f4');
    });
    //
    $('.right-operate input[type="text"]').live('blur', function () {
        $(this).css('border', '1px solid #e2e2e2');
    });
    //click 
    $('.T-edit, .T-edit-min, .T-edit-td, .option-Fill input, .option-Fill textarea').live('click', function (e) {
        //$('.btn .ceng,.save_zt').remove(); 
        $('#question_box').attr('_html', '');
        //隐藏三角
        $('.jt').hide();
        //var _class = $(this).attr('class');
        //var _name = $(this).attr('name');
        //var _id;
        //if ($(this).parent().hasClass('option-Fill')) {
        //    _id = $(this).parents('.option-Fill').attr('id');
        //} else {
        //    _id = $(this).attr('id');
        //}
        //$(this).parents('#question_box').attr('_class', _class);
        //$(this).parents('#question_box').attr('_name', _name);
        //if (_id) {
        //    $(this).parents('#question_box').attr('_id', _id);
        //} else {
        //    $(this).parents('#question_box').attr('_id', '');
        //}
        //显示右面板
        $('.right-operate').show();
        //var _index = $(this).parents('.module').index();
        if ($(this).hasClass('welcome') || $(this).hasClass('closing') || $(this).hasClass('paging') || $(this).hasClass('guide')) {
            moveLeft();
        } else {
            //指代
            var _this = this;
            //点击题目右侧悬浮跳动 
            setTimeout(function () {
                //if ($('.right-operate dl.way dd').length > 0) {
                //    $('.right-operate dl.way').show();
                //}
                //if ($('.way dd .column').hasClass('active')) {
                //    $('#disp_type_column').show();
                //}
                if (!initRightOperate()) {
                    moveTop(_this);
                } else {
                    moveLeft();
                }
            }, 300);
        }
        //未知
        e.stopPropagation();
    });
    //冒泡
    $(document).click(function () {
        moveLeft();
        $('.operation-hor .Bub,.operation-ver .Bub,.BubR').attr('title', '');
    });
    //
    $(document).mouseup(function () {
        $('.pophover').remove();
    });
    //阻止冒泡 
    $('.jsbox, .jsBubble_s, .jsboxContent, #maptss, #lightBox, .bj-drop').live('click', function (e) {
        e.stopPropagation();
    });
    //
    $('.add-edit').live('focus', function () {
        inputblur = false;
    });
    //
    $('.right-operate').click(function (e) {
        inputblur = true;
        e.stopPropagation();
    });
    //
    $('.jsbox-close').live('click', function (e) {
        $('.btn .ceng,.save_zt').remove();
        click_cq();
        e.stopPropagation();
    });
    //动态更新位置
    $('.right-operate').delegate('ul li', 'click', function () {
        setTimeout(function () {
            var hei_xf = $('.right-operate').outerHeight();
            var top_xf = $('.right-operate').offset().top;
            var hei_do = $(document).height();
            if ((top_xf + hei_xf) > hei_do) {
                $('.right-operate').animate({
                    'top': hei_do - hei_xf - 132
                }, 300);
            }
        }, 100);
    });
    //更新题号
    function updateNumber() {
        var panel = $('.right-operate');
        var type = panel.attr('type');
        if (type == 'question') {
            var oid = panel.attr('oid');
            var question = panel.data('model');
            var module = $('.module[oid=' + oid + ']');
            var temp = $('.topic-type-menu h4:first', module);
            if (temp.text() != question.number)
                temp.text(question.number);
        }
    }
    //右面板保存按钮事件
    $('.right-operate .btn .save').click(function () {
        if ($('.btn .save_zt').length == 0) {
            $('.btn').append('<p class="save_zt">已保存</p><p class="ceng">保存</p>');
        }
        $('.save-prompt').hide();
        if (validate()) {
            saveForm();
            updateNumber();
        } else {
            return false;
        }
        //click_cq();
    });
    //右面板关闭按钮事件
    $('.right-operate .close').click(function () {
        //隐藏右面板
        moveLeft();
        //隐藏
        $('.save-prompt').hide();
        //移除编辑框
        $('.zon-edit').remove();
    });
    //题目面板
    $('.module').live('mouseup', function () {
        $('.pophover').remove();
    });
    //题目面
    $('.module').live('mouseenter', function () {
        $('.pophover').remove();
    });
    //可编辑区域keyup事件 - 
    //$('body').delegate('.add-edit', 'keyup', function () {
    //    //获取可编辑区域内容
    //    var _html = $(this).html();
    //    //附加可编辑区域
    //    $('#question_box').attr('_html', _html);
    //});
    /*$('#cq_content').scroll(function (e) {
     moveLeft();
     $('.add-edit').hide();
     e.stopPropagation();
     });*/
});