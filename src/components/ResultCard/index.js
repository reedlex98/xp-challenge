import React from 'react'
import './styles.css'
import {Link} from 'react-router-dom'
import { limitString } from '../../helpers'

const SPOTIFY_ICON_URL = "/src/assets/spotify-icons-logos/music_icon.png"

export default function ResultCard({ id, type, uri, name, artists, images }) {
    switch (type) {
        case 'artist':
            return <div className="result-card">
                <img src={images[1] ? images[1].url : SPOTIFY_ICON_URL} alt={`${name}-${type}`} />
                <span className="rc-title">{ limitString(name)}</span>
            </div>
        case 'album':
            return <div className="result-card">
                <Link to={`/albums/${id}`} >
                    <img src={images[1] ? images[1].url : SPOTIFY_ICON_URL} alt={`${name}-${type}`} />
                </Link>
                <Link to={`/albums/${id}`}>
                    <span className="rc-title">{ limitString(name)}</span>
                </Link>
                <span className="rc-details">{ limitString(artists.map(artists => artists.name).join(", "))}</span>
            </div>
        default:
            return <div className="result-card">
                <img src={SPOTIFY_ICON_URL} alt={`${name}-${type}`} />
                <span className="rc-title">{limitString(name)}</span>
                <span className="rc-details">{limitString(artists.map(artists => artists.name).join(", "))}</span>
            </div>
    }
}