import React from 'react'
import './styles.css'

const SPOTIFY_ICON_URL = "/src/assets/spotify-icons-logos/music_icon.png"
const MAX_CHAR = 20;

function limitString(str, charLimit ) {
    return str.length > charLimit ? str.slice(0,charLimit) + '...' : str
}

export default function ResultCard({ id, type, uri, name, artists, images }) {
    switch (type) {
        case 'artist':
            return <div className="result-card">
                <img src={images[1] ? images[1].url : SPOTIFY_ICON_URL} alt={`${name}-${type}`} />
                <span className="rc-title">{ limitString(name, MAX_CHAR)}</span>
            </div>
        case 'album':
            return <div className="result-card">
                <img src={images[1] ? images[1].url : SPOTIFY_ICON_URL} alt={`${name}-${type}`} />
                <span className="rc-title">{ limitString(name, MAX_CHAR)}</span>
                <span className="rc-details">{ limitString(artists.map(artists => artists.name).join(", "), MAX_CHAR)}</span>
            </div>
        default:
            return <div className="result-card">
                <img src={SPOTIFY_ICON_URL} alt={`${name}-${type}`} />
                <span className="rc-title">{limitString(name, MAX_CHAR)}</span>
                <span className="rc-details">{limitString(artists.map(artists => artists.name).join(", "), MAX_CHAR)}</span>
            </div>
    }
}