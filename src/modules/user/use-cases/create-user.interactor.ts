import { UseCase } from "../../../kernel/contract";
import { TPerson } from "../entities/person";
import { IUserRepository } from "./ports/user.repository";
//Service
export class CreateUserInteractor implements UseCase<TPerson,TPerson[]>{
constructor(private readonly repository: IUserRepository){}

    async execute(payload : TPerson = {} as TPerson): Promise<TPerson[]> {
        const savedUser = await this.repository.save(payload);
        return [savedUser];
    }

}