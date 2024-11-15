import StartupCard from '@/components/StartupCard';
import SearchForm from '../../components/SearchForm';

export default async function Home({searchParams}:{searchParams : Promise<{query?:string}>}) {
    const query = (await searchParams).query;
    const posts = [{_createAt: new Date(), 
        _id: '1',
        title: 'Tittle', 
        description: 'This is description', 
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.davincified.com%2Fmt%2Fproducts%2Fmajestic-dragon-paint-by-numbers-kit&psig=AOvVaw0IH0CZMIi-UWWcsA3gXkLh&ust=1730531083079000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDUqunIuokDFQAAAAAdAAAAABAE',
        category: 'Dragon',
        views : 55,
        author: {_id:1, name:"Samarth"} }]
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
                        posts.map((post:StartupCardType)=>(
                        <StartupCard key={post?._id} post={post} />))
                    ):(
                        <p className='no-result'>No Projects found</p>
                    )}
                </ul>
            </section>
        </>
    );
}
