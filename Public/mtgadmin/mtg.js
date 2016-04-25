	
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
    function assign_task(user_id) {
        $(".task_m").show();
         $(".task_b").show();

    }