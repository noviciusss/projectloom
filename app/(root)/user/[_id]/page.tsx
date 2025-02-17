import { auth } from '@/auth';
import { AUTHOR_BY_ID_QUERY } from '@/lib/queries';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import React from 'react'

const Page=async ({params}:{params:Promise<{id:string,}>})=>{
    const id = (await params).id;
    const session = await auth();
    if(!session)return {}

    const user = await client.fetch(AUTHOR_BY_ID_QUERY,{id});
    if(!user) return notFound();
    return <>{/**called react fragemnt */}
    </>

};
export default Page;