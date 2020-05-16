import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'




export default class AdminCourses extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            id: "",
            name: "",
            addNew: false,
        }
    }

    fetchCourses() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/courses'
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ courses: json }))
    }

    componentDidMount() {
        this.fetchCourses()
    }

    resetStates() {
        this.setState({
            id: "",
            name: "",
            addNew: true
        })
    }

    handleID(e) {
        this.setState({id: e.target.value})
    }
    
    handleName(e) {
        this.setState({name: e.target.value})
    }

    edit(id, name) {
        this.setState({
            id: id,
            name: name,
            addNew: false
        })
    }

    
    delete(courseID) {
        if (confirm("Do you want to delete this course?")) {
            var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/courses'
            fetch(url + "/" + courseID, {
                method: "delete",
            })
            .then(res => json)
            .then(json => this.fetchCourses())
        }
    }

    save() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/courses'
        var method = this.state.addNew ? "post" : "put"
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
            }),
        })
            .then(res => res.json())
            .then(json => this.fetchCourses())
    }


    render() {
        return(
            <Style className="container">
                <h2>Courses</h2>
                <table className="table">
                    <thead className="thead-dark text-center">
                        <tr>
                            <th>Course Name</th>
                            <th>ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {this.state.courses.map(c => 
                            <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>{c.id}</td>
                                <td>
                                    <button type="button" data-toggle="modal" data-target="#addedit" onClick={this.edit.bind(this, c.id, c.name)} className="button-blue">Edit</button>
                                    <button onClick={this.delete.bind(this, c.id)} className="button-red">Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Link to="/admin">
                <button className="button-dark">Back</button>
                </Link>
                <button type="button" className="button-red" data-toggle="modal" data-target="#addedit" onClick={this.resetStates.bind(this)}>
                    Add Course
                </button>
                <div className="modal" id="addedit">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add/Edit Course</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="">ID</label>
                                        <input className="form-control" type="text" name="course" id="course" value={this.state.id} onChange={this.handleID.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Name</label>
                                        <input className="form-control" type="text" name="course" id="course" value={this.state.name} onChange={this.handleName.bind(this)} />
                                    </div>
                                    <button className="button-red" onClick={this.save.bind(this)} >Save course</button>
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