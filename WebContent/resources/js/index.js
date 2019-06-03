 Vue.use(VeeValidate, {
     locale: 'pt_BR',
     dictionary: {
       pt_BR: { messages: messages_pt_BR }
     },
     events: ''
 });


 const router = new VueRouter({
   routes 
 })


 const app = new Vue({
     el:"#app",
     router,
     data:{
         mensagem: '',
         tipoMensagem: ''
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
     },
     
     methods: {
         mostrarMensagem: function (mensagem, tipo){
             this.mensagem = mensagem;
             this.tipoMensagem = tipo;
         },
         esconderMensagem: function(){
             this.mensagem = '';
         }
     }
     
 });


