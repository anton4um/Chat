/**
 * Created by ant on 04.09.2017.
 */
var socket = require('socket.io');
var express = require('express');
var uuid = require('uuid/v4');
var app = express();

var io = socket.listen(app.listen(8080));


app.get('/',function (req, res) {
  res.writeHead(200,{'Content-Type':'text/html;charset=windows-1251'});
  res.end();
  //res.sendfile(__dirname + '/index_test.html');
});
var messages = [];
var user_names = [];
var client_id;

var selected_client;
var room;
var usersInRoom=[];




function whoInRoom(room) {
  var currentRoom = io.sockets.adapter.rooms[room];
  console.log('current room in whoInRoom: ', currentRoom);
  if(currentRoom) {
    user_names.forEach(function (user) {
      if (currentRoom.sockets[user.client_id] === true) {
        usersInRoom.push(user);
      }
    })
    console.log('Users in Room: ', usersInRoom)
  }
  return usersInRoom;
}

io.on('connection', function (client) {
      if(user_names.length > 0) {
        io.emit('user_names_ids', user_names);
      }
  //console.log(user_names);
  console.log('Connected');
  client.on('login', function (data) {
      user_names.push({name: data ,client_id:  client.id, room: ''});
      console.log('User connected', user_names);
      io.emit('user_names_ids',user_names);


    });
  client.on('user_names_ids', function (data) {
    console.log('data is in user_names_ids: ',data);

      room = uuid();
      if(data.length>0) {
        client.join(room);
      }
      for(var i=0; i<data.length;i++){
        for(var j=0; j<user_names.length;j++){
          if(user_names[j].client_id===data[i].id){
            user_names[j].room = room;
          }
        }
        client_id = data[i].id;
        selected_client = io.sockets.connected[client_id];
        if(selected_client !== undefined) {
          selected_client.join(room);
        }
      }
      user_names.forEach(function (users) {
        if(users.client_id === client.id){
          users.room = room;

        }
      })
      whoInRoom(room);
      //console.log(usersInRoom);
      //console.log('rooms from adapter room',io.sockets.adapter.rooms[room]);
      io.to(room).emit('message','INFO: you are joined to room: '+room);

      //client.emit('is_in_room', {inRoom: true, room: room});
      io.to(room).emit('is_in_room',{inRoom: true, room: room});

      io.to(room).emit('users_in_room',usersInRoom);
      console.log('users in room: ',usersInRoom);
      //console.log('user_names: ',user_names);
      usersInRoom = [];
    console.log('rooms from io',io.sockets.adapter.rooms);

    //console.log('you are now leaved all rooms',client.rooms);


  });

  client.on('is_in_room', function (data) {
    if(data) {
      if (data.inRoom === false) {
        client.leave(data.room);
        console.log('user left the room: ', client.id);
        var users;
        users = whoInRoom(data.room);
        io.to(data.room).emit('users_in_room', users);
        console.log('rooms from io', io.sockets.adapter.rooms);
      }
    }
  });

  client.on('from_room', function (data) {
      console.log('From Room: ',data);
      io.to(data.room).emit('from_room',{name: data.name, msg: data.msg});
    });


  client.on('message',function (data) {
      console.log('data is: ',data);
      io.emit('message',data);
      messages.push(data);
      console.log('sanded');


    });



  client.on('disconnect', function () {
    console.log(client.id);
    //console.log(user_names.length)
    if(user_names.length > 0) {
      for (var i = 0; i < user_names.length; i++) {
        // console.log(user_names[i]);
        if (user_names[i].room !== '') {
          client.leave(user_names[i].room);
          whoInRoom(user_names[i].room);
          io.to(user_names[i].room).emit('users_in_room', usersInRoom);
          console.log('users in room: ', usersInRoom);
          usersInRoom = [];
        }
        if (user_names[i].client_id === client.id) {
          console.log('user disconnected: ', user_names[i].name);
          console.log(user_names.splice(i, 1));
          io.emit('user_names_ids', user_names);
        }

      }
    }
    if(io.sockets.connected === []){
      user_names = [];
    }

    //console.log('on disconnect', user_names);
  });
});

