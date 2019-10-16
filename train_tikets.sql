-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Ноя 28 2016 г., 17:03
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `train_tikets`
--

-- --------------------------------------------------------

--
-- Структура таблицы `carriage`
--

CREATE TABLE IF NOT EXISTS `carriage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cnum` int(11) NOT NULL DEFAULT '0',
  `tid` int(11) NOT NULL DEFAULT '0' COMMENT 'ID поезда',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Вагон' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `place`
--

CREATE TABLE IF NOT EXISTS `place` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL DEFAULT '0' COMMENT 'ID вагона',
  `tid` int(11) NOT NULL DEFAULT '0' COMMENT 'ID поезда',
  `cost` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Место в вагоне' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `reservations`
--

CREATE TABLE IF NOT EXISTS `reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) NOT NULL DEFAULT '0' COMMENT 'ID поезда',
  `uid` int(11) NOT NULL DEFAULT '0' COMMENT 'ID пользователя',
  `cid` int(11) NOT NULL DEFAULT '0' COMMENT 'ID вагона',
  `sid` int(11) NOT NULL DEFAULT '0' COMMENT 'ID расписания',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `snum` int(11) NOT NULL DEFAULT '0' COMMENT 'Номер расписания',
  `pointA` varchar(255) NOT NULL DEFAULT '',
  `pointB` varchar(255) NOT NULL DEFAULT '',
  `tpointA` int(11) NOT NULL DEFAULT '0' COMMENT 'Время отправления',
  `tpointB` int(11) NOT NULL DEFAULT '0' COMMENT 'Время прибытия',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Расписание' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `train`
--

CREATE TABLE IF NOT EXISTS `train` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `tnum` int(11) NOT NULL DEFAULT '0' COMMENT 'Номер поезда',
  `ccount` int(11) NOT NULL DEFAULT '0' COMMENT 'Количество вагонов',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;


-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `fio` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `admin` int(11) NOT NULL DEFAULT '0',
  `d_create` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `fio`, `email`, `admin`, `d_create`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'Зверев Игорь Александрович', 'admin@admin.com', 1, 1480233221);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
