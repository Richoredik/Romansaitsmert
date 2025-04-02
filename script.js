// Открытие модального окна
const modal = document.getElementById("call-request-modal");
const btn = document.getElementById("call-request-btn");
const span = document.getElementsByClassName("close-btn")[0];
const submitBtn = document.getElementById("submit-btn");
const consentCheckbox = document.getElementById("consent");
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
const toggleVisibility = document.querySelector('#toggle-visibility');
let state = new Map([
  ['password', 'text'],
  ['text', 'password']
])

toggleVisibility.addEventListener('click', () => {
  password.setAttribute('type', state.get(password.getAttribute('type')))
})

// Открыть модальное окно при нажатии на кнопку "Заказать звонок"
btn.onclick = function() {
    modal.style.display = "block";
}

// Закрыть модальное окно при нажатии на крестик
span.onclick = function() {
    modal.style.display = "none";
}

// Закрыть модальное окно при клике за его пределами
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    document.getElementById('order-modal').style.display = 'block';
});

document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.style.display = 'none';
    });
});

document.getElementById('order-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    // Скрываем модальное окно
    document.getElementById('order-modal').style.display = 'none';

    // Показываем сообщение об успешном оформлении
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.style.display = 'block';

    // Скрываем сообщение через 3 секунды
    setTimeout(() => {
        confirmationMessage.style.display = 'none';
    }, 3000);
	
	const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product-item');
        const name = product.querySelector('h3').textContent;
        const price = parseInt(product.getAttribute('data-price'));

        if (cart.has(name)) {
            cart.set(name, cart.get(name) + 1);
        } else {
            cart.set(name, 1);
        }

        updateCartUI();
        alert(`Товар "${name}" добавлен в корзину!`);
    });
	
	function updateCartUI() {
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let total = 0;

    cartItemsList.innerHTML = '';
    cart.forEach((quantity, name) => {
        const itemTotal = getPriceByName(name) * quantity;
        total += itemTotal;

        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            ${name} x${quantity} - ${itemTotal.toLocaleString()} ₽
        `;
        cartItemsList.appendChild(li);
    });

    totalPriceElement.textContent = total.toLocaleString();
    checkoutBtn.disabled = cart.size === 0;
}
});

    // Очищаем форму
    this.reset();
});

// Активируем кнопку "Заказать звонок", если чекбокс согласия отмечен
consentCheckbox.addEventListener("change", function() {
    if (consentCheckbox.checked) {
        submitBtn.removeAttribute("disabled");
        submitBtn.classList.add("active");
    } else {
        submitBtn.setAttribute("disabled", "true");
        submitBtn.classList.remove("active");
    }
});