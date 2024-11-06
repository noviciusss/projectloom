import React from 'react';
import Form from 'next/form';
import SearchFormReset from './SearchFormReset';
import { SearchIcon } from 'lucide-react';

const SearchForm = ({query} :{query?:string }) => {

    return (
        <Form
            action='/'
            className='search-form'
            scroll={false}
        >
            <input
                name='query'
                defaultValue={query}
                className='search-input'
                placeholder='Search Projects'
            />
            <div className='flex  gap-2'>{query && <SearchFormReset  />}</div>
            <button
                type='submit'
                className=' search-btn text-white'
            >
                <SearchIcon className='size-5'/>
            </button>
        </Form>
    );
};

export default SearchForm;
