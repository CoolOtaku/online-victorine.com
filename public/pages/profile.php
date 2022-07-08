<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Онлайн - вікторини</title>

  <? include 'public/libs/favicon.php' ?>
  <? include 'public/libs/css.php' ?>
  <? include 'public/libs/google_login.php' ?>

  <!-- Шрифти -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

  <!-- Стилі -->
  <link rel="stylesheet" type="text/css" href="public/assets/css/media.css">

</head>

<body>
  <input type="hidden" id="api_key" value="<? echo $_SESSION['ApiKey']; ?>">
  <div class="container">
    <header id="header" class="blog-header py-3">
      <div class="row flex-nowrap align-items-center">
        <div class="col-2">
          <a href="/">
            <img src="public/assets/img/arrow_left.svg">
          </a>
        </div>
        <div id="header-buttons" class="col-8 text-center align-items-center">
          <div class="d-none">
            <? include 'public/libs/login_button.php' ?>
          </div>
          <!-- Дані заповняються через JS -->
        </div>
        <div class="col-2 d-flex justify-content-end align-items-center">
          <? include 'public/libs/logOut_button.php' ?>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="p-4 p-md-5 mb-4 text-black rounded-3 bg-color2">
        <div class="d-flex justify-content-center">
          <img id="user-avatar" class="rounded-circle" src="public/assets/img/people.svg">
        </div>
        <div class="d-flex justify-content-center">
          <h3 id="user-name" class="display-10 fst-italic">
            <!-- Дані заповняються через JS -->
          </h3>
        </div>
        <p class="lead mb-0">
          <a id="user-email" target="_blanck" href="/" class="text-blue fw-bold">
            <!-- Дані заповняються через JS -->
          </a>
        </p>
      </div>

      <div class="container px-5">
        <div id="user-statistic" class="text-center alert alert-dark">
          <!-- Дані заповняються через JS -->
        </div>
        <p id="user-percentage" class="text-primary text-center fw-bold">
          <!-- Дані заповняються через JS -->
        </p>
        <div class="progress">
          <div id="user-progress" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
        </div>
        <div id="user-statistic" class="text-center alert alert-dark mt-3">
          <div class="row ">
            <div class="col col-md-3">
              <img class="" src="public/assets/img/perfectly_icon.png">
              <p id="user-res-1">
                <!-- Дані заповняються через JS -->
              </p>
            </div>
            <div class="col col-md-3">
              <img class="" src="public/assets/img/not_bad_icon.png">
              <p id="user-res-2">
                <!-- Дані заповняються через JS -->
              </p>
            </div>
            <div class="col col-md-3">
              <img class="" src="public/assets/img/normal_icon.png">
              <p id="user-res-3">
                <!-- Дані заповняються через JS -->
              </p>
            </div>
            <div class="col col-md-3">
              <img class="" src="public/assets/img/badly_icon.png">
              <p id="user-res-4">
                <!-- Дані заповняються через JS -->
              </p>
            </div>
          </div>
        </div>
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

  <? include 'public/libs/pre_loader.php' ?>
  <? include 'public/libs/js.php' ?>

  <script src="public/assets/js/profile.js" type="text/javascript"></script>

</body>

</html>