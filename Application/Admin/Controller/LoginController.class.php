<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/12/21
 * Time: 21:31
 */

namespace Admin\Controller;
use Think\Controller;
// use Common\Tool\T3;
	/*
	 *此处的作用是：
	 *该页面属于老师
	 *
	 */ 

class LoginController extends Controller
{	

	
	public function index($course='',$tran_class='')
	{

	$this->display();
	}
	public function login_judge($value='')
	{	
		$data 			= I('post.data');
		$username 		= trim($data['0']['value']);
		$password		= trim($data['1']['value']);
		$userModel 		= M('member');
		$user_data 		= $userModel->where("username='$username'")->find();
		$judge_password = hash_equals(crypt($password,$user_data['password']),$user_data['password']);
		
		if ($judge_password) {
		session('username',$username);
		session('realname',$user_data['realname']);
		session('group_id', $user_data['group_id']);
		if ($user_data['group_id'] == 1) {
		$this->ajaxReturn(
		array(
				'flag'=>1,
				'group'=>1,
				'url' =>U('Admin/Index/index'),
				'msg'=>'登录成功',
				)

			);
		}else if($user_data['group_id'] == 2 or $user_data['group_id'] == 3){
		$this->ajaxReturn(
		array(
				'flag'=>1,
				'group'=>1,
				'url' =>U('Home/Index/index'),
				'msg'=>'登录成功',
				)

			);
		}
		}
		else{
		$this->ajaxReturn(
			array(
				'flag'=>0,
				'msg'=>'用户名或密码错误'
				)
			);
		}
	}
	public function register_judge($value='')
	{
	$memberModel 	= M('member');
	$data 			= I('post.data');
	$username 		= trim($data['0']['value']);
	$realname		= trim($data['1']['value']);
	$password 		= trim($data['2']['value']);
	$password_two	= trim($data['3']['value']);
	$judge_username = preg_match('/^[a-zA-z][a-zA-Z0-9_]{5,12}$/', $username);
	if (!$judge_username) {
	$this->ajaxReturn(array(
	'flag' 	=> 0,
	'msg'   => '用户名不符合规范',
		));
	}
	if (empty($realname)) {
	$this->ajaxReturn(array(
	'flag' 	=> 0,
	'msg'   => '真实姓名不能为空',
		));
	}
	$judge_password    	= preg_match('/^[a-zA-Z0-9_]{6,12}$/', $password);
	if (!$judge_password) {
	$this->ajaxReturn(array(
	'flag' 	=> 0,
	'msg'   => '密码不符合规范',
		));
	}
	$is_exist  = $memberModel->where("username = '$username'")->getField('id');
	if ($is_exist) {
	$this->ajaxReturn(array(
	'flag' 	=> 0,
	'msg'   => '用户已存在',
		));
	}
	if ($password != $password_two) {
	$this->ajaxReturn(array(
	'flag' 	=> 0,
	'msg'   => '密码不一致',
		));
	}
	$password 				 = crypt($password);
	$insert_data['username'] = $username;
	$insert_data['password'] = $password;
	$insert_data['realname'] = $realname;
	$insert_data['group_id'] = 4;
	$insert_data['create_time'] = time();
	$insert_data['last_login_time'] =time();
	$is_suc 	= $memberModel->add($insert_data);

	if ($is_suc) {
	
	$this->ajaxReturn(array(
	'flag' 	=> 1,
	'msg'   => '注册成功，将为您登陆到首页',
		));

	}
	else{
	$this->ajaxReturn(array(
	'flag' 	=> 0,
	'msg'   => '注册失败',
		));	
	}
	}
	public function logout($value='')
	{
		session(null);
		$this->ajaxReturn(array(
		'flag' => 1,
		'msg'  => '退出成功',
		'url'  =>U('Admin/Login/index'),
			));
	}
	
}