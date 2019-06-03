

var cadastroFabricante = Vue.component('cadastro-fabricante', {
    fabricanteService: null,
    template: `
        <div class="col-9 col-xs-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto mt-5">
            
            <h4>Cadastro de Fabricante</h4>
            
            <form  @submit.prevent="salvar">
            
                <div class="alert alert-danger" v-if="errors.all().length">
                    <div v-for="error in errors.all()">* {{ error }}</div>
                </div>
                
                
                <div id="mensagem" class="alert alert-dismissible fade show" :class="classeMensagem" role="alert" v-if="mensagem">
                    {{ mensagem }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
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
            mensagem: '',
            tipoMensagem: 'info',
            fabricante: new Fabricante()
        };
    },
    methods: {
        salvar: function (){
            $("#mensagem").alert('close');
            let componente = this;
            
           
              this.$validator.validateAll()
                  .then(sucesso => { 
                      if(sucesso){
                          fabricanteService.salvar(this.fabricante)
                              .then(function (response) { 
                                  componente.fabricante = new Fabricante();
                                  componente.mostrarMensagem("Fabricante salvo com sucesso", "success");
                               })
                               .catch(function (error) {
                                   console.log(error); 
                               });
              
                      }else{ 
                          console.log('erro'); 
                      } 
                  });
        },
        
        mostrarMensagem: function (mensagem, tipo){
            this.mensagem = mensagem;
            this.tipoMensagem = tipo;
        }
    },
    
    created: function(){
        fabricanteService = new FabricanteService();
    },
    
    computed: {
        classeMensagem: function(){
            if(!this.tipoMensagem || this.tipoMensagem == 'info'){
                return "alert-danger";
            }
            
            if(this.tipoMensagem == 'success'){
                return "alert-success";
            }
            
            if(this.tipoMensagem == 'danger'){
                return "alert-danger";
            }
            
            if(this.tipoMensagem == 'warn'){
                return "alert-warn";
            }
        }
    }
  });