const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
// console.log(
//   fetchAPI(),
// );

export default fetchAPI;
