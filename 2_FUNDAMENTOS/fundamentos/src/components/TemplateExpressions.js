const TemplateExpressions = () => {
    const nome = "Felipe"
    const data = {
        age: 31,
        job: "Programmer"
    }
    return(
        <div>
            <h1>Olá {nome}, tudo bem ?</h1>
            <p>Você atua como: {data.job}</p>
            <p>{4+4}</p>
            <p>{console.log("JSX React")}</p>
        </div>
    )
}
export default TemplateExpressions