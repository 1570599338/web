
var source_single = '<li class="module question" oid="${question.id}" issue="${question.type}" layout="${question.layout}" cols_count="${column_count}"><div class="topic-type"><div class="topic-type-menu"><div class="setup-group"><h4>${question.number}</h4><a class="up" href="javascript:;"><i class="up-icon-active" ></i></a><a class="down" href="javascript:;"><i class="down-icon-active" ></i></a><a class="bulk" href="javascript:;" style="display: none;"><i class="copy-icon-active"></i></a><a class="del" href="javascript:;" style="display: none;"><i class="del2-icon-active"></i></a></div></div><div class="topic-type-con"><div class="drag-area"><div class="th4 T-edit q-title" name="question">$${question.title}</div></div><ul class="unstyled options {@if question.layout === \"transverse\" || question.layout === \"column\"}cols-ul{@/if}">{@each question.options as option}<li class="option" oid=${option.id} style="{@if disp_type === \'column\'}width:${column_width};{@/if}"><input type="radio" name="radio"><label class="T-edit-min" for="" name="option" id="${option.id}">$${option.title}</label>{@if option.open}<input type="text" name="" id="" style="display:none;" class="open_input">{@/if}</li>{@/each}</ul><div class="operation-hor"><a href="javascript:;" class="add" style="display: none;"><i class="add-icon-active"></i></a><a href="javascript:;" class="bulk" style="display: none;"><i class="clone-icon-active"></i></a></div></div><div class="tip-box" style="{@if question.logicCount === 0}display:none{@/if};"><a href="javascript:;"><i class="iconfont">&#xe611;</i><span>$${question.logicCount}</span></a></div></div></li>';
var source_multiple = '<li class="module question" oid="${question.id}" issue="${question.type}" layout="${question.layout}" cols_count="${column_count}"><div class="topic-type"><div class="topic-type-menu"><div class="setup-group"><h4>${question.number}</h4><a class="up" href="javascript:;"><i class="up-icon-active" ></i></a><a class="down" href="javascript:;"><i class="down-icon-active" ></i></a><a class="bulk" href="javascript:;" style="display: none;"><i class="copy-icon-active"></i></a><a class="del" href="javascript:;" style="display: none;"><i class="del2-icon-active"></i></a></div></div><div class="topic-type-con"><div class="drag-area"><div class="q-title th4 T-edit" name="question">$${question.title}</div></div><ul class="unstyled options {@if question.layout === \"transverse\" || question.layout === \"column\"}cols-ul{@/if}">{@each question.options as option}<li class="option" oid=${option.id} style="{@if disp_type === \'column\'}width:${column_width};{@/if}"><input type="checkbox" name="checkbox"><label class="T-edit-min" name="option" id="${option.id}">$${option.title}</label>{@if option.open}<input type="text" name="" id="" style="display:none;" class="open_input">{@/if}</li>{@/each}</ul><div class="operation-hor"><a href="javascript:;" class="add" style="display: none;"><i class="add-icon-active"></i></a><a href="javascript:;" class="bulk" style="display: none;"><i class="clone-icon-active"></i></a></div></div><div class="tip-box" style="{@if question.logicCount == 0}display:none{@/if};"><a href="javascript:;"><i class="iconfont">&#xe611;</i><span>$${question.logicCount}</span></a></div></div></li>';
var source_score = '<li class="module question" oid="${question.id}" issue="${question.type}" layout="${question.layout}" cols_count="${column_count}"><div class="topic-type"><div class="topic-type-menu"><div class="setup-group"><h4>${question.number}</h4><a class="up" href="javascript:;"><i class="up-icon-active" ></i></a><a class="down" href="javascript:;"><i class="down-icon-active" ></i></a><a class="bulk" href="javascript:;" style="display: none;"><i class="copy-icon-active"></i></a><a class="del" href="javascript:;" style="display: none;"><i class="del2-icon-active"></i></a></div></div><div class="topic-type-con"><div class="drag-area"><div class="th4 T-edit q-title" name="question">$${question.title}</div></div><ul class="unstyled options {@if question.layout === \"transverse\" || question.layout === \"column\"}cols-ul{@/if}">{@each question.options as option}<li class="option" oid=${option.id} style="{@if disp_type === \'column\'}width:${column_width};{@/if}"><input type="radio" name="radio"><label>$${option.value}分 - </label><label class="T-edit-min" for="" name="option" id="${option.id}">$${option.title}</label>{@if option.open}<input type="text" name="" id="" style="display:none;" class="open_input">{@/if}</li>{@/each}</ul><div class="operation-hor"><a href="javascript:;" class="add" style="display: none;"><i class="add-icon-active"></i></a><a href="javascript:;" class="bulk" style="display: none;"><i class="clone-icon-active"></i></a></div></div><div class="tip-box" style="{@if question.logicCount == 0}display:none{@/if};"><a href="javascript:;"><i class="iconfont">&#xe611;</i><span>$${question.logicCount}</span></a></div></div></li>';
var source_image_single = '<li class="module question" oid="${question.id}" issue="${question.type}" layout="${question.layout}" cols_count="${column_count}"><div class="topic-type"><div class="topic-type-menu"><div class="setup-group"><h4>${question.number}</h4><a class="up" href="javascript:;"><i class="up-icon-active" ></i></a><a class="down" href="javascript:;"><i class="down-icon-active" ></i></a><a style="display: none;" href="javascript:;" class="bulk"><i class="copy-icon-active"></i></a><a style="display: none;" href="javascript:;" class="del"><i class="del2-icon-active"></i></a></div></div><div class="topic-type-con"><div class="drag-area"><div name="question" class="th4 T-edit q-title">$${question.title}</div></div><ul class="unstyled columns">{@each question.options as option}<li class="option" oid="${option.id}"><div class="question-img-box" name="${option.id}"><form name="origin_image"><input name="origin_image" type="file" style="display:none" /></form><div class="qimg-con" onclick="$(this).parent().find(\'input[name=origin_image]\').click();"><img src="$${res_host}$${option.thumbUrl}" Maxsrc="$${res_host}$${option.imageUrl}" bbox="" orig_width=""></div><input type="radio" name="radio"><label class="T-edit-min" for="" name="option" id="${option.id}">$${option.title}</label></div></li>{@/each}<li class="drag-zone"><div class="question-img-box abor"><div class="add-qimg-con"><div class="uploader"><label><input type="file" name="option_image" multiple="multiple" title="添加图片"><span>一次最多添加<br>10张图片</span></label></div></div></li></ul></div><div class="tip-box" style="{@if question.logicCount == 0}display:none{@/if};"><a href="javascript:;"><i class="iconfont">&#xe611;</i><span>$${question.logicCount}</span></a></div></div></li>';
var source_image_multiple = '<li class="module question" oid="${question.id}" issue="${question.type}" layout="${question.layout}" cols_count="${column_count}"><div class="topic-type"><div class="topic-type-menu"><div class="setup-group"><h4>${question.number}</h4><a class="up" href="javascript:;"><i class="up-icon-active" ></i></a><a class="down" href="javascript:;"><i class="down-icon-active" ></i></a><a style="display: none;" href="javascript:;" class="bulk"><i class="copy-icon-active"></i></a><a style="display: none;" href="javascript:;" class="del"><i class="del2-icon-active"></i></a></div></div><div class="topic-type-con"><div class="drag-area"><div name="question" class="th4 T-edit q-title">$${question.title}</div></div><ul class="unstyled columns">{@each question.options as option}<li class="option" oid="${option.id}"><div class="question-img-box" name="${option.id}"><form name="origin_image"><input name="origin_image" type="file" style="display:none" /></form><div class="qimg-con" onclick="$(this).parent().find(\'input[name=origin_image]\').click();"><img src="$${res_host}$${option.thumbUrl}" Maxsrc="$${res_host}$${option.imageUrl}" bbox="" orig_width=""></div><input type="checkbox" name="checkbox"><label class="T-edit-min" for="" name="option" id="${option.id}">$${option.title}</label></div></li>{@/each}<li class="drag-zone"><div class="question-img-box abor"><div class="add-qimg-con"><div class="uploader"><label><input type="file" name="option_image" multiple="multiple" title="添加图片"><span>一次最多添加<br>10张图片</span></label></div></div></li></ul></div><div class="tip-box" style="{@if question.logicCount == 0}display:none{@/if};"><a href="javascript:;"><i class="iconfont">&#xe611;</i><span>$${question.logicCount}</span></a></div></div></li>';
var source_blank = '<li class="module question" oid="${question.id}" issue="${question.type}" layout="${question.layout}" cols_count="${column_count}"><div class="topic-type"><div class="topic-type-menu"><div class="setup-group"><h4>${question.number}</h4><a class="up" href="javascript:;" style="display: none;"><i class="up-icon-active"></i></a><a class="down" href="javascript:;" style="display: none;"><i class="down-icon-active"></i></a><a class="bulk" href="javascript:;" style="display: none;"><i class="copy-icon-active"></i></a><a class="del" href="javascript:;" style="display: none;"><i class="del2-icon-active"></i></a></div></div><div class="topic-type-con"><div class="drag-area"><div class="th4 T-edit q-title" name="question">$${question.title}</div></div><ul class="unstyled">{@each question.options as option}<li style="overflow:inherit" class="option" oid="${option.id}"><div class="option-Fill" id=""><div class="min-an" style="display: none;"><i></i></div><input class="" type="text" rows="5" cols="40" name="option"></input></div></li>{@/each}</ul></div><div class="tip-box" style="{@if question.logicCount == 0}display:none{@/if};"><a href="javascript:;"><i class="iconfont">&#xe611;</i><span>$${question.logicCount}</span></a></div></div></li>';
var source_multiple_line_blank = '<li class="module question" oid="${question.id}" issue="${question.type}" layout="${question.layout}" cols_count="${column_count}"><div class="topic-type"><div class="topic-type-menu"><div class="setup-group"><h4>${question.number}</h4><a class="up" href="javascript:;" style="display: none;"><i class="up-icon-active"></i></a><a class="down" href="javascript:;" style="display: none;"><i class="down-icon-active"></i></a><a class="bulk" href="javascript:;" style="display: none;"><i class="copy-icon-active"></i></a><a class="del" href="javascript:;" style="display: none;"><i class="del2-icon-active"></i></a></div></div><div class="topic-type-con"><div class="drag-area"><div class="th4 T-edit q-title" name="question">$${question.title}</div></div><ul class="unstyled">{@each question.options as option}<li style="overflow:inherit" class="option" oid="${option.id}"><div class="option-Fill" id=""><div class="min-an" style="display: none;"><i></i></div><textarea class="" type="text" rows="5" cols="40" name="option"></textarea></div></li>{@/each}</ul></div><div class="tip-box" style="{@if question.logicCount == 0}display:none{@/if};"><a href="javascript:;"><i class="iconfont">&#xe611;</i><span>$${question.logicCount}</span></a></div></div></li>';
var source_multiple_blank = '<li class="module question" oid="${question.id}" issue="${question.type}" layout="${question.layout}" cols_count="${column_count}"><div class="topic-type"><div class="topic-type-menu"><div class="setup-group"><h4>${question.number}</h4><a class="up" href="javascript:;"><i class="up-icon-active" ></i></a><a class="down" href="javascript:;"><i class="down-icon-active" ></i></a><a class="bulk" href="javascript:;" style="display: none;"><i class="copy-icon-active"></i></a><a class="del" href="javascript:;" style="display: none;"><i class="del2-icon-active"></i></a></div></div><div class="topic-type-con"><div class="drag-area"><div class="q-title th4 T-edit" name="question">$${question.title}</div></div><ul class="unstyled options {@if question.layout === \"transverse\" || disp_type === \"column\"}cols-ul{@/if}">{@each question.options as option}<li class="option" oid=${option.id} style="{@if disp_type === \'column\'}width:${column_width};{@/if}"><label class="T-edit-min" name="option" id="${option.id}">$${option.title}</label><input type="text" rows="1" cols="30" name="option"></li>{@/each}</ul><div class="operation-hor"><a href="javascript:;" class="add" style="display: none;"><i class="add-icon-active"></i></a><a href="javascript:;" class="bulk" style="display: none;"><i class="clone-icon-active"></i></a></div></div><div class="tip-box" style="{@if question.logicCount == 0}display:none{@/if};"><a href="javascript:;"><i class="iconfont">&#xe611;</i><span>$${question.logicCount}</span></a></div></div></li>';
var source_matrix_single =
    '<li class="module question" oid="${question.id}" issue="${question.type}">' +
    '<div class="topic-type">' +
        '<div class="topic-type-menu">' +
            '<div class="setup-group">' +
                '<h4>${question.number}</h4>' +
                '<a class="up" href="javascript:;"><i class="up-icon-active" ></i></a>' +
                '<a class="down" href="javascript:;"><i class="down-icon-active" ></i></a>' +
                '<a class="bulk" href="javascript:;" style="display: none;"><i class="copy-icon-active"></i></a>' +
                '<a class="del" href="javascript:;" style="display: none;"><i class="del2-icon-active"></i></a>' +
            '</div>' +
        '</div>' +
        '<div class="topic-type-con">' +
            '<div class="drag-area">' +
                '<div class="th4 T-edit q-title" name="question">$${question.title}</div>' +
            '</div>' +
            '<ul class="unstyled">' +
                '<li>' +
                    '<div class="matrix" style="min-height: 60px;">' +
                        '<table class="table td-Tc" cellspacing="0" cellpadding="0">' +
                            '<thead>' +
                                '<tr>' +
                                    '<td>&nbsp;</td>' +
                                    '{@each question.cols as colopt}' +
                                    '<td class="T-edit-td option" name="option" oid="${colopt.id}" menutype="col">$${colopt.title}</td>' +
                                    '{@/each}' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody>' +
                                '{@each question.rows as rowopt}' +
                                '<tr class="Ed-tr" code="${rowopt.code}">' +
                                    '<td class="T-edit-td option" name="option" oid="${rowopt.id}" menutype="row" style="text-align: left;">$${rowopt.title}</td>' +
                                    '{@each question.cols as colopt}' +
                                    '<td><input type="radio" name="${rowopt.id}" /></td>' +
                                    '{@/each}' +
                                '</tr>' +
                                '{@/each}' +
                            '</tbody>' +
                        '</table>' +
                    '</div>' +
                    '<div class="operation-ver">' +
                        '<a href="javascript:;" class="add" style="display: none;"><i class="add-icon-active"></i></a>' +
                        '<a href="javascript:;" class="bulk" style="display: none;"><i class="clone-icon-active"></i></a>' +
                    '</div>' +
                '</li>' +
                '<li>' +
                    '<div class="operation-hor">' +
                        '<a href="javascript:;" class="add" style="display: none;"><i class="add-icon-active"></i></a>' +
                        '<a href="javascript:;" class="bulk" style="display: none;"><i class="clone-icon-active"></i></a>' +
                        //'<div class="GetWidthMatrix"><a href="javascript:;">调整列宽</a></div>' +
                    '</div>' +
                '</li>' +
            '</ul>' +
        '</div>' +
        '<div class="tip-box" style="{@if question.logicCount == 0}display:none{@/if};">'+
            '<a href="javascript:;">'+
                '<i class="iconfont">&#xe611;</i><span>$${question.logicCount}</span>'+
            '</a>'+
        '</div>'+
    '</div>' +
