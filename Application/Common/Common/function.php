<?php
 	function is_login()
{

	
}
function competence($user_competence,$flag){#1代表后台，2代表上司，3代表小兵
	if ($flag == 1) {
	if ($user_competence == 1) 
		return 1;
	
	}else if($flag == 2){
		if ($user_competence == 2 || $user_competence == 3) 
			return 1;

	}else if($flag == 3){
		if ($user_competence == 4) 
			return 1;
		
	}
	return 0;
}
function get_users($group_id)
{		
		$memberModel 	= M('member');
		$sql = "select a.realname,a.id, FROM_UNIXTIME(a.last_login_time,'%m-%d %k:%i') as last_login_time ,b.group_name from mtg_member a left join mtg_group b on a.group_id = b.id where a.group_id >". $group_id ." order by a. group_id asc";
		$member_data = $memberModel->query($sql);	
		return $member_data;
}
  