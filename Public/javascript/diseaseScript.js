var a = [];

// Check off specific To Dos by clicking
$("ul").on("click", "li", function () {
  $(this).toggleClass("completed");
});

// Click on X to delete To Dos
$("ul").on("click", "span", function (event) {
  $(this)
    .parent()
    .fadeOut(500, function () {
      $(this).remove();
    });
  event.stopPropagation();
});

$("input[type='text'").keypress(function (event) {
  if (event.which === 13) {
    // grab new todo text from input
    var symptom = $(this).val();
    $(this).val("");
    a.push(symptom);
    // create a new li and add to ul
    $("ul").append(
      "<li><span><i class='fa fa-trash'></i></span> " + symptom + "</li>"
    );
  }
});

$(".fa-plus").click(function () {
  $("input[type='text'").fadeToggle();
});

// submit and post

$(document).ready(function () {
  $("form[id=2]").submit(function (event) {
    var formData = {
      disease: $("input[name=disease]").val(),
      symptoms: a,
    };

    $.ajax({
      type: "POST",
      url: "/disease",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
    });

    event.preventDefault();
  });
});
