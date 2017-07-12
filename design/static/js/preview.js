/**
 * Created by user on 2016/7/27.
 */

//选择题边框
function setBorders(context) {
    var count = $('.option', context).length;
    var prevChecked = undefined;
    $('.option', context).each(function (i) {
        var _this = $(this);
        var selfChecked = _this.hasClass('checked');
        //第1个选项
        if (i == 0) {
            if (_this.hasClass('checked')) {
                _this.css('border-top', '1px solid #FEBC21');
                _this.css('border-right', '1px solid #FEBC21');
                //_this.css('border-bottom', '1px solid #FEBC21');
                _this.css('border-left', '1px solid #FEBC21');
            } else {
                _this.css('border-top', '1px solid #D9D9D9');
                _this.css('border-right', '1px solid #D9D9D9');
                //_this.css('border-bottom', '1px solid #D9D9D9');
                _this.css('border-left', '1px solid #D9D9D9');
            }
        }
        //中间选项
        else if (i < count - 1) {
            if (prevChecked == true || selfChecked == true) {
                _this.css('border-top', '1px solid #FEBC21');
            } else {
                _this.css('border-top', '1px solid #D9D9D9');
            }
            if (_this.hasClass('checked')) {
                _this.css('border-right', '1px solid #FEBC21');
                //_this.css('border-bottom', '1px solid #FEBC21');
                _this.css('border-left', '1px solid #FEBC21');
            } else {
                _this.css('border-right', '1px solid #D9D9D9');
                //_this.css('border-bottom', '1px solid #D9D9D9');
                _this.css('border-left', '1px solid #D9D9D9');
            }
        }
        //最后一个选项
        else {
            if (prevChecked == true || selfChecked == true) {
                _this.css('border-top', '1px solid #FEBC21');
            } else {
                _this.css('border-top', '1px solid #D9D9D9');
            }
            if (_this.hasClass('checked')) {
                _this.css('border-right', '1px solid #FEBC21');
                _this.css('border-bottom', '1px solid #FEBC21');
                _this.css('border-left', '1px solid #FEBC21');
            } else {
                _this.css('border-right', '1px solid #D9D9D9');
                _this.css('border-bottom', '1px solid #D9D9D9');
                _this.css('border-left', '1px solid #D9D9D9');
            }
        }
        //
        prevChecked = selfChecked;
    })
}

