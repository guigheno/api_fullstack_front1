import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import api from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Carregar produtos
  const loadProducts = async () => {
    try {
      const response = await api.get('/produtos');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      alert('Erro ao carregar produtos!');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Adicionar produto
  const handleAddProduct = async (productData) => {
    try {
      await api.post('/produtos', productData);
      loadProducts();
      setShowForm(false);
      alert('Produto adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto!');
    }
  };

  // Editar produto
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleUpdateProduct = async (productData) => {
    try {
      await api.put(`/produtos/${editingProduct.id}`, productData);
      loadProducts();
      setEditingProduct(null);
      setShowForm(false);
      alert('Produto atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto!');
    }
  };

  // Excluir produto
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await api.delete(`/produtos/${productId}`);
        loadProducts();
        alert('Produto excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto!');
      }
    }
  };

  return (
    <div className="products-page">
      <h1>Gerenciar Produtos</h1>
      
      <button 
        className="btn btn-primary"
        onClick={() => {
          setEditingProduct(null);
          setShowForm(!showForm);
        }}
      >
        {showForm ? 'Cancelar' : 'Adicionar Produto'}
      </button>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setEditingProduct(null);
            setShowForm(false);
          }}
        />
      )}

      <ProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}

export default Products;