php
<?php
// login.php: Обрабатывает запрос на вход от формы

// Начинаем сессию. Это позволяет сохранять информацию о пользователе между разными страницами.
session_start();

// 1. Проверяем, что запрос был отправлен методом POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 2. Получаем данные из формы
    // Используем htmlspecialchars для предотвращения XSS-атак при отображении данных, хотя здесь это не так критично
    $username = htmlspecialchars($_POST['username'] ?? '');
    $password = htmlspecialchars($_POST['password'] ?? '');
    $remember_me = isset($_POST['remember_me']); // Будет true или false

    // 3. Выполняем базовую серверную валидацию
    if (empty($username) || empty($password)) {
        // Если что-то пропущено, перенаправляем обратно с сообщением об ошибке
        header("Location: frmLogin.html?error=missing_credentials");
        exit();
    }

    // 4. Имитация проверки учетных данных в базе данных
    // В реальном приложении здесь был бы запрос к MySQL или другой БД
    
    // Имитируем "правильные" данные
    $correct_user = 'testuser';
    $correct_pass = 'password123'; // !!! В РЕАЛЬНОМ ПРОЕКТЕ ТАК НЕ ДЕЛАЮТ !!!

    if ($username === $correct_user && $password === $correct_pass) {
        // Успешный вход

        // Сохраняем информацию о пользователе в сессии
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        $_SESSION['start_time'] = time();

        // Обработка "Запомнить меня" (опционально, требует установки куки)
        if ($remember_me) {
            // Устанавливаем куку для автоматического входа на 30 дней
            setcookie('remember_me_token', 'some_secret_token_value', time() + (86400 * 30), "/");
        }

        // 5. Перенаправляем пользователя на защищенную страницу (например, в личный кабинет)
        header("Location: dashboard.html");
        exit(); // Всегда вызывайте exit() после header("Location: ...")
        
    } else {
        // Неудачный вход

        // 5. Перенаправляем обратно на страницу входа с ошибкой
        header("Location: frmLogin.html?error=invalid_credentials");
        exit();
    }

} else {
    // Если кто-то попытался открыть login.php напрямую, а не через отправку формы POST
    header("Location: frmLogin.html");
    exit();
}
?>