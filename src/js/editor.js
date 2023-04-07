export function initDrawflowEditor() {
  var id = document.getElementById("drawflow");
  const editor = new Drawflow(id);
  var currNodeId = 0;
  editor.reroute = true;
  editor.reroute_fix_curvature = true;
  editor.force_first_input = false;

  const dataToImport = {
    "drawflow": {
      "Home": {
        "data": {}
      }
    }
  }
  editor.start();
  editor.import(dataToImport);

  // Events!
  editor.on('nodeCreated', function (id) {
    console.log("Node created " + id);
  })

  editor.on('nodeRemoved', function (id) {
    console.log("Node removed " + id);
  })

  editor.on('nodeSelected', function (id) {
    console.log("Node selected " + id);
    currNodeId = id;
  })

  editor.on('moduleCreated', function (name) {
    console.log("Module Created " + name);
  })

  editor.on('moduleChanged', function (name) {
    console.log("Module Changed " + name);
  })

  editor.on('connectionCreated', function (connection) {
    console.log('Connection created');
    console.log(connection);
  })

  editor.on('connectionRemoved', function (connection) {
    console.log('Connection removed');
    console.log(connection);
  })
  /*
    editor.on('mouseMove', function(position) {
      console.log('Position mouse x:' + position.x + ' y:'+ position.y);
    })
  */
  editor.on('nodeMoved', function (id) {
    console.log("Node moved " + id);
  })

  editor.on('zoom', function (zoom) {
    console.log('Zoom level ' + zoom);
  })

  editor.on('translate', function (position) {
    console.log('Translate x:' + position.x + ' y:' + position.y);
  })

  editor.on('addReroute', function (id) {
    console.log("Reroute added " + id);
  })

  editor.on('removeReroute', function (id) {
    console.log("Reroute removed " + id);
  })
}

export function addNodeToDrawFlow(name, pos_x, pos_y) {
  if (editor.editor_mode === 'fixed') {
    return false;
  }
  pos_x = pos_x * (editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) - (editor.precanvas.getBoundingClientRect().x * (editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)));
  pos_y = pos_y * (editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) - (editor.precanvas.getBoundingClientRect().y * (editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)));


  switch (name) {
    case 'tg-bot-start':
      var tgbotstart = `
          <div>
            <div class="title-box">Start</div>
            <div class="box">
              <p>Msg</p>
            <input type="text" df-text>
            </div>
          </div>
          `;
      editor.addNode('tg-bot-start', 0, 1, pos_x, pos_y, 'tg-bot-start', {
        text: ''
      }, tgbotstart);
      break;

    case 'tg-bot-text':
      var tgbottext = `
          <div>
            <div class="title-box">Text</div>
            <div class="box">
              <p>Msg</p>
              <input type="text" df-text>
              <button onclick="editor.addNodeOutputWithText(currNodeId)">Add button</button>
            </div>
          </div>
          <div class="buttons" id="buttons_${editor.nodeId}"></div>
          `;
      console.log(`nodeId:${editor.nodeId}`)
      editor.addNode('tg-bot-text', 1, 0, pos_x, pos_y, 'tg-bot-text', {
        text: ''
      }, tgbottext);
      break;

    case 'tg-bot-end':
      var tgbotend = `
          <div>
            <div class="title-box">End</div>
            <div class="box">
              <p>Msg</p>
            <input type="text" df-text>
            </div>
          </div>
          `;
      editor.addNode('tg-bot-end', 1, 0, pos_x, pos_y, 'tg-bot-end', {
        text: ''
      }, tgbotend);
      break;

    case 'tg-bot-config':
      var tgbotconfig = `
          <div>
            <div class="title-box">Config</div>
            <div class="box">
              <p>Telegram bot API Token</p>
            <input type="text" df-token>
            </div>
          </div>
          `;
      editor.addNode('tg-bot-config', 0, 0, pos_x, pos_y, 'tg-bot-config', {
        token: ''
      }, tgbotconfig);
      break;

    default:
  }
}