var eventEl = $(".future");
var hourEl = $(".hour");

var loadDate = function () {
  var todaysDate = moment().format("dddd, MMMM Do YYYY");
  $("#currentDay").append(todaysDate);
  auditTime(hourEl);
};

var auditTime = function (timeEl) {
  for (var i = 0; i < timeEl.length; i++) {
    var time = $(timeEl[i]).text().trim();
    var convertedTime = moment(time, "LT");

    if (moment().isAfter(convertedTime)) {
      $(eventEl[i]).removeClass("future");
      $(eventEl[i]).addClass("past");
    } else if (Math.abs(moment().diff(convertedTime, "hours")) < 1) {
      $(eventEl[i]).removeClass("future");
      $(eventEl[i]).addClass("present");
    }
  }
};

loadDate();

//each hour will be col-1 and the event-info will take up col-10 with the save button being col-1
