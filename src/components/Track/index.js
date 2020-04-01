import React, {Component} from 'react'
import './styles.css'
import { convertMsToTimestamp } from '../../helpers'

class Track extends Component{
    constructor(props){
        super(props)
        this.state = {
            audioObject: this.props.preview_url && new Audio(this.props.preview_url),
            isPlaying: false
        }
        this.toggleSong = this.toggleSong.bind(this)
    }

    toggleSong(){
        if(this.state.audioObject){
            const {audioObject} = this.state
            if(audioObject.paused){
                audioObject.play()
            }else{
                audioObject.pause()
            }
            this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
        }
    }

    render(){
        const {name, duration_ms} = this.props
        const {isPlaying} = this.state
        const {toggleSong} = this
        return <li>
            <div className="track" onClick={toggleSong}>
                <span className={`track_name ${isPlaying ? "playing" : ""}`}>{name}</span>
                <span className="track_duration">{convertMsToTimestamp(parseInt(duration_ms))}</span>
            </div>
        </li>
    }

}

export default Track