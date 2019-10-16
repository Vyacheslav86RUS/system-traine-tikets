<?php
//Указываем заголовок для страницы
header('Content-Type: text/html; charset=utf-8');
//Подключаем файл конфигурации для подключения к БД
require_once($_SERVER['DOCUMENT_ROOT'].'/include/confing.php');
//Подключаем класс работы с БД
require_once($_SERVER['DOCUMENT_ROOT'].'/include/class.sql.php');
//Включаем сессию
session_start();
//создаем экземпляр класса работы с БД
$sql = new db_sql();
//Ловим get запрос по id
switch ($_GET['id']) {
	//регистрация
	case 'reg':
		//Проверка post данных
		if(isset($_POST)){
			//Результат выполнения
			$result = registration($_POST);
			//если результат положительный
			if(isset($result['ok'])){
				//записываем в сессию id пользователя
				$_SESSION['uid'] = intval($result['ok']);
			}
		} else {
			//Отправляем ошибку
			$result = array('error'=>'not found POST');
		}
		break;
	//вход в систему
	case 'login':
		//Проверка post данных
		if(isset($_POST)){
			//Результат выполнения
			$result = login($_POST);
			//Записываем права в сессию
			$_SESSION['admin'] = $result['admin'];
			//Записываем id пользователя
			$_SESSION['uid'] = $result['id'];
			//записываем данные пользователя
			$_SESSION['user']= $result['user'];
			load_sessia();
		} else {
			//Отправляем ошибку
			$result = array('error'=>'not found POST');
		}
		break;
	case 'add_train':
		//проверка прав в системе
		if($_SESSION['admin'] == 1){
			//если есть права администратора отправляем результат
			$result = add_train($_POST);
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	case 'add_carriage':
		//проверка прав в системе
		if($_SESSION['admin'] == 1){
			if(isset($_SESSION['train'][$_POST['tid']])){
				//если есть права администратора отправляем результат
				$result = add_carriage($_POST);
			} else {
				$result = array('error'=>'not found train');
			}
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	case 'get_sess':
		$result = $_SESSION;
		break;
	case 'get_train':
		if(isset($_SESSION['uid'])){
			//список визитов к врачам
			$result = get_trains();
		} else {
			//отправляем ошибку не найденого пользователя
			$result = array('error'=>'not found uid');
		}
		break;
	case 'add_schedule':
		if($_SESSION['admin'] == 1){
			//если есть права администратора отправляем результат
			$result = add_schedule($_POST);
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	case 'add_place':
		if($_SESSION['admin'] == 1){
			//если есть права администратора отправляем результат
			$result = add_place($_POST);
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	case 'place_buy':
		if(isset($_SESSION['uid'])){
			//список визитов к врачам
			$result = place_buy($_POST);
		} else {
			//отправляем ошибку не найденого пользователя
			$result = array('error'=>'not found uid');
		}
		break;
	case 'del_train':
		if($_SESSION['admin'] == 1){
			//если есть права администратора отправляем результат
			$result = del_train($_POST);
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	case 'edit_train':
		if($_SESSION['admin'] == 1){
			//если есть права администратора отправляем результат
			$result = edit_train($_POST);
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	case 'del_schedule':
		if($_SESSION['admin'] == 1){
			//если есть права администратора отправляем результат
			$result = del_schedule($_POST);
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	case 'edit_schedule':
		if($_SESSION['admin'] == 1){
			//если есть права администратора отправляем результат
			$result = edit_schedule($_POST);
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	case 'del_carriage':
		if($_SESSION['admin'] == 1){
			//если есть права администратора отправляем результат
			$result = del_carriage($_POST);
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	case 'edit_carriage':
		if($_SESSION['admin'] == 1){
			//если есть права администратора отправляем результат
			$result = edit_carriage($_POST);
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	case 'del_place':
		if($_SESSION['admin'] == 1){
			//если есть права администратора отправляем результат
			$result = del_place($_POST);
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	case 'edit_place':
		if($_SESSION['admin'] == 1){
			//если есть права администратора отправляем результат
			$result = edit_place($_POST);
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	case 'get_reservations':
		if(isset($_SESSION['uid'])){
			//список визитов к врачам
			$result = get_reservations($_SESSION['uid']);
		} else {
			//отправляем ошибку не найденого пользователя
			$result = array('error'=>'not found uid');
		}
		break;
	case 'statistics':
		//проверка прав в системе
		if($_SESSION['admin'] == 1){
			//результат статистики
			$result = get_statistics();
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	case 'statistics_search':
		//проверка прав в системе
		if($_SESSION['admin'] == 1){
			//результат статистики
			$result = statistics_search($_POST);
		} else {
			//иначе отправляем ошибку об отсутсвие прав администратора
			$result = array('error'=>'not found rights');
		}
		break;
	default:
		//если не нашли запрос отправляем ошибку
		$result = array('error'=>'Не верный запрос');
		break;
}

//Вход в систему
function login($data){
	//глобальный объект работы с БД
	global $sql;
	//результат
	$ans = array();
	//запрос на существования логина и пароля
	$sql->db_sql_select('id,admin','users','WHERE login=\''.$sql->escape_string($data['login']).'\' && password=\''.$sql->escape_string(md5($data['pass'])).'\'');
	//если запись существует
	if($sql->d_select_count > 0){
		//считываем данные с запрос
		$row = mysql_fetch_array($sql->d_select,MYSQL_ASSOC);
		//записываем данные в результат
		$ans = array('id'=>intval($row['id']), 'admin'=>intval($row['admin']),'user'=>$data['login']);
	} else {
		//иначе отправляем ошибку об отсутсвие пользователя с таким логином и паролем
		$ans = array('error'=>'not found user');
	}
	//возврат результата
	return $ans;
}
//Регистрация в системе
function registration($data){
	//глобальный объект работы с БД
	global $sql;
	//результат работы
	$ans = array();
	//переменная для логина
	$login = '';
	//переменная для пароля
	$password = '';
	//переменная для email
	$email = '';
	//переменная для ФИО
	$fio = '';
	//флаг совпадения паролей
	$flag_pass = false;
	//флаг проверки существования пользователя
	$match = true;
	//проверка существования логина и он не пустой
	if(isset($data['Login']) && $data['Login'] != ''){
		$login = $data['Login'];
		//проверяем валидность логина с помощью регулярного выражения
		if (!preg_match('/^[a-zA-Z]+$/', $login)){
			//не корректный логин
		   return array('error'=>'not valid login');
		}
	} else {
		//не все поля заполнены
		return array('error'=>'not all fields');
	}
	//проверка существования email и не он не пустой
	if(isset($data['inputEmail']) && $data['inputEmail'] != ''){
		$email = $data['inputEmail'];
		//проверяем валидность email адреса с помощью регулярного выражения
		if (!preg_match("/[-0-9a-z_]+@[-0-9a-z_]+\.[a-z]{2,6}/i", $email)){
			//не корректный email
			return array('error'=>'not valid email');
		}
	} else {
		//не все поля заполнены
		return array('error'=>'not all fields');
	}
	//проверка существования паролей и они не пустые
	if(isset($data['inputPassword']) && isset($data['confirmPassword']) && $data['inputPassword'] != '' && $data['confirmPassword'] != ''){
		//проверка на схожесть паролей
		if($data['inputPassword'] == $data['confirmPassword']){
			//проверка валидности пароля
			if (!preg_match('/^[0-9a-zA-Z]+$/', $data['inputPassword'])){
				//не валидный пароль
			   return array('error'=>'not valid pass');
			} else {
				//шифруем пароль для хранения в БД
				$password = md5($data['inputPassword']);
				//устанавливаем флаг корекктности пароля
				$flag_pass = true;
			}
		} else {
			//пароли не совпадают
			$ans = array('error'=>'passwords do not match');
			$match = false;
		}
	} else {
		//не все поля заполнены
		return array('error'=>'not all fields');
	}
	//проверка существования ФИО
	if(isset($data['inputfio'])){
		$fio = $data['inputfio'];
		//проверка валидности ФИО с помощью регулярного выражения
		if (!preg_match('/[а-яА-Я]+/', $fio)){
			//ФИО не валидно
		   return array('error'=>'not valid fio');
		}
	}
	//если все данные верны
	if($match){
		//запрос на существования пользователя
		$sql->db_sql_select('id','users','WHERE login=\''.$sql->escape_string($login).'\' && password=\''.$sql->escape_string($password).'\'');
		//если есть данные
		if($sql->d_select_count > 0){
			//устанавливаем флаг о существовании пользователя
			$flag_pass = false;
			//такой пользователь уже существует
			$ans = array('error'=>'this user register');
		}
	}
	//проверка правильности паролей
	if($flag_pass){
		//записываем нового пользователя
		if($sql->db_sql_insert('users(login,fio,password,email,d_create)','\''.$sql->escape_string($login).'\',\''.$sql->escape_string($fio).'\',\''.$sql->escape_string($password).'\',\''.$sql->escape_string($email).'\','.time())){
			//если все прошло успешно
			$ans = array('ok'=>$sql->last_insert());
		} else {
			//иначе ошибка записи данных
			$ans = array('error'=>'insert error');
		}
	}
	return $ans;
}

function load_sessia(){
	global $sql;
	$sql->db_sql_select('id,ccount','train');
	if($sql->d_select_count > 0){
		$t = $sql->d_select;
		while($rows = mysql_fetch_array($t)){
			$_SESSION['train'][intval($rows['id'])] = intval($rows['ccount']);
		}
	}
}

function add_train($data){
	global $sql;
	$ans = array();
	$name = '';
	$number = 0;
	$count = 0;
	$pointFirst = '';
	$pointSecond = '';
	$tpointFirst = 0;
	$tpointSecond = 0;
	$d = '';
	$t = '';
	$day = 0;
	$year = 0;
	$month = 0;
	$hours = 0;
	$second = 0;
	$minute = 0;
	if(isset($data['tname'])){
		$name = '\''.$sql->escape_string($data['tname']).'\'';
	}
	if(isset($data['number'])){
		$number = intval($data['number']);
	}
	if(isset($data['ccount'])){
		$count = intval($data['ccount']);
	}
	if(isset($data['pointFirst'])){
		$pointFirst = '\''.$sql->escape_string($data['pointFirst']).'\'';
	}
	if(isset($data['pointSecond'])){
		$pointSecond = '\''.$sql->escape_string($data['pointSecond']).'\'';
	}
	if(isset($data['tpointFirst'])){
		list($d,$t) = explode(' ', $data['tpointFirst']);
		list($day,$month,$year) = explode('.', $d);
		list($hours,$minute,$second) = explode(':', $t);
		$tpointFirst = mktime($hours,$minute,$second,$month,$day,$year);
	}
	if(isset($data['tpointSecond'])){
		list($d,$t) = explode(' ', $data['tpointSecond']);
		list($day,$month,$year) = explode('.', $d);
		list($hours,$minute,$second) = explode(':', $t);
		$tpointSecond = mktime($hours,$minute,$second,$month,$day,$year);
	}
	if($sql->db_sql_insert('train(name,tnum,ccount,pointFirst,pointSecond,tpointFirst,tpointSecond)',$name.','.$number.','.$count.','.$pointFirst.','.$pointSecond.','.$tpointFirst.','.$tpointSecond)){
		$ans = array('ok'=>$sql->last_insert(),'count'=>$count);
		$_SESSION['train'][intval($sql->last_insert())] = $count;
	} else {
		$ans = array('error'=>'insert','msql'=>$sql->error,'str'=>$name.','.$number.','.$count.','.$pointFirst.','.$pointSecond.','.$tpointFirst.','.$tpointSecond);
	}
	return $ans;
}

function add_carriage($data){
	global $sql;
	$ans = array();
	$tid = 0;
	if(isset($data['tid'])){
		$tid = intval($data['tid']);
	}
	if($tid > 0 ){
		if(intval($_SESSION['train'][$tid]) == count($data['carriage'])){
			$str_insert = '';
			foreach ($data['carriage'] as $key => $value) {
				if($key == 0){
					$str_insert .= $value.','.$tid;
				} else {
					$str_insert .= '),('.$value.','.$tid;
				}
			}
			if($str_insert != ''){
				if($sql->db_sql_insert('carriage(cnum,tid)',$str_insert)){
					$ans = array('ok'=>'insert');
				} else {
					$ans = array('error'=>'insert');
				}
			} else $ans = array('error'=>'carriage incorrect');
		} else {
			$ans = array('error'=>'count incorrect');
		}
	} else {
		$ans = array('error'=>'not found train');
	}
	return $ans;
}

function get_trains(){
	global $sql;
	$ans = array();
	$sql->db_sql_select('id,name,tnum,ccount,pointFirst,pointSecond,tpointFirst,tpointSecond','train');
	if($sql->d_select_count > 0){
		$t = $sql->d_select;
		while($row = mysql_fetch_array($t)){
			$ans[] = array('id'=>intval($row['id']),
						   'name'=>$row['name'],
						   'tnum'=>intval($row['tnum']),
						   'ccount'=>intval($row['ccount']),
						   'pointFirst'=>$row['pointFirst'],
						   'pointSecond'=>$row['pointSecond'],
						   'tpointFirst'=>date('d.m.Y H:i:s',$row['tpointFirst']),
						   'tpointSecond'=>date('d.m.Y H:i:s',$row['tpointSecond']),
						   'carriage'=>array(),
						   'schedule'=>array());
		}
	}
	if(count($ans)>0){
		foreach ($ans as $key => $value) {
			$carriage = array();
			$place = array();
			$schedule = array();
			$sql->db_sql_select('id,cnum','carriage','WHERE tid = '.$value['id']);
			if($sql->d_select_count > 0){
				$c = $sql->d_select;
				while($rows = mysql_fetch_array($c)){
					$carriage[] = array('id'=>intval($rows['id']),'cnum'=>intval($rows['cnum']),'place'=>array());
				}
				$ans[$key]['carriage'] = $carriage;
			}
			if(count($carriage)>0){
				foreach ($carriage as $k => $v) {
					$sql->db_sql_select('id,pnum,cost','place','WHERE tid = '.$value['id'].' && cid = '.$v['id']);
					if($sql->d_select_count > 0){
						$p = $sql->d_select;
						while ($rows = mysql_fetch_array($p)) {
							$ans[$key]['carriage'][$k]['place'][] = array('id'=>intval($rows['id']),
											 'pnum'=>intval($rows['pnum']),
											 'cost'=>floatval($rows['cost']),
											 'buy'=>check_buy($value['id'],$v['id'],$rows['id']));
						}
						//$ans[$key]['place'] = $place;
					}
				}
			}
			$sql->db_sql_select('id,pointStation,tpointStart,tpointStop,tpointStay','schedule','WHERE tid = '.$value['id']);
			if($sql->d_select_count > 0){
				$s = $sql->d_select;
				while($rows = mysql_fetch_array($s)){
					$schedule[] = array('id'=>intval($rows['id']),
										'pointStation'=>$rows['pointStation'],
										'tpointStop'=>date('d.m.Y H:i:s',$rows['tpointStop']),
										'tpointStart'=>date('d.m.Y H:i:s',$rows['tpointStart']),
										'tpointStay'=>intval($rows['tpointStay']));
				}
				$ans[$key]['schedule'] = $schedule;
			}
		}
	}
	return $ans;
}


function check_buy($tid,$cid,$pid){
	global $sql;
	$ans = 0;
	$tid = intval($tid);
	$cid = intval($cid);
	$pid = intval($pid);
	$sql->db_sql_select('id','reservations','WHERE tid = '.$tid.' && cid = '.$cid.' && pid = '.$pid);
	if($sql->d_select_count > 0){
		$ans = 1;
	}
	return $ans;
}

function add_schedule($data){
	global $sql;
	$ans = array();
	$tpointStop = 0;
	$tpointStart = 0;
	if(isset($data['pointStation'],$data['tpointStay'],$data['tpointStart'],$data['tpointStop'],$data['tid'])){
		$sql->db_sql_select('id','schedule','WHERE tid = '.intval($data['tid']).' && pointStation = \''.$sql->escape_string($data['pointStation']).'\'');
		if($sql->d_select_count > 0){
			$ans = array('error'=>'schedule find');
		} else {
			list($part1,$part2) = explode(' ', $data['tpointStop']);
			list($day, $month, $year) = explode('.', $part1);
			list($hours, $minutes,$seconds) = explode(':', $part2);
			$tpointStop =  mktime($hours, $minutes, $seconds, $month, $day, $year);

			list($part1,$part2) = explode(' ', $data['tpointStart']);
			list($day, $month, $year) = explode('.', $part1);
			list($hours, $minutes,$seconds) = explode(':', $part2);
			$tpointStart =  mktime($hours, $minutes, $seconds, $month, $day, $year);
			if($sql->db_sql_insert('schedule(tid,pointStation,tpointStop,tpointStart,tpointStay)',intval($data['tid']).',\''.$sql->escape_string($data['pointStation']).'\','.$tpointStop.','.$tpointStart.','.intval($data['tpointStay']))){
				$ans = array('ok'=>$sql->last_insert());
			} else {
				$ans = array('error'=>'insert','sql'=>$sql->error);
			}
		}
	} else $ans = array('error'=>'incorrect data');
	return $ans;
}

function add_place($data){
	global $sql;
	$ans = array();
	if(isset($data['pnum'],$data['cost'],$data['cid'],$data['tid'])){
		$sql->db_sql_select('id','place','WHERE tid = '.intval($data['tid']).' && pnum = '.intval($data['pnum']).' && cid='.intval($data['cid']));
		if($sql->d_select_count > 0){
			$ans = array('error'=>'place find');
		} else {
			if($sql->db_sql_insert('place(pnum,cid,tid,cost)',intval($data['pnum']).','.intval($data['cid']).','.intval($data['tid']).','.floatval($data['cost']))){
				$ans = array('ok'=>$sql->last_insert());
			} else {
				$ans = array('error'=>'insert');
			}
		}
	} else $ans = array('error'=>'incorrect data');
	return $ans;
}

function place_buy($data){
	global $sql;
	$ans = array();
	if(isset($data['tid'],$data['cid'],$data['pid'])){
		if($sql->db_sql_insert('reservations(tid,uid,cid,pid)',intval($data['tid']).','.intval($_SESSION['uid']).','.intval($data['cid']).','.intval($data['pid']))){
			$ans = array('ok'=>$sql->last_insert());
		} else {
			$ans = array('error'=>'insert','sql'=>$sql->error);
		}
	} else {
		$ans = array('error'=>'incorrect data');
	}
	return $ans;
}

function del_train($data){
	global $sql;
	$ans = array();
	if(isset($data['tid'])){
		if($sql->db_sql_delete('schedule','WHERE tid = '.intval($data['tid']))){
			if($sql->db_sql_delete('carriage','WHERE tid = '.intval($data['tid']))){
				if($sql->db_sql_delete('place','WHERE tid = '.intval($data['tid']))){
					if($sql->db_sql_delete('train','WHERE id = '.intval($data['tid']))){
						$ans = array('ok'=>'train deleted');
					} else {
						$ans = array('error'=>'train deleted');
					}
				} else {
					$ans = array('error'=>'place deleted');
				}
			} else {
				$ans = array('error'=>'carriage deleted');
			}
		} else {
			$ans = array('error'=>'schedule deleted');
		}
	} else {
		$ans = array('error'=>'incorrect data');
	}
	return $ans;
}

function edit_train($data){
	global $sql;
	$ans = array();
	$update = array();
	if(isset($data['name'])){
		$update[] = 'name = \''.$sql->escape_string($data['name']).'\'';
	}
	if(isset($data['tnum'])){
		$update[] = 'tnum = '.intval($data['tnum']);
	}
	if(isset($data['pointFirst'])){
		$update[] = 'pointFirst = \''.$sql->escape_string($data['pointFirst']).'\'';
	}
	if(isset($data['pointSecond'])){
		$update[] = 'pointSecond = \''.$sql->escape_string($data['pointSecond']).'\'';
	}
	if(isset($data['tpointFirst'])){
		$update[] = 'tpointFirst = '.intval($data['tpointFirst']);
	}
	if(isset($data['tpointSecond'])){
		$update[] = 'tpointSecond = '.intval($data['tpointSecond']);
	}
	if(isset($data['ccount'])){
		$update[] = 'ccount = '.intval($data['ccount']);
	}
	if($sql->db_sql_update('train',implode(',', $update),'WHERE id = '.intval($data['id']))){
		$ans = array('ok'=>'update');
	} else {
		$ans = array('error'=>'update');
	}
	return $ans;
}

function del_schedule($data){
	global $sql;
	$ans = array();
	if(isset($data['sid'])){
		if($sql->db_sql_delete('schedule','WHERE id = '.intval($data['sid']))){
			$ans = array('ok'=>'schedule deleted');
		} else {
			$ans = array('error'=>'schedule deleted');
		}
	} else {
		$ans = array('error'=>'incorrect data');
	}
	return $ans;
}

function edit_schedule($data){
	global $sql;
	$ans = array();
	$update = array();
	if(isset($data['pointStation'])){
		$update[] = 'pointStation = \''.$sql->escape_string($data['pointStation']).'\'';
	}
	if(isset($data['tpointStart'])){
		list($part1,$part2) = explode(' ', $data['tpointStart']);
		list($day, $month, $year) = explode('.', $part1);
		list($hours, $minutes,$seconds) = explode(':', $part2);
		$update[] = 'tpointStart = '.mktime($hours, $minutes, $seconds, $month, $day, $year);
	}
	if(isset($data['tpointStop'])){
		list($part1,$part2) = explode(' ', $data['tpointStop']);
		list($day, $month, $year) = explode('.', $part1);
		list($hours, $minutes,$seconds) = explode(':', $part2);
		$update[] = 'tpointStop = '.mktime($hours, $minutes, $seconds, $month, $day, $year);
	}
	if(isset($data['tpointStay'])){
		$update[] = 'tpointStay = '.intval($data['tpointStay']);
	}
	if($sql->db_sql_update('schedule',implode(',', $update),'WHERE id = '.intval($data['id']))){
		$ans = array('ok'=>'update');
	} else {
		$ans = array('error'=>'update');
	}
	return $ans;
}

function del_carriage($data){
	global $sql;
	$ans = array();
	if(isset($data['cid'])){
		if($sql->db_sql_delete('place','WHERE cid = '.intval($data['id']))){
			if($sql->db_sql_delete('carriage','WHERE id = '.intval($data['cid']))){
				$ans = array('ok'=>'carriage deleted');
			} else {
				$ans = array('error'=>'carriage deleted');
			}
		} else {
			$ans = array('error'=>'place deleted');
		}
	} else {
		$ans = array('error'=>'incorrect data');
	}
	return $ans;
}

function edit_carriage($data){
	global $sql;
	$ans = array();
	$update = array();
	if(isset($data['cnum'])){
		$update[] = 'cnum = '.intval($data['cnum']);
	}
	if($sql->db_sql_update('carriage',implode(',', $update),'WHERE id = '.intval($data['id']))){
		$ans = array('ok'=>'update');
	} else {
		$ans = array('error'=>'update');
	}
	return $ans;
}

function del_place($data){
	global $sql;
	$ans = array();
	if(isset($data['pid'])){
		if($sql->db_sql_delete('place','WHERE id = '.intval($data['pid']))){
			$ans = array('ok'=>'place deleted');
		} else {
			$ans = array('error'=>'place deleted');
		}
	} else {
		$ans = array('error'=>'incorrect data');
	}
	return $ans;
}

function edit_place($data){
	global $sql;
	$ans = array();
	$update = array();
	if(isset($data['pnum'])){
		$update[] = 'pnum = '.intval($data['pnum']);
	}
	if(isset($data['cost'])){
		$update[] = 'cost = '.floatval($data['cost']);
	}
	if($sql->db_sql_update('place',implode(',', $update),'WHERE id = '.intval($data['id']))){
		$ans = array('ok'=>'update');
	} else {
		$ans = array('error'=>'update');
	}
	return $ans;
}


function get_reservations($uid){
	global $sql;
	$ans = array();
	$uid = intval($uid);
	$sql->db_sql_select('t.name,
						 t.tnum,
						 t.pointFirst,
						 t.pointSecond,
						 t.tpointFirst,
						 t.tpointSecond,
						 c.cnum,
						 p.pnum,
						 p.cost','reservations as r','
						 LEFT JOIN carriage as c ON r.cid = c.id 
						 LEFT JOIN train as t ON r.tid = t.id
						 LEFT JOIN place as p ON r.pid = p.id
						 WHERE r.uid = '.$uid);
	if($sql->d_select_count > 0){
		$r = $sql->d_select;
		while($rows = mysql_fetch_array($r)){
			$ans[] = array('name'=>$rows['name'],
						   'tnum'=>intval($rows['tnum']),
						   'pointFirst'=>$rows['pointFirst'],
						   'pointSecond'=>$rows['pointSecond'],
						   'tpointFirst'=>date('d.m.Y H:i:s',$row['tpointFirst']),
						   'tpointSecond'=>date('d.m.Y H:i:s',$row['tpointSecond']),
						   'cnum'=>(isset($rows['cnum']) && $rows['cnum'] != NULL)?intval($rows['cnum']):0,
						   'pnum'=>(isset($rows['pnum']) && $rows['pnum'] != NULL)?intval($rows['pnum']):0,
						   'cost'=>(isset($rows['cost']) && $rows['cost'] != NULL)?floatval($rows['cost']):0);
		}
	}
	return $ans;
}

//статистика
function get_statistics(){
	global $sql;
	$ans = array();
	/*$sql->db_sql_select('t.id as tid,
						 t.name,
						 t.tnum,
						 t.pointFirst,
						 t.pointSecond,
						 t.tpointFirst,
						 t.tpointSecond,
						 c.cnum,
						 c.id as cid,
						 p.id as pid,
						 p.pnum,
						 p.cost,
						 u.id as uid,
						 u.fio','reservations as r','
						 LEFT JOIN carriage as c ON r.cid = c.id 
						 LEFT JOIN train as t ON r.tid = t.id
						 LEFT JOIN place as p ON r.pid = p.id
						 LEFT JOIN users as u ON r.uid = u.id');*/
	$sql->db_sql_select('id as tid, name,tnum','train');
	if($sql->d_select_count > 0){
		$t = $sql->d_select;
		while($rows = mysql_fetch_array($t)){
			$ans[intval($rows['tid'])] = array('train'=>array('name'=>$rows['name'],'tnum'=>intval($rows['tnum'])),'data'=>array(),'carriage'=>array(),'place'=>array(),'schedule'=>array());
		}
		if(count($ans)>0){
			foreach ($ans as $key => $value) {
				$sql->db_sql_select('t.id as tid,
						 			 t.name,
						 			 t.tnum,
						 			 t.pointFirst,
						 			 t.pointSecond,
						 			 t.tpointFirst,
						 			 t.tpointSecond,
						 			 c.cnum,
						 			 c.id as cid,
						 			 p.id as pid,
						 			 p.pnum,
						 			 p.cost,
						 			 u.id as uid,
						 			 u.fio','place as p','
						 			 LEFT JOIN carriage as c ON p.cid = c.id 
						 			 LEFT JOIN train as t ON p.tid = t.id
						 			 LEFT JOIN reservations AS r  ON p.id = r.pid
						 			 LEFT JOIN users as u ON r.uid = u.id 
						 			 WHERE p.tid='.$key);
				if($sql->d_select_count > 0){
					$r = $sql->d_select;
					while ($rows = mysql_fetch_array($r)) {
						$ans[intval($rows['tid'])]['data'][] = array('pointFirst'=>$rows['pointFirst'],
						   								 'pointSecond'=>$rows['pointSecond'],
						   								 'tpointFirst'=>date('d.m.Y H:i:s',$rows['tpointFirst']),
						   								 'tpointSecond'=>date('d.m.Y H:i:s',$rows['tpointSecond']),
						   								 'cnum'=>(isset($rows['cnum']) && $rows['cnum'] != NULL)?intval($rows['cnum']):0,
						   								 'pnum'=>(isset($rows['pnum']) && $rows['pnum'] != NULL)?intval($rows['pnum']):0,
						   								 'cost'=>(isset($rows['cost']) && $rows['cost'] != NULL)?floatval($rows['cost']):0,
						   								 'buy'=>check_buy($rows['tid'],$rows['cid'],$rows['pid']),
						   								 'fio'=>$rows['fio']);
					}
				}
				$sql->db_sql_select('id,cnum','carriage','WHERE tid = '.$key);
				if($sql->d_select_count > 0){
					$c = $sql->d_select;
					while($row = mysql_fetch_array($c)){
						$ans[$key]['carriage'][] = array('id'=>intval($row['id']),'cnum'=>intval($row['cnum']));
					}
				}
				$sql->db_sql_select('id,pnum','place','WHERE tid = '.$key);
				if($sql->d_select_count > 0){
					$p = $sql->d_select;
					while($row = mysql_fetch_array($p)){
						$ans[$key]['place'][] = array('id'=>intval($row['id']),'pnum'=>intval($row['pnum']));
					}
				}
				$sql->db_sql_select('id,pointStation','schedule','WHERE tid = '.$key);
				if($sql->d_select_count > 0){
					$p = $sql->d_select;
					while($row = mysql_fetch_array($p)){
						$ans[$key]['schedule'][] = array('id'=>intval($row['id']),'pointStation'=>$row['pointStation']);
					}
				}

			}
		}
	}
	return $ans;
}


function statistics_search($data){
	global $sql;
	$ans = array();
	$type = '';
	$search = '';
	$tpointStop = 0;
	$tpointStart = 0;
	if(isset($data['srch'])){
		$type = $data['srch'];
	}
	if(isset($data['search'])){
		$search = $data['search'];
	}
	switch ($type) {
		case 'period':
			list($part1,$part2) = explode(' ', $search['tpointA']);
			list($day, $month, $year) = explode('.', $part1);
			list($hours, $minutes,$seconds) = explode(':', $part2);
			$tpointStop =  mktime($hours, $minutes, $seconds, $month, $day, $year);

			list($part1,$part2) = explode(' ', $search['tpointB']);
			list($day, $month, $year) = explode('.', $part1);
			list($hours, $minutes,$seconds) = explode(':', $part2);
			$tpointStart =  mktime($hours, $minutes, $seconds, $month, $day, $year);
			$train = array();
			/*$sql->db_sql_select('t.id as tid,
						 t.name,
						 t.tnum,
						 t.pointFirst,
						 t.pointSecond,
						 t.tpointFirst,
						 t.tpointSecond,
						 c.cnum,
						 c.id as cid,
						 p.id as pid,
						 p.pnum,
						 p.cost,
						 u.id as uid,
						 u.fio','reservations as r','
						 LEFT JOIN carriage as c ON r.cid = c.id 
						 LEFT JOIN train as t ON r.tid = t.id && t.tpointFirst >= '.$tpointStart.' && t.tpointSecond <= '.$tpointStop.'
						 LEFT JOIN place as p ON r.pid = p.id
						 LEFT JOIN users as u ON r.uid = u.id');*/
			$sql->db_sql_select('id as tid,name,tnum','train','WHERE tpointFirst >= '.$tpointStart.' && tpointSecond <= '.$tpointStop);
			if($sql->d_select_count > 0){
				$t = $sql->d_select;
				while($rows = mysql_fetch_array($t)){
					$train[] = intval($rows['tid']);
				}
				if(count($train)>0){
					foreach ($train as $key => $value) {
						$sql->db_sql_select('t.id as tid,
								 			 t.name,
								 			 t.tnum,
								 			 t.pointFirst,
								 			 t.pointSecond,
								 			 t.tpointFirst,
								 			 t.tpointSecond,
								 			 c.cnum,
								 			 c.id as cid,
								 			 p.id as pid,
								 			 p.pnum,
								 			 p.cost,
								 			 u.id as uid,
								 			 u.fio','place as p','
								 			 LEFT JOIN carriage as c ON p.cid = c.id 
								 			 LEFT JOIN train as t ON p.tid = t.id
								 			 LEFT JOIN reservations AS r  ON p.id = r.pid
								 			 LEFT JOIN users as u ON r.uid = u.id 
								 			 WHERE p.tid='.$value);
						if($sql->d_select_count > 0){
							$r = $sql->d_select;
							while ($rows = mysql_fetch_array($r)) {
								$ans['data'][] = array('name'=>$rows['name'],
											   'tnum'=>intval($rows['tnum']),
											   'pointFirst'=>$rows['pointFirst'],
								   			   'pointSecond'=>$rows['pointSecond'],
								   			   'tpointFirst'=>date('d.m.Y H:i:s',$rows['tpointFirst']),
								   			   'tpointSecond'=>date('d.m.Y H:i:s',$rows['tpointSecond']),
								   			   'cnum'=>(isset($rows['cnum']) && $rows['cnum'] != NULL)?intval($rows['cnum']):0,
								   			   'pnum'=>(isset($rows['pnum']) && $rows['pnum'] != NULL)?intval($rows['pnum']):0,
								   			   'cost'=>(isset($rows['cost']) && $rows['cost'] != NULL)?floatval($rows['cost']):0,
								   			   'buy'=>check_buy($rows['tid'],$rows['cid'],$rows['pid']),
								   			   'fio'=>$rows['fio']);
								if($rows['fio']!= NULL){
									$ans['bcount'] +=1;
								}
							}
						}
					}
					$ans['tcount'] = count($train);
				}
			}
			break;
		case 'tnum':
			$tid = 0;
			$sql->db_sql_select('id as tid,name,tnum','train','WHERE id = '.intval($search));
			if($sql->d_select_count > 0){
				$t = $sql->d_select;
				while($rows = mysql_fetch_array($t)){
					$tid = intval($rows['tid']);
				}
				if($tid>0){
					$sql->db_sql_select('t.id as tid,
								 			 t.name,
								 			 t.tnum,
								 			 t.pointFirst,
								 			 t.pointSecond,
								 			 t.tpointFirst,
								 			 t.tpointSecond,
								 			 c.cnum,
								 			 c.id as cid,
								 			 p.id as pid,
								 			 p.pnum,
								 			 p.cost,
								 			 u.id as uid,
								 			 u.fio','place as p','
								 			 LEFT JOIN carriage as c ON p.cid = c.id 
								 			 LEFT JOIN train as t ON p.tid = t.id
								 			 LEFT JOIN reservations AS r  ON p.id = r.pid
								 			 LEFT JOIN users as u ON r.uid = u.id 
								 			 WHERE p.tid='.$tid);
					if($sql->d_select_count > 0){
						$r = $sql->d_select;
						while ($rows = mysql_fetch_array($r)) {
							$ans['data'][] = array('name'=>$rows['name'],
											   'tnum'=>intval($rows['tnum']),
											   'pointFirst'=>$rows['pointFirst'],
								   			   'pointSecond'=>$rows['pointSecond'],
								   			   'tpointFirst'=>date('d.m.Y H:i:s',$rows['tpointFirst']),
								   			   'tpointSecond'=>date('d.m.Y H:i:s',$rows['tpointSecond']),
								   			   'cnum'=>(isset($rows['cnum']) && $rows['cnum'] != NULL)?intval($rows['cnum']):0,
								   			   'pnum'=>(isset($rows['pnum']) && $rows['pnum'] != NULL)?intval($rows['pnum']):0,
								   			   'cost'=>(isset($rows['cost']) && $rows['cost'] != NULL)?floatval($rows['cost']):0,
								   			   'buy'=>check_buy($rows['tid'],$rows['cid'],$rows['pid']),
								   			   'fio'=>$rows['fio']);
							$ans['cnum'][$rows['cnum']] += 1;
						}
					}
				}
			}
			break;
		case 'cnum':
			$tid = 0;
			$sql->db_sql_select('tid','carriage','WHERE id = '.intval($search));
			if($sql->d_select_count > 0){
				$t = $sql->d_select;
				while($rows = mysql_fetch_array($t)){
					$tid = intval($rows['tid']);
				}
				if($tid>0){
					$sql->db_sql_select('t.id as tid,
								 			 t.name,
								 			 t.tnum,
								 			 t.pointFirst,
								 			 t.pointSecond,
								 			 t.tpointFirst,
								 			 t.tpointSecond,
								 			 c.cnum,
								 			 c.id as cid,
								 			 p.id as pid,
								 			 p.pnum,
								 			 p.cost,
								 			 u.id as uid,
								 			 u.fio','place as p','
								 			 LEFT JOIN carriage as c ON p.cid = c.id 
								 			 LEFT JOIN train as t ON p.tid = t.id
								 			 LEFT JOIN reservations AS r  ON p.id = r.pid
								 			 LEFT JOIN users as u ON r.uid = u.id 
								 			 WHERE p.tid='.$tid.' && p.cid = '.intval($search));
					if($sql->d_select_count > 0){
						$r = $sql->d_select;
						while ($rows = mysql_fetch_array($r)) {
							$ans['data'][] = array('name'=>$rows['name'],
											   'tnum'=>intval($rows['tnum']),
											   'pointFirst'=>$rows['pointFirst'],
								   			   'pointSecond'=>$rows['pointSecond'],
								   			   'tpointFirst'=>date('d.m.Y H:i:s',$rows['tpointFirst']),
								   			   'tpointSecond'=>date('d.m.Y H:i:s',$rows['tpointSecond']),
								   			   'cnum'=>(isset($rows['cnum']) && $rows['cnum'] != NULL)?intval($rows['cnum']):0,
								   			   'pnum'=>(isset($rows['pnum']) && $rows['pnum'] != NULL)?intval($rows['pnum']):0,
								   			   'cost'=>(isset($rows['cost']) && $rows['cost'] != NULL)?floatval($rows['cost']):0,
								   			   'buy'=>check_buy($rows['tid'],$rows['cid'],$rows['pid']),
								   			   'fio'=>$rows['fio']);
							if($rows['fio']!= NULL){
								$ans['buy'] += floatval($rows['cost']);
								$ans['pnum'] += 1;
							}
						}
					}
				}
			}
			break;
		case 'pnum':
			$tid = 0;
			$sql->db_sql_select('tid','place','WHERE id = '.intval($search));
			if($sql->d_select_count > 0){
				$t = $sql->d_select;
				while($rows = mysql_fetch_array($t)){
					$tid = intval($rows['tid']);
				}
				if($tid>0){
					$sql->db_sql_select('t.id as tid,
								 			 t.name,
								 			 t.tnum,
								 			 t.pointFirst,
								 			 t.pointSecond,
								 			 t.tpointFirst,
								 			 t.tpointSecond,
								 			 c.cnum,
								 			 c.id as cid,
								 			 p.id as pid,
								 			 p.pnum,
								 			 p.cost,
								 			 u.id as uid,
								 			 u.fio','place as p','
								 			 LEFT JOIN carriage as c ON p.cid = c.id 
								 			 LEFT JOIN train as t ON p.tid = t.id
								 			 LEFT JOIN reservations AS r  ON p.id = r.pid
								 			 LEFT JOIN users as u ON r.uid = u.id 
								 			 WHERE p.tid='.$tid.' && p.id = '.intval($search));
					if($sql->d_select_count > 0){
						$r = $sql->d_select;
						while ($rows = mysql_fetch_array($r)) {
							$ans['data'][] = array('name'=>$rows['name'],
											   'tnum'=>intval($rows['tnum']),
											   'pointFirst'=>$rows['pointFirst'],
								   			   'pointSecond'=>$rows['pointSecond'],
								   			   'tpointFirst'=>date('d.m.Y H:i:s',$rows['tpointFirst']),
								   			   'tpointSecond'=>date('d.m.Y H:i:s',$rows['tpointSecond']),
								   			   'cnum'=>(isset($rows['cnum']) && $rows['cnum'] != NULL)?intval($rows['cnum']):0,
								   			   'pnum'=>(isset($rows['pnum']) && $rows['pnum'] != NULL)?intval($rows['pnum']):0,
								   			   'cost'=>(isset($rows['cost']) && $rows['cost'] != NULL)?floatval($rows['cost']):0,
								   			   'buy'=>check_buy($rows['tid'],$rows['cid'],$rows['pid']),
								   			   'fio'=>$rows['fio']);
						}
					}
				}
			}
			break;
		case 'schedule':
			$tid = 0;
			$sql->db_sql_select('tid','schedule','WHERE id = '.intval($search));
			if($sql->d_select_count > 0){
				$t = $sql->d_select;
				while($rows = mysql_fetch_array($t)){
					$tid = intval($rows['tid']);
				}
				if($tid>0){
					$sql->db_sql_select('t.id as tid,
								 			 t.name,
								 			 t.tnum,
								 			 t.pointFirst,
								 			 t.pointSecond,
								 			 t.tpointFirst,
								 			 t.tpointSecond,
								 			 c.cnum,
								 			 c.id as cid,
								 			 p.id as pid,
								 			 p.pnum,
								 			 p.cost,
								 			 u.id as uid,
								 			 u.fio','place as p','
								 			 LEFT JOIN carriage as c ON p.cid = c.id 
								 			 LEFT JOIN train as t ON p.tid = t.id
								 			 LEFT JOIN reservations AS r  ON p.id = r.pid
								 			 LEFT JOIN users as u ON r.uid = u.id 
								 			 WHERE p.tid='.$tid);
					if($sql->d_select_count > 0){
						$r = $sql->d_select;
						while ($rows = mysql_fetch_array($r)) {
							$ans['data'][] = array('name'=>$rows['name'],
											   'tnum'=>intval($rows['tnum']),
											   'pointFirst'=>$rows['pointFirst'],
								   			   'pointSecond'=>$rows['pointSecond'],
								   			   'tpointFirst'=>date('d.m.Y H:i:s',$rows['tpointFirst']),
								   			   'tpointSecond'=>date('d.m.Y H:i:s',$rows['tpointSecond']),
								   			   'cnum'=>(isset($rows['cnum']) && $rows['cnum'] != NULL)?intval($rows['cnum']):0,
								   			   'pnum'=>(isset($rows['pnum']) && $rows['pnum'] != NULL)?intval($rows['pnum']):0,
								   			   'cost'=>(isset($rows['cost']) && $rows['cost'] != NULL)?floatval($rows['cost']):0,
								   			   'buy'=>check_buy($rows['tid'],$rows['cid'],$rows['pid']),
								   			   'fio'=>$rows['fio']);
							if($rows['fio']!= NULL){
								$ans['busy'] +=1;
							} else{
								$ans['freely'] += 1;
							}
						}
					}
				}
			}
			break;
	}
	return $ans;
}

//возврат результата в формате JSON
print json_encode($result);

?>