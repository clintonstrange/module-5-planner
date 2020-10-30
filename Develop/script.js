// Geting time block textarea from localStorage - suggestion from Trilogy ASK BCS Learning Assistant
var renderEvents = function () {
  $("#event-9").val(localStorage.getItem("event-9"));
  $("#event-10").val(localStorage.getItem("event-10"));
  $("#event-11").val(localStorage.getItem("event-11"));
  $("#event-12").val(localStorage.getItem("event-12"));
  $("#event-13").val(localStorage.getItem("event-13"));
  $("#event-14").val(localStorage.getItem("event-14"));
  $("#event-15").val(localStorage.getItem("event-15"));
  $("#event-16").val(localStorage.getItem("event-16"));
  $("#event-17").val(localStorage.getItem("event-17"));
};

var loadPlanner = function () {
  var hourEl = $(".hour");
  var todaysDate = moment().format("dddd, MMMM Do YYYY");
  $("#currentDay").append(todaysDate);
  renderEvents();
  auditTime(hourEl);
};

$(".saveBtn").on("click", function () {
  var time = $(this).siblings("textarea").attr("id");
  var value = $(this).siblings("textarea").val();
  localStorage.setItem(time, value);
});

var auditTime = function (timeEl) {
  var eventEl = $(".future");

  for (var i = 0; i < timeEl.length; i++) {
    var time = $(timeEl[i]).attr("id");
    var currentTime = moment().format("HH");

    if (currentTime === time) {
      $(eventEl[i]).removeClass("future");
      $(eventEl[i]).addClass("present");
    }
    if (currentTime > time) {
      $(eventEl[i]).removeClass("future");
      $(eventEl[i]).addClass("past");
    }
  }
};

setInterval(function () {
  $(".container .time-block").each(function (el) {
    auditTime(el);
  });
}, 1000 * 60 * 5);

loadPlanner();
