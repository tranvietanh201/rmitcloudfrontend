import React from 'react'
import Home from './Home.jsx'
import Admin from './Admin.jsx'
import ProjectPage from './ProjectPage.jsx'
import AdminProjects from './AdminProjects.jsx'
import AdminStudents from './AdminStudents.jsx'
import AdminCourses from './AdminCourses.jsx'
import AdminAssignments from './AdminAssignments.jsx'
import AdminUsers from './AdminUsers.jsx'
import {Link, Route, BrowserRouter, Switch} from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import styled from 'styled-components'

export default class App extends React.Component{

    constructor() {
        super()
        this.state = {
            projects: []
        }
    }
    
    fetchProjects() {
        var url = 'http://clouda2-env.eba-vfw86zcw.ap-southeast-1.elasticbeanstalk.com/projects'
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ projects: json}))
    }

    componentDidMount() {
        this.fetchProjects()
    }

    render(){
        return(
        <BrowserRouter>
        <PageContainer>
        <Header projects={this.state.projects}/>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/projects" component={AdminProjects} />
            <Route exact path="/students" component={AdminStudents} />
            <Route exact path="/courses" component={AdminCourses} />
            <Route exact path="/assignments" component={AdminAssignments} />
            <Route exact path="/users" component={AdminUsers} />
            <Route exact path="/:handle" component={ProjectPage} />
        </Switch>
        <Footer />
        </PageContainer>
        </BrowserRouter>
        )
    }
}

const PageContainer = styled.div`
    position: relative;
    min-height: 100vh;
`