import { useDispatch } from "react-redux";
import { closeMenu } from "../../../utils/navSlice";
import { useEffect ,useState} from "react";
import { useSearchParams } from "react-router-dom";
import Comments from "./Comments";
import { comments } from "../../../utils/constants";
import LiveChat from "./LiveChat/LiveChat";
import { generate } from "../../../utils/helper/randomGenerator";
import { addChat } from "../../../utils/chatSlice";

const WatchVideo = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState('');

  const videoId = searchParams.get("v"); // v in url
  console.log("videoId", videoId);

  // want to collapse a side bar so dispacth action in useeffect
  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  const handleSubmit = (e)=> {
    e.preventDefault();
    dispatch(addChat({name:generate(), message:input}))
    setInput('');
  }

  

  return (
   <div>
    <div className ="flex">
      <div className="w-2/3">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-1/3">
          <LiveChat/>
          <form className="flex" onSubmit={handleSubmit}>
            <input className="w-4/5 rounded-l-2xl"  type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
            <button className="bg-red-500 rounded-r-2xl w-1/5" onClick={handleSubmit}>Send</button>
          </form>
   
      </div>
    </div>

    <div className="my-4">
      <h1 className="font-bold text-lg">Comments</h1>
      <div>
        <Comments comments={comments}/>
      </div>
    </div>
   </div>
  );
};

export default WatchVideo;
