import React from "react";
import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import {after} from 'next/server'
const view = async ({id}: {id: string}) => {
    const {views: totalviews} = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY, {id});
    after(async ()=>await writeClient.patch(id).set({views:totalviews+1}).commit())
    return<div className="view-container">
        <div className="absolute -top-2 right-2">
            <Ping />
        </div>
        <p className="view-text">
            <span className="font-black">{totalviews} { totalviews ==1 ?'view' :'views'}</span>
        </p>
    </div>
};
export default view;