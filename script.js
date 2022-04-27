const stopW = document.forms['stopwatch'];
const timerSet = document.forms['timer-set'];
const timerGet = document.forms['timer-get'];
let stopwInterval;
let timerInterval;
let swElem = {
  hour: 0,
  min: 0,
  sec: 0,
  ms: 0,
};
let timerElem = {
  minSet: 25, // minutes in left side
  min: 25, // minutes and  
  sec: 0, //  seconds in right side
  msStart: null,
  msPause: null,
};

const getS = selector => document.querySelector(selector);

function getCurrentDate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  let year = date.getFullYear();
  let hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
  let min = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
  let sec = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
  getS('.date').innerHTML = day + '.' + month + '.' + year;
  getS('.current-time').innerHTML = hour + ':' + min + ':' + sec;
}
const swReset = getS('.stopwatch__now').innerHTML;
const timerReset = getS('.timer__get').innerHTML;

//current date and time
getCurrentDate();
setInterval(getCurrentDate, 1000)


//stopwatch
//start button
stopW[0].addEventListener('click', function () {
  stopwInterval = setInterval(() => {
    if (swElem.ms > 9) {
      swElem.ms = 0;
      swElem.sec++;
    }
    getS('.ms').innerHTML = swElem.ms++;

    if (swElem.sec > 59) {
      swElem.sec = 0;
      swElem.min++;
    }
    if (swElem.sec < 10) getS('.sec').innerHTML = '0' + swElem.sec;
    else getS('.sec').innerHTML = swElem.sec;


    if (swElem.min > 59) {
      swElem.min = 0;
      swElem.hour++;
    }
    if (swElem.min < 10) getS('.min').innerHTML = '0' + swElem.min;
    else getS('.min').innerHTML = swElem.min;

    if (swElem.hour > 99) {
      swElem.hour = 0;
    }
    if (swElem.hour < 10) getS('.hour').innerHTML = '0' + swElem.hour;
    else getS('.hour').innerHTML = swElem.hour;
  }, 99)
  this.disabled = true;
  stopW[1].disabled = false;
  stopW[2].disabled = false;
  stopW[3].disabled = false;
})

//loop button
stopW[1].addEventListener('click', function () {
  let newLi = document.createElement('li');
  let loop = getS('.stopwatch__now').innerHTML;
  newLi.innerHTML = loop;
  getS('.stopwatch__result').append(newLi);
  getS('.list-box').scrollTo({ top: getS('.list-box').scrollHeight, behavier: 'smooth' });
})

//stop button
stopW[2].addEventListener('click', function () {
  clearInterval(stopwInterval);
  this.disabled = true;
  stopW[0].disabled = false;
  stopW[1].disabled = true;
})

//reset button
stopW[3].addEventListener('click', function () {
  clearInterval(stopwInterval);
  for (const key in swElem) {
    swElem[key] = 0;
  }
  getS('.stopwatch__now').innerHTML = swReset;
  getS('.stopwatch__result').innerHTML = '';
  this.disabled = true;
  stopW[0].disabled = false;
  stopW[1].disabled = true;
  stopW[2].disabled = true;
})


//timer
//'+' and '-' buttons
timerSet.addEventListener('click', function (e) {
  if (e.target === timerSet[0]) timerElem.minSet++;
  else if (e.target === timerSet[1]) timerElem.minSet--;

  if (timerElem.minSet < 2) timerSet[1].disabled = true;
  else timerSet[1].disabled = false;
  if (timerElem.minSet > 98) timerSet[0].disabled = true;
  else timerSet[0].disabled = false;

  getS('.timer__set').innerHTML = timerElem.minSet;
  timerElem.min = timerElem.minSet;
})

//start button
timerGet[0].addEventListener('click', function () {
  const timerFunc = () => {
    if (timerElem.min != -1) {
      if (timerElem.min < 10) getS('.timer .min').innerHTML = '0' + timerElem.min;
      else getS('.timer .min').innerHTML = timerElem.min;
      if (timerElem.sec < 10) getS('.timer .sec').innerHTML = '0' + timerElem.sec;
      else getS('.timer .sec').innerHTML = timerElem.sec;

      if (timerElem.sec > 0) {
        timerElem.sec--;
      }
      else {
        timerElem.min--;
        timerElem.sec = 59;
      }
    }
    else {
      getS('.timer__get').classList.toggle('red');
    }
  }
  
  if (!timerElem.msPause) {
    timerFunc();
    timerInterval = setInterval(() => timerFunc(), 1000);
    timerElem.msStart = new Date().getMilliseconds();
  }
  else {
    const msDealy = (1000 + timerElem.msStart - timerElem.msPause) % 1000;
    const msTimer = setTimeout(() => {
      timerFunc();
      timerInterval = setInterval(() => timerFunc(), 1000);
      timerElem.msStart = new Date().getMilliseconds();
      clearTimeout(msTimer);
    }, msDealy);
  }
  timerElem.msPause = null;

  this.disabled = true;
  timerGet[1].disabled = false;
  timerGet[2].disabled = false;
  timerSet[0].disabled = true;
  timerSet[1].disabled = true;
})

//stop button
timerGet[1].addEventListener('click', function () {

  timerElem.msPause = new Date().getMilliseconds();

  clearInterval(timerInterval);
  this.disabled = true;
  timerGet[0].disabled = false;
  getS('.timer__get').classList.remove('red');
})

//reset button
timerGet[2].addEventListener('click', function () {
  clearInterval(timerInterval);
  timerElem.sec = 0;
  timerElem.min = timerElem.minSet;
  getS('.timer__get').innerHTML = timerReset;
  timerGet[0].disabled = false;
  timerGet[1].disabled = true;
  timerGet[2].disabled = true;
  if (timerElem.minSet < 99) timerSet[0].disabled = false;
  if (timerElem.minSet > 1) timerSet[1].disabled = false;
  getS('.timer__get').classList.remove('red');
})