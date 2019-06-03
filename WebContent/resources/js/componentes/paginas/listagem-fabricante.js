var listagemFabricante = Vue.component('listagem-fabricante', {
    fabricanteService: null,
    template: `
      <div >
        <h4>Lista de Produtos</h4>
        <table class="table">
          <tr>
            <th>Nome</th>
            <th></th>
            <th></th>
          </tr>
          <tbody id="event-table" >
            <tr v-for="fabricante in listaFabricantes">
              <td>{{ fabricante.nome }}</td> 
              <td>
                  <button type="button" @click="remover(fabricante.id)" class="btn btn-danger">Remover</button>
                  <button type="button" @click="remover(fabricante.id)" class="btn btn-warning">Alterar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    data: function(){
        return {
            listaFabricantes: []
        };
    },
    
    methods: {
        listarProdutos: function (){
            fabricanteService.listar().then(response => {
                this.listaFabricantes = response.data;
            }).catch(function (error) {
                console.log(error);
            }).finally(function() {
            });
        },
        
        remover: function (id){
            fabricanteService.remover(id);
        }
    },
    
    created: function (){
       fabricanteService = new FabricanteService();
       this.listarProdutos();
    }
  });