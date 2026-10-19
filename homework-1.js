const readline = require('node:readline/promises');

//======================================================
// 1. БИЛЕТНАЯ КАССА
//======================================================
// Возвращает цену билета по категрии switch сравнивает category с каждым case строго

function ticketPrice(category) {
    switch(category) {
        case 1:
            return 300;
            case 2:
                return 500;
                case 3:
                    return 900;
                    default:
                        // Любая другая категория: цены нет.
                        return 0;
    }
}
//Считаем сколько билетов по цене price можно купить на бюджет budget. Делить и округлять нельзя покупаем билеты по одному.
//Пока денег хватает на билет - отнимаем цену и увеличиваем счетчик.

function maxTickets(budget, price) {
    let count = 0;                    //сколько билетов уже купили
    while (budget >= price) {         // хватает ли денег ещё на один билет?
        budget = budget - price;      // заплатили за билет
        count++;                      // билетов стало на один больше
    }
    return count;                     // возвращаем результат, а не печатем
}
 
//Вызывает первые две функции и печатате результат кассы.
function printTicketResult(category, budget) {
    const price = ticketPrice(category);

    //Цена 0 означает, что такой категории нет.
    if (price === 0) {
        console.log ('неизвестная категория');
        return; //выход из функции, чек не печатается
    }

    const count = maxTickets(budget, price);
    console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`);
}

//======================================================
// 2. ДОСТАВКА ЗАКАЗА
//======================================================
// Возвращает стоимость доставки.
//Проверки идут вниз: первое подходящее правило сразу возвращает ответ, остальные уже не проверяются.
function deliveryPrice (distance, total) {
    // Заказ от 3000 руб. - доставка бесплатна при любом расстоянии.
    if (total >= 3000) {
        return 0;
    }
    // До 3 км включительно - бесплатно.
    if (distance <= 3) {
        return 0;
    }
    // От 4 до 10 км включительно - 200 руб. (меньше 4 сюда не дойдёт)
    if (distance <= 10) {
        return 200;
    }
    // Дальше 10 км - 200 руб. и еще 25 руб. за каждый км после десятого.
    return 200 + (distance - 10) * 25;
}

//Вызывает расчёт и печтает одну строку с результатом.
function printDelivery(distance, total) {
    const price = deliveryPrice (distance, total);
    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

//======================================================
// 3. ЛЕСТНИЦА
//======================================================

//Печатате номера ступеней от 1 до height с двумя исключениями:ступень 4 не строят, а после 10 строительство останавливается.
function printSteps(height) {
    let built = 0; // сколько ступеней реально построено
    for (let i = 1; i <= height; i++) {
        // 4 ступень пропускаем: continue сразу переходит к следующему обороту, печать и счётчик не выполняются.
        if (i === 4) {
            continue;
        }
        //Дощли до 11 - значит, 10 позади. Сообщаем об остановке и выходим из цикла через break.
        if (i>10) {
            console.log('Дальше лестница не построена')
            break;
        }

        console.log(`Ступень ${i}`);
        built++; //считаем только напечатанные ступени
    }

    //Выполняется после цикла в любом случае.
    console.log(`Всего построено: ${built}`);
}

//======================================================
// МЕНЮ
//======================================================

async function main() {
    const rl = readline.createInterface({ input: process.stdin, output:process.stdout });
    console.log('Выберите задачу:');
    console.log('1 - билетная касса');
    console.log('2 - доставка заказа');
    console.log('3 - лестница');

    // Ответ приходит строкой, Number() превращает его в число для switch.
    const choice = Number(await rl.question('Ваш выбор: '));

    switch (choice) {
        case 1: {
            const category = Number(await rl.question('Категория билета: '));
            const budget = Number(await rl.question('Бюджет: '));
            printTicketResult(category, budget);
            break;
        }
        case 2: {
            const distance = Number(await rl.question('Расстояние: '));
            const total = Number(await rl.question('Сумма заказа: '));
            printDelivery(distance, total);
            break;
        }
        case 3: {
            const height = Number(await rl.question('Высота лестницы: '));
            printSteps(height);
            break;
        }
        default:
        //Введено что-то кроме 1, 2, 3.
        console.log('такой задачи нет');
    }
    rl.close();
}

main();