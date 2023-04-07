function submitData() {
    console.log("Submitting data:", editor.export());
    $.ajax({
        type: 'POST',
        url: backendUrl + '/api/v1/submit-data',
        headers: {
            'X-CSRF-Token': csrfToken,
        },
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify(editor.export()),
        contentType: 'application/json',
        success: function (response) {
            console.log('Success:', response);
            showMessage("Bot compiled!", 'success');
        },
        error: function (xhr, status, error) {
            showMessage(xhr.responseJSON.error, 'error');
            console.log(`Error: ${xhr.responseJSON.error}`)
        }
    });
}

function deployBot() {
    console.log("Deploying bot")
    $.ajax({
        type: 'GET',
        url: backendUrl + '/api/v1/deploy-bot',
        headers: {
            'X-CSRF-Token': csrfToken,
        },
        xhrFields: {
            withCredentials: true
        },
        contentType: 'application/json',

        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            console.log('Success:', response);
            showMessage("Bot deployed!", 'success');
        },
        error: function (xhr, status, error) {
            showMessage(xhr.responseJSON.error, 'error');
            console.log(`Error: ${xhr.responseJSON.error}`)
        }
    });
}

function logout() {
    console.log("Loggin out")
    $.ajax({
        type: 'GET',
        url: backendUrl + '/api/v1/logout',
        contentType: 'application/json',
        headers: {
            'X-CSRF-Token': csrfToken,
        },
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            console.log('Success:', response);
            showMessage("Logged out!", 'success');
            window.location.href = '/login.html';
        },
        error: function (xhr, status, error) {
            showMessage(xhr.responseJSON.error, 'error');
            console.log(`Error: ${xhr.responseJSON.error}`)
        }
    });
}