'</li>';
var source_matrix_multiple =
    '<li class="module question" oid="${question.id}" issue="${question.type}">' +
        '<div class="topic-type">' +
            '<div class="topic-type-menu">' +
                '<div class="setup-group">' +
                    '<h4>${question.number}</h4>' +
                    '<a class="up" href="javascript:;"><i class="up-icon-active" ></i></a>' +
                    '<a class="down" href="javascript:;"><i class="down-icon-active" ></i></a>' +
                    '<a class="bulk" href="javascript:;" style="display: none;"><i class="copy-icon-active"></i></a>' +
                    '<a class="del" href="javascript:;" style="display: none;"><i class="del2-icon-active"></i></a>' +
                '</div>' +
            '</div>' +
            '<div class="topic-type-con">' +
                '<div class="drag-area">' +
                    '<div class="th4 T-edit q-title" name="question">$${question.title}</div>' +
                '</div>' +
                '<ul class="unstyled">' +
                    '<li>' +
                        '<div class="matrix" style="min-height: 60px;">' +
                            '<table class="table td-Tc" cellspacing="0" cellpadding="0">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<td>&nbsp;</td>' +
                                        '{@each question.cols as colopt}' +
                                        '<td class="T-edit-td option" name="option" oid="${colopt.id}" menutype="col">$${colopt.title}</td>' +
                                        '{@/each}' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>' +
                                    '{@each question.rows as rowopt}' +
                                    '<tr class="Ed-tr">' +
                                        '<td class="T-edit-td option" name="option" oid="${rowopt.id}" menutype="row" style="text-align:left;">$${rowopt.title}</td>' +
                                        '{@each question.cols as colopt}' +
                                        '<td><input type="checkbox" name="checkbox" /></td>' +
                                        '{@/each}' +
                                    '</tr>' +
                                    '{@/each}' +
                                '</tbody>' +
                            '</table>' +
                        '</div>' +
                        '<div class="operation-ver">' +
                            '<a href="javascript:;" class="add" style="display: none;"><i class="add-icon-active"></i></a>' +
                            '<a href="javascript:;" class="bulk" style="display: none;"><i class="clone-icon-active"></i></a>' +
                        '</div>' +
                    '</li>' +
                    '<li>' +
                        '<div class="operation-hor">' +
                            '<a href="javascript:;" style="display: none;"><i class="add-icon-active"></i></a>' +
                            '<a href="javascript:;" class="bulk" style="display: none;"><i class="clone-icon-active"></i></a>' +
                            //'<div class="GetWidthMatrix"><a href="javascript:;">调整列宽</a></div>' +
                        '</div>' +
                    '</li>' +
                '</ul>' +
            '</div>' +
            '<div class="tip-box" style="{@if question.logicCount == 0}display:none{@/if};">'+
                '<a href="javascript:;">'+
                    '<i class="iconfont">&#xe611;</i><span>$${question.logicCount}</span>'+
                '</a>'+
            '</div>'+
        '</div>' +
    '</li>';
