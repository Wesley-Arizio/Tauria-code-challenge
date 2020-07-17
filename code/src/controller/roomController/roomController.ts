import roomValidate from '../../schemaValidation/room';
import { Request, Response } from 'express';
import knex from '../../database/connection/connection';
import { v4 as uuidv4 } from 'uuid';


interface Room {
    id?: string
    name: string,
    capacity: number,
    host: string
}

class RoomController{
    
    async create(req: Request, res: Response){
        const {
            name,
            capacity,
        } = req.body;

        const host = req.userId;

        const { value, error } = await roomValidate({
            name,
            capacity,
            host
        });

        const room: Room = value;

        if(error){
            return res.status(400).send({
                message: "Error on creating a new room",
                error: error.details[0].message,
            });
        }

        try {
            room.id =  uuidv4();

            await knex('room')
                    .insert({
                        id: room.id,
                        name: room.name,
                        capacity: room.capacity,
                        host_id: room.host 
                    });
                                
            await knex('user_room')
                    .insert({
                        user_id: room.host,
                        room_id: room.id
                    });

        
            return res.status(200).send({
                message: 'Room conference has been created'
            });

        } catch (error) {
            return res.status(400).send({
                message: 'Error on creating a new room confernece',
                error
            })
        }
    }

    async getAllRooms(req: Request, res: Response){
        try {
            const list = await knex('room')
                .select("*");

            return res.status(200).send({
                list
            })
        } catch(error) {
            return res.status(400).send({
                message: 'Error on getting all rooms: ',
                error
            })
        }
    }

    async enterRoom(req: Request, res: Response){
        const room_id = req.params.room_id; 
        const user_id = req.userId;

        const capacity = (await knex('room').select('capacity').where('id', room_id))[0].capacity;

        const allUsersIn = await knex('user_room').select('user_id').where('room_id', room_id);
 
        if(capacity <= allUsersIn.length){
            return res.status(400).send({
                message: 'You cannot enter, this conference is full'
            });
        }
        
        const isValid = allUsersIn.filter( item => {
            return item.user_id === user_id
        });


        if(isValid.length > 0){
            return res.status(400).send({
                message: "You're already in this room"
            })
        }

        try {
            await knex('user_room').insert({
                user_id: user_id,
                room_id: room_id
            });
    
            return res.status(200).send({
                message: "You're in"
            });
        } catch (error){
            return res.status(400).send({
                message: "Error on inserting you into this room"
            });
        }
    }

    async leaveRoom(req: Request, res: Response){
        const user_id = req.userId;
        const { room_id } = req.params;

        try {
            
            const host = await knex('room')
                    .select('host_id')
                    .where('id', room_id)
                    .first();

            if(host.host_id === user_id){
                await knex('room').del().where('id', room_id);
                return res.send({
                    msg: 'This room has been deleted'
                });
            }

            await knex('user_room')
                        .select('*')
                        .where('room_id', room_id)
                        .where('user_id', user_id)
                        .first()
                        .delete()
                .then(() => {
                    return res.status(200).send({
                        message: "You left this room"
                    });
                })
                .catch((error) => {
                    return res.status(400).send({
                        message: 'You still here',
                        error
                    });
                });
        } catch(error) {
            return res.status(400).send({
                message: 'Error leaving this room',
                error
            });
        }
        
    }

    async getRoomByUserName(req: Request, res: Response){
        const  { username }   = req.body;

        try {
            const query = (await knex('user').select('id').where('username', username))[0];
            
            if(query.length == 0){
                return res.status(404).send({
                    message: 'Invalid credentials'
                });
            }
    
            const roomsList = await knex('room')
                    .innerJoin('user_room', 'room.id', '=', 'user_room.room_id')
                    .where('user_room.user_id', '=', query.id)
                    .innerJoin('user', 'user.id', '=', 'user_room.user_id')
                    .select(['room.id', 'room.name', 'room.capacity', 'user_room.user_id', 'user.username']);
    
            if(roomsList.length == 0){
                return res.status(201).send({
                    message: 'No rooms to show'
                });
            }

            return res.status(200).send({
                message: 'All rooms is here',
                roomsList
            });

        } catch (error) {
            return res.status(400).send({
                message: 'Error on getting users room: ',
                error 
            })
        }
    }

}

export default new RoomController;