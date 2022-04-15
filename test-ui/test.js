
let user = [
        {'id': 1, 'name': 'chis', 'username': 'alo', 'password': '123'},
        {'id': 2, 'name': 'chiss', 'username': 'alo1', 'password': '1234'},
];


const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

function checkLogIn(username, password){
    for(let x in user){
        if(user[x].username == username && user[x].password == password){
            return true;
        }
    }
    return false;
}

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(loginForm);
    const username = loginForm.username.value;
    console.log(username);
    const password = loginForm.password.value;

    if (checkLogIn(username, password)) {
        alert("You have successfully logged in.");
        // location.href = "alo.html";
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})