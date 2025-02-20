import { STARTUPS_BY_AUTHOR } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import React from "react";
import StartupCard,{StartupTypeCard} from "./StartupCard";


const UserStartups=async ({id}:{id:string})=>{
   const startups = await client.fetch(STARTUPS_BY_AUTHOR,{id})
   
  return <>
    {startups.length>0 ? startups.map((startup:StartupTypeCard)=>(
        <StartupCard key={startup._id} post={startup}/>
    )):(
        <p className="no-result">No Post Yet</p>
    )}
  </>
};
export default UserStartups;