<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/12/21
 * Time: 21:31
 */

namespace Home\Controller;
use Think\Controller;

	/*
	 *此处的作用是：
	 *该页面属于老师
	 *
	 */

class IndexController extends Controller
{
public function index($value='')
	{	

		is_login();
		$realname 	 = session('realname');
		$this 	-> assign('realname',$realname);

		$member_data 	= get_users(session('group_id'));
		

		$pub_taskModel  = M('pub_task');

		$general_id 	= session('user_id');
		$member_task    = array();
		foreach ($member_data as $key => $value) {
		$temp_id 	= $value['id'];
		$member_data[$key]['task_number'] 	= $pub_taskModel->where("pub_id=$general_id and user_id=$temp_id ")->count();
		}

		$this->assign('member_data' , $member_data);
		
		$this 	-> display();
	}	
	public function modify_group($value='')
	{
		$user_id 			= I('post.id');
		$data['group_id']	= I('post.group_id');
	
		$memberModel 		= M('member');
		$old_group_id 		= $memberModel->where("id=$user_id")->getField('group_id');
		if ($old_group_id == $data['group_id']) {
			$this->ajaxReturn(array(
			'flag' => 0,
			'msg'  => "修改的等级相同",
			));	
			exit;
		}
		$is_suc 			= $memberModel->where("id=$user_id")->save($data);
		if ($is_suc) {	
		$groupModel 	= M('group');
		$temp 			= $data['group_id'];
		$group_name 	= $groupModel->where("id=$temp")->getField('group_name');
		$this->ajaxReturn(array(
			'flag' => 1,
			'msg'  => "等级修改成功",
			'group_name'=>$group_name,
			));
		}else{
		$this->ajaxReturn(array(
			'flag' => 0,
			'msg'  => "等级修改失败",
			));	
		}
	}
	public function add_task($value='')
	{
		$insert_data['start_time'] 	= strtotime(I('post.start_time'));
		$insert_data['end_time']	= strtotime(I('post.end_time'));
		$insert_data['type'] 		= I('post.type'); #0代表长期任务，1代表短期任务
		if ($insert_data['start_time'] >= $insert_data['end_time']) {
		$this->ajaxReturn(array(
			'flag' => 0,
			'msg'  => "结束时间早于等于开始时间",
			));		
		}
		$insert_data['content'] 	= trim(I('post.content'));	
		$insert_data['pub_id']  	= session('user_id');
		$insert_data['pub_time']    = time();
		$insert_data['complete']    = 0;
		$insert_data['user_id'] 	= I('post.user_id');
		$insert_data['title'] 		= I('post.title');
		$pub_taskModel 		= M('pub_task');
		$is_suc 			= $pub_taskModel->add($insert_data);
		if ($is_suc) {
		$this->ajaxReturn(array(
			'flag' => 1,
			'msg'  => "布置任务成功",
			));	
		}else{
		$this->ajaxReturn(array(
			'flag' => 0,
			'msg'  => "布置任务失败",
			));	
		}
	}
	public function get_user_all_ask($value='')
	{	
		$pub_id  = session('user_id');
		$user_id = I('post.user_id');
		$pub_taskModel = M('pub_task');
		$data = $pub_taskModel->where("pub_id=$pub_id and user_id=$user_id")->select();
		$data = json_encode($data);
		$this->ajaxReturn($data);
	}

	  /*
	   *此处的作用是：
	   *查看某个小兵的某个任务内容
	   *
	   */	
		public function get_task_content($value='')
	{
		$task_id 				= I('post.task_id');
		$pub_taskModel 			= M('pub_task');

		$data 					= $pub_taskModel->where("id=$task_id")->find();

	

		$re_data['start_time'] 	= date('m-d H:i',$data['start_time']);
		$re_data['end_time'] 	= date('m-d H:i',$data['end_time']);
		$re_data['content']		= htmlspecialchars_decode($data['content']);
		$re_data 				= json_encode($re_data);
		$this->ajaxReturn($re_data);
	}	
	public function table($value='')
	{
		$this->display();
	}
	public function ueditor($value='')
	{
		$this->display();
	}
}