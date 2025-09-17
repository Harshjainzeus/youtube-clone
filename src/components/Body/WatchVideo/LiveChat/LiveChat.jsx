import React, { useEffect } from 'react'
import Chat from './Chat'
import { useSelector, useDispatch } from 'react-redux'
import { addChat } from '../../../../utils/chatSlice'
import { generate, generateRandomText } from '../../../../utils/helper/randomGenerator'

const LiveChat = () => {
    const dispatch = useDispatch();

  useEffect(()=>{
    const timer =  setInterval(()=>{
        // api call and update store
        console.log('interval called')
        dispatch(addChat({name:generate(), message:generateRandomText(20)}))

    },2000)

    return ()=>{
        clearInterval(timer);    
    }

  },[dispatch])

  const chat = useSelector((state)=> state.chat);

  return (
    <div className='h-[500px] bg-gray-800 p-2  overflow-y-scroll flex flex-col-reverse'>
        {chat.map((item,index)=>(
            <Chat key={index} name={item.name} message={item.message}/>
        ))}
    </div>
  )
}

export default LiveChat