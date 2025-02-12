import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import SearchForm from '../../components/SearchForm';
import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY } from '@/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';

export default async function Home({searchParams}:{searchParams : Promise<{query?:string}>}) {
    const query = (await searchParams).query;
    const params = {search:query || null};
    const {data:posts} = await sanityFetch({query:STARTUPS_QUERY,params});
    console.log(JSON.stringify(posts,null,2));
    return (
        <>
            <section className='pink_container'>
                <h1 className='heading'>
                    Pitch Your Startup <br /> Connect With Enterpreneurs
                </h1>
                <p className='sub-heading !max-w-3xl'>
                    {/* so here we use ! to override previsous given data */}
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
                </p>
                <SearchForm query={query} />
            </section>
            <section className='section_container'>
                <p className='text-30-semibold'>
                    {query ? `Search results for "${query}"`: 'All Projects' }
                </p>
                <ul className='mt-7 card_grid'>
                    {posts ?. length>0 ?(
                        posts.map((post:StartupTypeCard)=>(
                        <StartupCard key={post?._id} post={post} />))
                    ):(
                        <p className='no-result'>No Projects found</p>
                    )}
                </ul>
            </section>
            <SanityLive/>
        </>
    );
}
