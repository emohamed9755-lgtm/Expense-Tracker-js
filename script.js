// ===============================
// SELECT ELEMENTS
// ===============================
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseCategorySelect = document.getElementById('expenseCategory');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expenseList = document.getElementById('expenseList');
const totalAmountEl = document.getElementById('totalAmount');
const toggleThemeBtn = document.getElementById('toggleTheme');
const body = document.body;

// ===============================
// LOAD EXPENSES FROM localStorage
// ===============================
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Render expenses on page load
expenses.forEach(exp => renderExpense(exp));
updateTotal();

// ===============================
// ADD EXPENSE
// ===============================
addExpenseBtn.addEventListener('click', () => {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());
    const category = expenseCategorySelect.value;

    if (!name || !amount || !category) {
        alert("Please fill in all fields");
        return;
    }

    const expense = {
        id: Date.now(),
        name,
        amount,
        category
    };

    expenses.push(expense);
    saveExpenses();
    renderExpense(expense);
    updateTotal();

    // Clear inputs
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
    expenseCategorySelect.value = '';
});

// ===============================
// RENDER SINGLE EXPENSE
// ===============================
function renderExpense(expense) {
    const li = document.createElement('li');

    li.innerHTML = `
        <div class="expense-info">
            <span class="expense-name">${expense.name}</span>
            <span class="expense-category">${expense.category}</span>
        </div>
        <div class="expense-amount">KSh${expense.amount.toFixed(2)}</div>
        <div class="delete-btn" data-id="${expense.id}">🗑️</div>
    `;

    expenseList.appendChild(li);

    // Add delete event
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        expenses = expenses.filter(exp => exp.id !== id);
        saveExpenses();
        li.remove();
        updateTotal();
    });
}

// ===============================
// UPDATE TOTAL AMOUNT
// ===============================
function updateTotal() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalAmountEl.textContent = `KSh${total.toFixed(2)}`;
}

// ===============================
// SAVE TO localStorage
// ===============================
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// ===============================
// TOGGLE THEME
// ===============================
toggleThemeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
});