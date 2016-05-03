	
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
    function login_judge() {
    var index_url   =  del_suffix($('#login_index').val());
        $.ajax({
            cache: true,
            type: "POST",
            url: del_suffix($('#login_judge').val()),
            data: {
            data :$("#login_form").serializeArray(), 
            }, // 你的formi
            error: function(data) {
                alert("Connection error");
            },
            success : function (response) {
              
                if (response.flag == 1) {
             
                swal(response.msg,'','success');

                  
                setTimeout(function(){
                window.location.href = response.url;   
                },1000);
               
                }
                else{
               sweetAlert(response.msg,'','error');
               return;
                 }

                
            },
        });

    }
    function register_judge(argument) { 
    var index_url   =  del_suffix($('#login_index').val());

        $.ajax({
            cache: true,
            type: "POST",
            url: del_suffix($('#register_judge').val()),
            data: {
            data :$("#register_form").serializeArray(), 
            }, // 你的formi
            error: function(data) {
                alert("Connection error");
            },
            success : function (response) {
             
                if (response.flag == 1) {

                swal(response.msg,'','success');

             
                setTimeout(function(){
                window.location.href = index_url;   
                },1000);
               
                }
                else{
               sweetAlert(response.msg,'','error');
               return;
                 }

                
            },
        });
    }
    function modify_group(id,name) {
       
         $(".mask").show();
         $(".bomb_box").show();

         $("#thename").text('姓名：'+name);

        $("#close_group").unbind('click').bind('click',function(){
          $(".mask").hide();
           $(".bomb_box").hide();    
        })
         $("#change_group").unbind('click').bind('click',function(){
              
                var group_value = $("#group ").val();

                $.ajax({
                cache   : false,
                type    : "POST",
                url     : del_suffix($('#modify_group').val()),
                data    : {
                id      : id,
                group_id: group_value              
                },
                async   : false,
                error   : function (data) {
        
                    sweetAlert(response.msg,'','error');
                },
                success : function (response) {

                    if (response.flag == 1) {
                      swal(response.msg,'','success'); 
                      var temp = id+"_group";
                      $("#"+temp).text(response.group_name); 
                        $(".mask").hide();
                    $(".bomb_box").hide();  
                    }
                    else{
                      sweetAlert(response.msg,'','error');  
                    }  
                
                },
        
            }); 
                });       

        
    }
    function logout(){
      $.ajax({
              cache   : false,
              type    : "POST",
              url     : del_suffix($('#logout').val()),
              data    : {
              logout  : 1,
            
              },
              async   : false,
              error   : function (data) {
      
                  sweetAlert(response.msg,'','error');
              },
              success : function (response) {
                
                  swal(response.msg,'','success');
                 setTimeout(function(){
                 window.location.href = response.url;   
                  },1000);
               
              },
      
          }); 
    }
    function getNowFormatDate(flag) {
    var date = flag;
   


    var seperator1 = "/";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes();
           
    return currentdate;
  } 

  /*
   *此处的作用是：
   *给某个小兵发布任务
   *
   */
    function assign_task(user_id) {

      var ue   = UE.getEditor('editor');
        $(window).resize();  
      
        var flag_time=1;

        $('#date-start').bootstrapMaterialDatePicker('setDate', (new Date()));
       var curDate = new Date(); 
       var nextDate = new Date(curDate.getTime() + 24*60*60*1000);  
       var  next_day_time  = getNowFormatDate(nextDate);
       $("#date-end").val(next_day_time);

       var task_m_height = $(window).height()*0.8;
      
       $(".task_m").css({
        height:task_m_height,
       });

        $(".task_m").show();
         $(".task_b").show(); 
   
     
         $('#ert').bind("myclick",function(){
             $('#edui3_body').grumble(
        {
         text: '点击全屏!', 
        angle: 60, 
        distance: 1, 
        showAfter: 500,
        hideAfter: 500,
        onHide: function(grumble, button) {
        grumble.bubble.remove();
        grumble.text.remove();
        button && button.remove();
    }
        }
      );

      $('#edui160_body').grumble(
        {
        text: '上传文件!', 
        angle: 60, 
        distance: 1, 
        showAfter: 1000,
        hideAfter: 500,
        onHide: function(grumble, button) {
        grumble.bubble.remove();
        grumble.text.remove();
        button && button.remove();
    }
        }
      );
     $('#edui148_state').grumble(
        {
         text: '上传图片!', 
        angle: 60, 
        distance: 1, 
        showAfter: 1500,
        hideAfter: 500,
    onHide: function(grumble, button) {

        grumble.bubble.remove();
        grumble.text.remove();
        button && button.remove();
    }
        }
      );
         });

    $('#ert').trigger("myclick"); 

  $('#ert').unbind("myclick");

         $("#long_time").unbind('click').bind('click',function(){
         nextDate = new Date(curDate.getTime() + 7*24*60*60*1000);  
         var next_sev_day_time  = getNowFormatDate(nextDate);
           $("#date-end").val(next_sev_day_time);
           flag_time=0;
        })

          $("#short_time").unbind('click').bind('click',function(){
         nextDate = new Date(curDate.getTime() + 24*60*60*1000);  
         next_day_time  = getNowFormatDate(nextDate);
           $("#date-end").val(next_day_time);
           flag_time=1;
        })
         // $('#date-end').bootstrapMaterialDatePicker('setMinDate', nowtime);

         $("#cancel_task").unbind('click').bind('click',function(){ 
          $('#edui3_body').remove();
          $('#edui160_body').remove();
          $('#edui148_state').remove();
         $(".task_m").hide();
         $(".task_b").hide();
        })
         $("#pub_task").unbind('click').bind('click',function(){ 
        
         var start_time =  $('#date-start').bootstrapMaterialDatePicker('getDate').val();
         var end_time  =  $('#date-end').bootstrapMaterialDatePicker('getDate').val();
        if (end_time == '') {
          end_time = $("#end_time").val();
        }

        var task_title = $("#task_title").val();
      
        if (task_title =='') {
         sweetAlert('标题不能为空','','error')
          return;
        }
        var content   = UE.getEditor('editor').getContent();

        if (content == '') {
          sweetAlert('内容不能为空','','error')
          return;
        }
  
       swal({
         title: "确定要发布么",
         type: "info",   showCancelButton: true,  
         closeOnConfirm: false,  
         showLoaderOnConfirm: true, 
        },
        function(){ 

         $.ajax({ 
                cache   : false,
                type    : "POST",
                url     : del_suffix($('#add_task').val()),
                data    : {
                start_time :  start_time,
                end_time   :  end_time,
                content    :  content,
                user_id    :  user_id,
                type       :  flag_time,
                title      :  task_title,
                },
                async   : false,
                error   : function (data) {
                
                    sweetAlert(response.msg,'','error');
                },
                success : function (response) {

                    if (response.flag == 1) {
                           setTimeout(function(){ 
                   swal(response.msg,'','success'); 
                      $(".task_m").hide();
                      $(".task_b").hide();
                      temp = $("#"+user_id+"_number").text();
                      temp = parseInt(temp) + 1;
                      $("#"+user_id+"_number").text(temp);
                      $("#task_title").val('');
                      ue.setContent('');
                    },1000);
                           
               

                    }
                    else{
            setTimeout(function(){ 
            sweetAlert(response.msg,'','error');
              },1000);
                    
                    }
                
                },
        
            });
   

         });
        })

    }
    function getDateymd(time) {
            var nt    = new Date(time*1000);
         
     
            var month = nt.getMonth()+1;
            var day   = nt.getDate();
            var hour  = nt.getHours();
            var minute  = nt.getMinutes();
            return month+'-'+day+'  '+hour+':'+minute;
    }

