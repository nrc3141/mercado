class FabricanteService {
    
    constructor(){
        this.url = '/mercado/rs/fabricantes';
    }
    
    salvar(fabricante){
        axios.post(this.url, fabricante)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    listar(){
        return axios.get(this.url);
        
    }
}