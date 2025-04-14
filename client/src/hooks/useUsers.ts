import { login, register } from "../api/users"

export function useRegister(){
    return async function registration(data:object){
        return await register(data);
    }
}

export function useLogin(){
    return async function logingin(data:object){
        return await login(data);
    }
}