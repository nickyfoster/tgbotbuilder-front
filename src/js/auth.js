import { backendUrl } from './config.js';

var isAuthenticated = false;
var csrfToken;

document.addEventListener('DOMContentLoaded', function () {
  if (isSessionExists() != true) {
    getCsrf();
  }
});


export function isSessionExists() {
  $.ajax({
    url: backendUrl + '/api/v1/getsession',
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    success: function (data, status, xhr) {
      if (data.login == true) {
        return true;
      } else {
        return false;
      }
    },
    error: function (xhr, status, error) {
      console.log('Error retrieving session status:', error);
      return false;
    }
  });
}

// async function checkSession() {
//   try {
//     const backendUrl = 'https://yourbackendurl.com';
//     const url = backendUrl + '/api/v1/getsession';
//     const headers = { 'X-Requested-With': 'XMLHttpRequest' };

//     const responseData = await ajaxCall(url, 'GET', null, headers);

//     if (responseData.login === true) {
//       return true;
//     } else {
//       getCsrf();
//       return false;
//     }
//   } catch (error) {
//     console.log('Error retrieving session status:', error);
//     return false;
//   }
// }
// checkSession()
//   .then(isAuthenticated => {
//     console.log('Is user authenticated?', isAuthenticated);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

function login() {
  $('#login-btn').on('click', function (event) {
    event.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();
    console.log("loggin in...")
    $.ajax({
      url: backendUrl + '/api/v1/login',
      type: 'POST',
      contentType: "application/json",
      xhrFields: {
        withCredentials: true
      },
      headers: {
        'X-CSRF-Token': csrfToken,
      },
      data: JSON.stringify({
        'username': username,
        'password': password
      }),
      success: function (data, status, xhr) {
        window.location.href = '/index.html';
      },
      error: function (xhr, status, error) {
        console.log('Error logging in:', error);
        var errorMessage = $('.error-message');
        errorMessage.text("Incorrect username or password. Please try again.");
        errorMessage.addClass('show');
      }
    });
  });
}

function getCsrf() {
  console.log("Getting SCRF token");
  $.ajax({
    url: backendUrl + '/api/v1/getcsrf',
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    success: function (data, status, xhr) {
      csrfToken = xhr.getResponseHeader('X-CSRF-Token');
      console.log("Received CSRF token:", csrfToken);
    },
    error: function (xhr, status, error) {
      console.log('Error retrieving CSRF token:', error);
    }
  });
}

function getCookie(name) {
  var cookieArr = document.cookie.split(';');

  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split('=');

    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  return null;
}

// TODO refactor ajax functions

// Example usage:
// const apiUrl = 'https://api.example.com/data';
// const method = 'POST';
// const data = {
//   key: 'value'
// };

// ajaxCall(apiUrl, method, data)
//   .then(responseData => {
//     console.log('Response:', responseData);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

//   async function ajaxCall(url, method = 'GET', data = null, headers = {}) {
//     const defaultHeaders = {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     };

//     const requestOptions = {
//       method: method,
//       headers: { ...defaultHeaders, ...headers },
//     };

//     if (data) {
//       requestOptions.body = JSON.stringify(data);
//     }

//     try {
//       const response = await fetch(url, requestOptions);
//       if (!response.ok) {
//         throw new Error(`HTTP error ${response.status}`);
//       }

//       const responseData = await response.json();
//       return responseData;
//     } catch (error) {
//       console.error('Error during AJAX call:', error);
//       throw error;
//     }
//   }