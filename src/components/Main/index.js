import React, { Component } from 'react'
import { isTokenExpired } from '../../helpers/index'
import './styles.css'
import SearchForm from '../SearchForm'
import SearchResults from '../SearchResults'
import Spotify from 'spotify-web-api-js'
import { connect } from 'react-redux'
import { cashResults, unsetAuth } from '../../helpers/actions/actionCreators'

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

    onResult(err, results, localStorageKey, routeKey) {
        const { dispatch } = this.props
        if (err) {
            console.log(err)
        } else {
            dispatch(cashResults(localStorageKey, results, routeKey))
            this.setState({
                results,
                isSearching: true
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault()

        const { search } = this.state
        const { cachedResults, token, dispatch } = this.props

        if (cachedResults && cachedResults[search]) {
            this.setState({
                results: cachedResults[search],
                isSearching: true
            })
        }
        else {
            if (!isTokenExpired(token)) {
                spotifyWebApi.search(search, ['album,artist,track'], { limit: 30 }, (err, res) => this.onResult(err, res, search, '/search'))
            }
            else{
                dispatch(unsetAuth())
            }  
        }

    }

    render() {
        const { search, isSearching, results } = this.state
        const { handleSubmit, handleChange } = this
        const { cachedResults } = this.props

        return <>
            <SearchForm handleChange={handleChange} handleSubmit={handleSubmit} searchValue={search} />
            <SearchResults searchedTerm={search} isSearching={isSearching} results={results} prevSearch={cachedResults['/search'] && Object.values(cachedResults['/search'])[Object.values(cachedResults['/search']).length - 1]} />
        </>
    }
}

function mapStateToProps({ cachedResults, token }) {
    return {
        cachedResults,
        token
    }
}

export default connect(mapStateToProps)(Main);