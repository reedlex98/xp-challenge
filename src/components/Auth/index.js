import React, { Component } from 'react'
import './styles.css'
import { handleTokenRequest, getHashParams } from '../../helpers'
import { auth } from '../../helpers/actions/actionCreators'
import __ from 'lodash'
import { connect } from 'react-redux'
class Auth extends Component {
    componentDidMount() {
        const {dispatch, history} = this.props
        const hashParams = getHashParams()

        if (!__.isEmpty(hashParams)) {
            dispatch(auth(hashParams))
            history.push("/");
        }
    }

    render() {
        const {failToAuth} = this.props
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
}

function mapStateToProps({ failToAuth, isAuth }) {
    return {
        failToAuth,
        isAuth,
    }
}

export default connect(mapStateToProps)(Auth);