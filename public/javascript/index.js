
function login(){
    $.ajax({
        url: "http://localhost:3000/api/users/login",
        type: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   "Authorization": "Bearer your-access-token"
        // },
        data: { username: document.getElementById('username').value, password: document.getElementById('password').value },
        dataType: "json",
        success: function(responseData, textStatus, jqXHR) {
            // Success callback function
            // Executed when the request is successful
            localStorage.setItem("token", responseData.results.token); // storing data :)
            localStorage.setItem("id", responseData.results.userId);
            window.location.href = "home.html"; // sends user to another page from js
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Error callback function
            // Executed when an error occurs during the request
            document.getElementById('errormsg').innerHTML = `Login Error, Status Code ${JSON.stringify(jqXHR.status)}: ${JSON.stringify(jqXHR.responseJSON.message)}`;
        }

    });
}
