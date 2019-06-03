class FabricanteService {
    
    constructor(){
        this.url = '/mercado/rs/fabricantes';
    }
    
    salvar(fabricante){
        return axios.post(this.url, fabricante);
            
    }
    
    listar(){
        return axios.get(this.url);
        
    }
    
    remover(id){
        return axios.delete(this.url + "/" + id);
    }
}