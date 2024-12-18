const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AUTH_HEADER = { Authorization: process.env.REACT_APP_API_AUTH };

export const fetchConvenios = async () => {
  const url = `${API_BASE_URL}/convenios`;

  const options = {
    method: 'GET',
    headers: AUTH_HEADER,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Error al obtener datos de convenios');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};