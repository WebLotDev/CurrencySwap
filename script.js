const apiKey = 'YOUR_API_KEY'; // Replace with your free API key
const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;

async function fetchRates() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        populateCurrencyOptions(data.rates);
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
}

function populateCurrencyOptions(rates) {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const currencies = Object.keys(rates);

    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.textContent = currency;
        fromCurrencySelect.appendChild(option.cloneNode(true));
        toCurrencySelect.appendChild(option);
    });
}

async function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const rates = data.rates;
        const convertedAmount = (amount * rates[toCurrency] / rates[fromCurrency]).toFixed(2);
        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
    }
}

// Initialize the application
fetchRates();
