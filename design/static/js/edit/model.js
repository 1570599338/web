/*
  QuestionBase
 */
function QuestionBase(question) {
    this.question = arguments[0] || null;
}

QuestionBase.prototype.getEditTemplate = function() {
    return '';
};

QuestionBase.prototype.genEditTemplate = function(resHost) {
    var source = this.getEditTemplate();
    return TemplateFactory.getHtml(this, source, resHost);
};

QuestionBase.prototype.getPresentTemplate = function() {
    return '';
};

QuestionBase.prototype.genPresentTemplate = function() {
    var source = this.getPresentTemplate();
    if (isNotEmpty(source)) {
        var href = window.location.href;
        var show_seq = false;
        if (href.indexOf('preview=1') >= 0) {
            if (href.indexOf('show_seq=1') >= 0) {
                show_seq = true;
            } else if (href.indexOf('show_seq=0') >= 0) {
                show_seq = false;
            } else if ("show_seq" in project.custom_attr) {
                show_seq = true;
            } else {
                show_seq = false;
            }
        } else {
            if ("show_seq" in project.custom_attr) {
                show_seq = true;
            }
        }
        if (show_seq) {
            if (this.title.indexOf("Qnum") === -1) {
                this.title = '<span class="Qnum">' + this.seq + '.</span> ' + this.title;
            }
        }
        // this.title += parseInt(this.estimate_time());
        return TemplateFactory.getHtml(this, source);
    } else {
        console.warn("QModel: " + this + "has no survey_source yet.");
        return "";
    }
};

/*
  QuestionSingle 单选题
 */
function QuestionSingle(question) {
    QuestionBase.call(this, question);
}

QuestionSingle.prototype = new QuestionBase();

QuestionSingle.prototype.getEditTemplate = function() {
    return source_single;
};

QuestionSingle.prototype.getPresentTemplate = function() {
    return source_qsingle;
};

/*
  QuestionMultiple 多选题
 */
function QuestionMultiple(question) {
    QuestionBase.call(this, question);
}

QuestionMultiple.prototype = new QuestionBase();

QuestionMultiple.prototype.getEditTemplate = function() {
    return source_multiple;
};

QuestionMultiple.prototype.getPresentTemplate = function() {
    return source_qmultiple;
};

/*
  QuestionBlank  填空题
 */
function QuestionBlank(question) {
    QuestionBase.call(this, question);
}

QuestionBlank.prototype = new QuestionBase();

QuestionBlank.prototype.getEditTemplate = function() {
    return source_blank;
};

QuestionBlank.prototype.getPresentTemplate = function() {
    return source_qblank;
};

/*
  QuestionScore  打分题
 */
function QuestionScore(question) {
    QuestionBase.call(this, question);
}

QuestionScore.prototype = new QuestionBase();

QuestionScore.prototype.getEditTemplate = function() {
    return source_score;
};
QuestionScore.prototype.getPresentTemplate = function() {
    return source_qscore;
};

/*
  QuestionMultiLineBlank 多行填空题
 */
function QuestionMultiLineBlank(question) {
    QuestionBase.call(this, question);
}

QuestionMultiLineBlank.prototype = new QuestionBase();

QuestionMultiLineBlank.prototype.getEditTemplate = function() {
    return source_multiple_line_blank;
};

QuestionMultiLineBlank.prototype.getPresentTemplate = function() {
    return source_qmultiple_blank;
};

/*
  QuestionMultipleBlank 多项填空题
 */
function QuestionMultipleBlank(question) {
    QuestionBase.call(this, question);
}

QuestionMultipleBlank.prototype = new QuestionBase();

QuestionMultipleBlank.prototype.getEditTemplate = function() {
    return source_multiple_blank;
};

QuestionMultipleBlank.prototype.getPresentTemplate = function() {
    return source_qmultiple_blank;
};

/*
  QuestionMatrixSingle 矩阵单选题
 */
function QuestionMatrixSingle(question) {
    QuestionBase.call(this, question);
}

QuestionMatrixSingle.prototype = new QuestionBase();

QuestionMatrixSingle.prototype.getEditTemplate = function() {
    return source_matrix_single;
};

QuestionMatrixSingle.prototype.getPresentTemplate = function() {
    return source_qmatrix_single;
};

