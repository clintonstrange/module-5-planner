var eventEl = $(".future");
var hourEl = $(".hour");
var events = {};

var loadPlanner = function () {
  var todaysDate = moment().format("dddd, MMMM Do YYYY");
  $("#currentDay").append(todaysDate);
  auditTime(hourEl);
  events = JSON.parse(localStorage.getItem("events"));
  if (!events) {
    events = {
      text: $(".event").text().trim(),
    };
  }
};

var saveEvents = function () {
  localStorage.setItem("events", JSON.stringify(events));
};

$(".time-block").on("click", ".event", function () {
  var text = $(this).text().trim();
  var textInput = $("<textarea>").addClass("event col-10").val(text);
  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});

$(".time-block").on("blur", "textarea", function () {
  var text = $(this).val().trim();

  events.text = events;
  saveTasks();

  var textP = $("<p>").addClass("event col-10").text(text);

  $(this).replaceWith(textP);
  auditTime(hourEl);
});

$("time-block").on("click", ".saveBtn", function () {
  saveEvents();
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
  $(".container .time-block").each(function (index, el) {
    auditTask(el);
  });
}, 1000 * 60 * 5);

loadPlanner();

//each hour will be col-1 and the event-info will take up col-10 with the save button being col-1
