import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


export default class AdminUsers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            id: "",
            fullName: "",
            username: "",
            password: "",
            email: "",
            addNew: false,
        }
    }

    fetchUsers() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/users'
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ users: json }))
    }

    componentDidMount() {
        this.fetchUsers()
    }

    handleName(e) {
        this.setState({fullName: e.target.value})
    }

    handleUsername(e) {
        this.setState({username: e.target.value})
    }

    handleID(e) {
        this.setState({id: e.target.value})
    }

    handleEmail(e) {
        this.setState({email: e.target.value})
    }

    handlePass(e) {
        this.setState({password: e.target.value})
    }

    
    resetStates() {
        this.setState({
            id: "",
            fullName: "",
            username: "",
            password: "",
            email: "",
            addNew: true,
        })
    }

    edit(id, name, usname, pass, email) {
        this.setState({
            id: id,
            fullName: name,
            username: usname,
            password: pass,
            email: email,
            addNew: false,
        })
    }

    delete(userID) {
        if (confirm("Do you want to delete this user?")) {
            var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/users'
            fetch(url + "/" + userID, {
                method: "delete",
            })
            .then(res => json)
            .then(json => this.fetchUsers())
        }
    }

    save() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/users'
        var method = this.state.addNew ? "post" : "put"
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                id: this.state.id,
                fullname: this.state.fullName,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }),
        })
            .then(res => res.json())
            .then(json => this.fetchUsers())
    }

    render() {
        return(
            <Style className="container">
                <h2>Users</h2>
                <table className="table">
                    <thead className="thead-dark text-center">
                        <tr>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {this.state.users.map(u => 
                            <tr key={u.id}>
                                <td>{u.fullname}</td>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>
                                    <button type="button" data-toggle="modal" data-target="#addedit" onClick={this.edit.bind(this, u.id, u.fullname, u.username, u.password, u.email)} className="button-blue">Edit</button>
                                    <button onClick={this.delete.bind(this, u.id)} className="button-red">Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Link to="/admin">
                <button className="button-dark">Back</button>
                </Link>
                <button type="button" className="button-red" data-toggle="modal" data-target="#addedit" onClick={this.resetStates.bind(this)}>
                    Add User
                </button>
                <div className="modal" id="addedit">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add/Edit User</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="">ID</label>
                                        <input className="form-control" type="text" name="id" id="id" value={this.state.id} onChange={this.handleID.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Full Name</label>
                                        <input className="form-control" type="text" name="name" id="name" value={this.state.fullName} onChange={this.handleName.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Username</label>
                                        <input className="form-control" type="text" name="username" id="username" value={this.state.username} onChange={this.handleUsername.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Email</label>
                                        <input className="form-control" type="text" name="email" id="email" value={this.state.email} onChange={this.handleEmail.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Password</label>
                                        <input className="form-control" type="text" name="pass" id="pass" value={this.state.password} onChange={this.handlePass.bind(this)} />
                                    </div>
                                    <button className="button-red" onClick={this.save.bind(this)} >Save user</button>
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