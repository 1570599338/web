//题型设计模块

/*
    拖动布局
*/

function TempalteDesign(obj) {
    this.obj = obj; //保存推拽对象和推拽区域的class
    this.index = -1; //新增题目的位置
    this.index_in_group = 0; //新增题目在分组内的相对位置
    this.group_count = 0 //分组数，在计算题目插入位置时使用
    this.group_index = 0 //新增题目所在分组的位置，在计算题目插入位置时使用
    this.html = null; //创建后的题型对象
}

TempalteDesign.prototype = {
    //拖动操作
    drag: function () {
        //缓存TempalteDesign
        var this_ = this;

        //未知
        $('.matrix').scroll(function () {
            return false;
        });

        //未知
        var x2 = $(window).width();
        var y2 = $(window).height();

        //题型拖动添加，初始化拖动插件
        $(this_.obj.dragObj).draggable({
            //Allows the draggable to be dropped onto the specified sortables.
            connectToSortable: ".dragwen",
            //if connectToSortable is used, then helper option must be set to "clone"
            helper: "clone",
            //Which element the draggable helper should be appended to while dragging.
            appendTo: 'body',
            //Triggered when dragging starts.
            start: function (event, ui) {
                //删除文字编辑框
                $('.zon-edit').remove();
                //题目类型
                var type = ui.helper.attr('type');
                //初始化对象
                var question = copy_obj(OBJECT_MAP[type]);
                question.templateID = myapp.template.id;
                //获取model
                var model = ModelFactory.getModel(question, myapp.resHost);
                //生成html
                var html = model.genEditTemplate();
                //替换helper为题型模板
                ui.helper.html('').css({
                    'height': 'auto'
                }).addClass('anbx').append(html);
            },
            //If set to "invalid", revert will only occur if the draggable has not been dropped on a droppable
            revert: "invalid"
        });

        //题型点击添加
        $(this_.obj.dragObj).click(function () {
            //题目类型
            var type = $(this).attr('type');
            var bintype = $(this).attr('bintype');
            var count = $('.question', this_.obj.dropArea).length;
            //计算位置
            this_.clickDraggable();
            //初始化对象
            var question = OBJECT_MAP[bintype] || OBJECT_MAP[type];
            question.templateID = myapp.template.id;
            question.number = 'Q' + (count + 1);
            question.dispIndex = count + 1;
            //保存题目对象
            createQuestion(question, function (data) {
                //获取model
                var model = ModelFactory.getModel(data, myapp.resHost);
                //生成html
                var html = model.genEditTemplate();
                //添加题目到最后
                this_.html = $(html).appendTo(this_.obj.dropArea);
                //获取module
                var module = $(".question:last", this_.obj.dropArea);
                //附加数据
                attachData(module, model.question);
                //更新题目编号和分组编号
                //updateSequence();
                //图片题型需要创建dmUploader
                if (type == QUESTION_TYPE_IMAGE_SINGLE || type == QUESTION_TYPE_IMAGE_MULTIPLE) {
                    imageOption.createUploader(module);
                }
                //动画效果
                $("html, body").animate({
                    scrollTop: $("body").height() - 50
                }, 'slow');
                //进入题目编辑状态
                //setTimeout(function () {
                //    this_.html.find('.T-edit').click();
                //    this_.html = null;
                //}, 500);
            });
        });

        //处理拖动时弹出框不消失
        $(this_.obj.dragObj).mousedown(function () {
            $('.jsBubble_s').remove();
        });

        //处理拖动时弹出框不消失
        $('.module').live('mousedown', function () {
            $('.jsBubble_s').remove();
        });

        //题目排序，初始化排序插件
        $(this_.obj.dropArea).sortable({
            //containment:".dragwen",
            //axis:'y',
            snap: true,
            //Adding a delay helps preventing unwanted drags when clicking on an element.
            delay: 200,
            opacity: 0.9,
            //Defines how near the mouse must be to an edge to start scrolling.
            scrollSensitivity: 160,
            //Specifies which mode to use for testing whether the item being moved is hovering over another item. 
            tolerance: 'pointer',
            //Restricts sort start click to the specified element.
            handle: '.drag-area',
            //Whether the sortable items should revert to their new positions using a smooth animation.
            revert: true,
            //This event is triggered when sorting starts.
            start: function (event, ui) {
                //删除文字编辑框
                $('.zon-edit').remove();
                //关闭判断题目选项是否显示
                ptvt_Switch = false;
            },
            //This event is triggered during sorting.
            sort: function (event, ui) {
                //var m = $(''+this_.obj.dropArea+' > li').index(ui.placeholder);
                //alert(m);
                //$('.h4st1').text(m);
            },
            //This event is triggered when an item from a connected sortable list has been dropped into another list.
            receive: function (event, ui) {
                var _this = $(this_.obj.dropArea);
                this_.moveDraggable();
            },
            //This event is triggered when sorting has stopped.
            stop: function (event, ui) {
                //开启判断题目选项是否显示
                ptvt_Switch = true;
                //拖动添加题目
                if (ui.item.hasClass('moduleL') == true) {
                    //获取上下文
                    var type = $(ui.item).attr('type');
                    var bintype = $(ui.item).attr('bintype');
                    var count = $('.question', this_.obj.dropArea).length;
                    //移除.moduleL
                    $(ui.item).remove();
                    //初始化对象
                    var question = OBJECT_MAP[bintype] || OBJECT_MAP[type];
                    question.templateID = myapp.template.id;
                    question.number = 'Q' + (count + 1);
                    question.dispIndex = count + 1;
                    //保存题目对象
                    createQuestion(question, function (data) {
                        //_this为.dragwen
                        var _this = $(this_.obj.dropArea);
                        //获取model
                        var model = ModelFactory.getModel(data, myapp.resHost);
                        //生成html
                        var html = model.genEditTemplate();
                        //在适当位置添加题目，获取module
                        var module = null, updateDispIndex = true;
                        if (this_.index == 0) { //插入位置为起始
                            this_.html = $(html).prependTo(_this);
                            module = $('.question:first', _this);
                        } else if (this_.index == count) { //插入位置为末尾
                            this_.html = $(html).appendTo(_this);
                            module = $('.question:last', _this);
                            updateDispIndex = false;
                        } else { //插入位置为this_.index
                            var marker = _this.find('.question:eq(' + this_.index + ')');
                            this_.html = $(html).insertBefore(marker);
                            module = $('.question:eq(' + this_.index + ')', _this);
                        }
                        //附加数据
                        attachData(module, model.question);
                        //插入在最后不需要更新DispIndex，其它情况下需要更新
                        if (updateDispIndex == true) {
                            //更新题目DispIndex
                            moveObjects(getDispIndex(), "question", null);
                        }
                        //更新题目编号和分组编号
                        //updateSequence();
                        //图片题型需要创建dmUploader
                        if (type == QUESTION_TYPE_IMAGE_SINGLE || type == QUESTION_TYPE_IMAGE_MULTIPLE) {
                            imageOption.createUploader(module);
                        }
                        //进入题目编辑状态
                        //setTimeout(function () {
                        //    this_.html.find('.T-edit').click();
                        //    this_.html = null;
                        //}, 500);
                    });
                }
                //移动题目
                else {
                    //更新题目DispIndex
                    moveObjects(getDispIndex(), "question", null);
                    //更新题目编号和分组编号
                    //updateSequence();
                }
            }
        });

        //单选下拉题（编辑选项）
        $('.bj-drop').live('click', function () {
            //隐藏.drop-zon
            $(this).parent().hide();
            //显示选项列表，显示菜单
            $(this).parents('.topic-type-con').find('.unstyled, .bj-drop-xl').show();
        });

        //单选下拉题（完成编辑）
        $('.bj-drop-achieve').live('click', function () {
            //向上找到
            var type_con = $(this).parents('.topic-type-con');
            //隐藏选项列表，隐藏菜单
            type_con.find('.unstyled,.bj-drop-xl').hide();
            //显示.drop-zon
            $('.drop-zon', type_con).show();
            //构造select的option列表
            var con = '';
            $('.unstyled li', type_con).each(function (index, element) {
                con += '<option>' + $(this).find('label').text() + '</option>';
            });
            //添加option列表
            $('.drop_down', type_con).html(con);
        });
    },
    //拖入增加题目，计算位置
    moveDraggable: function () {
        //初始化
        this.index = 0;
        this.index_in_group = 0;
        this.group_count = 0;
        this.group_index = 0;
        //缓存this
        var this_ = this;
        //遍历li，包括题目和分组
        $('' + this_.obj.dropArea + '> li').each(function (i, element) {
            //当前li是分组
            if ($(this).hasClass('paging')) {
                //分组数加1
                this_.group_count += 1;
                //当前分组的位置
                this_.group_index = i;
            }
            //当前拖动元素有ui-draggable，碰到当前拖动题目时遍历结束
            if ($(this).hasClass('ui-draggable')) {
                //当前拖动题目的位置
                this_.index = i;
                if (this_.group_count == 0) {
                    //当前拖动题目在第一分组，则当前题目在分组中的相对位置为题目的位置
                    this_.index_in_group = this_.index;
                } else {
                    //当前拖动题目不在在第一分组，则计算当前题目在分组中的相对位置
                    this_.index_in_group = this_.index - this_.group_index - 1;
                }
                //未知
                return false;
            }
        });
    },
    //点击增加题目，计算位置
    clickDraggable: function () {
        //初始化
        this.index = 0;
        this.group_index = 0;
        this.group_count = 0;
        this.index_in_group = 0;
        //缓存this
        var this_ = this;
        //题目和分组的数量
        var l = $('' + this_.obj.dropArea + '> li').length;
        //遍历li，包括题目和分组
        $('' + this_.obj.dropArea + '> li').each(function (i, element) {
            //当前li是分组
            if ($(this).hasClass('paging')) {
                //分组数加1
                this_.group_count += 1;
                //当前分组的位置
                this_.group_index = i;
            }
            //最后一个li，通过点击添加题目，将插入到最后
            if (i == l - 1) {
                //新增题目未知
                this_.index = i;
                //
                if (this_.group_count == 0) {
                    //新增题目在第一分组，则新增题目的位置为最后一个题目加1
                    this_.index_in_group = this_.index + 1;
                } else {
                    //新增题目不在第一分组，则计算新增题目的位置
                    this_.index_in_group = this_.index - this_.group_index;
                }
                //未知
                return false;
            }
        });
    },
    //判断最后一题有无分组
    siteLast: function () {
        //题目和分组数量
        var l = $('' + this.obj.dropArea + ' > li').length;
        //检查最后一个li是否是分组
        var last = $('' + this.obj.dropArea + ' > li:eq(' + (l - 1) + ')');
        //如果最后一个li是分组
        if (last.is('.paging')) {
            //$(this.obj.dropArea).sortable("cancel"); //返回到以前位置
            //移除最后一个li
            last.remove();
            //计算
            var ms = groupNumber(last);
            //删除分组
            delete_page(ms);
            //提示
            loadMack({
                off: 'on',
                Limg: 0,
                text: '两个分组之间必须有内容',
                set: 2500
            });
        }
    },
    //判断两个分组是否相邻
    siteAdjacent: function () {
        //缓存this
        var this_ = this;
        var ay = [];
        $('' + this_.obj.dropArea + '> li').each(function (i, element) {
            if ($(this).is('.paging')) {
                //
                var ms = $('' + this_.obj.dropArea + ' > li:eq(' + (i + 1) + ')');
                //
                if (ms.is('.paging')) {
                    ay.push(ms);
                }
            }
        });
        //
        if (ay.length > 0) {
            var m = groupNumber(ay[0]);
            ay[0].remove();
            delete_page(m);
            //提示
            loadMack({
                off: 'on',
                Limg: 0,
                text: '两个分组之间必须有内容',
                set: 2500
            });
        }
    },
    //更新状态汇总
    siteTotal: function () {
        //缓存this
        var this_ = this;
        //判断最后一题有无分组
        var lis = $('' + this.obj.dropArea + ' > li').length;
        var thisPaging = $('' + this.obj.dropArea + ' > li:eq(' + (lis - 1) + ')');
        var m = thisPaging.is('.paging');
        if (m) {
            var ms = groupNumber(thisPaging);
            thisPaging.remove();
            deleteGroup(ms);
        }
        //判断两个分组是否相邻
        var ay = [];
        $('' + this_.obj.dropArea + '> li').each(function (i, element) {
            if ($(this).is('.paging')) {
                //
                var ms = $('' + this_.obj.dropArea + ' > li:eq(' + (i + 1) + ')');
                //
                if (ms.is('.paging')) {
                    ay.push(ms);
                }
            }
        });
        if (ay.length > 0) {
            var mz = groupNumber(ay[0]);
            ay[0].remove();
            deleteGroup(mz);
            //for(var ii=0;ii<ay.length;ii++){
            //                ay[ii].remove();
            //          }
        }
        //更新题目编号和分组编号
        //this.updateSequence();
    }
}

