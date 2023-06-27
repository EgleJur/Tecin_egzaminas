import { apiUrl } from "../App";

export const fetchItems = (endpoint) => {
  return fetch(`${apiUrl}/api/v1/${endpoint}/`)
    .then((response) => response.json());
};

export const fetchItem = (endpoint, itemId) => {
    return fetch(`${apiUrl}/api/v1/${endpoint}/` + itemId)
      .then((response) => response.json());
  };


  export const deleteItem = (endpoint, id) => {
    return fetch(`${apiUrl}/api/v1/${endpoint}/${id}`, { method: "DELETE" });
  };
  
