import { register } from "../api/users"

export function useRegister(){
    return async function registration(data:object){
        return await register(data);
    }
}