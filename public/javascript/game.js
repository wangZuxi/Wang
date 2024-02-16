
function animate2(){ // function for the animation
    document.getElementById('avatari').src = './images/avatar1.png'; // I drew out a survivor and put it through an image pixelator
    setTimeout(()=>{
        document.getElementById('avatari').src = './images/avatar2.png';
    }, 300)
}
setInterval(animate2, 600) // sort of fiddled around with timing until I thought animation looked ok :/

function createSurvivor(){
    $.ajax({
        url: "http://localhost:3000/api/survivor",
        type: "POST",
        headers: {
            "Authorization": "Bearer "+localStorage.getItem('token')
        },
        data: { name: document.getElementById('name').value, user_id: localStorage.getItem('id') },
        dataType: "json",
        success: function(responseData, textStatus, jqXHR) {
            console.log(responseData)
            // Success callback function
            // Executed when the request is successful
            localStorage.setItem("sid", responseData.survivor_id);
            window.location.href = "./intro.html"; // sends user to another page from js
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Error callback function
            // Executed when an error occurs during the request
            document.getElementById('errormsg').innerHTML = `${JSON.stringify(jqXHR.responseJSON.message)}`;
        }

    });
}

function loginSurvivor(){
    $.ajax({
        url: "http://localhost:3000/api/survivor/login",
        type: "POST",
        headers: {
            "Authorization": "Bearer "+localStorage.getItem('token')
        },
        data: { name: document.getElementById('namelogin').value, user_id: localStorage.getItem('id')},
        dataType: "json",
        success: function(responseData, textStatus, jqXHR) {
            // Success callback function
            // Executed when the request is successful
            localStorage.setItem("sid", responseData.survivor_id);
            window.location.href = "./intro.html"; // sends user to another page from js
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Error callback function
            // Executed when an error occurs during the request
            document.getElementById('errormsg').innerHTML = `${JSON.stringify(jqXHR.responseJSON.message)}`;
        }

    });
}