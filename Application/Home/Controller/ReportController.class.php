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
	public function index($value='')
	{
	$model 			= M();
	$task_id		= I('get.task_id');
	$realname 		= I('get.realname');
	$this->assign('realname',$realname);
	$sql 			= "select title  from mtg_pub_task where id=$task_id";
	$data 			= $model->query($sql);
	$this->assign("title",$data[0]['title']);
	$sql  			= "select from_unixtime(push_time,'%m-%d %k:%i') as push_time,content,id from mtg_task_report where task_id=$task_id order by push_time desc";
	$data 			= $model->query($sql);
	$this->assign('report_data',$data);
	
	$this->display();
	}
	public function get_report_content($value='')
	{
	$model 		= M();
	$report_id 	= I('post.report_id');
	$sql 		= "select content from mtg_task_report where id=$report_id";
	$data 		= $model->query($sql);
	$content 	= htmlspecialchars_decode($data[0]['content']);
	$this->ajaxReturn($content);
	}
}
