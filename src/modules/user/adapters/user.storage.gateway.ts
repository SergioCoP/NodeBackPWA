import { TUser } from "../entities/user";
import { IUserRepository } from "../use-cases/ports/user.repository";
import { pool } from '../../../config/postgress'
import { TPerson } from "../entities/person";
import { Errors } from "kernel/types";

//Como un DAO.
export class UserStorageGateway implements IUserRepository{

    async findAll(): Promise<TUser[]> {
           const query = `SELECT id,username,created_at as "createdAt",
           last_signin as "lastSignin",s. id AS "statusId",s.description,
           r.id as "roleId",r.description as "role",p.name,p.surname,
           p.lastname FROM users ORDER BY id DESC;` ;
           const {rows: userRows} = await pool.query(query); //crated_at
           return userRows.map((user)=><TUser>user)
    }

    findById(id: number): Promise<TUser> {
        throw new Error("Method not implemented.");
    }

    async save(user: TUser): Promise<TUser> {
        const client = await pool.connect();
        try{
            const {person} = user;
        await client.query('BEGIN');
        const query = `INSERT INTO people
        (name,surname,lastname,birthdate,curp,rfc) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;`;//query persona
        const {rows: personRow} = await client.query(query,[
            person?.name,
            person?.surname,
            person?.lastname,
            person?.curp,
            person?.rfc
        ])    
        if(!personRow[0]) throw Error(Errors.RECORD_NOT_REGISTERED);
        const savedPerson = personRow[0];
        const userQuery = `INSERT INTO users (username,password,type,user_details,status_id,person_id) 
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`;
        const {rows: userRow} = await client.query(userQuery,[
            user.username,
            user.password,
            user.type,
            user.userDetails,
            user.status,
            savedPerson.id,
        ]);
        if(!userRow[0]) throw Error(Errors.RECORD_NOT_REGISTERED);
        await client.query('COMMIT');
        user.id = Number(userRow[0].id);
        user.person!.id = Number(savedPerson.id);//! se indica que esta inicializado
        return user;
        }catch(error){
            console.log(error);
            await client.query('ROLLBACKJ');
            throw error;
        }
        // const query = `INSERT INTO people(name,surname,lastname,birthday, curp,rfc) 
        //     values($1,$2,$3,$4,$5,$6) RETURNING id;`;

        //     const values = [
        //         user.name,
        //         user.surname,
        //         user.lastname,
        //         user.birthdate,
        //         user.curp,
        //         user.rfc
        //     ];

        //     try{
        //         const result = await pool.query(query, values);
        //         // Assuming that the "id" is generated by the database upon insertion
        //         const insertedId = result.rows[0].id;
        //         user.id = insertedId; // Assign the generated ID to the user object
        //         return user;
        //     }catch(err){
        //         throw new Error(`Failed to save user:`);
        //     }
        
    }

    update(user: TUser): Promise<TUser> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}