<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/12/21
 * Time: 21:31
 */

namespace Member\Controller;
use Think\Controller;

	/*
	 *此处的作用是：
	 *该页面属于老师
	 *
	 */

class TaskController extends Controller
{
public function index($value='')
	{
		$username 	= session('username');
		if (empty($username)) {
		$this->error('请登录',U('Admin/Login/index'), 3 );
		}
		if (!competence(session('group_id'),3)) {
		$this->error('权限不符合',U('Admin/Login/index'), 3 );

		}
		$task_id 	=  I('get.task_id');
		$pub_taskModel 			= M('pub_task');

		$data 					= $pub_taskModel->where("id=$task_id")->find();

		$re_data['start_time'] 	= date('m-d H:i',$data['start_time']);
		$re_data['end_time'] 	= date('m-d H:i',$data['end_time']);
		$re_data['content']		= htmlspecialchars_decode($data['content']);
		$re_data['title']		= $data['title'];
		$re_data['apply_finish'] = $data['apply'];

		$this->assign('task_id',$task_id);
		$this->assign('task_data',$re_data);
		$this->display();
	}
		/*
	 *此处的作用是：
	 *将用户对某个任务的报告存储到数据库
	 *
	 */
	public function pub_report($value='')
	{
		$task_id 	= $insert_data['task_id'] 			= I('post.task_id');
		$insert_data['content'] 						= I('post.content');
		$insert_data['status'] 							= 0;
		if (empty($task_id)) {
		$this->error('此页面无法访问');
		}
		$now_time 	= $insert_data['push_time']			= time();

		$task_reportModel 								= M('task_report');
		$sql 		= "select push_time from mtg_task_report where task_id=$task_id order by push_time desc limit 1";
		$last_time 	= $task_reportModel->query($sql);
		$last_time  = $last_time[0]['push_time'];
		$last_time 	= date("Y-m-d",$last_time);
		$now_time 	= date("Y-m-d",$now_time);
		if ($last_time == $now_time) {
		$this->ajaxReturn(array(
			'flag' 	=> 0,
			'msg' 	=> '今日报告已经提交，不要重复提交'
				));
		exit;
		}

		$is_suc 										= $task_reportModel->add($insert_data);
		if ($is_suc) {
			$this->ajaxReturn(array(
			'flag' 	=> 1,
			'msg' 	=> '报告提交成功'
				));
		}else{
		$this->ajaxReturn(array(
			'flag' 	=> 0,
			'msg' 	=> '报告提交失败'
				));
		}


	}
	public function  apply_finish($value='')
	{
		$task_id 				= I('post.task_id');
		$save_data['apply'] = 1;
		$pub_taskModel 	= M('pub_task');
		$is_suc 				= $pub_taskModel->where("id=$task_id")->save($save_data);
			if ($is_suc) {
			$this->ajaxReturn(array(
			'flag' 	=> 1,
			'msg' 	=> '申请完成成功'
				));
		}else{
		$this->ajaxReturn(array(
			'flag' 	=> 0,
			'msg' 	=> '申请失败'
				));
		}
	}
}