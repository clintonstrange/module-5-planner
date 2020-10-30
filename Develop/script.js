var eventEl = $(".future");
var hourEl = $(".hour");
var events = JSON.parse(localStorage.getItem("events")) || [];

var renderEvents = function (events) {
  console.log(events);
  for (var i = 0; i < events.length; i++) {
    $("#" + events[i].id).val(events[i].text);
  }
};

var loadPlanner = function () {
  var todaysDate = moment().format("dddd, MMMM Do YYYY");
  $("#currentDay").append(todaysDate);
  renderEvents(events);
  auditTime(hourEl);
};

var saveEvents = function () {
  localStorage.setItem("events", JSON.stringify("events"));
};

$(".saveBtn").on("click", function () {
  // console.log(this);
  var event = {
    text: $(this).siblings("textarea").val(),
    id: $(this).siblings("textarea").attr("id"),
  };
  //console.log("clicked:", event);

  // var timeBtnSave = $(this).attr("id");
  // console.log(timeBtnSave);
  // var eventIdKey = events.keys();
  // for (key of eventIdKey) {
  //   console.log(key);
  //   var tempArr = ;
  //   console.log(tempArr.val());
  // }

  // var eventIdValue = event.id.values();
  // console.logeventIdValue;
  // for (values of eventIdValue) {
  //   console.log(values);
  // }
  // console.log(eventIdValue);
  // events.splice(match(event.id), 1);
  console.log(events);
  var newEvent = events.filter(function (event) {
    return events.id !== event.id;
  });
  console.log(newEvent);
  // console.log(newEvent.id);
  // console.log(events);
  // console.log(event.id);
  //events.push(newEvent);
  newEvent.push(event);
  //console.log(events);

  localStorage.setItem("events", JSON.stringify(events));
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
    auditTime(el);
  });
}, 1000 * 60 * 5);

loadPlanner();
