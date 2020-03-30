import React from 'react'
import './styles.css'

export default function Auth({ handleTokenRequest, failToAuth }) {
    return <div className="auth-screen">
        <h1>Front-End React Desafio</h1>
        {failToAuth && <div className="fail">Ocorreu um problema na autenticação, tente novamente em outro momento... </div>}
        <p>
            Para que possamos fazer as requisições a API do Spotify e acessar o conteúdo disponível nela, necessitamos de um token válido. Portanto, clique no botão abaixo para gerar o seu token
                </p>
        <button className="spotify-button" onClick={handleTokenRequest}>
            Gerar Token
                </button>
    </div>
}