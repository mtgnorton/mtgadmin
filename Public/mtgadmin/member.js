  
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

  $(document).ready(function() {

  
    var url =$("#json_task_data").val();
        url = del_suffix(url);
    var myDate = new Date();
    var year   = myDate.getFullYear(); 
    var month  = myDate.getMonth()+1;
    var day    = myDate.getDate();
    var now_time = year+'-'+month+'-'+day;
    $('#calendar').fullCalendar({
      theme: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      timeFormat:"",
      editable: false,
      lang:'zh-cn',
      defaultDate: now_time,
      disableDragging:true,
        // eventLimit: true, // allow "more" link when too many events
      events: {
        url: url,
        error: function() {
          $('#script-warning').show();
        }
      },
      loading: function(bool) {
        $('#loading').toggle(bool);
      },
   
        eventClick: function(calEvent, jsEvent, view) {
      
           $.ajax({
                  cache   : false,
                  type    : "POST",
                  url     : del_suffix($('#get_task_content').val()),
                  data    : {
                  task_id : calEvent.id,
                  },
                  async   : false,
                  error   : function (data) {
                  
                      sweetAlert(response.msg,'','error');
                  },
                  success : function (response) {
                     
                 
               
                  response   = eval('(' +response+ ')');
                  
                   $("#task_title").text(response.title);    
                   $("#task_content").html(response.content);                               
                   $("#time_s_e").html(response.start_time+'<font color="red">至</font>'+response.end_time);

                 
                    setTimeout(function(){
                        $(window).resize();
                    },50)
                    $(".ueditor_glo").show();
                    $(".ueditor_show").show();
                    $(".ueditor_menu").show();

                     
         
                    $(this).css('border-color', 'red');
                  },

          
              });
           $("#show_ueditor").click(function(){
                 setTimeout(function(){
                        $(window).resize();
                    },50)
               
               $(".ueditor_show").show();
               $(".another_ueditor_show").hide();
          
            })

           $("#write_report").unbind('click').bind('click',function(){
             
                  setTimeout(function(){
                        $(window).resize();   
                    },20)
             
             
             
                $(function(){

                var width  =$(".ueditor_show").width();
                a_ue = UE.getEditor('another_editor',{
                initialFrameWidth : width,
                initialFrameHeight: 800
                 })
                 $(".ueditor_show").hide();
                 $(".another_ueditor_show").show();                         
              });
     
               
        
           })
           $("#close_ueditor").click(function(){

              $(".ueditor_glo").hide();
              $(".ueditor_show").hide();
              $(".ueditor_menu").hide();
              $(".another_ueditor_glo").hide();
              $(".another_ueditor_show").hide();
             setTimeout(function(){
               location.reload() 
             },50)
           })
           $("#pub_report").click(function(){
            var content = a_ue.getContent();
            if (content == '') {
              sweetAlert('请输入内容','','error');
              return;
            }

             $.ajax({
                    cache   : false,
                    type    : "POST",
                    url     : del_suffix($('#pub_report_path').val()),
                    data    : {
                    task_id : calEvent.id,
                    content : content,   
                    },
                    async   : false,
                    error   : function (data) {
            
                        sweetAlert(data.msg,'','error');
                    },
                    success : function (res) {
                 
                  
                    if (res.flag == 1) {
                        swal(res.msg,'','success');
                        }
                        else{
                        sweetAlert(res.msg,'','error');

                        }
                    
                    },
            
                });
           })


    }
    });
  }); 
