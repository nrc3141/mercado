package com.hepta.mercado.persistence;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;

import com.hepta.mercado.entity.Fabricante;

public class FabricanteDAO {

    public void save(Fabricante fabricante) throws Exception {
	EntityManager em = HibernateUtil.getEntityManager();
	try {
	    em.getTransaction().begin();
	    em.persist(fabricante);
	    em.getTransaction().commit();
	} catch (Exception e) {
	    em.getTransaction().rollback();
	    throw new Exception(e);
	} finally {
	    em.close();
	}
    }

    public Fabricante update(Fabricante fabricante) throws Exception {
	EntityManager em = HibernateUtil.getEntityManager();
	Fabricante fabricanteAtualizado = null;
	try {
	    em.getTransaction().begin();
	    fabricanteAtualizado = em.merge(fabricante);
	    em.getTransaction().commit();
	} catch (Exception e) {
	    em.getTransaction().rollback();
	    throw new Exception(e);
	} finally {
	    em.close();
	}
	return fabricanteAtualizado;
    }

    public void delete(Integer id) throws Exception {
	EntityManager em = HibernateUtil.getEntityManager();
	try {
	    em.getTransaction().begin();
	    Fabricante fabricante = em.find(Fabricante.class, id);
	    em.remove(fabricante);
	    em.getTransaction().commit();
	} catch (Exception e) {
	    e.printStackTrace();
	    em.getTransaction().rollback();
	    throw new Exception(e);
	} finally {
	    em.close();
	}

    }

    public Fabricante find(Integer id) throws Exception {
	EntityManager em = HibernateUtil.getEntityManager();
	Fabricante fabricante = null;
	try {
	    fabricante = em.find(Fabricante.class, id);
	} catch (Exception e) {
	    em.getTransaction().rollback();
	    throw new Exception(e);
	} finally {
	    em.close();
	}
	return fabricante;
    }

    @SuppressWarnings("unchecked")
    public List<Fabricante> getAll() throws Exception {
	EntityManager em = HibernateUtil.getEntityManager();
	List<Fabricante> fabricantes = new ArrayList<>();
	try {
	    Query query = em.createQuery("FROM Fabricante");
	    fabricantes = query.getResultList();
	} catch (Exception e) {
	    em.getTransaction().rollback();
	    throw new Exception(e);
	} finally {
	    em.close();
	}
	return fabricantes;
    }

    @SuppressWarnings("unchecked")
    public List<Fabricante> procurarOutrosFabricanteMesmoNome(Integer id, String nome) throws Exception {
	EntityManager em = HibernateUtil.getEntityManager();
	try {
	    Query query = em.createQuery("FROM Fabricante WHERE nome = :nome AND id != :id");
	    query.setParameter("nome", nome);
	    query.setParameter("id", id == null ? -1 : id);
	    return (List<Fabricante>) query.getResultList();
	} catch (Exception e) {
	    e.printStackTrace();
	    throw new Exception(e);
	}

    }

}
