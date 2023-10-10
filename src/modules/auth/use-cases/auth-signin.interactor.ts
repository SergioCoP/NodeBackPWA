import { UseCase } from "../../../kernel/contract";
import { TUserRegister } from "../entities/register";
import { IUserRegisterRepository } from "./ports/auth.repository";

export class RegisterUserInteractor implements UseCase<void,TUserRegister[]>{
    constructor(private readonly repository: IUserRegisterRepository){}

    async execute(payload?: void | undefined): Promise<TUserRegister[]>{
        return await this.repository.create(payload);
    }
}