import express,{Request, Response} from 'express'
import { UserRegisterGateway } from './auth.storage.gateway'
import { RegisterUserInteractor } from '../use-cases/auth-signin.interactor'

export class UserRegisterController {
    static async create(req: Request, res: Response){
        try{
            const repository =  new UserRegisterGateway();
            const interactor =  new UserRegisterGateway(repository);
            const data =  await interactor.execute();
            res.status(200).json(data);
        }catch(error){
            console.log(error);
            res.status(400).json({message: 'Error'})
        }
    }
}

export const userRegisterRouter =  express.Router();
userRegisterRouter.post('/create',[],UserRegisterController.create);