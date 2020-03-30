import React from 'react'
import './styles.css'

export default function SearchForm({handleChange, searchValue, handleSubmit}) {
    return <form className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="search">Busque por artistas, álbums ou músicas</label>
        <input name="search" type="text" onChange={handleChange} value={searchValue} placeholder="Comece a escrever..."/>
    </form>
}