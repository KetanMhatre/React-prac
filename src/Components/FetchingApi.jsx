import axios from 'axios';
import React, { useEffect, useState } from 'react';

function FetchingApi() {
  const [userData, setUserData] = useState([]);
  const url = 'https://jsonplaceholder.typicode.com/photos';

  const fetch = async () => {
    try {
      const response = await axios(url);
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      {userData.map((data, index) => {
        return <div key={index}>{data.title}</div>;
      })}
    </div>
  );
}

export default FetchingApi;
