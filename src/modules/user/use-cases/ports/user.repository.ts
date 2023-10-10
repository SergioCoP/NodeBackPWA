import { TPerson } from "modules/user/entities/person";
import { TUser } from "../../entities/user"

export interface IUserRepository {
    findAll(): Promise<TUser[]>;
    findById(id: number): Promise<TUser>;
    save(user: TPerson):Promise<TPerson>;
    update(user: TUser):Promise<TUser>;
    delete(id: number):Promise<boolean>;
}