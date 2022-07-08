<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Онлайн - вікторини</title>

    <? include 'public/libs/favicon.php' ?>
    <? include 'public/libs/css.php' ?>

    <!-- Шрифти -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

    <!-- Стилі -->
    <link rel="stylesheet" type="text/css" href="public/assets/css/media.css">

</head>
<body>
<input type="hidden" id="api_key" value="<? echo $_SESSION['ApiKey'];?>">
<div class="container">
  <header id="header" class="blog-header py-3">
    <div class="row flex-nowrap align-items-center">
      <div class="col-2">
        <img id="logo" src="public/assets/img/logo.jpg" class="bi me-2" width="100" height="100">
      </div>
      <div class="col-8 text-center align-items-center">
        <h1 class="display-7 fst-italic">Онлайн - вікторини</h1>
      </div>
      <div class="col-2 d-flex justify-content-end align-items-center">
        <a class="link-secondary me-2" href="#" aria-label="Шукати" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <img id="search-img" src="public/assets/img/search.svg">
        </a>
        <a href="login">
          <img id="login-img" class="rounded-circle" src="public/assets/img/people.svg">
        </a>
      </div>
    </div>
  </header>

<main class="container">
  <div class="p-4 p-md-5 mb-4 text-black rounded-3 bg-color2">
    <div class="col-md-6 px-0">
      <h1 class="display-10 fst-italic">Сайт Онлайн - вікторини</h1>
      <p class="lead my-3">На даному сайті можна проходити вікторини на різні теми. Також мій проект має Android додаток.</p>
      <p class="lead mb-0"><a target="_blanck" href="https://vpu21.if.ua" class="text-blue fw-bold">Завантажити Android додаток можна тут!</a></p>
    </div>
  </div>

  <h3 class="pb-4 mb-4 fst-italic border-bottom">
    Вікторини:
  </h3>

  <div id="tests">
    <!-- Дані заповняються через JS -->
  </div>

</main>

<footer class="blog-footer">
  <p>Даний сайт розробила Кнігніцька Іванна <a target="_blanck" href="https://www.instagram.com/ivanka_knignitska_/">Мій Instagram</a>.</p>
  <p>
    <a href="#header">
      <img src="public/assets/img/goToTop.svg">
    </a>
  </p>
</footer>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Пошук вікторин на сайті</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <input type="text" class="form-control" id="search-text" placeholder="Введіть текс для пошуку">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="Search()">
        <img src="public/assets/img/search2.svg">
          Шукати</button>
      </div>
      <div class="alert alert-dark" id="search-content"></div>
    </div>
  </div>
</div>

<? include 'public/libs/pre_loader.php' ?>
<? include 'public/libs/js.php' ?>

<script src="public/assets/js/main.js" type="text/javascript"></script>
<script src="public/assets/js/index.js" type="text/javascript"></script>

</body>
</html>