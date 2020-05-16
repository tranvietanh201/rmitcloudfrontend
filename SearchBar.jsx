import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            suggestions: false,
            enter: false,
        }
    
    }

    handleSearch(e) {
        if (e.target.value !== "") {
            this.setState({search: e.target.value, suggestions: true})
        } else {
            this.setState({search: e.target.value, suggestions: false})
        }
    }

    renderSuggestions(list) {
        if (this.state.suggestions === false) {
            return null
        }
        return (
            <Search className="container">
            {list.map(item=> 
                <div key={item._id}>
                    <ul>
                        <Link className="link" to={`/projects/${item.name}`}>
                        <li onClick={() => this.selectSuggestion(item.name)} >{item.name}</li>
                        </Link>
                    </ul>
                </div>
            )}
            </Search>
        )
    }

    renderPageSuggestion(event) {
        if (event.key === "Enter") {
            return(
                <div>
                    hello
                </div>
            )
        }
    }

    selectSuggestion(value) {
        this.setState({search: value, suggestions: false})
    }

    render() {
        let items = this.props.projects
        let filteredItems = items.filter(item => {
            return String(item.name).toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })
        return (
            <div className="container">
            <form>
                <Input type="text" placeholder="Search" onKeyPress={this.renderPageSuggestion} value={this.state.search} onChange={this.handleSearch.bind(this)}></Input>
            </form>
            {this.renderSuggestions(filteredItems)}
            </div>
        )
    }
}

const Search = styled.div`
    z-index: 1;
    position: fixed;
    background: white;
    width: 848px;
    border: 1px solid grey;
    border-radius: 4px;
    li {
        color: black;
        list-style-type: none;
        margin-left: 0;
        padding-left: 0;
    }
    .link:hover {
        text-decoration-color: black;
    }
    ul {
        padding: 10px;
        margin: 0;
    }
`

const Input = styled.input`
    border: 1px solid grey;
    border-radius: 4px;
    outline: none;
    width: 100%;
    height: 40px;
    padding: 10px 10px
`
