const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = async () => {
  try {
    const response = await (await fetch(API_URL)).json();

    return response;
  } catch (error) {
    console.log(error);
  }
};
// console.log(
//   fetchAPI(),
// );

export default fetchAPI;
