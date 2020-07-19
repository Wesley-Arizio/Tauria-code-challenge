import express from 'express';

import  userController from '../../controller/userController/userController';
import roomController from '../../controller/roomController/roomController';


const publicRoute = express.Router();

// create an user
publicRoute.post('/user', userController.createUser);

// route to authenticate an user
publicRoute.post('/authenticate', userController.authenticate);

// publicRoute to get all users
publicRoute.get('/users', userController.getUsers);

// route to get user by name
publicRoute.get('/user', userController.getUserByName);

// get all rooms
publicRoute.get('/rooms', roomController.getAllRooms);

// shows all rooms in which the user is
publicRoute.get('/user/rooms', roomController.getRoomByUserName);

// get participants in room
publicRoute.get('/room/participants/:room_id', roomController.getParticipants);

export default publicRoute;