var source_matrix_score =
    '<li class="module question" oid="${question.id}" issue="${question.type}">' +
        '<div class="topic-type">' +
            '<div class="topic-type-menu">' +
                '<div class="setup-group">' +
                    '<h4>${question.number}</h4>' +
                    '<a class="up" href="javascript:;"><i class="up-icon-active" ></i></a>' +
                    '<a class="down" href="javascript:;"><i class="down-icon-active" ></i></a>' +
                    '<a class="bulk" href="javascript:;" style="display: none;"><i class="copy-icon-active"></i></a>' +
                    '<a class="del" href="javascript:;" style="display: none;"><i class="del2-icon-active"></i></a>' +
                '</div>' +
            '</div>' +
            '<div class="topic-type-con">' +
                '<div class="drag-area">' +
                    '<div class="th4 T-edit q-title" name="question">$${question.title}</div>' +
                '</div>' +
                '<ul class="unstyled">' +
                    '<li>' +
                        '<div class="matrix" style="min-height: 60px;">' +
                            '<table class="table td-Tc" cellspacing="0" cellpadding="0">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<td>&nbsp;</td>' +
                                        '{@each question.cols as colopt}' +
                                        '<td class="T-edit-td option" name="option" oid="${colopt.id}" menutype="col">$${colopt.title}</td>' +
                                        '{@/each}' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>' +
                                    '{@each question.rows as rowopt}' +
                                    '<tr class="Ed-tr">' +
                                        '<td class="T-edit-td option" name="option" oid="${rowopt.id}" menutype="row" style="text-align:left;">$${rowopt.title}</td>' +
                                        '{@each question.cols as colopt}' +
                                        '<td><i class="iconfont">&#xe602;</i></td>' +
                                        '{@/each}' +
                                    '</tr>' +
                                    '{@/each}' +
                                '</tbody>' +
                            '</table>' +
                        '</div>' +
                        '<div class="operation-ver">' +
                            '<a href="javascript:;" class="add" style="display: none;"><i class="add-icon-active"></i></a>' +
                            '<a href="javascript:;" class="bulk" style="display: none;"><i class="clone-icon-active"></i></a>' +
                        '</div>' +
                    '</li>' +
                    '<li>' +
                        '<div class="operation-hor">' +
                            '<a href="javascript:;" style="display: none;"><i class="add-icon-active"></i></a>' +
                            '<a href="javascript:;" class="bulk" style="display: none;"><i class="clone-icon-active"></i></a>' +
                            //'<div class="GetWidthMatrix"><a href="javascript:;">调整列宽</a></div>' +
                        '</div>' +
                    '</li>' +
                '</ul>' +
            '</div>' +
            '<div class="tip-box" style="{@if question.logicCount == 0}display:none{@/if};">'+
                '<a href="javascript:;">'+
                    '<i class="iconfont">&#xe611;</i><span>$${question.logicCount}</span>'+
                '</a>'+
            '</div>'+
        '</div>' +
    '</li>';
