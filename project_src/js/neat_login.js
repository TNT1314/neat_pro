$(function() {
    "use strict";

    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });

    $("#login_submit").on("click", user_login);

    $("#password").keypress(function (e) {
        var key = e.which; //e.which是按键的值
        if (key === 13) {
            $("#login_submit").click();
        }
    });

    // user login function
    function user_login(){
        if(valid_form().form()){
            show_message("登录中，请稍等......");
            $.ajax({
                type: "POST",
                url: Settings.server + "/api/user/login",
                data: $("#login_form").serialize(),
                dataType: Settings.ajax_format,
                timeout: 3000,
                success: function (data) {
                    show_message("登录中，请稍等......");
                    if(data.code === 10000){
                        $(location).attr('href', 'neat_main.html');
                    }else{
                        var content = data.code_desc;
                        show_message(content);
                    }
                },
                error: function (xhr, htl) {
                    Tools.error("error", xhr, htl);
                    show_message("网络错误");
                }
            });
        }
    }

    // show message
    function show_message(content){
        $(".login-box-msg").html(content);
    }

    // show form validate
    //验证表单
    function valid_form() {
        return $("#login_form").validate({
            rules: {
                username:{isValidity:true},
                password:{isPWD:true}
            },
            messages: {
                username:{required:"请填写账号"},
                password:{required:"请填写密码"}
            },
            errorClass: "error",
            success: 'valid',
            unhighlight: function (element, errorClass) { //验证通过
                $(element).tooltip('destroy').removeClass(errorClass);
            },
            errorPlacement: function (error, element) {
                if ($(element).next("div").hasClass("tooltip")) {
                    $(element).attr({"data-original-title": $(error).text()}).tooltip("show");
                } else {
                    $(element).attr({"title":$(error).text()}).tooltip("show");
                }
            }
        });
    }
});