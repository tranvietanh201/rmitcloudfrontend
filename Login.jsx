import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    handleName(e) {
        this.setState({username: e.target.value})
    }

    handlePass(e) {
        this.setState({password: e.target.value})
    }

    login(){
 
        var user = {username: this.state.username, password: this.state.password}
        fetch('http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/admin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.result == 'authenticated'){
                alert('Login successfully')
 
                window.sessionStorage.setItem('authenticated', 1)
 
                window.location.reload()
            }  
            else{
                alert('Wrong username and password')
                window.sessionStorage.setItem('authenticated', 0)
            }
        })
    }

    render(){
        return(
        <div className="container">
            <div className="row">
                <div className="col-3">
                </div>
                <Auth className="col-6">
                <input placeholder="Username" className="form-control" type='text' id='username' name='username' value={this.state.username}
                onChange={this.handleName.bind(this)}/><br/>
    
                <input placeholder="Password" className="form-control" type='password' id='password' name='password' value={this.state.password}
                onChange={this.handlePass.bind(this)}/><br/>

                <Link to="/">
                        <button className="btn">Back</button>
                </Link>
                <button className="login" onClick={this.login.bind(this)}>Login</button>

            </Auth>
                <div className="col-3">
                </div>
            </div>
        </div>
       
        )
    }
       
}

const Auth = styled.div`
    padding-top: 50px;
    padding-bottom: 50px;
    border-radius: 10px;
    margin: 300px auto;
    box-shadow: 5px 5px grey;
    border: 1px solid #888;
    width: 80%; 
    input {
        margin-left: 130px;
        width: 50%;
    }
    .login {
        margin-left: 190px;
        background: #dc3545;
        outline: none;
        border-style: none;
        color: white;
        padding: 8px 15px 8px 15px;
        border-radius: 10%;
    }
    .login:hover {
        background: #f0ad4e;
    }
    .btn {
        margin-left: 100px;
        background: #343a40;
        color: white;
        padding: 8px 15px 8px 15px;
        border-radius: 10%;
    }
    .btn:hover {
        background: #17a2b8;
    }
`
