/**
 * Created by ant on 04.09.2017.
 */
var socket = require('socket.io');
var express = require('express');
var uuid = require('uuid/v4');
var app = express();

var io = socket.listen(app.listen(8080));

;
app.get('/',function (req, res) {
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
  //res.sendfile(__dirname + '/index_test.html');
});
var messages = [];
var username;
var users = {};
var user_names = [];
var JSon;
var client_id;
var obj = {};
var clients = {};
var socket;
var obj_socket;
var selected_client;
io.on('connection', function (client) {

      if(user_names[0] != undefined) {
        io.emit('user_names_ids', user_names);
      }
  //client.emit('message', messages);


  console.log(user_names);
  console.log('Connected');
client.on('login', function (data) {
  obj = {name: data ,client_id:  client.id};
  obj_socket = client;
  user_names.push(obj);
  console.log('User connected', data);
  users[data] = client.id;
  io.emit('user_names_ids',user_names);


});
  client.on('user_names_ids', function (data) {

    client_id = data.client_id;
    console.log('Client ID: ',client_id);

    console.log('we have client id',data);
    var room = uuid();
    selected_client = io.sockets.connected[client_id];
    client.join(room);
    selected_client.join(room);
    io.to(room).emit('message',' you are joined to room: '+room);
    io.to(room).emit('is_in_room',{inRoom: true, room: room});


  });

  client.on('from_room', function (data) {
    console.log(data);
    io.to(data.room).emit('from_room',{name: data.name, msg: data.msg});
  });
  
  //client.emit('message', {hello: 'Guest'});
  client.on('message',function (data) {
    console.log('data is: ',data.name +' ' + data.msg);
    //client.emit('message',{hello: 'Hello ' + data});
    io.emit('message',data)//{hello: 'привет от' + data});
    messages.push(data);
    console.log('sanded');


  });

});

