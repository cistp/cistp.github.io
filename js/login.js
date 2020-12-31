const { Query, User } = AV;
AV.init({
    appId: "PIK2R2tijm6BuxTj6sY91OAP-MdYXbMMI",
    appKey: "1dcvKnz8iUtkjfEExfCjwKMF",
  });
const currentUser = AV.User.current();
if (currentUser) {
  window.location.href = 'tutor_edit.html';
}
$('#form-login').submit(function(){
    let username = $('#username').val();
    let password = $('#pass').val();
    AV.User.logIn(username, password).then((User) => {
      const query = new AV.Query('tutorList');
      query.equalTo('user', User);
      query.find().then((tutors) => {
        if (tutors.length != 0) {
          window.location.href = "tutor_edit.html";
        } else {
          const query = new AV.Query('tuteeList');
          query.equalTo('user', User);
          query.find().then((tutees) => {
            if (tutees.length == 0) {
              $(".uperror").show();
              User.destroy();
              setTimeout(() => {
                AV.User.logOut();
              }, 100);
            } else {
              $(".uperror").show();
            }
          })
       }
    });
    }, (error) => {
      $(".uperror").show();
    });
    return false;
});
