'use strict';

// Simply Bank App

const account1 = {
  userName: 'Konstantin Samartsev',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2021-01-22T12:17:46.255Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2022-10-30T14:43:31.074Z',
    '2022-11-01T14:43:31.074Z',
    '2022-11-03T14:43:31.074Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  userName: 'Kamile Pearle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-05-21T07:43:59.331Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const transDate = document.querySelector('.transactions__date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Функция принимающая на вход массив транзакций(transactions) из аккаунта пользователя(account) и выводящая ее на экран со своим порядковым номером

const displayTransaction = function(account, sort = false) { //sort для сортировки транзакций
    const transacs = sort ? account.transactions.slice().sort((x, y) => x - y) : account.transactions//что бы не сортировать исходный массив создаю копию slice, будет сортировать массив если sort = true

    //Очищаю контейнер от свойств заданных в нем по умолчанию
    // console.log(containerTransactions.innerHTML);
    containerTransactions.innerHTML = '';
   
    //Делаю отдельную функцию для отображения даты
    const formatTransactionDate = function(date) {
    const getDaysBetween2Dates = (date1, date2) => Math.round(Math.abs((date1 - date2)/(1000 * 60 * 60 * 24)));
    const daysPassed = getDaysBetween2Dates(new Date, date)
    if (daysPassed === 0) {
      return 'Сегодня';
      } else if (daysPassed === 1) {
        return 'Вчера'
      }else if (daysPassed <= 4) {
        return `${daysPassed} дня назад`
      }else if (daysPassed > 4 && daysPassed <= 7) {
        return `${daysPassed} дней назад`
      } else {
        // const day = `${date.getDate()}`.padStart(2, '0');
        // const month = `${date.getMonth() + 1}`.padStart(2, '0');
        // const year = date.getFullYear();
        const optionDate = {
          hour: 'numeric',
          minute: 'numeric',
          day: '2-digit',//устанавливает минимум две цифры в дне
          month: '2-digit',//устанавливает минимум две цифры в месяце
          year: 'numeric',
          weekday: 'long',
        };
        const dateTransaction = new Intl.DateTimeFormat(account.locale, optionDate).format(date);
        return dateTransaction;
      }
    }

    transacs.forEach(function(trans, index) {
      //помещаю дату в каждый <div class="transactions__date">
      const date = new Date(account.transactionsDates[index]);
      const transDate = formatTransactionDate(date);

      //Форматирую транзакцию
      const formattedTransaction = new Intl.NumberFormat(account.locale, {style: 'currency', currency: 'USD'}).format(trans);
    
      //Тернарный оператор определяющий тип транзакции депозит или снятие
      const transType = trans > 0 ? 'deposit' : 'withdrawal';
      const transType2 = trans > 0 ? 'ДЕПОЗИТ' : 'ВЫВОД СРЕДСТВ';
      const transactionRow = `
      <div class="transactions__row">
        <div class="transactions__type transactions__type--${transType}">
          ${index + 1} ${transType2}
        </div>
        <div class="transactions__date">${transDate}</div>
        <div class="transactions__value">${trans.toFixed(2)}$</div>
      </div>`;

    //Вставляю элеммент в html, каждый последующий сначала в выбранный контейнер transaction, пользуясь afterbegin
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

// displayTransaction(account1.transactions);


//модифицирую каждый из аккаунтов добавив в него новый элемент Nickname, это можно сделать используя forEach т.к он не создает новый массив а модифицирует старый

const createNickName = function(accs) {
  accs.forEach(function(acc) {
    const userNameArr = acc.userName.toLowerCase().split(' ');
    const nickName = userNameArr.map(name => name[0]).join('');
    // console.log(nickName); //вызывал для проверки
    acc.nickName = nickName;
  })
}
createNickName(accounts);


//Отображение текущего баланса

const balanceView = function(transactionArr) {
  const balance = transactionArr.reduce(function(acc, trans, index, arr) {
    return  acc + trans;
  }, 0);
  labelBalance.textContent = `${balance.toFixed(2)}$`;
}


//Вывод снятых с депозита средств
const withdrawalViev = function(transactionArr) {
  const withdrawalSumm = transactionArr
  .filter(trans => trans < 0)
  .reduce((acc, trans) => {return acc + trans}, 0);//была ошибка, не поставил 0 по умолчанию, если в транзакциях не было депозитов, выдавалась ошибка
  labelSumOut.textContent = `${(Math.abs(withdrawalSumm)).toFixed(2)}$`;
}


//Вывод положенных на депозит средств
const depositeViev = function(transactionArr) {
  const depositeSumm = transactionArr
  .filter(trans => trans > 0)
  .reduce((acc, trans) => {return acc + trans}, 0); //была ошибка, не поставил 0 по умолчанию, если в транзакциях не было выводов, выдавалась ошибка
  labelSumIn.textContent = `${(Math.abs(depositeSumm)).toFixed(2)}$`;
}

//начисление процентов на депозит
const interestView = function(transactionArr, interest) {
  const depositSumm = transactionArr
  .filter(trans => trans > 0)
  .map(trans => (trans * interest)/100)
  //убрал фильтром все начисления процентов меньше 5 долларов на депозиты(условие банка)
  .filter((interest, index, arr) => {/*console.log(arr)*/; return interest >= 5})
  .reduce((acc, trans) =>  acc + trans, 0);
  labelSumInterest.textContent = `${(Math.round(depositSumm)).toFixed(2)}$`;
}


const startLogoutTimer = function() {
  //Установить время выхода через 5 мин
  let time = 120;
  //Вызов таймера каждую секунду
  const logOutTimer = setInterval(function() {
    const minute = String(Math.trunc(time/60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    //В кажом вызове показывать оставшееся время в UI
    labelTimer.textContent = `${minute}:${seconds}`;
    //После истечения времени остановить таймер и выйти из приложения
    if (time === 0) {
      clearTimeout(logOutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Войдите в свой аккаунт';
    }
    time--;
  }, 1000)
  return logOutTimer;
};


let userAccount, currentLogOutTimer; //объявим переменную аккаунта глобально

btnLogin.addEventListener('click', function(e) {
  e.preventDefault();//не позволяет форме отправится и перезагрузить страницу
  
  //ищу в аккаунтах введенный никнейм и присваиваю аккаунт с этим ником переменной userAccount объявленой ранее
  userAccount = accounts.find(account => account.nickName === inputLoginUsername.value);

  //Установка даты
  const nowDate = new Date()
  const optionDate = {
    hour: 'numeric',
    minute: 'numeric',
    day: '2-digit',//устанавливает минимум две цифры в дне
    month: '2-digit',//устанавливает минимум две цифры в месяце
    year: 'numeric',
    weekday: 'long',//устанавливает полное название дня недели
  };
  labelDate.textContent = new Intl.DateTimeFormat(userAccount?.locale, optionDate).format(nowDate);
  // const day = `${nowDate.getDate()}`.padStart(2, '0'); //увеличиваю строку с начала до двух символов если она меньше 2-х, и символ заполнения будет 0
  // const month = `${nowDate.getMonth() + 1}`.padStart(2, '0');
  // const year = nowDate.getFullYear();
  // labelDate.textContent = `${day}/${month}/${year}`;

  if(userAccount?.pin === Number(inputLoginPin.value)) { //знак вопроса, проверяем на наличае оператором optional cheining, иначе будем получать ошибку
    
    
  //Меняю текст "Ввойдите в свой аккаунт" на приветственный и более жирный
  labelWelcome.textContent = `Добро пожаловать, ${userAccount.userName.split(' ')[0]}!`;
  labelWelcome.style.fontWeight = 'bold';

  //Очищаю input после залогинивания
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  //убираем курсор из input после ввода
  inputLoginUsername.blur();
  inputLoginPin.blur();
  inputClosePin.value = '';
  inputCloseUsername.value = '';

  // Запускаю таймер и проверяю был ли запущен уже таймер
  if(currentLogOutTimer) clearInterval (currentLogOutTimer) //если в currentLogOutTimer есть значение он будет уничтожен после чего создан новый таймер
  currentLogOutTimer = startLogoutTimer();//создан новый таймер

  //Помещу все эти функции в отдельную переменную

  // Функция принимающая на вход массив транзакций(transactions) из аккаунта пользователя(account) и выводящая ее на экран со своим порядковым номером
  displayTransaction(userAccount);


  //Отображение текущего баланса
  balanceView(userAccount.transactions);

  //Вывод снятых с депозита средств
  withdrawalViev(userAccount.transactions);

  //Вывод положенных на депозит средств
  depositeViev(userAccount.transactions);

  //начисление процентов на депозит
  interestView(userAccount.transactions, userAccount.interest);


  // Делаю видимым поле формы со счетом верифицированного аккаунта
  containerApp.style.opacity = 1;
  }
})



const updateUI = function(account) {
  displayTransaction(userAccount);
  balanceView(userAccount.transactions);
  withdrawalViev(userAccount.transactions);
  interestView(userAccount.transactions, userAccount.interest);
  containerApp.style.opacity = 1;
}


//Имплементация трансфера, перевод денег от одного пользователя, другому( find() )

btnTransfer.addEventListener('click', function(event) {
  event.preventDefault();//предотвращаю перезагрузку страницы
  const transferAmmount = Number(inputTransferAmount.value);
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(account => account.nickName === recipientNickname);//получаем аккаунт получателя из массива аккаунтов, он должен быть равен введенному recipientNickname
  if(recipientAccount && userAccount.nickName !== recipientAccount.nickName && transferAmmount <= Number((labelBalance.textContent).slice(0, -1)) && transferAmmount > 0) {
    userAccount.transactions.push(-transferAmmount);
    recipientAccount.transactions.push(transferAmmount);
    recipientAccount.transactionsDates.push(new Date().toISOString());//дата перевода денег получателю
    userAccount.transactionsDates.push(new Date().toISOString()); //дата перевода денег
    updateUI(userAccount);
    clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
    console.log(`Перевод пользователю с инициалами ${recipientAccount.nickName}, от пользователя ${userAccount.nickName} выполнен!`);
  } else {
    console.log('Введены не корректные данные');
  }
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();
})


//Форма закрытия счета(ищу индекс элемента findIndex и возвращать его в переменную deleteAccount)

btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  if(userAccount.nickName === inputCloseUsername.value && userAccount.pin === Number(inputClosePin.value)) {
    const deleteAccount = accounts.findIndex(account => account.nickName === userAccount.nickName);
    accounts.splice(deleteAccount, 1);
  }
  inputClosePin.value = '';
  inputCloseUsername.value = '';
  inputClosePin.blur();
  inputCloseUsername.blur();
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Войдите в свой аккаунт';
  labelWelcome.style.fontWeight = 'normal';
})

//Форма запроса займа, имплементация методом some(), давать запрашиваемый займ, только если на счету есть депозит 10 процентов из которого составляют сумму займа

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  setTimeout(() => {
    const iWantMoney = Math.floor(inputLoanAmount.value);
    if(userAccount.transactions.some(trans => (trans)*0.1 >= iWantMoney && iWantMoney > 0)) {
      console.log(`Вам одобрен займ ${iWantMoney}$`);
      userAccount.transactions.push(iWantMoney);
      userAccount.transactionsDates.push(new Date().toISOString());
      updateUI(userAccount);
      inputLoanAmount.value = '';
    } else {
      console.log(`Займ ${iWantMoney}$ не одобрен`);
      inputLoanAmount.value = '';
    };
  }, 5000)
  console.log('Мы рассматриваем Ваш запрос, ожидайте...');
  clearInterval(currentLogOutTimer);
  currentLogOutTimer = startLogoutTimer();
})


//Имплементирую кнопку сортировки

let transactionSorted = false;

btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayTransaction(userAccount, !transactionSorted);
  transactionSorted = !transactionSorted; //по нажатию кнопки будет возвращатся сортированый массив транзакций и обратно в зависимости от переменной transactionSorted false или true
})









// //Имплементация трансфера, перевод денег от одного пользователя, другому

// btnTransfer.addEventListener('click', function(e) {
//   e.preventDefault();//предотвращаю перезагрузку страницы
//   const transferAmmount = Number(inputTransferAmount.value);
//   const transferTo = inputTransferTo.value;
//   console.log(transferAmmount);
//   if(Number((labelBalance.textContent).slice(0, -1)) >= transferAmmount) {
//     if(transferTo === 'ci' && transferAmmount > 0 && transferTo !== userAccount.nickName) {
//       account1.transactions.push(transferAmmount);//перевод пользователю с указанным ником
//       console.log(`Перевод пользователю с инициалами ${transferTo}, от пользователя ${userAccount.nickName} выполнен!`);
//       // updateUI(userAccount);
//     } else if(transferTo === 'as' && transferAmmount > 0 && transferTo != userAccount.nickName) {
//       account2.transactions.push(transferAmmount);
//       console.log(`Перевод пользователю с инициалами ${transferTo}, от пользователя ${userAccount.nickName} выполнен!`);
//       // updateUI(userAccount);
//     } else if(transferTo === 'cm' && transferAmmount > 0 && transferTo != userAccount.nickName) {
//       account3.transactions.push(transferAmmount);
//       console.log(`Перевод пользователю с инициалами ${transferTo}, от пользователя ${userAccount.nickName} выполнен!`);
//       updateUI(userAccount);
//     } else if(transferTo === 'ks' && transferAmmount > 0 && transferTo != userAccount.nickName) {
//       account4.transactions.push(transferAmmount);
//       console.log(`Перевод пользователю с инициалами ${transferTo}, от пользователя ${userAccount.nickName} выполнен!`);
//       // updateUI(userAccount);
//     } else if(transferTo === 'oa' && transferAmmount > 0 && transferTo != userAccount.nickName) {
//       account5.transactions.push(transferAmmount);
//       console.log(`Перевод пользователю с инициалами ${transferTo}, от пользователя ${userAccount.nickName} выполнен!`);
//       // updateUI(userAccount);
//     } else if (transferTo === userAccount.nickName && transferAmmount<transferAmmount < (labelBalance.textContent).slice(0, -1)) {
//       console.log(`Вы пытаетесь перевести деньги сами себе, выберете другово пользователя`);
//     } else {
//       console.log(`Данные для перевода введены не верно`);
//     }

//     if(userAccount.nickName != transferTo) {
//       userAccount.transactions.push(-transferAmmount);
//       updateUI(userAccount);
//       inputTransferAmount.blur();
//       inputTransferTo.blur();
//       inputTransferAmount.value = '';
//       inputTransferTo.value = '';
//     }
//   } else {
//     console.log('На Вашем счету не достаточно средств!');
//     inputTransferAmount.blur();
//     inputTransferTo.blur();
//     inputTransferAmount.value = '';
//     inputTransferTo.value = '';
//   }
// })



// //Создать никнеймы из инициалов имени и фамилия

// const nickNameFunc = function(userName) {
//   const nickName = userName.split(' ');
//   const nameArr = [];
//   nickName.map(function(name) {
//     nameArr.push(name[0].toLowerCase());
//   })
//   const nickNameFull = nameArr.join('')
//   console.log(nickNameFull);
// }
// //можно вызвать для каждого аккаунта пользуясь for of
// for(let accountNum of accounts) {
//   nickNameFunc(accountNum.userName);
// }
//  //или map
// accounts.map(function(name) {
//   nickNameFunc(name.userName);
// })


// const nickNameFunc = function(name) {
//   const nickNameArr = [];
//   const nickName = name.toLowerCase().split(' ');
//   nickName.map(function(name) {
//     nickNameArr.push(name[0]);
//   })
//   console.log(nickName);
//   console.log(nickNameArr.join(''));
// }

// nickNameFunc(account2.userName);


// const userNickNameFunc = function(userName) {
//   const userNameArr = userName.toLowerCase().split(' ');
//   const nickName = userNameArr.map(name => name[0]).join('');
//   // console.log(nickName);
// }

// accounts.map(function(account) {
//   userNickNameFunc(account.userName);
// });