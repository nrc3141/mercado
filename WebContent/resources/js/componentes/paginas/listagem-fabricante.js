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
                  <button type="button" @click="remover(fabricante)" class="btn btn-danger">Remover</button>
                  <router-link :to="{name: 'alteracao-fabricantes', params: { id : fabricante.id } }" class="btn btn-warning">Alterar</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    data: function(){
        return {
            listaFabricantes: [],
            fabricanteService: null
        };
    },
    
    methods: {
        listarFabricantes: function (){
            this.fabricanteService.listar().then(response => {
                this.listaFabricantes = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        },
        
        remover: function (fabricante){
            
            let componente = this;
            
            this.fabricanteService.remover(fabricante.id).then(response => {
                let indice = componente.listaFabricantes.indexOf(fabricante);
                componente.listaFabricantes.splice(indice, 1);
            }).catch(function (error) {
                console.log(error);
            });;
            
        }
    },
    
    created: function (){
       this.fabricanteService = new FabricanteService();
       this.listarFabricantes();
    }
  });