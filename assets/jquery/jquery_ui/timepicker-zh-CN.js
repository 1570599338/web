/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Cloudream (cloudream@gmail.com). */
(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["../widgets/timepicker"], factory);
    } else {

        // Browser globals
        factory(jQuery.timepicker);
    }
}(function (timepicker) {

    timepicker.regional["zh-CN"] = {
        timeOnlyTitle: '时间',
        timeText: '时间',
        hourText: '小时',
        minuteText: '分钟',
        secondText: '秒',
        millisecText: 'Миллисекунды',
        timezoneText: 'Часовой пояс',
        currentText: '现在',
        closeText: '关闭',
        timeFormat: 'HH:mm',
        amNames: ['AM', 'A'],
        pmNames: ['PM', 'P'],
        isRTL: false
    };
    timepicker.setDefaults(timepicker.regional["zh-CN"]);

    return timepicker.regional["zh-CN"];

}));