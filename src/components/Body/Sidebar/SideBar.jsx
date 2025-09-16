import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
    const isMenuOpen = useSelector((state) => state.nav.isMenuOpen);
    return (
     
        isMenuOpen ? <div className='col-span-2 h-[100vh] shadow-lg mr-2 w-48'>
             <h2>sidebar</h2>
             <Link to = "/">Home</Link>
              </div>
        : <></>
   

    )
}

export default SideBar