document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('message');

    // Эмуляция данных, которые хранятся на сервере
    const VALID_EMAIL = '1@m.ru';
    const VALID_PASSWORD = '123';

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // 🛑 Остановить стандартную отправку формы и перезагрузку страницы

            const emailInput = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;
            
            // Сообщение о начале проверки
            messageElement.textContent = 'Probíhá ověřování...';
            messageElement.className = 'message-text'; 
            messageElement.style.display = 'block';

            // Имитация задержки сервера (2 секунды)
            setTimeout(() => {
                // 1. ПРОВЕРКА ПОЛНОМОЧИЙ
                if (emailInput === VALID_EMAIL && passwordInput === VALID_PASSWORD) {
                    // УСПЕШНЫЙ ВХОД
                    messageElement.textContent = 'Přihlášení úspěšné! Přesměrování...';
                    messageElement.classList.add('success'); // Показываем зеленое сообщение

                    // 2. УПРАВЛЕНИЕ СОСТОЯНИЕМ: Сохраняем статус в сессии браузера
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('userEmail', emailInput);
                    
                    // 3. ПЕРЕНАПРАВЛЕНИЕ
                    setTimeout(() => {
                        // Перенаправляем пользователя на главную страницу
                        window.location.href = 'clientaccount.html'; 
                    }, 1000); 
                    
                } else {
                    // НЕУСПЕШНЫЙ ВХОД
                    messageElement.textContent = 'Chyba přihlášení. Nesprávný e-mail nebo heslo.';
                    messageElement.classList.remove('success'); 
                }
            }, 2000); // 2-секундная задержка
        });
    }
});