import roomValidate from '../../schemaValidation/room';
import { Request, Response } from 'express';
import knex from '../../database/connection/connection';

interface Room {
    name: string,
    capacity: number,
    participants: [number],
    host: number
}

class RoomController{
    async create(req: Request, res: Response){
        const {
            name,
            capacity,
            participants,
        } = req.body;

        const host = req.userId;

        const { value, error } = await roomValidate({
            name,
            capacity,
            participants,
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
            console.log(room);
            const insertedRoom = await knex('room')
                .insert({
                    name: room.name,
                    capacity: room.capacity,
                    participants: room.participants,
                    host: host
                });
            
            

            return res.send({
                ok: true
            });

        } catch (error) {
            return res.status(400).send({
                message: 'Error on creating a new room confernece',
                error
            })
        }
    }   
}

export default new RoomController;