<?php
//Проверяем сессию
if(!isset($_SESSION)){
  //Если сессия не существует создаем
  session_start();
}
//Если не администратор
if($_SESSION['admin'] != 1){
  //visitor
  //Меню
	$html = '<nav role="navigation" class="nav nav-pills nav-stacked">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="http://traine-tikets.sl/page/main.php" class="navbar-brand"><img src="/img/rjd2.png"/></a>
    </div>
    <!-- Collection of nav links and other content for toggling -->
    <div id="navbarCollapse" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li><a onclick="get_trains(2);" style="cursor:pointer">Список поездов</a></li>
        <li><a onclick="get_reservations();" style="cursor:pointer">История бронирования билетов</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="http://traine-tikets.sl">Выход</a></li>
      </ul>
    </div>
  </div>
</nav>';
} else {
  //admin
    //Меню
    $html = '<nav role="navigation" class="nav nav-pills nav-stacked">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="http://record.sk/page/main.php" class="navbar-brand"><img src="/img/rjd2.png"/></a>
    </div>
    <!-- Collection of nav links and other content for toggling -->
    <div id="navbarCollapse" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li><a onclick="get_trains(1);" style="cursor:pointer">Список поездов</a></li>
        <li><a onclick="add_trains();" style="cursor:pointer">Добавить поезд</a></li>
        <li><a onclick="get_trains(3);" style="cursor:pointer">Добавить расписание</a></li>
        <li><a onclick="get_trains(4);" style="cursor:pointer">Места в вагонах</a></li>
        <li><a onclick="get_statistics();" style="cursor:pointer">Статистика</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <!--<li><a onclick="get_sessia();" style="cursor:pointer">Сессия</a></li>-->
        <li><a href="http://traine-tikets.sl">Выход</a></li>
      </ul>
    </div>
  </div>
</nav>';
}
//Вывод меню на страницу
echo $html;
?>