 var ue;
 function del_suffix (pre) {
  
    var temp = pre.indexOf('shtml');
        pre = pre.substr(0, temp - 1);
        return pre;
   }
 function rel(){  
    UE.getEditor('another_editor').destroy();
    var editorwidth   = $(window).width()*0.8;
    var editorheight  = $(window).height()*0.7;
    var editorleft    = $(window).width()*0.1;
               ue = UE.getEditor('another_editor',{
                initialFrameWidth : editorwidth,
                initialFrameHeight: editorheight,
                 });
    $(".another_ueditor_show").css({
      left:editorleft,
      width:editorwidth,
      height:editorheight, 
    });
    var temp_height = ($(window).height()-$('.another_ueditor_show').height())/6;

    $('.another_ueditor_menu').css({  
    position:'absolute',  
    left    : ($(window).width()-$('.another_ueditor_show').outerWidth())/2,  
    height  : 1*temp_height,

    top     : 2*temp_height+$(document).scrollTop(),
    width   : editorwidth,
   
  }) 
};
 

  $(document).ready(function(){

    var task_width,task_height;
  $("#report_return").click(function(){
   
      $(".another_ueditor_glo").hide();
      $(".another_ueditor_menu").hide();
      $(".another_ueditor_show").hide(); 
      $(".task_content").animate({
      width: task_width+'px',
      height:task_height+'px',
    },1000);
  })

  $("#write_report").click(function(){
    $(window).resize();  
    task_width  = $(".task_content").width();
    task_height = $(".task_content").height();

    $(".task_content").animate({
      width:'0px',
      height:'0px'
    },1000,function(){
      $(".another_ueditor_glo").show();
       $(".another_ueditor_menu").show();
      $(".another_ueditor_show").show();
      
      });

 
    });
 // $('#ert').bind("myclick",function(){
 //        $('#edui425_body').grumble(
 //        {
 //        text: '点击全屏!', 
 //        angle: 60, 
 //        distance: 1, 
 //        showAfter: 500,
 //        hideAfter: 500,
 //        onHide: function(grumble, button) {
 //        grumble.bubble.remove();
 //        grumble.text.remove();
 //        button && button.remove();
 //    }
 //        }
 //      );

 //      $('#edui580_body').grumble(
 //        {
 //        text: '上传文件!', 
 //        angle: 60, 
 //        distance: 1, 
 //        showAfter: 1000,
 //        hideAfter: 500,
 //        onHide: function(grumble, button) {
 //        grumble.bubble.remove();
 //        grumble.text.remove();
 //        button && button.remove();
 //    }
 //        }
 //      );
 
 //     $('#edui568_state').grumble(
 //        {
 //        text: '上传图片!', 
 //        angle: 60, 
 //        distance: 1, 
 //        showAfter: 1500,
 //        hideAfter: 500,
 //    onHide: function(grumble, button) {

 //        grumble.bubble.remove();
 //        grumble.text.remove();
 //        button && button.remove();
 //    }
 //        }
 //      );
 //         });
 
 //  $('#ert').trigger("myclick"); 
 //  $('#ert').unbind("myclick");   

 

  $("#pub_report").click(function(){
    var content = ue.getContent();
            if (content == '') {
              sweetAlert('请输入内容','','error');
              return;
            }

      var task_id = $("#task_id").val();

      swal({
         title: "确定要提交么",
         type: "info",   showCancelButton: true,  
         closeOnConfirm: false,  
         showLoaderOnConfirm: true, 
        },
        function(){ 
                 $.ajax({
                    cache   : false,
                    type    : "POST",
                    url     : del_suffix($('#pub_report_path').val()),
                    data    : {
                    task_id : task_id,
                    content : content,   
                    },
                    async   : false,
                    error   : function (data) {
            
                        sweetAlert(data.msg,'','error');
                    },
                    success : function (res) {
                 
                  
                    if (res.flag == 1) {
                          setTimeout(function(){ 
        swal(res.msg,'','success');
        },
         1000);
                      
                        }
                        else{
                                                  setTimeout(function(){ 
         sweetAlert(res.msg,'','error');

        },
         1000);
                       
                        }
                    
                    },
            
                });
    
         });

      

  })

});


  $(window).resize(function(){  
    rel();
  
  $('.another_ueditor_show').css({  
    position:'absolute',  
    left:($(window).width()-$('.another_ueditor_show').outerWidth())/2,  
    top:($(window).height()-$('.another_ueditor_show').outerHeight())/2+$(document).scrollTop()  
  }) 

    $("#another_editor").css({
      width:$(".another_ueditor_show").width()  
    })

   
}) 

$(function(){

$(window).resize();  
});