const { Query, User } = AV;
AV.init({
    appId: "PIK2R2tijm6BuxTj6sY91OAP-MdYXbMMI",
    appKey: "1dcvKnz8iUtkjfEExfCjwKMF",
  });
$('#form-login').submit(function(){
    let password = $('#pass').val();
    AV.User.logIn('admin', password).then((User) => {
      window.location.href = "manage.html";
    }, (error) => {
      $(".uperror").show();
    });
    return false;
});
