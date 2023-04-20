// comentario de uma linha

import MyComponent from "./MyComponent"

const FirstComponent = () => {

    return (
        /* 
            comentario de multiplas linhas
        */

        <div>
            {/* comentário em jsx */}
            <h1>Meu primeiro componente</h1>
            <p className="teste">Meu texto</p>
            <MyComponent/>
        </div>
    )
}

export default FirstComponent