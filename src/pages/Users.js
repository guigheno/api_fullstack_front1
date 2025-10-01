import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import api from '../services/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadUsers = async () => {
    try {
      const response = await api.get('/usuarios');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      alert('Erro ao carregar usuários!');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async (userData) => {
    try {
      await api.post('/usuarios', userData);
      loadUsers();
      setShowForm(false);
      alert('Usuário adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      alert('Erro ao adicionar usuário!');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleUpdateUser = async (userData) => {
    try {
      await api.put(`/usuarios/${editingUser.id}`, userData);
      loadUsers();
      setEditingUser(null);
      setShowForm(false);
      alert('Usuário atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário!');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await api.delete(`/usuarios/${userId}`);
        loadUsers();
        alert('Usuário excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        alert('Erro ao excluir usuário!');
      }
    }
  };

  return (
    <div className="users-page">
      <h1>Gerenciar Usuários</h1>
      
      <button 
        className="btn btn-primary"
        onClick={() => {
          setEditingUser(null);
          setShowForm(!showForm);
        }}
      >
        {showForm ? 'Cancelar' : 'Adicionar Usuário'}
      </button>

      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? handleUpdateUser : handleAddUser}
          onCancel={() => {
            setEditingUser(null);
            setShowForm(false);
          }}
        />
      )}

      <UserList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
}

export default Users;