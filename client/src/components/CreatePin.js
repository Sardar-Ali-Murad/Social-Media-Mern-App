
import React from 'react'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import TextField from '@mui/material/TextField';
import "./index.css"
import { useAppContext } from '../context/appContext';
import Button from '@mui/material/Button';
import Alert from "./Alert"
const CreatePin = () => {
  let {submitPin,showAlert}=useAppContext()
    let [values,setValues]=React.useState({
        name:"",
        title:"",
        description:"",
        category:""
    })

    let { user,uploadImage
    } = useAppContext()
    

    function handleChange(e){

       setValues((pre)=>{
        return {
            ...pre,
            [e.target.name]:e.target.value
        }
       })
    }

    
function handleimage(event){
    uploadImage(event)
  }


  function submit(){
    let {name,title,description,category}=values
      submitPin({name,title,description,category})
  }

    let arr=["animals","nature","electronics","city","village","trends"]

    // console.log(values)
  return (
    <div className='create__Pin__Main section__padding' style={{display:"flex",flexDirection:"column"}}>
      {showAlert && <Alert/>}
        <h1 className='h__Cormorant' style={{textAlign:"center"}}>Upload Your New Pin</h1>
         <FormRow type="text" name="name" value={values.name} handleChange={handleChange} labelText="Name"/>     
         <FormRow type="text" name="title" value={values.title}  handleChange={handleChange} labelText="Title"/>     
         <FormRow type="text" name="description" value={values.description} handleChange={handleChange} labelText="Description"/>     
         <FormRowSelect type="text" name="category" value={values.category} handleChange={handleChange} list={arr} labelText="Category"/>     

          <TextField id="standard-basic"   variant="filled"    type="file"  accept="image/*" onChange={handleimage}  style={{marginTop:"40px"}} /> 

         
{/* <div class="form-row">
<input type="file" id="image" accept="image/*" onChange={handleimage} />
</div> */}


         <Button variant="outlined" style={{marginTop:"30px",width:"20%"}} onClick={submit}>Submit</Button>

         
           
    </div>
  )
}

export default CreatePin
