const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = async () => {
  const response = await (await fetch(API_URL)).json();

  return response;
};
// console.log(
//   fetchAPI(),
// );

export default fetchAPI;
