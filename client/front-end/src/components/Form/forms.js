import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Label, FormText, FormGroup, Input,  Button} from "reactstrap"
import FileBase from "react-file-base64"
import {createNewPost, updateNewPost} from '../../REDUX/action/action'
import "./form.css"

const FormElements = ({currentId, setCurrentId}) =>  {
        // UseState Hook that defines our  database collection and take its value also control
      const selector = useSelector(state => currentId ? state.posts.find(p => p._id ===currentId) : null)
      const [inputData, setInputData] = useState({title:'', message:'', tags:'', selectedFile:''})
      const dispatch = useDispatch()
      const user = JSON.parse(localStorage.getItem("profile"))
// HandleSubmit will send data received from form elements to backEnd
    const handleSubmit = e => {
        e.preventDefault()
        if(currentId===null){
          dispatch(createNewPost({...inputData, name: user?.result?.name}))
        }else{
          dispatch(updateNewPost(currentId,{...inputData, name: user?.result?.name}))
        }
        clearText() //After clicking the any button, it will clear input value
    }
    //Here we will make work selector another name is single post we take and check the similarity of id of single post
    useEffect(()=> {
        if(selector){
          setInputData(selector)
        }
    }, [selector])

    if(!user?.result?.name){
      return(
        <div className="alert-danger p-2">You can't share any post without registration, unfortunately. For using excellent functionalites, sign up. </div>
      )
    }

//Clearing the text when we cancel
const clearText = () => {
  setCurrentId(null)
  setInputData({ 
  title:'',
  message:'',
  tags:'', 
  selectedFile:''})}
  
    //Creating form elements and adding select file function by FileBase
    // Controlling its value and submit all data for sending to the database
    return (
        <Form className="main-form d-flex" onSubmit={handleSubmit}>
        <FormGroup className="header-text bg bg-warning p-2 mb-3">
        <FormText color="dark" >
         {currentId ? "Edit your article": "Create your article"}
        </FormText>
      </FormGroup>
      <FormGroup >
        <Label  for="title">Title</Label>
        <Input
         required
         autoComplete="off"
         type="text"
         name="title" 
         id="title"
         placeholder="title..."
         value={inputData.title}
         onChange={(e)=>setInputData({...inputData, title: e.target.value})}/>
      </FormGroup>
      <FormGroup>
        <Label for="title">Tags</Label>
        <Input 
         required
         type="text" 
         name="tags"
         id="tags" 
         placeholder="to your friends"
         value={inputData.tags}
         onChange={(e)=>setInputData({...inputData, tags: e.target.value.split(',')})} />
      </FormGroup>
      <FormGroup className="mb-2">
        <Label className="mb-2" for="message">Your impression</Label>
        <Input 
         type="textarea"
         name="text" 
         id="text" 
         placeholder="share your impression..." 
         className="text-area"
         cols="30" rows="5"
         value={inputData.message}
         onChange={(e)=>setInputData({...inputData, message: e.target.value})} />
      </FormGroup>
      <FileBase
        className="selected-file"
        type="file"
        multiple={false}
        onDone ={({base64}) => setInputData({...inputData, selectedFile: base64})}/> 
      <Button type="submit" className="btn btn-success mt-4">Share</Button>
      <Button className="btn btn-danger my-3" onClick={clearText}>Cancel</Button>
    </Form>
    )
}
export default FormElements
