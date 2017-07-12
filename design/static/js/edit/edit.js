jQuery(document).ready(function ($) {
    //----绑定事件---

    $(".ajaxGet").die().live("click", ajaxGet);

    $(".ajaxPost").die().live("click", function () {
        var func_name = $(this).attr("func");
        var func = null;
        if (isNotEmpty(func_name)) {
            eval("func = " + func_name);
            if (isNotEmpty(func)) {
                func();
            }
        }
    });

    $(".ajaxSubmit").die().live("submit", ajaxSubmit);

    //初始化题目
    initQuestionPanel();
    //
    updateSequence();

    $("#proj_func_select").change(function () {
        var proj_func_id = $(this).val();
        var proj = {
            _id: { "$oid": get_oid(project) },
            project_func_id: proj_func_id
        };
        var data = {
            struct_str: toJSONString(proj),
            cls_type: "Project"
        };
        ajaxPost("/design/edit/ajax/struct_save/" + get_oid(project), data);
    });

    //切换分组面时的检查函数
    //$(window).focus(function () { //todo
    //    $.ajax({
    //        type: "GET",
    //        url: "edit/ajax/data.json",
    //        dataType: "json",
    //        success: function (ret) {
    //            //                if (ret.user_online){
    //            //                    // console.log("user is online");
    //            //                }else{
    //            //                    // console.warn("user is offline");
    //            //                    jsAlert({content:"<p style='text-align:left;'>登录超时, 请重新登录</p>", obj: function(){
    //            //                        window.location.href = "/login/";
    //            //                    }});
    //            //                }
    //            //                if (ret.can_edit){
    //            //                    // console.log("this project can be edited");
    //            //                }else{
    //            //                    jsAlert({content:"<p style='text-align:left;'>你的问卷已在其他分组面发布成功，如需修改，请点击编辑按钮。</p>", obj: function(){
    //            //                        window.location.href = "/mysurvey/";
    //            //                    }});
    //            //                }
    //        }
    //    });
    //});

});

/*
    设定列的宽度和表格的宽度
    qid: 问题的ID，用于定位表格
    col_width_array: 列宽度定义
*/
function matrixWidthProcess(qid, col_width_array) {
    var table_width = 0;
    var objPadding = 0;
    //遍历矩阵题的表头
    $("li[oid='" + qid + "'] table tbody:eq(0) tr").each(function (m) {
        table_width = 0;
        //遍历每列
        $(this).children("td").each(function (i, element) {
            //计算单元格的左右padding
            objPadding = parseFloat($(this).css('paddingLeft')) + parseFloat($(this).css('paddingRight')) + 1;
            //如果当前列的宽度没有定义，则使用前一列的宽度
            if (col_width_array[i] == undefined) {
                col_width_array[i] = col_width_array[i - 1]
            };
            //设定当前列的宽度
            $(this).width(col_width_array[i] + "px");
            //未知
            if (m > 0 && i > 0) {
                $(this).wrapInner('<div class="div" style="width:' + (col_width_array[i]) + 'px"></div>');
            }
            //计算表的宽度
            table_width += col_width_array[i] + objPadding;
        });
    });
    //设定表的宽度
    $("li[oid='" + qid + "'] table").width(table_width);
}

