
    /*
     *此函数的作用是：
     *获得html页面中隐藏的跳转页面url
     *
     */
    function del_suffix (pre) {
    var temp = pre.indexOf('shtml');
        pre = pre.substr(0, temp - 1);
        return pre;
  }

  function back_admin_index(){
    window.location.href=del_suffix($('#index_path').val());
  }

    function view_task_content(task_id) {

     $(".task_content_show_content").css({
        height : $(window).height()*0.7,
      })
    $("#push_content").hide();
     $.ajax({
            cache   : false,
            type    : "POST",
            url     : del_suffix($('#get_task_content').val()),
            data    : {
            task_id : task_id,

            },
            async   : false,
            error   : function (data) {

                sweetAlert(response.msg,'','error');
            },
            success : function (response) {
           $(".task_content_show_content").show();
            $("#task_title").text('标题：'+response.title);
            $(".task_content_show_content").html(response.content);
            $("#close_task_content").click(function(){

            $(".another_ueditor_show").hide();
            $(".task_content_glo").hide();
            $(".task_content_show").hide();
            });

            $("#modify_content").unbind('click').bind('click',function(){
              ue.setContent(response.content);


            $("#push_content").unbind('click').bind('click',function(){
            var url       = del_suffix($('#push_content_path').val());
            var content   = ue.getContent();
            swal({
               title: "确认修改?",
               type: "info",   showCancelButton: true,
               closeOnConfirm: false,
               showLoaderOnConfirm: true,
              confirmButtonText:'确认',
               cancelButtonText:'取消'
              },
              function(){
                  $.post(url,{task_id:task_id,content:content},function(res){

                    if (res.flag == 1) {
                      setTimeout(function(){

                           swal(res.msg,'','success');
                      },1000);

                    }
                    else{
                      setTimeout(function(){
                           sweetAlert(res.msg,'','error');
                      },1000);

                    }

                  })
               });

     })
            $("#push_content").show();
            $(".task_content_show_content").slideUp("slow",function(){
            $(".task_content_show_content").hide();
            $(".another_ueditor_show").slideDown("slow");
            $(".another_ueditor_show").show();
        });

    })
            $(".task_content_glo").show();
            $(".task_content_show").show();
            },

        });




  }

    function view_report_content(report_id) {
      $(".report_content_show_content").css({
      height : $(window).height()*0.7,
      })
     $("#push_report_content").hide();

     $.ajax({
            cache   : false,
            type    : "POST",
            url     : del_suffix($('#get_report_content').val()),
            data    : {
            report_id : report_id,

            },
            async   : false,
            error   : function (data) {

                sweetAlert(response.msg,'','error');
            },
            success : function (response) {
              title = $("#task_title").val();
            $("#report_title").text('标题:'+title+'   提交时间:'+response.time)
            $(".report_content_show_content").html(response.content);

            $("#close_report_content").click(function(){
            $(".another_ueditor_show").hide();
            $(".report_content_glo").hide();
            $(".report_content_show").hide();
            })
             $(".report_content_show_content").show();
            $(".report_content_glo").show();
            $(".report_content_show").show();
            $("#lable_report_"+report_id).text('已查看');

             $("#modify_report_content").unbind('click').bind('click',function(){
              ue.setContent(response.content);


            $("#push_report_content").unbind('click').bind('click',function(){
            var url       = del_suffix($('#push_report_content_path').val());
            var content   = ue.getContent();
            swal({
               title: "确认修改?",
               type: "info",   showCancelButton: true,
               closeOnConfirm: false,
               showLoaderOnConfirm: true,
              confirmButtonText:'确认',
               cancelButtonText:'取消'
              },
              function(){
                  $.post(url,{report_id:report_id,content:content},function(res){

                    if (res.flag == 1) {
                      setTimeout(function(){

                           swal(res.msg,'','success');
                      },1000);

                    }
                    else{
                      setTimeout(function(){
                           sweetAlert(res.msg,'','error');
                      },1000);

                    }

                  })
               });

     })
            $("#push_report_content").show();
            $(".report_content_show_content").slideUp("slow",function(){
            $(".report_content_show_content").hide();
            $(".another_ueditor_show").slideDown("slow");
            $(".another_ueditor_show").show();
        });

    })

            $(".report_content_glo").show();
            $(".report_content_show").show();
            },

        });

  }