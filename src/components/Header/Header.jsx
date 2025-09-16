import React, { useEffect, useCallback } from 'react';
import {Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../../utils/navSlice';
import { useState } from 'react';
import { search_api_url } from '../../utils/constants';
import { storeResults } from '../../utils/searchSlice';

const Header = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const cache = useSelector((state)=> state.search)


  const fetchSuggestion = useCallback(async (query) => {

    const data = await fetch(search_api_url + "&q=" + query);
    const json = await data.json();
    dispatch(storeResults({[query]: json.items}));
    // const str = await data.text();
    // const json = await JSON.parse(str.substring(str.indexOf("["), str.indexOf("]") + 1));
    // console.log(json);
  },[dispatch])
  
  useEffect(() => {
    console.log('cache',cache);
    if(cache[searchQuery]) return;
    const timer = setTimeout(() => fetchSuggestion(searchQuery), 1000);
    return () => clearTimeout(timer);
  }, [searchQuery, cache ,fetchSuggestion]);

  // implement deboucing in react is easy
  // as after every render old component is destroyed so return function called
  // make a settimeout for dn seconds and just clear it on subsequent rerender


 



  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }
  return (
    <div className='grid grid-flow-col my-2 py-2'>
      <div className='flex items-center'>
        <div className='col-span-2' onClick={() => dispatch(toggleMenu())}>≡ </div>
        {/* <div onclick = {() => navigate("/")}>logo</div> */}
      </div>

      <div className='grid col-span-5 px-10 mx-10'>
        <div className='relative col-span-6 '>
     
              <input type="text" className='w-1/2 border border-gray-900' onChange={handleChange} value = {searchQuery} onFocus={()=>setShowSuggestion(true)} onBlur={()=>setShowSuggestion(false)} />
              <Button type="primary">search</Button>
              {showSuggestion && <div className='fixed bg-black text-white p-4 w-1/2 '>
            <ul>
              <li className='hover:bg-gray-700 p-2'>Home</li>
              <li className='hover:bg-gray-700 p-2'>Shorts</li>
              <li className='hover:bg-gray-700 p-2'>Explore</li>
              <li className='hover:bg-gray-700 p-2'>Library</li>
            </ul>
   
          </div>}
         
        </div>

      </div>
      <div className='col-span-1'>profile</div>
    </div>

  )
}

export default Header