import React, { useState, useEffect } from 'react';

function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nome: '',
    senha: '',
    tipo: 'cliente'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome || '',
        senha: '', // Senha em branco para edição
        tipo: user.tipo || 'cliente'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="user-form">
      <h2>{user ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required={!user} // Obrigatório apenas para novo usuário
            placeholder={user ? "Deixe em branco para manter a senha atual" : ""}
          />
        </div>

        <div className="form-group">
          <label>Tipo:</label>
          <select name="tipo" value={formData.tipo} onChange={handleChange}>
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {user ? 'Atualizar' : 'Adicionar'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;