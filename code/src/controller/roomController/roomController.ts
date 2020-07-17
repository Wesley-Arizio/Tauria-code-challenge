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
        const list = await knex('room')
            .select("*");

        return res.status(200).send({
            list
        })
    }

    async enterInRoom(req: Request, res: Response){
        const room_id = req.params.room_id; 
        const user_isd = req.userId;

        const capacity = (await knex('room').select('capacity').where('id', room_id))[0].capacity;

        const allUsersIn = await knex('user_room').select('user_id').where('room_id', room_id);
 
        if(capacity <= allUsersIn.length){
            return res.status(400).send({
                message: 'You cannot enter, this conference is full'
            });
        }
        
        const isValid = allUsersIn.filter( item => {
            return item.user_id === user_isd
        });


        if(isValid.length > 0){
            return res.status(400).send({
                message: "You're already in this room"
            })
        }

        try {
            await knex('user_room').insert({
                user_id: user_isd,
                room_id: room_id
            });
    
            return res.status(200).send({
                message: "You're in"
            })
        } catch (error){
            return res.status(400).send({
                message: "Error on inserting you into this room"
            });
        }
    }


}

export default new RoomController;