const URL_API = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = async () => {
  try {
    const response = await fetch(URL_API);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchAPI;