/*
    题目操作
*/
function QuestionOperating() {
    //绑定事件
    this.events = function (textEdit) {
        //
        ptvt_switch = true;
        //缓存this
        var _this = this;
        //
        _this.textEdit = textEdit;

        //鼠标滑过题目时显示动态菜单，划出时隐藏动态菜单
        //.setup-group a - 上移、下移、复制、删除
        //.updown - 在paging中出现过，已弃用
        //.operation-hor a - 添加选项、批量编辑，行
        //.operation-ver a - 添加选项、批量编辑，列
        $('.dragwen .module').live("mouseover", function () {
            if (ptvt_switch) {
                $(this).find('.setup-group a, .updown, .operation-hor a, .operation-ver a').show();
            }
        }).live('mouseout', function () {
            _this.ptvt($(this));
        });

        //未知
        $('body').bind('mouseup', function () {
            $('.dragwen .module').removeData("blah"); //移除blah
        });

        //未知
        $('.jsTip-close').live('click', function () {
            $('.dragwen .module').removeData("blah"); //移除blah  
        });

        //题目向上移动
        $('.up-icon-active').live('click', function () {
            //向上找到元素li.module
            var module = $(this).parents('li');
            //判断要移动的题目是否是第一道题
            var m = $('.dragwen .module').index(module);
            //如果移动题目是第一道题，则提示
            if (m == 0) {
                loadMack({
                    off: 'on',
                    Limg: 0,
                    text: '已经是第一道题',
                    set: 800
                });
                return
            }
            //向上移动选中题目
            $('.dragwen .module:eq(' + (m - 1) + ')').before(module[0]);
            //调用API更新题目的显示顺序(DispIndex)
            moveObjects(getDispIndex(), "question", function (data) {
                //向上移动选中题目
                //$('.dragwen .module:eq(' + (m - 1) + ')').before(module[0]);
                // this_.siteLast();//判断最后一题有无分组
                // this_.siteAdjacent();//判断两个分组是否相邻
                //更新题目编号和分组编号
                //updateSequence();
                // 动画效果
                $("html, body").animate({
                    scrollTop: (module.offset().top - 100)
                }, 'slow');
            });
        });

        //题目向下移动
        $('.down-icon-active').live('click', function () {
            //向上找到元素li.module
            var module = $(this).parents('li');
            //判断要移动的题目是否是最后一道题
            var m = $('.dragwen > li').index(module);
            var l = $('.dragwen .module').length - 1;
            //如果移动题目是最后一道题，则提示
            if (m == l) {
                loadMack({
                    off: 'on',
                    Limg: 0,
                    text: '已经是最后一道题',
                    set: 800
                });
                return
            }
            //更新题目的显示顺序(DispIndex)
            moveObjects(getDispIndex(), "question", function (data) {
                //向下移动选中题目
                $('.dragwen .module:eq(' + (m + 1) + ')').after(module[0]);
                //this_.siteLast();//判断最后一题有无分组
                //this_.siteAdjacent();//判断两个分组是否相邻
                //更新题目编号和分组编号
                //updateSequence();
                // 动画效果
                if (module.offset().top !== 0) {
                    $("html, body").animate({
                        scrollTop: (module.offset().top - 100)
                    }, 'slow');
                }
            });
        });

        //题目复制
        $('.setup-group .bulk').live('click', function () {
            //向上找到li.module
            var module = $(this).parents('.question');
            //获取对象
            var question = module.data('model');
            var count = $('.dragwen .question').length;
            //更新对象
            question.options = [];
            $('.option', module).each(function (i, e) {
                var temp = $(this).data('model');
                temp.questionID = -1;
                question.options.push(temp);
            });
            question.number = 'Q' + (count + 1);
            //复制当前题目，并插入到当前题目之后
            createQuestion(question, function (data) {
                //找到当前题目的位置
                var index = $('.dragwen .question').index(module);
                //获取model
                var model = ModelFactory.getModel(data, myapp.resHost);
                //生成html
                var html = model.genEditTemplate();
                //插入新题目
                $(html).insertAfter(module);
                //获取新插入的module
                module = $('.dragwen .question:eq(' + (index + 1) + ')');
                //附加数据
                attachData(module, model.question);
                //更新题目DispIndex
                moveObjects(getDispIndex(), "question", null);
                //更新题目序号和分组序号
                //updateSequence();
                //动画效果
                $("html,body").animate({
                    scrollTop: (module.offset().top - 100)
                }, 'slow');
            });
        });

        //删除题目
        $('.setup-group .del').live('click', function () {
            //向上找到li.module
            var module = $(this).parents('.module');
            //question对象
            var question = module.data('model');
            //查找当前题目所在分组
            //var m = groupNumber(module);            
            //确认
            jsConfirm({
                title: '删除题目确认',
                accept: function () {
                    deleteQuestion(question, function (data) {
                        //移除当前module
                        module.remove();
                        //更新题目编号和分组编号
                        //updateSequence();
                        //更新题目DispIndex
                        moveObjects(getDispIndex(), "question", function (data) {
                            console.log('update orders success ...');
                        });
                        // 动画效果
                        //if (module.offset().top !== 0) {
                        //    $("html, body").animate({ scrollTop: (module.offset().top - 100) }, 'slow');
                        //}
                    });
                },
                conw: 400
            });
        });

        //删除分组
        $('.setup-group .del-group').live('click', function () {
            //向上找到li.module
            var obj = $(this).parents('.module');
            //查找当前题目所在分组
            var m = groupNumber(obj);
            //是否打开确认对话框
            // var isAlart = check_page_logic(m);
            var isAlart = true;
            //
            if (isAlart) {
                //移除分组
                $(this).parents('.module').remove();
                //删除分组
                deleteGroup(m);
                //移除pophover
                $("#pophover").remove();
            } else {
                //确认
                jsConfirm({
                    'content': "删除该分组会使跳转逻辑失效,你确定要删除吗？",
                    'accept': function (arr) {
                        //移除分组
                        arr[0].parents('.module').remove();
                        //删除分组
                        delete_page(arr[1]);
                    },
                    'conw': 370,
                    'accept_param': [$(this), m]
                });
            }
        });

        //批量编辑行
        $('.operation-hor .bulk').live('click', function () {
            //缓存this
            var mbb = $(this);
            var obj = mbb.parents('.module');
            var issue = obj.attr('issue');
            var oid = obj.attr('oid');
            obj.data("blah", "yes");
            //未知
            $('.setup-group a, .updown, .operation-hor a, .operation-ver a').hide();
            $('.setup-group a, .updown, .operation-hor a, .operation-ver a', obj).show();
            //准备已有选项
            var option_val = obj.find('.T-edit-min, .Ed-tr .T-edit-td');
            var option_arr = [];
            option_val.each(function (index, element) {
                option_arr.push($(this).text());
            });
            //托管标题
            mbb.attr('title', '批量编辑-选项');
            //批量编辑选项,怎么创建选项未知
            _this.batch($(this), issue, oid, 'left', '505px', 'h', option_arr);
        });

        //批量编辑列
        $('.operation-ver .bulk').live('click', function () {
            //缓存this
            var mbb = $(this);
            var obj = mbb.parents('.module');
            var issue = obj.attr('issue');
            var oid = obj.attr('oid');
            obj.data("blah", "yes");
            //未知
            $('.setup-group a,.updown,.operation-hor a,.operation-ver a').hide();
            $('.setup-group a,.updown,.operation-hor a,.operation-ver a', obj).show();
            //准备已有选项
            var option_val = mbb.parents('.module').find('td[menutype="col"]');
            var option_arr = [];
            option_val.each(function (index, element) {
                option_arr.push($(this).text());
            });
            //托管标题
            mbb.attr('title', '批量编辑');
            //批量编辑选项,怎么创建选项未知
            _this.batch($(this), issue, oid, 'right', '505px', 'v', option_arr);
        });

        //逻辑设置
        $('.jump-btn').on('click', function () {
            var caption = $(this).find('span').html();
            if ($(this).hasClass('question')) {
                if ($(this).hasClass('simple'))
                    modalDialog(caption, './panel/jump_simple.html', null, null, _this.textEdit);
                else if ($(this).hasClass('complex'))
                    modalDialog(caption, './panel/jump_complex.html', null, null, _this.textEdit);
                else if ($(this).hasClass('count'))
                    modalDialog(caption, './panel/jump_count.html', null, null, _this.textEdit);
                else if ($(this).hasClass('uncond'))
                    modalDialog(caption, './panel/jump_uncond.html', null, null, _this.textEdit);
            } else if ($(this).hasClass('option')) {
                if ($(this).hasClass('simple'))
                    modalDialog(caption, './panel/jump_simple_matrix.html', null, null, _this.textEdit);
                else if ($(this).hasClass('complex'))
                    modalDialog(caption, './panel/jump_complex_matrix.html', null, null, _this.textEdit);
                else if ($(this).hasClass('count'))
                    modalDialog(caption, './panel/jump_count_matrix.html', null, null, _this.textEdit);
                else if ($(this).hasClass('uncond'))
                    modalDialog(caption, './panel/jump_uncond_matrix.html', null, null, _this.textEdit);
            }
            return false; //未知
        });

        //引用设置
        $('.ref-btn').on('click', function () {
            //var type = $(".right-operate").attr('type');
            //var valid = $(".right-operate").attr('oid');
            modalDialog("引用设置", './panel/reference.html', null, null, _this.textEdit);
            return false; //未知
        });

        //初始化设置
        $('.init-btn').on('click', function () {
            modalDialog("初始化设置", './panel/initialize.html', null, null, _this.textEdit);
            return false; //未知
        });

        //题目设置/未知 - deprecated
        $('.bulk[title="题目设置"]').live('click', function () {
            var mbb = $(this);
            var obj = $(this).parents('.module');
            var place = $('.dragwen .module').index(obj);
            obj.data("blah", "yes");
            //未知
            $('.setup-group a,.updown,.operation-hor a,.operation-ver a').hide();
            $('.setup-group a,.updown,.operation-hor a,.operation-ver a', obj).show();
            //
            _this.bubble($(this), '/design/edit/ajax/q_options/' + get_oid(project) + '/?q_index=' + place + '&ts=' + (new Date()).getTime() + '&question_id=' + obj.attr('oid'), 'left', '505px');
        });

        //右侧逻辑设置/未知 - deprecated
        $('.setup-group .logic').live('click', function () {
            var mbb = $(this);
            var obj = $(this).parents('.module');
            //托管标题
            mbb.attr('title', '逻辑设置');
            //
            $(this).parents('.module').data("blah", "yes");
            //未知
            $('.setup-group a,.updown,.operation-hor a,.operation-ver a').hide();
            $('.setup-group a,.updown,.operation-hor a,.operation-ver a', obj).show();
            //弹出对话框
            _this.bubble($(this), '/design/edit/ajax/q_jump_list/' + get_oid(project) + '/?qid=' + obj.attr('oid') + '&pid=' + get_oid(project) + '&ts=' + (new Date()).getTime(), 'right', '600px');
        });

        //单行填空、多行填空、多项填空
        $('.option-Fill input, .option-Fill textarea').live('click', function () {
            /*var option_id = $(this).parent().attr('id');
            var obj = $(this).parents('.module');
            var place = $('.dragwen .module').index(obj);*/
            //初始化上下文
            _this.obj = $(this);
            //_this.module = _this.obj.parents('.module');
            _this.type = _this.obj.attr('name');
            _this.id = _this.obj.attr('id');
            _this.model = _this.obj.parents(".option").data('model');
            _this.issue = _this.obj.parents(".module").attr('issue');
            //设置上下文（右面板）
            setPanelContext(_this.type, _this.issue, _this.id, _this.model);
            //获取上下文
            if (_this.issue == QUESTION_TYPE_SINGLE_BLANK) {
                url = './panel/blank_option.html';
            } else if (_this.issue == QUESTION_TYPE_MULTIPLE_LINE_BLANK) {
                url = './panel/blank_option.html';
            }
            if (url != "") {
                $.get(url, function (result) {
                    setupSetting("选项设置", result);
                    setupJumpover(false, 2); //跳转逻辑
                    //setupReference(false, 2);
                    initRightOperate();
                });
            }

        });

        //填空题选项设置/未知 - deprecated
        $('.option-Fill .min-an').live('click', function () {
            var option_id = $(this).parent().attr('id');
            var obj = $(this).parents('.module');
            var place = $('.dragwen .module').index(obj);
            //modalDialog("选项设置", '/design/edit/ajax/option_sets/' + get_oid(project) + '?option_id=' + option_id + '&q_index=' + place + '&ts=' + (new Date()).getTime(), "500");
        });

        //题目预览/未知 - deprecated
        $('.preview').live('click', function () {
            //向上找到li.module
            var obj = $(this).parents('.module');
            //弹出题目预览框
            iframe_up("题目预览", '/design/edit/question_preview/' + obj.attr('oid') + '/?ts=' + (new Date()).getTime(), "850", "500");
        });
    },
    //未知
    this.ptvt = function (in_this) {
        if (ptvt_switch) {
            if (in_this.data("blah") !== "yes" || in_this.data("blah") == 'undefined') {
                $('.setup-group a, .updown, .operation-hor a, .operation-ver a', in_this).hide();
            }
        }
    },
    //设置
    this.setup = function () {

    },
    //逻辑
    this.logic = function () {

    },
    //预览
    this.preview = function () {

    },
    //冒泡
    this.bubble = function (mbb, url, type, width) {
        jsBubble.show({
            obj: mbb,
            loads: true,
            url: url,
            type: type,
            pyleft: 1,
            pytop: -5,
            title: mbb.attr('title'),
            width: width,
            BoColor: "none",
            BaColor: "#fff",
            CBaColor: "#fff",
            TBaColor: "#fff",
            Close: true
        });
    },
    //批量编辑
    this.batch = function (mbb, issue, oid, type, width, hv, array) {
        //
        hv == "h" ? hv = "bulk-hor" : hv = "bulk-ver";
        //判断默认选项
        var def_option = '';
        var def_class = '';
        //
        for (var i = 0; i < array.length; i++) {
            def_option += array[i] + '\r';
        }
        def_class = 'def_class';
        //对话框
        var con =
            '<div class="poplayer" oid=' + oid + '>' +
            '<p class="spanlh">每行代表一个选项，可以添加多个选项</p>' +
            '<div><textarea class="bulkadd ' + def_class + '">' + def_option + '</textarea></div>' +
            '<div style="height:34px;" class="mtop postiondiv">' +
            '<div name=' + issue + ' class="WJButton wj_blue smallfontsize postionbtn ' + hv + ' test_class_A">保存</div>' +
            '</div>' +
            '</div>';
        //弹出对话框
        jsBubble.show({
            obj: mbb,
            data: con,
            type: type,
            pyleft: 0,
            pytop: -3,
            title: mbb.attr('title'),
            width: width,
            BoColor: "#fff",
            BaColor: "#fff",
            CBaColor: "#fff",
            TBaColor: "#fff",
            Close: true
        });
        //点击textarea时
        $('.poplayer[oid=' + oid + '] .def_class').one('click', function () {
            //清空textarea，并且去掉def_class
            //$(this).html('').removeClass(def_class);
            $(this).removeClass(def_class);
            //给textarea焦点
            $(this).focus();
        });
        //$('.poplayer[oid='+oid+'] .bulkadd').focus();//焦点 
    }
}

//弹出框打包配置
function modalDialog(title, url, conw, conh, textEdit) {
    //防止推出编辑状态
    $('body').unbind('click');
    //弹出对话框
    conw = conw || 650;
    conh = conh || 480;
    var wb = new jsbox({
        onlyid: "maptss",
        title: title,
        conw: conw,
        //conh:conh,
        //FixedTop:170,
        url: url,
        loads: true,
        range: true,
        mack: true,
        textEdit: textEdit,
    }).show();
}

//弹出框打包配置iframe 方式
function iframe_up(title, url, conw, conh) {
    if (!conw) {
        conw = 500
    };
    if (!conh) {
        conh = 500
    };
    var wb = new jsbox({
        onlyid: "maptss",
        title: title,
        conw: conw,
        conh: conh,
        //FixedTop:170,
        url: url,
        iframe: true,
        range: true,
        mack: true
    }).show();
}

//文字编辑 - function object
function TextEdit() {
    this.obj = ''; //被编辑对象
    this.zonEdit = {}; //编辑框
    this.addEdit = {}; //编辑框内容
    //this.button = {}; //菜单按钮 
    //this.fast_machine = {}; //快速操作按钮
    this.html = '';
    this.editor = ''; //FCK编辑器状态
    this.type = '';
    this.id = '';
    this.zonCache = '';
    this.bodyClick = null;
}