/*
  QuestionMatrixMultiple 矩阵多选题
 */
function QuestionMatrixMultiple(question) {
    QuestionBase.call(this, question);
}

QuestionMatrixMultiple.prototype = new QuestionBase();

QuestionMatrixMultiple.prototype.getEditTemplate = function () {
    return source_matrix_multiple;
};

QuestionMatrixMultiple.prototype.getPresentTemplate = function() {
    return source_qmatrix_multiple;
};

/*
  QuestionMatrixScore 矩阵打分题
 */
function QuestionMatrixScore(question) {
    QuestionBase.call(this, question);
}

QuestionMatrixScore.prototype = new QuestionBase();

QuestionMatrixScore.prototype.getEditTemplate = function () {
    return source_matrix_score;
};

QuestionMatrixScore.prototype.getPresentTemplate = function() {
    return source_qmatrix_score;
};

/*
 QuestionImageSingle 图片单选题
 */
function QuestionImageSingle(question) {
    QuestionSingle.call(this, question);
}

QuestionImageSingle.prototype = new QuestionSingle();

QuestionImageSingle.prototype.getEditTemplate = function() {
    return source_image_single;
};

QuestionImageSingle.prototype.getPresentTemplate = function() {
    return source_qimage_single;
};

/*
 QuestionImageMultiple 图片多选题
 */
function QuestionImageMultiple(question) {
    QuestionMultiple.call(this, question);
}

QuestionImageMultiple.prototype = new QuestionMultiple();

QuestionImageMultiple.prototype.getEditTemplate = function() {
    return source_image_multiple;
};

QuestionImageMultiple.prototype.getPresentTemplate = function() {
    return source_qimage_multiple;
};

/*
 QuestionSingle 描述说明题
 */
function QuestionDesc(question) {
    QuestionBase.call(this, question);
}

QuestionDesc.prototype = new QuestionBase();

QuestionDesc.prototype.getEditTemplate = function() {
    return source_desc;
};
/*
QuestionDesc.prototype.getPresentTemplate = function() {
    return source_qsingle;
};*/

/*
 ModelFactory
*/

var MODEL_CLASS_MAP = {};

MODEL_CLASS_MAP[QUESTION_TYPE_SINGLE] = QuestionSingle;
MODEL_CLASS_MAP[QUESTION_TYPE_MULTIPLE] = QuestionMultiple;
MODEL_CLASS_MAP[QUESTION_TYPE_IMAGE_SINGLE] = QuestionImageSingle;
MODEL_CLASS_MAP[QUESTION_TYPE_IMAGE_MULTIPLE] = QuestionImageMultiple;
MODEL_CLASS_MAP[QUESTION_TYPE_MATRIX_SINGLE] = QuestionMatrixSingle;
MODEL_CLASS_MAP[QUESTION_TYPE_MATRIX_MULTIPLE] = QuestionMatrixMultiple;
MODEL_CLASS_MAP[QUESTION_TYPE_SINGLE_BLANK] = QuestionBlank;
MODEL_CLASS_MAP[QUESTION_TYPE_MULTIPLE_BLANK] = QuestionMultipleBlank;
MODEL_CLASS_MAP[QUESTION_TYPE_MULTIPLE_LINE_BLANK] = QuestionMultiLineBlank;
MODEL_CLASS_MAP[QUESTION_TYPE_SCORE] = QuestionScore;
MODEL_CLASS_MAP[QUESTION_TYPE_MATRIX_SCORE] = QuestionMatrixScore;
MODEL_CLASS_MAP[QUESTION_TYPE_DESC] = QuestionDesc;

var ModelFactory = {
    getModel: function(question, resHost) {
        var modelClass = MODEL_CLASS_MAP[question.type];
        if (question.type == QUESTION_TYPE_MATRIX_SINGLE ||
            question.type == QUESTION_TYPE_MATRIX_MULTIPLE ||
            question.type == QUESTION_TYPE_MATRIX_SCORE) {
            question.rows = [], question.cols = [];
            for (var i = 0 ; i < question.options.length; ++i)
                question.options[i].orientation == 1 ? question.rows.push(question.options[i]) : question.cols.push(question.options[i]);
            question.options = [];
        }
        return new modelClass(question);
    },
};