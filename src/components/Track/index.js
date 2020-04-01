import React from 'react'
import './styles.css'
import { convertMsToTimestamp } from '../../helpers'

const Track = ({ name, duration_ms }) => (
    <li className="track">
        <span className="track_name">{name}</span>
        <span className="track_duration">{convertMsToTimestamp(parseInt(duration_ms))}</span>
    </li>
)

export default Track