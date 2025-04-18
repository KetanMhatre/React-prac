import React, { useEffect, useState } from 'react';

function DeleteFetch() {
  const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    const url = 'https://dummyjson.com/products';
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setApiData(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {apiData.map((data) => {
        return (
          <div key={data.id}>
            <img src={data.thumbnail} alt={data.title} />
            <h4>{data.title}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default DeleteFetch;
