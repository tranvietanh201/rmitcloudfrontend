import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default class Footer extends React.Component{
    render(){
        return(
            <div>
                <Foot className="page-footer font-small blue pt-4">
                    <div className="container text-center text-md-left">
                        <div className="row">
                            <div className="col-md-3 mt-md-0 mt-3">
                                <img src="logo-foot.png" alt=""/>
                            </div>
                            <div className="col-md-9 mb-md-0 mb-3">
                            <h5 className="text-uppercase">Contact US</h5>
                                <p>Tel: (+84) 123456789</p>
                                <p>Email: rmitsupport@rmit.edu.vn</p>
                            </div>
                        </div>
                    </div>
                </Foot>
            </div>
        )
    }
}

const Foot = styled.footer`
    background: #343a40;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    padding-top: 10px;
    color: white;
    img {
        margin-top: 3px;
        width: 250px;
        height: 100px;
    }
`