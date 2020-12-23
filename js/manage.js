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
var nameList = [
    'Time','Past','Future','Dev',
    'Fly','Flying','Soar','Soaring','Power','Falling',
    'Fall','Jump','Cliff','Mountain','Rend','Red','Blue',
    'Green','Yellow','Gold','Demon','Demonic','Panda','Cat',
    'Kitty','Kitten','Zero','Memory','Trooper','XX','Bandit',
    'Fear','Light','Glow','Tread','Deep','Deeper','Deepest',
    'Mine','Your','Worst','Enemy','Hostile','Force','Video',
    'Game','Donkey','Mule','Colt','Cult','Cultist','Magnum',
    'Gun','Assault','Recon','Trap','Trapper','Redeem','Code',
    'Script','Writer','Near','Close','Open','Cube','Circle',
    'Geo','Genome','Germ','Spaz','Shot','Echo','Beta','Alpha',
    'Gamma','Omega','Seal','Squid','Money','Cash','Lord','King',
    'Duke','Rest','Fire','Flame','Morrow','Break','Breaker','Numb',
    'Ice','Cold','Rotten','Sick','Sickly','Janitor','Camel','Rooster',
    'Sand','Desert','Dessert','Hurdle','Racer','Eraser','Erase','Big',
    'Small','Short','Tall','Sith','Bounty','Hunter','Cracked','Broken',
    'Sad','Happy','Joy','Joyful','Crimson','Destiny','Deceit','Lies',
    'Lie','Honest','Destined','Bloxxer','Hawk','Eagle','Hawker','Walker',
    'Zombie','Sarge','Capt','Captain','Punch','One','Two','Uno','Slice',
    'Slash','Melt','Melted','Melting','Fell','Wolf','Hound',
    'Legacy','Sharp','Dead','Mew','Chuckle','Bubba','Bubble','Sandwich','Smasher','Extreme','Multi','Universe','Ultimate','Death','Ready','Monkey','Elevator','Wrench','Grease','Head','Theme','Grand','Cool','Kid','Boy','Girl','Vortex','Paradox'
  ]; 
  
  var finalName = ""

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
    const query2 = new AV.Query('tuteeList');
    query2.equalTo('isTutee', true);
    query2.find().then((tutees) => {
        for (let index = 0; index < tutees.length; index++) {
            const element = tutees[index];
            const comb2 = "<tr><td>" + element.get('name') +"</td><td>" + element.get('email') + '</td></tr>';
            $('.listTutee').append(comb2);
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
    const user = new AV.User();
    const currentUser = AV.User.current().getSessionToken();
    user.setUsername($('#username').val());
    user.setPassword($('#pass').val());
    user.set('role', 'Tutor');
    user.signUp().then((user) => {
        alert(`Registered. ObjectID: ${user.id}`);
      }, (error) => {
        alert("User already exists");
        return;
      });
      AV.User.become(currentUser).then((user) => {
        console.log('Current User Login Successfully.');
      }, (error) => {
        console.log('when login currentUser' + error);
      });
    setTimeout(() => {
        const tutorList = AV.Object.extend('tutorList');
        const tutorlist = new tutorList();
        tutorlist.set('tutorName', $('#name').val());
        tutorlist.set('user', user);
        tutorlist.set('roomNumber', parseInt($('#rn').val()));
        tutorlist.save().then((tutorlist) => {
            $(this).closest('form').find("input[type=text], textarea").val("");
        }, (error) => {
            alert(error);
        });
    }, 1000);
});
$('#selTutor').change(function (e) { 
    e.preventDefault();
    tutorID = $(this).val();
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
    const query = new AV.Query('Classes');
    const user = AV.Object.createWithoutData('_User', tutorID);
    date = $('#selDate option:selected').text();
    query.equalTo('tutor', user);
    query.equalTo('date', date);
    query.find().then((times) => {
        for (let index = 0; index < times.length; index++) {
        const time = times[index];
        $("#selTime").append("<option value='" + time + "'>" + time.get('startTime') + "</option>");
        }
    });
});

$('#selTime').change(function (e) { 
    e.preventDefault();
    const query = new AV.Query('Classes');
    const user = AV.Object.createWithoutData('_User', tutorID);
    const time = $('#selTime option:selected').text();
    query.equalTo('tutor', user);
    query.equalTo('date', date);
    query.equalTo('startTime', time);
    query.find().then((class_) => {
        $('.Listtutee').html("");
        const tutee = class_[0].get('tutee');
        const elementID = class_[0].id;
        for (let index = 0; index < tutee.length; index++) {
            const element = tutee[index];
            let comb = "<tr><td>" + element +'</td><td><button type="button" class="removeTime btn btn-outline-primary" value="' + elementID + '" tutee="' + element + '"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button></td></tr>';
            $('.Listtutee').append(comb);
        }
    });
});

$(".Listtutee").on('click', '.removeTime',function (e) { 
    e.preventDefault();
    const classObj = AV.Object.createWithoutData('Classes', $(this).attr('value'));
    classObj.remove('tutee', $(this).attr('tutee'));
    classObj.increment('tuteeAmount', -1);
    classObj.save();
    setTimeout(() => {
        location.reload();
    }, 50);
});

function randName(){
	finalName = nameList[Math.floor( Math.random() * nameList.length )];
	finalName += nameList[Math.floor( Math.random() * nameList.length )];
	if ( Math.random() > 0.5 ) {
	finalName += nameList[Math.floor( Math.random() * nameList.length )];
}
	return finalName;
};

$('#randomUsername').click(function (e) { 
    e.preventDefault();
    $('#username').val(randName());
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