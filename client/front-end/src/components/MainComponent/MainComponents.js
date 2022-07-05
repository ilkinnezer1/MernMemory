import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Paper, Button, AppBar, TextField, Grid, Container, Grow } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import Posts from '../Post/posts'
import FormElements from '../Form/forms'
import getPost from '../../REDUX/action/action'
import {getPostbySearch} from '../../REDUX/action/action'
import Footer from '../Footer/Footer'
import useStyles from "./styles"
import ReactChipInput from "react-chip-input"
import "./home.css"
import Intro from './Intro'
import PaginationContainer from '../Paginator/Pagination'
import Community from './Community/Community'



//Use query function allows us to find any element by using its location

const MainComponents = () => {
    const [currentId,  setCurrentId] = useState(null)
    const [search, setSearch]= useState("")
    const [tags, setTags] = useState([])
    const dispatch = useDispatch();
    const query = new URLSearchParams(useLocation().search) //Getting specific url with parameters
    const history = useHistory()
    const page = query.get("page") || 1 // Allows us to get any page we search
    const searchQuery = query.get("searchQuery")
    const classes = useStyles()
    //MAKES DISPATCHING WHERE IT CAN DISPLAY OUR DATA ON THE SCREEN
    // IT WILL WORK ONLY WHEN THE DISPATCH METHOD WORKS

    useEffect(() => {
        dispatch(getPost())
      },[currentId, dispatch])

      const handleSearch = () => {
        if(search.trim() || tags){
              dispatch(getPostbySearch({search, tags: tags.join(",")}))
              history.push(`/posts/search?searchQuery=${search}`)
        }else{
            history.push("/")
        }
    }

        // Handle Functions      
      const handlePress = (e) => {
          if(e.keyCode === 13){
              handleSearch()
              // add handel search here
          }
      }
      const handleAdd = (tag) => {
        setTags([...tags, tag]) //First tag is to spread value on state and second one is a parameter of handle add functions
      }
      const handleDelete = index => {
           const tag = tags.slice();
            tag.splice(index, 1);
             setTags(tag);
      }
      //HandleSearch Function //search trimn //dispatch fetch search post //hsitoru push / 

    return (
        <Grow in>
            <div className="full">
            <Intro/>
        <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={8} md={9} >
                <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4} md={3} className="grid-container">
                    <div className="mt-5 pt-1">
                    <TextField name="search" variant="filled" label="Search Posts" fullWidth autoComplete="off"
                     value={search}
                     onChange={(e)=>setSearch(e.target.value)} 
                     onKeyPress={handlePress}/>
                     </div>
                     <div className="mt-2">
                     <ReactChipInput
                     autoComplete={"off"}
                     chips={tags}
                     onSubmit={handleAdd}
                     onRemove={handleDelete} />
                     </div>
                <Button onClick={handleSearch} className={classes.searchButton}>Search</Button>
                <FormElements currentId={currentId} setCurrentId={setCurrentId}/>
                <Paper elevation={6}>
                 </Paper>
                </Grid>
            </Grid>
            
        </Container>
        <Community/>
        <Footer/> 
        </div>
        </Grow>
    )
} 

export default MainComponents
