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

            // return res.status(200).send({
            //     message: 'Room conference has been created'
            // });
        } catch (error) {
            return res.status(400).send({
                message: 'Error on creating a new room confernece',
                error
            })
        }
    }

}

export default new RoomController;