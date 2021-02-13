import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);
  
  async function handleAddRepository() {
    // TODO

    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      owner: 'Marcelo Ecker'
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    const newList = repositories.filter(item => item.id !== id);

    setRepositories([...newList]);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        { repositories.map(repository => (          
          <li key={ repository.id }>
            <span className="title">{ repository.title }</span>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
