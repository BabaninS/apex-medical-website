document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('show-more-btn');
    const hiddenContent = document.getElementById('hidden-doctors');
    const arrow = button.querySelector('.arrow-icon');
    
    const showText = 'Zobrazit více lékařů';
    const hideText = 'Zobrazit méně lékařů';
    
    if (button && hiddenContent && arrow) {
        button.addEventListener('click', function() {
            
            // 1. Переключаем класс для показа/скрытия контента
            hiddenContent.classList.toggle('visible-doctors');
            arrow.classList.toggle('rotated');

            if (hiddenContent.classList.contains('visible-doctors')) {
                // Если контент ВИДИМ
                button.firstChild.data = hideText; 
                
                // Получаем позицию кнопки относительно начала документа
                const buttonPosition = button.offsetTop;
                
                // Прокручиваем к позиции кнопки, добавляя небольшой отступ (например, 20px)
                window.scrollTo({
                    top: buttonPosition - 20, // Прокручиваем немного выше кнопки, чтобы новый контент был виден
                    behavior: 'smooth'
                });
                // ==============================

            } else {
                // Если контент СКРЫТ
                button.firstChild.data = showText;
                
                // При скрытии контента, прокручиваем вверх к началу секции врачей
                 const doctorsSection = document.querySelector('.content_list_grid');
                 if (doctorsSection) {
                    window.scrollTo({
                        top: doctorsSection.offsetTop - 50, // Прокручиваем к началу первого ряда
                        behavior: 'smooth'
                    });
                 }
            }
        });
    }
});