var source_desc = '<li class="module question" oid="${question.id}" issue="${question.type}" layout="${question.layout}" cols_count="${column_count}"><div class="topic-type"><div class="topic-type-menu"><div class="setup-group"><h4>${question.number}</h4><a class="up" href="javascript:;"><i class="up-icon-active" ></i></a><a class="down" href="javascript:;"><i class="down-icon-active" ></i></a><a class="bulk" href="javascript:;" style="display: none;"><i class="copy-icon-active"></i></a><a class="del" href="javascript:;" style="display: none;"><i class="del2-icon-active"></i></a></div></div><div class="topic-type-con"><div class="drag-area"><div class="th4 T-edit q-title" name="question">$${question.title}</div></div></div><div class="tip-box" style="{@if question.logicCount === 0}display:none{@/if};"><a href="javascript:;"><i class="iconfont">&#xe611;</i><span>$${question.logicCount}</span></a></div></div></li>';


var TemplateFactory = {
    getHtml: function (model, source, resHost) {
        var layout = QUESTION_LAYOUT[model.question.layout];
        var column_count = '1';
        var column_width = 100 / parseInt(column_count) + '%';
        if (layout == 'vertical') {
            column_width = '100%';
        }
        var data = {
            "model": model,
            "question": model.question,
            'column_count': column_count,
            'column_width': column_width,
            'res_host': resHost
        };
        return juicer(source, data);
    }
};