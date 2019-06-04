var listagemProduto = Vue.component('listagem-produto', {
    template: `
      <div >
        <h4>Lista de Produtos</h4>
        <table class="table">
          <tr>
            <th>Nome</th>
            <th>Fabricante</th>
            <th>Volume</th>
            <th>Unidade</th>
            <th>Estoque</th>
            <th></th>
            <th></th>
          </tr>
          <tbody id="event-table" >
            <tr v-for="produto in listaProdutos">
              <td>{{ produto.nome }}</td> 
              <td>{{ produto.fabricante.nome }}</td> 
              <td>{{ produto.volume }}</td> 
              <td>{{ produto.unidade }}</td> 
              <td>{{ produto.estoque }}</td>
              <td>
                  <button type="button" @click="remover(produto)" class="btn btn-danger">Remover</button>
                  <router-link :to="{name : 'alteracao-produto', params: { id : produto.id } }" class="btn btn-warning">Alterar</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    data: function(){
        return {
            listaProdutos: [],
            produtoService: null
        };
    },
    methods: {
        listarProdutos: function (){
            this.produtoService.listar().then(response => {
                this.listaProdutos = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        },
        
        remover: function (produto){
            
            let componente = this;
            
            this.produtoService.remover(produto.id).then(response => {
                let indice = componente.listaProdutos.indexOf(produto);
                componente.listaProdutos.splice(indice, 1);
            }).catch(function (error) {
                console.log(error);
            });
        }
    },
    
    created: function (){
       this.produtoService = new ProdutoService();
       this.listarProdutos();
    }
  });