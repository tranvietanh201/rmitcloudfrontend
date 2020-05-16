import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


export default class AdminAssignments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            name: "",
            description: "",
            percentage: "",
            addNew: false
        }
    }

    fetchAsm() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/assignments'
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ assignments: json }))
    }

    componentDidMount() {
        this.fetchAsm()
    }

    handlePercent(e) {
        this.setState({percentage: e.target.value})
    }
    
    handleName(e) {
        this.setState({name: e.target.value})
    }

    handleDesc(e) {
        this.setState({description: e.target.value})
    }


    resetStates() {
        this.setState({
            name: "",
            description: "",
            percentage: "",
            addNew: true
        })
    }

    edit(name, percent, desc) {
        this.setState({
            name: name,
            percentage: percent,
            description: desc,
            addNew: false
        })
    }

    save() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/assignments'
        var method = this.state.addNew ? "post" : "put"
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                percentage: this.state.percentage
            }),
        })
            .then(res => res.json())
            .then(json => this.fetchAsm())
    }

    delete(asmID) {
        if (confirm("Do you want to delete this assignment?")) {
            var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/assignments'
            fetch(url + "/" + asmID, {
                method: "delete",
            })
            .then(res => json)
            .then(json => this.fetchAsm())
        }
    }
    
    render() {
        return(
            <Style className="container">
                <h2>Assignments</h2>
                <table className="table">
                    <thead className="thead-dark text-center">
                        <tr>
                            <th>Assignment Name</th>
                            <th>Percentage</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {this.state.assignments.map(a => 
                            <tr key={a._id}>
                                <td>{a.name}</td>
                                <td>{a.percentage}</td>
                                <td>{a.description}</td>
                                <td>
                                    <button type="button" data-toggle="modal" data-target="#addedit" onClick={this.edit.bind(this, a.name, a.percentage, a.description)} className="button-blue">Edit</button>
                                    <button onClick={this.delete.bind(this, a._id)} className="button-red">Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Link to="/admin">
                <button className="button-dark">Back</button>
                </Link>
                <button type="button" className="button-red" data-toggle="modal" data-target="#addedit" onClick={this.resetStates.bind(this)}>
                    Add Assignment
                </button>
                <div className="modal" id="addedit">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add/Edit Assignment</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="">Name</label>
                                        <input className="form-control" type="text" name="name" id="name" value={this.state.name} onChange={this.handleName.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Percentage</label>
                                        <input className="form-control" type="text" name="percent" id="percent" value={this.state.percentage} onChange={this.handlePercent.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Description</label>
                                        <textarea className="form-control" rows="15" name="desc" id="desc" value={this.state.description} onChange={this.handleDesc.bind(this)}></textarea>
                                    </div>
                                    <button className="button-red" onClick={this.save.bind(this)} >Save assignment</button>
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