
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

 // $(window).resize(function(){
 //    alert($(window).width()*0.01)
 //  $("#tooltip").css({
 //     marginRight : $(window).width()*0.01,
 //  })
 // })
    function getNowFormatDate(flag) {
    var date = flag;



    var seperator1 = "/";
    var seperator2 = ":";
    var month = date.getMonth()+1;
    var strDate =date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var hour    =  date.getHours()< 10 ? ('0' + date.getHours()):date.getHours() ;
    var min     =  date.getMinutes()< 10 ? ('0' + date.getMinutes()):date.getMinutes();
    var currentdate =  month + seperator1 + strDate
            + " " + hour + seperator2 + min;

    return currentdate;
  }
  $(document).ready(function() {

 // $(window).resize();


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
        right: 'month',

      },
      eventLimit: true,
       height:'500px',
      timeFormat:"",
      editable: false,
      lang:'zh-cn',
      // aspectRatio:2,
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
        var url = del_suffix($('#task_url').val());
        url     = url+'/task_id/'+calEvent.id;
        location.href =url
        },
        eventMouseover:function(calEvent, jsEvent, view) {//screenX calEvent.end._d
            var time_x = jsEvent.pageX;
            var time_y = jsEvent.pageY;
            var start_time = getNowFormatDate(calEvent.start._d);
            var end_time  = getNowFormatDate(calEvent.end._d);

            $("#time_prompt").css({
            "top"   : time_y,
            "left"  : time_x,
            }).text(start_time+'--'+end_time);

           $("#time_prompt").show();

        },
    eventMouseout:function(calEvent, jsEvent, view) {
         $("#time_prompt").hide();
    }


    });
    $(".fc-center").before('<div class="mytitle" style=" position:absolute;margin-top:20px; margin-left:200px;"><h3 style="font-size:30px;">任务系统</h3></div>');
    $(".fc-center").css({"margin-top":"40px","margin-right":"-400px"});
  });