//   function get_user_all_ask(user_id,realname) {

//     $.ajax({
//            cache   : false,
//            type    : "POST",
//            url     : del_suffix($('#get_user_all_ask').val()),
//            data    : {
//            user_id : user_id,
          
//            },
//            async   : false,
//            error   : function (data) {
   
//                sweetAlert(response.msg,'','error');
//            },
//            success : function (response) {
//               response = eval('(' +response +')');


//            $(".user_all_task_show").empty();
//             $(".user_all_task_show").append('<h3 align="center" >'+realname+'-任务信息</h3> <span style="float:right;margin-bottom:30px"><button type="button" id="close_user_task" class="btn btn-danger">关闭</button></span>');
//             var text  = '<table class="stripe" id="user_task_table">\n'+
//                                     '<thead>\n'+
//                                         '<tr>\n'+
//                                         '<th><span class="label label-default">序号</span></th>\n'+
//                                          '<th><span class="label label-default">开始时间</span></th>\n'+
//                                           '<th><span class="label label-default">结束时间</span></th>\n'+
//                                      '<th><span class="label label-default">状态 </span></th>\n'+
//                                      '<th><span class="label label-default">内容</span></th>\n'+
//                                      '<th><span class="label label-default">报告</span></th>\n'+
//                                         '</tr>\n'+
//                                     '</thead>\n'+
//                                     '<tbody>\n';

