import { addNodeToDrawFlow } from './editor.js'; 


var mobile_item_selec = '';
var mobile_last_move = null;
var transform = '';

function initClickEvents() {
  $('#submit-button').on('click', function (event) {
    event.preventDefault();
    submitData();
  });

  $('#deploy-button').on('click', function (event) {
    event.preventDefault();
    deployBot();
  });

  $('#logout-button').on('click', function (event) {
    event.preventDefault();
    logout();
  });
}

function initClickEvents() {
  var elements = document.getElementsByClassName('drag-drawflow');
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('touchend', drop, false);
    elements[i].addEventListener('touchmove', positionMobile, false);
    elements[i].addEventListener('touchstart', drag, false);
  }
}

function showMessage(message, messageType) {
  var popup = document.getElementById("popup-message");
  popup.className = 'popup-message ' + messageType;

  var popupContent = document.querySelector(".popup-message-content p");
  var popupClose = document.querySelector(".popup-message-content .popup-message-close");

  popupContent.innerHTML = message;
  popup.style.display = "block";
  popupClose.addEventListener("click", function () {
    popup.style.display = "none";
  });
}

function positionMobile(ev) {
  mobile_last_move = ev;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  if (ev.type === "touchstart") {
    mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
  } else {
    ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
  }
}

function drop(ev) {
  if (ev.type === "touchend") {
    var parentdrawflow = document.elementFromPoint(mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
    if (parentdrawflow != null) {
      addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
    }
    mobile_item_selec = '';
  } else {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("node");
    addNodeToDrawFlow(data, ev.clientX, ev.clientY);
  }
}

function showpopup(e) {
  e.target.closest(".drawflow-node").style.zIndex = "9999";
  e.target.children[0].style.display = "block";

  transform = editor.precanvas.style.transform;
  editor.precanvas.style.transform = '';
  editor.precanvas.style.left = editor.canvas_x + 'px';
  editor.precanvas.style.top = editor.canvas_y + 'px';
  console.log(transform);

  editor.editor_mode = "fixed";
}

function closemodal(e) {
  e.target.closest(".drawflow-node").style.zIndex = "2";
  e.target.parentElement.parentElement.style.display = "none";
  editor.precanvas.style.transform = transform;
  editor.precanvas.style.left = '0px';
  editor.precanvas.style.top = '0px';
  editor.editor_mode = "edit";
}

function changeModule(event) {
  var all = document.querySelectorAll(".menu ul li");
  for (var i = 0; i < all.length; i++) {
    all[i].classList.remove('selected');
  }
  event.target.classList.add('selected');
}