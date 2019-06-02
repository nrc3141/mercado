var cadastroProduto = Vue.component('listagem', {
    template: `
        <div class="col-9 col-xs-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto mt-5">
            
            <h4>Cadastro de Produto</h4>
            
            <p>{{mensagem}}</p>
            
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
                    :valor="produto.unidade" v-validate.continues="'required|max:5'" data-vv-name="Unidade">
                </input-text>
                
                <input-text label="Estoque: " id="estoque" v-model="produto.estoque" tipo="number"
                    :valor="produto.estoque" v-validate.continues="'required|min_value:0|decimal:0'" 
                    data-vv-name="Estoque">
                </input-text>
                
                <input type="submit" class="btn btn-primary" value="salvar"/>
                
            </form>
        </div>
    `,
    data: function (){
        return { 
            mensagem: '',
            produto: new Produto()
        };
    },
    methods: {
        salvar: function (){
            
            this.$validator.validateAll().then(sucesso => {
                if(sucesso){
                    console.log('sucesso');
                }else{
                    console.log('erro');
                }
            });
        }
    }
  });