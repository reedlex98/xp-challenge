Desafio XP-Investimentos
=======================

## Visão geral

Aplicação Web Front-End que consome dados da API do Spotify. É possivel pesquisar por álbums, músicas e artistas e ouvir um pequeno preview das músicas de um determinado álbum. [Mais informações sobre esse desafio][4]

## Instruções para desenvolvedores

È necessario criar e configurar um arquivo .env no diretório raiz do projeto. O arquivo .env_example contém o modelo das variáveis de ambiente que deverão estar contidas no arquivo .env que deverá ser criado. 
Devido ao fato desta aplicação fazer requisições a [API do Spotify][2], é necessário que você crie uma nova aplicação no seu [dashboard do Spotify Developer][1] para obter o seu Client ID, que será utilizado por essa aplicação

### Preenchimento do arquivo .env

Estrutura:

    CLIENT_ID=
    REDIRECT_URI=

Preencha a variável CLIENT_ID com o seu client_id gerado pelo spotify, [nesse endereço][1] (é necessário ter cadastro).
Preencha REDIRECT_URI com o endereço da aplicação, no caso esse endereço deve estar presente na lista de redirect_uri presente no [dashboard][3] da sua aplicação. Essa variável será utilizada no momento da autenticação

### Executando a aplicação

Após criar o arquivo .env e seguir as instruções acima para fazer o seu preenchimento. Execute a aplicação com `npm install && npm start`

[1]: https://developer.spotify.com/dashboard/login
[2]: https://developer.spotify.com/documentation/web-api/
[3]: https://developer.spotify.com/dashboard/applications/
[4]: https://github.com/grupo-xp/challenge/tree/master/react