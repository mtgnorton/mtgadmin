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

class IndexController extends Controller
{
public function index($value='')
	{	

		$username 	=session('username');
		if (empty($username)) {
		$this->error('请登录',U('Admin/Login/index'), 3 );
		}
		if (!competence(session('group_id'),1)) {
		$this->error('权限不符合',U('Admin/Login/index'), 3 );
		}
		
		$realname 	 = session('realname');
		$this 	-> assign('realname',$realname);

		$member_data 	= get_users(session('group_id'));
		
		$this->assign('member_data' , $member_data);
		
		$groupModel 	= M('group');
		$group_data 	= $groupModel->select();
		$this->assign('group_data',$group_data);

		$this 	-> display();
	}	
	public function modify_group($value='')
	{	
		$user_id 			= I('post.id');
		$data['group_id']	= I('post.group_id');
		if (empty($user_id) || empty($data['group_id'])) {
		$this->error('此页面无法访问');
		}
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
}