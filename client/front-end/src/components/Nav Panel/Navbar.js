import React,{useEffect, useState} from 'react'
import "./Nav-panel.css" 
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux'
import decode from "jwt-decode"
import { useHistory, useLocation } from 'react-router-dom'
import {Button} from "reactstrap"


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
        <nav className="navbar navbar-light bg-dark">
          <Link className="navbar-brand" to="/">
            Bootstrap
          </Link>
            <div>
                {mockUser?.result ? (
                    <div>
                        <img alt={mockUser.result?.name} src={mockUser.result?.imageUrl} className="avatar"/>
                            <span style={{color: "white"}}>{mockUser.result?.name}</span>
                        <div className="user-name">{mockUser.result?.name}</div>
                        <Button color="danger" onClick={handleLogOut}>Logout</Button>
                    </div>
                ) : (
                    <Link to="/auth">
                      <Button color="success">Sign in</Button>
                    </Link>
                  
                )}
            </div>
        </nav>
    )
}

export default Navbar
