<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Проходження тесту</title>

  <? include 'public/libs/favicon.php' ?>
  <? include 'public/libs/css.php' ?>

  <!-- Шрифти -->
  <link href="https://fonts.googleapis.com/css?family=Playfair&#43;Display:700,900&amp;display=swap" rel="stylesheet">

  <!-- Стилі -->
  <link rel="stylesheet" type="text/css" href="public/assets/css/test.css">
  <link rel="stylesheet" type="text/css" href="public/assets/css/media.css">

</head>

<body>
  <input type="hidden" id="api_key" value="<? echo $_SESSION['ApiKey']; ?>">
  <main class="container py-3">
    <div class="p-md-2 mb-2 text-black rounded bg-color2">
      <div class="text-center">
        <h4 id="title" class="display-7 fst-italic">Заголовок</h4>
        <div class="row">
          <div class="col-3"></div>
          <div id="test-cover" class="col-6 rounded mx-auto d-block img-test"></div>
          <div class="col-3"></div>
        </div>
      </div>
    </div>

    <h5 id="question" class="pb-2 text-center fst-italic border-bottom">
      <!-- Дані заповняються через JS -->
    </h5>

    <div id="answers" class="row mb-1">
      <!-- Дані заповняються через JS -->
    </div>

    <div id="con-btn" class="text-center">
      <button id="btn_next" class="btn btn-primary">Далі
        <img src="public/assets/img/next.svg">
      </button>
    </div>

  </main>

  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img src="public/assets/img/logo.jpg" class="rounded me-2" width="15px">
        <strong class="me-auto">Онлайн - вікторини</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        Ви не вибрали варіант відповіді, виберіть будьласка вашу відповідь.
      </div>
    </div>
  </div>

  <? include 'public/libs/pre_loader.php' ?>
  <? include 'public/libs/js.php' ?>

  <script src="public/assets/js/main.js" type="text/javascript"></script>
  <script src="public/assets/js/test.js" type="text/javascript"></script>

</body>

</html>