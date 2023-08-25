let hist = JSON.parse(localStorage.getItem("history")) || [];
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebarCancel = document.getElementById("sidebar-cancel");
const sidebar = document.getElementById("sidebar");
const calculator = document.getElementById("calculator");
const currencyButton = document.getElementById("currency-button");
const standardButton = document.getElementById("standard-button");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.add("show");
});

sidebarCancel.addEventListener("click", () => {
  sidebar.classList.remove("show");
});

function put_number_to_input(value) {
  let amount = document.getElementById("amount");
  let currentResult = amount.value;
  if (currentResult === "0") {
    if (value === ".") {
      amount.value += value;
    } else {
      amount.value = parseInt(value);
    }
  } else {
    if (value === ".") {
      amount.value = currentResult + value;
    } else {
      amount.value = currentResult + parseInt(value);
    }
  }
}

function calculateCurrency() {
  const baseCurrency = document.getElementById("base-currency").value;
  const targetCurrency = document.getElementById("target-currency").value;
  fetch(
    "https://api.currencyfreaks.com/latest?apikey=d8630eb3f8f84724aa316b3589ad3dce"
  )
    .then((response) => response.json())
    .then((data) => {
      const amount_value = parseFloat(document.getElementById("amount").value);
      const baseExchangeRate = data.rates[baseCurrency];
      const targetExchangeRate = data.rates[targetCurrency];
      if (baseExchangeRate && targetExchangeRate) {
        const convertedAmount =
          (amount_value * targetExchangeRate) / baseExchangeRate;
        document.getElementById(
          "result"
        ).textContent = `${convertedAmount.toFixed(2)} ${targetCurrency}`;
      } else {
        document.getElementById("result").textContent =
          "Invalid currency selected.";
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

function Currency() {
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
      <button onclick="put_number_to_input(7)">7</button>
      <button onclick="put_number_to_input(8)">8</button>
      <button onclick="put_number_to_input(9)">9</button>
      <button onclick="clearResult()">C</button>
      <button onclick="put_number_to_input(4)">4</button>
      <button onclick="put_number_to_input(5)">5</button>
      <button onclick="put_number_to_input(6)">6</button>
      <button onclick="deleteLastDigit_currency()"><img src="assets/images/trash.png" alt=""></button>
        <button onclick="put_number_to_input(1)">1</button>
        <button onclick="put_number_to_input(2)">2</button>
        <button onclick="put_number_to_input(3)">3</button>
        <button class="equal" onclick="calculateCurrency()">&equals;</button>  
        <button onclick="put_number_to_input(0)">0</button>
        <button onclick="put_number_to_input('.')">.</button>
        </div>
      </div>
    `;
  const section_history = document.getElementById("history");
  const btns = document.getElementById("btns");
  section_history.style.display = "none";
  btns.style = " grid-template-rows: repeat(4, 64px);";
  sidebar.classList.remove("show");
  calculator.style.width = "100%";
}

function Standard() {
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
  const section_history = document.getElementById("history");
  section_history.style.display = "block";
  sidebar.classList.remove("show");
  const isSmallScreen = window.innerWidth <= 767; 

  if (isSmallScreen) {
    calculator.style.width = "100%";
  } else {
    calculator.style.width = "75%";
  }
}
