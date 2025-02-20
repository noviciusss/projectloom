import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownit();
export const experimental_ppr = true;


const Page =async({params}:{params:Promise<{id:string}>})=>{
    const id = (await params).id;
    //Parrelel fetching of data
    const post = await client.fetch(STARTUP_BY_ID_QUERY,{id});
    //because i didnot made the editor picks in sanity databse thats why its not working
    // const [post,{select:editorPosts}]= await Promise.all([client.fetch(STARTUP_BY_ID_QUERY,{id}),client.fetch(PLAYLIST_BY_SLUG_QUERY,{slug:'editor-picks'})])
    
    if(!post)return notFound();
    const parsedContent = md.render(post?.pitch || '');
    return <>
    <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
    </section>
    <section className="section_container">
        <img src={post.image} alt="images" className="w-full h-auto rounded-xl"></img>
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <div className="flex-between gap-5">
            {post.author ? (
              <Link 
                href={`/user/${post.author._id || "#"}`} 
                className="flex gap-2 items-center mb-3"
              >
                {post.author.image ? (
                  <Image 
                    src={post.author.image}
                    alt={post.author.name || "Unknown User"}
                    width={64} 
                    height={64} 
                    className="rounded-full drop-shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div> // Placeholder for missing image
                )}
                
                <div>
                  <p className="text-20-medium">{post.author.name || "Unknown User"}</p>
                  <p className="text-16-medium !text-black-300">
                    @{post.author.username || "anonymous"}
                  </p>
                </div>
              </Link>
            ) : (
              <p className="text-gray-500">Author not available</p>
            )}

                <p className="category-tag">{post.category}</p>
            </div>
            <h3 className="text-30-bold">Pitch Detail</h3>
            {parsedContent ? (
                <article 
                className="prose max-w-4xl font-work-sans break-all"
                dangerouslySetInnerHTML={{__html:parsedContent}}
                />  
            ):(
                <p className="no-result">NO details provided</p>
            )}
        </div>
        <hr className="divider"/>

        {/*Todo :editor selected startups*/ }
        {/* {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )} */}

    </section>
    <Suspense fallback={<Skeleton className="view_skeleton" />}>{/** so we making only this part dynamiic and all page part will we static ppr:experimental*/}
      <View id={id}/>
    </Suspense>
    </>
}
export default Page