//文字编辑 - prototype
TextEdit.prototype = {
    //文本编辑
    textEdit: function () {
        //指代TextEdit对象
        var _this = this;
        //绑定事件
        $('.T-edit').live('click', function () {
            //初始化上下文
            _this.obj = $(this);
            _this.type = _this.obj.attr('name');
            //初始化菜单
            var menu_list = {};
            menu_list.move_up = false; //上移
            menu_list.move_down = false; //下移
            menu_list.move_left = false; //左移
            menu_list.move_right = false; //右移
            menu_list.delete = false; //删除
            //非题目标题编辑
            if (_this.type == "template" || _this.type == "welcome" || _this.type == "closing" || _this.type == "paging" || _this.type == "guide") {
                menu_list.jumpover = false; //跳转设置
                menu_list.reference = false; //引用设置
                if (_this.type == "template") {
                    menu_list.setting = true; //通用设置
                    var url = "./panel/template.html";
                    if (url !== undefined) {
                        $.get(url, function (result, status) {
                            setupSetting("问卷设置", result);
                        });
                    }
                } else {
                    menu_list.setting = false; //通用设置
                }
                //设置右面板 - 逻辑设置
                setupJumpover(menu_list.jumpover, null, null);
                //设置右面板 - 引用设置
                setupReference(menu_list.reference, null);
                //初始化右面板
                //initRightOperate();
            }
            //题目标题编辑
            else {
                _this.module = _this.obj.parents('.module');
                _this.id = _this.module.attr('oid');
                _this.model = _this.module.data('model');
                _this.issue = _this.module.attr('issue');
                //设置上下文（右面板）
                setPanelContext(_this.type, _this.issue, _this.id, _this.model);
                //初始化菜单
                menu_list.setting = false; //通用设置
                menu_list.jumpover = true; //跳转设置
                menu_list.reference = true; //引用设置
                //找到当前题目所在位置
                var pos = $(".module", '.dragwen').index(_this.module) + 1;
                var count = $(".module", '.dragwen').length;
                //第一道题不显示引用设置
                if (pos == 1) {
                    menu_list.reference = false;
                }
                //最后一道题不显示逻辑
                else if (pos == count) {
                    menu_list.jumpover = false;
                }
                //未知
                _this.module.data("blah", "yes");
                $('.setup-group a, .updown, .operation-hor a, .operation-ver a').hide();
                $('.setup-group a, .updown, .operation-hor a, .operation-ver a', _this.module).show();
                //设置右面板 - 加载设置页面
                var url = undefined;
                if (_this.issue == QUESTION_TYPE_SINGLE) //单选
                    url = './panel/single.html';
                else if (_this.issue == QUESTION_TYPE_MULTIPLE) //多选
                    url = './panel/multiple.html';
                else if (_this.issue == QUESTION_TYPE_IMAGE_SINGLE) //图片单选
                    url = './panel/single_image.html';
                else if (_this.issue == QUESTION_TYPE_IMAGE_MULTIPLE) //图片多选
                    url = './panel/multiple_image.html';
                else if (_this.issue == QUESTION_TYPE_SINGLE_BLANK) //单行填空题
                    url = './panel/single_blank.html';
                else if (_this.issue == QUESTION_TYPE_MULTIPLE_LINE_BLANK) //多行填空题
                    url = './panel/multiple_line_blank.html';
                else if (_this.issue == QUESTION_TYPE_MULTIPLE_BLANK) //多项填空题
                    url = './panel/multiple_blank.html';
                else if (_this.issue == QUESTION_TYPE_SCORE) //打分题
                    url = './panel/score.html';
                else if (_this.issue == QUESTION_TYPE_MATRIX_SINGLE) //矩阵单选题
                    url = './panel/matrix_single.html';
                else if (_this.issue == QUESTION_TYPE_MATRIX_MULTIPLE) //矩阵多选题
                    url = './panel/matrix_multiple.html';
                else if (_this.issue == QUESTION_TYPE_MATRIX_SCORE) //矩阵打分题
                    url = './panel/matrix_score.html';
                else if (_this.issue == QUESTION_TYPE_DESC) {//描述题
                    url = './panel/guide.html';
                    menu_list.reference = false;
                    menu_list.jumpover = false;
                }
                if (url !== undefined) {
                    $.get(url, function (result, status) {
                        setupSetting("题目设置", result);
                    });
                }
                //设置右面板 - 逻辑设置
                setupJumpover(menu_list.jumpover, 1, _this.model)
                //设置右面板 - 引用设置
                setupReference(menu_list.reference, 1);
                //初始化右面板
                //initRightOperate()
            }
            //生成编辑框和菜单
            _this.createEditor(menu_list);
            //防点击生效
            _this.addEdit.bind('click', function () {
                return false;
            });
            //点击取消并保存
            _this.bodyClick = _this.textEditBodyClick;
            $("body").one('click', _this, _this.bodyClick);
        });
    },
    //li结构编辑
    textEditLi: function () {
        //指代TextEdit对象
        var _this = this;
        //绑定事件
        $('.T-edit-min').live('click', function () {
            //初始化上下文
            _this.obj = $(this);
            _this.type = _this.obj.attr('name');
            _this.id = _this.obj.attr('id');
            _this.model = _this.obj.parents(".option").data('model');
            _this.issue = _this.obj.parents('.module').attr('issue');
            //设置上下文（右面板）
            setPanelContext(_this.type, _this.issue, _this.id, _this.model);
            //向上找到li.module
            var parli = _this.obj.parents('.module');
            var question = parli.data('model');
            //找到当前题目所在位置，题目数量
            var pos = $(".module", '.dragwen').index(parli) + 1;
            var count = $(".module", '.dragwen').length;
            var s = $('.dragwen > li:eq(' + (pos - 1 - 1) + ')').is('.paging');
            //初始化菜单项
            var menu_list = {};
            menu_list.setting = true;
            menu_list.jumpover = false;
            menu_list.reference = true;
            //menu_list.image = true;
            //menu_list.editor = true;
            menu_list.move_up = true;
            menu_list.move_down = true;
            menu_list.move_left = false;
            menu_list.move_right = false;
            menu_list.delete = true;
            //第一道题不显示引用设置
            if (pos == 1) {
                menu_list.reference = false;
            }
            //分组的第一道题不显示引用设置
            if (pos == 2) {
                if (s) {
                    menu_list.reference = false;
                }
            }
            //选项设置
            if (menu_list.setting == true) {
                var url = undefined;
                if (_this.issue == QUESTION_TYPE_SINGLE || _this.issue == QUESTION_TYPE_IMAGE_SINGLE) {
                    url = './panel/general_option.html';
                } else if (_this.issue == QUESTION_TYPE_MULTIPLE || _this.issue == QUESTION_TYPE_IMAGE_MULTIPLE) {
                    url = './panel/general_option.html';
                } else if (_this.issue == QUESTION_TYPE_SCORE) {
                    url = './panel/score_option.html';
                } else if (_this.issue == QUESTION_TYPE_MULTIPLE_BLANK) {
                    url = './panel/blank_option.html?type=' + QUESTION_TYPE_MULTIPLE_BLANK;
                }
                if (url != undefined) {
                    $.get(url, function (result) {
                        setupSetting("选项设置", result);
                    });
                }
            } else {
                setupSetting("设置", "");
            }
            //选项跳题设置
            setupJumpover(menu_list.jumpover, 2, question);
            //选项引用设置
            setupReference(menu_list.reference, 2);
            //初始化右面板
            //initRightOperate()
            //生成选项菜单
            _this.createEditorMin(menu_list);
            //防点击生效
            _this.addEdit.bind('click', function () {
                return false;
            });
            //向上移动
            _this.menus.find('.up').bind('click', function () {
                //上移当前选项
                _this.moveUpLi();
                //
                moveTop('#' + $('.right-operate').attr('oid'));
                //
                return false;
            });
            //向下移动
            _this.menus.find('.down').bind('click', function () {
                //下移当前选项
                _this.moveDownLi();
                //
                moveTop('#' + $('.right-operate').attr('oid'));
                //
                return false;
            });
            //点击取消
            _this.bodyClick = _this.textEditLiBodyClick;
            $("body").one('click', _this, _this.bodyClick);
        });
    },
    //td结构编辑
    textEditTd: function () {
        //指代TextEdit对象
        var _this = this;
        //绑定事件
        $('.T-edit-td').live('click', function () {
            //初始化上下文
            _this.obj = $(this);
            _this.type = _this.obj.attr('name');
            _this.menutype = _this.obj.attr('menutype');
            _this.id = _this.obj.attr('oid');
            _this.model = _this.obj.data('model');
            _this.issue = _this.obj.parents('.module').attr('issue');
            //设置上下文（右面板）
            setPanelContext(_this.type, _this.issue, _this.id, _this.model);
            //向上找到li.module
            var parli = _this.obj.parents('.module');
            var question = parli.data('model');
            //找到当前题目所在位置
            var pos = $(".module", '.dragwen').index(parli) + 1;
            //题目总数量
            var count = $(".module", '.dragwen').length;
            var s = $('.dragwen > li:eq(' + (pos - 2) + ')').is('.paging');
            //初始化菜单项
            var menu_list = {};
            menu_list.setting = true;
            menu_list.jumpover = true;
            menu_list.reference = true;
            menu_list.move_up = false;
            menu_list.move_down = false;
            menu_list.move_left = false;
            menu_list.move_right = false;
            menu_list.delete = true;
            //第一道题不显示引用设置
            if (pos == 1) {
                menu_list.reference = false;
            }
            //每分组的第一道题不显示引用设置
            if (pos == 2) {
                if (s) {
                    menu_list.reference = false;
                }
            }
            //最后一题不显示跳题设置
            if (pos == count) {
                menu_list.jumpover = false;
            }
            //左移/右移/上移/下移
            if (_this.menutype == 'col') {
                menu_list.jumpover = false;
                menu_list.move_up = false;
                menu_list.move_down = false;
                menu_list.move_left = true;
                menu_list.move_right = true;
            } else {
                menu_list.jumpover = true;
                menu_list.move_up = true;
                menu_list.move_down = true;
                menu_list.move_left = false;
                menu_list.move_right = false;
            }
            //
            if (menu_list.setting == true) {
                //获取上下文
                var obj = _this.obj.parents('.module');
                var url = "";
                if (_this.issue == QUESTION_TYPE_MATRIX_SCORE) {
                    url = './panel/score_option.html';
                } else if (_this.issue == QUESTION_TYPE_MATRIX_SINGLE) {
                    url = './panel/general_option.html';
                } else if (_this.issue == QUESTION_TYPE_MATRIX_MULTIPLE) {
                    url = './panel/general_option.html';
                }
                if (url != "") {
                    $.get(url, function (result) {
                        setupSetting("选项设置", result);
                    });
                }
            } else {
                setupSetting("设置", "");
            }
            //选项跳题设置
            setupJumpover(menu_list.jumpover, 2, question);
            //选项引用设置
            setupReference(menu_list.reference, 2);
            //初始化右面板
            //initRightOperate()
            //生成选项菜单
            _this.createEditorMin(menu_list);
            //防点击生效
            _this.addEdit.bind('click', function () {
                return false;
            });
            //向上移动
            _this.menus.find('.up').bind('click', function () {
                _this.moveUpTd();
                moveTop('#' + $('.right-operate').attr('oid'));
                return false;
            });
            //向下移动
            _this.menus.find('.down').bind('click', function () {
                _this.moveDownTd();
                moveTop('#' + $('.right-operate').attr('oid'));
                return false;
            });
            //向左移动
            _this.menus.find('.left').bind('click', function () {
                _this.moveLeftTd();
                return false;
            });
            //向右移动
            _this.menus.find('.right').bind('click', function () {
                _this.moveRightTd();
                return false;
            });
            //
            //setupSetting("选项设置", "");
            //setupJumpover(false, 2); //跳转逻辑
            //initRightOperate();
            //点击取消
            _this.bodyClick = _this.textEditTdBodyClick;
            $("body").one('click', _this, _this.bodyClick);
        });
    },
    //保存编辑
    saveTitle: function () {
        //刷新内容
        this.obj.html(this.html);
        //调用API更新对象
        if (this.type == "template") {
            myapp.template.name = this.html;
            updateTemplate(myapp.template, function (data) {
                console.log('update template success ...');
            });
        } else if (this.type == "welcome") {
            var welcome = $('#welcome').data('model');
            if (welcome == null) {
                welcome = {
                    id: -1,
                    type: 1,
                    subType: 1,
                    number: 'welcome',
                    templateID: myapp.template.id,
                    title: this.html,
                };
                createStatement(welcome, function (data) {
                    $('#welcome').data('model', data);
                    console.log('create statement success ...');
                });
            } else {
                welcome.number = 'welcome';
                welcome.title = this.html;
                updateStatement(welcome, function (data) {
                    console.log('update statement success ...');
                });
            }
        } else if (this.type == "closing") {
            var closing = $("#closing_type option:selected").data('model');
            var subtype = $("#closing_type").val();
            if (closing == null) {
                closing = {
                    id: -1,
                    type: 2,
                    subType: subtype == "complete" ? 1 : 2,
                    number: subtype,
                    templateID: myapp.template.id,
                    title: this.html,
                };
                createStatement(closing, function (data) {
                    $('#closing_type option:selected').data('model', data);
                    console.log('create statement success ...');
                });
            } else {
                closing.number = subtype;
                closing.title = this.html;
                updateStatement(closing, function (data) {
                    console.log('update statement success ...');
                });
            }
        } else if (this.type == "guide") {
            myapp.template.guide = this.html;
            updateTemplate(myapp.template, function (data) {
                console.log('update template success ...');
            });
        } else if (this.type == "question") {
            this.model.title = this.html;
            updateTitle(this.model, this.type);
        } else if (this.type == "option") {
            this.model.title = this.html;
            updateTitle(this.model, this.type);
        }
        //解绑定
        this.addEdit.unbind();
        //移除编辑区域zon-edit
        this.zonEdit.remove();
    },
    //生成标准编辑框
    createEditor: function (menu_list) {
        //指代TextEdit对象
        var _this = this;
        //缓存被编辑内容
        _this.html = _this.obj.html();
        //宽度限制 [500, 777]，高度限制 [30
        var mbWidth = _this.obj.width() - 4;
        //mbWidth < 500 ? mbWidth = 500 : mbWidth;
        //mbWidth >= 777 ? mbWidth = 777 : mbWidth;
        var mbHeight = _this.obj.height();
        mbHeight < 30 ? mbHeight = 30 : mbHeight;
        //去除T-edit
        var addstyle = '';
        var style = _this.obj.attr('class').split(" ");
        for (var i = 0; i < style.length; i++) {
            if (style[i] !== "T-edit")
                addstyle += style[i] + " ";
        }
        //构造快速操作菜单
        //_this.fast_machine = $();
        //编辑区域
        _this.zonEdit = $('<div class="zon-edit"></div>');
        _this.addEdit = $('<div class="add-edit" contenteditable="true">' + _this.html + '</div>');
        _this.zonMenu = _this.createMenu(-32, 37, menu_list, _this.type, _this.id, _this.obj);
        _this.zonEdit.append(_this.zonMenu);
        _this.zonEdit.append(_this.addEdit);
        _this.addEdit.attr('style', _this.obj.attr('style'));
        _this.addEdit.addClass(addstyle);
        _this.zonEdit.css({
            'width': mbWidth + 'px',
            'minHeight': mbHeight + 'px',
            'position': 'absolute',
            'top': _this.obj.offset().top - 1 + 'px',
            'left': _this.obj.offset().left - 1 + 'px'
            /*'top':0,
            'left':0*/
        });
        _this.addEdit.css({
            //'width':mbWidth+'px',
            //'minHeight':mbHeight+'px'
            //'padding':'4px 0 0 0',
            'minHeight': 30 + 'px'
        });

        //输出编辑框
        //obj.append(_this.zonEdit);
        $('body').append(_this.zonEdit);
        //设置焦点
        _this.addEdit.focus();
        //光标选中
        _this.setSelectText(_this.addEdit);
        //粘贴内容格式去除
        _this.eliminateFormat(_this.addEdit);
        //设置图片大小
        new ImgEditSize(_this.addEdit.find('img'));
    },
    //生成小号编辑框
    createEditorMin: function (menu_list) {
        //指代T-edit-min
        var _this = this;
        //缓存被编辑内容
        _this.html = _this.obj.html();
        //编辑区域大小
        var mbWidth;
        if (_this.obj.hasClass('T-edit-td')) {
            mbWidth = _this.obj.outerWidth() - 3 - 8;
        } else if (_this.obj.hasClass('T-edit-min')) {
            mbWidth = _this.obj.outerWidth() - 2;
        }
        var mcWidth = mbWidth;
        mcWidth < 178 ? mcWidth = 178 : mcWidth;
        //mbWidth > 650 ? mbWidth = 650 : mbWidth;
        var mbHeight = _this.obj.outerHeight() - 3 - 4;
        //mbHeight < 21 ? mbHeight = 21 : mbHeight;
        //去除T-edit
        var style = _this.obj.attr('class').split(" ");
        var addstyle = '';
        for (var i = 0; i < style.length; i++) {
            if (style[i] !== "T-edit") {
                addstyle += ' ' + style[i];
            }
        }
        //构造编辑区域
        _this.zonEdit = $('<div class="zon-edit"></div>');
        _this.addEdit = $('<div class="add-edit" contenteditable="true">' + _this.html + '</div>');
        _this.zonCache = $('<div class="zon-cache">' + _this.html + '</div>');
        _this.zonMenu = _this.createMenu(-20, 26, menu_list, _this.type, _this.id, _this.obj);
        _this.zonEdit.append(_this.zonMenu);
        _this.zonEdit.append(_this.addEdit);
        $('.zon-cache').remove();
        $('body').append(_this.zonCache);
        _this.addEdit.attr('style', _this.obj.attr('style'));
        _this.addEdit.addClass(addstyle);
        //编辑区域zon-edit的位置
        _this.zonEdit.css({
            /*'width': mcWidth + 'px',*/
            'minHeight': mbHeight + 'px',
            'position': 'absolute',
            'top': _this.obj.offset().top + 1 + 'px',
            'left': _this.obj.offset().left + 1 + 'px'
        });
        //var max_left = obj.offset().left + mbWidth;
        //var wid_left = $('.rows2').offset().left + $('.rows2').width();
        //if (max_left > wid_left || (obj.offset().left < $('.rows2').offset().left + 56 && mbWidth > $('.rows2').outerWidth())) {
        //    _this.zonEdit.css({
        //        'width': mbWidth + 2 + 'px',
        //        'minHeight': mbHeight + 'px',
        //        'position': 'absolute',
        //        'top': obj.offset().top - 1 + 'px',
        //        'left': wid_left - mbWidth - 50 + 'px'
        //    });
        //} else if ((obj.offset().left < $('.rows2').offset().left && mbWidth < $('.rows2').outerWidth())) {
        //    _this.zonEdit.css({
        //        'width': mbWidth + 2 + 'px',
        //        'minHeight': mbHeight + 'px',
        //        'position': 'absolute',
        //        'top': obj.offset().top - 1 + 'px',
        //        'left': $('.rows2').offset().left + 55 + 'px'
        //    });
        //} else {
        //    _this.zonEdit.css({
        //        'width': mbWidth + 2 + 'px',
        //        'minHeight': mbHeight + 'px',
        //        'position': 'absolute',
        //        'top': obj.offset().top - 1 + 'px',
        //        'left': obj.offset().left - 1 + 'px'
        //    });
        //}
        //编辑区域zon-edit的样式
        _this.addEdit.css({
            'width': mbWidth + 'px',
            //'minHeight':mbHeight+'px'
            'minHeight': mbHeight + 'px',
            'padding': '2px 4px 2px 4px' //,
            //'lineHeight':21+'px'
        });
        //未知
        _this.addEdit.bind('keyup', function () {
            _this.zonCache.html(_this.addEdit.html());
            var Cw = _this.zonEdit.width();
            var Aw = _this.zonCache.width();
            //cq 判斷
            /*if (max_left > wid_left) {
                if (Aw >= mbWidth) {
                    _this.zonEdit.width(mbWidth);
                    _this.addEdit.width(mbWidth - 2);
                } else if (Aw <= 200) {
                    if (Aw < mbWidth) {
                        Aw < mbWidth ? Aw = mbWidth : Aw;
                        _this.zonEdit.width(Aw + 4);
                        _this.addEdit.width(Aw + 2);
                    } else {
                        _this.zonEdit.width(200);
                        _this.addEdit.width(200);
                    }

                } else {
                    Aw < mbWidth ? Aw = mbWidth : Aw;
                    _this.zonEdit.width(Aw + 4);
                    _this.addEdit.width(Aw + 2);
                }
            } else {
                if (Aw >= 650) {
                    _this.zonEdit.width(650);
                    _this.addEdit.width(648);
                } else if (Aw <= 200) {
                    if (Aw < mbWidth) {
                        Aw < mbWidth ? Aw = mbWidth : Aw;
                        _this.zonEdit.width(Aw + 4);
                        _this.addEdit.width(Aw + 2);
                    } else {
                        _this.zonEdit.width(200);
                        _this.addEdit.width(200);
                    }

                } else {
                    Aw < mbWidth ? Aw = mbWidth : Aw;
                    _this.zonEdit.width(Aw + 4);
                    _this.addEdit.width(Aw + 2);
                }
            }*/
        });
        //输出编辑框
        $('body').append(_this.zonEdit);
        //设置焦点
        _this.addEdit.focus();
        //光标选中
        _this.setSelectText(_this.addEdit);
        //粘贴内容格式去除
        _this.eliminateFormat(_this.addEdit);
        //设置图片大小
        new ImgEditSize(_this.addEdit.find('img'));
    },
    //光标控制（待定）
    setSelectText: function (el) {
        try {
            var Check = check_title_select(el.text());

            window.getSelection().selectAllChildren(el[0]); //全选
            /*if (!Check) {
                window.getSelection().collapseToEnd(el[0]); //光标置后
            }*/

        } catch (err) {
            //在此处理错误
        }

        //      if(document.selection){
        //          
        //      }else{
        //         var Check = check_title_select(el.text());
        //
        //          window.getSelection().selectAllChildren(el[0]);//全选
        //         if(!Check){
        //          window.getSelection().collapseToEnd(el[0]);//光标置后
        //         }
        //      }
    },
    //粘贴内容格式去除
    eliminateFormat: function (obj) {

        EventUtil.addHandler(obj[0], "paste", function (event) {

            setTimeout(function () {
                var html = obj.html();
                html = html.replace(/<\/?[^>(IMG)(img)][^>]*>/g, '');
                obj.html(html);
            }, 50);

        });

        function DgContents(htt) {

            htt = htt.replace(/<\/?SPAN[^>]*>/gi, "");
            htt = htt.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3");
            htt = htt.replace(/<(\w[^>]*) style="([^"]*)"([^>]*)/gi, "<$1$3");
            htt = htt.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3");
            htt = htt.replace(/<\\?\?xml[^>]*>/gi, "");
            htt = htt.replace(/<\/?\w+:[^>]*>/gi, "");
            htt = htt.replace(/&nbsp;/, " ");
            var re = new RegExp("(<P)([^>]*>.*?)(<\/P>)", "gi"); // Different because of a IE 5.0 error
            htt = htt.replace(re, "<div$2</div>");
            return htt;
        }

    },
    //插入图片_菜单
    addImg: function (data) {
        if (!data.error_msg == "") {
            loadMack({
                off: 'on',
                Limg: 0,
                text: data.error_msg,
                set: 2500
            });
            return false;
        }
        var editImg = $('<img src="' + data.img_url + '">').appendTo(this.addEdit);
        //this.button.click();
        //设置图片大小
        new ImgEditSize(editImg);
        //imgEditSize.main(editImg);
    },
    //生成菜单
    createMenu: function (x, y, mflag, type, oid, obj) {
        //构造菜单
        var _that = {
            "delete": "",
            up_down: "",
            left_right: ""
        };
        _that.editor = '<li><a name="高级编辑" href="javascript:;" class="advanced-edit"><i class="advanced-edit-icon"></i></a></li>';
        //_that.image =
        //    '<li>' +
        //        '<a name="插入图片" href="javascript:;" class="upload-img">' +
        //            '<i class="upload-img-icon"></i>' +
        //            '<div class="beforeup">' +
        //                '<iframe src="panel/upload_image.html" id="imgUpload" style="filter:alpha(opacity = 0);-moz-opacity:0;-khtml-opacity:0;opacity:0;position:absolute;top:0;left:0;width:21px;height:20px;border:0;"></iframe>' +
        //                '<div class="wjbtn"></div>' +
        //            '</div>' +
        //        '</a>' +
        //    '</li>';
        _that.image =
            '<li>' +
                '<a name="插入图片" href="javascript:;" class="upload-img">' +
                    '<i class="upload-img-icon"></i>' +
                '</a>' +
                '<form name="upload-img" style="display:none"><input name="origin_image" type="file"></form>' +
            '</li>';
        _that.view = '<li><a name="预览问卷" class="view" href="javascript:;" target="_blank"><i class="iconfont eyes">&#xe627;</i></a></li>';
        if (mflag.delete == true)
            _that.delete = '<li><a name="删除选项" href="javascript:;" class="delete"><i class="delete-icon"></i></a></li>';
        if (mflag.move_up == true || mflag.move_down == true) {
            _that.up_down =
                '<li><a name="上移选项" href="javascript:;" class="up nob"><i class="up-icon"></i></a></li>' +
                '<li><a name="下移选项" href="javascript:;" class="down"><i class="down-icon"></i></a></li>';
        }
        if (mflag.move_left == true || mflag.move_right == true) {
            _that.left_right =
                '<li><a name="左移选项" href="javascript:;" class="left nob"><i class="left-icon"></i></a></li>' +
                '<li><a name="右移选项" href="javascript:;" class="right"><i class="right-icon"></i></a></li>';
        }
        var objWidth, objLeft;
        if (obj.hasClass('T-edit-min')) {
            objWidth = 178;
            objLeft = 0;
        } else if (obj.hasClass('T-edit-td')) {
            objWidth = 178;
            if ($('td[oid="' + oid + '"]').index() == $('td[oid="' + oid + '"]').parent().children().length - 1) {
                objLeft = -(190 - obj.width());
            } else {
                objLeft = 0;
            }
        } else if (obj.hasClass('q-title')) {
            objWidth = 100;
            objLeft = $('.q-title').width() - 110;
        } else if (obj.hasClass('h4-bg')) {
            objWidth = 68;
            objLeft = $('.h4-bg').width() - 80;
        }
        //问卷标题隐藏图片与高级编辑器入口
        if(type == "template"){
            this.menus = $(
                '<ul class="operation-up" style="display:none;width:' + objWidth + 'px;left:' + objLeft + 'px;" type="' + type + '" oid="' + oid + '">' +
                _that.image +
                _that.editor +
                _that.up_down +
                _that.left_right +
                _that.delete +
                '</ul>'
            );
        }else if(type == 'question'){
            this.menus = $(
                '<ul class="operation-up" style="width:' + objWidth + 'px;left:' + objLeft + 'px;" type="' + type + '" oid="' + oid + '">' +
                _that.image +
                _that.editor +
                _that.view +
                _that.up_down +
                _that.left_right +
                _that.delete +
                '</ul>'
            );
        }else{
            this.menus = $(
                '<ul class="operation-up" style="width:' + objWidth + 'px;left:' + objLeft + 'px;" type="' + type + '" oid="' + oid + '">' +
                _that.image +
                _that.editor +
                _that.up_down +
                _that.left_right +
                _that.delete +
                '</ul>'
            );
        }
        //指代
        var _this = this;
        //高级编辑
        if (_that.editor !== "") {
            _this.menus.find('.advanced-edit').bind('click', function () {
                _this.editTcc();
                // $('body').unbind('click');
                return false;
            });
        }
        //预览
        if (_that.view !="") {
            _this.menus.find('.view').bind('click', function () {
                var question = $('li[oid="'+oid+'"]').data('model');
                previewq(_this.menus.find('.view'),question.dispIndex);
            })
        }
        //删除选项
        if (_that.delete !== "") {
            _this.menus.find('.delete').bind('click', function () {
                _this.deleteOption(true);
                moveLeft();
                $('body').unbind('click');
                return false;
            });
        }
        //上传图片
        if (_that.image !== "") {
            //图标
            _this.menus.find('.upload-img').hover(function () {
                $(this).find('i').addClass('add-Img-bg');
            }, function () {
                $(this).find('i').removeClass('add-Img-bg');
            });
            //Form提交
            _this.menus.find('form[name=upload-img]').ajaxForm({
                url: myapp.apiHost + "image/upload/",
                type: "post",
                dataType: 'json',
                success: function (data) {
                    if ((data.objs.length) > 0) {
                        //var html = textEdit.addEdit.html() + '<img src="' + myapp.resHost + data.objs[0].fileName + '"></img>';
                        textEdit.addEdit.html(textEdit.addEdit.html() + '<img src="' + myapp.resHost + data.objs[0].fileName + '" style="width:50px;height:50px;"></img>');
                        $('body').one('click', textEdit, textEdit.bodyClick);
                    }
                },
                error: function (data) {
                    //alert('error');
                },
                beforeSend: function (request) {
                    //alert('beforeSend');
                },
                beforeSubmit: function (data, form, options) {
                    //alert('beforeSubmit');
                }
            });
            //触发上传
            _this.menus.find('.upload-img').on('click', function () {
                $("body").unbind('click');
                $(this).parent().find('input').click();
            });
            //触发Form提交
            _this.menus.find('input[name=origin_image]').on('change', function () {
                $(this).parent().submit();
            });
        }
        //
        return this.menus;
    },
    //删除选项
    deleteOption: function () {
        //指代
        var _that = this;
        //获取上下文
        var menutype = _that.obj.attr('menutype');
        //
        if (menutype == "col") {
            //缓存对象
            var option = _that.obj.data('model');
            var index = _that.obj.parent().find('.option').index(_that.obj);
            //调用API
            deleteOption(option, function (data) {
                //缓存
                var thead = _that.obj.parents('thead');
                //移除行
                $('tbody tr', _that.obj.parents('table')).each(function (i, e) {
                    $(this).find('td:eq(' + (index+1) + ')').remove();
                });
                //移除列
                _that.obj.remove();
                //更新选项 DispIndex
                var orders = getDispIndex(thead);
                moveObjects(orders, 'option', function (data) {
                    console.log('move options success');
                });
            });
        } else if (menutype == "row") {
            //缓存对象
            var option = _that.obj.data('model');
            //调用API
            deleteOption(option, function (data) {
                //缓存
                var tbody = _that.obj.parents('tbody');
                //移除元素
                _that.obj.parents('tr').remove();
                //更新选项 DispIndex
                var orders = getDispIndex(tbody);
                moveObjects(orders, 'option', function (data) {
                    console.log('move options success');
                });
            });
        } else {
            //缓存对象
            var option = _that.obj.parents('.option').data('model');
            //调用API
            deleteOption(option, function (data) {
                //缓存
                var module = _that.obj.parents('.module');
                //移除li.option
                _that.obj.parents('.option').remove();
                //更新选项 DispIndex
                var orders = getDispIndex(module);
                moveObjects(orders, 'option', function (data) {
                    console.log('move options success');
                });
            });
        }
        //移除编辑区域
        this.zonEdit.remove();
        //选项计算宽度
        //if (issue == QUESTION_TYPE_MATRIX_SINGLE || issue == QUESTION_TYPE_MATRIX_MULTIPLE) {
        //    Width_mate(oid);
        //}
        //
        return false;
    },
    //创建弹出框
    editTcc: function (conw, conh) {
        //去绑定
        $("body").unbind('click');
        //宽度
        if (!conw) {
            conw = 730
        };
        //高度
        if (!conh) {
            conh = 400
        };
        //创建jsbox对象
        var wb = new jsbox({
            onlyid: "EditTcc",
            title: false,
            conw: conw,
            conh: conh,
            title: "高级编辑",
            //FixedTop: 170,
            range: true,
            content: '',
            mack: true
        }).show();
        //
        var style = this.addEdit.html();
        var styles = [];
        if (!this.addEdit.css('fontFamily')) {
            styles.push("font-family:" + this.addEdit.css('fontFamily') + ";");
        }
        styles.push("font-size:" + this.addEdit.css('fontSize') + ";");
        styles.push("color:" + this.addEdit.css('color') + ";");
        styles.push("font-style:" + this.addEdit.css('fontStyle') + ";");
        styles.push("font-weight:" + this.addEdit.css('fontWeight') + ";");
        styles.push("text-decoration:" + this.addEdit.css('textDecoration') + ";");
        var ii = 0;
        var m = styles.length;
        //指代TextEdit对象
        var _this = this;
        //
        dgStyle(ii, m);
        //
        function dgStyle(ii, m) {
            if (ii !== m) {
                style = '<span style="' + styles[ii] + '">' + style + '</span>';
                ii++;
                return dgStyle(ii, m);
            } else {
                return style;
            }
        }
        //
        this.createFCKEditor(style, this.obj);
        //
        $('#EditTcc .loaddiv').append("<div class='editTcc'><div class='WJButton wj_blue editTcc_an'>保存</div></div>");
    },
    //li结构向上移动
    moveUpLi: function (conw, conh) {
        //获取ul和li
        var parul = this.obj.parents('.unstyled');
        var parli = this.obj.parents('.unstyled li');
        //获取当前选项位置
        var m = $("li", parul).index(parli);
        //如果当前选项是第一个选项
        if (m == 0) {
            loadMack({
                off: 'on',
                Limg: 0,
                text: '已经是第一个选项',
                set: 800
            });
            return;
        }
        //上移当前选项
        parul.find('li:eq(' + (m - 1) + ')').before(parli);
        var layout = this.obj.parents(".module").attr("layout");
        if (layout == 'vertical') {
            $("html, body").animate({
                scrollTop: '-=' + 30
            }, 'slow');
        }
        //编辑区域跟着移动
        this.zonEdit.css({
            'top': this.obj.offset().top - 1 + 'px',
            'left': this.obj.offset().left - 1 + 'px'
        });
        //调用API
        moveObjects(getDispIndex(this.obj.parents('.module')), 'option', function (data) {
            console.log('move option up success');
        });
    },
    //li结构向下移动
    moveDownLi: function (conw, conh) {
        //获取ul和li
        var parul = this.obj.parents('.unstyled');
        var parli = this.obj.parents('.unstyled li');
        //获取当前选项位置
        var m = $("li", parul).index(parli);
        var l = $("li", parul).length - 1;
        //图片题，最后一张图片不能与上传图片功能换位置
        if ($('li', parul).hasClass('drag-zone')){
            l = l - 1;
        }
        //如果当前选项是最后一个选项
        if (m == l) {
            loadMack({
                off: 'on',
                Limg: 0,
                text: '已经是最后一个选项',
                set: 800
            });
            return;
        }
        //下移当前选项
        parul.find('li:eq(' + (m + 1) + ')').after(parli);
        //
        var layout = this.obj.parents(".module").attr("layout");
        if (layout == "vertical") {
            $("html, body").animate({
                scrollTop: '+=' + 30
            }, 'slow');
        }
        //编辑区域跟着移动
        this.zonEdit.css({
            'top': this.obj.offset().top - 1 + 'px',
            'left': this.obj.offset().left - 1 + 'px'
        });
        //调用API
        moveObjects(getDispIndex(this.obj.parents('.module')), 'option', function (data) {
            console.log('move option down success');
        });
    },
    //td结构向上移动
    moveUpTd: function (conw, conh) {

        var parTbody = this.obj.parent().parent();
        var parRr = this.obj.parent();
        var m = $(".Ed-tr", parTbody).index(parRr);
        if (this.obj.attr('menutype') == 'row') {
            if (m == 0) {
                loadMack({
                    off: 'on',
                    Limg: 0,
                    text: '已经是第一个选项',
                    set: 800
                });
                return
            }
        }
        if (m == 0) {
            loadMack({
                off: 'on',
                Limg: 0,
                text: '已经是第一个选项',
                set: 800
            });
            return
        }
        parTbody.find('.Ed-tr:eq(' + (m - 1) + ')').before(parRr);
        $("html,body").animate({
            scrollTop: '-=' + 30
        }, 'slow');

        this.zonEdit.css({
            'top': this.obj.offset().top - 1 + 'px',
            'left': this.obj.offset().left - 1 + 'px'
        });

        if (this.type == 'row') {
            move_matrixrow(this.id, this.id, 'up');
        } else {
            move_option(this.id, this.id, 'up');
        }


    },
    //td结构向下移动
    moveDownTd: function (conw, conh) {

        var parTbody = this.obj.parent().parent();
        var parRr = this.obj.parent();
        var m = $(".Ed-tr", parTbody).index(parRr);
        var l = $(".Ed-tr", parTbody).length - 1;
        if (m == l) {
            loadMack({
                off: 'on',
                Limg: 0,
                text: '已经是最后一个选项',
                set: 800
            });
            return
        }
        parTbody.find('.Ed-tr:eq(' + (m + 1) + ')').after(parRr);
        $("html,body").animate({
            scrollTop: '+=' + 30
        }, 'slow');

        this.zonEdit.css({
            'top': this.obj.offset().top - 1 + 'px',
            'left': this.obj.offset().left - 1 + 'px'
        });

        if (this.type == 'row') {
            move_matrixrow(this.id, this.id, 'down');
        } else {
            move_option(this.id, this.id, 'down');
        }

    },
    //td结构向左移动
    moveLeftTd: function (conw, conh) {
        //获取上下文
        var _that = this;
        var curtr = _that.obj.parent();
        var tbody = _that.obj.parents('table').find('tbody');
        //列索引
        var pos = $("td", curtr).index(_that.obj);
        if (pos == 1) {
            loadMack({
                off: 'on',
                Limg: 0,
                text: '已经是第一个选项',
                set: 800
            });
            return;
        }
        //移动表头列
        curtr.find('td:eq(' + (pos - 1) + ')').before(_that.obj);
        //逐行移动列
        $('tr', tbody).each(function (i, e) {
            var curtd = $(this).find('td:eq(' + pos + ')');
            $(this).find('td:eq(' + (pos - 1) + ')').before(curtd);
        });
        //
        _that.zonEdit.css({
            'top': _that.obj.offset().top - 1 + 'px',
            'left': _that.obj.offset().left - 1 + 'px'
        });
        //调用API
        var orders = getDispIndex(_that.obj.parents('thead'));
        moveObjects(orders, 'option', function (data) {
            console.log('move option left success');
        });
    },
    //td结构向右移动
    moveRightTd: function (conw, conh) {
        //获取上下文
        var _that = this;
        var curtr = _that.obj.parent();
        var tbody = _that.obj.parents('table').find('tbody');
        var pos = $("td", curtr).index(_that.obj);
        var count = $("td", curtr).length - 1;
        if (pos == count) {
            loadMack({
                off: 'on',
                Limg: 0,
                text: '已经是最后一个选项',
                set: 800
            });
            return
        }
        //移动表头列
        curtr.find('td:eq(' + (pos + 1) + ')').after(_that.obj);
        //逐行移动列
        $('tr', tbody).each(function (i, e) {
            var curtd = $(this).find('td:eq(' + pos + ')');
            $(this).find('td:eq(' + (pos + 1) + ')').after(curtd);
        });
        //
        _that.zonEdit.css({
            'top': _that.obj.offset().top - 1 + 'px',
            'left': _that.obj.offset().left - 1 + 'px'
        });
        //调用API
        var orders = getDispIndex(_that.obj.parents('thead'));
        moveObjects(orders, 'option', function (data) {
            console.log('move option right success');
        });
    },
    //创建上传图片弹出框
    updataImageTcc: function (conw, conh) {
        //
        $("body").unbind('click');
        //宽度
        if (!conw) {
            conw = 412
        };
        //高度
        if (!conh) {
            conh = 260
        };
        //
        var html =
            '<div class="upImage-con">' +
            '<div class="upimg-Tabs">' +
            '<div class="tabs-item selected">本地上传</div>' +
            '<div class="tabs-item">网址URL</div>' +
            '</div>' +
            '<ul class="">' +
            '<li class="upImage_img">' +
            '<div class="upImage-img-con">' + '点击“上传”，在您电脑中选择要上传的图片，每张图片上传完毕后将会自动添加到正文中 <span class="note">（图片不能大于5MB）</span>' +
            '<div class="beforeup">' +
            '<iframe src="/design/edit/upload_img_for_ck?fun=ck_img_callback" id="imgUpload" style="filter:alpha(opacity = 0);-moz-opacity:0;-khtml-opacity:0;opacity:0;position:absolute;top:0;left:0;width:92px;height:30px;"></iframe>' +
            '<div class="wjbtn">上传图片</div>' +
            '</div>' +
            '</div>' +
            '</li>' +
            '<li style="display: none;" class="upImage_url">' +
            '<div class="upImage-img-con">' +
            '<p>请在输入框里面填上要添加图片的URL</p>' +
            '<input type="text" class="nui-ipt-input"><div class="nui-ipt-buttom">添加</div>' +
            '</div>' +
            '</li>' +
            '</ul>' +
            '</div>';
        //
        var wb = new jsbox({
            onlyid: "UpdataImageTcc",
            title: false,
            conw: conw,
            conh: conh,
            title: "上传图片",
            FixedTop: 190,
            range: true,
            content: html,
            mack: true
        }).show();
        //
        $(".upimg-Tabs .tabs-item").click(function () {
            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');
            var li = $(this).parent().next().find('li');
            var m = $(".upimg-Tabs .tabs-item").index(this);
            li.hide();
            li.eq(m).show();
            if (m == 1) {
                li.find(".nui-ipt-input").focus();
            }
        });
    },
    //创建FCK高级编辑器
    createFCKEditor: function (content, obj) {
        //指代TextEdit对象
        var _this = this;
        //如果已经创建则返回
        if (_this.editor) return;
        //
        $('#EditTcc .loaddiv').html('<div class="ckedit-div"></div>');
        //初始化FCK
        this.editor = CKEDITOR.appendTo($('#EditTcc .loaddiv .ckedit-div')[0], {
            toolbar: [
                    //{ name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source'] },
                    {
                        name: 'basicstyles',
                        groups: ['basicstyles', 'cleanup'],
                        items: ['Bold', 'Italic', 'Underline', 'Strike']
                    }, {
                        name: 'paragraph',
                        groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
                        items: ['Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                    }, {
                        name: 'links',
                        items: ['Link', 'Unlink']
                    }, {
                        name: 'insert',
                        items: ['Image', 'Flash', 'Smiley']
                    }, {
                        name: 'colors',
                        items: ['TextColor', 'BGColor']
                    }, {
                        name: 'styles',
                        items: ['Font', 'FontSize']
                    }
                ],
                height: 251 //设置高度
            }, content //输入内容
        );
        // setTimeout(function() {
        //  $('.cke_button__image_icon').click(function(){
        //     _this.updataImageTcc();
        //     //_this.editor.insertHtml("<img src='http://bbsimg.meizu.net/block/79/797dbce5d44d295f9ab627bc88b8e79c.jpg'>");
        //  });
        // },1000);
        //创建失败，直接返回
        if (!this.editor) return;
        //点击删除按钮关闭
        $('#EditTcc .jsbox-close').one('mousedown', function () {
            _this.editor.destroy();
            _this.editor = null;
            _this.zonEdit.remove();
            /*$('.btn .ceng,.save_zt').remove();
            click_cq();
            e.stopPropagation();*/
        });
        //点击遮罩关闭
        setTimeout(function () {
            _this.bodyClick = _this.fckEditBodyClick;
            $('#EditTcc .editTcc_an').one('click', _this, _this.bodyClick);
        }, 400);
    },
    //
    textEditBodyClick: function (e) {
        //指代TextEdit对象
        var _this = e.data;
        var isText = /^\s+$/.test(_this.addEdit.text());
        if (_this.addEdit.text() == "" || isText) {
            var isImg = _this.addEdit.find('<img').length;
            if (isImg == 0) {
                if (_this.type == "template" || _this.type == "question") {
                    _this.saveTitle();
                } else {
                    _this.html = _this.addEdit.html();
                    _this.saveTitle();
                }
            } else {
                _this.html = _this.addEdit.html();
                _this.saveTitle();
            }
        } else {
            _this.html = _this.addEdit.html();
            _this.saveTitle();
        }
    },
    //
    textEditLiBodyClick: function (e) {
        //指代TextEdit对象
        var _this = e.data;
        var isText = /^\s+$/.test(_this.addEdit.text());
        var isImg = _this.addEdit.find('img').length;
        _this.html = _this.addEdit.html();
        if (_this.addEdit.text() == "" || isText) {
            if (isImg == 0) {
                _this.deleteOption(true);
            } else {
                _this.saveTitle();
            }
        } else {
            _this.saveTitle();
        }
    },
    //
    textEditTdBodyClick: function (e) {
        //指代TextEdit对象
        var _this = e.data;
        _this.html = _this.addEdit.html();
        var isText = /^\s+$/.test(_this.addEdit.text());
        var isImg = _this.addEdit.find('img').length;
        if (_this.addEdit.text() == "" || isText) {
            // _this.deleteOption();
            if (isImg == 0) {
                _this.deleteOption();
            } else {
                _this.saveTitle();
            }
        } else {
            _this.saveTitle();
        }
    },
    //
    fckEditBodyClick: function (e) {
        var _this = e.data;
        //获取编辑器内容
        _this.html = _this.editor.getData();
        //判断编辑内容
        var isText = /^\s+$/.test(_this.html);
        var isImg = _this.html.indexOf('<img');
        if (_this.html == "" || isText && isImg == -1) {
            if (_this.type == 'template' || _this.type == 'question' || _this.type == 'welcome' || _this.type == "closing" || _this.type == "guide") {
                _this.html = _this.addEdit.html();
                _this.saveTitle();
            } else {
                _this.deleteOption();
            }
        } else {
            _this.html = _this.editor.getData();
            _this.saveTitle();
        }
        // Destroy FCK editor
        _this.editor.destroy();
        _this.editor = null;
        //移除编辑框和蒙蔽层
        $('#EditTcc, #lightBox').remove();
    }
}