//初始化题目列表
function initQuestionPanel(questions) {
    //更新题目
    if (questions) {
        for (var i = 0; i < questions.length; ++i) {
            //
            var question = questions[i];
            //获取model
            var model = ModelFactory.getModel(question, myapp.resHost);
            //生成html
            var html = model.genEditTemplate(parent.myapp.resHost);
            //添加题目到最后
            $(html).appendTo($('.dragwen'));
            //附加数据question
            var module = $('.dragwen .module[oid=' + question.id + ']');
            module.data('model', model.question);
            //附加数据option
            if (model.question.type == QUESTION_TYPE_MATRIX_SINGLE ||
                model.question.type == QUESTION_TYPE_MATRIX_MULTIPLE ||
                model.question.type == QUESTION_TYPE_MATRIX_SCORE) {
                //列选项
                for (var j = 0; j < model.question.cols.length; ++j) {
                    var option = model.question.cols[j];
                    var container = $('.option[oid=' + option.id + ']', module);
                    container.data('model', option);
                }
                //行选项
                for (var j = 0; j < model.question.rows.length; ++j) {
                    var option = model.question.rows[j];
                    var container = $('.option[oid=' + option.id + ']', module);
                    container.data('model', option);
                }
            } else {
                for (var j = 0; j < model.question.options.length; ++j) {
                    var option = model.question.options[j];
                    //附加数据
                    var container = $('.option[oid=' + option.id + ']', module);
                    container.data('model', option);
                    //创建form
                    if (question.type == QUESTION_TYPE_IMAGE_SINGLE || question.type == QUESTION_TYPE_IMAGE_MULTIPLE)
                        imageOption.createAjaxForm(container, option);
                }
            }
            //图片题型需创建dmUploader
            if (question.type == QUESTION_TYPE_IMAGE_SINGLE || question.type == QUESTION_TYPE_IMAGE_MULTIPLE) {
                imageOption.createUploader(module);
            }
        }
        //更新题目编号和分组编号
        //updateSequence();
    }
}

/*
  获取题型模板(html)
*/
function getTemplate(type) {
    return INIT_TEMPLATE_MAP[type];
}

/*
 后台API调用 **********************************************************************************************************************************************************
*/

