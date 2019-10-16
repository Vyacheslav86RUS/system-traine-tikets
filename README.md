# «Система анализа продаж билетов на подвижной состав»

Написать Web-приложение для обеспечения возможности продажи
билетов на поезд. Предусмотреть две роли: администратор и клиент. Для
клиента предусмотреть возможность регистрации в системе.

Администратор заполняет расписание движения, указывая:
1. маршрут, с указанием станции отправления и станции прибытия;
2. расписание движения для каждого маршрута (не менее 3 записей);
3. схема вагонов (не менее 3 мест), с указанием стоимости каждого
места;
4. состав поезда на маршруте как количество и тип вагонов (не
менее 3).

Клиент может
- просмотреть список маршрутов, а также свободных и занятых мест;
- приобрести билет на поезд
- сдать ранее приобретенный билет.

Система должна предотвращать возможность дублирования билетов
на одно и то же место.

Администратору предоставляется возможность просмотра статистики
о проданных билетах в следующих разрезах:
1. период;
2. поезд;
3. расписание;
4. вагон;
5. место