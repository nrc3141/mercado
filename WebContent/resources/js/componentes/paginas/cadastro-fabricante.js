

var cadastroFabricante = Vue.component('cadastro-fabricante', {
    fabricanteService: null,
    template: `
        <div class="col-9 col-xs-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto mt-5">
            
            <h4>Cadastro de Fabricante</h4>
            
            <form  @submit.prevent="salvar">
            
                <div class="alert alert-danger" v-if="errors.all().length">
                    <div v-for="error in errors.all()">* {{ error }}</div>
                </div>
                
                
                <input-text label="Nome: " id="nome" v-model="fabricante.nome" :valor="fabricante.nome" 
                    v-validate.continues="'required|max:30|alpha_spaces'" data-vv-name="Nome">
                 </input-text>
                                
                <input type="submit" class="btn btn-primary" value="salvar"/>
                
            </form>
        </div>
    `,
    data: function (){
        return { 
            tipoMensagem: 'info',
            fabricante: new Fabricante(),
            id: this.$route.params.id
        };
    },
    methods: {
        salvar: function (){
            
            
            let componente = this;
            componente.$root.esconderMensagem();
           
            this.$validator.validateAll()
                  .then(sucesso => { 
                      if(sucesso){
                          fabricanteService.salvar(componente.fabricante)
                              .then(function (response) { 
                                  componente.fabricante = new Fabricante();
                                  componente.$root.mostrarMensagem("Fabricante salvo com sucesso", "success");
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
    
    created: function(){
        fabricanteService = new FabricanteService();
        
        if(this.id){
            alert(this.id);
        }
    },
    
    
  });