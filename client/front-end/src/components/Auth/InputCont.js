import React from 'react'
import {TextField, Grid, InputAdornment, IconButton} from "@material-ui/core"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import "./Auth.css"

const InputCont = ({name, half, handleChange, label, type, handleShowPassword}) => {

    return (
        <div className="main-cont">
       <Grid item xs={12} sm={half ? 6 : 12}>
           <TextField
           autoComplete="off"
           name={name}
           onChange={handleChange}
           variant="filled"
           fullWidth
           required
           label={label}
           autoFocus
           type={type}
           InputProps = {name === "password" ? {
               endAdornment: (
                   <InputAdornment position="end">
                       <IconButton onClick = {handleShowPassword}>{type==="password" ? <Visibility/> : <VisibilityOff/>}</IconButton>
                   </InputAdornment>
               )
           } 
        : null}
           />
       </Grid>  
       </div>   
    )
}

export default InputCont
