import { useEffect } from "react"
import { api_url } from "../../../utils/constants";
import VideoCard from "../../common/VideoCard";
import { useState } from "react";

const MainContainer = () => {
    const [videos, setVideos] = useState([])

    useEffect(()=>{
        fetchVideos()
    },[])

    const fetchVideos = async () => {
        const data = await fetch(api_url)
        const json = await data.json()
        setVideos(json.items);
    }

    if(videos.length === 0) return null;
    return (
        <div className='col-span-10 flex gap-2 h-1/2 flex-wrap'>
            {videos.map((video) => (
                <VideoCard key={video.id} videoData={video}/>
            ))}
        </div>
    )
}

export default MainContainer
