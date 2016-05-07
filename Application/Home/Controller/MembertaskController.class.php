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

	public $model ;

public function _initialize()
{
	$this->model 	= 	M('member');
}

public function index($value='')
	{

		$username 	=session('username');
		if (empty($username)) {
		$this->error('请登录',U('Admin/Login/index'), 3 );
		}
		if (session('expiretime')<time()) {
		session(null);
		$this->error('登陆超时',U('Admin/Login/index'), 3 );
		}else{
		session('expiretime',time() + 3600); // 刷新时间戳
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


		/*
		 *此处的作用是：
		 *mtg_pub_task表和mtg_task_report表联合查询，得到某个用户的所有未完成任务，且得到当前任务下是否有新的报告。
		 *
		 */


		$sql  	 = "select FROM_UNIXTIME(start_time,'%m-%d %k:%i') as start_time,FROM_UNIXTIME(end_time,'%m-%d %k:%i') as end_time,title as title ,a.id as id,apply as apply,status as status from mtg_pub_task a left join mtg_task_report b on a.id=b.task_id  and b.status=0 where a.pub_id=$pub_id and a.user_id=$user_id and a.complete=0  order by apply desc,start_time desc";
		$data = $this->model->query($sql);

		$this->assign("task_data",$data);
		$this->display();
	}

			public function get_task_content($value='')
	{

		$task_id 				= I('post.task_id');
		if (empty($task_id)) {
		$this->error('此页面无法访问');
		}

		$sql 		= "select content,title from mtg_pub_task where id=$task_id ";

		$data 	= $this->model->query($sql);

		$title 		= $data[0]['title'];
		$content 	= $data[0]['content'];


		$content	= htmlspecialchars_decode($content);

		$this->ajaxReturn(array(
			'content'=>$content,
			'title'  =>$title
			));
	}
	public function check_task()
	{
		$task_id 	= I('post.task_id');
		$sql 			= "update mtg_pub_task set complete=1 where id=$task_id ";
		$is_suc 	= $this->model->execute($sql);
		if ($is_suc) {
			$this->ajaxReturn(array(
				'flag'=>1,
				'msg'=>'已完成审核'
				));
		}else{
				$this->ajaxReturn(array(
				'flag'=>0,
				'msg'=>'未完成审核'
				));
		}
	}
}