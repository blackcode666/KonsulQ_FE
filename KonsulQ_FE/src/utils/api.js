export const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`http://localhost:8000/api/${endpoint}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  