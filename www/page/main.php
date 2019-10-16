<?php
//Включаем сессию
session_start();
//Если не существует администратор
if(!isset($_SESSION['admin'])){
  //перенаправление на главную страницу
  header('Location: http://www.traine-tikets.sl');
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Home</title>

    <!-- Bootstrap -->
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/bootstrap-datetimepicker.min.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="../js/jquery-1.11.1.min.js"></script>
    <script src="../js/moment-with-locales.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/bootstrap-datetimepicker.min.js"></script>
    <script src="../js/main.js"></script>


  </head>
  <body style="background: silver;">
    <?php
      require_once('menu.php');
    ?>
  <div class="container" style="padding-top: 80px;">
    <div class="row">
      <!--<div class="results"></div>-->
    </div>
  </div>

<script type="text/javascript">
  function getval(sel,data){
    //alert(sel.value);
    //console.log(document.getElementById('place'));
    //console.log(document.getElementsByTagName('div'));
    for(var index in data){
      document.getElementById('place'+data[index]).style.display = "none";
    }
    document.getElementById('place'+sel.value).style.display = "block";
  }
</script>
    
  </body>
</html>