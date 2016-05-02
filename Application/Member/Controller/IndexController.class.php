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

		is_login();
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

		$data 					= $pub_taskModel->where("id=$task_id")->find();

	

		$re_data['start_time'] 	= date('m-d H:i',$data['start_time']);
		$re_data['end_time'] 	= date('m-d H:i',$data['end_time']);
		$re_data['content']		= htmlspecialchars_decode($data['content']);
		$re_data['title']		= $data['title'];
		$re_data 				= json_encode($re_data);
		$this->ajaxReturn($re_data);
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