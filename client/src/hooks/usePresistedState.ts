import { useState } from "react";
import {  UserForAuth } from "../types/user";
import { getUserData } from "../utils/userHelper";

export function usePresistedState(initialValue:null){
    const [user,setUser]=useState<UserForAuth|null>(()=>{
        const isUser=getUserData();
        if(isUser){
            return isUser;
        }

        return initialValue;
    });

    function setCurUser(value:UserForAuth|null){
        setUser(value);
    }

    return {
        user,setCurUser
    }
}