import React from 'react'
import ResultCard from '../ResultCard'
import './styles.css'

export default function ResultsContainer({ title, resultObject }) {
    return <div className="results-container">
        <span className="results-label">
            {title}
        </span>
        <div className="results-card-container">
            {resultObject.items.map(item => <ResultCard key={item.id} {...item} />)}
        </div>
    </div>

}