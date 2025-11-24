document.addEventListener('DOMContentLoaded', () => {
    // Получаем статус авторизации из сессии
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    // 1. Управление ссылкой "Osobní účet" в меню (в верхней навигации)
    const personalAccountLink = document.getElementById('personalAccountLink');
    if (personalAccountLink) {
        if (isLoggedIn) {
            personalAccountLink.classList.remove('hidden-item'); 
        } else {
            personalAccountLink.classList.add('hidden-item'); 
        }
    }
    
    // 2. Управление контентом дропдауна
    updateUserDropdown(isLoggedIn);
    
    // 3. Обработчик для кнопки "Выход" (Logout)
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
    
    // 4. Логика показа/скрытия самого дропдауна при клике на аватарку
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropdownTrigger && dropdownContent) {
        dropdownTrigger.addEventListener('click', function(event) {
            event.preventDefault(); // Остановить переход по ссылке (если она есть)
            
            // Переключаем класс 'show' для показа/скрытия
            dropdownContent.classList.toggle('show');
        });
        
        // Скрываем дропдаун, если клик произошел вне его
        document.addEventListener('click', (event) => {
            if (!dropdownTrigger.contains(event.target) && !dropdownContent.contains(event.target)) {
                dropdownContent.classList.remove('show');
            }
        });
    }
});


// ===========================================
// ФУНКЦИИ АВТОРИЗАЦИИ
// ===========================================

/**
 * Обновляет контент дропдауна в зависимости от статуса авторизации.
 * @param {boolean} status - true, если пользователь авторизован
 */
function updateUserDropdown(status) {
    const authContent = document.getElementById('auth-content');
    const guestContent = document.getElementById('guest-content');
    const userGreeting = document.getElementById('user-greeting');
    const userEmail = sessionStorage.getItem('userEmail'); // Получаем почту из сессии

    if (authContent && guestContent) {
        if (status) {
            // Если авторизован: показываем контент личного кабинета
            guestContent.classList.add('hidden-item');
            authContent.classList.remove('hidden-item');
            
            // Персонализированное приветствие
            if (userGreeting && userEmail) {
                userGreeting.textContent = `Vítejte, ${userEmail}!`;
            }
        } else {
            // Если НЕ авторизован: показываем контент для гостей
            guestContent.classList.remove('hidden-item');
            authContent.classList.add('hidden-item');
        }
    }
}



/**
 * Очищает сессию и выполняет выход.
 */
function handleLogout(event) {
    event.preventDefault(); // Остановить переход по href="#"
    
    // Очищаем статус авторизации
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    
    // Перезагружаем страницу для обновления UI
    window.location.reload(); 
    // Или перенаправляем на главную: window.location.href = 'index.html'; 
}





// Функция для валидации телефонного ввода
// function validatePhoneInput(event) {
    // const input = event.target;
    // Регулярное выражение разрешает только цифры (0-9) и символы (+ и -)
    // const sanitizedValue = input.value.replace(/[^0-9+-]/g, '');

    // Заменяем текущее значение в поле на отфильтрованное
    // input.value = sanitizedValue;
// }


// Также можно добавить обработчик отправки формы для финальной проверки, если нужно
// document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    // const phoneInput = document.getElementById('phone');
    // Финальная проверка, чтобы убедиться, что телефон начинается с +
    // if (!phoneInput.value.startsWith('+')) {
        // alert('Телефонный номер должен начинаться со знака "+".');
        // event.preventDefault(); // Остановить отправку формы
    // }
    // Здесь же можно добавить и другую логику валидации
// });