import React from 'react'
import {Link,useParams} from "react-router-dom"
import { useAppContext } from '../context/appContext'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from "./Alert"
// import { Typography } from '@mui/material';
import Typography from '@mui/material/Typography';
const PinDetails = () => {
    let {id}=useParams()
    let { singlePinDetails,singlePin,createReview,showAlert,singlePinReviews,singlePinReviewsArray}=useAppContext()
    let [loading,setLoading]=React.useState(true)

    let [review,setreview]=React.useState("")

    React.useEffect(()=>{
        setLoading(true)
        singlePinDetails(id)
        singlePinReviews(id)
        setLoading(false)
    },[])

    function submitReview(){
        createReview({id,review})
    }

//   console.log(singlePin. creatorName)
  return (
    <div className='section__padding'>
        
        {singlePin.creatorName &&
           <>
            <img src={singlePin?.image} style={{height:"250px",borderRadius:"10px"}}/>
       <p style={{fontSize:"36px"}} className='p__Sans'>{singlePin.name}</p>
       <p style={{fontSize:"30px"}} className='p__Sans'>{singlePin.title}</p>
       <p style={{fontSize:"25px"}} className='p__Sans'>{singlePin.category}</p>
       <p style={{fontSize:"20px"}} className='p__Sans'>{singlePin.description}</p>

        {showAlert && <Alert/>}
       <h2 className='h__Cormorant' style={{marginTop:"60px"}}>Leave A Review</h2>
       <div style={{display:"flex",marginTop:"30px",alignItems:"center"}}>
       <Link to={`/userPins/${singlePin?.createdBy}`}>
               <Avatar style={{marginRight:"20px",cursor:"pointer"}} sx={{ bgcolor: deepOrange[500] }}>{singlePin.creatorName.charAt(0)}</Avatar>
    </Link>
           
            <TextField id="outlined-basic" label="Review" value={review} onChange={(e)=>setreview(e.target.value)} variant="outlined" />
            <Button style={{marginLeft:"20px"}} variant="contained" onClick={submitReview}>Submit</Button>
       </div>

       <div className='related__Review' style={{marginTop:"40px"}}>
            <h1 className="h__Sans">Related Reviews</h1>
            {singlePinReviewsArray.length<1 && <Typography variant='h4'>No Review Yet Be His Guest!!</Typography>}
            {singlePinReviewsArray.map((all,i)=>{
                return(
                    <div key={i} style={{display:"flex",alignItems:"center",marginTop:"30px"}}>
                               <Link to={`/userPins/${all?.userId}`}>
               <Avatar style={{marginRight:"20px",cursor:"pointer"}} sx={{ bgcolor: deepOrange[500] }}>{all.userName.charAt(0)}</Avatar>
    </Link>
                              <p className='p__Sans' style={{marginTop:"20px"}}>{all?.review}</p>
                    </div>
                )
            })}
       </div>

</>

}
    </div>
  )
}

export default PinDetails
