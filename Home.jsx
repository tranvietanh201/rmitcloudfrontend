import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination'


export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            courses: [],
            sort: "",
            filter: "",
            filter2: "",
            filterName: "",
            activePage: 15
        }
    }

    fetchCourses() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/courses'
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ courses: json }))
    }

    fetchProjects() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/projects'
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ projects: json}))
    }

    filterProjects() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/projects/search?'
        fetch(url + this.state.filter + this.state.filter2)
            .then(res => res.json())
            .then(json => this.setState({ projects: json }))
    }

    componentDidMount() {
        this.fetchProjects()
        this.fetchCourses()
    }

    handleFilterName(e) {
        this.setState({filterName: e.target.value, filter2: e.target.value})
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
      }

    render() {
        var currentProjects = this.state.projects
        if (this.state.sort === "alphabet") {
            currentProjects = this.state.projects.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1
                }
            })
        } else if (this.state.sort === "realphabet") {
            currentProjects = this.state.projects.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1
                }
            })
        } else if (this.state.sort === "course") {
            currentProjects = this.state.projects.sort(function (a, b) {
                if (a.course[0].name.toLowerCase() < b.course[0].name.toLowerCase()) {
                    return -1
                }
            })
        } else if (this.state.sort === "sem") {
            currentProjects = this.state.projects.sort(function (a, b) {
                if (a.semester.toLowerCase() < b.semester.toLowerCase()) {
                    return -1
                }
            })
        } else if (this.state.sort === "scope") {
            currentProjects = this.state.projects.sort(function (a, b) {
                if (a.scope.toLowerCase() < b.scope.toLowerCase()) {
                    return -1
                }
            })
        } else if (this.state.sort === "") {
            currentProjects = this.state.projects.sort(function (a, b) {
                if (a._id < b._id) {
                    return -1
                }
            })
        }
        return (
            <Project className="container">
                <h2>Projects</h2>
                <hr/>
                <Filter className="row">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" onClick={() => { this.setState({ sort: "" }) }}>None</a>
                            <a className="dropdown-item" onClick={() => { this.setState({ sort: "sem" }) }}>Semester</a>
                            <a className="dropdown-item" onClick={() => { this.setState({ sort: "course" }) }}>Course</a>
                            <a className="dropdown-item" onClick={() => { this.setState({ sort: "scope" }) }}>Scope</a>
                            <a className="dropdown-item" onClick={() => { this.setState({ sort: "alphabet" }) }}>A-Z</a>
                            <a className="dropdown-item" onClick={() => { this.setState({ sort: "realphabet" }) }}>Z-A</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Filter
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" onMouseOver={() => { this.setState({ filter: "", filter2: "" }) }} onClick={this.fetchProjects.bind(this)}>All</a>
                            <a className="dropdown-item" onMouseOver={() => { this.setState({ filter: "scope=", filter2: "External" }) }} onClick={this.filterProjects.bind(this)}>Scope: External</a>
                            <a className="dropdown-item" onMouseOver={() => { this.setState({ filter: "scope=", filter2: "Internal" }) }} onClick={this.filterProjects.bind(this)}>Scope: Internal</a>
                            <a className="dropdown-item" onMouseOver={() => { this.setState({ filter: "application=", filter2: "Yes" }) }} onClick={this.filterProjects.bind(this)}>Application: Yes</a>
                            <a className="dropdown-item" onMouseOver={() => { this.setState({ filter: "application=", filter2: "No" }) }} onClick={this.filterProjects.bind(this)}>Application: No</a>
                            <hr/>
                            <label>By Name (case sensitive)</label>
                            <input onClick={() => {this.setState({filter: "name="})}} onChange={this.handleFilterName.bind(this)} value={this.state.filterName} className="form-control" type="text"/>
                            <button onClick={this.filterProjects.bind(this)} className="submit">Filter by name</button>                            
                        </div>
                    </div>
                </Filter>
                <ProjectCard>
                    <div className="row">
                        {currentProjects.map(p => {
                            if (p.course.length !== 0) {
                                return (
                                    <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                                        <Link key={p.id} className="link" to={`/${p.name}`}>
                                            <div className="card">
                                                <div className="card-img-top"></div>
                                                <div className="card-body">
                                                    <h4 className="card-title">{p.name}</h4>
                                                    <p className="card-text">{p.course[0].name}</p>
                                                    <p className="card-text">{p.semester}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                                        <Link key={p.id} className="link" to={`/${p.name}`}>
                                            <div className="card">
                                                <div className="card-body">
                                                    <h4 className="card-title">{p.name}</h4>
                                                    <p className="card-text"></p>
                                                    <p className="card-text">{p.semester}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            }
                        }
                        )}
                    </div>
                </ProjectCard>
            </Project>
        )
    }
}

const Project = styled.div`
    h2 {
        margin-top: 30px;
        font-size: 100px;
    }
`

const Filter = styled.div`
    cursor: pointer;
    margin-right: 5px;
    margin-top: 30px;
    margin-bottom: 30px;
    .btn {
        border-style: none;
        outline: none;
        margin-left: 15px;
        background: #343a40;
        color: white;
        padding: 8px 15px 8px 15px;
    }
    .btn:hover {
        background: #17a2b8;
    }
    label {
        margin-left: 20px;
        margin-right: 20px;
    }
    input {
        margin-left: 20px;
        margin-right: 20px;
        width: 300px;
    }
    .submit {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 190px;
        background: #343a40;
        outline: none;
        border-style: none;
        color: white;
        padding: 8px 15px 8px 15px;
        border-radius: 10px;
    }
    .submit:hover {
        background: #17a2b8;
    }

`

const ProjectCard = styled.div`
    .link:hover {
        text-decoration: none;
    }
    .link {
        color: black;
    }
    .card:hover {
        box-shadow: 1px 1px 5px 5px #F5F5F5;
        background: #343a40;
    }
    .card:hover .card-text {
        color: white;
    }
    .card:hover .card-title {
        color: #dc3545;
    }
    .card {
        border-radius: 5%;
    }
    .card-img-top {
        height: 210px;
        width: auto;
        background: #dc3545;
        border-radius: 5% 5% 0 0;

    }
    .card-title {
        display: block;
        display: -webkit-box;
        height: 22 * 1.2 * 2;
        max-width: 100%;
        line-height: 1.2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis
    }
    .card-text {
        margin-bottom: 0px;
    }
`