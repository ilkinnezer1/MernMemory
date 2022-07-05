import React,{useEffect, useState} from 'react'
import "./Nav-panel.css" 
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux'
import decode from "jwt-decode"
import { useHistory, useLocation } from 'react-router-dom'
import Avatar from 'react-avatar'
import {Button,Container} from "reactstrap"
import logo from './logo.svg'



const Navbar = () =>  {

const [mockUser, setMockUser] = useState(JSON.parse(localStorage.getItem("profile")))
const dispatch = useDispatch()
const history = useHistory()
const location = useLocation()

       const handleLogOut = () => { 
          dispatch({type:"LOGOUT"})
            history.push('/auth')
               setMockUser(null)
            }

            useEffect(()=> {
                const token = mockUser?.token
                if(token){
                    const decodedToken = decode(token)
                    if(decodedToken.exp * 1000 < new Date().getTime()) handleLogOut()
                }
                setMockUser(JSON.parse(localStorage.getItem("profile")))
            }, [location])

         

    return (
        <nav className=" navbar navbar-light bg-light d-flex justify-content-between">
            <Container>
            <div className="navbar-brand">
            <Link to="/">
                  <img className="navImg" src={logo} />
          </Link>
              </div>
         <div>
                {mockUser?.result ? (
                    <div className="other">
                        <div className="other">
                        <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue', 'gray', 'white','black'])}
                        name={mockUser.result?.name}
                        round 
                        size="40" 
                        src={mockUser.result?.imageUrl}
                        textSizeRatio={2}/>
                            <span style={{color: "black",  margin: "10px 5px 0 5px",}}>{mockUser.result?.name}</span>
                        <div style={{margin: "10px 5px 0 5px"}} className="user-name">{mockUser.result?.surname}</div>
                        </div>
                        <Button color="danger" onClick={handleLogOut}>Logout</Button>
                    </div>
                ) : (
                    <div>
                    <Link to="/auth">
                      <Button color="success">Sign in</Button>
                    </Link>
                    </div>
                )}
         </div>
         </Container>
        </nav>
    )
}

export default Navbar
