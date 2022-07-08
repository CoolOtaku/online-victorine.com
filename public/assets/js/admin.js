let api_key = $("#api_key").val();

let themes = [];
let quizzes = null;

let newQuizzes = {
    title: "",
    cover: "",
    theme: "",
    questions: []
};
let question = {
    question: "",
    answers: [],
    true_reply: 0
};

let formData = new FormData();
formData.append("api_key", api_key);
formData.append("email", $.cookie('user_email'));
$.ajax({
    type: "POST",
    url: 'api/verifyAdmin',
    contentType: false, processData: false, dataType: "json",
    data: formData,
    success: function (response) {
        if (!response.res) {
            document.location.href = "/";
        }
    }
});

Start();
function Start() {
    $("#login-img").attr('src', $.cookie('user_image'));
    formData = new FormData();
    formData.append("api_key", api_key);

    $.ajax({
        type: "POST",
        url: 'api/getThemes',
        contentType: false, processData: false, dataType: "json",
        data: formData,
        success: function (response) {
            response.forEach((value, index) => {
                $("#List-Theme").append("<li class=\"list-group-item list-group-item-action d-flex justify-content-between align-items-center\">" + value.theme + "<span class=\"badge bg-primary rounded-pill\">К-сть вікторин: " + value.count_tests + "</span><a class=\"link-secondary\" href=\"javascript: deleteTheme('" + value.theme + "');\"><img src=\"public/assets/img/delete.svg\"></a></li>")
                themes.push(value.theme);
            })
        }
    });

    formData.append("type", "all");
    $.ajax({
        type: "POST",
        url: 'api/getTests',
        contentType: false, processData: false, dataType: "json",
        data: formData,
        success: function (response) {
            response.forEach((value, index) => {
                $("#List-Quizzes").append("<tr class=\"row\"><th class=\"col text-center\"><img class=\"rounded quizzes-img\" src=\"" + value.cover + "\"></th><td class=\"col-md-6 text-center\"><h5>" + value.title + "</h5><span class=\"badge bg-primary rounded-pill\">Тема: " + value.theme + "</span></td><td class=\"col text-center\"><a class=\"link-secondary me-3\" href=\"javascript: editQuizzes('" + value.id + "');\"><img src=\"public/assets/img/edit.svg\"></a><a class=\"link-secondary\" href=\"javascript: deleteQuizzes('" + value.id + "');\"><img src=\"public/assets/img/delete.svg\"></a></td></tr>")
            })
            quizzes = response;
        }
    });

    $.ajax({
        type: "POST",
        url: 'api/getAdministrators',
        contentType: false, processData: false, dataType: "json",
        data: formData,
        success: function (response) {
            response.forEach((value, index) => {
                $("#List-Administrators").append("<li class=\"nav-item text-center bg-color2 mb-1\"><img id=\"login-img\" class=\"rounded-circle mt-2 mx-2\" src=\"public/assets/img/people.svg\">"+value.email+"<p><a class=\"link-secondary\" href=\"javascript: deleteAdministrators('"+value.email+"');\"><img src=\"public/assets/img/delete.svg\"></a></p></li>")
            })
        }
    });
}

function deleteTheme(theme) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Видалення теми',
        text: "Ви дійсно хочете видалити дану тему?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Так!',
        cancelButtonText: 'Ні!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            formData = new FormData();
            formData.append("api_key", api_key);
            formData.append("theme", theme);
            $.ajax({
                type: "POST",
                url: 'api/deleteTheme',
                contentType: false, processData: false, dataType: "json",
                data: formData,
                success: function (response) {
                    if (response.res) {
                        swalWithBootstrapButtons.fire(
                            'Тему видалено!',
                            'Успішно видалено тему',
                            'success'
                        ).then((result) => {
                            location.reload();
                        })
                    } else {
                        swalWithBootstrapButtons.fire(
                            'Сталася помилка',
                            'Тему не було видалено!',
                            'error'
                        )
                    }
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Відміна',
                'Тему не було видалено, ви її зберегли ;)',
                'error'
            )
        }
    })
}

function addNewTheme() {
    Swal.fire({
        title: 'Добавити нову тему',
        html: '<input id="swal-newTheme" class="swal2-input" placeholder="Тема">',
        showCancelButton: true,
        confirmButtonText: 'Добавити',
        cancelButtonText: 'Скасувати',
        focusConfirm: false,
        preConfirm: () => {
            var theme = $("#swal-newTheme").val();
            if (!theme) {
                return false;
            }
            formData = new FormData();
            formData.append("api_key", api_key);
            formData.append("theme", theme);
            $.ajax({
                type: "POST",
                url: 'api/addNewTheme',
                contentType: false, processData: false, dataType: "json",
                data: formData,
                success: function (response) {
                    if (response.res) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Нову тему добавлено!',
                            showConfirmButton: false,
                            timer: 1500
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                location.reload();
                            }
                        })
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Ой лишенько. Нову тему не було добавлено!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            });
        }
    })
}

