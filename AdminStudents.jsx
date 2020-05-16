import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


export default class AdminStudents extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            students: [],
            id: "",
            name: "",
            year: "1st",
            addNew: false
        }
    }

    fetchStudents() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/students'
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ students: json }))
    }

    componentDidMount() {
        this.fetchStudents()
    }

    handleID(e) {
        this.setState({id: e.target.value})
    }
    
    handleName(e) {
        this.setState({name: e.target.value})
    }

    handleYear(e) {
        this.setState({year: e.target.value})
    }

    resetStates() {
        this.setState({
            id: "",
            name: "",
            year: "1st",
            addNew: true
        })
    }

    delete(studentID) {
        if (confirm("Do you want to delete this student?")) {
            var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/students'
            fetch(url + "/" + studentID, {
                method: "delete",
            })
            .then(res => json)
            .then(json => this.fetchStudents())
        }
    }

    edit(id, name, year) {
        this.setState({
            id: id,
            name: name,
            year: year,
            addNew: false
        })
    }

    save() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/students'
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
                year: this.state.year
            }),
        })
            .then(res => res.json())
            .then(json => this.fetchStudents())
    }


    render() {
        return(
            <Style className="container">
                <h2>Students</h2>
                <table className="table">
                    <thead className="thead-dark text-center">
                        <tr>
                            <th>Student Name</th>
                            <th>ID</th>
                            <th>Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {this.state.students.map(s => 
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                <td>{s.id}</td>
                                <td>{s.year}</td>
                                <td>
                                    <button type="button" data-toggle="modal" data-target="#addedit" onClick={this.edit.bind(this, s.id, s.name, s.year)} className="button-blue">Edit</button>
                                    <button onClick={this.delete.bind(this, s.id)} className="button-red">Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Link to="/admin">
                <button className="button-dark">Back</button>
                </Link>
                <button type="button" className="button-red" data-toggle="modal" data-target="#addedit" onClick={this.resetStates.bind(this)}>
                    Add Student
                </button>
                <div className="modal" id="addedit">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add/Edit Student</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="">ID</label>
                                        <input className="form-control" type="text" name="id" id="id" value={this.state.id} onChange={this.handleID.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Name</label>
                                        <input className="form-control" type="text" name="name" id="name" value={this.state.name} onChange={this.handleName.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Year</label>
                                        <select className="form-control" type="text" name="year" id="year" value={this.state.year} onChange={this.handleYear.bind(this)}>
                                        <option>1st</option>
                                        <option>2nd</option>
                                        <option>3rd</option>
                                        </select>
                                    </div>
                                    <button className="button-red" onClick={this.save.bind(this)} >Save student</button>
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