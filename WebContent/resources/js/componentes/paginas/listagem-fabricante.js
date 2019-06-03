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
              <td><span @click="">&#9998;</span>
                <span  @click="">&#10006;</span>
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
        }
    },
    
    created: function (){
       fabricanteService = new FabricanteService();
       this.listarProdutos();
    }
  });