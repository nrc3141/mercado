var cadastroProduto = Vue.component('cadastro-produto', {
    template: `
        <div class="col-9 col-xs-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto mt-5">
            
            <h4>Cadastro de Produto</h4>
            
            
            <form  @submit.prevent="salvar">
            
                <div class="alert alert-danger" v-if="errors.all().length">
                    <div v-for="error in errors.all()">* {{ error }}</div>
                </div>
                
                <input-text label="Nome: " id="nome" v-model="produto.nome" 
                    :valor="produto.nome" v-validate.continues="'required|max:30|alpha_spaces'" data-vv-name="Nome">
                </input-text>
                
                <input-text label="Volume: " id="volume" v-model="produto.volume"  tipo="number"
                    :valor="produto.volume" v-validate.continues="'required|min_value:0'" data-vv-name="Volume">
                </input-text>
                
                <input-text label="Unidade: " id="unidade" v-model="produto.unidade"
                    :valor="produto.unidade" v-validate.continues="'required|max:10'" data-vv-name="Volume" >
                </input-text>
                
                <input-select label="Fabricante: " id="fabricante" v-model="produto.fabricante" 
                    :valor="produto.fabricante" v-validate.continues="'required'" data-vv-name="Fabricante" 
                    :lista="listaFabricantes">
                </input-select>
                
                <input-text label="Estoque: " id="estoque" v-model="produto.estoque" tipo="number"
                    :valor="produto.estoque" v-validate.continues="'required|min_value:0|decimal:0'" 
                    data-vv-name="Estoque">
                </input-text>
                
                <input type="submit" class="btn btn-primary" value="Salvar"/>
                
            </form>
        </div>
    `,
    data: function (){
        return { 
            produto: new Produto(),
            listaFabricantes: [],
            fabricanteService: null,
            produtoService: null,
            id: this.$route.params.id
        };
    },
    methods: {
        salvar: function (){
            
            let componente = this;
            
            this.$validator.validateAll().then(sucesso => {
                if(sucesso){
                     this.produtoService.salvar(componente.produto)
                        .then(function (response) { 
                            componente.$root.mostrarMensagem("Produto salvo com sucesso", "success");
                            componente.$router.push({name: 'inicio'});  
                     })
                     .catch(function (error) {
                         console.log(error);
                         componente.$root.mostrarMensagem(error.response.data, "danger"); 
                     });
                }else{
                    console.log('erro');
                }
            });
        }
    },
    created: function (){
        
        let componente = this;
        
        this.fabricanteService = new FabricanteService();
        this.produtoService = new ProdutoService();
        this.fabricanteService.listar().then(response => {
            this.listaFabricantes = response.data
                .map(function(fabricante){
                    return {valor: fabricante.id, texto: fabricante.nome};
                });
        }).catch(function (error) {
            console.log(error);
        });
        
        if(this.id){
            this.produtoService.buscar(this.id)
                .then(response => {
                    componente.produto = response.data;
                    componente.produto.fabricante = componente.produto.fabricante.id;
                })
                .catch(error => {
                    componente.$root.mostrarMensagem(error.response.data, "danger"); 
                });
        }
     }
  });