class ProdutoService {
    
    constructor(){
        this.url = '/mercado/rs/produtos';
    }
    
    salvar(produto){
        
        produto.fabricante = { id: produto.fabricante };
        
        if(produto.id){
            return axios.put(this.url + '/' + produto.id, produto);
        }
        
        return axios.post(this.url, produto);
            
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