//添加&批量添加选项
function OptionOperating() {
    this.module = {};
    //this.type = undefined;
}

OptionOperating.prototype = {
    //绑定事件
    events: function () {
        //指代OptionOperating
        var _this = this;
        //向上移动
        //$('.operation-up .up').live('click', function () {
        //    _this.type = $(this).parents(".operation-up").attr("type");
        //    _this.oid = $(this).parents(".operation-up").attr("oid");
        //    _this.obj = $('#' + _this.oid);
        //    _this.moveUpLi();
        //    moveTop('#' + _this.oid);
        //    alert('up');
        //    return false;
        //});
        //向下移动
        //$('.operation-up .down').live('click', function () {
        //    _this.type = $(this).parents(".operation-up").attr("type");
        //    _this.oid = $(this).parents(".operation-up").attr("oid");
        //    _this.obj = $('#' + _this.oid);
        //    _this.moveDownLi();
        //    moveTop('#' + _this.oid);
        //    alert('down');
        //    return false;
        //});
        //添加选项时移除.zon-edit
        $('.operation-hor .add-icon-active').live('mousedown', function (e) {
            $('.zon-edit').remove();
        });
        //点击上传图片时，编辑框移除
        $('.drag-zone').live('mousedown', function (e) {
            $('.zon-edit').remove();
        });
        //添加单行
        $('.operation-hor .add-icon-active').live('click', function (e) {
            //未知
            e.stopPropagation();
            //向上找到li.module
            _this.module = $(this).parents('.module');
            //获取上下文
            var oid = _this.module.attr('oid');
            var issue = _this.module.attr('issue');
            var layout = _this.module.attr('layout');
            //如果是列显示方式，获取列数
            var columns = 0;
            if (layout == 'column') { //单选题和多选题
                columns = _this.module.attr('cols_count');
            }
            //添加
            _this.addConY(oid, issue, 1, columns);
            //进入编辑状态
            setTimeout(function () {
                _this.module.find('tr:last td:first').click();
            }, 300);
        });
        //批量编辑多行
        $('.bulk-hor').live('click', function () {
            //向上找到li.module
            var oid = $(this).parents('.poplayer').attr('oid');
            _this.module = $('.module[oid=' + oid + ']');
            //获取上下文
            var issue = _this.module.attr('issue');
            var layout = _this.module.attr('layout');
            //如果是列显示方式，获取列数
            var cols_count = 0;
            if (layout == 'column') {
                cols_count = _this.module.attr('cols_count');
            }
            //如果是默认选项则取消提交
            if ($('.poplayer[oid=' + oid + '] .bulkadd').is('.def_class')) {
                $('.jsTip-close').click();
                return;
            }
            //添加
            _this.addConY(oid, issue, 2, cols_count);
        });
        //添加单列
        $('.operation-ver .add-icon-active').live('click', function () {
            _this.module = $(this).parents('.module');
            var oid = _this.module.attr('oid');
            var issue = _this.module.attr('issue');
            setTimeout(function () {
                _this.module.find('tr:first td:last').click();
            }, 300);
            _this.addConX(oid, issue, 1);
        });
        //批量编辑多列
        $('.bulk-ver').live('click', function () {
            var oid = $(this).parents('.poplayer').attr('oid');
            _this.module = $('.module[oid=' + oid + ']');
            var issue = _this.module.attr('issue');

            //如果是默认选项则取消提交
            if ($('.poplayer[oid=' + oid + '] .bulkadd').is('.def_class')) {
                $('.jsTip-close').click();
                return;
            }

            _this.addConX(oid, issue, 2);
        });
    },
    //li结构向上移动
    moveUpLi: function (conw, conh) {
        //向上找到ul和li
        var parul = this.obj.parents('.unstyled');
        var parli = this.obj.parents('.unstyled li');
        //找到当前选项位置
        var m = $("li", parul).index(parli);
        //当前选项是第一个选项
        if (m == 0) {
            loadMack({
                off: 'on',
                Limg: 0,
                text: '已经是第一个选项',
                set: 800
            });
            return
        }
        //上移当前选项
        parul.find('li:eq(' + (m - 1) + ')').before(parli);
        //
        //var cols_count = $('[oid=' + this.id + ']').attr('layout');
        //if (cols_count == 'vertical') {
        //    $("html, body").animate({ scrollTop: '-=' + 30 }, 'slow');
        //}
        //编辑区域跟着移动
        $('.zon-edit').css({
            'top': this.obj.offset().top - 1 + 'px',
            'left': this.obj.offset().left - 1 + 'px'
        });
        //
        //move_option(this.id, this.option_id, 'up');
    },
    //li结构向下移动
    moveDownLi: function (conw, conh) {
        //向上找到ul和li
        var parul = this.obj.parents('.unstyled');
        var parli = this.obj.parents('.unstyled li');
        //找到当前选项位置
        var m = $("li", parul).index(parli);
        var l = $("li", parul).length - 1;
        //当前选项最后一个选项
        if (m == l) {
            loadMack({
                off: 'on',
                Limg: 0,
                text: '已经是最后一个选项',
                set: 800
            });
            return
        }
        //下移当前选项
        parul.find('li:eq(' + (m + 1) + ')').after(parli);
        //
        //var cols_count = $('[oid=' + this.id + ']').attr('layout');
        //if (cols_count == "vertical") {
        //    $("html, body").animate({ scrollTop: '+=' + 30 }, 'slow');
        //}
        //编辑区域跟着移动
        $('.zon-edit').css({
            'top': this.obj.offset().top - 1 + 'px',
            'left': this.obj.offset().left - 1 + 'px'
        });
        //
        //move_option(this.id, this.option_id, 'down');
    },
    //添加列
    addConX: function (oid, issue, type) {
        //指代
        var _this = this;
        //矩阵单选题/矩阵多选题/矩阵打分题
        if (type == 1) {
            //创建选项序列号
            var name_manager = new NameManager();
            name_manager.cache2(this.module, '.matrix thead td[name="option"]');
            var number = name_manager.default();
            //获取question对象
            var question = _this.module.data('model');
            var index = _this.module.find('thead .option').length + 1;
            //创建option对象
            var option = OPTION_MAP[issue];
            option.questionID = question.id;
            option.code = 'OP' + index;
            //option.code = String.fromCharCode(97 + index - 1).toUpperCase();
            option.value = issue == QUESTION_TYPE_MATRIX_SCORE ? index : null;
            option.title = '列选项' + number;
            option.dispIndex = index;
            option.orientation = 2;
            //调用API
            createOption(option, function (data) {
                //更新option对象
                option = data;
                //添加新选项到最后
                if (issue == QUESTION_TYPE_MATRIX_SINGLE) {
                    //表头添加列
                    _this.module.find('.matrix thead tr').append('<td class="T-edit-td option" name="option" oid="' + option.id + '" menutype="col">' + option.title + '</td>');
                    //每行添加列
                    _this.module.find('tbody tr').each(function (i, e) {
                        var rowopt = $(this).find("td:first").data('model');
                        $(this).append('<td><input type="radio" name="' + rowopt.id + '" /></td>');
                    });
                } else if (issue == QUESTION_TYPE_MATRIX_MULTIPLE) {
                    //表头添加列
                    _this.module.find('.matrix thead tr').append('<td class="T-edit-td option" name="option" oid="' + option.id + '" menutype="col">' + option.title + '</td>');
                    //每行添加列
                    _this.module.find('tbody tr').each(function (i, e) {
                        $(this).append('<td><input type="checkbox" name="checkbox" /></td>');
                    });
                } else {
                    //表头添加列
                    _this.module.find('.matrix thead tr').append('<td class="T-edit-td option" name="option" oid="' + option.id + '" menutype="col">' + option.title + '</td>');
                    //每行添加列
                    _this.module.find('tbody tr').each(function (i, e) {
                        $(this).append('<td><i class="iconfont">&#xe602;</i></td>');
                    });
                }
                //附加数据
                $("thead .option:last", _this.module).data('model', option);
                //触发创建文本编辑框
                //$('#' + ids[0]).click();
                //Width_mate(this.module.attr('oid'));
                //宽度处理
                //var TableW = this.module.find('.matrix .table').width();
                //this.module.find('.matrix .table').width(TableW + 90);
                //this.module.find('.matrix').scrollLeft(TableW);
            });
        } else {
            //从弹出对话框上取数据，.bulkadd为弹出对话框的textarea
            var data = $('.poplayer[oid=' + oid + '] .bulkadd').val();
            //如果输入内容为空提示错误
            if (data == "") {
                loadMack({
                    off: 'on',
                    Limg: 0,
                    text: '请输入选项名称',
                    set: 2000
                });
                return;
            }
            //输入文本分行
            var zf = data.split('\n');
            //输入行数超过最大限制则报错
            if (zf.length > 60) {
                loadMack({
                    off: 'on',
                    Limg: 0,
                    text: '每次最多只能添加60条选项',
                    set: 2000
                });
                return;
            }
            //选项名称过滤处理
            var name_manager = new NameManager();
            name_manager.cache2(this.module, '.matrix thead td[name="option"]');
            zf = name_manager.batch(zf);
            //处理后的行数为0则报错
            if (zf.length == 0) {
                $('.jsTip-close').click();
                return;
            }
            //过滤空字符串
            var aiz = [];
            for (var ai = 0; ai < zf.length; ai++) {
                if (zf[ai] == "") {
                    continue;
                }
                aiz.push(zf[ai]);
            }
            //获取对象
            var question = _this.module.data('model');
            var currentIndex = 0;
            function deleColOption(){
                if (currentIndex >= question.cols.length) {
                    newFunColSelect();
                    return;
                }
                var option = question.cols[currentIndex];
                $.ajax({
                    url:myapp.apiHost + 'option/deletex1',
                    dataType: "json",
                    contentType:'application/json;charset=utf-8',
                    type:'post',
                    data: JSON.stringify(option),
                    success:function(data){
                        currentIndex++;
                        deleColOption();
                    },
                    error:function(xhr, status, error){
                        if (onerror) onerror(error);
                    }
                });
            }
            deleColOption();
            function newFunColSelect(){
                //创建option对象数组
                var options = [];
                for (var i = 0; i < aiz.length; ++i) {
                    var option = copy_obj(OPTION_MAP[issue]);
                    option.questionID = question.id;
                    option.code = 'OP' + (1 + i);
                    //option.code = String.fromCharCode(97 + index + i - 1).toUpperCase();
                    option.value = issue == QUESTION_TYPE_MATRIX_SCORE ? (1+i) : null;
                    option.title = aiz[i];
                    option.dispIndex = (1 + i);
                    option.orientation = 2;
                    options.push(option);
                }
                //调用后台创建选项
                createOptions(options, function (data) {
                    //生成html并添加到最后
                    if (issue == QUESTION_TYPE_MATRIX_SINGLE) {
                        //行模板/列模板
                        var colstemp = '<td></td>', rowstemp = '';
                        for (var i = 0; i < data.length; ++i) {
                            colstemp += '<td class="T-edit-td option" name="option" oid="' + data[i].id + '" menutype="col">' + data[i].title + '</td>';
                            rowstemp += '<td><input type="radio" name="{{id}}" /></td>';
                        }
                        //表头添加多列
                        _this.module.find('.matrix thead tr').html('').append(colstemp);
                        //每行添加列
                        _this.module.find('tbody tr .option').each(function (i, e) {
                            $(this).siblings().remove();
                        });
                        _this.module.find('tbody tr').each(function(i,e){
                            $(this).append(rowstemp);
                        });
                    } else if (issue == QUESTION_TYPE_MATRIX_MULTIPLE) {
                        //行模板/列模板
                        var colstemp = '<td></td>', rowstemp = '';
                        for (var i = 0; i < data.length; ++i) {
                            colstemp += '<td class="T-edit-td option" name="option" oid="' + data[i].id + '" menutype="col">' + data[i].title + '</td>';
                            rowstemp += '<td><input type="checkbox" name="checkbox" /></td>';
                        }
                        //表头添加多列
                        _this.module.find('.matrix thead tr').html('').append(colstemp);
                        //每行添加列
                        _this.module.find('tbody tr .option').each(function (i, e) {
                            $(this).siblings().remove();
                        });
                        _this.module.find('tbody tr').each(function(i,e){
                            $(this).append(rowstemp);
                        });
                    } else if (issue == QUESTION_TYPE_MATRIX_SCORE) {
                        //行列模板
                        var colstemp = '<td></td>', rowstemp = '';
                        for (var i = 0; i < data.length; ++i) {
                            colstemp += '<td class="T-edit-td option" name="option" oid="' + data[i].id + '" menutype="col">' + data[i].title + '</td>';
                            rowstemp += '<td><i class="iconfont">&#xe602;</i></td>';
                        }
                        //表头添加列
                        _this.module.find('.matrix thead tr').html('').append(colstemp);
                        //每行添加列
                        _this.module.find('tbody tr .option').each(function (i, e) {
                            $(this).siblings().remove();
                        });
                        _this.module.find('tbody tr').each(function(i,e){
                            $(this).append(rowstemp);
                        });
                    }
                    //附加数据
                    for (var i = 0; i < data.length; i++) {
                        $("thead .option[oid=" + data[i].id + "]", _this.module).data('model', data[i]);
                    }
                    //关闭输入对话框，.jsTip_close为对话框的关闭按钮
                    $('.jsTip-close').click();
                    //未知
                    //try {
                    //    matrixWidthProcess(oid, question.custom_attr.column_width.parseJSON());
                    //} catch (e) {
                    //    console.log(e);
                    //}
                    //this.module.find('.matrix table').append(con);
                    //$('.jsTip-close').click();
                    //this.module.find('.matrix').scrollLeft(TableW);
                    //Width_mate(this.module.attr('oid'));
                });
            }
            //var index = _this.module.find('thead .option').length + 1;
        }
    },
    //添加行
    addConY: function (oid, issue, type, cols_count) {
        //指代
        var _this = this;
        var content = '';
        //
        var cols_width = cols_count == 0 ? 100 : (100 / cols_count);
        //单选题/多选题
        if (issue == QUESTION_TYPE_SINGLE || issue == QUESTION_TYPE_MULTIPLE) {
            //获取选项数
            var m = _this.module.find('.unstyled li').length;
            //添加单行
            if (type == 1) {
                //创建选项序号
                var name_manager = new NameManager();
                name_manager.cache(_this.module, '.unstyled li', "label[name='option']");
                var number = name_manager.default();
                //获取question对象
                var question = _this.module.data('model');
                var index = _this.module.find('.option').length + 1;
                //创建option对象
                var option = OPTION_MAP[issue];
                option.questionID = question.id;
                option.code = 'OP' + index;
                //option.code = String.fromCharCode(97 + index - 1).toUpperCase();
                option.title = '选项' + number;
                option.dispIndex = index;
                //调用API
                createOption(option, function (data) {
                    //更新option对象
                    option = data;
                    //添加到题目
                    question.options.push(option);
                    //添加新选项到最后
                    if (issue == QUESTION_TYPE_SINGLE) {
                        content =
                            '<li class="option" oid="' + option.id + '" style="width:' + cols_width + '%;">' +
                                '<input type="radio" name="radio" />' +
                                '<label id=' + option.id + ' name="option" class="T-edit-min">' + data.title + '</label>' +
                            '</li>';
                    } else {
                        content =
                            '<li class="option" oid="' + option.id + '" style="width:' + cols_width + '%;">' +
                                '<input type="checkbox" name="checkbox" />' +
                                '<label id=' + option.id + ' name="option" class="T-edit-min">' + data.title + '</label>' +
                            '</li>';
                    }
                    _this.module.find('.unstyled').append(content);
                    //附加数据
                    $(".option:last", _this.module).data('model', option);
                    //触发创建文本编辑框
                    //$('#' + ids[0]).click();
                });
            }
            //添加多行
            else {
                //从弹出对话框上取数据，.bulkadd为弹出对话框的textarea
                var data = $('.poplayer[oid=' + oid + '] .bulkadd').val();
                //如果输入内容为空提示错误
                if (data == "") {
                    loadMack({
                        off: 'on',
                        Limg: 0,
                        text: '请输入选项名称',
                        set: 2000
                    });
                    return;
                }
                //输入文本分行
                var zf = data.split('\n');
                //输入行数超过最大限制则报错
                if (zf.length > 60) {
                    loadMack({
                        off: 'on',
                        Limg: 0,
                        text: '每次最多只能添加60条选项',
                        set: 2000
                    });
                    return;
                }
                //选项名称过滤处理
                var name_manager = new NameManager();
                name_manager.cache(_this.module, '.unstyled li', "label[name='option']");
                zf = name_manager.batch(zf);
                //处理后的行数为0则报错
                if (zf.length == 0) {
                    //关闭输入对话框
                    $('.jsTip-close').click();
                    return;
                }
                //过滤空字符串
                var aiz = [];
                for (var ai = 0; ai < zf.length; ai++) {
                    if (zf[ai] == "") {
                        continue;
                    }
                    aiz.push(zf[ai]);
                }
                //获取对象
                var question = _this.module.data('model');
                var currentIndex = 0;
                function deleOption(){
                   if (currentIndex >= question.options.length) {
                       newFunSelect();
                       return;
                   }
                   
                    console.log("单选题批量添加选项");
                    debugger;
                    var option = question.options[currentIndex];
                    var paramaData = {};
					paramaData['data'] = JSON.stringify(option);
					//paramaData['data'] = JSON.stringify("xxxxxx");
                    $.ajax({
                        url:myapp.myweb + 'option/delete',
                        dataType: "json",
                        contentType:'application/x-www-form-urlencoded;charset=utf-8',
                        type:'post',
                        data: paramaData,
                         beforeSend: function(request) {
				            request.setRequestHeader("ticket", myapp.ticket);
				        },
                        success:function(data){
                            currentIndex++;
                            deleOption();
                        },
                        error:function(xhr, status, error){
                            if (onerror) onerror(error);
                        }
                    })
                }
                deleOption();
               /* deleteOption(question.options,function(data){
                   question.options = data;
                    var index = _this.module.find('.option').length + 1;

                });*/
                function newFunSelect(){
                    //创建option对象数组
                    var options = [];
                    for (var i = 0; i < aiz.length; ++i) {
                        var option = copy_obj(OPTION_MAP[issue]);
                        option.questionID = question.id;
                        option.title = aiz[i];
                        option.code = 'OP' + ( i + 1 );
                        option.dispIndex = ( i + 1 );
                        options.push(option);
                    }
                    //question.options = [];
                    //调用后台创建选项
                    createOptions(options, function (data) {
                        //生成html并添加到最后
                        for (var i = 0; i < data.length; i++) {
                            //添加到题目
                            question.options.push(data[i]);
                            if (issue == QUESTION_TYPE_SINGLE) {
                                content +=
                                    '<li class="option" oid="' + data[i].id + '" style="width:' + cols_width + '%;">' +
                                    '<input type="radio" name="radio" />' +
                                    '<label id=' + data[i].id + ' name="option" class="T-edit-min">' + data[i].title + '</label>' +
                                    '</li>';
                            } else {
                                content +=
                                    '<li class="option" oid="' + data[i].id + '" style="width:' + cols_width + '%;">' +
                                    '<input type="checkbox" name="checkbox" />' +
                                    '<label id=' + data[i].id + ' name="option" class="T-edit-min">' + data[i].title + '</label>' +
                                    '</li>';
                            }
                        }
                        _this.module.find('.unstyled').html('').append(content);
                        //附加数据
                        for (var i = 0; i < data.length; i++) {
                            $(".option[oid=" + data[i].id + "]", _this.module).data('model', data[i]);
                        }
                        //关闭输入对话框，.jsTip_close为对话框的关闭按钮
                        $('.jsTip-close').click();
                    });
                }
            }
        }
        //矩阵单选题/矩阵多选题/矩阵打分题
        else if (issue == QUESTION_TYPE_MATRIX_SINGLE || issue == QUESTION_TYPE_MATRIX_MULTIPLE || issue == QUESTION_TYPE_MATRIX_SCORE) {
            //添加单行
            if (type == 1) {
                //创建选项序号
                var name_manager = new NameManager();
                name_manager.cache2(this.module, '.matrix tbody td[name="option"]');
                var number = name_manager.default();
                //获取model对象
                var question = _this.module.data('model');
                var index = _this.module.find('tbody .option').length + 1;
                //创建option对象
                var option = OPTION_MAP[issue];
                option.questionID = question.id;
                option.code = 'IX' + index;
                //option.code = String.fromCharCode(97 + index - 1).toUpperCase();
                option.title = '行选项' + number;
                option.dispIndex = index;
                option.orientation = 1;
                //调用API
                createOption(option, function (data) {
                    //更新option对象
                    option = data;
                    //添加新选项到最后
                    if (issue == QUESTION_TYPE_MATRIX_SINGLE) {
                        var temp = '', cols = _this.module.find('thead .option').length;
                        for (var i = 0; i < cols; i++)
                            temp += '<td><input type="radio" name="' + option.id + '" /></td>';
                        content =
                            '<tr class="Ed-tr">' +
                                '<td class="T-edit-td option" name="option" oid="' + option.id + '" menutype="row" style="text-align: left;">' + option.title + '</td>' +
                                temp +
                            '</tr>';
                    } else if (issue == QUESTION_TYPE_MATRIX_MULTIPLE) {
                        var temp = '', cols = _this.module.find('thead .option').length;
                        for (var i = 0; i < cols; i++)
                            temp += '<td><input type="checkbox" name="checkbox" /></td>';
                        content =
                            '<tr class="Ed-tr">' +
                                '<td class="T-edit-td option" name="option" oid="' + option.id + '" menutype="row" style="text-align: left;">' + option.title + '</td>' +
                                temp +
                            '</tr>';
                    } else {
                        var temp = '', cols = _this.module.find('thead .option').length;
                        for (var i = 0; i < cols; i++)
                            temp += '<td><i class="iconfont">&#xe602;</i></td>';
                        content =
                            '<tr class="Ed-tr">' +
                                '<td class="T-edit-td option" name="option" oid="' + option.id + '" menutype="row" style="text-align: left;">' + option.title + '</td>' +
                                temp +
                            '</tr>';
                    }
                    _this.module.find('tbody').append(content);
                    //附加数据
                    $("tbody .option:last", _this.module).data('model', option);
                    //触发创建文本编辑框
                    //$('#' + ids[0]).click();
                });
            }
            //添加多行
            else {
                //从弹出对话框上取数据，.bulkadd为弹出对话框的textarea
                var data = $('.poplayer[oid=' + oid + '] .bulkadd').val();
                //如果输入内容为空提示错误
                if (data == "") {
                    loadMack({
                        off: 'on',
                        Limg: 0,
                        text: '请输入选项名称',
                        set: 2000
                    });
                    return;
                }
                //输入文本分行
                var zf = data.split('\n');
                //输入行数超过最大限制则报错
                if (zf.length > 60) {
                    loadMack({
                        off: 'on',
                        Limg: 0,
                        text: '每次最多只能添加60条选项',
                        set: 2000
                    });
                    return;
                }
                //选项名称过滤处理
                var name_manager = new NameManager();
                name_manager.cache2(this.module, '.matrix tbody td[name="option"]');
                zf = name_manager.batch(zf);
                //处理后的行数为0则报错
                if (zf.length == 0) {
                    //关闭输入对话框
                    $('.jsTip-close').click();
                    return;
                }
                //过滤空字符串
                var aiz = [];
                for (var ai = 0; ai < zf.length; ai++) {
                    if (zf[ai] == "") {
                        continue;
                    }
                    aiz.push(zf[ai]);
                }
                //获取model对象
                var question = _this.module.data('model');
                var currentIndex = 0;
                function deleRowOption(){
                    if (currentIndex >= question.rows.length) {
                        newFunRowSelect();
                        return;
                    }
                    var option = question.rows[currentIndex];
                    $.ajax({
                        url:myapp.apiHost + 'option/deletex3',
                        dataType: "json",
                        contentType:'application/json;charset=utf-8',
                        type:'post',
                        data: JSON.stringify(option),
                        success:function(data){
                            currentIndex++;
                            deleRowOption();
                        },
                        error:function(xhr, status, error){
                            if (onerror) onerror(error);
                        }
                    });
                }
                deleRowOption();
                function newFunRowSelect(){
                    //创建option对象数组
                    var options = [];
                    for (var i = 0; i < aiz.length; ++i) {
                        var option = copy_obj(OPTION_MAP[issue]);
                        option.questionID = question.id;
                        option.title = aiz[i];
                        option.code = 'IX' + (1 + i);
                        option.dispIndex = (1 + i);
                        option.orientation = 1;
                        options.push(option);
                    }
                    //question.options = [];
                    //调用后台创建选项
                    createOptions(options, function (data) {
                        //生成html并添加到最后
                        if (issue == QUESTION_TYPE_MATRIX_SINGLE) {
                            //行模板
                            var temp = '', cols = _this.module.find('thead .option').length;
                            for (var i = 0; i < cols; i++)
                                temp += '<td><input type="radio" name="{{id}}" /></td>';
                            //构造行
                            for (var i = 0; i < data.length; i++) {
                                content +=
                                    '<tr class="Ed-tr">' +
                                    '<td class="T-edit-td option" name="option" oid="' + data[i].id + '" menutype="row" style="text-align: left;">' + data[i].title + '</td>' +
                                    temp.replace(/{{id}}/g, data[i].id) +
                                    '</tr>';
                            }
                        } else if (issue == QUESTION_TYPE_MATRIX_MULTIPLE) {
                            //行模板
                            var temp = '', cols = _this.module.find('thead .option').length;
                            for (var i = 0; i < cols; i++)
                                temp += '<td><input type="checkbox" name="checkbox" /></td>';
                            //构造行
                            for (var i = 0; i < data.length; i++) {
                                content +=
                                    '<tr class="Ed-tr">' +
                                    '<td class="T-edit-td option" name="option" oid="' + data[i].id + '" menutype="row" style="text-align: left;">' + data[i].title + '</td>' +
                                    temp +
                                    '</tr>';
                            }
                        } else {
                            //行模板
                            var temp = '', cols = _this.module.find('thead .option').length;
                            for (var i = 0; i < cols; i++)
                                temp += '<td><i class="iconfont">&#xe602;</i></td>';
                            //构造行
                            for (var i = 0; i < data.length; i++) {
                                content +=
                                    '<tr class="Ed-tr">' +
                                    '<td class="T-edit-td option" name="option" oid="' + data[i].id + '" menutype="row" style="text-align: left;">' + data[i].title + '</td>' +
                                    temp +
                                    '</tr>';
                            }
                        }
                        _this.module.find('tbody').html('').append(content);
                        //附加数据
                        for (var i = 0; i < data.length; i++) {
                            $("tbody .option[oid=" + data[i].id + "]", _this.module).data('model', data[i]);
                        }
                        //关闭输入对话框，.jsTip_close为对话框的关闭按钮
                        $('.jsTip-close').click();
                    });
                }
                //var index = _this.module.find('tbody .option').length + 1;
            }
        }
        //打分题
        else if (issue == QUESTION_TYPE_SCORE) {
            //添加单行
            if (type == 1) {
                //创建选项序号
                //var name_manager = new NameManager();
                //name_manager.cache(this.module, '.unstyled li', "label[name='option']");
                //var number = name_manager.default();
                //获取model对象
                var question = _this.module.data('model');
                var index = _this.module.find('.option').length + 1;
                //创建option对象
                var option = OPTION_MAP[issue];
                option.questionID = question.id;
                option.code = 'OP' + index;
                //option.code = String.fromCharCode(97 + index - 1).toUpperCase();
                option.value = index;
                option.title = '选项' + index;
                option.dispIndex = index;
                //调用API
                createOption(option, function (data) {
                    //更新option对象
                    option = data;
                    //添加新选项到最后
                    content =
                        '<li class="option" oid="' + option.id + '" style="">' +
                            '<input type="radio" name="radio" />' +
                            '<label>' + index + '分 - </label>' +
                            '<label class="T-edit-min" for="" name="option" id="' + option.id + '">选项' + index + '</label>' +
                        '</li>';
                    _this.module.find('.unstyled').append(content);
                    //附加数据
                    $(".option:last", _this.module).data('model', option);
                    //触发创建文本编辑框
                    //setTimeout(function () { $('#' + ids[0]).click(); }, 300);
                });
            }
                //添加多行
            else {
                //从弹出对话框上取数据，.bulkadd为弹出对话框的textarea
                var data = $('.poplayer[oid=' + oid + '] .bulkadd').val();
                //如果输入内容为空提示错误
                if (data == "") {
                    loadMack({
                        off: 'on',
                        Limg: 0,
                        text: '请输入选项名称',
                        set: 2000
                    });
                    return;
                }
                //输入文本分行
                var zf = data.split('\n');
                //输入行数超过最大限制则报错
                if (zf.length > 60) {
                    loadMack({
                        off: 'on',
                        Limg: 0,
                        text: '每次最多只能添加60条选项',
                        set: 2000
                    });
                    return;
                }
                //选项名称过滤处理
                var name_manager = new NameManager();
                name_manager.cache(this.module, '.unstyled li', "label[name='option']");
                zf = name_manager.batch(zf);
                //处理后的行数为0则报错
                if (zf.length == 0) {
                    //关闭输入对话框
                    $('.jsTip-close').click();
                    return;
                }
                //过滤空字符串
                var aiz = [];
                for (var ai = 0; ai < zf.length; ai++) {
                    if (zf[ai] == "") {
                        continue;
                    }
                    aiz.push(zf[ai]);
                }
                function newFunScore(){
                    //创建option对象数组
                    var options = [];
                    for (var i = 0; i < aiz.length; ++i) {
                        var option = copy_obj(OPTION_MAP[issue]);
                        option.questionID = question.id;
                        option.code = String.fromCharCode(97 + i).toUpperCase();
                        option.value = (1 + i);
                        option.title = aiz[i];
                        option.dispIndex = (1 + i) ;
                        options.push(option);
                    }
                    //调用后台创建选项
                    createOptions(options, function (data) {
                        //生成html并添加到最后
                        for (var i = 0; i < data.length; i++) {
                            content +=
                                '<li class="option" oid="' + data[i].id + '" style="">' +
                                '<input type="radio" name="radio" />' +
                                '<label>' + data[i].value + '分 - </label>' +
                                '<label class="T-edit-min" for="" name="option" id="' + data[i].id + '">' + data[i].title + '</label>' +
                                '</li>';
                        }
                        _this.module.find('.unstyled').html('').append(content);
                        //附加数据
                        for (var i = 0; i < data.length; i++) {
                            $(".option[oid=" + data[i].id + "]", _this.module).data('model', data[i]);
                        }
                        //关闭输入对话框，.jsTip_close为对话框的关闭按钮
                        $('.jsTip-close').click();
                    });
                }
                //获取question对象
                var question = _this.module.data('model');
                var currentIndex = 0;
                function deleScoreOption(){
                    if (currentIndex >= question.options.length) {
                        newFunScore();
                        return;
                    }
                    var option = question.options[currentIndex];
                    $.ajax({
                        url:myapp.apiHost + 'option/deletex4',
                        dataType: "json",
                        contentType:'application/json;charset=utf-8',
                        type:'post',
                        data: JSON.stringify(option),
                        success:function(data){
                            currentIndex++;
                            deleScoreOption();
                        },
                        error:function(xhr, status, error){
                            if (onerror) onerror(error);
                        }
                    })
                }
                deleScoreOption();
            }
        }
        //多项填空题
        else if (issue == QUESTION_TYPE_MULTIPLE_BLANK) {
            var m = _this.module.find('.unstyled li').length;
            //添加单行
            if (type == 1) {
                //创建选项序号
                var name_manager = new NameManager();
                name_manager.cache(_this.module, '.unstyled li', "label[name='option']");
                var number = name_manager.default();
                //获取question对象
                var question = _this.module.data('model');
                var index = _this.module.find('.option').length + 1;
                //创建option对象
                var option = OPTION_MAP[issue];
                option.code = 'FB' + index;
                option.questionID = question.id;
                option.title = '填空' + index;
                option.dispIndex = index;
                //调用API
                createOption(option, function (data) {
                    //更新option对象
                    option = data;
                    //添加新选项到最后
                    content =
                        '<li class="option" oid="' + option.id + '" style="width:' + cols_width + '%;">' +
                            '<label id=' + option.id + ' name="option" class="T-edit-min">' + data.title + '</label>' +
                            '<input type="text">'
                        '</li>';

                    _this.module.find('.unstyled').append(content);
                    //附加数据
                    $(".option:last", _this.module).data('model', option);
                })
            } else {
                //从弹出对话框上取数据，.bulkadd为弹出对话框的textarea
                var data = $('.poplayer[oid=' + oid + '] .bulkadd').val();
                //如果输入内容为空提示错误
                if (data == "") {
                    loadMack({
                        off: 'on',
                        Limg: 0,
                        text: '请输入选项名称',
                        set: 2000
                    });
                    return;
                }
                //输入文本分行
                var zf = data.split('\n');
                //输入行数超过最大限制则报错
                if (zf.length > 60) {
                    loadMack({
                        off: 'on',
                        Limg: 0,
                        text: '每次最多只能添加60条选项',
                        set: 2000
                    });
                    return;
                }
                //选项名称过滤处理
                var name_manager = new NameManager();
                name_manager.cache(_this.module, '.unstyled li', "label[name='option']");
                zf = name_manager.batch(zf);
                //处理后的行数为0则报错
                if (zf.length == 0) {
                    //关闭输入对话框
                    $('.jsTip-close').click();
                    return;
                }
                //过滤空字符串
                var aiz = [];
                for (var ai = 0; ai < zf.length; ai++) {
                    if (zf[ai] == "") {
                        continue;
                    }
                    aiz.push(zf[ai]);
                }
                //获取model对象
                var question = _this.module.data('model');
                var currentIndex = 0;
                function deleBlankOption(){
                    if (currentIndex >= question.options.length) {
                        newBlankFun();
                        return;
                    }
                    var option = question.options[currentIndex];
                    $.ajax({
                        url:myapp.apiHost + 'option/deletex5',
                        dataType: "json",
                        contentType:'application/json;charset=utf-8',
                        type:'post',
                        data: JSON.stringify(option),
                        success:function(data){
                            currentIndex++;
                            deleBlankOption();
                        },
                        error:function(xhr, status, error){
                            if (onerror) onerror(error);
                        }
                    })
                }
                deleBlankOption();
                function newBlankFun(){
                    //创建option对象数组
                    var options = [];
                    for (var i = 0; i < aiz.length; ++i) {
                        var option = copy_obj(OPTION_MAP[issue]);
                        option.questionID = question.id;
                        option.code = 'FB' + (1 + i);
                        option.title = aiz[i];
                        option.dispIndex = (1 + i);
                        options.push(option);
                    }
                    //调用后台创建选项
                    createOptions(options, function (data) {
                        //生成html并添加到最后
                        for (var i = 0; i < data.length; i++) {
                            //添加到题目
                            question.options.push(data[i]);
                            content +=
                                '<li class="option" oid="' + data[i].id + '" style="width:' + cols_width + '%;">' +
                                '<label id=' + data[i].id + ' name="option" class="T-edit-min">' + data[i].title + '</label>' +
                                '<input type="text">'
                            '</li>';
                        }
                        _this.module.find('.unstyled').html('').append(content);
                        //附加数据
                        for (var i = 0; i < data.length; i++) {
                            $(".option[oid=" + data[i].id + "]", _this.module).data('model', data[i]);
                        }
                        //关闭输入对话框，.jsTip_close为对话框的关闭按钮
                        $('.jsTip-close').click();
                    });
                }
                //var index = _this.module.find('.option').length + 1;
            }
        }
    }
}