//             for(var p in response){
//                 text += '<tr>\n';
//                 text +='<td>'+p+'</td>\n';
            
//                 start_time_temp   = getDateymd(response[p].start_time);
//                 end_time_temp     = getDateymd(response[p].end_time);
//                 text +='<td>'+start_time_temp+'</td>\n';
//                 text +='<td>'+end_time_temp+'</td>\n';
//                 if (response[p].complete == 0) {
//                   temp = '未完成';
//                 }else{
//                   temp = "已完成";
//                 }
//                 text += '<td>'+temp+'</td>\n';

//                 text += '<td><button type="button" class="btn btn-default" onclick="view_task('+response[p].id+')">查看</button></td>\n';
//                 text += '<td>'+'<button type="button" class="btn btn-warning">查看</button>'+'</td>\n</tr>';
//             }
//             text +='</tbody>\n'+'</table>\n';

//             $(".user_all_task_show").append(text);
            
//            $('#user_task_table').DataTable({
//       language: {
//         "sProcessing": "处理中...",
//         "sLengthMenu": "显示 _MENU_ 项结果",
//         "sZeroRecords": "没有匹配结果",
//         "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
//         "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
//         "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
//         "sInfoPostFix": "",
//         "sSearch": "搜索:",
//         "sUrl": "",
//         "sEmptyTable": "表中数据为空",
//         "sLoadingRecords": "载入中...",
//         "sInfoThousands": ",",
//         "oPaginate": {
//             "sFirst": "首页",
//             "sPrevious": "上页",
//             "sNext": "下页",
//             "sLast": "末页"
//         },
//         "oAria": {
//             "sSortAscending": ": 以升序排列此列",
//             "sSortDescending": ": 以降序排列此列"
//         }
//     },
//     "bAutoWidth": false,
//         "aoColumns" : [
//             { sWidth: '50px' },
//             { sWidth: '50px' },
//              { sWidth: '50px' },
//               { sWidth: '50px' },
//             { sWidth: '50px' },
//             { sWidth: '50px' }
//         ] , 

// });

   
//       $(function(){
//         $("#close_user_task").click(function () {
//             $(".user_all_task").hide();
//            $(".user_all_task_show").hide();  
//         })        
//       });          
          
//             $(".user_all_task").show();
//            $(".user_all_task_show").show(); 
           
//            },
   
//        });
//   }

  /*
   *此处的作用是：
   *查看某个小兵的某个任务内容
   *
   */
  // function view_task(task_id) {
  //   var a_ue = UE.getEditor('another_editor'); 
  //   a_ue.setContent(111111111,false);
          
         // $.ajax({
         //          cache   : false,
         //          type    : "POST",
         //          url     : del_suffix($('#get_task_content').val()),
         //          data    : {
         //          task_id : task_id,
         //          },
         //          async   : false,
         //          error   : function (data) {
             
         //              sweetAlert(response.msg,'','error');
         //          },
         //          success : function (response) {
         //          response   = eval('(' +response+ ')');
                
                  
         //          a_ue.setContent(111111111,false);
         //      //     a_ue.addListener('ready', function (){
                
         //      //     a_ue.setContent(111111111,false);
         //      // });
         //      // $("#m2").html('111');
                                                         
         //          $(".ueditor_glo").show();
         //          $(".ueditor_menu").show();    
         //          $(".ueditor_show").show(); 
         //          $("#close_ueditor_home").click(function(){
         //          $(".ueditor_glo").hide();
         //          $(".ueditor_menu").hide();    
         //          $(".ueditor_show").hide();  
         //          })  
         //          },
          
         //      });
  // }
  function view_task_content(task_id) {
   
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

            $(".task_content_show_title").text(response.title);
            $(".task_content_show_content").html(response.content);
            $("#close_task_content").click(function(){
            $(".task_content_glo").hide();
            $(".task_content_show").hide();
            })
            $(".task_content_glo").show();
            $(".task_content_show").show();
            },
    
        });
   
  }
    function view_report_content(report_id) {
   
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


            $(".task_content_show_content").html(response);
            $("#close_task_content").click(function(){
            $(".task_content_glo").hide();
            $(".task_content_show").hide();
            })
            $(".task_content_glo").show();
            $(".task_content_show").show();
            },
    
        });
   
  }