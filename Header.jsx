import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SearchBar from './SearchBar.jsx'


export default class Header extends React.Component {

    render() {
        return (
            <div>
           <Nav className="navbar navbar-expand-md sticky-top">
               <div className="container">
                    <Link to="/">
                        <img className="nav-brand" src="Logo-02.png" alt="" />
                    </Link>
                    <SearchBar projects={this.props.projects} />
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <Link to="/">
                            <button type="button" className="btn"><i className="fa fa-home"/>
                                Home
                            </button>
                            </Link>
                            <Link to="/admin">
                            <button type="button" className="btn"><i className="fa fa-file"/>
                                Admin
                            </button>
                            </Link>
                        </ul>
                    </div>
                </div>
            </Nav>    
            </div>
 
            

        )
    }
}

const Nav = styled.nav`
    background: #343a40;
    color: white;
    padding-top: 15px;
    padding-bottom: 15px;
    .btn {
        margin-left: 20px;
        background: #dc3545;
        color: white;
    }
    .btn:hover {
        background: #ffc107;
        color: white;
    }
    .nav-brand {
        height: 50px;
        width: auto;
    }
`