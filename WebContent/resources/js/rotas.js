var routes = [ {
    path : '/',
    component : listagemProduto,
    titulo : 'Início',
    name : 'inicio',
    menu : true
}, {
    path : '/produtos/cadastro',
    component : cadastroProduto,
    titulo : 'Cadastro de Produto',
    name : 'cadastro-produto',
    menu : true
}, {
    path : '/fabricantes',
    component : listagemFabricante,
    titulo : 'Fabricantes',
    name : 'lista-fabricantes',
    menu : true
}, {
    path : '/fabricantes/cadastro',
    component : cadastroFabricante,
    titulo : 'Cadastro de Fabricante',
    name : 'cadastro-fabricantes',
    menu : true
}, {
    path : '/fabricantes/cadastro/:id',
    component : cadastroFabricante,
    titulo : 'Cadastro de Fabricante',
    name : 'alteracao-fabricantes',
    menu : false
}, {
    path : '/produtos/cadastro/:id',
    component : cadastroProduto,
    titulo : 'Cadastro de Produto',
    name : 'alteracao-produto',
    menu : false
} ]
