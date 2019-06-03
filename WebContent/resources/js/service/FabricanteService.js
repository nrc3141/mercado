class FabricanteService {
    
    constructor(){
        this.url = '/mercado/rs/fabricantes';
    }
    
    salvar(fabricante){
        
        if(fabricante.id){
            return axios.put(this.url + '/' + fabricante.id, fabricante);
        }
        
        return axios.post(this.url, fabricante);
            
    }
    
    listar(){
        return axios.get(this.url);
        
    }
    
    remover(id){
        return axios.delete(this.url + "/" + id);
    }
    
    buscar(id){
        return axios.get(this.url + "/" + id);
    }
}