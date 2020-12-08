const { Query, User } = AV;
AV.init({
    appId: "PIK2R2tijm6BuxTj6sY91OAP-MdYXbMMI",
    appKey: "1dcvKnz8iUtkjfEExfCjwKMF",
  });
const currentUser = AV.User.current();
if (!currentUser) {
    window.location.href = 'manage_login.html';
}
if (currentUser.get("role") != "Admin") {
    window.location.href = 'manage_login.html';
}

$('.dateInput').flatpickr(
    {
        dateFormat: "Y-m-d",
        defaultDate: "today",
    }
);

$(document).ready(function () {
    const query = new AV.Query('Classes');
    const date = $('.dateInput').val();
    query.equalTo('date', date);
    query.notEqualTo('tutee', []);
    query.find().then((listClasses) => {
        for(var i = 0, len = listClasses.length; i < len; i++){
            const startTime = listClasses[i].attributes.startTime;
            if (startTime == "15:00") {
                const tutorID = listClasses[i].attributes.tutor.id;
                const tutee = listClasses[i].attributes.tutee;
                const query = new AV.Query('tutorList');
                const tutorUser = AV.Object.createWithoutData('_User', tutorID);
                query.equalTo('user', tutorUser);
                query.find().then((user) => {
                    tutorName = user[0].get('tutorName');
                    const comb = "<tr><td>" + tutorName +"</td><td>" + startTime + '</td><td>' + tutee + '</td></tr>';
                    $('.listTable').append(comb);
                })
            }
            if (startTime == "16:00") {
                const tutorID = listClasses[i].attributes.tutor.id;
                const tutee = listClasses[i].attributes.tutee;
                const query = new AV.Query('tutorList');
                const tutorUser = AV.Object.createWithoutData('_User', tutorID);
                query.equalTo('user', tutorUser);
                query.find().then((user) => {
                    tutorName = user[0].get('tutorName');
                    const comb = "<tr><td>" + tutorName +"</td><td>" + startTime + '</td><td>' + tutee + '</td></tr>';
                    $('.listTable').append(comb);
                })
            }
            if (startTime == "17:00") {
                const tutorID = listClasses[i].attributes.tutor.id;
                const tutee = listClasses[i].attributes.tutee;
                const query = new AV.Query('tutorList');
                const tutorUser = AV.Object.createWithoutData('_User', tutorID);
                query.equalTo('user', tutorUser);
                query.find().then((user) => {
                    tutorName = user[0].get('tutorName');
                    const comb = "<tr><td>" + tutorName +"</td><td>" + startTime + '</td><td>' + tutee + '</td></tr>';
                    $('.listTable').append(comb);
                })
            }
            if (startTime == "18:00") {
                const tutorID = listClasses[i].attributes.tutor.id;
                const tutee = listClasses[i].attributes.tutee;
                const query = new AV.Query('tutorList');
                const tutorUser = AV.Object.createWithoutData('_User', tutorID);
                query.equalTo('user', tutorUser);
                query.find().then((user) => {
                    tutorName = user[0].get('tutorName');
                    const comb = "<tr><td>" + tutorName +"</td><td>" + startTime + '</td><td>' + tutee + '</td></tr>';
                    $('.listTable').append(comb);
                })
            }
        }
    })
    const query2 = new AV.Query('tuteeList');
    query2.equalTo('isTutee', true);
    query2.find().then((tutees) => {
        for (let index = 0; index < tutees.length; index++) {
            const element = tutees[index];
            const comb2 = "<tr><td>" + element.get('name') +"</td><td>" + element.get('email') + '</td></tr>';
            $('.listTutee').append(comb2);
        }
    })
});

