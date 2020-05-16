import React from 'react'
import styled from 'styled-components'

export default class ProjectPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            project: [],
        }
    }

    fetchProject() {
        const {handle} = this.props.match.params
        var url = `http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/projects/search?name=${handle}`
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({project: json}))
    }

    componentDidMount() {
        this.fetchProject()
    }

    render() {
        return(
            <div className="container">
                <Project>
                {this.state.project.map(p =>
                    <div key={p._id}>
                        <h1 className="text-center">{p.name}</h1>
                        <hr/>
                        {p.course.map(c =>
                            <h3 className="text-center" key={c.id}>Course name: {c.name}</h3>    
                        )}
                        <h3 className="text-center">Semester: {p.semester}</h3>
                        <h2 className="text-center">Scope: {p.scope}</h2>
                        <h2 className="text-center">Application in real life: {p.application}</h2>
                        <h2 className="text-center">Link to industry: {p.industrial_link}</h2>
                        <ul>
                            <h4>Technologies used:</h4>
                            <p>{p.technology}</p>
                        </ul>
                        <ul>
                            <h4>Registered students:</h4>
                            {p.student.map(s =>
                                <p key={s.id}>{s.id} | {s.name}</p>    
                            )}
                        </ul>
                        <ul>
                        <h4>Project description:</h4>
                        <p>{p.description}</p>
                        </ul>
                        <ul>
                            <h4>Assignments:</h4>
                            {p.assignment.map(a =>
                                <div className="dropdown" key={a._id}>
                                      <button type="button" className="asm" data-toggle="dropdown">
                                            {a.name}
                                        </button>
                                        <div className="dropdown-menu">
                                        <h5 className="text-center title">{a.name}</h5>
                                        <hr/>
                                        <h5 className="text-center percent">Percentage: {a.percentage}</h5>
                                        <p>{a.description}</p>
                                        </div>
                                </div> 
                            )}
                        </ul>
                        <div className="row">
                            {p.photo.map(item => 
                                <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                                    <img key={item._id} src={item} alt=""/>
                                </div>           
                            )}
                        </div>
                    </div>    
                )}
                </Project>
            </div>
        )
    }
}

const Project = styled.div`
    padding-top: 50px;
    h1 {
        color: #dc3545;
        text-shadow: 5px 2px #ffc107;
        font-size: 100px;
    }
    h2 {
        margin-top: 15px;
        font-size: 18px;
    }
    h3 {
        font-style: italic;
        color: #dc3545;
    }
    h4 {
        padding-top: 20px;
        padding-bottom: 10px;
        color: #dc3545;
    }
    p {
        margin-left: 50px;
        font-size: 18px;
    }
    .asm {
        width: 300px;
        height: 40px;
        background:  #343a40;
        color: white;
        border-style: none;
        border: 1px solid;
        border-radius: 10px;
    }
    .asm:hover {
        background: #17a2b8;
    }
    .asm:focus {
        outline: none;
        background: #17a2b8;
    }
    .dropdown-menu {
        width: 700px;
    }
    .title {
        display: block; /* Fallback for non-webkit */
        display: -webkit-box;
        height: 22 * 1.2 * 2; /* Fallback for non-webkit */
        max-width: 100%;
        line-height: 1.2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis
    }
    .percent {
        color: #dc3545;
        font-style: italic;
    }
    .button-red {
        background: #dc3545;
        outline: none;
        border-style: none;
        color: white;
        padding: 8px 15px 8px 15px;
        border-radius: 10px;
    }
    .button-red:hover {
        background: #f0ad4e;
    }
    .button-dark {
        margin-right: 15px;
        background: #343a40;
        outline: none;
        border-style: none;
        color: white;
        padding: 8px 15px 8px 15px;
        border-radius: 10px;
    }
    .button-dark:hover {
        background: #17a2b8;
    }
    .button-green {
        margin-right: 15px;
        background: #5cb85c;
        outline: none;
        border-style: none;
        color: white;
        padding: 8px 15px 8px 15px;
        border-radius: 10px;
    }
    .button-green:hover {
        background: #5bc0de;
    }
    input {
        margin-bottom: 15px;
    }
`