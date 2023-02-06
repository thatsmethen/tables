import "./index.css";

import React, { useState, useEffect } from "react";
import { Table } from "./components/Table";
import { People, Person, Location } from "./components/Table/types";

export default function App() {
  const [locationData, setLocationData]: any = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let locationData: Location[];

      // Fetch the data
      const response = await fetch(`https://randomuser.me/api/?results=20`);

      // Save the JSON response
      const people: People = await response.json();

      // Filter location data from response
      locationData = people.results.map((p: Person) => {
        const loc = p.location;
        // If it's not a string, join it
        Object.entries(p.location).forEach(([key, val]) => {
          p.location[key as keyof typeof loc] = typeof val === 'object' ? Object.values(val).join(' ') : val
        });
        return loc;
      })

      // Save the filtered data
      setLocationData(locationData);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      {locationData && (<Table tableData={locationData} />)}
    </div>
  );
}