//文本域缩放
function autoTextArea(elem, extra, maxHeight) {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function (type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ? function (name) {
            var val = elem.currentStyle[name];
            if (name === 'height' && val.search(/px/i) !== 1) {
                var rect = elem.getBoundingClientRect();
                return rect.bottom - rect.top - parseFloat(getStyle('paddingTop')) - parseFloat(getStyle('paddingBottom')) + 'px';
            };
            return val;
        } : function (name) {
            return getComputedStyle(elem, null)[name];
        },
        minHeight = parseFloat(getStyle('height'));
    //
    elem.style.resize = 'none';
    //
    var change = function () {
        var scrollTop, height, padding = 0, style = elem.style;
        if (elem._length === elem.value.length)
            return;
        elem._length = elem.value.length;
        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };
    //
    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    //
    change();
};
//中文二维码
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
//
var bindEvents = function(context){
    $('.option', context).off('click').on('click', function () {
        var _this = $(this), parent = '';
        //单选、矩阵单选（展开）
        if(_this.parents('.options').data('type') == QUESTION_TYPE_SINGLE || _this.parents('.options').data('type') == QUESTION_TYPE_MATRIX_SINGLE){
            _this.addClass('checked').siblings().removeClass('checked');
            if(_this.parents('.options').data('type') == QUESTION_TYPE_MATRIX_SINGLE){
                parent = _this.parents('.row-option');
            }else{
                parent = _this.parents('.options');
            }
            setBorders(parent);
            //显示/隐藏开放选项
            $('.open',_this.parents('.options')).hide();
            $('.open',_this).show();
            //隐藏汽车与对勾
            _this.siblings().find('.car').animate({'left':-$(window).width()},500);
            _this.siblings().find('.hook').animate({'left':60},200);
            _this.find('.car').animate({'left':4},500);
            _this.find('.hook').animate({'left':14},200);
        }//多选、矩阵多选（展开）
        else if(_this.parents('.options').data('type') == QUESTION_TYPE_MULTIPLE || _this.parents('.options').data('type') == QUESTION_TYPE_MATRIX_MULTIPLE) {
            if(_this.hasClass('checked')){//选中状态
                _this.removeClass('checked');
                //隐藏汽车与对勾
                _this.find('.car').animate({'left':-$(window).width()},500);
                _this.find('.hook').animate({'left':60},200);
                //隐藏开放选项
                $('.open', _this).hide();
            }else{//未选中状态
                //选项排他
                if(_this.attr('exclusive') == 'true'){
                    //自已被选中，其它都不能选中
                    _this.addClass('checked');
                    $('.open').hide();
                    $('.open',_this).show();
                    //显示汽车与对勾
                    _this.find('.car').animate({'left':4},500);
                    _this.find('.hook').animate({'left':14},200);
                    //其他兄弟节点
                    _this.siblings().removeClass('checked');
                    _this.siblings().find('.car').animate({'left':-$(window).width()},500);
                    _this.siblings().find('.hook').animate({'left':60},200);
                }else{//不是排他选项时，需要先判断一下是否有排他选项的已经被选中，如被选中则不能再选择其它的
                    var flag = false;
                    $('.option').each(function() {
                       if($(this).hasClass('checked') && $(this).attr('exclusive') == 'true'){
                           flag = true;
                           return;
                       }
                    });
                    if (flag) {
                        return;
                    };
                    //选中状态
                    _this.addClass('checked');
                    //显示汽车与对勾
                    _this.find('.car').animate({'left':4},500);
                    _this.find('.hook').animate({'left':14},200);
                }
                //显示开放选项
                $('.open', _this).show();
                $('.open', _this).on('click', function () {
                    return false; //阻止冒泡
                });
            }
            if(_this.parents('.options').data('type') == QUESTION_TYPE_MATRIX_MULTIPLE){
                parent = _this.parents('.row-option');
            }else{
                parent = _this.parents('.options');
            }
            setBorders(parent);
        }else if(_this.parents('.options').data('type') == QUESTION_TYPE_IMAGE_SINGLE){//图片单选
            _this.siblings().removeClass('checked');
            _this.addClass('checked');
        }else if(_this.parents('.options').data('type') == QUESTION_TYPE_IMAGE_MULTIPLE){//图片多选
            if(_this.hasClass('checked')){
                _this.removeClass('checked');
            }else{
                _this.addClass('checked');
            }
        }else if(_this.parents('.matrix-row-options').data('type') == QUESTION_TYPE_MATRIX_SINGLE){//矩阵单选（表格）
            _this.siblings().removeClass('checked');
            _this.parents('.row-option').find('.open-option').val('');
            _this.addClass('checked');
        }else if(_this.parents('.matrix-row-options').data('type') == QUESTION_TYPE_MATRIX_MULTIPLE){//矩阵多选（表格）
            var context = $(this).parents('.row-option');
            if(_this.hasClass('checked')){
                _this.removeClass('checked');
                _this.find('.open-option').val('');
            }else{
                //选项排他
                if(_this.attr('exclusive') == 'true'){
                    _this.addClass('checked').siblings().removeClass('checked');
                    _this.parents('.row-option').find('.open-option').val('');
                }else{//不是排他选项时，
                    var flag = false;
                    $('.option',context).each(function(){
                       if($(this).hasClass('checked') && $(this).attr('exclusive') == 'true'){
                           flag = true;
                           return;
                       }
                    });
                    if(flag) {
                        return;
                    }
                    _this.addClass('checked');
                }

            }
        }
    });
    //开放选项
    $('.open-option').off('click').on('click', function(){
        return false;
    });
    //开放选项自动缩放
    $('.open-option').off('click').on('click', function () {
        autoTextArea($(this)[0]);
    });
    //二维码
    $('.phone-preview').off('click').on('click', function(){
       //$('#qrcode').css('display','block').qrcode(window.location.href);
       $('#qrcode').html('').qrcode({
           width:150,
           height:150,
           correctLevel:0,
           text:utf16to8(window.location.href)
       }).toggle().append('扫码预览');
    });
    /*$('.square', context).on('mouseenter','.square',function(){
       $(this).css('background-color',color[$(this).index()]).prevAll().css('background-color','pink').end().nextAll().css('background-color','#fff');
    }).on('mouseleave',function(){
        $('.square').css('background-color','#fff');
    });*/
    /*$('.square', context).mouseover(function(){
        var index = $(this).index();
        for(var i = 0;i<index;i++){
            $('.square').eq(i).css("background-color","yellow");
        }
    }).mouseout(function(){
        var index = $(this).index();
        for(var i = 0;i<index;i++){
            $('.square').eq(i).css("background-color","#fff");
        }
    });*/
}

//生成html
var generateHtml = function (question) {
    template.config('escape');
    question.resHost = myapp.resHost;
    var html = '';
    if (question.type == QUESTION_TYPE_SINGLE || question.type == QUESTION_TYPE_MULTIPLE) {
        if (question.rowReverse == true) {
            question.options = question.options.reverse();//选项倒序
        }
        if (question.rowDisordered == true){
            question.options = shuffle(question.options, question.rowLastFixed == true ? 2 : 0);
        }
        html = template('choice', question);
    } else if (question.type == QUESTION_TYPE_IMAGE_SINGLE || question.type == QUESTION_TYPE_IMAGE_MULTIPLE) {
        if (question.rowReverse == true) {
            question.options = question.options.reverse();//选项倒序
        }
        if (question.rowDisordered == true){
            question.options = shuffle(question.options, question.rowLastFixed == true ? 2 : 0);
        }
        html = template('img', question);
    } else if (question.type == QUESTION_TYPE_SINGLE_BLANK || question.type == QUESTION_TYPE_MULTIPLE_LINE_BLANK || question.type == QUESTION_TYPE_MULTIPLE_BLANK) {
        if (question.type == QUESTION_TYPE_MULTIPLE_BLANK && question.rowReverse == true) {
            question.options = question.options.reverse();//选项倒序
        }
        html = template('fill', question);
    } else if (question.type == QUESTION_TYPE_SCORE) {
        //评分样式
        if (question.scoreType == QUESTION_SCORE_TYPE_STAR){
            html = template('template_score_star', question);
        }else if (question.scoreType == QUESTION_SCORE_TYPE_SQUARE){
            html = template('template_score_square', question);
        }
    }else if (question.type == QUESTION_TYPE_MATRIX_SINGLE || question.type == QUESTION_TYPE_MATRIX_MULTIPLE) {
        //拆分options，row为行选项，cols为列选项
        question.rows = [], question.cols = [];
        for (var i = 0; i < question.options.length; ++i)
            question.options[i].orientation == 1 ? question.rows.push(question.options[i]) : question.cols.push(question.options[i]);
        //行随机排列
        if (question.rowDisordered == true)
            question.rows = shuffle(question.rows, question.rowLastFixed == true ? 2 : 0);
        //列随机排列
//      if (question.colDisordered == true)
//         question.cols = shuffle(question.cols, question.colLastFixed == true ? 2 : 0);
        //行选项倒序
        if (question.rowReverse == true)
            question.rows = question.rows.reverse();
        //列选项倒序
        if (question.colReverse == true)
            question.cols = question.cols.reverse();
        //显示方式，矩阵/展开
        if (question.layout == QUESTION_LAYOUT_TABULAR)
            html = template('tabular', question);
        else
            html = template('fluid', question);
    } else if (question.type == QUESTION_TYPE_MATRIX_SCORE) {
        //拆分options，row为行选项，cols为列选项
        question.rows = [], question.cols = [];
        for (var i = 0; i < question.options.length; ++i)
            question.options[i].orientation == 1 ? question.rows.push(question.options[i]) : question.cols.push(question.options[i]);
        //行随机排列
        if (question.rowDisordered == true)
            question.rows = shuffle(question.rows, question.rowLastFixed == true ? 2 : 0);
//                //列随机排列
//                if (question.colDisordered == true)
//                    question.cols = shuffle(question.cols, question.colLastFixed == true ? 2 : 0);
        //行选项倒序
        if (question.rowReverse == true) {
            question.rows = question.rows.reverse();
        }
        //显示方式，矩阵/展开
        if (question.layout == QUESTION_LAYOUT_TABULAR){
            //评分样式
            if (question.scoreType == QUESTION_SCORE_TYPE_STAR){
                html = template('template_score_tabular_star', question);
            } else if (question.scoreType == QUESTION_SCORE_TYPE_SQUARE){//template_matrix_score_tabular_square
                html = template('template_matrix_score_tabular_square', question);
            }
        }else{
            html = template('score_fluid', question);
        }
    } else if (question.type == QUESTION_TYPE_DESC) {
        html = template('desc', question);
    }
    return html;
}

//初始化
var goto = function (questions) {
    gotoNext(questions[_index], _index, questions.length);
}
//跳至下一题
var gotoNext = function (question, index, total) {
    // inject resource host
    question.resHost = myapp.resHost;
    // generate html, step or index
    var html = generateHtml(question);
    // replace
    $('.question-box').html(html);
    $('.question-box .matrix-row-options .matrix-open-option').each(function () {
        $(this).css('width', ($(this).parent().width() - 16));
    });
    // attach data
    attachData(question, '.question-box');
    // update type
    //$('.type').html(getTypeName(question.type));
    // bind events
    bindEvents('.question-box');
    // render answers if necessary
    if (_tracking[question.number]) {
        var answers = _tracking[question.number].answers;
        renderAnswers(question, answers, '.options');
    }
    // update progress
    setProgress(index, total);
}

//下一题
var next = function (questions, sample) {
    if (_index < questions.length) { //其它题
        var question = questions[_index];
        /*if (sample == null) {
            sample = {
                id: -1,
                templateID: templateid,
                //memberID: memberid,
                state: 1,
            };
            ajaxPost(myapp.apiHost + 'sample/create', sample, null, function (data) {
                sample.id = data.objs[0].id;
                var answers = createAnswers(question, sample, '.options');
                postAnswers(answers, question, questions, sample);
            }, function (err) {
                alert(err);
            });
        } else {
            var answers = createAnswers(question, sample, '.options');
            postAnswers(answers, question, questions, sample);
        }*/
        var answers = createAnswers(question, sample, '.options');
        postAnswers(answers, question, questions, sample);
    } else { //最后一道题
        finish(sample);
    }
    //
    return sample;
}

//附加数据
var attachData = function (question, context) {
    if (question.type == QUESTION_TYPE_SINGLE ||
        question.type == QUESTION_TYPE_MULTIPLE) {
        $('.option', context).each(function (i, e) {
            $(this).data('model', optionOf($(this).attr('oid'), question.options));
        });
    } else if (question.type == QUESTION_TYPE_SCORE) {
        //
    } else if (question.type == QUESTION_TYPE_SINGLE_BLANK ||
        question.type == QUESTION_TYPE_MULTIPLE_LINE_BLANK ||
        question.type == QUESTION_TYPE_MULTIPLE_BLANK) {
        $('.fill', context).each(function (i, e) {
            $(this).data('model', optionOf($(this).attr('oid'), question.options));
        });
    } else if (question.type == QUESTION_TYPE_IMAGE_SINGLE ||
        question.type == QUESTION_TYPE_IMAGE_MULTIPLE) {
        $('li', context).each(function (i, e) {
            $(this).data('model', optionOf($(this).attr('oid'), question.options));
        });
    } else if (question.type == QUESTION_TYPE_MATRIX_SCORE) {
        $('.raty', context).each(function (i, e) {
            $(this).data('model', optionOf($(this).attr('oid'), question.rows));
        });
    } else if (question.type == QUESTION_TYPE_MATRIX_SINGLE ||
        question.type == QUESTION_TYPE_MATRIX_MULTIPLE) {
        $('.row-option', context).each(function (i, e) {
            var that = $(this);
            that.data('model', optionOf(that.attr('oid'), question.rows));
            $('.option', that).each(function (i, e) {
                var mine = $(this);
                mine.data('model', optionOf(mine.attr('oid'), question.cols));
            });
        });
    }
}
//遍历选项，返回指定的选项
var optionOf = function (oid, options) {
    for (var i = 0; i < options.length; ++i) {
        if (options[i].id == oid)
            return options[i];
    }
    return null;
}

//遍历选项，返回指定的选项
var optionOf2 = function (code, options) {
    for (var i = 0; i < options.length; ++i) {
        if (options[i].code == code)
            return options[i];
    }
    return null;
}

//创建答案
var createAnswers = function (question, sample, context) {
    var answers = [];
    if (question.type == QUESTION_TYPE_SINGLE ||
        question.type == QUESTION_TYPE_MULTIPLE) {
        $('.option.checked', context).each(function (i, e) {
            var code = $(this).attr('code');
            var openText = $(this).find('textarea').val();
            answers.push({
                id: -1,
                //sampleID: sample.id,
                questionID: question.id,
                optionID: null,
                code: code,
                text: openText
            });
        });
    } else if (question.type == QUESTION_TYPE_SINGLE_BLANK ||
        question.type == QUESTION_TYPE_MULTIPLE_BLANK ||
        question.type == QUESTION_TYPE_MULTIPLE_LINE_BLANK) {
        $('.fill', context).each(function (i, e) {
            var text = $(this).val();
            var code = $(this).attr('code');
            answers.push({
                id: -1,
                //sampleID: sample.id,
                questionID: question.id,
                optionID: null,
                code: code,
                text: text
            });
        });
    } else if (question.type == QUESTION_TYPE_IMAGE_SINGLE ||
        question.type == QUESTION_TYPE_IMAGE_MULTIPLE) {
        $('li.checked', context).each(function (i, e) {
            var code = $(this).attr('code');
            answers.push({
                id: -1,
                //sampleID: sample.id,
                questionID: question.id,
                optionID: null,
                code: code,
                text: null
            });
        });
    } else if (question.type == QUESTION_TYPE_MATRIX_SINGLE) {
        $('.row-option').each(function (i, e) {
            var _this = this;
            var optionid = $(_this).attr('oid');
            var rowText = $(_this).find('.matrix-row-title textarea').val();
            $('.option.checked', $(_this)).each(function (i, e) {
                var _that = this;
                answers.push({
                    id: -1,
                    //sampleID: sample.id,
                    questionID: question.id,
                    optionID: optionid,
                    code: $(_that).attr('code'),
                    rowText:rowText,
                    text: $(_that).find('textarea').val()
                });
            });
        });
    } else if (question.type == QUESTION_TYPE_MATRIX_MULTIPLE) {
        if (question.matrixPivot == true) {
            $('.row-option').each(function (i, e) { // col option
                var _this = this;
                var code = $(_this).attr('code');
                var rowText = $(_this).find('.matrix-row-title textarea').val();
                $('.option.checked', $(_this)).each(function (i, e) { // row option
                    var _that = this;
                    var optionid = $(_that).attr('oid');
                    var openText = $(_that).find('textarea').val();
                    answers.push({
                        id: -1,
                        //sampleID: sample.id,
                        questionID: question.id,
                        optionID: optionid,
                        code: code,
                        rowText:rowText,
                        text: openText
                    });
                });
            });
        } else {
            $('.row-option').each(function (i, e) { // row option
                var _this = this;
                var optionid = $(_this).attr('oid');
                var rowText = $(_this).find('.matrix-row-title textarea').val();
                $('.option.checked', $(_this)).each(function (i, e) { // col option
                    var _that = this;
                    var openText = $(_that).find('textarea').val();
                    answers.push({
                        id: -1,
                        //sampleID: sample.id,
                        questionID: question.id,
                        optionID: optionid,
                        code: $(_that).attr('code'),
                        rowText:rowText,
                        text: openText
                    });
                });
            });
        }
    } else if (question.type == QUESTION_TYPE_SCORE) {
        $('.raty', context).each(function (i, e) {
            var code = $(this).attr('code');
            answers.push({
                id: -1,
                //sampleID: sample.id,
                questionID: question.id,
                optionID: null,
                code: code,
                text: null
            });
        });
    } else if (question.type == QUESTION_TYPE_MATRIX_SCORE) {
        if (question.layout == QUESTION_LAYOUT_FLUID) {
            $('.raty', context).each(function (i, e) {
                var code = $(this).attr('code');
                var optionid = $(this).attr('oid');
                var rowText = $(this).parents('.raty-box').find('.row-textarea textarea').val();
                var openText = $(this).find('textarea').val();
                answers.push({
                    id: -1,
                    //sampleID: sample.id,
                    questionID: question.id,
                    optionID: optionid,
                    code: code,
                    rowText: rowText,
                    text: openText
                });
            });
        } else {
            $('.raty', context).each(function (i, e) {
                var code = $(this).attr('code');
                var optionid = $(this).attr('oid');
                var rowText = $(this).parents('.raty-box').find('.row-textarea textarea').val();
                var openText = $(this).find('textarea').val();
                answers.push({
                    id: -1,
                    //sampleID: sample.id,
                    questionID: question.id,
                    optionID: optionid,
                    code: code,
                    rowText:rowText,
                    text: openText
                });
            });
        }
    } else if (question.type == QUESTION_TYPE_DESC) {
    }
    return answers;
}

//提交答案，
var postAnswers = function (answers, question, questions, sample) {
    //保留历史
    _tracking[question.number] = {
        answers: answers,
        index: _index,
        step: _step,
        top: _tracking.top,
    };
    _tracking.top = question.number;
    //
    if (answers.length > 0) {
        //提交答案
        //ajaxPost(app.apiHost + 'answer/create', answers, null, function (data) {
        //    //验证逻辑/显示题目
        //    evalThenGoto(answers, question, questions, sample);
        //}, function (err) {
        //    alert(err);
        //});
        //验证逻辑/显示题目
        evalThenGoto(answers, question, questions, sample);
    } else {
        //直接跳到下一题
        ++_index;
        //
        if (_index < questions.length) {
            //步数
            ++_step;
            //验证引用逻辑
            evalRefLogic(question, answers, questions);
            //显示下一题
            gotoNext(questions[_index], _index, questions.length);
        } else {
            //完成答卷
            finish(sample);
        }
    }
}
//计数逻辑求值
//COUNT(Q18.OP1.selected=true,Q18.OP2.selected=true)>1
//COUNT(Q18.IX2.OP1.selected=true,Q18.IX5.OP2.selected=true)>1
var evalCountLogic = function (logic, question, answers) {
    var expression = logic.expression.trim();
    var evalExp = logic.subjectType == LOGIC_SUBJECT_TYPE_QUESTION ? evalExp2 : evalExp3;
    var exp1 = expression.split(')')[0].replace('COUNT(', ''); //Q18.OP1.selected=true,Q18.OP2.selected=true
    var exp2 = expression.split(')')[1]; //>1
    var relation = relationOf(exp2);
    var exps = exp1.split(',');
    var count = parseInt(exp2.split(relation)[1]);
    var _count = 0;
    for (var i = 0; i < exps.length; ++i) {
        if (evalExp(exps[i].trim(), question, answers) == true)
            ++_count;
    }
    return compExp(relation, count, _count);
}
//条件逻辑求值
//Q18.OP1.selected=true AND Q18.OP2.selected=true
//Q10.IX1.OP6.selected=true AND Q10.IX1.OP2.selected=true
var evalComplexLogic = function (logic, question, answers) {
    var expression = logic.expression.trim();
    var evalExp = logic.subjectType == LOGIC_SUBJECT_TYPE_QUESTION ? evalExp2 : evalExp3;
    var relation = expression.indexOf('AND') >= 0 ? 'AND' : 'OR';
    var exps = expression.split(relation);
    if (relation == 'AND') {
        for (var i = 0; i < exps.length; ++i) {
            if (evalExp(exps[i].trim(), question, answers) == false)
                return false;
        }
        return true;
    } else {
        for (var i = 0; i < exps.length; ++i) {
            if (evalExp(exps[i].trim(), question, answers) == true)
                return true;
        }
        return false;
    }
}

//条件逻辑求值
//Q18.OP1.selected=true
//Q10.IX1.OP6.selected=true
var evalSimpleLogic = function (logic, question, answers) {
    var evalExp = logic.subjectType == LOGIC_SUBJECT_TYPE_QUESTION ? evalExp2 : evalExp3;
    if (evalExp(logic.expression.trim(), question, answers) == false)
        return false;
    return true;
}
//验证两级表达式（非矩阵题型）
var evalExp2 = function (exp, question, answers) {
    var temp1 = exp.split('=');
    var temp2 = temp1[0].split('.');
    var code = temp2[1];
    var attr = temp2[2];
    var criteria = temp1[1];
    if (attr == 'selected') {
        //Q18.OP1.selected=true
        var answer = answerOf(code, answers);
        if ((criteria == 'true' && answer != null) ||
            (criteria == 'false' && answer == null)) {
            return true;
        }
        return false;
    } else /*if (attr == 'text')*/ {
        //Q18.OP1.text='yiqing'
        var answer = answerOf(code, answers);
        if (answer != null && criteria == answer.text) {
            return true;
        }
        return false;
    }
}
//验证三级表达式（矩阵题型）
var evalExp3 = function (exp, question, answers) {
    //Q10.IX1.OP6.selected=true
    var temp1 = exp.split('=');
    var temp2 = temp1[0].split('.');
    var code = temp2[1];
    var attr = temp2[2];
    var criteria = temp1[1];
    if (attr == 'selected') {
        var answer = answerOf(code, answers);
        if ((criteria == 'true' && answer != null) ||
            (criteria == 'false' && answer == null)) {
            return true;
        }
        return false;
    } else /*if (attr == 'text')*/ {
        var answer = answerOf(code, answers);
        if (answer != null && criteria == answer.text) {
            return true;
        }
        return false;
    }
}
//比较传入的两个参数
var compExp = function (relation, expVal, realVal) {
    if (relation == '!=')
        return realVal != expVal;
    else if (relation == '>=')
        return realVal >= expVal;
    else if (relation == '<=')
        return realVal <= expVal;
    else if (relation == '=')
        return realVal == expVal;
    else if (relation == '>')
        return realVal > expVal;
    else if (relation == '<')
        return realVal < expVal;
    else
        return false;
}
//根据题目number找到题目的索引
var indexOf = function (number, questions) {
    for (var i = 0; i < questions.length; ++i) {
        if (questions[i].number == number)
            return i;
    }
    return -1;
}
//根据选项code返回answer对象
var answerOf = function (code, answers) {
    for (var i = 0; i < answers.length; ++i) {
        if (answers[i].code == code)
            return answers[i];
    }
    return null;
}

//解析关系表达式
var relationOf = function (expression) {
    var relation = ">";
    if (expression.indexOf("!=") >= 0)
        relation = "!=";
    else if (expression.indexOf(">=") >= 0)
        relation = ">=";
    else if (expression.indexOf("<=") >= 0)
        relation = "<=";
    else if (expression.indexOf("=") >= 0)
        relation = "=";
    else if (expression.indexOf(">") >= 0)
        relation = ">";
    else if (expression.indexOf("<") >= 0)
        relation = "<";
    return relation;
}
//通用逻辑（可答/最多选项/最少选项/开放选项）
var evalGeneralLogic = function (question, context) {
    if (question.type == QUESTION_TYPE_SINGLE) {
        var labels = $('.option.checked', context);
        return openOption(question, context, labels);
    } else if (question.type == QUESTION_TYPE_MULTIPLE) {
        var labels = $('.option.checked', context);
        return openOption(question, context, labels);
    } else if (question.type == QUESTION_TYPE_SINGLE_BLANK || question.type == QUESTION_TYPE_MULTIPLE_LINE_BLANK) {
        return openBlank(question, context);
    } else if (question.type == QUESTION_TYPE_MULTIPLE_BLANK) {
        return openBlank(question, context);
    } else if (question.type == QUESTION_TYPE_IMAGE_SINGLE || question.type == QUESTION_TYPE_IMAGE_MULTIPLE) {
        var lis = $('li.checked', context);
        if (question.optional == false) {
            if ($('li.checked', context).length <= 0) {
                //show error
                var tip = "亲，这是必答题哦";
                var tipWidth = 120;
                errorTip('.question-box', context, tip, tipWidth);
                return false;
            }

        }
        //图片题开放选项提示错误信息逻辑
        //for (var i = 0; i < lis.length; ++i) {
        //    var option = optionOf($(lis[i]).attr('oid'), question.options);
        //    if (option.open == true && option.blankOptional == false) {
        //        var textarea = $('.open-option', $(lis[i]));
        //        if (textarea.val().length <= 0) {
        //            //show error
        //            var tip = "亲，这是必填的哦";
        //            var tipWidth = 120;
        //            errorTip('.img-open', context, tip, tipWidth);
        //            return false;
        //        }
        //    }
        //}
        return true;
    } else if (question.type == QUESTION_TYPE_MATRIX_SINGLE) {
        if (question.optional == false) {
            var rowOpen = openRow(question, context);
            var colOpen = openCol(question, context, $('.option.checked',context));
            return rowOpen && colOpen;
        }
        return true;
    } else if (question.type == QUESTION_TYPE_MATRIX_MULTIPLE) {
        if (question.optional == false) {
            var rowOpenF = openRow(question, context);
            var colOpenF = openCol(question, context, $('.option.checked',context));
            return rowOpenF && colOpenF;
        }
        return true;
    } else if (question.type == QUESTION_TYPE_SCORE) {
        if (question.optional == false) {
            if ($('.raty', context).attr('code') == '') {
                //show error
                var tip = "亲，这是必答题哦";
                var tipWidth = 120;
                errorTip('.question-box', context, tip, tipWidth);
                return false;
            }
        }
        return true;
    } else if (question.type == QUESTION_TYPE_MATRIX_SCORE) {
        /*if (question.optional == false) {
            if (question.layout == QUESTION_LAYOUT_FLUID) {
                var raties = $('.raty', context);
                for (var i = 0; i < raties.length; ++i) {
                    if ($(raties[i]).attr('code') != '') {

                        return true;
                    }
                }
                //show error
                var tip = "亲，这是必答题哦";
                var tipWidth = 120;
                errorTip('.question-box', context, tip, tipWidth);
                return false;
            } else {
                var raties = $('.raty', context);
                for (var i = 0; i < raties.length; ++i) {
                    if ($(raties[i]).attr('code') != '') {

                        return true;
                    }
                }
                //show error
                var tip = "亲，这是必答题哦";
                var tipWidth = 120;
                errorTip('.question-box', context, tip, tipWidth);
                return false;
            }
        }*/
        if (question.optional == false) {
            return openScore(question, context);
        }
        return true;
    } else if (question.type == QUESTION_TYPE_DESC) {
        return true;
    }
    return false;
}
//必答题提示
var errorTip = function (place, context, tip, tipWidth) {
    if ($('.error-tip', context).html() == "" || $('.error-tip', context).html() == null || $('.error-tip', context).html() !== tip) {
        $('.error-tip', context).remove();

        if (place == ".open") {
            $('.mandatory').css('margin-left', '84');
        }
        $(place).append('<p class="font-size-12 error-tip mandatory"></p>');
        $('.error-tip', context).css('width', tipWidth).html(tip);
    } else {
        $('.mandatory', context).css('animation', 'none');
        setTimeout(function () {
            //$('.mandatory',context).css({'animation':'move 0.2s ease 3'});
            $('.mandatory', context).css({
                '-webkit-animation-name': 'move',
                '-webkit-animation-duration': '0.2s',
                '-webkit-animation-iteration-count': '3',
                '-webkit-animation-timing-function': 'ease'
            });
        }, 100);
    }
}
//选择题开放题判断
var openOption = function(question, context, labels) {
    //题必填提示
    if (question.optional == false) {
        if (labels.length <= 0) {
            //show error
            var tip = "亲，这是必答题哦";
            errorTip('.question-box', context, tip, 120);
            return false;
        }
    }
    //最少与最多选择项数
    if (question.selectionMin > 0 && labels.length < question.selectionMin) {
        //show error
        var tip = "最少选择" + question.selectionMin + "个选项";
        errorTip('.question-box', context, tip, 130);
        return false;
    }
    if (question.selectionMax > 0 && labels.length > question.selectionMax) {
        //show error
        var tip = "最多选择" + question.selectionMax + "个选项";
        errorTip('.question-box', context, tip, 130);
        return false;
    }
    //选项上的开放选项
    for (var i = 0; i < labels.length; ++i) {
        var option = optionOf($(labels[i]).attr('oid'), question.options);
        if (option.open == true && option.blankOptional == false) {
            var textarea = $('.open-option', $(labels[i]));
            var index = $('.option[code="'+option.code+'"]').attr('code').substr(2);
            if (textarea.val().length <= 0) {
                //show error
                var tip = "亲，第"+index+"个填空是必填的哦";
                errorTip('.question-box', context, tip, 120);
                return false;
            }
        }
        if (option.open == true && option.blankOptional == false) {
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_TEXT && option.blankMax > 0) {
                if ($('.open-option', $(labels[i])).val().length > option.blankMax || $('.open-option', $(labels[i])).val().length < option.blankMin) {
                    var tip = "亲，第"+index+"个填空最多输入"+option.blankMax+"个字";
                    errorTip('.question-box', context, tip, 200);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_NUMBER) {
                var val = $('.open-option', $(labels[i])).val();
                var regx = /^[0-9]*$/;
                if (regx.test(val) == true) {
                    if ((val > option.blankMax || val < option.blankMin) && (option.blankMax != option.blankMin)) {
                        var tip = "亲，第"+index+"个填空限制输入数值范围为"+option.blankMin+"~"+option.blankMax+"之间";
                        errorTip('.question-box', context, tip, 270);
                        return false;
                    }
                } else {
                    var tip = "亲，第"+index+"个填空请填入数值";
                    errorTip('.question-box', context, tip, 180);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_ALPHABET) {
                var val = $('.open-option', $(labels[i])).val();
                var regx = /^[A-Za-z]+$/;
                if (regx.test(val) == false) {
                    var tip = "亲，第"+index+"个填空只可以输入字母哦";
                    errorTip('.question-box', context, tip, 220);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_EMAIL) {
                var val = $('.open-option', $(labels[i])).val();
                var regx = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if (regx.test(val) == false) {
                    var tip = "亲，第"+index+"个填空请输入正确的邮箱";
                    errorTip('.question-box', context, tip, 220);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_PHONENUMBER) {
                var val = $('.open-option', $(labels[i])).val();
                var regx = /^1[3|4|5|7|8]\d{9}$/;
                if (regx.test(val) == false) {
                    var tip = "亲，第"+index+"个填空请输入正确的手机号";
                    errorTip('.question-box', context, tip, 250);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_DATE) {
                var val = $('.open-option', $(labels[i])).val();
                var regx = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/;
                if (regx.test(val) == false) {
                    var tip = "亲，第"+index+"个填空请输入正确的日期（YYYY-MM-DD）";
                    errorTip('.question-box', context, tip, 300);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_TIME) {
                var val = $('.open-option', $(labels[i])).val();
                var regx = /([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/;
                if (regx.test(val) == false) {
                    var tip = "亲，第"+index+"个填空请输入正确的时间（hh:mm:ss）";
                    errorTip('.question-box', context, tip, 300);
                    return false;
                }
            }
        }
    }
    return true;
}
//填空题开放题判断
var openBlank = function(question, context) {
    for (var i = 0; i < question.options.length; i++) {
        var option = $('.fill[oid="'+question.options[i].id+'"]').val();
        if (question.options[i].blankOptional == false) {
            if (option.length <= 0) {
                //show error
                var tip = "亲，填空"+(i+1)+"是必答题哦";
                errorTip('.question-box', context, tip, 120);
                return false;
            }
        }
        if (question.options[i].blankType == OPTION_OPEN_BLANK_TYPE_TEXT) {
            if ((question.options[i].blankMax) > 0 && (option.length > question.options[i].blankMax)) {
                var tip = "亲，填空"+(i+1)+"最多输入" + question.options[i].blankMax + "个字";
                errorTip('.question-box', context, tip, 170);
                return false;
            }
        }
        if (question.options[i].blankType == OPTION_OPEN_BLANK_TYPE_NUMBER) {
            var val = option;
            var regx = /^[0-9]*$/
            if (regx.test(val) == true) {
                if (question.options[i].blankMax != question.options[i].blankMin) {
                    if (val >= 0 && $('.blank', context).val() < question.options[i].blankMin) {
                        var tip = "亲，填空"+(i+1)+"最小值为" + question.options[i].blankMin;
                        errorTip('.question-box', context, tip, 150);
                        return false;
                    }
                    if (val >= question.options[i].blankMin && val > question.options[i].blankMax) {
                        var tip = "亲，填空"+(i+1)+"最大值为" + question.options[i].blankMax;
                        errorTip('.question-box', context, tip, 160);
                        return false;
                    }
                }
            } else {
                var tip = "亲，填空"+(i+1)+"请填入数值";
                errorTip('.question-box', context, tip, 150);
                return false;
            }

        }
        if (question.options[i].blankType == OPTION_OPEN_BLANK_TYPE_ALPHABET) {
            var val = option;
            var regx = /^[A-Za-z]+$/;
            if (regx.test(val) == false) {
                var tip = "亲，填空"+(i+1)+"只可以输入字母哦";
                errorTip('.question-box', context, tip, 180);
                return false;
            }
        }
        if (question.options[i].blankType == OPTION_OPEN_BLANK_TYPE_EMAIL) {
            var val = option;
            var regx = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if (regx.test(val) == false) {
                var tip = "亲，填空"+(i+1)+"请输入正确的邮箱";
                errorTip('.question-box', context, tip, 180);
                return false;
            }
        }
        if (question.options[i].blankType == OPTION_OPEN_BLANK_TYPE_PHONENUMBER) {
            var val = option;
            var regx = /^1[3|4|5|7|8]\d{9}$/;
            if (regx.test(val) == false) {
                var tip = "亲，填空"+(i+1)+"请输入正确的手机号";
                errorTip('.question-box', context, tip, 200);
                return false;
            }
        }
        if (question.options[i].blankType == OPTION_OPEN_BLANK_TYPE_DATE) {
            var val = option;
            var regx = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/;
            if (regx.test(val) == false) {
                var tip = "亲，填空"+(i+1)+"请输入正确的日期（YYYY-MM-DD）";
                errorTip('.question-box', context, tip, 280);
                return false;
            }
        }
        if (question.options[i].blankType == OPTION_OPEN_BLANK_TYPE_TIME) {
            var val = option;
            var regx = /([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/;
            if (regx.test(val) == false) {
                var tip = "亲，填空"+(i+1)+"请输入正确的时间（hh:mm:ss）";
                errorTip('.question-box', context, tip, 280);
                return false;
            }
        }
    }
    return true;
}
//矩阵行开放
var openRow = function(question, context) {
    //所有的行
    for (var i = 0;i<question.rows.length; i++){
        var option = question.rows[i];
        var textarea = $('.row-option[oid="'+option.id+'"] .matrix-row-title .open-option');
        if (option.open == true && option.blankOptional == false) {
            //var textarea = $(ele+'[oid="'+option.id+'"]'+' .open-option', context);
            if (textarea.val().length <= 0) {
                //show error
                var tip = "亲，行"+(i+1)+"是必填的哦";
                errorTip('.question-box', context, tip, 120);
                return false;
            }
        }
        if (option.open == true && option.blankOptional == false) {
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_TEXT) {
                if ((option.blankMax > 0) && (textarea.val().length > option.blankMax) || (textarea.val().length < option.blankMin)) {
                    var tip = "亲，行"+(i+1)+"最多输入"+option.blankMax+"个字";
                    errorTip('.question-box', context, tip, 140);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_NUMBER) {
                var val = textarea.val();
                var regx = /^[0-9]*$/;
                if (regx.test(val) == true) {
                    if ((val > option.blankMax || val < option.blankMin) && (option.blankMax != option.blankMin)) {
                        var tip = "亲，行"+(i+1)+"限制输入数值范围为"+option.blankMin+"~"+option.blankMax+"之间";
                        errorTip('.question-box', context, tip, 220);
                        return false;
                    }
                } else {
                    var tip = "亲，行"+(i+1)+"请填入数值";
                    errorTip('.question-box', context, tip, 120);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_ALPHABET) {
                var val = textarea.val();
                var regx = /^[A-Za-z]+$/;
                if (regx.test(val) == false) {
                    var tip = "亲，行"+(i+1)+"只可以输入字母哦";
                    errorTip('.question-box', context, tip, 180);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_EMAIL) {
                var val = textarea.val();
                var regx = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if (regx.test(val) == false) {
                    var tip = "亲，行"+(i+1)+"请输入正确的邮箱";
                    errorTip('.question-box', context, tip, 180);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_PHONENUMBER) {
                var val = textarea.val();
                var regx = /^1[3|4|5|7|8]\d{9}$/;
                if (regx.test(val) == false) {
                    var tip = "亲，行"+(i+1)+"请输入正确的手机号";
                    errorTip('.question-box', context, tip, 180);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_DATE) {
                var val = textarea.val();
                var regx = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/;
                if (regx.test(val) == false) {
                    var tip = "亲，行"+(i+1)+"请输入正确的日期（YYYY-MM-DD）";
                    errorTip('.question-box', context, tip, 300);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_TIME) {
                var val = textarea.val();
                var regx = /([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/;
                if (regx.test(val) == false) {
                    var tip = "亲，行"+(i+1)+"请输入正确的时间（hh:mm:ss）";
                    errorTip('.question-box', context, tip, 300);
                    return false;
                }
            }
        }
    }
    return true;
}
//矩阵列开放
var openCol = function(question, context, labels){
    for ( var i = 0;i<labels.length; i++) {
        var option = optionOf($(labels[i]).attr('oid'), question.cols);
        var rowIndex = $(labels[i]).parents('.row-option').attr('code').substr(2);
        var colIndex = $(labels[i]).attr('code').substr(2);
        if (option.open == true && option.blankOptional == false) {
            var textarea = $('.open-option', $(labels[i]));
            if (textarea.val().length <= 0) {
                //show error
                //var tip = "亲，行"+index+"列"+(i+1)+"是必填的哦";
                var tip = "亲，行"+rowIndex+"列"+colIndex+"是必填的哦";
                errorTip('.question-box', context, tip, 140);
                return false;
            }
        }
        if (option.open == true && option.blankOptional == false){
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_TEXT) {
                if ((option.blankMax > 0 ) && ($('.open-option', $(labels[i])).val().length > option.blankMax) || ($('.open-option', context).val().length < option.blankMin)) {
                    //var tip = "亲，行"+index+"列"+(i+1)+"最多输入"+option.blankMax+"个字";
                    var tip = "亲，行"+rowIndex+"列"+colIndex+"最多输入"+option.blankMax+"个字";
                    errorTip('.question-box', context, tip, 180);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_NUMBER) {
                var val = $('.open-option', $(labels[i])).val();
                var regx = /^[0-9]*$/;
                if (regx.test(val) == true) {
                    if ((val > option.blankMax || val < option.blankMin) && (option.blankMax != option.blankMin)) {
                        //var tip = "亲，行"+index+"列"+(i+1)+"限制输入数值范围为"+option.blankMin+"~"+option.blankMax+"之间";
                        var tip = "亲，行"+rowIndex+"列"+colIndex+"限制输入数值范围为"+option.blankMin+"~"+option.blankMax+"之间";
                        errorTip('.question-box', context, tip, 250);
                        return false;
                    }
                } else {
                    //var tip = "亲，行"+index+"列"+(i+1)+"请填入数值";
                    var tip = "亲，行"+rowIndex+"列"+colIndex+"请填入数值";
                    errorTip('.question-box', context, tip, 140);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_ALPHABET) {
                var val = $('.open-option', $(labels[i])).val();
                var regx = /^[A-Za-z]+$/;
                if (regx.test(val) == false) {
                    //var tip = "亲，行"+index+"列"+(i+1)+"只可以输入字母哦";
                    var tip = "亲，行"+rowIndex+"列"+colIndex+"只可以输入字母哦";
                    errorTip('.question-box', context, tip, 190);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_EMAIL) {
                var val = $('.open-option', $(labels[i])).val();
                var regx = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if (regx.test(val) == false) {
                    //var tip = "亲，行"+index+"列"+(i+1)+"请输入正确的邮箱";
                    var tip = "亲，行"+rowIndex+"列"+colIndex+"请输入正确的邮箱";
                    errorTip('.question-box', context, tip, 190);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_PHONENUMBER) {
                var val = $('.open-option', $(labels[i])).val();
                var regx = /^1[3|4|5|7|8]\d{9}$/;
                if (regx.test(val) == false) {
                    //var tip = "亲，行"+index+"列"+(i+1)+"请输入正确的手机号";
                    var tip = "亲，行"+rowIndex+"列"+colIndex+"请输入正确的手机号";
                    errorTip('.question-box', context, tip, 200);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_DATE) {
                var val = $('.open-option', $(labels[i])).val();
                var regx = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/;
                if (regx.test(val) == false) {
                    //var tip = "亲，行"+index+"列"+(i+1)+"请输入正确的日期（YYYY-MM-DD）";
                    var tip = "亲，行"+rowIndex+"列"+colIndex+"请输入正确的日期（YYYY-MM-DD）";
                    errorTip('.question-box', context, tip, 300);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_TIME) {
                var val = $('.open-option', $(labels[i])).val();
                var regx = /([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/;
                if (regx.test(val) == false) {
                    //var tip = "亲，行"+index+"列"+(i+1)+"请输入正确的时间（hh:mm:ss）";
                    var tip = "亲，行"+rowIndex+"列"+colIndex+"请输入正确的时间（hh:mm:ss）";
                    errorTip('.question-box', context, tip, 260);
                    return false;
                }
            }
        }
    }
    return true;
}
//矩阵打分题开放
var openScore = function(question, context) {
    if (question.optional == false) {
        var raties = $('.raty', context);
        var flag = true, totalFlag = true;
        for (var i = 0; i < raties.length; ++i) {
            if ($(raties[i]).attr('code') != '') {
                flag = true;
            }else{
                flag = false;
            }
            totalFlag = totalFlag && flag;
        }
        if (!totalFlag){
            var tip = "亲，这是必答题哦";
            errorTip('.question-box', context, tip, 120);
            return false;
        }
    }
    for (var i = 0; i < question.rows.length; i++) {
        var option = question.rows[i];
        var textarea = $('.raty[oid="'+option.id+'"]').parents('.raty-box').find('textarea');
        if (option.open == true && option.blankOptional == false) {
            //var textarea = $(ele+'[oid="'+option.id+'"]'+' .open-option', context);
            if (textarea.val().length <= 0) {
                //show error
                var tip = "亲，行"+(i+1)+"是必填的哦";
                errorTip('.question-box', context, tip, 120);
                return false;
            }
        }
        if (option.open == true && option.blankOptional == false) {
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_TEXT) {
                if (textarea.val().length > option.blankMax || textarea.val().length < option.blankMin) {
                    var tip = "亲，行"+(i+1)+"最多输入"+option.blankMax+"个字";
                    errorTip('.question-box', context, tip, 140);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_NUMBER) {
                var val = textarea.val();
                var regx = /^[0-9]*$/;
                if (regx.test(val) == true) {
                    if (val > option.blankMax || val < option.blankMin) {
                        var tip = "亲，行"+(i+1)+"限制输入数值范围为"+option.blankMin+"~"+option.blankMax+"之间";
                        errorTip('.question-box', context, tip, 220);
                        return false;
                    }
                } else {
                    var tip = "亲，行"+(i+1)+"请填入数值";
                    errorTip('.question-box', context, tip, 120);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_ALPHABET) {
                var val = textarea.val();
                var regx = /^[A-Za-z]+$/;
                if (regx.test(val) == false) {
                    var tip = "亲，行"+(i+1)+"只可以输入字母哦";
                    errorTip('.question-box', context, tip, 180);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_EMAIL) {
                var val = textarea.val();
                var regx = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if (regx.test(val) == false) {
                    var tip = "亲，行"+(i+1)+"请输入正确的邮箱";
                    errorTip('.question-box', context, tip, 180);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_PHONENUMBER) {
                var val = textarea.val();
                var regx = /^1[3|4|5|7|8]\d{9}$/;
                if (regx.test(val) == false) {
                    var tip = "亲，行"+(i+1)+"请输入正确的手机号";
                    errorTip('.question-box', context, tip, 180);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_DATE) {
                var val = textarea.val();
                var regx = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/;
                if (regx.test(val) == false) {
                    var tip = "亲，行"+(i+1)+"请输入正确的日期（YYYY-MM-DD）";
                    errorTip('.question-box', context, tip, 300);
                    return false;
                }
            }
            if (option.blankType == OPTION_OPEN_BLANK_TYPE_TIME) {
                var val = textarea.val();
                var regx = /([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/;
                if (regx.test(val) == false) {
                    var tip = "亲，行"+(i+1)+"请输入正确的时间（hh:mm:ss）";
                    errorTip('.question-box', context, tip, 300);
                    return false;
                }
            }
        }
    }
    return true;
}
//跳题逻辑
var evalJumpLogic = function (question, answers, logics, questions, index) {
    //
    var target = '';
    // 1. top priority is unconditional logic
    if (target == '') {
        for (var i = 0; i < logics.length; ++i) {
            if (logics[i].expType == LOGIC_EXP_TYPE_UNCONDITIONAL) {
                target = logics[i].target;
                break;
            }
        }
    }
    // 2. next priority is count logic
    if (target == '') {
        for (var i = 0; i < logics.length; ++i) {
            if (logics[i].expType == LOGIC_EXP_TYPE_COUNT) {
                if (evalCountLogic(logics[i], question, answers) == true) {
                    target = logics[i].target;
                    break;
                }
            }
        }
    }
    // 3. next priority is complex logic
    if (target == '') {
        for (var i = 0; i < logics.length; ++i) {
            if (logics[i].expType == LOGIC_EXP_TYPE_COMPLEX) {
                if (evalComplexLogic(logics[i], question, answers) == true) {
                    target = logics[i].target;
                    break;
                }
            }
        }
    }
    // 4. next priority is simple logic
    if (target == '') {
        for (var i = 0; i < logics.length; ++i) {
            if (logics[i].expType == LOGIC_EXP_TYPE_SIMPLE) {
                if (evalSimpleLogic(logics[i], question, answers) == true) {
                    target = logics[i].target;
                    break;
                }
            }
        }
    }
    // 5.
    if (target != '') {
        if (target == 'complete' || target == 'exception') {
            _closing = target;
            return questions.length;
        } else {
            var i = indexOf(target, questions);
            if (i >= 0) {
                return i;
            } else {
                // Can not find the appropriate question, then goto next
                return index + 1;
            }
        }
    } else {
        return index + 1;
    }
}

//引用逻辑
var evalRefLogic = function (question, answers, questions) {
    if (answers != null && answers.length > 0) {
        var option = optionOf2(answers[0].code, question.options);
        var tag = '[' + question.number + ']';
        var regexp = new RegExp(question.number, "g");
        for (var i = _index; i < questions.length; ++i) {
            if (questions[i].title.indexOf(tag) >= 0)
                questions[i].title = evalReference(question, regexp, answers[0], option, questions[i]);
            var options = questions[i].rows || questions[i].options;
            for (var j = 0; j < options.length; ++j) {
                if (options[j].title.indexOf(tag) >= 0)
                    options[j].title = evalReference(question, regexp, answers[0], option, options[j]);
            }
        }
    }
}
//替换符号
var evalReference = function (question, regexp, answer, option, target) {
    if (question.type == QUESTION_TYPE_SINGLE_BLANK || question.type == QUESTION_TYPE_MULTIPLE_LINE_BLANK) {
        return target.title.replace(regexp, answer.text);
    } else if (question.type == QUESTION_TYPE_SINGLE || question.type == QUESTION_TYPE_IMAGE_SINGLE) {
        if (option.open)
            return target.title.replace(regexp, answer.text);
        else
            return target.title.replace(regexp, option.title);
    } else if (question.type == QUESTION_TYPE_SCORE) {
        return target.title.replace(regexp, option.title);
    } else {
        // todo
    }
    return target.title;
}

//验证逻辑/显示题目
var evalThenGoto = function (answers, question, questions, sample) {
    //获取跳题逻辑
    ajaxGet2(myapp.apiHost + 'logic/search?type=' + LOGIC_TYPE_JUMP + '&subjecttype=' + LOGIC_SUBJECT_TYPE_QUESTION + '&contextid=' + question.id, function (data) {
        //验证跳题逻辑
        _index = evalJumpLogic(question, answers, data.objs, questions, _index);
        //
        if (_index < questions.length) {
            ++_step;
            //验证引用逻辑
            evalRefLogic(question, answers, questions);
            //显示下一题
            gotoNext(questions[_index], _index, questions.length);
        } else {
            //完成答卷
            finish(sample);
        }
    }, function (err) {
        alert(err);
    });
}
//显示答案
var renderAnswers = function (question, answers, context) {
    if (question.type == QUESTION_TYPE_SINGLE ||
        question.type == QUESTION_TYPE_MULTIPLE) {
        for (var i = 0; i < answers.length; ++i) {
            var label = $('.option[code="' + answers[i].code + '"]', context);
            label.trigger('click');
            var option = optionOf2(answers[i].code, question.options);
            if (option.open && answers[i].text)
                label.find('textarea').val(answers[i].text);
        }
    } else if (question.type == QUESTION_TYPE_SINGLE_BLANK ||
        question.type == QUESTION_TYPE_MULTIPLE_BLANK ||
        question.type == QUESTION_TYPE_MULTIPLE_LINE_BLANK) {
        for (var i = 0; i < answers.length; ++i) {
            $('.fill[code="' + answers[i].code + '"]', context).val(answers[i].text);
        }
    } else if (question.type == QUESTION_TYPE_IMAGE_SINGLE ||
        question.type == QUESTION_TYPE_IMAGE_MULTIPLE) {
        for (var i = 0; i < answers.length; ++i) {
            $('li[code="' + answers[i].code + '"]', context).trigger('click');
        }
    } else if (question.type == QUESTION_TYPE_MATRIX_SINGLE || question.type == QUESTION_TYPE_MATRIX_MULTIPLE) {
        for (var i = 0; i < answers.length; ++i) {
            var matrix = $('.row-option[oid="' + answers[i].optionID + '"]');
            var label = $('.option[code="' + answers[i].code + '"]', matrix);
            label.trigger('click');
            var option = optionOf2(answers[i].code, question.options);
            matrix.find('.matrix-row-title textarea').val(answers[i].rowText);
            if (option.open && answers[i].text)
                label.find('textarea').val(answers[i].text);
        }
    } else if (question.type == QUESTION_TYPE_SCORE) {
        for (var i = 0; i < answers.length; ++i) {
            tickRaty($('.raty a[code="' + answers[i].code + '"]'));
            var square = $('.square[code="' + answers[i].code + '"]', context);
            square.trigger('click', context);
        }
    } else if (question.type == QUESTION_TYPE_MATRIX_SCORE) {
        if (question.layout == QUESTION_LAYOUT_FLUID) {
            for (var i = 0; i < answers.length; ++i) {
                var matrix = $('.raty[oid="' + answers[i].optionID + '"]');
                matrix.parents('.raty-box').find('.row-textarea textarea').val(answers[i].rowText);
                tickRaty($('.raty[oid="'+answers[i].optionID+'"] a[code="' + answers[i].code + '"]'));
            }
        } else {
            for (var i = 0; i < answers.length; ++i) {
                var matrix = $('.raty[oid="' + answers[i].optionID + '"]');
                matrix.parents('.raty-box').find('.row-textarea textarea').val(answers[i].rowText);
                tickRaty($('.raty[oid="'+answers[i].optionID+'"] a[code="' + answers[i].code + '"]'));
            }
        }
    } else if (question.type == QUESTION_TYPE_DESC) {
    }
}

//结束答卷
var finish = function (sample) {
    if (_closing == 'exception') {
        alert('exception');
        //window.location = 'exception.html?memberid=' + memberid + '&templateid=' + templateid;
    } else { //complete
        alert('complete');
        //ajaxPost(myapp.apiHost + 'sample/complete', sample, null, function (data) {
        //    var reward = data.objs[0].rewardEntity;
        //    window.location = 'closing.html?memberid=' + memberid + '&templateid=' + templateid + '&amount=' + reward.amount + '&typecode=' + reward.typeCode + '&typename=' + reward.typeName;
        //}, function (err) {
        //    alert(err);
        //});
    }
}
//显示打分控件
var tickRaty = function (me) {
    var container = $(me).parents('.raty');
    var max = parseInt(container.attr('max'));
    var num = parseInt(container.attr('num'));
    var exid = container.attr('exid');
    var half = container.attr('half');
    var meid = $(me).attr('oid');
    var color = ['#FFF176','#FFEB3A','#FDD934','#FFCB28','#FFC106','#FFB300','#FFA100','#FB8D00','#F57C00','#EF6C00'];
    //var tip = container.attr('tip');
    //var noneof = container.attr('noneof');
    container.find('.star').each(function () {
        $(this).html('&#xe602;').css('color', '#FF7F00');
    });
    container.parents('.raty-box').find('.score').css('color', '#EE5752');
    if (half && half == "half")
        num = (exid == meid) ? ((num + 1) % 3) : 1;
    else
        num = (exid == meid) ? ((num + 1) % 2) : 1;
    var rank = $(me).attr('index');
    if (half && half == "half")
        rank = (num == 0) ? (rank - 1) : (num == 1 ? (rank - 1 + 0.5) : rank);
    else
        rank = (num == 0) ? (rank - 1) : (rank);
    var html = "";
    var rank_floor = Math.floor(rank);
    var rank_ceil = Math.ceil(rank);
    for (var i = 1; i <= rank_floor; i++){
        container.find('.star').eq(i - 1).html('&#xe603;');
        container.find('.square').eq(i - 1).css('background-color',color[i]);
    }
    if (rank - rank_floor > 0)
        container.find('.star').eq(rank_floor).html('&#xe604;');
    for (var i = rank_ceil + 1; i <= max; i++){
        container.find('.star').eq(i - 1).html('&#xe602;');
        container.find('.square').eq(i - 1).css('background-color','#fff');
    }
    container.attr('num', num);
    container.attr('exid', meid);
    container.attr('code', $(me).attr('code'));
    container.parents('.raty-box').find('.score').html($(me).attr('value') + '分').css('color', '#333');
}

//取消打分控件
var cancelRaty = function (me) {
    var container = $(me).parents('.raty-box');
    container.find('.star').each(function () {
        $(this).html('&#xe602;').css('color', '#eee');
        $(this).parent().siblings('.raty').attr('code', '');
        $(this).parent().siblings('.raty').attr('index', '');
    });
    container.find('.square').each(function () {
        $(this).css('background-color', '#fff');
        $(this).parent().siblings('.raty').attr('code', '');
        $(this).parent().siblings('.raty').attr('index', '');
    });
    container.attr('num', '0');
    container.attr('exid', '');
    container.attr('code', '');
    container.find('.score').html('未涉及').css('color', '#eee');
}

//进度条
function setProgress(pos, total) {
    var progress = ($('.progress').width() - 30) / total;
    $('.bar').animate({ 'left': pos * progress }, 1000);
    $('.mask').animate({ 'width': pos * progress + 30 }, 1000);
}
//把已乱序的数组与原题目组连接到一块形成新的题目组
var shift = function(newQuestions,newOrders,startIndex) {
    newOrders.unshift(startIndex,0);
    Array.prototype.splice.apply(newQuestions,newOrders);
}
//选项乱序
function shuffle(array, flag) {
    var cur = (flag == 2) ? (array.length - 1) : array.length;
    var stop = (flag == 1) ? 1 : 0;
    // While there remain elements to shuffle...
    while (cur > stop) {
        // Pick a remaining element...
        var pos = Math.floor(Math.random() * cur);
        cur -= 1;
        // And swap it with the current element.
        if (flag != 1 || pos > 0) {
            var temp = array[cur];
            array[cur] = array[pos];
            array[pos] = temp;
        }
    }
    return array;
}
//题目乱序
function shuffles(inputArr) {
    var valArr = [],
        k = '';
    for (k in inputArr) { // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
        }
    }
    valArr.sort(function() {
        return 0.5 - Math.random();
    });

    return valArr;
}
var questionShuffle = function(array, answers) {
    var halfArray = [];//排序中答过的
    var uniqueAnswers = [];//临时存放答案
    //已答过的题不再参与乱序
    if (answers){
        $.map(answers,function(ele,i){
            uniqueAnswers.push(ele.questionID);
        });
        var newAnswers = uniqueAnswers.unique();//所有答案的questionid，唯一
        for (var i = 0;i<array.length;i++){
            for (var j = 0;j<newAnswers.length;j++){
                if(array.length && (array[i].id == newAnswers[j])){
                    halfArray.push(array[i]);
                    array.splice(i,1);//剩下未答过的
                }
            }
        }
    }
    return halfArray.concat(shuffles(array));
}
//题目乱序
function judge(questions, orders, sample) {
    var newQuestions = [];
    $.map(questions,function(i,ele){
        newQuestions.push(i);
    })
    //如果已经答完则不需要再乱序
    if (sample && questions.length == sample.length) {
        return questions;
    }
    for (var i = 0;i < orders.length; i++){
        for (var j = 0;j < questions.length; j++) {
            if (questions[j].id == orders[i].startQuestionID){
                var startIndex = j;//记录位置
                var ordersArray = [];
                ordersArray.push(questions[j]);
                var z = j + 1;
                while((z < questions.length) && (questions[z].id != orders[i].endQuestionID)) {
                    ordersArray.push(questions[z]);
                    z++;
                }
                ordersArray.push(questions[z]);
                var newOrders = questionShuffle(ordersArray, sample);
                newQuestions.splice(startIndex, newOrders.length);//截取掉原来数组存放的
                shift(newQuestions,newOrders, startIndex);
            }
        }
    }
    return newQuestions;
}