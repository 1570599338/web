/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 16-4-15
 * Time: 下午5:13
 * To change this template use File | Settings | File Templates.
 */
    //新增时提交的数据
var q1 = {
    "title":"多选题",
    "custom_attr":{},
    "question_type":3,
    "project_id":"57109f84a320fc75398a7dbf",
    "option_list":[
        {  "title":"选项1",
            "is_open":false,
            "custom_attr":{}
        },
        {"title":"选项2",
            "is_open":false,
            "custom_attr":{}
        }
    ],
    "questionpage_id":"57109f84a320fc75398a7dc0"
}


//提交后返回的数据
var q = {
    "status":"200",
    "page_id":"5710baa9a320fc76813b1670",
    "question":{"has_open_option":false,
        "_id":{"$oid":"5710bc71a320fc75ced3127d"},
        "jumpconstraint_id_list":[],
        "option_id_list":["5710bc71a320fc75ced3127e", "5710bc71a320fc75ced3127f"],
        "cid":"Q2",
        "questionpage_id":"5710baa9a320fc76813b1670",
        "title":"单选题",
        "updated":{"$date":1460743409552},
        "matrixrow_list":[],
        "matrixrow_id_list":[],
        "option_list":[
            {"updated":{"$date":1460743409645},
                "cid":"A1",
                "title":"选项1",
                "is_open":false,
                "_id":{
                    "$oid":"5710bc71a320fc75ced3127e"
                },
                "custom_attr":{},
                "question_id":"5710bc71a320fc75ced3127d"
            },
            {
                "updated":{"$date":1460743409696},
                "cid":"A2",
                "title":"选项2",
                "is_open":false,
                "_id":{"$oid":"5710bc71a320fc75ced3127f"},
                "custom_attr":{},
                "question_id":"5710bc71a320fc75ced3127d"}
        ],
        "question_type":2,
        "project_id":"5710baa9a320fc76813b166f",
        "custom_attr":{}
    }
}