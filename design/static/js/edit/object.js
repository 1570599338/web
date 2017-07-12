var INIT_QUESTION_MAP = {};
var OBJECT_MAP = {};
var OPTION_MAP = {};

var TEMPLATE_ID = 47;
var GROUP_ID = 3;

//单选题
OBJECT_MAP[QUESTION_TYPE_SINGLE] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_SINGLE,
    businessType: null,
    number: 'Q1',
    title: '单选题',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    chartType:1,
    dispIndex: 1,
    columnCount: 1, // only valid if Layout is 'column'
    options: [{
        id: -1,
        questionID: -1,
        code: 'OP1',
        value: null,
        title: '选项1',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP2',
        value: null,
        title: '选项2',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    rowReverse: false,
    colReverse: false,
    logicCount:0
};
OPTION_MAP[QUESTION_TYPE_SINGLE] = {
    id: -1,
    questionID: -1,
    code: 'OP1',
    value: null,
    title: null,
    open: false,
    help: null,
    imageUrl: null,
    thumbUrl: null,
    videoUrl: null,
    dispIndex: -1,
    blankType: null,
    blankMax: null,
    blankMin: null,
    blankOptional: null,
    blankRows: null,
    blankCols: null,
    exclusive: null,
    orientation: 1,
    showValue: false,
    showTip: false,
    showCancel: false,
    selectionMax: 0,
    selectionMin: 0,
};
//图片单选题
OBJECT_MAP[QUESTION_TYPE_IMAGE_SINGLE] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_IMAGE_SINGLE,
    businessType: null,
    number: 'Q1',
    title: '图片单选题',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    chartType:1,
    columnCount: 1, // only valid if Layout is 'column'
    dispIndex: 1,
    options: [],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    rowReverse: false,
    colReverse: false,
    logicCount:0
};
OPTION_MAP[QUESTION_TYPE_IMAGE_SINGLE] = {
    id: -1,
    questionID: -1,
    code: 'OP1',
    value: null,
    title: null,
    open: false,
    help: null,
    imageUrl: null,
    thumbUrl: null,
    videoUrl: null,
    dispIndex: -1,
    blankType: null,
    blankMax: null,
    blankMin: null,
    blankOptional: null,
    blankRows: null,
    blankCols: null,
    exclusive: null,
    orientation: 1,
    showValue: false,
    showTip: false,
    showCancel: false,
    selectionMax: 0,
    selectionMin: 0,
};
//矩阵单选题
OBJECT_MAP[QUESTION_TYPE_MATRIX_SINGLE] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_MATRIX_SINGLE,
    businessType: null,
    number: 'Q1',
    title: '矩阵单选题',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    chartType:1,
    dispIndex: 1,
    columnCount: 1, // only valid if Layout is 'column'
    options: [{
        id: -1,
        questionID: -1,
        code: 'IX1',
        title: '行选项1',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'IX2',
        value: null,
        title: '行选项2',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'IX3',
        value: null,
        title: '行选项3',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 3,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP1',
        value: null,
        title: '列选项1',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null, // valid only if Open is true
        blankMax: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankMin: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankOptional: null, // valid only if Open is true
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP2',
        value: null,
        title: '列选项2',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP3',
        value: null,
        title: '列选项3',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 3,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP4',
        value: null,
        title: '列选项4',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 4,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP5',
        value: null,
        title: '列选项5',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 5,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    rowReverse: false,
    colReverse: false,
    logicCount:0
};
OPTION_MAP[QUESTION_TYPE_MATRIX_SINGLE] = {
    id: -1,
    questionID: -1,
    code: 'OP1',
    value: null,
    title: null,
    open: false,
    help: null,
    imageUrl: null,
    thumbUrl: null,
    videoUrl: null,
    dispIndex: -1,
    blankType: null,
    blankMax: null,
    blankMin: null,
    blankOptional: null,
    blankRows: null,
    blankCols: null,
    exclusive: null,
    orientation: 1,
    showValue: false,
    showTip: false,
    showCancel: false,
    selectionMax: 0,
    selectionMin: 0
};
//多选题
OBJECT_MAP[QUESTION_TYPE_MULTIPLE] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_MULTIPLE,
    businessType: null,
    number: 'Q1',
    title: '多选题',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    columnCount: 1, // only valid if Layout is 'column'
    dispIndex: 1,
    help: null,
    layout: 1,
    chartType:1,
    options: [{
        id: -1,
        questionID: -1,
        code: 'OP1',
        title: '选项1',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: 1, // valid only if Open is true
        blankMax: 50, // valid only if Open is true and BlankType is 'number' or 'text'
        blankMin: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankOptional: null, // valid only if Open is true
        blankRows: null,
        blankCols: null,
        exclusive: false,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP2',
        title: '选项2',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        blankRows: null,
        blankCols: null,
        exclusive: false,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    rowReverse: false,
    colReverse: false,
    logicCount:0
};
OPTION_MAP[QUESTION_TYPE_MULTIPLE] = {
    id: -1,
    questionID: -1,
    code: 'OP1',
    title: null,
    open: false,
    help: null,
    imageUrl: null,
    thumbUrl: null,
    videoUrl: null,
    dispIndex: -1,
    blankType: null,
    blankMax: null,
    blankMin: null,
    blankOptional: null,
    blankRows: null,
    blankCols: null,
    exclusive: null,
    orientation: 1,
    showValue: false,
    showTip: false,
    showCancel: false,
    selectionMax: 0,
    selectionMin: 0
};
//图片多选题
OBJECT_MAP[QUESTION_TYPE_IMAGE_MULTIPLE] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_IMAGE_MULTIPLE,
    businessType: null,
    number: 'Q1',
    title: '图片多选题',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    chartType:1,
    columnCount: 1, // only valid if Layout is 'column'
    dispIndex: 1,
    options: [],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    rowReverse: false,
    colReverse: false,
    logicCount:0
};
OPTION_MAP[QUESTION_TYPE_IMAGE_MULTIPLE] = {
    id: -1,
    questionID: -1,
    code: 'OP1',
    value: null,
    title: null,
    open: false,
    help: null,
    imageUrl: null,
    thumbUrl: null,
    videoUrl: null,
    dispIndex: -1,
    blankType: null,
    blankMax: null,
    blankMin: null,
    blankOptional: null,
    blankRows: null,
    blankCols: null,
    exclusive: null,
    orientation: 1,
    showValue: false,
    showTip: false,
    showCancel: false,
    selectionMax: 0,
    selectionMin: 0
};
//矩阵多选题
OBJECT_MAP[QUESTION_TYPE_MATRIX_MULTIPLE] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_MATRIX_MULTIPLE,
    businessType: null,
    number: 'Q1',
    title: '矩阵多选题',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    chartType:1,
    columnCount: 1, // only valid if Layout is 'column'
    dispIndex: 1,
    options: [{
        id: -1,
        questionID: -1,
        code: 'IX1',
        title: '行选项1',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null, // valid only if Open is true
        blankMax: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankMin: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankOptional: null, // valid only if Open is true
        blankRows: null,
        blankCols: null,
        exclusive: false,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'IX2',
        title: '行选项2',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        blankRows: null,
        blankCols: null,
        exclusive: false,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'IX3',
        title: '行选项3',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 3,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        blankRows: null,
        blankCols: null,
        exclusive: false,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP1',
        title: '列选项1',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null, // valid only if Open is true
        blankMax: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankMin: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankOptional: null, // valid only if Open is true
        blankRows: null,
        blankCols: null,
        exclusive: false,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP2',
        title: '列选项2',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        blankRows: null,
        blankCols: null,
        exclusive: false,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP3',
        title: '列选项3',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 3,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        blankRows: null,
        blankCols: null,
        exclusive: false,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP4',
        title: '列选项4',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 4,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        blankRows: null,
        blankCols: null,
        exclusive: false,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP5',
        title: '列选项5',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 5,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        blankRows: null,
        blankCols: null,
        exclusive: false,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    rowReverse: false,
    colReverse: false,
    logicCount:0
};
OPTION_MAP[QUESTION_TYPE_MATRIX_MULTIPLE] = {
    id: -1,
    questionID: -1,
    code: 'OP1',
    value: null,
    title: null,
    open: false,
    help: null,
    imageUrl: null,
    thumbUrl: null,
    videoUrl: null,
    dispIndex: -1,
    blankType: null,
    blankMax: null,
    blankMin: null,
    blankOptional: null,
    blankRows: null,
    blankCols: null,
    exclusive: null,
    orientation: 1,
    showValue: false,
    showTip: false,
    showCancel: false,
    selectionMax: 0,
    selectionMin: 0
};
//单行填空
OBJECT_MAP[QUESTION_TYPE_SINGLE_BLANK] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_SINGLE_BLANK,
    businessType: null,
    number: 'Q1',
    title: '单行填空',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    chartType:1,
    columnCount: 1, // only valid if Layout is 'column'
    dispIndex: 1,
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    options: [{
        id: -1,
        questionID: -1,
        code: 'FB1',
        title: '',
        value: null,
        open: true,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null, // valid only if Open is true
        blankMax: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankMin: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankOptional: false, // valid only if Open is true
        blankRows: null,
        blankCols: null,
        exclusive: false,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    rowReverse: false,
    colReverse: false,
    logicCount:0
};
OPTION_MAP[QUESTION_TYPE_SINGLE_BLANK] = {
    id: -1,
    questionID: -1,
    code: 'FB1',
    value: null,
    title: null,
    open: true,
    help: null,
    imageUrl: null,
    thumbUrl: null,
    videoUrl: null,
    dispIndex: -1,
    blankType: null,
    blankMax: null,
    blankMin: null,
    blankOptional: null,
    blankRows: null,
    blankCols: null,
    exclusive: null,
    orientation: 1,
    showValue: false,
    showTip: false,
    showCancel: false,
    selectionMax: 0,
    selectionMin: 0
};
//多项填空题
OBJECT_MAP[QUESTION_TYPE_MULTIPLE_BLANK] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_MULTIPLE_BLANK,
    businessType: null,
    number: 'Q1',
    title: ' 多项填空',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    chartType:1,
    columnCount: 1, // only valid if Layout is 'column'
    dispIndex: 1,
    options: [{
        id: -1,
        questionID: -1,
        code: 'FB1',
        title: '填空1',
        value: null,
        open: true,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null, // valid only if Open is true
        blankMax: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankMin: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankOptional: null, // valid only if Open is true
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'FB2',
        title: '填空2',
        value: null,
        open: true,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    rowReverse: false,
    colReverse: false,
    logicCount:0
};
OPTION_MAP[QUESTION_TYPE_MULTIPLE_BLANK] = {
    id: -1,
    questionID: -1,
    code: 'FB1',
    value: null,
    title: null,
    open: true,
    help: null,
    imageUrl: null,
    thumbUrl: null,
    videoUrl: null,
    dispIndex: -1,
    blankType: null,
    blankMax: null,
    blankMin: null,
    blankOptional: null,
    blankRows: null,
    blankCols: null,
    exclusive: null,
    orientation: 1,
    showValue: false,
    showTip: false,
    showCancel: false,
    selectionMax: 0,
    selectionMin: 0
};
//多行填空
OBJECT_MAP[QUESTION_TYPE_MULTIPLE_LINE_BLANK] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_MULTIPLE_LINE_BLANK,
    businessType: null,
    number: 'Q1',
    title: '多行填空题',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    chartType:1,
    columnCount: 1, // only valid if Layout is 'column'
    dispIndex: 1,
    options: [{
        id: -1,
        questionID: -1,
        code: 'FB1',
        title: '',
        value: null,
        open: true,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null, // valid only if Open is true
        blankMax: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankMin: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankOptional: false, // valid only if Open is true
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    rowReverse: false,
    colReverse: false,
    logicCount:0
};
OPTION_MAP[QUESTION_TYPE_MULTIPLE_LINE_BLANK] = {
    id: -1,
    questionID: -1,
    code: 'FB1',
    value: null,
    title: null,
    open: true,
    help: null,
    imageUrl: null,
    thumbUrl: null,
    videoUrl: null,
    dispIndex: -1,
    blankType: null,
    blankMax: null,
    blankMin: null,
    blankOptional: null,
    blankRows: null,
    blankCols: null,
    exclusive: null,
    orientation: 1,
    showValue: false,
    showTip: false,
    showCancel: false,
    selectionMax: 0,
    selectionMin: 0
};
//打分题
OBJECT_MAP[QUESTION_TYPE_SCORE] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_SCORE,
    businessType: null,
    number: 'Q1',
    title: '打分题',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    chartType:1,
    scoreType:1,
    columnCount: 1, // only valid if Layout is 'column'
    dispIndex: 1,
    options: [{
        id: -1,
        questionID: -1,
        code: 'OP1',
        title: '非常不满意',
        value: 1,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null, // valid only if Open is true
        blankMax: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankMin: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankOptional: false, // valid only if Open is true
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP2',
        title: '不满意',
        value: 2,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP3',
        title: '一般',
        value: 3,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 3,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP4',
        title: '满意',
        value: 4,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 4,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP5',
        title: '非常满意',
        value: 5,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 5,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    rowReverse: false,
    colReverse: false,
    logicCount:0
};
OPTION_MAP[QUESTION_TYPE_SCORE] = {
    id: -1,
    questionID: -1,
    code: 'OP1',
    value: null,
    title: null,
    open: false,
    help: null,
    imageUrl: null,
    thumbUrl: null,
    videoUrl: null,
    dispIndex: -1,
    blankType: null,
    blankMax: null,
    blankMin: null,
    blankOptional: null,
    blankRows: null,
    blankCols: null,
    exclusive: null,
    orientation: 1,
    showValue: false,
    showTip: false,
    showCancel: false,
    selectionMax: 0,
    selectionMin: 0
};
//矩阵打分题
OBJECT_MAP[QUESTION_TYPE_MATRIX_SCORE] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_MATRIX_SCORE,
    businessType: null,
    number: 'Q1',
    title: '矩阵打分题',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    chartType:1,
    scoreType:1,
    columnCount: 1, // only valid if Layout is 'column'
    dispIndex: 1,
    options: [{
        id: -1,
        questionID: -1,
        code: 'IX1',
        title: '行选项1',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null, // valid only if Open is true
        blankMax: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankMin: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankOptional: null, // valid only if Open is true
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'IX2',
        title: '行选项2',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'IX3',
        title: '行选项3',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 3,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP1',
        title: '非常不满意',
        value: 1,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null, // valid only if Open is true
        blankMax: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankMin: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankOptional: null, // valid only if Open is true
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP2',
        title: '不满意',
        value: 2,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP3',
        title: '一般',
        value: 3,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 3,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP4',
        title: '满意',
        value: 4,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 4,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP5',
        title: '非常满意',
        value: 5,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 5,
        blankType: 1,
        blankMax: 50,
        blankMin: null,
        blankOptional: false,
        exclusive: false,
        blankRows: null,
        blankCols: null,
        orientation: 2,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    rowReverse: false,
    colReverse: false,
    logicCount:0
};
OPTION_MAP[QUESTION_TYPE_MATRIX_SCORE] = {
    id: -1,
    questionID: -1,
    code: 'OP1',
    value: null,
    title: null,
    open: false,
    help: null,
    imageUrl: null,
    thumbUrl: null,
    videoUrl: null,
    dispIndex: -1,
    blankType: null,
    blankMax: null,
    blankMin: null,
    blankOptional: null,
    blankRows: null,
    blankCols: null,
    exclusive: null,
    orientation: 1,
    showValue: false,
    showTip: false,
    showCancel: false,
    selectionMax: 0,
    selectionMin: 0
};
//描述说明
OBJECT_MAP[QUESTION_TYPE_DESC] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_DESC,
    businessType: null,
    number: 'Q1',
    title: '描述说明',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    chartType:1,
    dispIndex: 1,
    columnCount: 1, // only valid if Layout is 'column'
    options: [],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    rowReverse: false,
    colReverse: false,
    logicCount:0
};

//性别
OBJECT_MAP[QUESTION_TYPE_GENDER] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_SINGLE,
    businessType: QUESTION_TYPE_GENDER,
    number: 'Q1',
    title: '性别',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    dispIndex: 1,
    columnCount: 1, // only valid if Layout is 'column'
    options: [{
        id: -1,
        questionID: -1,
        code: 'OP1',
        value: null,
        title: '男',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP2',
        value: null,
        title: '女',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    logicCount: 0
};
//姓名
OBJECT_MAP[QUESTION_TYPE_NAME] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_SINGLE_BLANK,
    businessType: QUESTION_TYPE_NAME,
    number: 'Q1',
    title: '姓名',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    columnCount: 1, // only valid if Layout is 'column'
    dispIndex: 1,
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    options: [{
        id: -1,
        questionID: -1,
        code: 'FB1',
        title: '',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null, // valid only if Open is true
        blankMax: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankMin: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankOptional: false, // valid only if Open is true
        blankRows: null,
        blankCols: null,
        exclusive: false,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    logicCount: 0
};
//年龄
OBJECT_MAP[QUESTION_TYPE_AGE] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_SINGLE,
    businessType: QUESTION_TYPE_AGE,
    number: 'Q1',
    title: '年龄',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    dispIndex: 1,
    columnCount: 1, // only valid if Layout is 'column'
    options: [{
        id: -1,
        questionID: -1,
        code: 'OP1',
        value: null,
        title: '20以下',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP2',
        value: null,
        title: '20岁-28岁',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP3',
        value: null,
        title: '29岁-35岁',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 3,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP4',
        value: null,
        title: '36岁-45岁',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 4,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP5',
        value: null,
        title: '46岁-55岁',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 5,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP6',
        value: null,
        title: '55岁以上',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 6,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    logicCount: 0
};
//出生日期
OBJECT_MAP[QUESTION_TYPE_BIRTHDATE] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_SINGLE_BLANK,
    businessType: QUESTION_TYPE_BIRTHDATE,
    number: 'Q1',
    title: '出生日期',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    columnCount: 1, // only valid if Layout is 'column'
    dispIndex: 1,
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    options: [{
        id: -1,
        questionID: -1,
        code: 'FB1',
        title: '',
        value: null,
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null, // valid only if Open is true
        blankMax: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankMin: null, // valid only if Open is true and BlankType is 'number' or 'text'
        blankOptional: false, // valid only if Open is true
        blankRows: null,
        blankCols: null,
        exclusive: false,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    logicCount: 0
};
//城市
OBJECT_MAP[QUESTION_TYPE_CITY] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_SINGLE,
    businessType: QUESTION_TYPE_CITY,
    number: 'Q1',
    title: '城市',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    dispIndex: 1,
    columnCount: 1, // only valid if Layout is 'column'
    options: [],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    logicCount: 0
};
//车型
OBJECT_MAP[QUESTION_TYPE_MODEL] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_SINGLE,
    businessType: QUESTION_TYPE_MODEL,
    number: 'Q1',
    title: '车型',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    dispIndex: 1,
    columnCount: 1, // only valid if Layout is 'column'
    options: [],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    logicCount: 0
};
//车系
OBJECT_MAP[QUESTION_TYPE_SERIES] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_SINGLE,
    businessType: QUESTION_TYPE_SERIES,
    number: 'Q1',
    title: '车系',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    dispIndex: 1,
    columnCount: 1, // only valid if Layout is 'column'
    options: [],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    logicCount: 0
};
//婚姻状况
OBJECT_MAP[QUESTION_TYPE_MARRIAGE] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_SINGLE,
    businessType: QUESTION_TYPE_MARRIAGE,
    number: 'Q1',
    title: '婚姻状况',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    dispIndex: 1,
    columnCount: 1, // only valid if Layout is 'column'
    options: [{
        id: -1,
        questionID: -1,
        code: 'OP1',
        value: null,
        title: '单身，独自居住',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP2',
        value: null,
        title: '单身，与父母居住',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP3',
        value: null,
        title: '已婚有小孩',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 3,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP4',
        value: null,
        title: '已婚无小孩',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 4,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    logicCount: 0
};
//教育程度
OBJECT_MAP[QUESTION_TYPE_EDUCATION] = {
    id: -1,
    templateID: 1,
    type: QUESTION_TYPE_SINGLE,
    businessType: QUESTION_TYPE_EDUCATION,
    number: 'Q1',
    title: '教育程度',
    imageUrl: null,
    videolUrl: null,
    optional: true,
    help: null,
    layout: 1,
    dispIndex: 1,
    columnCount: 1, // only valid if Layout is 'column'
    options: [{
        id: -1,
        questionID: -1,
        code: 'OP1',
        value: null,
        title: '初中及以下',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 1,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP2',
        value: null,
        title: '高中及中专',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 2,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP3',
        value: null,
        title: '大专',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 3,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP4',
        value: null,
        title: '本科',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 4,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }, {
        id: -1,
        questionID: -1,
        code: 'OP5',
        value: null,
        title: '硕士及以上',
        open: false,
        help: null,
        imageUrl: null,
        thumbUrl: null,
        videoUrl: null,
        dispIndex: 5,
        blankType: null,
        blankMax: null,
        blankMin: null,
        blankOptional: null,
        blankRows: null,
        blankCols: null,
        exclusive: null,
        orientation: 1,
        showValue: false,
        showTip: false,
        showCancel: false,
        selectionMax: 0,
        selectionMin: 0
    }],
    selectionMax: 0, // maximum number of options being selected
    selectionMin: 0, // maximum number of options being selected
    rowDisordered: false, // valid for all question types
    rowLastFixed: false, // valid only if RowDisorded is true
    colDisordered: false, // valid only for matrix
    colLastFixed: false, // valid only if RowDisorded is true
    matrixPivot: false, // valid only for matrix
    logicCount: 0
};

var project = {};
var get_oid = function () {
    return 0;
}

//矩阵填空题
INIT_QUESTION_MAP[QUESTION_TYPE_MATRIX_BLANK] = {
    title: "矩阵填空题",
    custom_attr: {},
    question_type: QUESTION_TYPE_MATRIX_BLANK,
    project_id: get_oid(project),
    option_list: [{
        title: "请填空1",
        is_open: false,
        custom_attr: {
            text_col: "10",
            text_row: "1"
        }
    }, {
        title: "请填空2",
        is_open: false,
        custom_attr: {
            text_col: "10",
            text_row: "1"
        }
    }],
    matrixrow_list: [{
        title: "矩阵行1",
        is_open: false,
        custom_attr: {}
    }, {
        title: "矩阵行2",
        is_open: false,
        custom_attr: {}
    }]
};
//排序题
INIT_QUESTION_MAP[QUESTION_TYPE_ORDER] = {
    title: "排序题",
    custom_attr: {},
    question_type: QUESTION_TYPE_ORDER,
    project_id: get_oid(project),
    option_list: [{
        title: "选项1",
        is_open: false,
        custom_attr: {}
    }, {
        title: "选项2",
        is_open: false,
        custom_attr: {}
    }]
};
//描述说明
INIT_QUESTION_MAP[QUESTION_TYPE_DESC] = {
    title: "描述说明",
    custom_attr: {},
    question_type: QUESTION_TYPE_DESC,
    project_id: get_oid(project)
};
//上传题
INIT_QUESTION_MAP[QUESTION_TYPE_UPLOAD_FILE] = {
    title: "上传题",
    custom_attr: {
        layout: "upload_file"
    },
    question_type: QUESTION_TYPE_MULTIPLE_BLANK,
    project_id: get_oid(project),
    option_list: [{
        title: "选择文件上传",
        is_open: false,
        custom_attr: {}
    }]
};

// Will be deprecated 
INIT_QUESTION_MAP["multi_line_blank"] = {
    title: "多行填空",
    custom_attr: {
        blank_type: "multiple"
    },
    question_type: QUESTION_TYPE_SINGLE_BLANK,
    project_id: get_oid(project),
    option_list: [{
        title: "选项1",
        is_open: false,
        custom_attr: {
            text_col: "20",
            text_row: "5"
        }
    }]
};
INIT_QUESTION_MAP['image_single'] = {
    option_list: [],
    title: "图片单选题",
    custom_attr: {
        layout: "image_single"
    },
    question_type: QUESTION_TYPE_SINGLE,
    project_id: get_oid(project)
};
INIT_QUESTION_MAP['image_multiple'] = {
    option_list: [],
    title: "图片多选题",
    custom_attr: {
        layout: "image_multiple"
    },
    question_type: QUESTION_TYPE_MULTIPLE,
    project_id: get_oid(project)
};
INIT_QUESTION_MAP['upload_file'] = {
    title: "上传题",
    custom_attr: {
        layout: "upload_file"
    },
    question_type: QUESTION_TYPE_MULTIPLE_BLANK,
    project_id: get_oid(project),
    option_list: [{
        title: "选择文件上传",
        is_open: false,
        custom_attr: {}
    }]
};
INIT_QUESTION_MAP['split_line'] = {
    title: "分割线",
    custom_attr: {
        layout: "split_line"
    },
    question_type: QUESTION_TYPE_DESC,
    project_id: get_oid(project)
};

//常用题目对象
INIT_QUESTION_MAP["sex"] = {
    title: "性别",
    custom_attr: {},
    question_type: QUESTION_TYPE_SINGLE,
    project_id: get_oid(project),
    option_list: [{
        title: "男"
    }, {
        title: "女"
    }]
};
INIT_QUESTION_MAP["city"] = {
    title: "您所在的城市是",
    question_type: QUESTION_TYPE_BLANK_DROPDOWN,
    custom_attr: {
        drop_type: "city"
    },
    project_id: get_oid(project),
    option_list: [{
        title: "省份"
    }, {
        title: "城市"
    }, {
        title: "区/县"
    }]
};
INIT_QUESTION_MAP["address"] = {
    title: "地址",
    question_type: QUESTION_TYPE_BLANK_DROPDOWN,
    custom_attr: {
        drop_type: "address"
    },
    project_id: get_oid(project),
    option_list: [{
        title: "省份"
    }, {
        title: "城市"
    }, {
        title: "区/县"
    }, {
        title: "街道"
    }]
};
INIT_QUESTION_MAP["name"] = {
    title: "姓名",
    custom_attr: {},
    question_type: QUESTION_TYPE_SINGLE_BLANK,
    project_id: get_oid(project),
    option_list: [{
        title: "A1",
        custom_attr: {
            text_row: "1",
            text_col: "10"
        }
    }]
};
INIT_QUESTION_MAP["mobile"] = {
    title: "手机号码",
    custom_attr: {},
    question_type: QUESTION_TYPE_SINGLE_BLANK,
    project_id: get_oid(project),
    option_list: [{
        title: "A1",
        custom_attr: {
            text_row: "1",
            text_col: "20",
            checkmethod: "mobile"
        }
    }]
};
INIT_QUESTION_MAP["phone"] = {
    title: "电话",
    custom_attr: {},
    question_type: QUESTION_TYPE_SINGLE_BLANK,
    project_id: get_oid(project),
    option_list: [{
        title: "A1",
        custom_attr: {
            text_row: "1",
            text_col: "20"
        }
    }]
};
INIT_QUESTION_MAP["age"] = {
    title: "生日",
    custom_attr: {},
    question_type: QUESTION_TYPE_BLANK_DROPDOWN,
    custom_attr: {
        drop_type: "age"
    },
    project_id: get_oid(project),
    option_list: [{
        title: "年"
    }, {
        title: "月"
    }, {
        title: "日"
    }]
};
INIT_QUESTION_MAP["date"] = {
    title: "请选择日期",
    question_type: QUESTION_TYPE_MULTIPLE_BLANK,
    custom_attr: {
        layout: "date"
    },
    project_id: get_oid(project),
    option_list: [{
        title: "日期"
    }]
};
INIT_QUESTION_MAP["time"] = {
    title: "请选择时间",
    question_type: QUESTION_TYPE_MULTIPLE_BLANK,
    custom_attr: {
        layout: "time"
    },
    project_id: get_oid(project),
    option_list: [{
        title: "时"
    }, {
        title: "分"
    }]
};
INIT_QUESTION_MAP["email"] = {
    title: "邮箱",
    custom_attr: {},
    question_type: QUESTION_TYPE_SINGLE_BLANK,
    project_id: get_oid(project),
    option_list: [{
        title: "A1",
        custom_attr: {
            text_row: "1",
            text_col: "20",
            checkmethod: "email"
        }
    }]
};
INIT_QUESTION_MAP["work_ex"] = {
    title: "工作年限",
    custom_attr: {},
    question_type: QUESTION_TYPE_SINGLE,
    project_id: get_oid(project),
    option_list: [{
        title: "1年及以下"
    }, {
        title: "2-3年"
    }, {
        title: "4-5年"
    }, {
        title: "6-9年"
    }, {
        title: "10年及以上"
    }]
};
INIT_QUESTION_MAP["education"] = {
    title: "受教育程度",
    custom_attr: {},
    question_type: QUESTION_TYPE_SINGLE,
    project_id: get_oid(project),
    option_list: [{
        title: "初中及以下"
    }, {
        title: "高中"
    }, {
        title: "大专"
    }, {
        title: "本科"
    }, {
        title: "硕士及以上"
    }]
};
INIT_QUESTION_MAP["income"] = {
    title: "个人月收入",
    custom_attr: {},
    question_type: QUESTION_TYPE_SINGLE,
    project_id: get_oid(project),
    option_list: [{
        title: "2000元及以下"
    }, {
        title: "2001-3000元"
    }, {
        title: "3001-5000元"
    }, {
        title: "5001-8000元"
    }, {
        title: "8001-12000元"
    }, {
        title: "12001-20000元"
    }, {
        title: "20000元以上"
    }]
};
INIT_QUESTION_MAP["company"] = {
    title: "工作单位性质",
    custom_attr: {},
    question_type: QUESTION_TYPE_SINGLE,
    project_id: get_oid(project),
    option_list: [{
        title: "行政/事业单位"
    }, {
        title: "合资（包括外商独资）"
    }, {
        title: "国营（包括集体）"
    }, {
        title: "私营"
    }, {
        title: "境内上市股份公司"
    }, {
        title: "其他"
    }]
};
INIT_QUESTION_MAP["marriage"] = {
    title: "婚姻状况",
    custom_attr: {},
    question_type: QUESTION_TYPE_SINGLE,
    project_id: get_oid(project),
    option_list: [{
        title: "单身"
    }, {
        title: "已婚"
    }]
};


var PAGE_TEMPLATE = '<li class="module paging" name="page"><div class="topic-type"><div class="topic-type-menu"><div class="setup-group"><a class="del" href="javascript:;" style="display: none;"> <i class="del2-icon-active"></i></a></div></div><div class="topic-type-con"><div class="drag-area" ><div class="th4 T-edit" style="padding-left:10px;">分组一</div><div class="icon-paging"></div></div></div></div></li>';
//var PAGE_TEMPLATE = '<li class="module paging" name="page"><div class="topic-type"><div class="topic-type-menu"><div class="setup-group"><a class="del" href="javascript:;" style="display: none;"> <i class="del2-icon-active"></i></a></div></div><div class="topic-type-con"><div class="drag-area" style="margin:0px;"><div class="icon-paging"></div><div class="fr con-paging">分组码：<span></span></div></div></div></div></li>';
var GROUP_TEMPLATE = '<li class="module paging" name="group"><div class="topic-type"><div class="topic-type-menu"><div class="setup-group"><a class="del" href="javascript:;" style="display: none;"> <i class="del2-icon-active"></i></a></div></div><div class="topic-type-con"><div class="drag-area" style="margin:0px;"><div class="icon-paging"></div><div class="fr con-paging">分组码：<span></span></div></div></div></div></li>';

var QUESTION_ATTRIBUTE_TEMPLATE = '';

var INIT_TEMPLATE_MAP = {};
var TEMPLATE_MAP = {};

var ObjectFactory = {
    getObject: function(type) {
        return OBJECT_MAP[type];
    },
};