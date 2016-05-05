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

class ReportController extends Controller
{
	protected 	$model 	;
	public function _initialize(){
		$this->model 	= M();
	}
	public function index($value='')
	{
		$username 	=session('username');
		if (empty($username)) {
		$this->error('请登录',U('Admin/Login/index'), 3 );
		}
		if (!competence(session('group_id'),2)) {
		$this->error('权限不符合',U('Admin/Login/index'), 3 );
		}

	$task_id		= I('get.task_id');
	$realname 		= I('get.realname');
	$this->assign('realname',$realname);
	$sql 			= "select title  from mtg_pub_task where id=$task_id";
	$data 			= $this->model->query($sql);
	$this->assign("title",$data[0]['title']);
	$sql  			= "select from_unixtime(push_time,'%m-%d %k:%i') as push_time,content,id ,status from mtg_task_report where task_id=$task_id order by push_time desc";
	$data 			= $this->model->query($sql);
	$this->assign('report_data',$data);

	$this->display();
	}
	public function get_report_content($value='')
	{

	$report_id 	= I('post.report_id');
	if (empty($report_id)) {
	$this->error('此页面无法访问');
	}
	$sql 		= "select content,from_unixtime(push_time,'%m-%d %k:%i') as push_time from mtg_task_report where id=$report_id";
	$data 		= $this->model->query($sql);
	$content 	= htmlspecialchars_decode($data[0]['content']);
	$time 		= $data[0]['push_time'];
	$sql 			= "update mtg_task_report set status=1 where id=$report_id ";
	$this->model 	->execute($sql);
	$this->ajaxReturn(array(
		'time'=>$time,
		'content'=>$content
		));
	}
}
