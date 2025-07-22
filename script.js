
let portfolio = [];

function addStock() {
  const symbol = document.getElementById('symbol').value.toUpperCase();
  const shares = parseFloat(document.getElementById('shares').value);
  const buyPrice = parseFloat(document.getElementById('buyPrice').value);
  const currentPrice = parseFloat(document.getElementById('currentPrice').value);

  if (!symbol || !shares || !buyPrice || !currentPrice) {
    alert('Please fill in all fields');
    return;
  }

  const investment = {
    id: Date.now(),
    symbol,
    shares,
    buyPrice,
    currentPrice,
    totalInvested: shares * buyPrice,
    currentValue: shares * currentPrice,
    pnl: (shares * currentPrice) - (shares * buyPrice),
    pnlPercent: ((currentPrice - buyPrice) / buyPrice) * 100
  };

  portfolio.push(investment);
  updateDisplay();
  clearForm();
}

function deleteStock(id) {
  portfolio = portfolio.filter(stock => stock.id !== id);
  updateDisplay();
}

function updateDisplay() {
  const container = document.getElementById('portfolioContainer');

  if (portfolio.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No investments added yet</h3>
        <p>Add your first investment using the form above</p>
      </div>
    `;
    updateSummary();
    return;
  }

  let tableHTML = `
    <table class="portfolio-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Shares</th>
          <th>Buy Price</th>
          <th>Current Price</th>
          <th>Total Invested</th>
          <th>Current Value</th>
          <th>P&L</th>
          <th>P&L %</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  `;

  portfolio.forEach(stock => {
    const pnlClass = stock.pnl >= 0 ? 'profit' : 'loss';
    tableHTML += `
      <tr>
        <td><strong>${stock.symbol}</strong></td>
        <td>${stock.shares}</td>
        <td>$${stock.buyPrice.toFixed(2)}</td>
        <td>$${stock.currentPrice.toFixed(2)}</td>
        <td>$${stock.totalInvested.toFixed(2)}</td>
        <td>$${stock.currentValue.toFixed(2)}</td>
        <td class="${pnlClass}">$${stock.pnl.toFixed(2)}</td>
        <td class="${pnlClass}">${stock.pnlPercent.toFixed(2)}%</td>
        <td><button class="delete-btn" onclick="deleteStock(${stock.id})">Delete</button></td>
      </tr>
    `;
  });

  tableHTML += '</tbody></table>';
  container.innerHTML = tableHTML;
  updateSummary();
}

function updateSummary() {
  const totalInvestment = portfolio.reduce((sum, stock) => sum + stock.totalInvested, 0);
  const currentValue = portfolio.reduce((sum, stock) => sum + stock.currentValue, 0);
  const totalPL = currentValue - totalInvestment;
  const totalPLPercent = totalInvestment > 0 ? (totalPL / totalInvestment) * 100 : 0;

  document.getElementById('totalInvestment').textContent = `$${totalInvestment.toFixed(2)}`;
  document.getElementById('currentValue').textContent = `$${currentValue.toFixed(2)}`;
  document.getElementById('totalPL').textContent = `$${totalPL.toFixed(2)}`;
  document.getElementById('totalPLPercent').textContent = `${totalPLPercent.toFixed(2)}%`;

  const plElement = document.getElementById('totalPL');
  const plPercentElement = document.getElementById('totalPLPercent');

  if (totalPL >= 0) {
    plElement.style.color = '#27ae60';
    plPercentElement.style.color = '#27ae60';
  } else {
    plElement.style.color = '#e74c3c';
    plPercentElement.style.color = '#e74c3c';
  }
}

function clearForm() {
  document.getElementById('symbol').value = '';
  document.getElementById('shares').value = '';
  document.getElementById('buyPrice').value = '';
  document.getElementById('currentPrice').value = '';
}
