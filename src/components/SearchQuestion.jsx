import React from 'react'
import { useRecoilState } from 'recoil'
import { SearchQuestionState } from '../database/store'

const SearchQuestion = () => {
    const [search, setSearch] = useRecoilState(SearchQuestionState)
    return <div className='question-search'>
        <input 
            type="search" 
            placeholder='Search question...' 
            value={search} 
            onChange={ e => setSearch(e.target.value) }
        />
    </div>
}

export default SearchQuestion