/*
    创建问卷
    template: 问卷对象
    callback: 提交成功后调用
*/
function createTemplate(template, callback) {
    if (debug_mode == false) {
        AjaxPost(myapp.apiHost + 'template/create', template, null, function (data) {
            template = data.objs[0];
            if (callback) callback(template);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(template);
    }
}

/*
    更新问卷
    template: 问卷对象
    callback: 提交成功后调用
*/
function updateTemplate(template, callback) {
    if (debug_mode == false) {
        SavePrompt();
        AjaxPost(myapp.apiHost + 'template/update', template, null, function (data) {
            template = data.objs[0];
            if (callback) callback(template);
            SavePrompt(true);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(template);
    }
}

/*
    创建欢迎语/结束语
    statement: 欢迎语/结束语对象
    callback: 提交成功后调用
*/
function createStatement(statement, callback) {
    if (debug_mode == false) {
        SavePrompt();
        AjaxPost(myapp.apiHost + 'statement/create', [statement], null, function (data) {
            statement = data.objs[0];
            if (callback) callback(statement);
            SavePrompt(true);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(statement);
    }
}

/*
    更新欢迎语/结束语
    statement: 欢迎语/结束语对象
    callback: 提交成功后调用
*/
function updateStatement(statement, callback) {
    if (debug_mode == false) {
        SavePrompt();
        AjaxPost(myapp.apiHost + 'statement/update', [statement], null, function (data) {
            statement = data.objs[0];
            if (callback) callback(statement);
            SavePrompt(true);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(statement);
    }
}

/*
    创建题目
    question: 题目对象
    callback: 提交成功后调用
*/
function createQuestion(question, callback) {
	debugger;
    if (debug_mode == false) {
        SavePrompt();
        AjaxPost3(myapp.myweb + 'question/create', question, null, function (data) {
            question = data.objs[0];
            if (callback) callback(question);
            SavePrompt(true);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(question);
    }
}

/*
    更新题目
    question: 题目对象
    callback: 提交成功后调用
*/
function updateQuestion(question, callback) {
    if (debug_mode == false) {
        AjaxPost(myapp.apiHost + 'question/update', question, null, function (data) {
            question = data.objs[0];
            if (callback) callback(question);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(question);
    }
}

/*
    更新题目
    question: 题目对象
    callback: 提交成功后调用
*/
function updateQuestionEx(question, callback) {
    if (debug_mode == false) {
        AjaxPost(myapp.apiHost + 'question/updateex', question, null, function (data) {
            question = data.objs[0];
            if (callback) callback(question);
            SavePrompt(true);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(question);
    }
}

/*
    删除题目
    question: 题目对象
    callback: 提交成功后调用
*/
function deleteQuestion(question, callback) {
	debugger;
    if (debug_mode == false) {
        SavePrompt();
        AjaxPost3(myapp.myweb + 'question/delete',question, null, function (data) {
            //question = data.objs[0];
            if (callback) callback(question);
            SavePrompt(true);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(question);
    }
}

/*
    批量创建题目
    questions: 题目对象
    callback: 提交成功后调用
*/
function createQuestions(questions, callback) {
    if (debug_mode == false) {
        SavePrompt();
        AjaxPost(myapp.apiHost + 'question/batchcreate', questions, null, function (data) {
            if (callback) callback(data.objs);
            SavePrompt(true);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(questions);
    }
}

/*
    创建选项
    option: 选项对象
    callback: 提交成功后调用
*/
function createOption(option, callback) {
	debugger;
    if (debug_mode == false) {
        SavePrompt();
        AjaxPost3(myapp.myweb + 'option/create', option, null, function (data) {
            option = data.objs[0];
            if (callback) callback(option);
            SavePrompt(true);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(option);
    }
}

/*
    批量创建选项
    options: 选项对象数组
    callback: 提交成功后调用
*/
function createOptions(options, callback) {
    if (debug_mode == false) {
        SavePrompt();
        AjaxPost3(myapp.myweb + 'option/create', options, null, function (data) {
            options = data.objs;
            if (callback) callback(options);
            SavePrompt(true);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(options);
    }
}

/*
    更新选项
    option: 选项对象
    callback: 提交成功后调用
*/
function updateOption(option, callback) {
    if (debug_mode == false) {
        var temp = [option];
        SavePrompt();
        AjaxPost(myapp.apiHost + 'option/update', temp, null, function (data) {
            option = data.objs[0];
            if (callback) callback(option);
            SavePrompt(true);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(question);
    }
}

/*
    更新选项
    option: 选项对象
    callback: 提交成功后调用
*/
function updateOptionEx(option, callback) {
    if (debug_mode == false) {
        AjaxPost(myapp.apiHost + 'option/updateex', option, null, function (data) {
            option = data.objs[0];
            if (callback) callback(option);
            SavePrompt(true);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(option);
    }
}

/*
    删除选项
    option: 选项对象
    callback: 提交成功后调用
*/
function deleteOption(option, callback) {
	debugger;
    if (debug_mode == false) {
        SavePrompt();
        AjaxPost3(myapp.myweb + 'option/delete', option, null, function (data) {
            //option = data.objs[0];
            if (callback) callback(option);
            SavePrompt(true);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(option);
    }
}

/*
    更新标题
    model: 对象
    type: 题目或选项
    callback: 提交成功后调用
*/
function updateTitle(model, type, callback) {
	debugger;
    if (debug_mode == false) {
        if (type == "question") {
            SavePrompt();
            AjaxPost3(myapp.myweb + 'question/updatetitle', model, null, function (data) {
                model = data.objs[0];
                if (callback) callback(model);
                SavePrompt(true);
            }, function (err) {
                console.log(err);
            });
        } else if (type == "option" || type == "") {
            SavePrompt();
            AjaxPost3(myapp.myweb + 'option/updatetitle', model, null, function (data) {
                model = data.objs[0];
                if (callback) callback(model);
                SavePrompt(true);
            }, function (err) {
                console.log(err);
            });
        } 
    } else {
        if (callback) callback(question);
    }
}

/*
    移动题目/选项
    orders: [{ID: 100456, DispIndex: 4}, {ID: 485621, DispIndex: 5}, ...]
    type: 题目或选项
    callback: 提交成功后调用
*/
function moveObjects(orders, type, callback) {
	debugger;
    if (debug_mode == false) {
        if (type == "question") {
            SavePrompt();
            AjaxPost3(myapp.myweb + 'question/move', orders, null, function (data) {
                if (callback) callback(orders);
                SavePrompt(true);
            }, function (err) {
                console.log(err);
            });
        } else {
            SavePrompt();
            AjaxPost3(myapp.myweb + 'option/move', orders, null, function (data) {
                if (callback) callback(orders);
                SavePrompt(true);
            }, function (err) {
                console.log(err);
            });
        }
    } else {
        if (callback) callback(orders);
    }
}

/*
    更新逻辑
    type: 逻辑类型
    subjectType: 逻辑目标类型
    contextId: 题目ID或者选项ID
    logics: 逻辑对象
    callback: 提交成功后调用
*/
function submitLogics(type, subjectType, contextId, logics, callback) {
    if (debug_mode == false) {
        AjaxPost(myapp.apiHost + 'logic/submit?type=' + type + '&subjecttype=' + subjectType + '&contextid=' + contextId, logics, null, function (data) {
            logics = data.objs;
            if (callback) callback(logics);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(logics);
    }
}

/*
    更新逻辑
    type: 逻辑类型
    subjectType: 逻辑目标类型
    expType: 逻辑表达式类型
    contextId: 题目ID或者选项ID
    logics: 逻辑对象
    callback: 提交成功后调用
*/
function submitLogics2(type, subjectType, expType, contextId, logics, callback) {
    if (debug_mode == false) {
        AjaxPost(myapp.apiHost + 'logic/submit?type=' + type + '&subjecttype=' + subjectType + '&exptype=' + expType + '&contextid=' + contextId, logics, null, function (data) {
            logics = data.objs;
            if (callback) callback(logics);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback(logics);
    }
}

/*
    查询逻辑
    type: 逻辑类型
    subjectType: 逻辑目标类型
    expType: 逻辑表达式类型
    contextId: 题目ID或者选项ID
    callback: 提交成功后调用
*/
function searchLogics(type, subjectType, expType, contextId, callback) {
    if (debug_mode == false) {
        AjaxGet(myapp.apiHost + 'logic/search?type=' + type + '&subjecttype=' + subjectType + '&exptype=' + expType + '&contextid=' + contextId, function (data) {
            var logics = data.objs;
            if (callback) callback(logics);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback([]);
    }
}

/*
    查询指定评估员答卷对象
    templateId: 问卷ID
    callback: 提交成功后调用
*/
function searchMembers(type, callback) {
    if (debug_mode == false) {
        var data = {
            subSys: 'wesurvey',
            repID: 51,
            isQuery: '1',
            dispType: '12',
            perRows: '2000',
            cnd_type: type,
            selCndIDs: "type"
        };
        AjaxPost2(myapp.apiHost2 + 'sysmng.jsonreport.do?', data, function (data) {
            var members = data.objs;
            if (callback) callback(members);
        }, function (error) {
            console.log(err);
        });
    } else {
        if (callback) callback([]);
    }
}

/*
    查询指定评估员答卷对象
    templateId: 问卷ID
    callback: 提交成功后调用
*/
function searchDesignations(templateid, callback) {
    if (debug_mode == false) {
        AjaxGet(myapp.apiHost + 'designation/search?templateid=' + templateid, function (data) {
            var designations = data.objs;
            if (callback) callback(designations);
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback([]);
    }
}

/*
    创建/更新指定评估员答卷对象
    templateId: 问卷ID
    designations: 指定评估员答卷对象
    callback: 提交成功后调用
*/
function submitDesignations(templateId, designations, callback) {
    if (debug_mode == false) {
        AjaxPost(myapp.apiHost + 'designation/submit?templateid=' + templateId, designations, null, function (data) {
            if (callback) callback();
        }, function (err) {
            console.log(err);
        });
    } else {
        if (callback) callback();
    }
}

/************************************************************************************************************************************************************/

function close_window() {
    // window.opener=null;
    // window.open('','_self');
    // window.close();
    window.location.href = "/mysurvey";
}

//图片题-选项
function ImageOption() {
    //绑定事件
    this.events = function () {
        //点击图片裁剪
        /*$('.question-img-box .qimg-con img').live('click', function () {
            //指代.qimg-con img节点
            var _this = $(this);
            //上下文
            var url = _this.attr("maxsrc");
            var oid = _this.parents(".question-img-box").attr("type");
            var bbox = _this.attr("bbox") || "[75,75,150,150]";
            bbox = bbox.parseJSON();
            //var orig_width = _this.attr("orig_width");
            //创建裁剪对象
            CreateJcrop(url, changeThumb, oid, bbox, 768);
        });*/
        //点击替换图片
        $('.question-img-box input[name=origin_image]').live('change', function () {
            $(this).parent().submit();
        });
    }
    //创建图片上传控件
    this.createUploader = function (module) {
        //指代ImageOption
        var _this = this;
        //上下文
        var question = module.data('model');
        var qid = question.id;
        var type = question.type;
        //点击批量添加图片
        $('.add-qimg-con', module).dmUploader({
            url: myapp.apiHost + 'image/upload/',
            dataType: 'json',
            allowedTypes: 'image\/jpeg|bmp|jpg|png',
            extraData: { },
            maxFileSize: 5242880,
            extFilter: 'jpg;png;bmp',
            fileName: 'origin_image',
            //初始化插件
            onInit: function () {
                //$.danidemo.addLog('#demo-debug', 'default', 'Plugin initialized correctly');
            },
            //上传
            onBeforeUpload: function (id) {
                //检查浏览器是否支持该插件
            },
            //添加新文件
            onNewFile: function (id, file) {
                //未知
                $.danidemo.addFile('#demo-files', id, file);
            },
            //完成
            onComplete: function () {
                //
            },
            //上传进度
            onUploadProgress: function (id, percent) {
                //var percentStr = percent + '%';
                $('#' + qid + '_' + id).find('.pbg').width(percent + '%');
            },
            //上传成功
            onUploadSuccess: function (id, data) {
                if ((data.objs.length) > 0) {
                    var count = $('.option', module).length + 1; 
                    var option = OPTION_MAP[type];
                    option.questionID = qid;
                    option.code = 'OP' + count;
                    option.title = '图片' + count;
                    option.imageUrl = data.objs[0].fileName;
                    option.thumbUrl = data.objs[0].fileName;
                    option.dispIndex = count;
                    //调用API
                    createOption(option, function (data) {
                        //更新option对象
                        option = data;
                        //生成选项，并附加数据
                        _this.createOption(module, type, option);
                        //
                        var container = $('.option[oid=' + option.id + ']', module);
                        //创建form
                        if (question.type == QUESTION_TYPE_IMAGE_SINGLE || question.type == QUESTION_TYPE_IMAGE_MULTIPLE)
                            question.options.push(option);
                            imageOption.createAjaxForm(container, option);
                    });
                }
            },
            //上传错误
            onUploadError: function (id) {
                var Pobj = $('#' + _this.qid + '_' + id);
                Pobj.find('.progress-bar').html('<span class="text_red">上传失败</span>');
                setTimeout(function () {
                    Pobj.remove();
                }, 3000);
            },
            //文件类型错误
            onFileTypeError: function (file) {
                alert(file.name + " 该图片格式有误，仅允许jpeg，bmp，jpg，png的格式文件");
            },
            //文件大小错误
            onFileSizeError: function (file) {
                alert(file.name + " 该图片太大，单张不能超过5M");
            },
            //
            onFallbackMode: function (message) {
                $('li[oid="' + _this.qid + '"] .add-qimg-con').hide();
                $('li[oid="' + _this.qid + '"] .add-qimg-con-ie').show();
            }
        });
    }
    //添加图片题选项.qimg-con
    this.createOption = function (module, type, option) {
        //添加question-img-box
        var imgli =
            '<li class="option" oid="' + option.id + '">' +
                '<div class="question-img-box" name="' + option.id + '">' +
                    '<div class ="img-box-loading">' +
                        '<div class ="progress-bar">' +
                            '<div class="pbg">' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<form name="origin_image"><input name="origin_image" type="file" style="display:none"></form>' +
                    '<div style="display:none;" class="qimg-con" onclick="$(this).parent().find(\'input[name=origin_image]\').click();">' +
                        '<img maxsrc="' + parent.myapp.resHost + option.imageUrl + '" src="' + parent.myapp.resHost + option.thumbUrl + '">' +
                    '</div>' +
                '</div>' +
            '</li>';
        $('.drag-zone', module).before(imgli);
        //添加input/label
        var imgbox = $(".question-img-box[name=" + option.id + ']', module);
        var html = '';
        if (type === QUESTION_TYPE_IMAGE_SINGLE) {
            html = '<input type="radio" name="radio" id="option_' + option.id + '" value="option_' + option.id + '">' +
                   '<label class="T-edit-min" for="" name="option" id="' + option.id + '">' + option.title + '</label>';
        } else {
            html = '<input type="checkbox" name="checkbox" id="option_' + option.id + '" value="option_' + option.id + '">' +
                   '<label class="T-edit-min" for="" name="option" id="' + option.id + '">' + option.title + '</label>';
        }
        imgbox.append(html);
        //loading效果
        imgbox.find('.img-box-loading').hide();
        imgbox.find('.qimg-con').show();
        //附加数据
        imgbox.data('model', option);
        imgbox.parents('.option').data('model', option);
    }
    //创建form提交
    this.createAjaxForm = function (view, option) {
        //form提交
        $('form[name=origin_image]', view).ajaxForm({
            url: myapp.apiHost + "image/upload/",
            type: "POST",
            dataType: 'json',
            success: function (data) {
                if ((data.objs.length) > 0) {
                    option.imageUrl = data.objs[0].fileName;
                    option.thumbUrl = data.objs[0].fileName;
                    //调用API
                    updateOption(option, function (data) {
                        $('.qimg-con img', view).attr('maxsrc', parent.myapp.resHost + option.imageUrl);
                        $('.qimg-con img', view).attr('src', parent.myapp.resHost + option.thumbUrl);
                    });
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
    }
}

var imageOption = new ImageOption();
imageOption.events();

/*
    创建Jcrop控件并初始化
*/
function CreateJcrop(url, callback, oid, bbox, width) {
    //
    var imgId = new Date().getTime();
    //
    var imgWidth = width > 400 ? 400 : width;
    //
    jsConfirm({
        'title': '图片裁剪',
        'content': '<div class="cjimg"><img width="' + imgWidth + '" src="' + url + '" id="' + imgId + '" alt="图片加载错误" /></div>',
        'obj': cropImage,
        'conw': 440,
        'accept_text': '裁剪',
        //'cancel_text':'取消',
        'accept_param': '#target'
    });
    //
    initJcrop("#" + imgId);
    //初始化Jcrop
    function initJcrop(obj) {
        //隐藏
        $('.requiresjcrop').hide();
        // Invoke Jcrop in typical fashion
        $(obj).Jcrop({
            // onRelease: releaseCheck
            onSelect: updateCoords,
            minSize: [75, 75]
        }, function () {
            jcrop_api = this;
            jcrop_api.animateTo(bbox);
            jcrop_api.setOptions({ aspectRatio: 4 / 4 });
            //显示
            $('.requiresjcrop').show();
        });
        //
        return false;
    }
    //初始化裁剪区域
    var coordinate = {};
    coordinate.x = 75;
    coordinate.y = 75;
    coordinate.x2 = 150;
    coordinate.y2 = 150;
    //
    function updateCoords(coord) {
        coordinate = coord;
    };
    //保存裁剪
    function cropImage() {
        var bbox = [coordinate.x, coordinate.y, coordinate.x2, coordinate.y2]
        var data = {
            "option_id": oid,
            "bbox": toJSONString(bbox)
        };
        //
        ajaxPost("/design/edit/form/ajax/upload_cut_image/" + get_oid(project), data, function (ret) {
            var new_thumb_url = ret.thumb_url;
            new_thumb_url += "&s=" + Math.random();
            callback(new_thumb_url, oid, ret.bbox);
        });
    }
}

//裁剪图片回调方法
function changeThumb(imgurl, oid, bbox) {
    setTimeout(function () {
        var maxsrc = $(".question-img-box[name=" + oid + '] .qimg-con img').attr('maxsrc');
        var origin_width = $(".question-img-box[name=" + oid + '] .qimg-con img').attr('orig_width');
        $(".question-img-box[name=" + oid + '] .qimg-con img').remove();
        var newimg = $('<img maxsrc="' + maxsrc + '" bbox="' + bbox + '" orig_width="' + origin_width + '" src="' + imgurl + '"></img>').appendTo(".question-img-box[name=" + oid + '] .qimg-con');
    }, 50);
}

function upload_img_success_for_ie(qid, option_struct) {
    var question = $('li[oid="' + qid + '"]');
    var optionLength = question.find('.img-li li').length - 1;
    //var Pobj = $('#' + qid + '_' +optionLength);
    var Pobj = $(".question-img-box[name=" + qid + '_' + optionLength + ']');

    Pobj.find('.qimg-con img').attr('src', option_struct.custom_attr.images.thumbnail_src);
    Pobj.find('.qimg-con img').attr('maxsrc', option_struct.custom_attr.images.src);
    Pobj.find('.qimg-con img').attr('orig_width', option_struct.custom_attr.images.orig_width);
    Pobj.find('.img-box-loading').hide();
    Pobj.find('.qimg-con').show();
    Pobj.append(AddImgOption(get_oid(option_struct), option_struct.title));
    var option_id = get_oid(option_struct);
    Pobj.attr("id", option_id);
    $(".question-img-box[name=" + option_id + '] .qimg-con img').live('click', function () {
        var url = $(this).attr("maxsrc");
        var orig_width = $(this).attr("orig_width");
        var option_id = $(this).parents(".question-img-box").attr("type");
        CreateJcrop(url, changeThumb, option_id, orig_width);
    });

    function AddImgOption(oid, name) {
        var question = get_question(this.qid);
        if (question.question_type === QUESTION_TYPE_SINGLE) {
            var optionCon = '<input type="radio" name="radio" id="option_' + oid + '" value="option_' + oid + '">' + '<label class="T-edit-min" for="" name="option" id="' + oid + '">' + name + '</label>';
        } else {
            var optionCon = '<input type="checkbox" name="checkbox" id="option_' + oid + '" value="option_' + oid + '">' + '<label class="T-edit-min" for="" name="option" id="' + oid + '">' + name + '</label>';
        }
        return optionCon;
    }

}

function start_upload_img_for_ie(qid) {
    var question = $('li[oid="' + qid + '"]');
    var optionLength = question.find('.img-li li').length;
    var imgli = '<li><div class="question-img-box" name="' + qid + '_' + optionLength + '"><div class ="img-box-loading"><div class ="progress-bar"><div class="pbg"></div></div></div>' + '<div style="display:none;" class="qimg-con"><img maxsrc="" src=""></div>' + '</div></li>';
    $('.drag-zone', question).before(imgli);
    $("#" + qid + "_" + optionLength + " .pbg").animate({ width: '+90%' }, "1000");
}

loadMack({ off: 'on', Limg: 1, text: '加载中...', set: 0 });