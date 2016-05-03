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

class IndexController extends Controller
{
public function index($value='')
	{	

		$username 	=session('username');
		if (empty($username)) {
		$this->error('请登录',U('Admin/Login/index'), 3 );
		}
		if (!competence(session('group_id'),3)) {
		$this->error('权限不符合',U('Admin/Login/index'), 3 );
		}	

		$realname 	    = session('realname');
		$this 	-> assign('realname',$realname);
	
		$this 	-> display();
	}	

	/*
	 *此处的作用是：
	 *将当前用户的所有任务传递到fullCalendar
	 *
	 */
	public function json_task_data($value='')
	{
		$pub_taskModel 	= M('pub_task');
		$user_id 		= session('user_id');

		$data = $pub_taskModel->where("user_id=$user_id and complete = 0")->select();
		foreach ($data as $key => $value) {
			$re_data[$key]['id']			= $value['id'];
			$temp 							= $value['end_time']-$value['start_time'];

			if ($temp >3*24*60*60 ) {
			$re_data[$key]['start'] 	= date("Y-m-d",$value['start_time']);
			$re_data[$key]['end'] 		= date("Y-m-d",$value['end_time']);
			$re_data[$key]['color'] 	= '#57D0D6';
			$re_data[$key]['allDay'] 	= 1;
			$re_data[$key]['title']		= date("m-d H:i",$value['start_time']).'至'.date("m-d H:i",$value['end_time']).'  作业内容点击查看';
			}elseif($temp<=3*24*60*60 and $temp>24*60*60){
			$re_data[$key]['start'] 	= date("Y-m-d",$value['start_time']);
			$re_data[$key]['end'] 		= date("Y-m-d",$value['end_time']);
			$re_data[$key]['color']		= '#62D04E'	;
			$re_data[$key]['allDay'] 	= 1;
			$re_data[$key]['title']		= date("m-d H:i",$value['start_time']).'至'.date("m-d H:i",$value['end_time']).'  作业内容点击查看';
			}
			elseif($temp <= 24*60*60 and $temp >= 8*60*60){
			$re_data[$key]['start'] 	= date("Y-m-d\TH:i:s",$value['start_time']);
			$re_data[$key]['end'] 		= date("Y-m-d\TH:i:s",$value['end_time']);
			$re_data[$key]['color'] 	= '#B76722';
			$re_data[$key]['allDay'] 	= 1	;
			$re_data[$key]['title']		= date("m-d H:i",$value['start_time']).'至'.date("m-d H:i",$value['end_time']).'  作业内容点击查看';
			}else{
			$re_data[$key]['start'] 	= date("Y-m-d\TH:i:s",$value['start_time']);
			$re_data[$key]['end'] 		= date("Y-m-d\TH:i:s",$value['end_time']);
			$re_data[$key]['color'] 	= '#E06AB1';
			$re_data[$key]['allDay'] 	= 0	;	
			$re_data[$key]['title']		= '作业内容点击查看';
			}
		
			
		}
	
		$re_data 	= json_encode($re_data);
		echo $re_data;
	}

	/*
	 *此处的作用是：
	 *当用户点击任务时，通过ajax获得任务内容
	 *
	 */
	public function get_task_content($value='')
	{
		$task_id 				= I('post.task_id');
		$pub_taskModel 			= M('pub_task');
		if (empty($task_id)) {
		$this->error('此页面无法访问');
		}
		$data 					= $pub_taskModel->where("id=$task_id")->find();

	

		$re_data['start_time'] 	= date('m-d H:i',$data['start_time']);
		$re_data['end_time'] 	= date('m-d H:i',$data['end_time']);
		$re_data['content']		= htmlspecialchars_decode($data['content']);
		$re_data['title']		= $data['title'];
		$re_data 				= json_encode($re_data);
		$this->ajaxReturn($re_data);
	}


	public function test($value='')
	{
		$time_arr = array('8:00分','9:00分','10:00分','11:00分','12:00分','13:00分','14:00分','15:00分','16:00分','17:00分','18:00分');
		$this->assign("time_arr",$time_arr);
		$this->display();
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