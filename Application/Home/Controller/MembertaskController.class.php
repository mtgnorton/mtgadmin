<?php
namespace Home\Controller;
use Think\Controller;

	/*
	 *此处的作用是：
	 *该页面属于老师
	 *
	 */

class MembertaskController extends Controller
{
public function index($value='')
	{	

		$username 	=session('username');
		if (empty($username)) {
		$this->error('请登录',U('Admin/Login/index'), 3 );
		}
		if (!competence(session('group_id'),2)) {
		$this->error('权限不符合',U('Admin/Login/index'), 3 );
		}	
		$realname 	 = session('realname');
		$this 	-> assign('realname',$realname);
		
		$member_realname 	= I('get.realname');
		$this->assign("member_realname",$member_realname);

		$pub_id  = session('user_id');
		$user_id = I('get.member_id');
		$pub_taskModel = M();
		$sql  	 = "select FROM_UNIXTIME(start_time,'%m-%d %k:%i') as start_time,FROM_UNIXTIME(end_time,'%m-%d %k:%i') as end_time,title,id,complete from mtg_pub_task where pub_id=$pub_id and user_id=$user_id order by start_time desc";
		$data = $pub_taskModel->query($sql);
		
		$this->assign("task_data",$data);
		$this->display();
	}

			public function get_task_content($value='')
	{

		$task_id 				= I('post.task_id');
		if (empty($task_id)) {
		$this->error('此页面无法访问');
		}
		$model 		= M();
		$sql 		= "select content,title from mtg_pub_task where id=$task_id ";
	
		$data 	= $model->query($sql);
		
		$title 		= $data[0]['title'];
		$content 	= $data[0]['content'];
	

		$content	= htmlspecialchars_decode($content);

		$this->ajaxReturn(array(
			'content'=>$content,
			'title'  =>$title
			));
	}	
}