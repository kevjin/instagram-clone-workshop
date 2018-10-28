
$.get("http://localhost:4000/api/test", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
});

function addPost(profPic,username,postPic,likes,desc) {
$('.container').append(`
<div class="post">
<div class="post-header">
    <img class= "profpic"src="${profPic}">
    <div class="username">${username}</div>
</div>
<img class="post-picture" src="${postPic}">
<div class="post-body">
    <div class="post-likes">${likes} likes</div>
    <div class="post-content"><strong>${username}</strong>${desc}</div>
    <hr>
    <input class="add-comment" placeholder="Add a comment..." type="text">
</div>
</div>
`);
}