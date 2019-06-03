package com.hepta.mercado.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.hepta.mercado.entity.Fabricante;
import com.hepta.mercado.persistence.FabricanteDAO;

@Path("fabricantes")
public class FabricanteService {

    @Context
    private HttpServletRequest request;

    @Context
    private HttpServletResponse response;

    private FabricanteDAO dao;

    public FabricanteService() {
	dao = new FabricanteDAO();
    }

    protected void setRequest(HttpServletRequest request) {
	this.request = request;
    }

    /**
     * Adiciona novo fabricante
     * 
     * @param fabricante: Novo fabricante
     * @return response 201 (Created) - Conseguiu adicionar
     */
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response fabricanteCreate(Fabricante fabricante) {

	try {

	    List<Fabricante> outrosFabricantesMesmoNome = dao.procurarOutrosFabricanteMesmoNome(fabricante.getId(),
		    fabricante.getNome());

	    if (outrosFabricantesMesmoNome.isEmpty()) {
		dao.save(fabricante);
		return Response.status(Status.CREATED).build();
	    } else {
		return Response.status(Status.BAD_REQUEST).entity("Já existe outro fabricante com este nome").build();
	    }

	} catch (Exception e) {
	    return Response.status(Status.INTERNAL_SERVER_ERROR).build();
	}

    }

    /**
     * Lista todos os fabricantes
     * 
     * @return response 200 (OK) - Conseguiu listar
     */
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response fabricanteRead() {
	List<Fabricante> fabricantes = new ArrayList<>();
	try {
	    fabricantes = dao.getAll();
	} catch (Exception e) {
	    return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao buscar fabricantes").build();
	}

	GenericEntity<List<Fabricante>> entity = new GenericEntity<List<Fabricante>>(fabricantes) {
	};
	return Response.status(Status.OK).entity(entity).build();
    }

    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response fabricanteReadOne(@PathParam("id") Integer id) {
	try {
	    Fabricante fabricante = dao.find(id);
	    return Response.status(Status.OK).entity(fabricante).build();
	} catch (Exception e) {
	    e.printStackTrace();
	    return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao tentar buscar um fabricante").build();
	}
    }

    /**
     * Atualiza um fabricante
     * 
     * @param id:         id do fabricante
     * @param fabricante: Fabricante atualizado
     * @return response 200 (OK) - Conseguiu atualiza
     */
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @PUT
    public Response fabricanteUpdate(@PathParam("id") Integer id, Fabricante fabricante) {
	try {
	    Fabricante noBanco = dao.find(id);
	    noBanco.setNome(fabricante.getNome());
	    dao.update(noBanco);
	    return Response.status(Status.OK).build();
	} catch (Exception e) {
	    e.printStackTrace();
	    return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao tentar atualizar um fabricante")
		    .build();
	}
    }

    /**
     * Remove um fabricante
     * 
     * @param id: id do fabricante
     * @return response 200 (OK) - Conseguiu remover
     */
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @DELETE
    public Response fabricanteDelete(@PathParam("id") Integer id) {
	try {
	    dao.delete(id);
	    return Response.status(Status.OK).build();
	} catch (Exception e) {
	    e.printStackTrace();
	    return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao tentar remover fabricante").build();
	}
    }

}