//更新题目编号
function updateSequence() {
    //遍历题目，更新题目序号
    $('.dragwen .setup-group h4').each(function (i, e) {
        $(this).text('Q' + (i + 1));
    });
    //获取分页的数量
    var m = $('.dragwen > .paging span').length;
    //遍历分组，更新页码
    $('.dragwen > .paging').each(function (i, e) {
        $(this).find('span').text((i + 1) + '/' + (m + 1));
    });
    //更新最后页码
    $('.ul-tail .paging span').text((m + 1) + '/' + (m + 1));
}

//附加数据
function attachData(module, question) {
    //附加question
    module.data('model', question);
    //附加option
    if (question.type == QUESTION_TYPE_MATRIX_SINGLE ||
        question.type == QUESTION_TYPE_MATRIX_MULTIPLE ||
        question.type == QUESTION_TYPE_MATRIX_SCORE) {
        //列选项
        for (var j = 0; j < question.cols.length; ++j) {
            var option = question.cols[j];
            var container = $('.option[oid=' + option.id + ']', module);
            container.data('model', option);
        }
        //行选项
        for (var j = 0; j < question.rows.length; ++j) {
            var option = question.rows[j];
            var container = $('.option[oid=' + option.id + ']', module);
            container.data('model', option);
        }
    } else {
        for (var j = 0; j < question.options.length; ++j) {
            var option = question.options[j];
            //附加数据
            var container = $('.option[oid=' + option.id + ']', module);
            container.data('model', option);
            $('.qimg-con img', container).attr('maxsrc',myapp.resHost + option.imageUrl);
            $('.qimg-con img', container).attr('src',myapp.resHost + option.imageUrl);
            //创建form
            if (question.type == QUESTION_TYPE_IMAGE_SINGLE || question.type == QUESTION_TYPE_IMAGE_MULTIPLE)
                imageOption.createAjaxForm(container, option);
        }
    }
}

