$.ajax({
    url: `http://localhost:3000/api/users/${localStorage.getItem("id")}`,
    type: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    //   "Authorization": "Bearer your-access-token"
    // },
    dataType: "json",
    success: function(responseData, textStatus, jqXHR) {
        // Success callback function
        // Executed when the request is successful
        document.getElementById('username').innerHTML = `Welcome back, ${responseData.username}`;
        document.getElementById('userid').innerHTML = `User_ID: ${responseData.user_id}`;
        document.getElementById('email').innerHTML = responseData.email;
        document.getElementById('points').innerHTML = responseData.total_points;
    }
});


$.ajax({
    url: `http://localhost:3000/api/task_progress/${localStorage.getItem("id")}`,
    type: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    //   "Authorization": "Bearer your-access-token"
    // },
    dataType: "json",
    success: function(responseData, textStatus, jqXHR) {
        // Success callback function
        // Executed when the request is successful
        document.getElementById('progress').innerHTML = responseData.length;
        responseData.reverse();
        responseData.map((e)=>{
            document.getElementById('recent').innerHTML += `
            <div>
                <h1>Task Id: ${e.task_id}</h1>
                <h2>Notes: ${e.notes}</h2>
                <p>Completed ${e.completion_date}</p>
            </div>
            `;
        })
    },
    error: function(jqXHR, textStatus, errorThrown) {
        // you have no tasks done :(((
        document.getElementById('points').innerHTML = `You have not completed any tasks`;
        document.getElementById('progress').innerHTML = `You have not completed any tasks`;
        document.getElementById('recent').innerHTML = `You have not completed any tasks`;
    }
});