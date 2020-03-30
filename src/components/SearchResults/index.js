import React from 'react'
import ResultsContainer from '../ResultsContainer'
import __ from 'lodash'
import './styles.css'

export default function SearchResults({ results, searchedTerm, isSearching }) {
    const { albums, artists, tracks } = results
    return <div className="search-results">
        {isSearching
            ? <>
                <span className="results-label">
                    Resultados encontrados para "{searchedTerm}"
                </span>
                {!__.isEmpty(albums) && <ResultsContainer resultObject={albums} title="Álbums" />}
                {!__.isEmpty(artists) && <ResultsContainer resultObject={artists} title="Artistas" />}
                {!__.isEmpty(tracks) && <ResultsContainer resultObject={tracks} title="Faixas" />}
            </>
            : <>
            </>}

    </div>
}