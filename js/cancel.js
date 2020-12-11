const { Query, User } = AV;
AV.init({
    appId: "PIK2R2tijm6BuxTj6sY91OAP-MdYXbMMI",
    appKey: "1dcvKnz8iUtkjfEExfCjwKMF",
  });
const queryString = window.location.search;
if (queryString == "") {
    location.href = "index.html";
}
const urlParams = new URLSearchParams(queryString);
const name = urlParams.get('name');
const date = urlParams.get('date');
const time = urlParams.get('time');
const id = urlParams.get('id');
if (!name || !date || !time || !id) {
    location.href = "index.html";
}
const query = new AV.Query('Classes');
query.equalTo("tutee", name);
query.equalTo("date", date);
query.equalTo("startTime", time);
query.find().then((cls) => {
    if (cls.length == 0) {
        $('.error').show();
        return;
    } else {
        const classID = cls[0].id;
        if (classID != id) {
            $('.error').show();
            return;
        } else {
            const change = AV.Object.createWithoutData('Classes', classID);
            change.remove('tutee', name);
            change.increment('tuteeAmount', -1);
            change.save();
            $('.success').show();
        }
    }
});