function returnToQuizzesForm(){
    if(newQuizzes.id){
        viewQuizzesForm("edit");
    }else{
        viewQuizzesForm("add");
    }
}

function viewQuizzesForm(type) {
    confirmButtonText = "Добавити";
    title = "Добавити нову вікторину";
    if(type == "edit"){
        confirmButtonText = "Зберегти";
        title = "Редагувати вікторину";
    }

    Swal.fire({
        title: title,
        input: 'select',
        inputOptions: themes,
        inputPlaceholder: swalSelect(),
        inputValidator: (value) => {
            if (value) {
                newQuizzes.theme = themes[value];
            }
        },
        html:
            '<input id="swal-name" class="swal2-input" placeholder="Назва" value="' + newQuizzes.title + '">' +
            '<input id="swal-cover" class="swal2-input" placeholder="Зображення (url)" value="' + newQuizzes.cover + '">' +
            '<p><b>Тести:</b></p>' +
            '<div id="List-Quizzes-Questions"></div>' +
            '<a class="link-secondary" href="javascript: addQuestions(\'add\', null);">➕</a>',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'Скасувати',
        preConfirm: () => {
            newQuizzesSave();
            if (!newQuizzes.title || !newQuizzes.theme || !newQuizzes.cover || !newQuizzes.questions) {
                alert("Не всі поля були заповнені. Будьласка заповніт їх!");
                return false;
            }
            formData = new FormData();
            formData.append("api_key", api_key);

            if(type == "edit"){
                formData.append("quizzes", JSON.stringify(newQuizzes));
                $.ajax({
                    type: "POST",
                    url: 'api/editQuizzes',
                    contentType: false, processData: false, dataType: "json",
                    data: formData,
                    success: function (response) {
                        console.log(response);
                        if (response.res) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Вікторину відредаговано!',
                                showConfirmButton: false,
                                timer: 1500
                            }).then((result) => {
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    location.reload();
                                }
                            })
                        }
                    }
                });
            }else{
                formData.append("newQuizzes", JSON.stringify(newQuizzes));
                $.ajax({
                    type: "POST",
                    url: 'api/addNewQuizzes',
                    contentType: false, processData: false, dataType: "json",
                    data: formData,
                    success: function (response) {
                        if (response.res) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Нову вікторину добавлено!',
                                showConfirmButton: false,
                                timer: 1500
                            }).then((result) => {
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    location.reload();
                                }
                            })
                        }
                    }
                });
            }
        }
    })

    newQuizzes.questions.forEach((value, index) => {
        var itemView = "";
        $.each(value.answers, function (i, v) {
            var bg = "bg-color2";
            if (i == value.true_reply) {
                bg = "bg-success bg-gradient";
            }
            itemView += "<div class=\"p-md-2 mb-2 text-black rounded " + bg + "\">" + v + "</div>";
        });
        $("#List-Quizzes-Questions").append("<div class=\"text-center alert alert-dark\"><h5 class=\"pb-2 text-center fst-italic border-bottom\">" + value.question + "</h5>" + itemView + "<a class=\"link-secondary me-2\" href=\"javascript: editQuestions('"+index+"');\"><img src=\"public/assets/img/edit.svg\"></a><a class=\"link-secondary\" href=\"javascript: deleteQuestions('"+index+"');\"><img src=\"public/assets/img/delete.svg\"></a></div>")
    })
}

function swalSelect() {
    if (newQuizzes.theme) {
        return 'Вибрана тема: ' + newQuizzes.theme;
    } else {
        return 'Тема вікторини';
    }
}
function newQuizzesSave() {
    newQuizzes.title = $("#swal-name").val();
    newQuizzes.cover = $("#swal-cover").val();
}

function deleteQuestions(index){
    newQuizzes.questions.splice(index, 1);
    question = {
        question: "",
        answers: [],
        true_reply: 0
    };
    returnToQuizzesForm();
}

function editQuestions(index){
    question = newQuizzes.questions[index];
    addQuestions("edit", index);
}

