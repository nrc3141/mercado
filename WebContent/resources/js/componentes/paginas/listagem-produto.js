var listagemProduto = Vue.component('listagem', {
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
            listaProdutos: []
        };
    }
  });