$('.dateInput').change(function (e) { 
    e.preventDefault();
    $('.listTable').html("");
    const query = new AV.Query('Classes');
    const date = $('.dateInput').val();
    query.equalTo('date', date);
    query.notEqualTo('tutee', []);
    query.find().then((listClasses) => {
        for(var i = 0, len = listClasses.length; i < len; i++){
            const startTime = listClasses[i].attributes.startTime;
            if (startTime == "15:00") {
                const tutorID = listClasses[i].attributes.tutor.id;
                const tutee = listClasses[i].attributes.tutee;
                const query = new AV.Query('tutorList');
                const tutorUser = AV.Object.createWithoutData('_User', tutorID);
                query.equalTo('user', tutorUser);
                query.find().then((user) => {
                    tutorName = user[0].get('tutorName');
                    const comb = "<tr><td>" + tutorName +"</td><td>" + startTime + '</td><td>' + tutee + '</td></tr>';
                    $('.listTable').append(comb);
                })
            }
            if (startTime == "16:00") {
                const tutorID = listClasses[i].attributes.tutor.id;
                const tutee = listClasses[i].attributes.tutee;
                const query = new AV.Query('tutorList');
                const tutorUser = AV.Object.createWithoutData('_User', tutorID);
                query.equalTo('user', tutorUser);
                query.find().then((user) => {
                    tutorName = user[0].get('tutorName');
                    const comb = "<tr><td>" + tutorName +"</td><td>" + startTime + '</td><td>' + tutee + '</td></tr>';
                    $('.listTable').append(comb);
                })
            }
            if (startTime == "17:00") {
                const tutorID = listClasses[i].attributes.tutor.id;
                const tutee = listClasses[i].attributes.tutee;
                const query = new AV.Query('tutorList');
                const tutorUser = AV.Object.createWithoutData('_User', tutorID);
                query.equalTo('user', tutorUser);
                query.find().then((user) => {
                    tutorName = user[0].get('tutorName');
                    const comb = "<tr><td>" + tutorName +"</td><td>" + startTime + '</td><td>' + tutee + '</td></tr>';
                    $('.listTable').append(comb);
                })
            }
            if (startTime == "18:00") {
                const tutorID = listClasses[i].attributes.tutor.id;
                const tutee = listClasses[i].attributes.tutee;
                const query = new AV.Query('tutorList');
                const tutorUser = AV.Object.createWithoutData('_User', tutorID);
                query.equalTo('user', tutorUser);
                query.find().then((user) => {
                    tutorName = user[0].get('tutorName');
                    const comb = "<tr><td>" + tutorName +"</td><td>" + startTime + '</td><td>' + tutee + '</td></tr>';
                    $('.listTable').append(comb);
                })
            }
        }
    })
});

$('.logout').click(function (e) {
    e.preventDefault();
    AV.User.logOut();
    window.location.href = "manage_Login.html";
});

$('.calendar').click(function (e) { 
    e.preventDefault();
    $('.scheduleTab').fadeOut();
    $('.userTab').fadeOut();
    $('.tuteeTab').fadeOut();
    setTimeout(() => {
        $(".calendarTab").fadeIn();
      }, 500);
});
$('.schedule').click(function (e) { 
    e.preventDefault();
    $('.calendarTab').fadeOut();
    $('.userTab').fadeOut();
    $('.tuteeTab').fadeOut();
    setTimeout(() => {
        $(".scheduleTab").fadeIn();
      }, 500);
});
$('.user').click(function (e) { 
    e.preventDefault();
    $('.scheduleTab').fadeOut();
    $('.calendarTab').fadeOut();
    $('.tuteeTab').fadeOut();
    setTimeout(() => {
        $(".userTab").fadeIn();
      }, 500);
});
$('.tutee').click(function (e) { 
    e.preventDefault();
    $('.scheduleTab').fadeOut();
    $('.userTab').fadeOut();
    $('.calendarTab').fadeOut();
    setTimeout(() => {
        $(".tuteeTab").fadeIn();
      }, 500);
});

$('#form-register').submit(function (e) { 
    e.preventDefault();
    const username = $('#username').val();
    const password = $('#pass').val();
    const realname = $('#name').val();
    const user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    user.set('role', 'Tutor');
    user.signUp().then((user) => {
        alert(`Registered. ObjectID: ${user.id}`);
      }, (error) => {
        alert("User already exists");
        return;
      });
    const tutorList = AV.Object.extend('tutorList');
    const tutorlist = new tutorList();
    tutorlist.set('isTutor', true);
    tutorlist.set('tutorName', realname);
    tutorlist.set('user', AV.User.current());
    tutorlist.save().then((tutorlist) => {
        AV.User.logOut();
        location.reload();
      }, (error) => {
        alert("Error when saving Tutor")
      })
});
