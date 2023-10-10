import { TUserRegister } from "../entities/register";
import {IUserRegisterRepository} from "../use-cases/ports/auth.repository"
import {pool} from "../../../config/postgress";
import { request } from "express";

export class UserRegisterGateway implements IUserRegisterRepository {
    async create(user: TUserRegister): Promise<TUserRegister> {
        const {username, password} = request.body;
        await pool.query(`INSERT INTO users(username,password,status_id) values($1,$2,1)`,
        [username,password],(err,res)=>{
            if(err) return err;
            return res;
        })
    }
    
}