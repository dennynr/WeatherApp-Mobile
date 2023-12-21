const fetchData = async (kota, setCuaca) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=6dd1dd336f0a8bcf79cc0e4d049a19f4&units=metric`);
      const data = await response.json();
      console.log(data)
      if (data.cod && data.cod !== 200) {
        setCuaca(null); // Reset cuaca to null if there's an error
      } else {
        setCuaca(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  export default fetchData;
  