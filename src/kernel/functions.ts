import bcryptjs from 'bcryptjs'


export const hash = async (password: string) => {
    return await new Promise<string>((res,rej)=>{
        bcryptjs.hash(password,10,(err,hash)=>{
            if(err) rej(err);
            res(hash);
        })
    }) 
}

export const compare = async (password: string,hashedPassword: string):Promise<boolean> => {
    return await new Promise((res,rej)=>{
        bcryptjs.compare(password,hashedPassword,(err,hash)=>{
            if(err) rej(err);
            res(hash);
        })
    }) 
}