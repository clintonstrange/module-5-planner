var eventEl = $(".future");
var hourEl = $(".hour");
// var eventClassEl = $(".event");
// var btnClassEl = $(".saveBtn");
// var events = localStorage.getItem("events") || [];
var events = [];

var loadPlanner = function () {
  var todaysDate = moment().format("dddd, MMMM Do YYYY");
  $("#currentDay").append(todaysDate);

  auditTime(hourEl);
};

var saveEvents = function () {
  localStorage.setItem("events", JSON.stringify("events"));
};

$(".time-block").on("click", ".event", function (event) {
  var text = $(this).text().trim();
  var textInput = $("<textarea>").addClass("event col-10").val(text);
  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});

$(".time-block").on("blur", "textarea", function () {
  var text = $(this).val().trim();

  var textP = $("<p>").addClass("event col-10").text(text);

  $(this).replaceWith(textP);
  auditTime(hourEl);
});

$(".time-block").on("click", ".saveBtn", function () {
  var event = {
    text: $(".event").text().trim(),
  };
  console.log(event);

  var timeBtnSave = $(this).attr("id");
  console.log(timeBtnSave);

  events.push(event);
  console.log(events);
});

var auditTime = function (timeEl) {
  for (var i = 0; i < timeEl.length; i++) {
    var time = $(timeEl[i]).attr("id");
    //console.log(time);
    var currentTime = moment().format("HH");
    //console.log(currentTime);

    if (currentTime === time) {
      //console.log("present");
      $(eventEl[i]).removeClass("future");
      $(eventEl[i]).addClass("present");
    }
    if (currentTime > time) {
      //console.log("past");
      $(eventEl[i]).removeClass("future");
      $(eventEl[i]).addClass("past");
    }
  }
};

setInterval(function () {
  $(".container .time-block").each(function (el) {
    auditTask(el);
  });
}, 1000 * 60 * 5);

loadPlanner();
