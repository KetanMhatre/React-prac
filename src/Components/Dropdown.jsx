import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

function Dropdown() {
  const countries = [
    {
      name: 'United States',
      code: 'US',
      cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    },
    {
      name: 'Canada',
      code: 'CA',
      cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
    },
    {
      name: 'United Kingdom',
      code: 'GB',
      cities: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool'],
    },
    {
      name: 'Australia',
      code: 'AU',
      cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    },
    {
      name: 'India',
      code: 'IN',
      cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
    },
  ];

  const [userData, setUserData] = useState({
    countryCode: '',
  });
  const handleChange = (e) => {
    setUserData((prevData) => ({ ...prevData, countryCode: e.target.value }));
  };

  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <Card className='p-3 d-flex flex-row gap-3'>
        <div>
          <select className='btn btn-primary' onChange={handleChange}>
            <option value=''>select a country</option>
            {countries.map((country, index) => {
              return (
                <option key={index} value={country.code}>
                  {country.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          {userData.countryCode && (
            <div>
              <select name='' id='' className='btn btn-primary'>
                {countries
                  .filter((country) => country.code === userData.countryCode)
                  .map((country) =>
                    country.cities.map((city, index) => {
                      return (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      );
                    })
                  )}
              </select>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Dropdown;
