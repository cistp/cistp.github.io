const { Query, User } = AV;
let classList;
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

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

$('.dateInput').flatpickr(
    {
        dateFormat: "Y-m-d",
        defaultDate: "today",
    }
);

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
        }
    })
    const query3 = new AV.Query('tutorList');
    query3.equalTo('isTutor', true);
    query3.find().then((tutors) => {
    for (let index = 0; index < tutors.length; index++) {
        const tutor = tutors[index];
        const name = tutor.get('tutorName');
        const id = tutor.get('user').id;
        $("#selTutor").append("<option value='" + id + "'>" + name + "</option>");
        $("#selTutorVH").append("<option value='" + tutors[index].id + "'>" + name + "</option>");
    }
    });
    const query4 = new AV.Query('option');
    query4.equalTo('optionName', 'customDateList');
    query4.find().then((dateList) => {
        if (dateList[0].get('value').length != 0) {
            $('#cudToggle').bootstrapToggle('on');
            $("#disableDate").flatpickr({
                dateFormat: "Y-m-d",
                mode: "multiple",
                defaultDate: dateList[0].get('value'),
                inline: true,
                onChange: function(selectedDates, dateStr, instance) {
                    const dateList = dateStr.split(', ');
                    const list = AV.Object.createWithoutData('option', '5fe033ed6289d841a0ef12d7');
                    list.set('value', dateList);
                    list.save();
                },
            });
        }
    })
    const query5 = new AV.Query('option');
    query5.equalTo('optionName', 'sysToggle');
    query5.find().then((dateList) => {
        if (dateList[0].get('value').length != 0) {
            $('#systemToggle').bootstrapToggle('off');
        } else {
            $('#systemToggle').bootstrapToggle('on');
        }
    })
    const query6 = new AV.Query('option');
    query6.equalTo('optionName', 'classesLimit');
    query6.find().then((val) => {
        if (val[0].get('value').length != 0) {
            $('#schLimit').val(val[0].get('value')[0]);
        } else {
            $('#schLimit').val("");
        }
    })
});

$('#systemToggle').change(function (e) { 
    e.preventDefault();
    if ($(this).prop('checked') == true) {
        const list = AV.Object.createWithoutData('option', '5fe248358fe09378f5cdd7af');
        list.set('value', []);
        list.save();
    } else {
        const list = AV.Object.createWithoutData('option', '5fe248358fe09378f5cdd7af');
        list.set('value', ["OFF"]);
        list.save();
    }
});

$('#cudToggle').change(function (e) { 
    e.preventDefault();
    if ($(this).prop('checked') == true) {
        $("#disableDate").flatpickr({
            dateFormat: "Y-m-d",
            mode: "multiple",
            inline: true,
            defaultDate: [],
            onChange: function(selectedDates, dateStr, instance) {
                const dateList = dateStr.split(', ');
                const list = AV.Object.createWithoutData('option', '5fe033ed6289d841a0ef12d7');
                list.set('value', dateList);
                list.save();
            },
        });
    } else {
        $('#disableDate').flatpickr().destroy();
        const list = AV.Object.createWithoutData('option', '5fe033ed6289d841a0ef12d7');
        list.set('value', []);
        list.save();
    }
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
        }
    })
});

$('.logout').click(function (e) {
    e.preventDefault();
    AV.User.logOut();
    window.location.href = "manage_login.html";
});

$('.calendar').click(function (e) { 
    e.preventDefault();
    $(".navbar-collapse").collapse('hide');
    $('.scheduleTab').hide();
    $('.userTab').hide();
    $('.tuteeTab').hide();
    $(".calendarTab").show();
});
$('.schedule').click(function (e) { 
    e.preventDefault();
    $(".navbar-collapse").collapse('hide');
    $('.calendarTab').hide();
    $('.userTab').hide();
    $('.tuteeTab').hide();
    $(".scheduleTab").show();
});
$('.user').click(function (e) { 
    e.preventDefault();
    $(".navbar-collapse").collapse('hide');
    $('.scheduleTab').hide();
    $('.calendarTab').hide();
    $('.tuteeTab').hide();
    $(".userTab").show();
});
$('.tutee').click(function (e) { 
    e.preventDefault();
    $(".navbar-collapse").collapse('hide');
    $('.scheduleTab').hide();
    $('.userTab').hide();
    $('.calendarTab').hide();
    $(".tuteeTab").show();
    const query = new AV.Query('tuteeList');
    query.equalTo('isTutee', true);
    query.find().then((tutees) => {
        for (let index = 0; index < tutees.length; index++) {
            const element = tutees[index];
            const comb2 = "<tr><td>" + element.get('name') +"</td><td>" + element.get('email') + '</td><td><button type="button" class="removeTutee btn btn-outline-primary" data-toggle="modal" data-target="#deleteTutee" value="' + element.id + '" tuteeName="' + element.get('name') + '"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button></td></tr>';
            $('.listTutee').append(comb2);
        }
    })
});

