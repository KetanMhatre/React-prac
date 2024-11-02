import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Random = () => {
  const [formData, setFormData] = useState([]);

  const apiUrl = 'https://jsonplaceholder.typicode.com/users';
  const fetch = async () => {
    try {
      const data = await axios(apiUrl);
      setFormData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {formData.map((item) => {
        return (
          <>
            <h3>{item.name}</h3>
          </>
        );
      })}
    </>
  );
};

export default Random;
