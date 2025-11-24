document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.card-tab-link');
    const tabContents = document.querySelectorAll('.account-tab-content');

    // Функция для переключения вкладок
    function switchTab(targetId) {
        // 1. Скрыть весь контент
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // 2. Убрать активный класс со всех ссылок
        tabLinks.forEach(link => {
            link.classList.remove('active');
        });

        // 3. Показать целевой контент
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    
    // Обработчик событий для каждой ссылки (карточки)
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Переключаем контент
            switchTab(targetId);

            // Устанавливаем активный класс на текущей ссылке
            this.classList.add('active');
        });
    });

    // Устанавливаем начальное активное состояние при загрузке
    // Показываем приветствие (ID: welcome-content)
    switchTab('welcome-content'); 

    // можно активировать карточку "Moje poznámky" при загрузке
    // if (tabLinks.length > 0) {
        // tabLinks[0].classList.add('active');
    // }
 });