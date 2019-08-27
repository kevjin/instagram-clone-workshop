reload();

//Reload the webpage with all instagram data
function reload() {
    $.get("http://localhost:4000/api/posts", function(data, status){ //Goes to this address to get data
        data.forEach(post => {
            addPost(post.profPic, post.username,post.postPic,post.likes,post.desc);
        });
});
}

//Transforms JSON data into actual instagram posts
function addPost(profPic,username,postPic,likes,desc) {
$('.container').prepend(`
    <div class="post">
    <div class="post-header">
        <img class= "profpic"src="${profPic}">
        <div class="username">${username}</div>
    </div>
    <img class="post-picture" src="${postPic}">
    <div class="post-body">
        <div class="post-likes">${likes} likes</div>
        <div class="post-content"><strong>${username}</strong> ${desc}</div>
        <hr>
        <input class="add-comment" placeholder="Add a comment..." type="text">
    </div>
    </div>
`);
}

//Sends a new instagram post in the form of JSON to the backend server, which saves it to the database.
//Why cant the website access the database directly? Why is there a million websites and only 1 server?
function createPost() {
    let username = document.forms["createpost"]["username"].value;
    let profpic = document.forms["createpost"]["profpic"].value;
    let postpic = document.forms["createpost"]["postpic"].value;
    let desc = document.forms["createpost"]["desc"].value;

    $.post("http://localhost:4000/api/posts", { 
        username:username ? username : "default", 
        profPic:profpic ? profpic : "https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg",
        postPic:postpic ? postpic : "https://pbs.twimg.com/profile_images/1026197306570207232/pNGjIWqy_400x400.jpg",
        desc:desc} 
    );
    $(".container").html("");
    postpic = document.forms["createpost"]["postpic"].value = "";
    reload();
    return false;
}