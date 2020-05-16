import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            tempStudArr: [],
            tempStud: [],
            studID: "",
            tempAsmArr: [],
            tempAsm: [],
            asmName: "",
            tempCourse: [],
            tempC: [],
            courseID: "",
            tempPhoto: [],
            url:  "",
            name: "",
            semester: "2019-1",
            technology: "",
            scope: "Internal",
            description: "",
            industrial_link: "",
            application: "Yes",
            addNew: false,
        }
    }

    fetchProjects() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/projects'
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ projects: json }))
    }

    componentDidMount() {
        this.fetchProjects()
    }

    addStudent() {
        if (this.state.tempStud.length != 0) {
            alert("Successfully added student")
            this.setState({ tempStudArr: this.state.tempStudArr.concat(this.state.tempStud[0]) })
            this.setState({ tempStud: [] })
        } else {
            alert("Invalid input")
        }
    }

    fetchAStudent() {
        var url = "http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/students/search?id="
        var id = this.state.studID
        fetch(url + id)
            .then(res => res.json())
            .then(json => {
                this.setState({ tempStud: json })
                this.addStudent()
            })
    }

    addAsm() {
        if (this.state.tempAsm.length != 0) {
            alert("Successfully added assignment")
            this.setState({ tempAsmArr: this.state.tempAsmArr.concat(this.state.tempAsm[0]) })
            this.setState({ tempAsm: [] })
        } else {
            alert("Invalid input")
        }
    }

    fetchAnAsm() {
        var url = "http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/assignments/search"
        var name = this.state.asmName
        fetch(url + "/" + name)
            .then(res => res.json())
            .then(json => {
                this.setState({ tempAsm: json })
                this.addAsm()
            })
    }

    addCourse() {
        if (this.state.tempC.length != 0) {
            alert("Successfully added course")
            this.setState({ tempCourse: this.state.tempCourse.concat(this.state.tempC[0]) })
            this.setState({ tempC: [] })
        } else {
            alert("Invalid input")
        }
    }

    fetchACourse() {
        var url = "http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/courses"
        var id = this.state.courseID
        fetch(url + "/" + id)
            .then(res => res.json())
            .then(json => {
                this.setState({ tempC: json })
                this.addCourse()
            })
    }

    resetStates() {
        this.setState({
            tempStudArr: [],
            tempStud: [],
            studID: "",
            tempAsmArr: [],
            tempAsm: [],
            asmName: "",
            tempCourse: [],
            tempC: [],
            courseID: "",
            tempPhoto: [],
            url:  "",
            name: "",
            semester: "2019-1",
            technology: "",
            scope: "Internal",
            description: "",
            industrial_link: "",
            application: "Yes",
            addNew: true,
        })
    }

    handleID(e) {
        this.setState({ id: e.target.value })
    }

    handleName(e) {
        this.setState({ name: e.target.value })
    }

    handleSem(e) {
        this.setState({ semester: e.target.value })
    }

    handleTech(e) {
        this.setState({ technology: e.target.value })
    }

    handleScope(e) {
        this.setState({ scope: e.target.value })
    }

    handleDesc(e) {
        this.setState({ description: e.target.value })
    }

    handleIndust(e) {
        this.setState({ industrial_link: e.target.value })
    }

    handleApp(e) {
        this.setState({ application: e.target.value })
    }

    handleStudID(e) {
        this.setState({ studID: e.target.value })
    }

    handleAsmName(e) {
        this.setState({ asmName: e.target.value })
    }

    handleCourseID(e) {
        this.setState({ courseID: e.target.value })
    }
    
    handleURL(e) {
        this.setState({url: e.target.value})
    }

    addPhoto() {
        if (this.state.url !== "") {
            alert("Successfully added photo")
            var item = this.state.url
            this.setState({tempPhoto: this.state.tempPhoto.concat(item)})
            this.setState({url: ""})
        } else {
            alert("Invalid input")
        }
    }

    saveProjects() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/projects'
        var method = this.state.addNew ? "post" : "put"
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                student: this.state.tempStudArr,
                assignment: this.state.tempAsmArr,
                course: this.state.tempCourse,
                name: this.state.name,
                semester: this.state.semester,
                technology: this.state.technology,
                scope: this.state.scope,
                description: this.state.description,
                industrial_link: this.state.industrial_link,
                application: this.state.application,
                photo: this.state.tempPhoto
            }),
        })
            .then(res => res.json())
            .then(json => this.fetchProjects())
    }

    deleteProject(projID) {
        if (confirm("Do you want to delete this project?")) {
            var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/projects'
            fetch(url + "/" + projID, {
                method: "delete",
            })
                .then(res => res.json())
                .then(json => this.fetchProjects())
        }
    }

    edit(name, sem, tech, scope, desc, indust, app, stud, asm, course, photos) {
        this.setState({
            tempStudArr: stud,
            tempAsmArr: asm,
            tempCourse: course,
            tempPhoto: photos,
            name: name,
            semester: sem,
            technology: tech,
            scope: scope,
            description: desc,
            industrial_link: indust,
            application: app,
            addNew: false
        })
    }

    removeStud(id) {
        if (confirm("Do you want to delete this student?")) {
            var filtered = this.state.tempStudArr.filter(function (value, index, arr) {
                return value.id !== id;
            })
            this.setState({ tempStudArr: filtered })
        }
    }

    removeAsm(name) {
        if (confirm("Do you want to delete this assignment?")) {
            var filtered = this.state.tempAsmArr.filter(function (value, index, arr) {
                return value.name !== name;
            })
            this.setState({ tempAsmArr: filtered })
        }
    }

    removeCourse(id) {
        if (confirm("Do you want to delete this course?")) {
            var filtered = this.state.tempCourse.filter(function (value, index, arr) {
                return value.id !== id;
            })
            this.setState({ tempCourse: filtered })
        }
    }

    render() {
        return (
            <Style className="container">
                <h2>Projects</h2>
                <table className="table">
                    <thead className="thead-dark text-center">
                        <tr>
                            <th>Project Name</th>
                            <th>Course</th>
                            <th>Semester</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {this.state.projects.map(p => {
                            if (p.course.length !== 0) {
                                return (
                                    <tr key={p._id}>
                                        <td>{p.name}</td>
                                        <td>{p.course[0].name}</td>
                                        <td>{p.semester}</td>
                                        <td>
                                            <button className="button-blue" type="button" data-toggle="modal" data-target="#addedit" onClick={this.edit.bind(this, p.name, p.semester, p.technology, p.scope, p.description, p.industrial_link, p.application, p.student, p.assignment, p.course, p.photo)}>Edit</button>
                                            <button className="button-red" onClick={this.deleteProject.bind(this, p._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={p._id}>
                                        <td>{p.name}</td>
                                        <td></td>
                                        <td>{p.semester}</td>
                                        <td>
                                            <button className="button-blue" type="button" data-toggle="modal" data-target="#addedit" onClick={this.edit.bind(this, p.name, p.semester, p.technology, p.scope, p.description, p.industrial_link, p.application, p.student, p.assignment, p.course)}>Edit</button>
                                            <button className="button-red" onClick={this.deleteProject.bind(this, p._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        }

                        )}
                    </tbody>
                </table>
                <Link to="/admin">
                    <button className="button-dark">Back</button>
                </Link>
                <button type="button" className="button-red" data-toggle="modal" data-target="#addedit" onClick={this.resetStates.bind(this)}>
                    Add Project
                </button>
                <div className="modal" id="addedit">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add/Edit Project</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="">Name</label>
                                        <input className="form-control" type="text" name="name" id="name" value={this.state.name} onChange={this.handleName.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Semester</label>
                                        <select className="form-control" type="text" name="sem" id="sem" value={this.state.semester} onChange={this.handleSem.bind(this)}>
                                            <option>2019-1</option>
                                            <option>2019-2</option>
                                            <option>2019-3</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Technology</label>
                                        <input className="form-control" type="text" name="tech" id="tech" value={this.state.technology} onChange={this.handleTech.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Scope</label>
                                        <select className="form-control" type="text" name="scope" id="scope" value={this.state.scope} onChange={this.handleScope.bind(this)}>
                                            <option>Internal</option>
                                            <option>External</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Link to industry</label>
                                        <input className="form-control" type="text" name="indust" id="indust" value={this.state.industrial_link} onChange={this.handleIndust.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Application</label>
                                        <select className="form-control" type="text" name="app" id="app" value={this.state.application} onChange={this.handleApp.bind(this)}>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Description</label>
                                        <textarea className="form-control" rows="15" name="desc" id="desc" value={this.state.description} onChange={this.handleDesc.bind(this)}></textarea>
                                    </div>
                                    <button className="button-dark" data-dismiss="modal" data-toggle="modal" data-target="#add2">Next</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="button-dark" data-dismiss="modal" onClick={this.resetStates.bind(this)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id="add2">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Students</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-group">
                                        <h3>Added students:</h3>
                                        {this.state.tempStudArr.map(s =>
                                            <div key={s.id}>
                                                <p>{s.id} | {s.name}</p>
                                                <button className="button-remove" onClick={this.removeStud.bind(this, s.id)}>Remove</button>
                                            </div>
                                        )}
                                        <label htmlFor="">Student's ID</label>
                                        <input className="form-control" type="text" name="studname" id="studname" value={this.state.studID} onChange={this.handleStudID.bind(this)} />
                                    </div>
                                    <button className="button-dark" data-dismiss="modal" data-toggle="modal" data-target="#addedit">Back</button>
                                    <button className="button-green" onClick={this.fetchAStudent.bind(this)} data-dismiss="modal" data-toggle="modal" data-target="#add2">Add student</button>
                                    <button className="button-dark" data-dismiss="modal" data-toggle="modal" data-target="#add3">Next</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="button-dark" data-dismiss="modal" onClick={this.resetStates.bind(this)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id="add3">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Assignments</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-group">
                                        <h3>Added assignments:</h3>
                                        {this.state.tempAsmArr.map(a =>
                                            <div key={a._id}>
                                                <p>{a.percentage} | {a.name}</p>
                                                <button className="button-remove" onClick={this.removeAsm.bind(this, a.name)}>Remove</button>
                                            </div>
                                        )}
                                        <label htmlFor="">Assignment's name</label>
                                        <input className="form-control" type="text" name="asmname" id="asmname" value={this.state.asmName} onChange={this.handleAsmName.bind(this)} />
                                    </div>
                                    <button className="button-dark" data-dismiss="modal" data-toggle="modal" data-target="#add2">Back</button>
                                    <button className="button-green" onClick={this.fetchAnAsm.bind(this)} data-dismiss="modal" data-toggle="modal" data-target="#add3" >Add assignment</button>
                                    <button className="button-dark" data-dismiss="modal" data-toggle="modal" data-target="#add4">Next</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="button-dark" data-dismiss="modal" onClick={this.resetStates.bind(this)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id="add4">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Course</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-group">
                                        <h3>Registered course:</h3>
                                        {this.state.tempCourse.map(c =>
                                            <div key={c.id}>
                                                <p>{c.id} | {c.name}</p>
                                                <button className="button-remove" onClick={this.removeCourse.bind(this, c.id)}>Remove</button>
                                            </div>
                                        )}
                                        <label htmlFor="">Course's ID</label>
                                        <input className="form-control" type="text" name="course" id="course" value={this.state.courseID} onChange={this.handleCourseID.bind(this)} />
                                    </div>
                                    <button className="button-dark" data-dismiss="modal" data-toggle="modal" data-target="#add3">Back</button>
                                    <button className="button-green" onClick={this.fetchACourse.bind(this)} data-dismiss="modal" data-toggle="modal" data-target="#add4" >Add course</button>
                                    <button className="button-red" onClick={this.saveProjects.bind(this)} >Save project</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="button-dark" data-dismiss="modal" onClick={this.resetStates.bind(this)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Style>
        )
    }
}

const Style = styled.div`
    h2 {
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 100px;
    }
    input {
        margin-bottom: 15px;
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
    .button-remove {
        background: #343a40;
        outline: none;
        border-style: none;
        color: white;
        padding: 3px 5px 3px 5px;
        border-radius: 5px;
        font-size: 15px;
    }
    .button-remove:hover {
        background: #17a2b8;
    }
    .button-blue {
        margin-right: 15px;
        background: #0275d8;
        outline: none;
        border-style: none;
        color: white;
        padding: 8px 15px 8px 15px;
        border-radius: 10px;
    }
    .button-blue:hover {
        background: #5bc0de;
    }
`