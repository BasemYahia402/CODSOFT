let hist = JSON.parse(localStorage.getItem('history')) || [];
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarCancel= document.getElementById('sidebar-cancel');
const sidebar = document.getElementById('sidebar');
const calculator = document.getElementById('calculator');
const currencyButton = document.getElementById('currency-button');
const standardButton = document.getElementById('standard-button');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.add('show');
});

sidebarCancel.addEventListener('click',() => {
    sidebar.classList.remove('show');
});


function put_number_to_input(value){
  let amount = document.getElementById("amount");
  let currentResult = amount.value;
  if (currentResult === "0") {
    if(value === "."){
      amount.value += value;
    }
    else{
      amount.value = parseInt(value);
    }
  } else {
    if(value === '.'){
      amount.value = currentResult + value;
    }
    else{
      amount.value = currentResult + parseInt(value);
    }
  }
}

function calculateCurrency() {
  const baseCurrency = document.getElementById("base-currency").value;
  const targetCurrency = document.getElementById("target-currency").value;
  fetch("https://api.currencyfreaks.com/latest?apikey=d8630eb3f8f84724aa316b3589ad3dce")
    .then((response) => response.json())
    .then((data) => {
      const amount_value = parseFloat(document.getElementById("amount").value);
      const baseExchangeRate = data.rates[baseCurrency];
      const targetExchangeRate = data.rates[targetCurrency];
      if (baseExchangeRate && targetExchangeRate) {
        const convertedAmount = (amount_value * targetExchangeRate) / baseExchangeRate;
        document.getElementById("result").textContent = `${convertedAmount.toFixed(2)} ${targetCurrency}`;
      } else {
        document.getElementById("result").textContent = "Invalid currency selected.";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function deleteLastDigit_currency() {
  let amount = document.getElementById("amount");
  let currentResult = amount.value;
  if (currentResult !== "0" && currentResult !== "Error") {
    currentResult = currentResult.slice(0, -1);
    if (currentResult === "") {
      currentResult = "0";
    }
    amount.value = currentResult;
  }
}

function Currency(){
  calculator.innerHTML = `
    <div id="currency-converter">
    <div class="base">
      <input type="text" id="amount" value="0">
      <select id="base-currency">
        <option value="EGP">EGP</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="KWD">KWD</option>
        <option value="BHD">BHD</option>
        <option value="OMR">OMR</option>
        <option value="JOD">JOD</option>
        <option value="CHF">CHF</option>
        <option value="KYD">KYD</option>
        <option value="JPY">JPY</option>
        <!-- Add more options as needed -->
      </select>
      </div>

    <div class="convert">
      <div id="result">0</div>
      <select id="target-currency">
        <option value="EGP">EGP</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="KWD">KWD</option>
        <option value="BHD">BHD</option>
        <option value="OMR">OMR</option>
        <option value="JOD">JOD</option>
        <option value="CHF">CHF</option>
        <option value="KYD">KYD</option>
        <option value="JPY">JPY</option>
        <!-- Add more options as needed -->
      </select>
    </div>  

    <div class="btns" id="btns">
      <button onclick="clearResult()">C</button>
      <button onclick="deleteLastDigit_currency()"><img src="assets/images/trash.png" alt=""></button>
      <button onclick="put_number_to_input(7)">7</button>
      <button onclick="put_number_to_input(8)">8</button>
      <button onclick="put_number_to_input(9)">9</button>
      <button onclick="put_number_to_input(4)">4</button>
      <button onclick="put_number_to_input(5)">5</button>
      <button onclick="put_number_to_input(6)">6</button>
      <button onclick="put_number_to_input(1)">1</button>
      <button onclick="put_number_to_input(2)">2</button>
      <button onclick="put_number_to_input(3)">3</button>
      <button onclick="put_number_to_input(0)">0</button>
      <button onclick="put_number_to_input('.')">.</button>
      <button class="equal" onclick="calculateCurrency()">&equals;</button>  
      </div>
    </div>
  `;
  const section_history=document.getElementById("history");
  const btns=document.getElementById("btns");
  section_history.style.display="none";
  btns.style=" grid-template-rows: repeat(4, 64px);"
  sidebar.classList.remove('show');
  calculator.classList.add('col-md-12')
}

function Standard(){
  calculator.innerHTML = `
  <div class="results" id="result">0</div>
  <div class="btns" >
    <button onclick="appendToResult('%')">%</button>
    <button >CE</button>
    <button onclick="clearResult()">C</button>
    <button onclick="deleteLastDigit()"><img src="assets/images/trash.png" alt=""></button>
    <button onclick="calculateUpturned()"><img src="assets/images/divid.png" alt=""></button>
    <button onclick="calculatePower()"><img src="assets/images/power.png" alt=""></button>
    <button onclick="calculateSquareRoot()"><img src="assets/images/root.png" alt=""></button>
    <button onclick="appendToResult('/')">&divide;</button>
    <button onclick="appendToResult(7)">7</button>
    <button onclick="appendToResult(8)">8</button>
    <button onclick="appendToResult(9)">9</button>
    <button onclick="appendToResult('*')">x</button>
    <button onclick="appendToResult(4)">4</button>
    <button onclick="appendToResult(5)">5</button>
    <button onclick="appendToResult(6)">6</button>
    <button onclick="appendToResult('-')">&minus;</button>
    <button onclick="appendToResult(1)">1</button>
    <button onclick="appendToResult(2)">2</button>
    <button onclick="appendToResult(3)">3</button>
    <button onclick="appendToResult('+')">&plus;</button>
    <button onclick="appendToResult('-')">/-</button>
    <button onclick="appendToResult(0)">0</button>
    <button onclick="appendToResult('.')">.</button>
    <button class="equal" onclick="calculateResult()">&equals;</button>  
  </div>
  `;
  const section_history=document.getElementById("history");
  section_history.style.display="block";
  sidebar.classList.remove('show');
}

function appendToResult(value) {
    let resultElement = document.getElementById("result");
    let currentResult = resultElement.innerHTML;
  
    if (currentResult === "0") {
      resultElement.innerHTML = value;
    } else {
      resultElement.innerHTML = currentResult + value;
    }
  }
  
  function deleteLastDigit() {
    let resultElement = document.getElementById("result");
    let currentResult = resultElement.innerHTML;
    if (currentResult !== "0" && currentResult !== "Error") {
      currentResult = currentResult.slice(0, -1);
      if (currentResult === "") {
        currentResult = "0";
      }
      resultElement.innerHTML = currentResult;
    }
  }


  function calculateResult() {
    let resultElement = document.getElementById("result");
    let currentResult = resultElement.innerHTML;
    let result = "Error";
    try {
      result = eval(currentResult);
      hist.push(currentResult + "=" + result);
      localStorage.setItem('history', JSON.stringify(hist));
      displayHistory();
    } catch (error) {
      resultElement.innerHTML = "Error";
    }
    resultElement.innerHTML = result;
    currentResult = result;
    addValueToResult()
  }
  
  function calculateSquareRoot() {
    let resultElement = document.getElementById("result");
    let currentResult = resultElement.innerHTML;
  
    if (currentResult >= 0) {
      let squareRootValue = Math.sqrt(currentResult);
      squareRootValue=squareRootValue.toFixed(5);
      resultElement.textContent = squareRootValue;
    } else {
      resultElement.textContent = "Error"; // عرض رسالة خطأ إذا كان الرقم سلبيًا
    }
  }

  function calculatePower() {
    let resultElement = document.getElementById("result");
    let currentResult = resultElement.innerHTML;
  
    if (currentResult >= 0) {
      const powertValue = Math.pow(currentResult,2);
      resultElement.textContent = powertValue;
    } else {
      resultElement.textContent = "Error"; // عرض رسالة خطأ إذا كان الرقم سلبيًا
    }
  }

  function calculateUpturned() {
    let resultElement = document.getElementById("result");
    let currentResult = resultElement.innerHTML;
  
    if (currentResult >= 0) {
      const UpturnedValue = 1 / currentResult;
      resultElement.textContent = UpturnedValue;
    } else {
      resultElement.textContent = "Error"; // عرض رسالة خطأ إذا كان الرقم سلبيًا
    }
  }

  function clearResult() {
    let amountELement = document.getElementById("amount");
    let resultElement = document.getElementById("result");
    if(amountELement){
      amountELement.value = "0";
    }
    resultElement.innerHTML = "0";
  }
  

function clearHistory() {
  hist = [];
  displayHistory();
}

function deleteALLOperation() {
  hist.length=0;
  localStorage.removeItem('history');
  displayHistory();
}

function displayHistory() {
  let historyList = document.getElementById("history-list");
  historyList.innerHTML = "";
  for (let i = 0; i < hist.length; i++) {
    let listItem = document.createElement("li");
    listItem.innerText = hist[i];
    historyList.appendChild(listItem);
  }
}

displayHistory();

function addValueToResult(){
const myList = document.getElementById('history-list');
const result = document.getElementById('result');
const listItems = myList.querySelectorAll('li');

listItems.forEach((item) => {
  item.onclick = function() {
    const equalIndex = item.textContent.indexOf('='); // الحصول على موقع اليساوى

if (equalIndex !== -1) {
  const numberPart = item.textContent.substring(equalIndex + 1).trim(); // استخراج الجزء بعد اليساوى وإزالة الفراغات
  const numericValue = parseFloat(numberPart); // تحويل الجزء النصي إلى رقم (مع دعم الأعداد العشرية)
  result.innerHTML = numericValue;
}
  };
});
}
