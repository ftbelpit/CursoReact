const UserDetails = ({ nome, idade, profissao}) => {
  return (
    <div>
        <h2>Detalhes do usuário</h2>
        <ul>
            <li>Nome: {nome}</li>
            <li>Idade: {idade}</li>
            <li>Profissão: {profissao}</li>
        </ul>
            {idade >= 18 ? (
                <p>O usuário pode tirar carteira de habilitação</p>
            ) : (
                <p>O usuário não pode tirar carteira de habilitação</p>
            )}
    </div>
  )
}

export default UserDetails