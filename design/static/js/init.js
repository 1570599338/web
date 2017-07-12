var QUESTION_DICT = {}; //题目列表
var QUESTIONPAGE_DICT = {};
var QMODEL_DICT = {};
var JUMPCONSTRIANT_DICT = {};
var AUTOREPLACE_SOURCE_Q_DICT = {};
var AUTOREPLACE_OBJ_ID_DICT = {};
var total_answers = {};
var JUMPCONSTRAINT_SOURCE_Q_DICT = {};
var answer_path = [];
var curr_time_cost = 0;
var site_url = window.location.protocol + "//" + window.location.host;

function add_question(question) {
    QUESTION_DICT[get_oid(question)] = question;
}

function remove_question(qid) {
    delete QUESTION_DICT[qid];
}

//初始化动作
if (isNotEmpty(project)) {
    for (var i = 0; i < project.questionpage_list.length; i++) {
        var page = project.questionpage_list[i];
        QUESTIONPAGE_DICT[get_oid(page)] = page;
        for (var k = 0; k < page.question_list.length; k++) {
            var question = page.question_list[k];
            if (question.matrixrow_id_list && question.matrixrow_id_list.length === 0) {
                question.matrixrow_list = [];
            }
            QUESTION_DICT[get_oid(question)] = question;
        }
    }
    if (project.hasOwnProperty("jumpconstraint_list")) {
        for (var i = 0; i < project.jumpconstraint_list.length; i++) {
            var jumpconstraint = project.jumpconstraint_list[i];
            JUMPCONSTRIANT_DICT[get_oid(jumpconstraint)] = jumpconstraint;
            var jump_list = JUMPCONSTRAINT_SOURCE_Q_DICT[jumpconstraint.question_id];
            if (!isNotEmpty(jump_list)) {
                jump_list = [];
            }
            // //筛选出同页跳转的条件
            // var jump_to_qid = jumpconstraint.jump_to_qid;
            // var jump_to_page_id = null;
            // if (jump_to_qid.length === 24){
            //  var jump_to_q = QUESTION_DICT[jump_to_qid];
            //  jump_to_page_id = jump_to_q.questionpage_id;
            // }
            // var source_q = QUESTION_DICT[jumpconstraint.question_id];
            // if (isNotEmpty(jump_to_page_id)){
            //  if (source_q.questionpage_id === jump_to_page_id){
            //      jump_list.push(jumpconstraint);
            //  }else{
            //      continue;
            //  }
            // }else{
            //  jump_list.push(jumpconstraint);
            // }
            jump_list.push(jumpconstraint);
            JUMPCONSTRAINT_SOURCE_Q_DICT[jumpconstraint.question_id] = jump_list;
        }
    }
    if (project.hasOwnProperty("autoreplace_list")) {
        for (var i = 0; i < project.autoreplace_list.length; i++) {
            var autoreplace = project.autoreplace_list[i];
            var source_items = AUTOREPLACE_SOURCE_Q_DICT[autoreplace.source_qid];
            var obj_items = AUTOREPLACE_OBJ_ID_DICT[autoreplace.obj_id];
            if (isNotEmpty(source_items)) {
                source_items.push(autoreplace);
                AUTOREPLACE_SOURCE_Q_DICT[autoreplace.source_qid] = source_items;
            } else {
                AUTOREPLACE_SOURCE_Q_DICT[autoreplace.source_qid] = [autoreplace];
            }
            if (isNotEmpty(obj_items)) {
                obj_items.push(autoreplace);
                AUTOREPLACE_OBJ_ID_DICT[autoreplace.obj_id] = obj_items;
            } else {
                AUTOREPLACE_OBJ_ID_DICT[autoreplace.obj_id] = [autoreplace];
            }
        }
    }
}