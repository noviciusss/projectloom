"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import { image } from "@uiw/react-md-editor";

export const createPitch=async(state:any,form:FormData,pitch:string)=>{
    const session = await auth();
    if(!session) return parseServerActionResponse({error:"Not signed in", status:"ERROR"}) //{} in return means making or sending object here we make error object and then what it will say

    const{title,description,category,link}= Object.fromEntries(Array.from(form).filter(([key])=>key!='pitch')),
    const slug=slugify(title as string,{lower:true,strict:true});

    try{
        const startup={title,
            description,
            category,
            image:link,
            slug:{
                _type:slug,
                current:slug,
            },
            author:{
                _type:'reference',
                _ref:session?.id,
            },
            pitch
        }
    }catch(error){
        console.log(error);
        return parseServerActionResponse({error:JSON.stringify(error),status:'ERROR',})
    }
}