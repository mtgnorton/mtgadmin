	
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
    var date = new Date();
    if (flag == 8) {
    var t=new Date();//你已知的时间
    var t_s=t.getTime();//转化为时间戳毫秒数
    var nt=new Date();//定义一个新时间
    nt.setTime(t_s+1000*60*60*8);//设置新时间比旧时间多一分钟
    date =nt;
    }


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
        var day8 = 0;
      if(  $("#flag").val() == 1){
        var flag_time = 1;
      }
      else{
        var flag_time = 0;//0代表长期,1代表短期
        } 
        var flag_time1 = 1;//1代表没点取消，0代表取消

     
        
       $(".dtp-btn-cancel").click(function(){ 
              flag_time1 = 0;
           
       })
       $(".dtp-btn-ok").click(function(){ 
              flag_time1 = 1;
              
       })

       $("#end_sel_time").unbind('click').bind('click',function(){ 
        day8 = getNowFormatDate(8);
        $("#date-end").val(day8);
        flag_time  = 1 ;
        })

        $("#long_sel").unbind('click').bind('click',function(){ 
        day8 = 0;
        $("#date-end").val('');
        flag_time = 0;
       
        })

         $(".task_m").show();
         $(".task_b").show();
          var nowtime=getNowFormatDate();   
         $("#date-start").val(nowtime);
         $('#date-end').bootstrapMaterialDatePicker('setMinDate', nowtime);
         $("#cancel_task").unbind('click').bind('click',function(){ 
         $(".task_m").hide();
         $(".task_b").hide();
        })
         $("#pub_task").unbind('click').bind('click',function(){ 
        
        var start_id = $("#date-start").attr('data-dtp')
        var tt = $("div#"+start_id).text();
        var month= tt.match(/_left(.*?)chevron/);
        month = month[1];
        month = month.substr(0,month.length-1);
        if (month == 'MA') {
        var start_time = nowtime;
        }
        else{
        var day  = tt.match(/_right(.*?)chevron/);
        day = day[1];
        var temp =tt.indexOf(month);
        tt = tt.substr(temp);
        var year= tt.match(/_left(.*?)chevron/);
        year = year[1];
        var time =tt.match(/AM(.*)PM/);
        time   = time[1];
        var start_time = year+'/'+month+'/'+day+ ' '+time;
        }


        var start_id = $("#date-end").attr('data-dtp')
        var tt = $("div#"+start_id).text();
        var month= tt.match(/_left(.*?)chevron/);
        month = month[1];
        month = month.substr(0,month.length-1);
        var end_time ='';
        if (month == 'MA') {
    
          if (day8 == 0) {
           sweetAlert('请选择时间','','error')   
           return;
          }
          else{
            
           end_time = day8;   
         
          }
        }else{
          
        
      
        var day  = tt.match(/_right(.*?)chevron/);
        day = day[1];
        var temp =tt.indexOf(month);
        tt = tt.substr(temp);
        var year= tt.match(/_left(.*?)chevron/);
        year = year[1];
        var time =tt.match(/AM(.*)PM/);
        time   = time[1];
        end_time = year+'/'+month+'/'+day+ ' '+time;
     
    
        }
         
        if (flag_time == 0 && flag_time1 == 0 ) {
         sweetAlert('请选择时间','','error');
         return;
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
                    swal(response.msg,'','success'); 
                      $(".task_m").hide();
                      $(".task_b").hide();
                      temp = $("#"+user_id+"_number").text();
                      temp = parseInt(temp) + 1;
                      $("#"+user_id+"_number").text(temp);

                         setTimeout(function(){
                    window.history.go(0); 
                    },300);
                        

                    }
                    else{
                      sweetAlert(response.msg,'','error');
                    }
                
                },
        
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

  function get_user_all_ask(user_id,realname) {

    $.ajax({
           cache   : false,
           type    : "POST",
           url     : del_suffix($('#get_user_all_ask').val()),
           data    : {
           user_id : user_id,
          
           },
           async   : false,
           error   : function (data) {
   
               sweetAlert(response.msg,'','error');
           },
           success : function (response) {
              response = eval('(' +response +')');


           $(".user_all_task_show").empty();
            $(".user_all_task_show").append('<h3 align="center" >'+realname+'-任务信息</h3> <span style="float:right;margin-bottom:30px"><button type="button" id="close_user_task" class="btn btn-danger">关闭</button></span>');
            var text  = '<table class="stripe" id="user_task_table">\n'+
                                    '<thead>\n'+
                                        '<tr>\n'+
                                        '<th><span class="label label-default">序号</span></th>\n'+
                                         '<th><span class="label label-default">开始时间</span></th>\n'+
                                          '<th><span class="label label-default">结束时间</span></th>\n'+
                                     '<th><span class="label label-default">状态 </span></th>\n'+
                                     '<th><span class="label label-default">内容</span></th>\n'+
                                     '<th><span class="label label-default">报告</span></th>\n'+
                                        '</tr>\n'+
                                    '</thead>\n'+
                                    '<tbody>\n';

            for(var p in response){
                text += '<tr>\n';
                text +='<td>'+p+'</td>\n';
            
                start_time_temp   = getDateymd(response[p].start_time);
                end_time_temp     = getDateymd(response[p].end_time);
                text +='<td>'+start_time_temp+'</td>\n';
                text +='<td>'+end_time_temp+'</td>\n';
                if (response[p].complete == 0) {
                  temp = '未完成';
                }else{
                  temp = "已完成";
                }
                text += '<td>'+temp+'</td>\n';

                text += '<td><button type="button" class="btn btn-default" onclick="view_task('+response[p].id+')">查看</button></td>\n';
                text += '<td>'+'<button type="button" class="btn btn-warning">查看</button>'+'</td>\n</tr>';
            }
            text +='</tbody>\n'+'</table>\n';

            $(".user_all_task_show").append(text);
            
           $('#user_task_table').DataTable({
      language: {
        "sProcessing": "处理中...",
        "sLengthMenu": "显示 _MENU_ 项结果",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sSearch": "搜索:",
        "sUrl": "",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "上页",
            "sNext": "下页",
            "sLast": "末页"
        },
        "oAria": {
            "sSortAscending": ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
    },
    "bAutoWidth": false,
        "aoColumns" : [
            { sWidth: '50px' },
            { sWidth: '50px' },
             { sWidth: '50px' },
              { sWidth: '50px' },
            { sWidth: '50px' },
            { sWidth: '50px' }
        ] , 

});

   
      $(function(){
        $("#close_user_task").click(function () {
            $(".user_all_task").hide();
           $(".user_all_task_show").hide();  
        })        
      });          
          
            $(".user_all_task").show();
           $(".user_all_task_show").show(); 
           
           },
   
       });
  }

  /*
   *此处的作用是：
   *查看某个小兵的某个任务内容
   *
   */
  function view_task(task_id) {
    var a_ue = UE.getEditor('another_editor'); 
    a_ue.setContent(111111111,false);
          
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
  }
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