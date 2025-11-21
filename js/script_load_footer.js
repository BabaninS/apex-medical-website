
 // Функция для загрузки и вставки HTML-кода
    function loadFooter() {
        fetch('footer.html') // Загружаем файл футера
            .then(response => response.text())
            .then(html => {
                // Вставляем полученный HTML в заполнитель
                document.getElementById('footer-placeholder').innerHTML = html;
            })
            .catch(error => {
                console.error('Ошибка загрузки футера:', error);
            });
    }

    // Вызываем функцию при загрузке страницы
    loadFooter();