function addQuestions(type, index) {
    if ($("#swal-name").val()) {
        newQuizzesSave();
    }
    confirmButtonText = "Добавити";
    title = "Добавити запитання";
    if(type == "edit"){
        confirmButtonText = "Зберегти";
        title = "Редагувати запитання";
    }

    Swal.fire({
        title: title,
        input: 'select',
        inputOptions: question.answers,
        inputPlaceholder: 'Правельна відповідь',
        inputValidator: (value) => {
            if (value) {
                question.true_reply = Number(value);
            }
        },
        html:
            '<input id="swal-question" class="swal2-input" placeholder="Запитання" value="' + question.question + '"> ' +
            '<p><b>Відповіді:</b></p>' +
            '<ol id="List-Questions-Answers"></ol>' +
            '<a class="link-secondary" href="javascript: addAnswers(\''+type+'\',\''+index+'\');">➕</a>',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'Скасувати',
        preConfirm: () => {
            questionSave();
            if (!question.question || !question.answers) {
                alert("Не всі поля були заповнені. Будьласка заповніт їх!");
                return false;
            }
            if(type == "edit"){
                newQuizzes.questions[index] = question;
            }else{
                newQuizzes.questions.push(question);
            }
            question = {
                question: "",
                answers: [],
                true_reply: 0
            };
            returnToQuizzesForm();
        }
    })

    question.answers.forEach((v, i) => {
        $("#List-Questions-Answers").append("<li class=\"d-flex justify-content-between\">"+v+"<a class=\"link-secondary\" href=\"javascript: deleteAnswers('"+i+"','"+type+"','"+index+"');\"><img src=\"public/assets/img/delete.svg\"></a></li>")
    })
}

function questionSave() {
    question.question = $("#swal-question").val();
}

function deleteAnswers(index, type, index2){
    question.answers.splice(index, 1);
    addQuestions(type, index2);
}

function addAnswers(type, index) {
    questionSave();

    Swal.fire({
        title: 'Добавити відповідь на запитання',
        html: '<input id="swal-answers" class="swal2-input" placeholder="Відповідь">',
        showCancelButton: true,
        confirmButtonText: 'Добавити',
        cancelButtonText: 'Скасувати',
        focusConfirm: false,
        preConfirm: () => {
            var answers = $("#swal-answers").val();
            if (!answers) {
                return false;
            }
            question.answers.push(answers);
            addQuestions(type, index);
        }
    })
}

function deleteQuizzes(id){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Видалення вікторини',
        text: "Ви дійсно хочете видалити дану вікторину?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Так!',
        cancelButtonText: 'Ні!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            formData = new FormData();
            formData.append("api_key", api_key);
            formData.append("id", id);
            $.ajax({
                type: "POST",
                url: 'api/deleteQuizzes',
                contentType: false, processData: false, dataType: "json",
                data: formData,
                success: function (response) {
                    if (response.res) {
                        swalWithBootstrapButtons.fire(
                            'Вікторину видалено!',
                            'Успішно видалено вікторину',
                            'success'
                        ).then((result) => {
                            location.reload();
                        })
                    } else {
                        swalWithBootstrapButtons.fire(
                            'Сталася помилка',
                            'Вікторину не було видалено!',
                            'error'
                        )
                    }
                }
            });
        }
    })
}

function addNewQuizzes() {
    if(newQuizzes.id){
        newQuizzes = {
            title: "",
            cover: "",
            theme: "",
            questions: []
        };
    }
    viewQuizzesForm("add");
}

function editQuizzes(id){
    quizzes.forEach((v, i) => {
        if(v.id == id){
            newQuizzes = v;
            viewQuizzesForm("edit");
        }
    })
}

function addAdministrators(){
    Swal.fire({
        title: 'Добавити адміністратора',
        html: '<input id="swal-administrators" class="swal2-input" placeholder="Email">',
        focusConfirm: false,
        preConfirm: () => {
            var email = $("#swal-administrators").val();
            if (!email) {
                return false;
            }
            formData = new FormData();
            formData.append("api_key", api_key);
            formData.append("email", email);
            $.ajax({
                type: "POST",
                url: 'api/addAdministrators',
                contentType: false, processData: false, dataType: "json",
                data: formData,
                success: function (response) {
                    if (response.res) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Адміністратора будо добавлено!',
                            showConfirmButton: false,
                            timer: 1500
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                location.reload();
                            }
                        })
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Адміністратора не було добавлено! Можливо такий уже присутній.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            });
        }
    })
}

function deleteAdministrators(email){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Видалення адміністратора',
        text: "Ви дійсно хочете видалити даного адміністратора?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Так!',
        cancelButtonText: 'Ні!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            formData = new FormData();
            formData.append("api_key", api_key);
            formData.append("email", email);
            $.ajax({
                type: "POST",
                url: 'api/deleteAdministrators',
                contentType: false, processData: false, dataType: "json",
                data: formData,
                success: function (response) {
                    if (response.res) {
                        swalWithBootstrapButtons.fire(
                            'Адміністратора видалено!',
                            'Успішно видалено адміністратора',
                            'success'
                        ).then((result) => {
                            location.reload();
                        })
                    } else {
                        swalWithBootstrapButtons.fire(
                            'Сталася помилка',
                            'Адміністратора не було видалено!',
                            'error'
                        )
                    }
                }
            });
        }
    })
}