//获取题目或选项的顺序，返回对象数组
function getDispIndex(container) {
    var orders = [];
    if (container == null) {
        //题目
        $('.dragwen .question').each(function (i, e) {
            var question = $(e).data('model');
            question.dispIndex = (i + 1);
            orders.push({
                id: question.id,
                dispIndex: question.dispIndex,
            });
        });
    } else {
        //选项
        container.find('.option').each(function (i, e) {
            var option = $(e).data('model');
            option.dispIndex = (i + 1);
            orders.push({
                id: option.id,
                dispIndex: option.dispIndex,
            });
        });
    }
    return orders;
}

/*
  计算题目所在分组的序号，从0开始
  item: 题目
*/
function groupNumber(item) {
    var obj = item;
    //获取题目的位置
    var index = $('.dragwen .module').index(obj);
    //题目所在分组的序号
    var m = 0;
    //遍历题目和分组
    $('.dragwen > li').each(function (i, element) {
        //只遍历到传入的题目
        if (i >= index) {
            return false;
        }
        //
        if ($(this).hasClass('paging')) {
            //序号加1
            m += 1;
        }
    });
    //返回序号
    return m;
}

//表格宽度处理

function Width_mate(oid) {

    var obj = $('li[oid="' + oid + '"]');
    var objTable = $('table tr:eq(0) td', obj);
    var l = objTable.length;
    var mean_width = 80 / (l - 1);
    var w = $('table', obj).width();
    objTable.each(function (index, element) {
        if (index == 0) {
            $(this).attr('width', (20 / 100) * w + 'px');
        } else {
            $(this).attr('width', (mean_width / 100) * w + 'px');
        }
    });

}

