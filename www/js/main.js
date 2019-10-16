var trains = {};
var schedule = {};
var place = {};

//регистрация
function registration(){
	//jquery селектору с классом result пристовить пустое значение
	$('.result').html('');
	//получения из поля ввода значение введенного логина
	var login = $('input[name="Login"]').val();
	//получения из поля ввода значение введенного email
	var email = $('input[name="inputEmail"]').val();
	//получения из поля ввода значение введенного пароля
	var password = $('input[name="inputPassword"]').val();
	//получения из поля ввода значение введенного пароля
	var confirm = $('input[name="confirmPassword"]').val();
	//получения из поля ввода значение введенного ФИО
	var fio = $('input[name="inputfio"]').val();
	//объект для передачи данных
	var dataPost = {Login: login, inputEmail: email, inputPassword: password, confirmPassword: confirm, inputfio: fio};
	//вывод объект
	console.log(dataPost);
	//AJAX запрос на сервис
	$.ajax({
	  type: "POST", //тип запроса
	  url: "../controller.php?id=reg", //адрес запроса
	  dataType: "json", //формат данных
	  data: dataPost, //данные
	  //в случае успеха срабатывает событие
	  success: function(data){
	    //вывод результата в консоль
	    console.log(data);
	    //проверка ошибок
	    if(data['error'] == 'this user register'){
	    	$('.result').html('<span style="color: red;">Такой пользователь уже существует</span>');
	    } else if(data['error'] == 'passwords do not match'){
	    	$('.result').html('<span style="color: red;">Пароли не совпадают</span>');
	    } else if(data['error'] == 'insert error'){
	    	$('.result').html('<span style="color: green;">Пожалуйста, обновите страницу</span>');
	    } else if(data['error'] == 'not valid login'){
	    	$('.result').html('<span style="color: red;">Логин должен состоять из латинских букв</span>');
	    } else if(data['error'] == 'not valid pass'){
			$('.result').html('<span style="color: red;">Пароль может состоять из латинских букв или цифр</span>');
	    } else if(data['error'] == 'not valid email'){
	    	$('.result').html('<span style="color: red;">Не верно указан email адрес</span>');
	    } else if(data['error'] == 'not all fields'){
	    	$('.result').html('<span style="color: red;">Пожалуйста, заполните все поля</span>');
	    } else if (data['error'] == 'not valid fio') {
	    	$('.result').html('<span style="color: red;">ФИО должно состоять из латинских символов</span>');
	    } else {
	    	//перенаправление на сайт
	    	document.location.href='http://traine-tikets.sl';
	    }
	  }
	});
}
//логин на сервис
function login_form(){
	//jquery селектору с классом result пристовить пустое значение
	$('.result').html('');
	//получения из поля ввода значение введенного логина
	var login = $('input[name="login"]').val();
	//получения из поля ввода значение введенного пароля
	var password = $('input[name="pass"]').val();
	//объект для передачи данных
	var dataPost = {login: login, pass: password};
	//AJAX запрос на сервис
	$.ajax({
	  type: "POST",//тип запроса
	  url: "../controller.php?id=login",//адрес запроса
	  dataType: "json",//формат данных
	  data: dataPost,//данные
	  //в случае успеха срабатывает событие
	  success: function(data){
	  	//проверка ошибок
	    if(data['error'] == 'not found user'){
	    	$('.result').html('<span style="color: red; padding-left: 270px;">Не верно введен логин или пароль. Повторите попытку</span>');
	    } else {
	    	//перенаправление на сайт
	    	document.location.href='http://traine-tikets.sl/page/main.php';
	    }
	  }
	});
}

function add_trains(){
	//jquery селектору с классом row пристовить пустое значение
	$('.row').html('');
	div = '';
	//рисуем форму создания нового рабочего дня
	div += '<form class="form-horizontal">'
		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="tname">Наименование поезда:</label>'
			div += '<div class="col-xs-9">'
				div += '<input type="text" class="form-control" id="tname" name="tname" placeholder="Введите наименование поезда">'
			div += '</div>'
		div += '</div>'
		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="number">Номер поезда:</label>'
			div += '<div class="col-xs-9">'
				div += '<input type="text" class="form-control" id="number" name="number" placeholder="Введите номер поезда" onkeyup="return check_chose(this);" onkeypress="return check_chose(this);">'
			div += '</div>'
		div += '</div>'
		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="ccol">Количество вагонов:</label>'
			div += '<div class="col-xs-9">'
					  div += '<input type="text" class="form-control" id="ccol" name="ccol" placeholder="Введите количество вагонов" onkeyup="return check_chose(this);" onkeypress="return check_chose(this);">'
			div += '</div>'
		div += '</div>'
		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="pointA">Станция отправления:</label>'
			div += '<div class="col-xs-9">'
					  div += '<input type="text" class="form-control" id="pointA" name="pointA" placeholder="Введите станцию отправления">'
			div += '</div>'
		div += '</div>'
		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="pointB">Станция прибытия:</label>'
			div += '<div class="col-xs-9">'
					  div += '<input type="text" class="form-control" id="pointB" name="pointB" placeholder="Введите станицию прибытия">'
			div += '</div>'
		div += '</div>'

		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="date">Дата отправления:</label>'
			div += '<div class="col-xs-9">'
				div += '<div class="input-group date " id="tpointA">'
					div += '<input type="text" class="form-control" name="tpointA" onkeyup="return proverka(this);" onkeypress="return proverka(this);"/>'
					div += '<span class="input-group-addon">'
						div += '<span class="glyphicon glyphicon-calendar" onclick="set_date(1);"></span>'
					div += '</span>'
				div += '</div>'
			div += '</div>'
		div += '</div>'

		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="date">Дата прибытия:</label>'
			div += '<div class="col-xs-9">'
				div += '<div class="input-group date " id="tpointB">'
					div += '<input type="text" class="form-control" name="tpointB" onkeyup="return proverka(this);" onkeypress="return proverka(this);"/>'
					div += '<span class="input-group-addon">'
						div += '<span class="glyphicon glyphicon-calendar" onclick="set_date(2);"></span>'
					div += '</span>'
				div += '</div>'
			div += '</div>'
		div += '</div>'

		div += '<div class="form-group">'
			div += '<div class="col-xs-offset-3 col-xs-9">'
				div += '<button type="button" class="btn btn-default" onclick="end_add_train();">Добавить</button>'
			div += '</div>'
		div += '</div>'
	div += '</form>';
	//вставляем результат рисовки
	$('.row').html(div);
}

