import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api.js";

function App() {
  const [repositories, setRepositories] = useState([]);

  const loadRepositories = async () => {
    const { data } = await api.get("/repositories");
    setRepositories(data);
  };

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post("/repositories", {
      title: "new repo",
      techs: ["reactjs", "nodejs"],
    });
    setRepositories([...repositories, data]);
    //loadRepositories();
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`/repositories/${id}`);
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
      //loadRepositories();
    } catch (error) {
      console.log("erro ao excluir ", error);
    }
  }

  return (
    <div>
      {repositories.length === 0 && <div>Nenhum repositório cadastrado</div>}
      <ul data-testid="repository-list">
        {repositories.length > 0 &&
          repositories.map(({ id, title }) => (
            <li key={id}>
              {title}
              <button onClick={() => handleRemoveRepository(id)}>
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
