<!DOCTYPE html>
<html lang="ua" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Вхід</title>

    <? include 'public/libs/favicon.php' ?>
    <? include 'public/libs/css.php' ?>
    <? include 'public/libs/google_login.php' ?>

    <!-- Стилі -->
    <link rel="stylesheet" href="public/assets/css/login.css">

</head>
<body>
<div class="box text-black rounded-3 bg-color2">
    <h1 class="display-7 fst-italic">Вхід в профіль</h1>
    <p>Вітаємо на сайті "Онлайн - вікторини". Щоб продовжити потрібно авторизуватися!</p>
    <div class="d-flex justify-content-center">
        <? include 'public/libs/login_button.php' ?>
    </div>
    
</div>

<? include 'public/libs/pre_loader.php' ?>
<? include 'public/libs/js.php' ?>

<script src="public/assets/js/login.js" type="text/javascript"></script>

</body>
</html>