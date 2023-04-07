import _ from 'lodash';

import { isSessionExists } from './auth.js'; 
import { initDrawflowEditor } from './editor.js'; 

document.addEventListener('DOMContentLoaded', function () {
  if (isSessionExists() != true) {
    // TODO change because the index.html page loads for second before href
    window.location.href = '/login.html';
  }
});

$(document).ready(function () {
  initClickEvents();
  initDrawflowEditor();
});