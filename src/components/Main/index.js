import React, { Component } from 'react'
import { isTokenExpired } from '../../helpers/index'
import './styles.css'
import SearchForm from '../SearchForm'
import SearchResults from '../SearchResults'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            results: [],
            isSearching: false,
            cachedResults: localStorage.getItem("cachedResults") && JSON.parse(localStorage.getItem("cachedResults")),
            hasCachedData: !!localStorage.getItem("cachedResults")
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onResult = this.onResult.bind(this)
    }

    componentDidMount() {
        const { token } = this.props
        spotifyWebApi.setAccessToken(token.value)
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value,
            isSearching: false
        })
    }

    onResult(err, results, search, cachedResults) {
        if (err) {
            console.log(err)
        } else {
            if (cachedResults) {
                cachedResults = JSON.parse(cachedResults)
                cachedResults[search] = results
            }
            else {
                cachedResults = {
                    [search]: results
                }
            }
            cachedResults = JSON.stringify(cachedResults)
            localStorage.setItem("cachedResults", cachedResults)
            this.setState({
                results,
                isSearching: true
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault()

        const { search } = this.state

        let cachedResults = localStorage.getItem('cachedResults')

        if (cachedResults && JSON.parse(cachedResults)[search]) {
            this.setState({
                results: JSON.parse(cachedResults)[search],
                isSearching: true
            })
        }
        else {
            spotifyWebApi.search(this.state.search, ['album,artist,track'], { limit: 10 }, (err,res) => this.onResult(err, res, search, cachedResults) )
        }

    }

    render() {
        return <>
            <SearchForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} searchValue={this.state.search} />
            <SearchResults searchedTerm={this.state.search} isSearching={this.state.isSearching} results={this.state.results}/>
        </>
    }
}