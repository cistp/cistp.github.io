let tutorID, date, user, tutorsName, time, class__, tAmount, rn, classInstance, tutorEmail;
let dateList = [];

const { Query, User } = AV;
AV.init({
    appId: "PIK2R2tijm6BuxTj6sY91OAP-MdYXbMMI",
    appKey: "1dcvKnz8iUtkjfEExfCjwKMF",
  });

  function unique(arr) {
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {
            array.push(arr[i])
        }
    }
    return array;
  }
  
  function setCookie(cookieName, val) {
    let date = new Date();
  　date.setDate(date.getDate()+1024);
  　date.toGMTString();
    document.cookie = `${cookieName}=${val};expires=${date}`
  }
  
  function rmCookie(cookieName) {
    if (document.cookie.length > 0) {
      let cookies = decodeURIComponent(document.cookie).split(";");
      for (let index = 0; index < cookies.length; index++) {
        const c = cookies[index].split("=");
        if (c.includes(cookieName)) {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      }
    }
  }
  
  function getCookie(cookieName) {
    if (document.cookie.length > 0) {
      let cookies = decodeURIComponent(document.cookie).split(";");
      for (let index = 0; index < cookies.length; index++) {
        const c_name = cookies[index].split("=")[0];
        if (c_name == cookieName) {
          return cookies[index].split("=")[1];
        }
      }
    }
    return "";
  }
  
$(document).ready(function () {
  if (getCookie('language') == "zh_cn") {
    location.href = 'index_cn.html'
  }
  const currentUser = AV.User.current();
  if (currentUser && currentUser.get('role') == "Tutee") {
    $('.navbar-right').html(`<a class="nav-link logout" href="#">Logout</a>`);
  } else {
    $('.step1').hide();
    if (getCookie('email') != "") {
      $('#email').val(getCookie('email'));
      $('#rememberEmail').attr('checked', true);
    }
    $('.login').show();
  }
  const query2 = new AV.Query('option');
  query2.equalTo('optionName', 'sysToggle');
  query2.find().then((optionVal) => {
    if (optionVal[0].get('value').length != 0) {
      $('.main').html(`<div class="container-fluid">
      <div class="unavailable" style="position: relative; top: 15px;">
        <div class="card text-white bg-danger" style="margin: auto; width: fit-content; padding: 10px;">
          <div class="card-body">
            <h4 class="card-title">Error</h4>
            <h5>Scheduling is currently unavailable</h5>
            <small>If you have any question, contact our officers for help!</small>
          </div>
        </div>
      </div>
    </div>`);
    return;
    }
  })
  const query = new AV.Query('tutorList');
  query.equalTo('isTutor', true);
  query.find().then((tutors) => {
    for (let index = 0; index < tutors.length; index++) {
      const tutor = tutors[index];
      tutorsName = tutor.get('tutorName');
      const id = tutor.get('user').id;
      $("#selTutor").append("<option value='" + id + "'>" + tutorsName + "</option>");
    }
  })
});

$('#form-login').submit(function (e) { 
  e.preventDefault();
  const username = $('#email').val();
  const password = $('#pass').val();
  AV.User.logIn(username, password).then((User) => {
    if (User.get("role") != "Tutee") {
      AV.User.logOut();
    } else {
      if ($('#rememberEmail').is(":checked")) {
        setCookie('email', username);
      } else {
        rmCookie('email');
      }
      setTimeout(() => {
        location.reload();
      }, 50);
    }
  }, (error) => {
    $(".loginError").show();
  });
  return false;
});

$('.navbar-right').on('click', '.logout', function () {
  AV.User.logOut();
  setTimeout(() => {
    location.reload();
  }, 50);
});

$('#selTutor').change(function (e) { 
  e.preventDefault();
  $(".step1").hide();
  $(".step2").show();
  tutorID = $(this).val();
  tutorsName = $("#selTutor option:selected").text();
  user = AV.Object.createWithoutData('_User', tutorID);
  let array = [];
  const query = new AV.Query('Classes');
  query.equalTo('tutor', user);
  query.find().then((dates) => {
    classInstance = dates;
    for (let index = 0; index < dates.length; index++) {
      const date = dates[index];
      if (date.get('tuteeAmount') <= 2) {
        array.push(date.get('date'));
      }
    };
    uArray = unique(array);
    for (let index = 0; index < uArray.length; index++) {
      const element = uArray[index];
      dateList.push(element);
    }
    let dateListNew = dateList;
    if (dateListNew.length == 0) {
      dateListNew = ["2999-1-1"];
    }
    $("#selDate").flatpickr({
      dateFormat: "Y-m-d",
      enable: dateListNew,
      inline: true
    });
  });
  const query1 = new AV.Query('tutorList');
  query1.equalTo('user', user);
  query1.find().then((tutor) => {
    rn = tutor[0].get('roomNumber');
    tutorEmail = tutor[0].get('email');
  })
});

$('#selDate').change(function (e) { 
  e.preventDefault();
  $(".step2").hide();
  $(".step3").show();
  date = $('#selDate').val();
  for (let index = 0; index < classInstance.length; index++) {
    const times = classInstance[index];
    if (times.get('date') == date) {
      $("#selTime").append("<option>" + times.get('startTime') + "</option>"); 
    }
  }
});

$('#selTime').change(function (e) { 
  e.preventDefault();
  $(".step3").hide();
  $(".step4").show();
  time = $('#selTime option:selected').text();
  const query = new AV.Query('tuteeList');
  query.equalTo('user', AV.User.current());
  query.find().then((tutee) => {
    name = tutee[0].get('name');
    email = tutee[0].get('email');
    $('#name').val(name);
    $('#emailTutee').val(email);
    $('#date').val(date);
    $('#time').val(time);
    for (let index = 0; index < classInstance.length; index++) {
      const cls = classInstance[index];
      if (cls.get('date') == date && cls.get('startTime') == time) {
        class__ = cls.id;
        tAmount = cls.get('tuteeAmount') + 1;
      }
    }
  })
});

$('.scheduleClass').click(function (e) {
  e.preventDefault();
  const query = new AV.Query('option');
  query.equalTo('optionName', 'sysToggle');
  query.find().then((optionVal) => {
    if (optionVal[0].get('value').length != 0) {
      return;
    }
  const query2 = new AV.Query('option');
  query2.equalTo('optionName', 'classesLimit');
  query2.find().then((val) => {
    if (val[0].get('value').length != 0) {
      let amountCount = 0;
      const classLimit = val.get('value')[0];
      for (let index = 0; index < classInstance.length; index++) {
        const cls = classInstance[index];
        if (cls.get('tutee').includes(name)) {
          amountCount++;
        }
      }
      if (amountCount >= classLimit) {
        alert("Unable to Schedule Class. Reason: You've scheduled too many classes.");
        setTimeout(() => {
          location.reload();
        }, 100);
      }
    }
  });
    setTimeout(() => {
      const query = new AV.Query('Classes');
      query.get(class__).then((class_) => {
        if (class_.get('tutee').includes(name)) {
          return;
        }
        if (!AV.User.current()) {
          return;
        }
        if (class_.get('tuteeAmount') >= 2) {
          alert("Sorry, this class is full");
          setTimeout(() => {
            location.reload();
          }, 100);
        } else {
          const classes = AV.Object.createWithoutData('Classes', class__);
          classes.add('tutee', name);
          classes.increment('tuteeAmount', 1);
          classes.save();
          Email.send({
            SecureToken : "f9e49ab6-a7e5-434e-894b-1b9e23cffb0b",
            To : email,
            From : "cistp20@gmail.com",
            Subject : "Thank you for joining us",
            Body : `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
            <head>
            <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
            <meta content="width=device-width" name="viewport"/>
            <!--[if !mso]><!-->
            <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
            <!--<![endif]-->
            <title></title>
            <!--[if !mso]><!-->
            <!--<![endif]-->
            <style type="text/css">
                body {
                  margin: 0;
                  padding: 0;
                }
            
                table,
                td,
                tr {
                  vertical-align: top;
                  border-collapse: collapse;
                }
            
                * {
                  line-height: inherit;
                }
            
                a[x-apple-data-detectors=true] {
                  color: inherit !important;
                  text-decoration: none !important;
                }
              </style>
            <style id="media-query" type="text/css">
                @media (max-width: 520px) {
            
                  .block-grid,
                  .col {
                    min-width: 320px !important;
                    max-width: 100% !important;
                    display: block !important;
                  }
            
                  .block-grid {
                    width: 100% !important;
                  }
            
                  .col {
                    width: 100% !important;
                  }
            
                  .col_cont {
                    margin: 0 auto;
                  }
            
                  img.fullwidth,
                  img.fullwidthOnMobile {
                    max-width: 100% !important;
                  }
            
                  .no-stack .col {
                    min-width: 0 !important;
                    display: table-cell !important;
                  }
            
                  .no-stack.two-up .col {
                    width: 50% !important;
                  }
            
                  .no-stack .col.num2 {
                    width: 16.6% !important;
                  }
            
                  .no-stack .col.num3 {
                    width: 25% !important;
                  }
            
                  .no-stack .col.num4 {
                    width: 33% !important;
                  }
            
                  .no-stack .col.num5 {
                    width: 41.6% !important;
                  }
            
                  .no-stack .col.num6 {
                    width: 50% !important;
                  }
            
                  .no-stack .col.num7 {
                    width: 58.3% !important;
                  }
            
                  .no-stack .col.num8 {
                    width: 66.6% !important;
                  }
            
                  .no-stack .col.num9 {
                    width: 75% !important;
                  }
            
                  .no-stack .col.num10 {
                    width: 83.3% !important;
                  }
            
                  .video-block {
                    max-width: none !important;
                  }
            
                  .mobile_hide {
                    min-height: 0px;
                    max-height: 0px;
                    max-width: 0px;
                    display: none;
                    overflow: hidden;
                    font-size: 0px;
                  }
            
                  .desktop_hide {
                    display: block !important;
                    max-height: none !important;
                  }
                }
              </style>
            </head>
            <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
            <!--[if IE]><div class="ie-browser"><![endif]-->
            <table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top;" valign="top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
            <div style="background-color:transparent;">
            <div class="block-grid" style="min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
            <div class="col_cont" style="width:100% !important;">
            <!--[if (!mso)&(!IE)]><!-->
            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
            <!--<![endif]-->
            <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Signup Success" border="0" class="center fixedwidth" src="https://raw.githubusercontent.com/cistp/cistp.github.io/main/IMG_0068.jpg" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 100px; display: block;" title="Signup Success" width="100"/>
            <!--[if mso]></td></tr></table><![endif]-->
            </div>
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
            <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
            <div style="line-height: 1.5; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 18px;">
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">Hi ${name},</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">Thank you for joining the CIS Tutoring Program.</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"> </p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"><strong>Class Date/Time:</strong></p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">${time} - ${date}(PST)</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"><strong>Tutor:</strong></p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">${tutorsName}</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"><strong>Class Attendance:</strong></p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">${tAmount} of 2 spots filled</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"><strong>Location:</strong></p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">Discord - Room ${rn}</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"> </p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">If you have any question, feel free to contact our officers for help.</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">If you no longer want to attend to this class. Click the link below to cancel.</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"><a href="https://cistp.github.io/cancel.html?name=${name}&date=${date}&time=${time}&id=${class__}">https://cistp.github.io/cancel.html?name=${name}&date=${date}&time=${time}&id=${class__}</a></p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"> </p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">See you soon!</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"> </p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">Best regards,</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">Community Improvement Service</p>
            </div>
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if (!mso)&(!IE)]><!-->
            </div>
            <!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
            </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if (IE)]></div><![endif]-->
            </body>
            </html>`,
          }).then(
            message => console.log(message)
          );
          Email.send({
            SecureToken : "f9e49ab6-a7e5-434e-894b-1b9e23cffb0b",
            To : tutorEmail,
            From : "cistp20@gmail.com",
            Subject : `${name} is attending to your class`,
            Body : `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
            <head>
            <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
            <meta content="width=device-width" name="viewport"/>
            <!--[if !mso]><!-->
            <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
            <!--<![endif]-->
            <title></title>
            <!--[if !mso]><!-->
            <!--<![endif]-->
            <style type="text/css">
                body {
                  margin: 0;
                  padding: 0;
                }
            
                table,
                td,
                tr {
                  vertical-align: top;
                  border-collapse: collapse;
                }
            
                * {
                  line-height: inherit;
                }
            
                a[x-apple-data-detectors=true] {
                  color: inherit !important;
                  text-decoration: none !important;
                }
              </style>
            <style id="media-query" type="text/css">
                @media (max-width: 520px) {
            
                  .block-grid,
                  .col {
                    min-width: 320px !important;
                    max-width: 100% !important;
                    display: block !important;
                  }
            
                  .block-grid {
                    width: 100% !important;
                  }
            
                  .col {
                    width: 100% !important;
                  }
            
                  .col_cont {
                    margin: 0 auto;
                  }
            
                  img.fullwidth,
                  img.fullwidthOnMobile {
                    max-width: 100% !important;
                  }
            
                  .no-stack .col {
                    min-width: 0 !important;
                    display: table-cell !important;
                  }
            
                  .no-stack.two-up .col {
                    width: 50% !important;
                  }
            
                  .no-stack .col.num2 {
                    width: 16.6% !important;
                  }
            
                  .no-stack .col.num3 {
                    width: 25% !important;
                  }
            
                  .no-stack .col.num4 {
                    width: 33% !important;
                  }
            
                  .no-stack .col.num5 {
                    width: 41.6% !important;
                  }
            
                  .no-stack .col.num6 {
                    width: 50% !important;
                  }
            
                  .no-stack .col.num7 {
                    width: 58.3% !important;
                  }
            
                  .no-stack .col.num8 {
                    width: 66.6% !important;
                  }
            
                  .no-stack .col.num9 {
                    width: 75% !important;
                  }
            
                  .no-stack .col.num10 {
                    width: 83.3% !important;
                  }
            
                  .video-block {
                    max-width: none !important;
                  }
            
                  .mobile_hide {
                    min-height: 0px;
                    max-height: 0px;
                    max-width: 0px;
                    display: none;
                    overflow: hidden;
                    font-size: 0px;
                  }
            
                  .desktop_hide {
                    display: block !important;
                    max-height: none !important;
                  }
                }
              </style>
            </head>
            <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
            <!--[if IE]><div class="ie-browser"><![endif]-->
            <table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top;" valign="top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
            <div style="background-color:transparent;">
            <div class="block-grid" style="min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
            <div class="col_cont" style="width:100% !important;">
            <!--[if (!mso)&(!IE)]><!-->
            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
            <!--<![endif]-->
            <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Signup Success" border="0" class="center fixedwidth" src="https://raw.githubusercontent.com/cistp/cistp.github.io/main/IMG_0068.jpg" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 100px; display: block;" title="Signup Success" width="100"/>
            <!--[if mso]></td></tr></table><![endif]-->
            </div>
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
            <div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
            <div style="line-height: 1.5; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 18px;">
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">Hi ${tutorsName},</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">A Tutee is attending to your class.</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"> </p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"><strong>Class Date/Time:</strong></p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">${time} - ${date}(PST)</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"><strong>Tutee:</strong></p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">${name}</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"><strong>Class Attendance:</strong></p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">${tAmount} of 2 spots filled</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"></p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">If you have any question, feel free to contact our officers for help.</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">If you can't attend to this class, place contact our officers with the class date and time</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"> </p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">Thank you for your contribution!</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"> </p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">Best regards,</p>
            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">Community Improvement Service</p>
            </div>
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if (!mso)&(!IE)]><!-->
            </div>
            <!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
            </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if (IE)]></div><![endif]-->
            </body>
            </html>`,
          }).then(
            message => console.log(message)
          );
          const replaceDate = date.replaceAll('-', '');
          const getTime = time.replace(':', '');
          const timeMapping = { "1500": 230000, "1600": 000000, "1700": 010000, "1800": 020000, "1900": 030000 };
          $('#addEvent').attr('href', `https://www.google.com/calendar/render?action=TEMPLATE&text=Tutoring%20Program&dates=${replaceDate}T${timeMapping[getTime]}Z/${replaceDate}T${timeMapping[getTime]+10000}Z&details=CIS%20Tutoring%20Program&location=Discord%20Room%20${rn}&sprop=&sprop=name:`);
          $(".step4").fadeOut();
            setTimeout(() => {
              $(".step5").fadeIn();
            }, 500);
        }
      });
    }, Math.floor(Math.random() * 2001));
  })
})

$('.prev2').click(function (e) { 
  e.preventDefault();
  $('#selTutor').val('0');
  $(".step2").fadeOut();
  setTimeout(() => {
    $(".step1").fadeIn();
  }, 500);
});

$('.prev3').click(function (e) { 
  e.preventDefault();
  $("#selTime").html(`<option value='0'>Select Time</option>`)
  $(".step3").fadeOut();
  setTimeout(() => {
    $(".step2").fadeIn();
  }, 500);
});

$('.prev4').click(function (e) { 
  e.preventDefault();
  $('#selTime').val('0');
  $(".step4").fadeOut();
  setTimeout(() => {
    $(".step3").fadeIn();
  }, 500);
});

$('.gotoCn').click(function (e) { 
  e.preventDefault();
  setCookie('language', 'zh_cn');
  location.href = 'index_cn.html';
});