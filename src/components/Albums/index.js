import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spotify from 'spotify-web-api-js'
import __ from 'lodash'
import { limitString, isTokenExpired } from '../../helpers'
import { cashResults } from '../../helpers/actions/actionCreators'
import Track from '../Track'
import './styles.css'

const spotifyWebApi = new Spotify()
const SPOTIFY_ICON_URL = "/src/assets/spotify-icons-logos/music_icon.png"

class Albums extends Component {
    constructor(props) {
        super(props)
        this.state = {
            album: null
        }
        this.onResult = this.onResult.bind(this)
    }

    onResult(err, results, localStorageKey, routeKey) {
        const { dispatch } = this.props
        if (err) {
            console.log(err)
        } else {
            dispatch(cashResults(localStorageKey, results, routeKey))
            this.setState({
                album: results
            })
        }
    }

    componentDidMount() {
        const { albumId } = this.props.match.params
        const { token, cachedResults } = this.props

        spotifyWebApi.setAccessToken(token.access_token)

        if (!__.isEmpty(cachedResults) && cachedResults[albumId]) {
            this.setState({ album: cachedResults[albumId] })
        }
        else {
            if (!isTokenExpired(token)) {
                spotifyWebApi.getAlbum(albumId, {}, (err, res) => this.onResult(err, res, albumId, '/albums'))
            }
            else {
                dispatch(unsetAuth())
            }
        }
    }

    render() {
        if (__.isEmpty(this.state.album)) {
            return <></>
        }
        const { images, name, type, artists, tracks } = this.state.album
        return <>
            <div className="album-container">
                <div className="album-thumbnail">
                    <img src={images[1] ? images[1].url : SPOTIFY_ICON_URL} alt={`${name}-${type}`} />
                    <span className="ab-title">{name}</span>
                    <span className="ab-detail">{limitString(artists.map(artists => artists.name).join(", "), 80)}</span>
                </div>
                <ol className="album-tracks">
                    {!__.isEmpty(tracks.items) && tracks.items.map(trackData => <Track key={trackData.id} {...trackData} />)}
                </ol>
            </div> 
            <div className="go-back">
                <Link to="/">
                    {"< Voltar"}
                </Link>
            </div>
        </>
    }
}

function mapStateToProps({ cachedResults, token }) {
    return {
        cachedResults,
        token
    }
}

export default connect(mapStateToProps)(Albums)

