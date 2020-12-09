var tutorID;
var date;
var class__;

const { Query, User } = AV;
AV.init({
    appId: "PIK2R2tijm6BuxTj6sY91OAP-MdYXbMMI",
    appKey: "1dcvKnz8iUtkjfEExfCjwKMF",
  });

function unique(arr) {
  var array = [];
  for (var i = 0; i < arr.length; i++) {
      if (array .indexOf(arr[i]) === -1) {
          array .push(arr[i])
      }
  }
  return array;
}

$(document).ready(function () {
  const query = new AV.Query('tutorList');
  query.equalTo('isTutor', true);
  query.find().then((tutors) => {
    for (let index = 0; index < tutors.length; index++) {
      const tutor = tutors[index];
      const name = tutor.get('tutorName');
      const id = tutor.get('user').id;
      $("#selTutor").append("<option value='" + id + "'>" + name + "</option>");
    }
  });
});

$('#selTutor').change(function (e) { 
  e.preventDefault();
  tutorID = $(this).val();
  $(".step1").fadeOut();
  setTimeout(() => {
    $(".step2").fadeIn();
  }, 500);
  const query = new AV.Query('Classes');
  const user = AV.Object.createWithoutData('_User', tutorID);
  let array = [];
  query.equalTo('tutor', user);
  query.find().then((dates) => {
    for (let index = 0; index < dates.length; index++) {
      const date = dates[index];
      array.push(date.get('date'));
    };
    uArray = unique(array);
    for (let index = 0; index < uArray.length; index++) {
      const element = uArray[index];
      $("#selDate").append("<option>" + element + "</option>");
    }
  });
});

$('#selDate').change(function (e) { 
  e.preventDefault();
  $(".step2").fadeOut();
  setTimeout(() => {
    $(".step3").fadeIn();
  }, 500);
  const query = new AV.Query('Classes');
  const user = AV.Object.createWithoutData('_User', tutorID);
  date = $('#selDate option:selected').text();
  query.equalTo('tutor', user);
  query.equalTo('date', date);
  query.lessThan('tuteeAmount', 2);
  query.find().then((times) => {
    for (let index = 0; index < times.length; index++) {
      const time = times[index];
      $("#selTime").append("<option value='" + time + "'>" + time.get('startTime') + "</option>");
    }
  });
});

$('#selTime').change(function (e) { 
  e.preventDefault();
  $(".step3").fadeOut();
  setTimeout(() => {
    $(".step4").fadeIn();
  }, 500);
  const query = new AV.Query('Classes');
  const user = AV.Object.createWithoutData('_User', tutorID);
  const time = $('#selTime option:selected').text();
  query.equalTo('tutor', user);
  query.equalTo('date', date);
  query.equalTo('startTime', time);
  query.lessThan('tuteeAmount', 2);
  query.find().then((class_) => {
    class__ = class_[0].id;
  });
});

function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($("#email").val())){
    return true;
  }
    alert("You have entered an invalid email address!");
    return false;
}

$('.scheduleClass').click(function (e) { 
  e.preventDefault();
  if ($("#name").val() == "" || $("#email").val() == "") {
    alert("Please enter tutee's name and email");
    return;
  } else if (!ValidateEmail()){
    return;
  };
  name = $("#name").val();
  email = $("#email").val();
  const classes = AV.Object.createWithoutData('Classes', class__);
  classes.add('tutee', name);
  classes.increment('tuteeAmount', 1);
  classes.save();
  Email.send({
    SecureToken : "d95cdaf6-dff2-43de-8f9a-146b634f335d",
    To : email,
    From : "jiawenli233@gmail.com",
    Subject : "Test Subject",
    Body : "Test Body"
  }).then();
  $(".step4").fadeOut();
    setTimeout(() => {
      $(".step5").fadeIn();
    }, 500);
  const query = new AV.Query('tuteeList');
  query.equalTo("name", name);
  query.find().then((tutee) => {
    if (tutee) {
      return
    } else {
      const tuteeL = AV.Object.extend('tuteeList');
      const tuteel = new tuteeL();
      tuteel.set('name', name);
      tuteel.set('email', email);
    }
  });
});

