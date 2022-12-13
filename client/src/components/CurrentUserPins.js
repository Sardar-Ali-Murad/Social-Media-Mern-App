import React from 'react'
import { useAppContext } from '../context/appContext'
import Button from '@mui/material/Button';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Typography from '@mui/material/Typography';

const CurrentUserPins = () => {
    let {  CurrentUserAllPins,
        AllSavedPins,
        CurrentUserSavedPins,currentUserPins,
        allSavedPins,
        currentUserSavedPins,allPins, Pins,user,deletePin,deleteSavedPin}=useAppContext()
        function del(id){
            deletePin(id)
          }
        function delsave(id){
            deleteSavedPin(id)
          }

        React.useEffect(()=>{
            CurrentUserAllPins()
            AllSavedPins()
            CurrentUserSavedPins()
        },[])
        let url="https://source.unsplash.com/random/?persons"

        let [createdPosts,setCreatedPosts]=React.useState(true)
  return (
    <div>
        <img src={url} style={{height:"300px",width:"100%"}}/>
        <div>
           <div className='userPins__Btns' style={{marginTop:"40px",display:"flex",marginLeft:"35%",marginBottom:"40px"}} >
              <Button variant="contained" style={{marginRight:"20px"}} onClick={()=>setCreatedPosts(true)}>CreatedPosts</Button>
              <Button variant="outlined"  onClick={()=>setCreatedPosts(false)}>SavedPosts</Button>
           </div>

<div className='section__padding'>

           {createdPosts ? <div className='pin__Main'>
           {currentUserPins.length<1 && <Typography variant='h3'>You Have Not Yet Created Any Pin!!</Typography>}

{currentUserPins.map((all,i)=>{
  return(
      
      <div className='single__Pin' key={i} >
          <Link to={`/pinsDetail/${all._id}`}>
      <img src={all.image} style={{height:"170px"}} />
          </Link>

      <div style={{display:"flex",textAlign:"center"}}>
      <DeleteIcon onClick={()=>del(all._id)} className="delete"/>  

        <a href={`${all.image}?dl=`}   onClick={(e) => {
            e.stopPropagation();
            }} download traget="_blank"><FileDownloadIcon className='download'/></a> 

          

         <a className='image__Link'   onClick={(e) => {
              e.stopPropagation();
            }} href={all.image} target="_blank">{all.image.slice(0,15)}...</a>
            


     



      <p className='p__Sans'>{all.creatorName}</p>
      </div>
  </div>
)
})}
</div>:


<div className='pin__Main'>
{currentUserSavedPins.length<1 && <Typography variant='h3'>You Have Not Yet Saved Any Pin!!</Typography>}

{currentUserSavedPins?.map((pins)=>{
  return(
      
     pins.pin.map((all)=>{
        return(
            <div className='single__Pin' >
            <Link to={`/pinsDetail/${all._id}`}>
        <img src={all.image} style={{height:"170px"}} />
            </Link>
  
        <div style={{display:"flex",textAlign:"center"}}>
          <DeleteIcon onClick={()=>delsave(pins._id)} className="delete"/>  
  
          <a href={`${all.image}?dl=`}   onClick={(e) => {
              e.stopPropagation();
              }} download traget="_blank"><FileDownloadIcon className='download'/></a> 
  
            
  
           <a className='image__Link'   onClick={(e) => {
                e.stopPropagation();
              }} href={all.image} target="_blank">{all.image.slice(0,15)}...</a>
              

        <p className='p__Sans'>{all.creatorName}</p>
        </div>
    </div>
        )
     })
)
})}
</div>
}
</div>
        </div>
    </div>
  )
}

export default CurrentUserPins