$('#form-register').submit(function (e) { 
    e.preventDefault();
    const user = new AV.User();
    const currentUser = AV.User.current().getSessionToken();
    user.setUsername($('#username').val());
    user.setPassword($('#pass').val());
    user.set('role', 'Tutor');
    user.signUp().then((user) => {
        alert("Register Successful!");
      }, (error) => {
        alert("User already exists");
        return;
      });
    setTimeout(() => {
        const tutorList = AV.Object.extend('tutorList');
        const tutorlist = new tutorList();
        tutorlist.set('tutorName', $('#name').val());
        tutorlist.set('user', user);
        tutorlist.set('email', $('#email').val());
        tutorlist.set('roomNumber', parseInt($('#rn').val()));
        tutorlist.save().then((tutorlist) => {
            $(this).closest('form').find("input[type=text], textarea, input[type=number]").val("");
            AV.User.become(currentUser).then((user) => {
                console.log('OK');
              }, (error) => {
                console.log('when login currentUser' + error);
              });
        }, (error) => {
            alert(error);
        });
    }, 1000);
});

$('#selTutor').change(function (e) { 
    e.preventDefault();
    $('#selDate').html(`<option value='0'>Select Date</option>`);
    tutorID = $(this).val();
    const query = new AV.Query('Classes');
    const user = AV.Object.createWithoutData('_User', tutorID);
    let array = [];
    query.equalTo('tutor', user);
    query.find().then((dates) => {
        classList = dates;
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
    $('#selTime').html(`<option value='0'>Select Time</option>`);
    dates = $('#selDate option:selected').text();
    let timeList = [];
    for (let index = 0; index < classList.length; index++) {
        const time = classList[index];
        if (dates == time.get('date')) {
            $("#selTime").append("<option>" + time.get('startTime') + "</option>");
        }
    };
});

$('#selTime').change(function (e) { 
    e.preventDefault();
    $('.Listtutee').html("");
    const time = $('#selTime option:selected').text();
    for (let index = 0; index < classList.length; index++) {
        const instance = classList[index];
        if (dates == instance.get('date') && time == instance.get('startTime')) {
            const tutee = instance.get('tutee');
            const elementID = instance.id;
            for (let index = 0; index < tutee.length; index++) {
                const element = tutee[index];
                let comb = "<tr><td>" + element +'</td><td><button type="button" class="removeTime btn btn-outline-primary" value="' + elementID + '" tutee="' + element + '"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button></td></tr>';
                $('.Listtutee').append(comb);
            }
            $('.Listtutee').append('<tr><td><button type="button" name="rmSchedule" id="rmSchedule" class="btn btn-danger" value="' + elementID + '" btn-lg btn-block>Remove Schedule</button></td></tr>');
        }
    };
});

$(".Listtutee").on('click', '#rmSchedule', function () {
    const classObj = AV.Object.createWithoutData('Classes', $(this).attr('value'));
    classObj.destroy();
    setTimeout(() => {
        $('#selTutor').val('0');
        $('#selDate').val('0');
        $('#selTime').val('0');
        $('.Listtutee').html("");
    }, 50);
});

$(".Listtutee").on('click', '.removeTime', function (e) { 
    e.preventDefault();
    const classObj = AV.Object.createWithoutData('Classes', $(this).attr('value'));
    classObj.remove('tutee', $(this).attr('tutee'));
    classObj.increment('tuteeAmount', -1);
    classObj.save();
    setTimeout(() => {
        $('#selTutor').val('0');
        $('#selDate').val('0');
        $('#selTime').val('0');
        $('.Listtutee').html("");
    }, 50);
});

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

$('#randomPassword').click(function (e) { 
    e.preventDefault();
    $('#pass').val(generatePassword());
});

$('#tuteeRandomPassword').click(function (e) { 
    e.preventDefault();
    $('#tuteePass').val(generatePassword());
});

$('#removeAllClasses').click(function (e) { 
    e.preventDefault();
    $('#rmAllClasses').modal('hide');
    const query = new AV.Query('Classes');
    query.equalTo('isActivate', true);
    query.find().then((list) => {
        console.log(list);
        AV.Object.destroyAll(list);
    });
    alert("All Classes were deleted");
});

if (width <= 500) {
    $('.cancelSelection').attr('class', 'd-flex align-items-start flex-column');
}

$('#schLimit').change(function (e) { 
    e.preventDefault();
    if (!$(this).val() || $(this).val() == 0) {
        const list = AV.Object.createWithoutData('option', '5fe924957b936022ab8601f9');
        list.set('value', []);
        list.save();
    } else {
        const list = AV.Object.createWithoutData('option', '5fe924957b936022ab8601f9');
        list.set('value', [parseInt($(this).val())]);
        list.save();
    }
});

$("#listTutor").click(function (e) { 
    e.preventDefault();
    $(this).remove();
    $('.ListAllTutor').html(`<table class="table" style="position: relative; top:15px;">
    <thead>
        <tr>
            <th scope="col">objectID</th>
            <th scope="col">Name</th>
            <th scope="col"></th>
        </tr>
    </thead>
    <tbody class="Listtutor"></tbody>
    </table>`);
    const query = new AV.Query('tutorList');
    query.equalTo('isTutor', true);
    query.find().then((tutors) => {
        for (let index = 0; index < tutors.length; index++) {
            const tutor = tutors[index];
            $('.Listtutor').append(`<tr><td>${tutor.get("user").id}</td><td>${tutor.get("tutorName")}</td><td><button type="button" class="removeTutor btn btn-outline-primary" data-toggle="modal" data-target="#deleteTutor" value="${tutor.id}" tutor="${tutor.get("tutorName")}"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button></td></tr>`);
        }
    });
});

$('.ListAllTutor').on('click', '.removeTutor',function () {
    const tutorID = AV.Object.createWithoutData('tutorList', $(this).attr('value'));
    const tutorName = $(this).attr('tutor');
    $('#rmModal').html(`Are you sure? Tutor ${tutorName}'s account will be deleted. This action can't be undo!`);
    $('#deleteTutor').modal({
        backdrop: 'static',
        keyboard: false
    }).on('click', '.confirm', function(e) {
        tutorID.destroy();
        alert(`Tutor ${tutorName} deleted`);
        setTimeout(() => {
            location.reload();
        }, 50);
      });
});

$('.listTutee').on('click', '.removeTutee',function () {
    const tuteeID = AV.Object.createWithoutData('tuteeList', $(this).val());
    const instanceID = $(this).val();
    const tuteeName = $(this).attr('tuteeName');
    $('#rmModalTutee').html(`Are you sure? Tutee ${tuteeName}'s account will be deleted. This action can't be undo!`);
    $('#deleteTutee').modal({
        backdrop: 'static',
        keyboard: false
    }).on('click', '.confirm', function(e) {
        const currentUser = AV.User.current().getSessionToken();
        const query = new AV.Query('tuteeList');
        query.get(instanceID).then((tuteeInstance) => {
            AV.User.logIn(tuteeInstance.get('email'), tuteeInstance.get('tuteePass')).then((user) => {
                user.destroy();
                AV.User.become(currentUser).then((user) => {
                    console.log('OK');
                    tuteeID.destroy();
                  }, (error) => {
                    console.log('when login currentUser' + error);
                  });
            }, (error) => {
              alert(`Error: ${error}`);
              return;
            });
        });
        alert(`Tutee ${tuteeName} deleted`);
        setTimeout(() => {
            location.reload();
        }, 500);
      });
});

$('#form-tuteeRegister').submit(function (e) { 
    e.preventDefault();
    const user = new AV.User();
    const currentUser = AV.User.current().getSessionToken();
    user.setUsername($('#tuteeEmail').val());
    user.setPassword($('#tuteePass').val());
    user.set('role', 'Tutee');
    user.signUp().then((user) => {
        alert("Register Successful!");
        const userTutee = user;
        AV.User.become(currentUser).then((user) => {
            setTimeout(() => {
                const tuteeList = AV.Object.extend('tuteeList');
                const tuteelist = new tuteeList();
                tuteelist.set('email', $('#tuteeEmail').val());
                tuteelist.set('user', userTutee);
                tuteelist.set('name', $('#tuteeName').val());
                tuteelist.set('tuteePass', $('#tuteePass').val());
                tuteelist.save().then((tuteelist) => {
                    $(this).closest('form').find("input[type=text], textarea, input[type=number]").val("");
                }, (error) => {
                    alert(error);
                });
            }, 500);
            console.log('OK');
          }, (error) => {
            console.log('when login currentUser' + error);
          });
      }, (error) => {
        alert("User already exists");
      });
});

$('#selTutorVH').change(function (e) {
    e.preventDefault();
    const query = new AV.Query('tutorList');
    query.get($(this).val()).then((tutorInstance) => {
        const VH = tutorInstance.get("volunteerHour");
        $('.VHcontrolElement').html(`<div class="d-flex justify-content-start">
        <button type="button" name="VHSub" id="VHSub" class="btn btn-outline-primary mr-2" btn-lg btn-block"><i class="fa fa-minus" aria-hidden="true"></i></button>
        <input type="text" class="form-control input-VH" style="width: 8%; text-align: center;" value="${VH}">
        <button type="button" name="VHAdd" id="VHAdd" class="btn btn-outline-primary ml-2" btn-lg btn-block"><i class="fa fa-plus" aria-hidden="true"></i></button>
    </div>
    <div class="mt-2">
        <button type="button" name="saveVH" id="saveVH" class="btn btn-primary" btn-lg btn-block">Save</button>
    </div>`);
    });
});

$('.VHcontrolElement').on('click', '#saveVH', function () {
    const tutor = AV.Object.createWithoutData('tutorList', $('#selTutorVH').val());
    tutor.set('volunteerHour', parseFloat($('.input-VH').val()));
    tutor.save();
    $('.VHcontrolElement').html("");
    $('#selTutorVH').val('0');
});

$('.VHcontrolElement').on('click', '#VHAdd', function () {
    $('.input-VH').val(parseFloat($('.input-VH').val()) + 0.25);
});

$('.VHcontrolElement').on('click', '#VHSub', function () {
    $('.input-VH').val(parseFloat($('.input-VH').val()) - 0.25);
});