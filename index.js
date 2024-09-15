const { select, input, checkbox } = require('@inquirer/prompts') //Importando módulo - biblioteca inquirer para criar prompts interativos

let meta = {
    value: "Tomar 3l de água por dia",
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta:"})

    if(meta.length == 0) {
        console.log("A meta não pode ser vazia.")
        return
    }

    metas.push(
        {value: meta, checked: false}
    )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para selecionar ou para marcar/desmarcar e o Enter para finalizar essa etapa.",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada.")
        return
    }

    //Validação da meta
    respostas.forEach((resposta) =>{
        const meta = metas.find((m) =>{
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) concluída(s)")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log("Não existem metas realizadas! :(")
        return
    }

    await select({
        message: `Metas Realizadas ${realizadas.length}`,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        console.log("Não existem metas abertas! :)")
        return
    }

    await select({
        message: `Metas abertas ${abertas.length}`,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itensADeletar = await checkbox({
        message: "Selecione o item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itensADeletar.length == 0) {
        console.log("Nenhum item para deletar!")
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("Meta(s) deletada(s) com sucesso!")
}

const start = async () => {

    while(true){
    
        const opcao = await select({
            message: "Menu >",
            choices: [ 
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }

        ]
    })

    
        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }
    }
}

start()