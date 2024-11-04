import React, { useEffect, useState } from 'react';

function GenericFetch() {
  const [storeData, setStoreData] = useState([]);
  const url = 'https://fakestoreapi.com/products';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.log('network err');
        }
        const data = await response.json();
        setStoreData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {storeData?.map((data) => {
        return <div>{data.description}</div>;
      })}
    </div>
  );
}

export default GenericFetch;
