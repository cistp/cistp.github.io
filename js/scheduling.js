var tutorID;
var date;
var user;
var tutorsName;
var time;
var class__;
var tAmount;
var rn;

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
      tutorsName = tutor.get('tutorName');
      const id = tutor.get('user').id;
      $("#selTutor").append("<option value='" + id + "'>" + tutorsName + "</option>");
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
  user = AV.Object.createWithoutData('_User', tutorID);
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
  time = $('#selTime option:selected').text();
  query.equalTo('tutor', user);
  query.equalTo('date', date);
  query.equalTo('startTime', time);
  query.lessThan('tuteeAmount', 2);
  query.find().then((class_) => {
    class__ = class_[0].id;
    tAmount = class_[0].get('tuteeAmount') + 1;
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
  const query = new AV.Query('tutorList');
  query.equalTo('user', user);
  query.find().then((roomNo) => {
    rn = roomNo[0].get('roomNumber');
  });
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
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Signup Success" border="0" class="center fixedwidth" src="data:image/jpeg;base64,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" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 100px; display: block;" title="Signup Success" width="100"/>
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
    <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"><strong>Tutor Name:</strong></p>
    <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">${tutorsName}</p>
    <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"><strong>Class Attendance:</strong></p>
    <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">${tAmount} of 2 spots filled</p>
    <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"><strong>Location:</strong></p>
    <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">Discord - Room ${rn}</p>
    <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"> </p>
    <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">See you soon!</p>
    <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"> </p>
    <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">If you have any question, feel free to contact our officers for help.</p>
    <p style="font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">If you no longer want to attend to this class, place contact our officers with your name and scheduled date.</p>
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
  $(".step4").fadeOut();
    setTimeout(() => {
      $(".step5").fadeIn();
    }, 500);
  const querytl = new AV.Query('tuteeList');
  querytl.equalTo("name", name);
  querytl.equalTo('email', email);
  querytl.find().then((tutees) => {
    if (tutees == []) {
      const tuteeL = AV.Object.extend('tuteeList');
      const tuteel = new tuteeL();
      tuteel.set('name', name);
      tuteel.set('email', email);
  }})
})