function end_add_train(){
	var name = $('input[name=tname]').val();
	var number = $('input[name=number]').val();
	var ccol = $('input[name=ccol]').val();
	var pointA = $('input[name=pointA]').val();
	var pointB = $('input[name=pointB]').val();
	var tpointA = $('input[name=tpointA]').val();
	var tpointB = $('input[name=tpointB]').val();
	var dataPost = {tname:name,number:number,ccount:ccol,pointFirst:pointA,pointSecond:pointB,tpointFirst:tpointA,tpointSecond:tpointB}
	console.log(dataPost);
	$.ajax({
	  type: "POST",//тип запроса
	  url: '../controller.php?id=add_train',//адрес запроса
	  dataType: "json",//формат данных
	  data: dataPost,//данные
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	  	//вывод результата в консоль
	    console.log(jsondata);
	    //переменная для вставки в сайт
	    var div = '';
	    //проверка ошибок
	    if(jsondata == ""){
	    	alert('Ошибка создания поезда');
	    	add_trains();
	    } else if (jsondata['error'] == 'not found rights') {
	    	alert('Вы не являетесь администратором');
	    	add_trains();
	    } else if(jsondata['error'] == 'insert'){
	    	alert('Произошла ошибка создания поезда');
	    	add_trains();
	    } else {
	    	div += '<form class="form-horizontal">';
	    	for (var i = 1; i <= jsondata['count']; i++) {
				div += '<div class="form-group">'
					div += '<label class="control-label col-xs-3" for="data">Номер вагона:</label>'
					div += '<div class="col-xs-9">'
						div += '<input type="text" class="form-control" id="data" name="data[]" placeholder="Введите номер вагона" onkeyup="return check_chose(this);" onkeypress="return check_chose(this);">'
					div += '</div>'
				div += '</div>'
	    	}
			    div += '<div class="form-group">'
					div += '<div class="col-xs-offset-3 col-xs-9">'
						div += '<button type="button" class="btn btn-default" onclick="add_carriage('+jsondata['ok']+');">Добавить</button>'
					div += '</div>'
				div += '</div>'
			div += '</form>';
	    	//вставляем результат рисовки
	    	$('.row').html(div);
	    }
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

function add_carriage(tid){
	var carriage = [];
	$("input[name=data\\[\\]]").each(function () {
            // ... помещаем значение в контейнер
            carriage.push(this.value);
        })
	var dataPost = {tid:tid, carriage:carriage}
	$.ajax({
	  type: "POST",//тип запроса
	  url: '../controller.php?id=add_carriage',//адрес запроса
	  dataType: "json",//формат данных
	  data: dataPost,//данные
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	  	//вывод результата в консоль
	    console.log(jsondata);
	    //переменная для вставки в сайт
	    var div = '';
	    //проверка ошибок
	    if(jsondata == ""){
	    	alert('Ошибка создания вагона');
	    	add_trains();
	    } else if (jsondata['error'] == 'not found rights') {
	    	alert('Вы не являетесь администратором');
	    	add_trains();
	    } else if(jsondata['error'] == 'not found train'){
	    	alert('Такой поезд не существует');
	    	add_trains();
	    } else if(jsondata['error'] == 'insert'){
	    	alert('Произошла ошибка создания поезда');
	    	add_trains();
	    } else if(jsondata['error'] == 'carriage incorrect'){
	    	alert('Произошла ошибка создания поезда');
	    	add_trains();
	    } else if(jsondata['error'] == 'count incorrect'){
	    	alert('Произошла ошибка создания поезда');
	    	add_trains();
	    } else {
	    	alert('Вагоны успешно добавлены');
	    	get_trains(1);
	    	//вставляем результат рисовки
	    	$('.row').html(div);
	    }
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

function get_reservations(){
	//jquery селектору с классом row пристовить пустое значение
	$('.row').html('');
	var response = false;
	//AJAX запрос на сервис
	$.ajax({
	  dataType: 'json',//формат данных
	  url: '../controller.php?id=get_reservations',//адрес запроса
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	    //$('.results').html(jsondata);
	    //вывод результата в консоль
	    console.log(jsondata);
	    var d = {};
	   	var div = '';
	    if(jsondata == ""){
	    	$('.row').html('<span style="color: red;">Вы не заказывали билеты</span>');
	    } else if(jsondata['error'] == 'not found uid') {
	    	alert('Пожалуйста, авторизуйтесь и попробуйте еще раз');
	    } else {
			div += '<div class="table-responsive">'
				div += '<table class="table table-hover">'
					div += '<thead>'
						div += '<tr>'
							div += '<td align="center">Поезд</td>'
							div += '<td align="center">№ поезда</td>'
							div += '<td align="center">Отправление</td>'
							div += '<td align="center">Прибытие</td>'
							div += '<td align="center">Время отправление</td>'
							div += '<td align="center">Время прибытия</td>'
							div += '<td align="center">№ вагона</td>'
							div += '<td align="center">№ места</td>'
							div += '<td align="center">Стоимость</td>'
						div += '</tr>'
					div += '</thead>'
					div += '<tbody>'
			    	for(var index in jsondata){
			    		div += '<tr>'
			    			div += '<td align="center">'+jsondata[index]['name']+'</td>'
							div += '<td align="center">'+jsondata[index]['tnum']+'</td>'
			    			div += '<td align="center">'+jsondata[index]['pointFirst']+'</td>'
							div += '<td align="center">'+jsondata[index]['pointSecond']+'</td>'
							div += '<td align="center">'+jsondata[index]['tpointFirst']+'</td>'
							div += '<td align="center">'+jsondata[index]['tpointSecond']+'</td>'
							div += '<td align="center">'+jsondata[index]['cnum']+'</td>'
							div += '<td align="center">'+jsondata[index]['pnum']+'</td>'
							div += '<td align="center">'+jsondata[index]['cost']+'</td>'
						div += '</tr>'
			    	}
		    		div += '</tbody>'
				div += '</table>'
			div += '</div>';
			$('.row').html(div);
	    }
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

function get_trains(tdata){
	//jquery селектору с классом row пристовить пустое значение
	$('.row').html('');
	var response = false;
	//AJAX запрос на сервис
	$.ajax({
	  dataType: 'json',//формат данных
	  url: '../controller.php?id=get_train',//адрес запроса
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	    //$('.results').html(jsondata);
	    //вывод результата в консоль
	    console.log(jsondata);
	    var d = {};
	   	var div = '';
	    if(jsondata == ""){
	    	$('.row').html('<span style="color: red;">Нет поездов</span>');
	    } else {
	    	switch(tdata){
	    		//admin
	    		case 1:
			    	var i = 1;
			    	for(var index in jsondata){

			    		trains[jsondata[index]['id']] = {id:jsondata[index]['id'],
			    							name:jsondata[index]['name'],
			    							tnum:jsondata[index]['tnum'],
			    							ccount:jsondata[index]['ccount'],
			    							pointFirst:jsondata[index]['pointFirst'],
			    							tpointFirst:jsondata[index]['tpointFirst'],
			    							pointSecond:jsondata[index]['pointSecond'],
			    							tpointSecond:jsondata[index]['tpointSecond']};
			    		div += '<div class="panel-group" id="collapse-group">'
					    	div += '<div class="panel panel-default">'
					    		div += '<div class="panel-heading">'
					    			div += '<h4 class="panel-title">'
					    				div += '<a data-toggle="collapse" data-parent="#collapse-group" href="#el'+jsondata[index]['id']+'">'+'Поезд № '+jsondata[index]['tnum']+'. Наименование: '+jsondata[index]['name']+'. Количество вагонов: '+jsondata[index]['ccount']+'</a>&nbsp;'
					    				div += '<a onclick="del_train(\''+jsondata[index]['id']+'\')"><span class="glyphicon glyphicon-remove"></span></a>&nbsp;'
					    				div += '<a onclick="start_update_train('+jsondata[index]['id']+')"><span class="glyphicon glyphicon-pencil"></span></a>'
					    			div += '</h4>'
					    		div += '</div>'
					    		div += '<div id="el'+jsondata[index]['id']+'" class="panel-collapse collapse">'
					    			div += '<div class="panel-body">'

					    				div += '<div class="col-md-4">'
											div += '<h2>Маршрут</h2>'
										div += '</div>'
					    				var s = 1;
					    				div += '<div class="table-responsive">'
											div += '<table class="table table-hover">'
									    		div += '<thead>'
										    		div += '<tr>'
										    			div += '<td align="center">№</td>'
										    			div += '<td align="center">Станция</td>'
										    			div += '<td align="center">Прибытие</td>'
										    			div += '<td align="center">Стоянка</td>'
										    			div += '<td align="center">Отправление</td>'
										    			div += '<td align="center"></td>'
										    		div += '</tr>'
									    		div += '</thead>'
									    		div += '<tbody>'
									    		div += '<tr>'
													div += '<td align="center">'+s+'</td>'
													div += '<td align="center">'+jsondata[index]['pointFirst']+'</td>'
													div += '<td align="center">-</td>'
													div += '<td align="center">-</td>'
													div += '<td align="center">'+jsondata[index]['tpointFirst']+'</td>'
													//событие на нажатие вызывются функции удаления и редактирование записи
								    			    div += '<td align="center"></td>'
												div += '</tr>'
												if(jsondata[index]['schedule'].lenght != 0){
													for(var key in jsondata[index]['schedule']){
														schedule[jsondata[index]['schedule'][key]['id']] = {id:jsondata[index]['schedule'][key]['id'],
																											pointStation:jsondata[index]['schedule'][key]['pointStation'],
																											tpointStay:jsondata[index]['schedule'][key]['tpointStay'],
																											tpointStop:jsondata[index]['schedule'][key]['tpointStop'],
																											tpointStart:jsondata[index]['schedule'][key]['tpointStart']};
														div += '<tr>'
															div += '<td align="center">'+s+'</td>'
															div += '<td align="center">'+jsondata[index]['schedule'][key]['pointStation']+'</td>'
															div += '<td align="center">'+jsondata[index]['schedule'][key]['tpointStop']+'</td>'
															div += '<td align="center">'+jsondata[index]['schedule'][key]['tpointStay']+'</td>'
															div += '<td align="center">'+jsondata[index]['schedule'][key]['tpointStart']+'</td>'
															//событие на нажатие вызывются функции удаления и редактирование записи
										    			    div += '<td align="center"><a onclick="del_schedule('+jsondata[index]['schedule'][key]['id']+')"><span class="glyphicon glyphicon-remove"></span></a>&nbsp;<a onclick="start_update_schedule('+jsondata[index]['schedule'][key]['id']+')"><span class="glyphicon glyphicon-pencil"></span></a></td>'
														div += '</tr>'
														s++;
													}
												}
												div += '<tr>'
													div += '<td align="center">'+s+'</td>'
													div += '<td align="center">'+jsondata[index]['pointSecond']+'</td>'
													div += '<td align="center">'+jsondata[index]['tpointSecond']+'</td>'
													div += '<td align="center">-</td>'
													div += '<td align="center">-</td>'
													//событие на нажатие вызывются функции удаления и редактирование записи
								    			    div += '<td align="center"></td>'
												div += '</tr>'
						    				div += '</tbody>'
						    				div += '</table>'
						    			div += '</div>'

						    			//Вагоны
						    			for(var key in jsondata[index]['carriage']){
						    				div += '<div class="col-md-4">'
												div += '<h2>Вагон № '+jsondata[index]['carriage'][key]['cnum']+'&nbsp;<small><a onclick="del_carriage('+jsondata[index]['carriage'][key]['id']+')"><span class="glyphicon glyphicon-remove"></span></a>&nbsp;<a onclick="update_carriage('+jsondata[index]['carriage'][key]['id']+')"><span class="glyphicon glyphicon-pencil"></span></a></small></h2>'
											div += '</div>'
											if(jsondata[index]['carriage'][key]['place'].length != 0){
												var j = 1;
												div += '<div class="table-responsive">'
													div += '<table class="table table-hover">'
												    	div += '<thead>'
													    	div += '<tr>'
													    		div += '<td align="center">№</td>'
													    		div += '<td align="center">№ места</td>'
													    		div += '<td align="center">Стоимость</td>'
													    		div += '<td align="center"></td>'
													    	div += '</tr>'
												    	div += '</thead>'
												    	div += '<tbody>'
												for(var k in jsondata[index]['carriage'][key]['place']){
													place[jsondata[index]['carriage'][key]['place'][k]['id']] = {id:jsondata[index]['carriage'][key]['place'][k]['id'],
																												 pnum:jsondata[index]['carriage'][key]['place'][k]['pnum'],
																												 cost:jsondata[index]['carriage'][key]['place'][k]['cost']}
													div += '<tr>'
														div += '<td align="center">'+j+'</td>'
														div += '<td align="center">'+jsondata[index]['carriage'][key]['place'][k]['pnum']+'</td>'
														div += '<td align="center">'+jsondata[index]['carriage'][key]['place'][k]['cost']+'</td>'
														//событие на нажатие вызывются функции удаления и редактирование записи
													    div += '<td align="center"><a onclick="del_place('+jsondata[index]['carriage'][key]['place'][k]['id']+')"><span class="glyphicon glyphicon-remove"></span></a>&nbsp;<a onclick="update_place('+jsondata[index]['carriage'][key]['place'][k]['id']+')"><span class="glyphicon glyphicon-pencil"></span></a></td>'
													div += '</tr>'
													j++;
												}
									    				div += '</tbody>'
									    			div += '</table>'
									    		div += '</div>'
											} else {
												div += '<div class="col-md-4">'
													div += '<h3><p style="color:red;">Нет мест<p></h3>'
												div += '</div>'
											}		        
						    			}
						    			
					    			div += '</div>'
								div += '</div>'
					    	div += '</div>'
					    div += '</div>'
					    i++;
			    	}
		    		$('.row').html(div);
		    		//console.log(jsondata);
	    			break;
	    		//user
	    		case 2:
	    			var i = 1;
			    	for(var index in jsondata){
			    		div += '<div class="panel-group" id="collapse-group">'
					    	div += '<div class="panel panel-default">'
					    		div += '<div class="panel-heading">'
					    			div += '<h4 class="panel-title">'
					    				div += '<a data-toggle="collapse" data-parent="#collapse-group" href="#el'+jsondata[index]['id']+'">'+'Поезд № '+jsondata[index]['tnum']+'. Наименование: '+jsondata[index]['name']+'. Количество вагонов: '+jsondata[index]['ccount']+'</a>'
					    			div += '</h4>'
					    		div += '</div>'
					    		div += '<div id="el'+jsondata[index]['id']+'" class="panel-collapse collapse">'
					    			div += '<div class="panel-body">'

					    				div += '<div class="col-md-4">'
											div += '<h2>Маршрут</h2>'
										div += '</div>'
					    				var s = 1;
					    				div += '<div class="table-responsive">'
											div += '<table class="table table-hover">'
									    		div += '<thead>'
										    		div += '<tr>'
										    			div += '<td align="center">№</td>'
										    			div += '<td align="center">Станция</td>'
										    			div += '<td align="center">Прибытие</td>'
										    			div += '<td align="center">Стоянка</td>'
										    			div += '<td align="center">Отправление</td>'
										    			div += '<td align="center"></td>'
										    		div += '</tr>'
									    		div += '</thead>'
									    		div += '<tbody>'
									    		div += '<tr>'
													div += '<td align="center">'+s+'</td>'
													div += '<td align="center">'+jsondata[index]['pointFirst']+'</td>'
													div += '<td align="center">-</td>'
													div += '<td align="center">-</td>'
													div += '<td align="center">'+jsondata[index]['tpointFirst']+'</td>'
												div += '</tr>'
												if(jsondata[index]['schedule'].lenght != 0){
													for(var key in jsondata[index]['schedule']){
														div += '<tr>'
															div += '<td align="center">'+s+'</td>'
															div += '<td align="center">'+jsondata[index]['schedule'][key]['pointStation']+'</td>'
															div += '<td align="center">'+jsondata[index]['schedule'][key]['tpointStop']+'</td>'
															div += '<td align="center">'+jsondata[index]['schedule'][key]['tpointStay']+'</td>'
															div += '<td align="center">'+jsondata[index]['schedule'][key]['tpointStart']+'</td>'
														div += '</tr>'
														s++;
													}
												}
												div += '<tr>'
													div += '<td align="center">'+s+'</td>'
													div += '<td align="center">'+jsondata[index]['pointSecond']+'</td>'
													div += '<td align="center">'+jsondata[index]['tpointSecond']+'</td>'
													div += '<td align="center">-</td>'
													div += '<td align="center">-</td>'
												div += '</tr>'
						    				div += '</tbody>'
						    				div += '</table>'
						    			div += '</div>'

						    			//Вагоны
						    			for(var key in jsondata[index]['carriage']){
						    				div += '<div class="col-md-4">'
												div += '<h2>Вагон № '+jsondata[index]['carriage'][key]['cnum']+'</h2>'
											div += '</div>'
											if(jsondata[index]['carriage'][key]['place'].length != 0){
												var j = 1;
												div += '<div class="table-responsive">'
													div += '<table class="table table-hover">'
												    	div += '<thead>'
													    	div += '<tr>'
													    		div += '<td align="center">№</td>'
													    		div += '<td align="center">№ места</td>'
													    		div += '<td align="center">Стоимость</td>'
													    		div += '<td align="center"></td>'
													    	div += '</tr>'
												    	div += '</thead>'
												    	div += '<tbody>'
												for(var k in jsondata[index]['carriage'][key]['place']){
													div += '<tr>'
														div += '<td align="center">'+j+'</td>'
														div += '<td align="center">'+jsondata[index]['carriage'][key]['place'][k]['pnum']+'</td>'
														div += '<td align="center">'+jsondata[index]['carriage'][key]['place'][k]['cost']+'</td>'
														//событие на нажатие вызывются функции удаления и редактирование записи
													    if(jsondata[index]['carriage'][key]['place'][k]['buy'] == 0){
													    	div += '<td align="center"><button type="button" class="btn btn-primary" onclick="place_buy('+jsondata[index]['id']+','+jsondata[index]['carriage'][key]['id']+','+jsondata[index]['carriage'][key]['place'][k]['id']+')">Купить</button></td>'
													    } else {
													    	div += '<td align="center"><button type="button" class="btn btn-danger">Куплен</button></td>'
													    }
													    
													div += '</tr>'
													j++;
												}
									    				div += '</tbody>'
									    			div += '</table>'
									    		div += '</div>'
											} else {
												div += '<div class="col-md-4">'
													div += '<h3><p style="color:red;">Нет мест<p></h3>'
												div += '</div>'
											}		        
						    			}
						    			
					    			div += '</div>'
								div += '</div>'
					    	div += '</div>'
					    div += '</div>'
					    i++;
			    	}
		    		$('.row').html(div);
	    			break;
	    		//schedule
	    		case 3:
	    			div += '<form class="form-horizontal">'
							div += '<div class="form-group">'
								div += '<label class="control-label col-xs-3" for="col">Номер поезда:</label>'
								div += '<div class="col-xs-9">'
									div += '<select class="form-control" name="someSelect" id="myselect">'
										for(var tnum in jsondata){
											div += '<option value="'+jsondata[tnum]['id']+'">'+jsondata[tnum]['name']+' № '+jsondata[tnum]['tnum']+'</option>';
										}
									div += '</select>'
								div += '</div>'
							div += '</div>'
							div += '<div class="form-group">'
								div += '<label class="control-label col-xs-3" for="station">Станция:</label>'
								div += '<div class="col-xs-9">'
									div += '<input type="text" class="form-control" id="station" name="station" placeholder="Введите наименование станции">'
								div += '</div>'
							div += '</div>'

							div += '<div class="form-group">'
								div += '<label class="control-label col-xs-3" for="date">Дата прибытия:</label>'
								div += '<div class="col-xs-9">'
									div += '<div class="input-group date " id="tpointB">'
										div += '<input type="text" class="form-control" name="tpointB" onkeyup="return proverka(this);" onkeypress="return proverka(this);"/>'
										div += '<span class="input-group-addon">'
											div += '<span class="glyphicon glyphicon-calendar" onclick="set_date(2);"></span>'
										div += '</span>'
									div += '</div>'
								div += '</div>'
							div += '</div>'

							div += '<div class="form-group">'
								div += '<label class="control-label col-xs-3" for="date">Дата отправления:</label>'
								div += '<div class="col-xs-9">'
									div += '<div class="input-group date " id="tpointA">'
										div += '<input type="text" class="form-control" name="tpointA" onkeyup="return proverka(this);" onkeypress="return proverka(this);"/>'
										div += '<span class="input-group-addon">'
											div += '<span class="glyphicon glyphicon-calendar" onclick="set_date(1);"></span>'
										div += '</span>'
									div += '</div>'
								div += '</div>'
							div += '</div>'


							div += '<div class="form-group">'
								div += '<label class="control-label col-xs-3" for="tcol">Количество минут:</label>'
								div += '<div class="col-xs-9">'
					    			div += '<input type="text" class="form-control" id="tcol" name="tcol" placeholder="Введите количество минут остановки" onkeyup="return check_chose(this);" onkeypress="return check_chose(this);">'
								div += '</div>'
							div += '</div>'
						div += '<div class="form-group">'
							div += '<div class="col-xs-offset-3 col-xs-9">'
								div += '<button type="button" class="btn btn-primary" onclick="add_schedule();">Сохранить расписание</button>'
							div += '</div>'
						div += '</div>'
					div += '</form>';
					$('.row').html(div);
	    			break;
	    		//place
	    		case 4:
	    			var tids = new Array();
	    			for(var index in jsondata){
	    				tids.push(jsondata[index]['id']);
	    			}
	    			div += '<form class="form-horizontal">'
						div += '<div class="form-group">'
							div += '<label class="control-label col-xs-3" for="col">Номер поезда:</label>'
							div += '<div class="col-xs-9">'
								div += '<select class="form-control" name="placeSelect" id="placeSelect" onchange="getval(this,'+JSON.stringify(tids)+');">'
									for(var tnum in jsondata){
										div += '<option value="'+jsondata[tnum]['id']+'">'+jsondata[tnum]['name']+' № '+jsondata[tnum]['tnum']+'</option>';
									}
								div += '</select>'
							div += '</div>'
						div += '</div>'

						
						for(var tnum in jsondata){
							if(tnum == 0){
								div += '<div name="cSelect'+jsondata[tnum]['id']+'" style="display: block;" id="place'+jsondata[tnum]['id']+'">'
							} else {
								div += '<div name="cSelect'+jsondata[tnum]['id']+'" style="display: none;" id="place'+jsondata[tnum]['id']+'">'
							}
							div += '<div class="form-group">'
								div += '<label class="control-label col-xs-3" for="col">Вагон:</label>'
								div += '<div class="col-xs-9">'
									div += '<select class="form-control" name="cSelect'+jsondata[tnum]['id']+'" id="myselect">'
										for(var c in jsondata[tnum]['carriage']){
											div += '<option value="'+jsondata[tnum]['carriage'][c]['id']+'">№ вагона '+jsondata[tnum]['carriage'][c]['cnum']+'</option>';
										}
									div += '</select>'
								div += '</div>'
							div += '</div>'
							div += '</div>'
						}

							div += '<div class="form-group">'
								div += '<label class="control-label col-xs-3" for="pnum">Место:</label>'
								div += '<div class="col-xs-9">'
									div += '<input type="text" class="form-control" id="pnum" name="pnum" placeholder="Введите номер места" onkeyup="return check_chose(this);" onkeypress="return check_chose(this);">'
								div += '</div>'
							div += '</div>'

							div += '<div class="form-group">'
								div += '<label class="control-label col-xs-3" for="cost">Стоимость:</label>'
								div += '<div class="col-xs-9">'
					    			div += '<input type="text" class="form-control" id="cost" name="cost" placeholder="Введите стоимость места" onkeyup="return check_chose(this);" onkeypress="return check_chose(this);">'
								div += '</div>'
							div += '</div>'
						div += '<div class="form-group">'
							div += '<div class="col-xs-offset-3 col-xs-9">'
								div += '<button type="button" class="btn btn-primary" onclick="add_place();">Сохранить место</button>'
							div += '</div>'
						div += '</div>'
					div += '</form>';
					$('.row').html(div);
	    			break;
	    	}
	    }
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

function add_schedule(){
	var station = $('input[name=station]').val();
	var tpointA = $('input[name=tpointA]').val();
	var tpointB = $('input[name=tpointB]').val();
	var tpointS = $('input[name=tcol]').val();
	var tid = $('select[name=someSelect]').val();
	var cid = $('select[name=cSelect]').val();

	var dataPost = {pointStation:station,tpointStay:tpointS,tpointStart:tpointA,tpointStop:tpointB,tid:tid}
	console.log(dataPost);
	$.ajax({
	  type: "POST",//тип запроса
	  url: '../controller.php?id=add_schedule',//адрес запроса
	  dataType: "json",//формат данных
	  data: dataPost,//данные
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	  	//вывод результата в консоль
	    console.log(jsondata);
	    //переменная для вставки в сайт
	    var div = '';
	    //проверка ошибок
	    if(jsondata == ""){
	    	alert('Произошла ошибка');
	    } else if (jsondata['error'] == 'not found rights') {
	    	alert('Вы не являетесь администратором');
	    } else if(jsondata['error'] == 'insert'){
	    	alert('Произошла ошибка создания расписания');
	    } else if(jsondata['error'] == 'incorrect data'){
			alert('Данные не верны');
	    } else if(jsondata['error'] == 'schedule find'){
	    	alert('Такое расписание уже существует');
	    } else {
	    	get_trains(3);
	    }
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

function add_place(){
	var num = $('input[name=pnum]').val();
	var cost = $('input[name=cost]').val();
	var tid = $('select[name=placeSelect]').val();
	var cid = $('select[name=cSelect'+tid+']').val();

	var dataPost = {pnum:num,cost:cost,cid:cid,tid:tid}
	console.log(dataPost);
	$.ajax({
	  type: "POST",//тип запроса
	  url: '../controller.php?id=add_place',//адрес запроса
	  dataType: "json",//формат данных
	  data: dataPost,//данные
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	  	//вывод результата в консоль
	    console.log(jsondata);
	    //переменная для вставки в сайт
	    var div = '';
	    //проверка ошибок
	    if(jsondata == ""){
	    	alert('Произошла ошибка');
	    } else if (jsondata['error'] == 'not found rights') {
	    	alert('Вы не являетесь администратором');
	    } else if(jsondata['error'] == 'insert'){
	    	alert('Произошла ошибка создания расписания');
	    } else if(jsondata['error'] == 'incorrect data'){
			alert('Данные не верны');
	    } else if(jsondata['error'] == 'place find'){
	    	alert('Место уже существует');
	    } else {
	    	get_trains(4);
	    }
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

function get_sessia(){
	//jquery селектору с классом row пристовить пустое значение
	$('.row').html('');
	//AJAX запрос на сервис
	$.ajax({
	  dataType: 'json',//формат данных
	  url: '../controller.php?id=get_sess',//адрес запроса
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	    //$('.results').html(jsondata);
	    //вывод результата в консоль
	    console.log(jsondata);
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

function place_buy(tid,cid,pid){
	var dataPost = {tid:tid,cid:cid,pid:pid};
	console.log(dataPost);
	$.ajax({
	  type: "POST",//тип запроса
	  url: '../controller.php?id=place_buy',//адрес запроса
	  dataType: "json",//формат данных
	  data: dataPost,//данные
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	  	console.log(jsondata);
	  	if(jsondata == ""){
	    	alert('Произошла ошибка');
	    } else if (jsondata['error'] == 'not found uid') {
	    	alert('Пожалуйста, перезайдите и повторите попытку');
	    } else if(jsondata['error'] == 'insert'){
	    	alert('Произошла ошибка создания расписания');
	    } else if(jsondata['error'] == 'incorrect data'){
			alert('Данные не верны');
	    } else {
	    	alert('Вы успешно купили билет');
	    	get_trains(2);
	    }
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

function del_train(tid){
	var dataPost = {tid:tid};
	$.ajax({
	  type: "POST",//тип запроса
	  url: '../controller.php?id=del_train',//адрес запроса
	  dataType: "json",//формат данных
	  data: dataPost,//данные
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	  	if(jsondata == ""){
	    	alert('Произошла ошибка');
	    } else if (jsondata['error'] == 'not found rights') {
	    	alert('Вы не являетесь администратором');
	    } else if(jsondata['error'] == 'train deleted'){
	    	alert('Поезд не удален');
	    }  else if(jsondata['error'] == 'place deleted'){
	    	alert('Места вагонов поезда не удалены');
	    }  else if(jsondata['error'] == 'carriage deleted'){
	    	alert('Вагоны поезда не удалены');
	    }  else if(jsondata['error'] == 'schedule deleted'){
	    	alert('Маршрут поезда не удален');
	    } else if(jsondata['error'] == 'incorrect data'){
			alert('Данные не верны');
	    } else {
	    	get_trains(1);
	    }
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

function update_train(tid){
	var name = $('input[name=tname]').val();
	var number = $('input[name=number]').val();
	var ccol = $('input[name=ccol]').val();
	var pointA = $('input[name=pointA]').val();
	var pointB = $('input[name=pointB]').val();
	var tpointA = $('input[name=tpointA]').val();
	var tpointB = $('input[name=tpointB]').val();
	var dataPost = {tid:tid,tname:name,number:number,ccount:ccol,pointFirst:pointA,pointSecond:pointB,tpointFirst:tpointA,tpointSecond:tpointB}
	console.log(dataPost);
	$.ajax({
	  type: "POST",//тип запроса
	  url: '../controller.php?id=edit_train',//адрес запроса
	  dataType: "json",//формат данных
	  data: dataPost,//данные
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	  	//вывод результата в консоль
	    console.log(jsondata);
	    //переменная для вставки в сайт
	    var div = '';
	    //проверка ошибок
	    if(jsondata == ""){
	    	alert('Ошибка обновления поезда');
	    } else if (jsondata['error'] == 'not found rights') {
	    	alert('Вы не являетесь администратором');
	    } else if(jsondata['error'] == 'update'){
	    	alert('Произошла ошибка обновления данных поезда');
	    } else {
	    	alert('Обновление данных поезда, успешно выполнена');
	    	get_trains(1);
	    }
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

function start_update_train(id){
	//jquery селектору с классом row пристовить пустое значение
	$('.row').html('');
	/*var data = {id:id,
			  name:name,
			  tnum:tnum,
			  ccount:ccount,
			  pointFirst:pointFirst,
			  tpointFirst:tpointFirst,
			  pointSecond:pointSecond,
			  tpointSecond:tpointSecond};*/
	console.log(trains[id]);
	div = '';
	//рисуем форму создания нового рабочего дня
	div += '<form class="form-horizontal">'
		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="tname">Наименование поезда:</label>'
			div += '<div class="col-xs-9">'
				div += '<input type="text" class="form-control" id="tname" name="tname" value="'+trains[id]['name']+'">'
			div += '</div>'
		div += '</div>'
		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="number">Номер поезда:</label>'
			div += '<div class="col-xs-9">'
				div += '<input type="text" class="form-control" id="number" name="number" value="'+trains[id]['tnum']+'" onkeyup="return check_chose(this);" onkeypress="return check_chose(this);">'
			div += '</div>'
		div += '</div>'
		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="ccol">Количество вагонов:</label>'
			div += '<div class="col-xs-9">'
					  div += '<input type="text" class="form-control" id="ccol" name="ccol" value="'+trains[id]['ccount']+'" onkeyup="return check_chose(this);" onkeypress="return check_chose(this);">'
			div += '</div>'
		div += '</div>'
		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="pointA">Станция отправления:</label>'
			div += '<div class="col-xs-9">'
					  div += '<input type="text" class="form-control" id="pointA" name="pointA" value="'+trains[id]['pointFirst']+'">'
			div += '</div>'
		div += '</div>'
		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="pointB">Станция прибытия:</label>'
			div += '<div class="col-xs-9">'
					  div += '<input type="text" class="form-control" id="pointB" name="pointB" value="'+trains[id]['pointSecond']+'">'
			div += '</div>'
		div += '</div>'

		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="date">Дата отправления:</label>'
			div += '<div class="col-xs-9">'
				div += '<div class="input-group date " id="tpointA">'
					div += '<input type="text" class="form-control" name="tpointA" value="'+trains[id]['tpointFirst']+'" onkeyup="return proverka(this);" onkeypress="return proverka(this);"/>'
					div += '<span class="input-group-addon">'
						div += '<span class="glyphicon glyphicon-calendar" onclick="set_date(1);"></span>'
					div += '</span>'
				div += '</div>'
			div += '</div>'
		div += '</div>'

		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="date">Дата прибытия:</label>'
			div += '<div class="col-xs-9">'
				div += '<div class="input-group date " id="tpointB">'
					div += '<input type="text" class="form-control" name="tpointB" value="'+trains[id]['tpointSecond']+'" onkeyup="return proverka(this);" onkeypress="return proverka(this);"/>'
					div += '<span class="input-group-addon">'
						div += '<span class="glyphicon glyphicon-calendar" onclick="set_date(2);"></span>'
					div += '</span>'
				div += '</div>'
			div += '</div>'
		div += '</div>'

		div += '<div class="form-group">'
			div += '<div class="col-xs-offset-3 col-xs-9">'
				div += '<button type="button" class="btn btn-default" onclick="update_train('+trains[id]['id']+');">Обновить</button>'
			div += '</div>'
		div += '</div>'
	div += '</form>';
	//вставляем результат рисовки
	$('.row').html(div);
}

function start_update_schedule(id){
	console.log(schedule[id]);
	$('.row').html('');
	div = '';
	div += '<form class="form-horizontal">'
		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="station">Станция:</label>'
			div += '<div class="col-xs-9">'
				div += '<input type="text" class="form-control" id="station" name="station" value="'+schedule[id]['pointStation']+'">'
			div += '</div>'
		div += '</div>'

		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="date">Дата прибытия:</label>'
			div += '<div class="col-xs-9">'
				div += '<div class="input-group date " id="tpointB">'
					div += '<input type="text" class="form-control" name="tpointB" value="'+schedule[id]['tpointStop']+'"onkeyup="return proverka(this);" onkeypress="return proverka(this);"/>'
					div += '<span class="input-group-addon">'
						div += '<span class="glyphicon glyphicon-calendar" onclick="set_date(2);"></span>'
					div += '</span>'
				div += '</div>'
			div += '</div>'
		div += '</div>'

		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="date">Дата отправления:</label>'
			div += '<div class="col-xs-9">'
				div += '<div class="input-group date " id="tpointA">'
					div += '<input type="text" class="form-control" name="tpointA" value="'+schedule[id]['tpointStart']+'" onkeyup="return proverka(this);" onkeypress="return proverka(this);"/>'
					div += '<span class="input-group-addon">'
						div += '<span class="glyphicon glyphicon-calendar" onclick="set_date(1);"></span>'
					div += '</span>'
				div += '</div>'
			div += '</div>'
		div += '</div>'


		div += '<div class="form-group">'
			div += '<label class="control-label col-xs-3" for="tcol">Количество минут:</label>'
			div += '<div class="col-xs-9">'
					  div += '<input type="text" class="form-control" id="tcol" name="tcol" value="'+schedule[id]['tpointStay']+'" onkeyup="return check_chose(this);" onkeypress="return check_chose(this);">'
			div += '</div>'
		div += '</div>'
		div += '<div class="form-group">'
			div += '<div class="col-xs-offset-3 col-xs-9">'
				div += '<button type="button" class="btn btn-primary" onclick="update_schedule('+schedule[id]['id']+');">Обновить расписание</button>'
			div += '</div>'
		div += '</div>'
	div += '</form>';
	//вставляем результат рисовки
	$('.row').html(div);
}

function update_schedule(sid){
	var station = $('input[name=station]').val();
	var tpointA = $('input[name=tpointA]').val();
	var tpointB = $('input[name=tpointB]').val();
	var tpointS = $('input[name=tcol]').val();

	var dataPost = {pointStation:station,tpointStay:tpointS,tpointStart:tpointA,tpointStop:tpointB,id:sid}
	console.log(dataPost);
	$.ajax({
	  type: "POST",//тип запроса
	  url: '../controller.php?id=edit_schedule',//адрес запроса
	  dataType: "json",//формат данных
	  data: dataPost,//данные
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	  	//вывод результата в консоль
	    console.log(jsondata);
	    //переменная для вставки в сайт
	    var div = '';
	    //проверка ошибок
	    if(jsondata == ""){
	    	alert('Произошла ошибка');
	    } else if (jsondata['error'] == 'not found rights') {
	    	alert('Вы не являетесь администратором');
	    } else if(jsondata['error'] == 'update'){
	    	alert('Произошла ошибка обновления расписания');
	    } else {
	    	alert('Обновление расписания прошло успешно');
	    	get_trains(1);
	    }
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

function del_schedule(sid){
	var dataPost = {sid:sid};
	$.ajax({
	  type: "POST",//тип запроса
	  url: '../controller.php?id=del_train',//адрес запроса
	  dataType: "json",//формат данных
	  data: dataPost,//данные
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	  	if(jsondata == ""){
	    	alert('Произошла ошибка');
	    } else if (jsondata['error'] == 'not found rights') {
	    	alert('Вы не являетесь администратором');
	    } else if(jsondata['error'] == 'schedule deleted'){
	    	alert('Поезд не удален');
	    }  else if(jsondata['error'] == 'incorrect data'){
			alert('Данные не верны');
	    } else {
	    	get_trains(1);
	    }
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

function del_carriage(cid){
	var dataPost = {cid:cid};
	$.ajax({
	  type: "POST",//тип запроса
	  url: '../controller.php?id=del_carriage',//адрес запроса
	  dataType: "json",//формат данных
	  data: dataPost,//данные
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	  	if(jsondata == ""){
	    	alert('Произошла ошибка');
	    } else if (jsondata['error'] == 'not found rights') {
	    	alert('Вы не являетесь администратором');
	    } else if(jsondata['error'] == 'place deleted'){
	    	alert('Места вагонов поезда не удалены');
	    } else if(jsondata['error'] == 'incorrect data'){
			alert('Данные не верны');
	    } else {
	    	get_trains(1);
	    }
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

function update_carriage(cid){
	var new_cnum = prompt("Введите номер вагона:");
	if(new_cnum != null){
		var dataPost = {cnum:new_cnum,id:cid};
		$.ajax({
		  type: "POST",//тип запроса
		  url: '../controller.php?id=edit_carriage',//адрес запроса
		  dataType: "json",//формат данных
		  data: dataPost,//данные
		  //в случае успеха срабатывает событие
		  success: function(jsondata){
		  	if(jsondata == ""){
		    	alert('Произошла ошибка');
		    } else if (jsondata['error'] == 'not found rights') {
		    	alert('Вы не являетесь администратором');
		    } else if(jsondata['error'] == 'update'){
		    	alert('Произошла ошибка обновления вагона');
		    } else {
		    	alert('Номер вагона успешно обновлен');
		    	get_trains(1);
		    }
		  },
		  //событие в случае ошибки
		  error: function(jqxhr, status, errorMsg) {
		  		//вывод сообщения ошибки в консоль
		  		console.log(errorMsg);
				}
		});
	}
}

function update_place(pid){
	var new_pnum = prompt("Введите номер места:");
	var new_cost = prompt("Введите стоимость:");
	if(new_pnum != null && new_cost != null){
		var dataPost = {pnum:new_pnum,cost:new_cost,id:pid};
		$.ajax({
		  type: "POST",//тип запроса
		  url: '../controller.php?id=edit_place',//адрес запроса
		  dataType: "json",//формат данных
		  data: dataPost,//данные
		  //в случае успеха срабатывает событие
		  success: function(jsondata){
		  	if(jsondata == ""){
		    	alert('Произошла ошибка');
		    } else if (jsondata['error'] == 'not found rights') {
		    	alert('Вы не являетесь администратором');
		    } else if(jsondata['error'] == 'update'){
		    	alert('Произошла ошибка обновления места');
		    } else {
		    	alert('Место успешно обновлено');
		    	get_trains(1);
		    }
		  },
		  //событие в случае ошибки
		  error: function(jqxhr, status, errorMsg) {
		  		//вывод сообщения ошибки в консоль
		  		console.log(errorMsg);
				}
		});
	}
}

function del_place(pid){
	var dataPost = {pid:pid};
	$.ajax({
	  type: "POST",//тип запроса
	  url: '../controller.php?id=del_place',//адрес запроса
	  dataType: "json",//формат данных
	  data: dataPost,//данные
	  //в случае успеха срабатывает событие
	  success: function(jsondata){
	  	if(jsondata == ""){
	    	alert('Произошла ошибка');
	    } else if (jsondata['error'] == 'not found rights') {
	    	alert('Вы не являетесь администратором');
	    } else if(jsondata['error'] == 'place deleted'){
	    	alert('Места вагонов поезда не удалены');
	    }  else if(jsondata['error'] == 'incorrect data'){
			alert('Данные не верны');
	    } else {
	    	get_trains(1);
	    }
	  },
	  //событие в случае ошибки
	  error: function(jqxhr, status, errorMsg) {
	  		//вывод сообщения ошибки в консоль
	  		console.log(errorMsg);
			}
	});
}

//Виджет даты
function set_date(id){
	switch(id){
		case 1:
			$(function () {
			    //Установим для виджета русскую локаль с помощью параметра language и значения ru и убираем выбор времени
			    $('#tpointA').datetimepicker(
			      {/*pickTime: false,*/ language: 'ru', useSeconds: true,}
			    );
			  });
			break;
		case 2:
			$(function () {
			    //Установим для виджета русскую локаль с помощью параметра language и значения ru и убираем выбор времени
			    $('#tpointB').datetimepicker(
			      {/*pickTime: false,*/ language: 'ru', useSeconds: true,}
			    );
			  });
			break;
	}
}

//Виджет времени
function set_time(id){
  switch(id){
  	case 1:
  		$(function () {
		    //Установим для виджета русскую локаль с помощью параметра language и значения ru убираем выбор даты и добавляем выбор секунд
		    $('#stime1').datetimepicker(
		      {pickDate: false, language: 'ru', format:'i'}
		    );
		});
  		break;
  	case 2:
  	  	$(function () {
		    //Установим для виджета русскую локаль с помощью параметра language и значения ru убираем выбор даты и добавляем выбор секунд
		    $('#stime2').datetimepicker(
		      {pickDate: false, useSeconds: true, language: 'ru'}
		    );
		});
  		break;
  }
}

//проверка на числа
function check_chose(input){
	//получение значения поля ввода
    var value = input.value;
    //регулярное выражения для проверки
	var rep = /[-;":'a-zA-Zа-яА-Я\\=`ё/\*++!@#$%\^&_№?><]/; 
    if (rep.test(value)) { 
    	//если нашли символ заменяем пустой строкой
        value = value.replace(rep, ''); 
        //выводим в текстовое поле
        input.value = value; 
    }
}
//Проверка символов
function proverka(input) { 
	//получение значения поля ввода
    var value = input.value; 
    //регулярное выражения для проверк
    var rep = /[-;"'0-9&!@#$%^&*()+_a-zA-Zа-яА-Я]/; 
    if (rep.test(value)) { 
    	//если нашли символ заменяем пустой строкой
        value = value.replace(rep, ''); 
        //выводим в текстовое поле
        input.value = value; 
    } 
}

function statistics_search(srch){
	switch(srch){
		case 'period':
			var tpointA = $('input[name=tpointA]').val();
			var tpointB = $('input[name=tpointB]').val();
			var search = {tpointA:tpointA,tpointB:tpointB};
			var num = 2;
			break;
		case 'tnum':
			var search = $('select[name=someSelect]').val();
			var num = 3;
			break;
		case 'schedule':
			var search = $('select[name=scheduleSelect]').val();
			var num = 4;
			break;
		case 'cnum':
			var search = $('select[name=carriageSelect]').val();
			var num = 5;
			break;
		case 'pnum':
			var search = $('select[name=placeSelect]').val();
			var num = 6;
			break;
	}
	//var search = $('input[name="q"]').val();
	var dataPost = {srch: srch, search: search};
	console.log(dataPost);
	$.ajax({
	  type: "POST",
	  url: "../controller.php?id=statistics_search",
	  dataType: "json",
	  data: dataPost,
	  success: function(jsondata){
	    //$('.results').html(jsondata);
	    console.log(jsondata);
	    var div = '';
	    if(jsondata == ""){
	    	$('.results').html('<span style="color: red;">Ничего не найдено</span>');
	    } else if(jsondata['error'] == 'not found rights') {
	    	$('.results').html('<span style="color: red;">Вы не являетесь администратором</span>');
	    } else {
	    	switch(num){
	    		case 2:
	    			var str_buy = '';
	    			var str_train;
			    	if ((jsondata['bcount'] === 1) || (jsondata['bcount'] > 20 && jsondata['bcount'] % 10 === 1)){
			    		str_buy = '<h2>Продан '+jsondata['bcount']+' билет</h2><br><br>';
			    	} else if ((jsondata['bcount'] >= 2 && jsondata['bcount'] <= 4) || (jsondata['bcount'] > 20 && jsondata['bcount'] % 10 >= 2 && jsondata['bcount'] % 10 <= 4)){
			    		str_buy = '<h2>Продано '+jsondata['bcount']+' билета</h2><br><br>';
			    	} else {
			    		str_buy = '<h2>Продано '+jsondata['bcount']+' билетов</h2><br><br>';
			    	}
			    	if ((jsondata['tcount'] === 1) || (jsondata['tcount'] > 20 && jsondata['tcount'] % 10 === 1)){
			    		str_train  = ' поезд';
			    	} else if ((jsondata['tcount'] >= 2 && jsondata['tcount'] <= 4) || (jsondata['tcount'] > 20 && jsondata['tcount'] % 10 >= 2 && jsondata['tcount'] % 10 <= 4)){
			    		str_train = ' поезда';
			    	} else {
			    		str_train = ' поездов';
			    	}
	    			div += '<h2>За указанный период, найдено '+jsondata['tcount']+str_train+'</h2>'+str_buy
	    			break;
	    		case 3:
	    			for(var count_cnum in jsondata['cnum']){
	    				div += '<h2>В вагоне № '+count_cnum+' количество мест '+jsondata['cnum'][count_cnum]+'</h2>'
	    			}
	    			div += '<br><br>'
	    			break;
	    		case 4:
	    			var busy = '';
	    			var freely;
			    	if ((jsondata['busy'] === 1) || (jsondata['busy'] > 20 && jsondata['busy'] % 10 === 1)){
			    		busy = ' место';
			    		freely  = ' место';
			    	} else if ((jsondata['busy'] >= 2 && jsondata['busy'] <= 4) || (jsondata['busy'] > 20 && jsondata['busy'] % 10 >= 2 && jsondata['busy'] % 10 <= 4)){
			    		busy = ' места';
			    		freely = ' места';
			    	} else {
			    		busy = ' мест';
			    		freely = ' мест';
			    	}
			    	if ((jsondata['freely'] === 1) || (jsondata['freely'] > 20 && jsondata['freely'] % 10 === 1)){
			    		freely  = ' место';
			    	} else if ((jsondata['freely'] >= 2 && jsondata['freely'] <= 4) || (jsondata['freely'] > 20 && jsondata['freely'] % 10 >= 2 && jsondata['freely'] % 10 <= 4)){
			    		freely = ' места';
			    	} else {
			    		freely = ' мест';
			    	}
	    			div += '<h2>Занято '+jsondata['busy']+busy+'</h2>'
	    			div += '<h2>Свободно '+jsondata['freely']+freely+'</h2><br><br>'
	    			break;
	    		case 5:
	    			var str_buy = '';
			    	if ((jsondata['pnum'] === 1) || (jsondata['pnum'] > 20 && jsondata['pnum'] % 10 === 1)){
			    		str_buy = ' место';
			    	} else if ((jsondata['pnum'] >= 2 && jsondata['pnum'] <= 4) || (jsondata['pnum'] > 20 && jsondata['pnum'] % 10 >= 2 && jsondata['pnum'] % 10 <= 4)){
			    		str_buy = ' места';
			    	} else {
			    		str_buy = ' мест';
			    	}
	    			div += '<h2>Куплено '+jsondata['pnum']+str_buy+'</h2>'
	    			div += '<h2>Общая выручка составляет: '+jsondata['buy']+' р.</h2><br><br>'
	    			break;
	    		case 6:
	    			break;
	    	}
	    	div += '<div class="table-responsive">'
		    	div += '<table class="table table-hover">'
		    		div += '<thead>'
		    		div += '<tr>'
		    			div += '<td align="center">Поезд</td>'
						div += '<td align="center">№ поезда</td>'
						div += '<td align="center">Отправление</td>'
						div += '<td align="center">Прибытие</td>'
						div += '<td align="center">Время отправления</td>'
						div += '<td align="center">Время прибытия</td>'
						div += '<td align="center">№ вагона</td>'
						div += '<td align="center">№ места</td>'
						div += '<td align="center">Стоимость</td>'
						div += '<td align="center">Куплен</td>'
						div += '<td align="center">Покупатель</td>'
		    		div += '</tr>'
		    		div += '</thead>'
		    		div += '<tbody>'
	    		for(var index in jsondata['data']){
	    			//console.log(jsondata[index]['user']);
	    				div += '<tr>'
	    					div += '<td align="center">'+jsondata['data'][index]['name']+'</td>'
							div += '<td align="center">'+jsondata['data'][index]['tnum']+'</td>'
	    					div += '<td align="center">'+jsondata['data'][index]['pointFirst']+'</td>'
							div += '<td align="center">'+jsondata['data'][index]['pointSecond']+'</td>'
							div += '<td align="center">'+jsondata['data'][index]['tpointFirst']+'</td>'
							div += '<td align="center">'+jsondata['data'][index]['tpointSecond']+'</td>'
							div += '<td align="center">'+jsondata['data'][index]['cnum']+'</td>'
							div += '<td align="center">'+jsondata['data'][index]['pnum']+'</td>'
							div += '<td align="center">'+jsondata['data'][index]['cost']+'</td>'
							if(jsondata['data'][index]['buy'] == 0){
							div += '<td align="center">Нет</td>'
							div += '<td align="center"> - </td>'
							} else {
							div += '<td align="center">Да</td>'
							div += '<td align="center">'+jsondata['data'][index]['fio']+'</td>'
							}
		    			div += '</tr>'
	    		}
	    			div += '</tbody>'
	    		div += '</table>'
	    	div += '</div>'

    	$('.results'+num).html(div);
    	//console.log(jsondata);
	    }
	  },
	  error: function(jqxhr, status, errorMsg) {
	  		console.log(errorMsg);
			}
	});
}
function get_statistics(){
	$('.row').html('');
	$.ajax({
	  dataType: 'json',
	  url: '../controller.php?id=statistics',
	  success: function(jsondata){
	    //$('.results').html(jsondata);
	    console.log(jsondata);
	    var div = '';
	    if(jsondata === ""){
	    	$('.row').html('<span style="color: red;">Ничего не найдено</span>');
	    } else if(jsondata['error'] == 'not found rights') {
	    	$('.row').html('<span style="color: red;">Вы не являетесь администратором</span>');
	    } else {
	    		div += '<div class="container">'
		    		div += '<ul class="nav nav-tabs">'
			    		div += '<li class="active"><a data-toggle="tab" href="#panel1">Общая</a></li>'
			    		div += '<li><a data-toggle="tab" href="#panel2">Период</a></li>'
			    		div += '<li><a data-toggle="tab" href="#panel3">Поезд</a></li>'
			    		div += '<li><a data-toggle="tab" href="#panel4">Расписание</a></li>'
			    		div += '<li><a data-toggle="tab" href="#panel5">Вагон</a></li>'
			    		div += '<li><a data-toggle="tab" href="#panel6">Места</a></li>'
		    		div += '</ul>'
	    		div += '<div class="tab-content">'
		    		div += '<div id="panel1" class="tab-pane fade in active" style="padding-top: 10px;">'
				    	//console.log(jsondata.lenght);
				    	//if(jsondata.length > 0){
				    		for(var index in jsondata){
				    			div += '<div class="panel-group" id="collapse-group">'
				    				div += '<div class="panel panel-default">'
				    					div += '<div class="panel-heading">'
				    						div += '<h4 class="panel-title">'
				    							div += '<a data-toggle="collapse" data-parent="#collapse-group" href="#el'+index+'">Поезд №'+jsondata[index]['train']['tnum']+' - '+jsondata[index]['train']['name']+'</a>'
				    						div += '</h4>'
				    					div += '</div>'

				    					div += '<div id="el'+index+'" class="panel-collapse collapse">'
				    						div += '<div class="panel-body">'
				    						if(jsondata[index]['data'].length > 0){
				    							div += '<div class="table-responsive">'
													div += '<table class="table table-hover">'
											    		div += '<thead>'
												    		div += '<tr>'
												    			div += '<td align="center">Отправление</td>'
												    			div += '<td align="center">Прибытие</td>'
												    			div += '<td align="center">Время отправления</td>'
												    			div += '<td align="center">Время прибытия</td>'
												    			div += '<td align="center">№ вагона</td>'
												    			div += '<td align="center">№ места</td>'
												    			div += '<td align="center">Стоимость</td>'
												    			div += '<td align="center">Куплен</td>'
												    			div += '<td align="center">Покупатель</td>'
												    		div += '</tr>'
											    		div += '</thead>'
											    		div += '<tbody>'
											    		for(var key in jsondata[index]['data']){
											    			div += '<tr>'
																div += '<td align="center">'+jsondata[index]['data'][key]['pointFirst']+'</td>'
																div += '<td align="center">'+jsondata[index]['data'][key]['pointSecond']+'</td>'
																div += '<td align="center">'+jsondata[index]['data'][key]['tpointFirst']+'</td>'
																div += '<td align="center">'+jsondata[index]['data'][key]['tpointSecond']+'</td>'
																div += '<td align="center">'+jsondata[index]['data'][key]['cnum']+'</td>'
																div += '<td align="center">'+jsondata[index]['data'][key]['pnum']+'</td>'
																div += '<td align="center">'+jsondata[index]['data'][key]['cost']+'</td>'
																if(jsondata[index]['data'][key]['buy'] == 0){
																div += '<td align="center">Нет</td>'
																div += '<td align="center"> - </td>'
																} else {
																div += '<td align="center">Да</td>'
																div += '<td align="center">'+jsondata[index]['data'][key]['fio']+'</td>'
																}
															div += '</tr>'
											    		}
											    		div += '</tbody>'
								    				div += '</table>'
				    						}
				    							div += '</div>'
								    		div += '</div>'
								    	div += '</div>'
				    				div += '</div>'
				    			div += '</div>'			
				    		}
				    div += '</div>'
				    	//}

		    		div += '<div id="panel2" class="tab-pane fade" style="padding-top: 10px;">'
				    		div += '<form class="form-horizontal">'
					    		div += '<div class="form-group">'
									div += '<label class="control-label col-xs-3" for="date">От:</label>'
									div += '<div class="col-xs-9">'
										div += '<div class="input-group date " id="tpointB">'
											div += '<input type="text" class="form-control" name="tpointB" onkeyup="return proverka(this);" onkeypress="return proverka(this);"/>'
											div += '<span class="input-group-addon">'
												div += '<span class="glyphicon glyphicon-calendar" onclick="set_date(2);"></span>'
											div += '</span>'
										div += '</div>'
									div += '</div>'
								div += '</div>'

								div += '<div class="form-group">'
									div += '<label class="control-label col-xs-3" for="date">До:</label>'
									div += '<div class="col-xs-9">'
										div += '<div class="input-group date " id="tpointA">'
											div += '<input type="text" class="form-control" name="tpointA" onkeyup="return proverka(this);" onkeypress="return proverka(this);"/>'
											div += '<span class="input-group-addon">'
												div += '<span class="glyphicon glyphicon-calendar" onclick="set_date(1);"></span>'
											div += '</span>'
										div += '</div>'
									div += '</div>'
								div += '</div>'

								div += '<div class="form-group">'
									div += '<div class="col-xs-offset-3 col-xs-9">'
										div += '<button class="btn btn-default" type="button" onclick="statistics_search(\'period\');"><i class="glyphicon glyphicon-search">&nbsp;Найти</i></button>'
									div += '</div>'
								div += '</div>'
				    		div += '</form>'
				    		div += '<div class="results2"></div>'
		    		div += '</div>'

		    		div += '<div id="panel3" class="tab-pane fade" style="padding-top: 10px;">'
				    	div += '<form class="form-horizontal">'
				    			
				    		div += '<div class="form-group">'
								div += '<label class="control-label col-xs-3" for="col">Номер вагона:</label>'
								div += '<div class="col-xs-9">'
									div += '<select class="form-control" name="someSelect" id="myselect">'
										for(var tnum in jsondata){
											div += '<option value="'+tnum+'">'+'Поезд № '+jsondata[tnum]['train']['tnum']+' Вагон № '+jsondata[tnum]['train']['tnum']+'</option>';
										}
									div += '</select>'
								div += '</div>'
							div += '</div>'

							div += '<div class="form-group">'
								div += '<div class="col-xs-offset-3 col-xs-9">'
									div += '<button class="btn btn-default" type="button" onclick="statistics_search(\'tnum\');"><i class="glyphicon glyphicon-search">&nbsp;Найти</i></button>'
								div += '</div>'
							div += '</div>'

				    	div += '</form>'
				    	div += '<div class="results3"></div>'
		    		div += '</div>'

		    		div += '<div id="panel4" class="tab-pane fade" style="padding-top: 10px;">'
				    	div += '<form class="form-horizontal">'
				    			
				    		div += '<div class="form-group">'
								div += '<label class="control-label col-xs-3" for="col">Номер вагона:</label>'
								div += '<div class="col-xs-9">'
									div += '<select class="form-control" name="scheduleSelect" id="myselect">'
										for(var cnum in jsondata){
											for(var index in jsondata[cnum]['schedule'])
											div += '<option value="'+jsondata[cnum]['schedule'][index]['id']+'">'+jsondata[cnum]['schedule'][index]['pointStation']+'</option>';
										}
									div += '</select>'
								div += '</div>'
							div += '</div>'

							div += '<div class="form-group">'
								div += '<div class="col-xs-offset-3 col-xs-9">'
									div += '<button class="btn btn-default" type="button" onclick="statistics_search(\'schedule\');"><i class="glyphicon glyphicon-search">&nbsp;Найти</i></button>'
								div += '</div>'
							div += '</div>'

				    	div += '</form>'
				    	div += '<div class="results4"></div>'
		    		div += '</div>'

		    		div += '<div id="panel5" class="tab-pane fade" style="padding-top: 10px;">'
				    	div += '<form class="form-horizontal">'
				    			
				    		div += '<div class="form-group">'
								div += '<label class="control-label col-xs-3" for="col">Номер вагона:</label>'
								div += '<div class="col-xs-9">'
									div += '<select class="form-control" name="carriageSelect" id="myselect">'
										for(var cnum in jsondata){
											for(var index in jsondata[cnum]['carriage'])
											div += '<option value="'+jsondata[cnum]['carriage'][index]['id']+'">'+'Поезд № '+jsondata[cnum]['train']['tnum']+' Вагон № '+jsondata[cnum]['carriage'][index]['cnum']+'</option>';
										}
									div += '</select>'
								div += '</div>'
							div += '</div>'

							div += '<div class="form-group">'
								div += '<div class="col-xs-offset-3 col-xs-9">'
									div += '<button class="btn btn-default" type="button" onclick="statistics_search(\'cnum\');"><i class="glyphicon glyphicon-search">&nbsp;Найти</i></button>'
								div += '</div>'
							div += '</div>'

				    	div += '</form>'
				    	div += '<div class="results5"></div>'
		    		div += '</div>'

		    		div += '<div id="panel6" class="tab-pane fade" style="padding-top: 10px;">'
				    	div += '<form class="form-horizontal">'
				    			
				    		div += '<div class="form-group">'
								div += '<label class="control-label col-xs-3" for="col">Номер места:</label>'
								div += '<div class="col-xs-9">'
									div += '<select class="form-control" name="placeSelect" id="myselect">'
										for(var cnum in jsondata){
											for(var index in jsondata[cnum]['place'])
											div += '<option value="'+jsondata[cnum]['place'][index]['id']+'">'+'Поезд № '+jsondata[cnum]['train']['tnum']+' Место № '+jsondata[cnum]['place'][index]['pnum']+'</option>';
										}
									div += '</select>'
								div += '</div>'
							div += '</div>'

							div += '<div class="form-group">'
								div += '<div class="col-xs-offset-3 col-xs-9">'
									div += '<button class="btn btn-default" type="button" onclick="statistics_search(\'pnum\');"><i class="glyphicon glyphicon-search">&nbsp;Найти</i></button>'
								div += '</div>'
							div += '</div>'

				    	div += '</form>'
				    	div += '<div class="results6"></div>'
		    		div += '</div>'

	    		div += '</div>'
    	$('.row').html(div);
	    }
	  },
	  error: function(jqxhr, status, errorMsg) {
	  		console.log(errorMsg);
			}
	});
}