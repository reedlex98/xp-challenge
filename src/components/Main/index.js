import React, { Component } from 'react'
import { isTokenExpired } from '../../helpers/index'
import './styles.css'
import SearchForm from '../SearchForm'
import SearchResults from '../SearchResults'
import Spotify from 'spotify-web-api-js'
import { connect } from 'react-redux'
import { cashResults } from '../../actions/actionCreators'

const spotifyWebApi = new Spotify()

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: "",
            results: [],
            isSearching: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onResult = this.onResult.bind(this)
    }

    componentDidMount() {
        const { token } = this.props
        spotifyWebApi.setAccessToken(token.access_token)
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value,
            isSearching: false
        })
    }

    onResult(err, results, localStorageKey) {
        const { dispatch } = this.props
        if (err) {
            console.log(err)
        } else {
            dispatch(cashResults(localStorageKey, results))
            this.setState({
                results,
                isSearching: true
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault()

        const { search } = this.state
        const { cachedResults } = this.props

        if (cachedResults && cachedResults[search]) {
            this.setState({
                results: cachedResults[search],
                isSearching: true
            })
        }
        else {
            spotifyWebApi.search(search, ['album,artist,track'], { limit: 10 }, (err, res) => this.onResult(err, res, search))
        }

    }

    render() {
        const { search, isSearching, results } = this.state
        const { handleSubmit, handleChange } =  this
        const { cachedResults } = this.props
        
        return <>
            <SearchForm handleChange={handleChange} handleSubmit={handleSubmit} searchValue={search} />
            <SearchResults searchedTerm={search} isSearching={isSearching} results={results} prevSearch={cachedResults && Object.values(cachedResults)[Object.values(cachedResults).length - 1]} />
        </>
    }
}

function mapStateToProps({ cachedResults }) {
    return {
        cachedResults
    }
}

export default connect(mapStateToProps)(Main);