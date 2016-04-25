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
	public function table($value='')
	{
		$this->display();
	}
	public function time2($value='')
	{
		$this->display();
	}
}