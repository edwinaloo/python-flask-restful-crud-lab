import React, { useState, useEffect } from 'react';

const App = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch('/api/plants');
      const data = await response.json();
      setPlants(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updatePlant = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/plants/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      const data = await response.json();
      // Update the plants list with the updated plant
      setPlants(prevPlants =>
        prevPlants.map(plant => (plant.id === data.id ? data : plant))
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deletePlant = async id => {
    try {
      await fetch(`/api/plants/${id}`, {
        method: 'DELETE'
      });
      // Remove the deleted plant from the plants list
      setPlants(prevPlants => prevPlants.filter(plant => plant.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Plants</h1>
      <ul>
        {plants.map(plant => (
          <li key={plant.id}>
            {plant.name} - {plant.is_in_stock ? 'In Stock' : 'Out of Stock'}
            <button onClick={() => updatePlant(plant.id, { is_in_stock: !plant.is_in_stock })}>
              Toggle Stock
            </button>
            <button onClick={() => deletePlant(plant.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
