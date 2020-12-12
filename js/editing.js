const { Query, User } = AV;
AV.init({
    appId: "PIK2R2tijm6BuxTj6sY91OAP-MdYXbMMI",
    appKey: "1dcvKnz8iUtkjfEExfCjwKMF",
  });
const currentUser = AV.User.current();
if (!currentUser) {
    window.location.href = 'login.html';
}
$(document).ready(function () {
    const tutor = AV.User.current();
    const query = new AV.Query('Classes');
    const timeMapping = { "1500": 230000, "1600": 000000, "1700": 010000, "1800": 020000, "1900": 030000 };
    query.equalTo('tutor', tutor);
    query.find().then((listClasses) => {
        for(var i = 0, len = listClasses.length; i < len; i++){
            const replaceDate = listClasses[i].attributes.date.replaceAll('-', '');
            const getTime = listClasses[i].attributes.startTime.replace(':', '');
            let comb = "<tr><td>" + listClasses[i].attributes.date +"</td><td>" + listClasses[i].attributes.startTime + '</td><td>' + listClasses[i].attributes.tutee + '</td>' + '<td><button type="button" class="removeTime btn btn-outline-primary" value="' + listClasses[i].id + '"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button></td><td><a name="addEvent" id="addEvent" class="btn btn-primary" href=' + `https://www.google.com/calendar/render?action=TEMPLATE&text=Tutoring%20Program&dates=${replaceDate}T${timeMapping[getTime]}Z/${replaceDate}T${timeMapping[getTime]+10000}Z&details=CIS%20Tutoring%20Program&location=Discord&sprop=&sprop=name:` + ' role="button">Add to Google Calendar</a></td></tr>';
            $('.listTable').append(comb);
        }
    })
});
$('.logout').click(function (e) { 
    e.preventDefault();
    AV.User.logOut();
    window.location.href = "login.html";
});

$('.dateInput').flatpickr(
    {
        "disable": [
            function(date) {
                return (date.getDay() === 0 || date.getDay() === 7);
            }
        ],
        mode: "multiple",
        dateFormat: "Y-m-d",
    }
);
$('.timeInput').flatpickr(
    {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        minTime: "15:00",
        maxTime: "17:00",
        static: true,
    }
);
$('.createSchedule').click(function (e) { 
    e.preventDefault();
    const tutor = AV.User.current();
    if (!$('.dateInput').val() || !$('.timeInput').val()) {
        alert("Please enter a date and time!");
    } else {
        if ($('.dateInput').val().indexOf(",") != -1) {
            const date = $('.dateInput').val().split(", ");
            let conf = false;
            for (let index = 0; index < date.length; index++) {
                const element = date[index];
                const Classes = AV.Object.extend('Classes');
                const classes = new Classes();
                classes.set('date', element);
                classes.set('startTime', $('.timeInput').val());
                classes.set('tutee', []);
                classes.set('tuteeAmount', 0);
                classes.set('tutor', tutor);
                const query = new AV.Query('Classes');
                query.equalTo('tutor', tutor);
                query.equalTo('date', element);
                query.equalTo('startTime', $('.timeInput').val());
                query.find().then((clas) => {
                    setTimeout(() => {
                        if (clas.length == 0) {
                            classes.save().then((cls) => {}, (error) => {
                                alert("An error occurred when saving, contact officers for help.")
                                console.log(error);
                              });
                        } else {
                            conf = true;
                        }
                    }, 100);
                });
            }
            if (conf) {
                alert("Time Conflict!");
            }
            location.reload();
        } else {
            const query = new AV.Query('Classes');
            query.equalTo('tutor', tutor);
            query.equalTo('date', $('.dateInput').val());
            query.equalTo('startTime', $('.timeInput').val());
            query.find().then((classe) => {
                if (classe.length == 0) {
                    const Classes = AV.Object.extend('Classes');
                    const classes = new Classes();
                    classes.set('date', $('.dateInput').val());
                    classes.set('startTime', $('.timeInput').val());
                    classes.set('tutee', []);
                    classes.set('tuteeAmount', 0);
                    classes.set('tutor', tutor);
                    classes.save().then((classes) => {
                        location.reload();
                    });
                } else {
                    alert("Time Conflict!");
                    return;
                }
            });
        }
    }
});

$(".listTable").on('click', '.removeTime',function (e) { 
    e.preventDefault();
    const classes = AV.Object.createWithoutData('Classes', $(this).attr('value'));
    classes.destroy();
    setTimeout(() => {
        location.reload();
    }, 50);
});