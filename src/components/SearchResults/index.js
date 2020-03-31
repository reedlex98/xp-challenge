import React from 'react'
import ResultsContainer from '../ResultsContainer'
import __ from 'lodash'
import './styles.css'

export default function SearchResults({ results, searchedTerm, isSearching, prevSearch }) {

    function genResultsContainer({ albums, artists, tracks }) {
        return <>
            {!__.isEmpty(albums) && <ResultsContainer resultObject={albums} title="Álbums" />}
            {!__.isEmpty(artists) && <ResultsContainer resultObject={artists} title="Artistas" />}
            {!__.isEmpty(tracks) && <ResultsContainer resultObject={tracks} title="Faixas" />}
        </>
    }

    return <div className="search-results">
        {
            isSearching
            ? <>
                <span className="results-label">
                    Resultados encontrados para "{searchedTerm}"
                </span>
                { genResultsContainer(results) }
            </>
            : <>
                {
                    prevSearch && <>
                        <span className="results-label">
                            Resultados buscados recentemente...
                        </span>
                        { genResultsContainer(prevSearch) }
                    </>
                }
            </>
        }

    </div>
}