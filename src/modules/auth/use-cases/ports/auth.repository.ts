import { TUserRegister } from "../../entities/register";

export interface IUserRegisterRepository {
    create(user:TUserRegister): Promise<TUserRegister>;
}