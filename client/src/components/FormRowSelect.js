import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
    return (
      <div className='form-row'>
              <InputLabel id="demo-simple-select-standard-label">{labelText}</InputLabel>
        <Select
        style={{width:"70%"}}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label={labelText}
          name={name}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        {list.map((all,i)=>{
            return <MenuItem key={i} value={all}>{all}</MenuItem>
        })}
        </Select>
      </div>
    )
  }
  
  export default FormRowSelect