import React from 'react'
import styled from 'styled-components'
import Login from './Login.jsx'
import { Link } from 'react-router-dom'


export default class Admin extends React.Component {

    constructor() {
        super()
        this.state = {
            authenticated: 0
        }
    }

    componentDidMount(){
        this.setState({isAuthenticated: window.sessionStorage.getItem('authenticated')})
      }
     
      logout(){
        window.sessionStorage.setItem('authenticated', 0)
        this.setState({isAuthenticated: window.sessionStorage.getItem('authenticated')})
      }

    render() {
        return(
            <div className="container">
                {window.sessionStorage.getItem('authenticated')==1 ?
                    <Button>
                        <div>
                    <Link to="/projects">
                    <button className="button mt-4 mb-3">Projects</button>
                    </Link>
                    <Link to="/students">
                    <button className="button mb-3">Students</button>
                    </Link>
                    <Link to="/courses">
                    <button className="button mb-3">Courses</button>
                    </Link>
                    <Link to="/assignments">
                    <button className="button mb-3">Assignments</button>
                    </Link>
                    <Link to="/users">
                    <button className="button mb-3">Users</button>
                    </Link>
                    <button className="button-red mt-5" onClick={this.logout.bind(this)}>Log-out</button>
                    </div>
                    </Button>
                    
                :
                <div>
                    <Login />
                </div>
            
            }
            </div>
        )
    }
}

const Button = styled.div`
    margin-top: 100px;
    .button {
        background-color: #343a40;
        border: none;
        border-radius: 8px
        color: white;
        padding: 15px 200px;
        text-align: center;
        text-decoration: none;
        font-size: 20px;
        margin-left: 150px;
        width: 800px;
    }
    .button:hover {
        background-color: #17a2b8;
    }
    .button-red {
        background-color: #dc3545;
        border: none;
        border-radius: 8px
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 20px;
        margin-left: 480px;
      }
    .button-red:hover{
        background-color: #ffc107;
        color: white;
    }
`