//jquery插件
;
(function ($) {
    $.fn.extend({
        "MenuFixed": function (obj, top) {
            function Mf() {
                var scrollT = $(this).scrollTop();
                if (scrollT > top) {
                    //obj.attr('style','position:absolute; top:'+(scrollT-80)+'px;');
                    obj.attr('style', 'position:fixed; top:2px;');
                } else {
                    obj.attr('style', '');
                }
            }
            Mf();
            $(window).scroll(function () {
                Mf();
            });

        }
    });
})(jQuery);

//初始化题目设置

var jsBubble = new JsBubble();

//初始化问卷设计模块
var tempalteDesign = new TempalteDesign({
    dragObj: ".moduleL",
    dropArea: ".dragwen"
});
tempalteDesign.drag();

//文字编辑
var textEdit = new TextEdit();
textEdit.textEdit();
textEdit.textEditLi();
textEdit.textEditTd();

//问卷设置
var questionOperating = new QuestionOperating();
questionOperating.events(textEdit);

//添加选项
var optionOperating = new OptionOperating();
optionOperating.events();

$(function () {
    //固定菜单  
    $().MenuFixed($('.rows1'), 176);
    //菜单切换
    $(".accordion-group h4").click(function () {
        $(this).find('i').toggleClass("icon-on");
        $(this).siblings("h4").find('i').removeClass("icon-on");
        $(this).next("ul").slideToggle("slow")
            .siblings("ul:visible").slideUp("slow");
    });
});

