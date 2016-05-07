<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/12/21
 * Time: 21:31
 */

namespace Admin\Controller;
use Think\Controller;

  /*
   *此处的作用是：
   *该页面属于老师
   *
   */

class TaskController extends Controller
{

  public $model ;

  public function _initialize()
  {
    $this->model  =   M();
  }

  public function index($value='')
  {

    $username   =session('username');
    if (empty($username)) {
    $this->error('请登录',U('Admin/Login/index'), 3 );
    }
    if (session('expiretime')<time()) {
    session(null);
    $this->error('登陆超时',U('Admin/Login/index'), 3 );
    }else{
    session('expiretime',time() + 3600); // 刷新时间戳
    }
    if (!competence(session('group_id'),1)) {
    $this->error('权限不符合',U('Admin/Login/index'), 3 );
    }

    $realname    = session('realname');
    $this   -> assign('realname',$realname);

    $user_id     = I('get.member_id');
    $member_realname    = I('get.realname');
    $this->assign('member_realname',$member_realname);
    $sql     = "select FROM_UNIXTIME(start_time,'%m-%d %k:%i') as start_time,FROM_UNIXTIME(end_time,'%m-%d %k:%i') as end_time,title as title ,a.id as id,apply as apply,status as status from mtg_pub_task a left join mtg_task_report b on a.id=b.task_id  and b.status=0 where   a.user_id=$user_id  and a.complete=0  order by apply desc,start_time desc";
    $data = $this->model->query($sql);

    $this->assign("task_data",$data);
    $this->display();
  }
    public function get_task_content($value='')
  {

    $task_id        = I('post.task_id');
    if (empty($task_id)) {
    $this->error('此页面无法访问');
    }

    $sql    = "select content,title from mtg_pub_task where id=$task_id ";

    $data   = $this->model->query($sql);

    $title    = $data[0]['title'];
    $content  = $data[0]['content'];


    $content  = htmlspecialchars_decode($content);

    $this->ajaxReturn(array(
      'content'=>$content,
      'title'  =>$title
      ));
  }
  public function push_content($value='')
  {
    $task_id  = I('post.task_id');
    $content  = I('post.content');
    $sql      = "update mtg_pub_task set content='$content' where id=$task_id";
    $is_suc   = $this->model->execute($sql);
    if ($is_suc) {
      $this->ajaxReturn(
        array(
          "flag"=>1,
          'msg'=>"任务修改成功"
          ));
    }else{
            $this->ajaxReturn(
        array(
          "flag"=>0,
          'msg'=>"任务修改失败"
          ));
    }
  }
}