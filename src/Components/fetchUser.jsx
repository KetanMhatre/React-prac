import React, { useEffect, useState } from 'react';

function FetchUser() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    const data = await fetch(url);
    const response = await data.json();
    if (response) {
      setUser(response);
    }
    console.log(response);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      {user.map((data) => {
        return (
          <div key={data.id}>
            <h4>{data.email}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default FetchUser;
