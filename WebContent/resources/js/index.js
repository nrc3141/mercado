 Vue.use(VeeValidate, {
     locale: 'pt_BR',
     dictionary: {
       pt_BR: { messages: messages_pt_BR }
     }
 });


 const router = new VueRouter({
   routes 
 })


 const app = new Vue({
     el:"#app",
     router,

     
 });


