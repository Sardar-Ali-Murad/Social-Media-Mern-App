import React from 'react'
import TextField from '@mui/material/TextField';
import {array} from "../utils"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddIcon from '@mui/icons-material/Add';
import "./index.css"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import HomePins from './HomePins';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Logout from "../assets/images/Logout.png"
import Typography from '@mui/material/Typography';

const Home = () => {
  let {Pins,allPins,changeFunction,homeSearch, logoutUser,user}=useAppContext()
   let [toogleSidebar,setToogleSidebar]=React.useState(false)


   React.useEffect(()=>{
     Pins()
   },[])

   function search(e){
    changeFunction(e)
   }
  return (
    <div style={{display:"flex"}}>


      <div className='big__Sidebar'>
          <CameraAltIcon style={{color:"red",fontSize:"30px",margin:"10px",cursor:"pointer"}}/>

         {array.map((all,i)=>{
              return(
                <Link key={i} to={`/categoryPins/${all.text}`}>
                  <div className='single__Link'>
                      <p className='h__Cormorant link__Text'>{all.text}</p>
                  </div>
                </Link>
              )
         })}
      </div>



      <div className={`small__Sidebar ${toogleSidebar?"sidebarIndex":""}`}>
          <p className='ham' onClick={()=>setToogleSidebar(true)}  style={{fontSize:"40px"}}><MenuIcon/></p>
       {toogleSidebar &&  <div onClick={()=>setToogleSidebar(false)} className={`small__Sidebar__Layout  ${toogleSidebar?"active":""}`}>
          <p className='cross' style={{fontSize:"40px"}} ><CloseIcon/></p>
          <div className='wrapper'></div>
          <div className='small__Wrapper'>
          {array.map((all)=>{
            return(
              <Link to={`/categoryPins/${all.text}`}>
                 <div className='single__Link'>
                      <p className='h__Cormorant link__Text' onClick={()=>setToogleSidebar(false)}>{all.text}</p>
                 </div>
              </Link>
              )
            })}
            </div>
          </div>
        }
      </div>

   <div className='home__Text__Layout' style={{marginLeft:"20px",width:"100%",marginRight:"20px",marginBottom:"40px"}}>
       <div className='home__Input' style={{marginTop:"20px",display:"flex",marginBottom:"40px"}}>
        
        <div style={{width:"70%"}} className="home__Search">

          <TextField style={{width:"60%"}} name="homeSearch" id="standard-basic" label="Search..." value={homeSearch} onChange={search} variant="standard"  />
        </div>

        <Link to="/createPin">
          <div style={{height:"50px",width:"100%",background:"gray",opacity:".4",marginLeft:"20px",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",color:"black",marginRight:"100px"}}>
            <Typography variant="h6">Upload</Typography>
            <AddIcon/>
          </div>
        </Link>
       
       {/* <MeetingRoomIcon style={{marginLeft:"40px",marginTop:"15px",color:"blue",cursor:"pointer"}} onClick={logoutUser}/> */}

    <div style={{display:'flex',marginLeft:"30px"}}>

       <img src={Logout} style={{height:"50px",width:"50px",borderRadius:"50%",marginLeft:"10px",cursor:"pointer"}} onClick={logoutUser}/>

       
       <Link to={`/currentUserPins`}>
               <Avatar style={{marginLeft:"30px"}} sx={{ bgcolor: deepOrange[500] }}>{user.name.charAt(0)}</Avatar>
            </Link>
    </div>

        </div>      
     <HomePins data={allPins}/>
   </div>
      
    </div>
  )
}

export default Home
