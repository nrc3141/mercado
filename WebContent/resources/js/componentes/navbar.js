var listagemProduto = Vue.component('navbar', {
    template: `
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Mercadinho</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li v-for="rota of rotas" class="nav-item">
                        <router-link :to="rota.path" class="nav-link">{{ rota.titulo }} </router-link>
                    </li>
                </ul>
            </div>
     </nav>
    `,
     data: function(){
         return {  rotas: routes.filter(rota => rota.menu) };
     }
  });