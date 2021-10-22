import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import Posts from '../Post/posts'
import FormElements from '../Form/forms'
import getPost from '../../REDUX/action/action'


const MainComponents = () => {
    const [currentId,  setCurrentId] = useState(null)
    const dispatch = useDispatch();
    
    //MAKES DISPATCHING WHERE IT CAN DISPLAY OUR DATA ON THE SCREEN
    // IT WILL WORK ONLY WHEN THE DISPATCH METHOD WORKS
      
    useEffect(() => {
        dispatch(getPost())
      },[currentId, dispatch])

    return (
        <div>
            <Posts setCurrentId={setCurrentId}/>
            <FormElements currentId={currentId} setCurrentId={setCurrentId}/>
        </div>
    )
}

export default MainComponents