//高级编辑图片上传回调方法
function ck_img_callback(data) {
    if (!data.error_msg == "") {
        loadMack({
            off: 'on',
            Limg: 0,
            text: data.error_msg,
            set: 2500
        });
        return false;
    }
    textEdit.editor.insertHtml('<img onclick="alert(123)" src="' + data.img_url + '">');
    $('#UpdataImageTcc .jsbox-close').click();
}

//
$(function () {
    $('.nui-ipt-buttom').live('click', function () {
        var url = $(this).parent().find(".nui-ipt-input").val();
        var img = new Image();

        img.onload = function () {
            if (img.width > 750) {
                var w = 750;
            } else {
                var w = img.width;
            }
            textEdit.editor.insertHtml('<img width="' + w + '" src="' + url + '">');
            $('#UpdataImageTcc .jsbox-close').click();
        };
        img.onerror = function () {
            loadMack({
                off: 'on',
                Limg: 0,
                text: "图片地址不存在",
                set: 2500
            });
        }
        img.src = url;
    });

});

//图片太小调节
function ImgEditSize(obj) {
    this.main = function (obj) {
        this.obj = $(obj);
        this.event();
    }
    this.status = true;
    this.status_menu = true;
    this.event = function () {
        var _this = this;
        this.obj.mouseover(function () {
            _this.status_menu = false;
            if (_this.Menu) {
                _this.DelMenu()
            };
            _this.addMenu();
        });
        this.obj.mouseout(function () {
            setTimeout(function () {
                _this.DelMenu();
            }, 50);
        });

    }
    this.addMenu = function () {
        var _this = this;
        this.Menu = $('<div class="ImgEditSize"><ul>' +
            '<li class="Enl" title="放大"></li>' +
            '<li class="Ori" title="原图"></li>' +
            '<li class="Nar" title="缩小"></li>' +
            '<li class="del" title="删除"></li>' +
            '</ul></div>');


        $('body').append(_this.Menu);
        this.Menu.css({
            'position': 'absolute',
            'top': _this.obj.offset().top + 5 + 'px',
            'left': _this.obj.offset().left + 5 + 'px'
        });
        this.Menu.hover(function () {
            _this.status = false;
        }, function () {
            _this.status = true;
            _this.status_menu = true;
            setTimeout(function () {
                if (_this.status_menu) {
                    _this.DelMenu();
                }
            }, 200);

        });
        this.Menu.find(".Enl").click(function () {
            var width = _this.obj.width();
            var height = _this.obj.height();
            var xs = width / height;
            if (width >= 750) {
                return false
            };
            _this.getImgWH(width + 20 * xs, height + 20);
            return false;
        });
        this.Menu.find(".Ori").click(function () {
            var img = _this.imgSize(_this.obj.attr('src'));

            return false;
        });
        this.Menu.find(".Nar").click(function () {
            var width = _this.obj.width();
            var height = _this.obj.height();
            var xs = width / height;
            if (width <= 100) {
                return false
            };
            _this.getImgWH(width - 20 * xs, height - 20);
            return false;
        });
        this.Menu.find(".del").click(function () {
            _this.obj.remove();
            _this.status = true;
            _this.DelMenu();
            return false;
        });
    }
    this.getImgWH = function (w, h) {

        this.obj.width(w);
        this.obj.height(h);
    }
    this.DelMenu = function () {
        if (this.status) {
            this.Menu.remove();
        }
    }
    this.imgSize = function (src) {
        var _this = this;
        var imgObj = new Image();
        imgObj.onload = function () {
            _this.getImgWH(imgObj.width, imgObj.height);
        }
        imgObj.src = src;
    }
    return this.main(obj);
}

//新手帮助

function Help_up() {
    var content = $('<div class="Help-up"><div class="close-help"></div></div>');
    var html_h = $("body").height();
    var wid_h = $(window).height();
    var mack_h = '';
    html_h > wid_h ? mack_h = html_h : mack_h = wid_h;

    var con = $('<div id="lightBox" class="popupComponent maptss_lightBox" style="display: block; height:' + mack_h + '+px;"><div class="popupCover"></div></div>');

    $('body').append(con);
    $('.container-fluid ').append(content);
    var conH = $('.jsbox').height();
    var conTop = 69;
    var conLeft = 16;
    $('.Help-up').css({
        'top': conTop + 'px',
        'left': conLeft + 'px'
    });
    $('html').css({
        'overflowY': 'hidden'
    });

    $('.close-help').live('click', function () {
        con.remove();
        content.remove();
        $('html').attr('style', '');
    });

}

//选项名称管理
function NameManager() {
    this._options = [];
    this._numbers = [];
    this._batch_data = [];
    //this.number = -1;
    this.tsm = 0; //批量添加选项重复数
    this.tsmC = 0; //批量添加选项成功数
    //选项存储
    this.cache = function (module, class_li, class_label) {
        var _this = this;
        module.find(class_li).each(function (index, element) {
            var text = $(class_label, $(this)).text();
            _this._options.push(text);
        });
    };
    //选项存储
    this.cache2 = function (module, class_label) {
        var _this = this;
        module.find(class_label).each(function (index, element) {
            _this._options.push($(this).text());
        });
    };
    //选项编辑重复判断
    this.duplicate = function (val) {
        for (var i = 0; i < this._options.length; i++) {
            if (this._options[i] == val)
                return true;
        }
        return false;
    };
    //缺省名称处理
    this.default = function () {
        //从选项名称提取序号
        var reg = /(\d+)/g;
        for (var i = 0; i < this._options.length; i++) {
            if (/^选项\d+$/.test(this._options[i]) ||
                /^矩阵行\d+$/.test(this._options[i]) ||
                /^行选项\d+$/.test(this._options[i]) ||
                /^列选项\d+$/.test(this._options[i]) ||
                /^请打分\d+$/.test(this._options[i]) ||
                /^请填空\d+$/.test(this._options[i])) {
                this._numbers.push(this._options[i].match(reg) * 1);
            }
        };
        //唯一
        this._numbers = this._numbers.unique();
        //如果选项/序号不存在
        if (this._numbers.length == 0) {
            return 1;
        };
        //排序
        this._numbers.sort(this._compare);
        var number = -1;
        //找到缺失的序号
        for (var i = 0; i < this._numbers.length; i++) {
            if (this._numbers[i] !== (i + 1)) {
                number = i + 1;
                break;
            }
        }
        //未找到缺失的序号，则用下一个序号
        if (number == -1) {
            number = this._numbers[this._numbers.length - 1] + 1;
        }
        //
        return number;
    };
    //名称批量处理
    this.batch = function (data) {
        this._batch_data = [];
        this.tsm = 0;
        this.tsm = 0;
        var sbt = -1;
        var tsm = 0;
        for (var m = 0; m < data.length; m++) {
            var Dmt = data[m].trim();
            if (Dmt !== "") {
                this.tsmC += 1;
                this._batch_data.push(Dmt);
            }
        }
        //
        return this._batch_data;
    };
    //比较算法
    this._compare = function (value1, value2) {
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}

//去除字符串左右空格

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

//数组去重

Array.prototype.unique = function () {
    var n = []; //一个新的临时数组
    for (var i = 0; i < this.length; i++) //遍历当前数组
    {
        if (n.indexOf(this[i]) == -1) n.push(this[i]);
    }
    return n;
}

//js原生事件注册

var EventUtil = {
    //增加事件处理函数
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    //移除事件处理函数    
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
}

//设置上下文（右面板）

function setPanelContext(type, issue, oid, model) {
    $(".right-operate").attr("type", type);
    $(".right-operate").attr("issue", issue);
    $(".right-operate").attr("oid", oid);
    $(".right-operate").data("model", model);
    $(".right-operate").data("logic", null);
}

//隐藏/显示（右面板）
function initRightOperate() {
    if ($(".right-operate .panel-box").is(':hidden') &&
        $(".right-operate .jump-box").is(':hidden') &&
        $(".right-operate .ref-box").is(':hidden')) {
        //moveLeft();
        return true;
    } else {
        return false;
    }
}

/*
    通用设置（右面板）
    title: 标题
    content: 要插入的内容
*/
function setupSetting(title, content) {
    $(".right-operate .panel-box").empty();
    $(".right-operate .bt").html(title);
    if (content != "") {
        $(".right-operate .panel-box").html(content);
        $(".right-operate .panel-box").show();
        //$(".right-operate .btn").show();
    } else {
        $(".right-operate .panel-box").hide();
        //$(".right-operate .btn").hide();
    }
}

/*
    跳题设置（右面板）
    show: 是否显示
    type: question or option
*/
function setupJumpover(show, type, question) {
    if (show) {
        if (type == 1) {
            if (question.type == QUESTION_TYPE_MULTIPLE || question.type == QUESTION_TYPE_IMAGE_MULTIPLE) {
                $(".jump-btn.question.complex").show();
                $(".jump-btn.question.count").show();
                $(".jump-btn.question.simple").hide();
            } else if (question.type == QUESTION_TYPE_SINGLE_BLANK || question.type == QUESTION_TYPE_MULTIPLE_LINE_BLANK || question.type == QUESTION_TYPE_MULTIPLE_BLANK) {
                $(".jump-btn.question.complex").hide();
                $(".jump-btn.question.count").hide();
                $(".jump-btn.question.simple").hide();
            } else if (question.type == QUESTION_TYPE_SINGLE || question.type == QUESTION_TYPE_IMAGE_SINGLE) {
                $(".jump-btn.question.simple").show();
                $(".jump-btn.question.complex").hide();
                $(".jump-btn.question.count").hide();
            } else if (question.type == QUESTION_TYPE_SCORE || question.type == QUESTION_TYPE_MATRIX_SCORE) {
                $(".jump-btn.question.simple").hide();
                $(".jump-btn.question.complex").hide();
                $(".jump-btn.question.count").hide();
            }
            $(".jump-btn.question.uncond").show();
            $(".jump-btn.option").hide();
        } else {
            if (question.type == QUESTION_TYPE_MATRIX_SINGLE) {
                $(".jump-btn.option.simple").show();
                $(".jump-btn.option.complex").hide();
                $(".jump-btn.option.count").hide();
            } else if (question.type == QUESTION_TYPE_MATRIX_MULTIPLE) {
                $(".jump-btn.option.simple").hide();
                $(".jump-btn.option.complex").show();
                $(".jump-btn.option.count").show();
            } else {
                $(".jump-btn.option.simple").show();
                $(".jump-btn.option.complex").hide();
                $(".jump-btn.option.count").hide();
            }
            $(".jump-btn.option.uncond").hide();
            $(".jump-btn.question").hide();
        }
        //$(".jump-btn").removeClass('option').removeClass('question').addClass(type == 1 ? 'question' : 'option');
        $(".jump-box").show();
        $(".lj-tip2").show();
    } else {
        $(".jump-btn").hide();
        $(".jump-box").hide();
        $(".lj-tip2").hide();
    }
}

/*
    引用设置（右面板）
    show: 是否显示
    type: question or option
*/
function setupReference(show, type) {
    if (show) {
        $(".ref-box").show();
        $(".ref-tip").show();
        //$(".ref-btn").removeClass('option').removeClass('question').addClass(type == 1 ? 'question' : 'option');
    } else {
        $(".ref-box").hide();
        $(".ref-tip").hide()
    }
}

/*
*/
function matchTextRemove(array) {
    var need_fill = true;
    var text_reg = /[选项|矩阵行|请打分|请填空](\d{1})$/;
    if (array.length == 2) {
        for (var i = 0; i < 2; i++) {
            if (text_reg.test(array[i])) {
                // if (/^选项|矩阵行|请打分|请填空([1-2])$/.test(array[i]) || /^[1-2]$/.test(array[i])|| /^请打分\d+$/.test(array[i])|| /^请填空\d+$/.test(array[i])){        
                var text_num = parseInt(array[i].match(text_reg)[1]);
                if (text_num == i + 1) { } else {
                    need_fill = false;
                }
            } else {
                need_fill = false;
            }
        };
    } else {
        need_fill = false;
    }
    return need_fill;
}