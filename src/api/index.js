/* const API_URL = 'https://convenios.unlar.edu.ar/convenios/1.0/rest/convenios';

export const getDocs = async () => {
  try {
    const res = await fetch(`${API_URL}`);
    return res.json();
  } catch (err) {
    throw new Error(err)
  }
}

export const getDoc = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
  } catch (err) {
    throw new Error(err)
  }
}

export const createDoc = async (docData) => {
  try {
    const res = await fetch(`${API_URL}/docs`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(docData)
    });
    return res.json();
  } catch (err) {
    throw new Error(err)
  }
}

export const updateDoc = async (id, docData) => {
  try {
    const res = await fetch(`${API_URL}/docs/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(docData)
    });
    return res.json();
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteDoc = async (id) => {
  try {
    const res = await fetch(`${API_URL}/docs/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  } catch (err) {
    throw new Error(err)
  }
} */


const API_URL = process.env.API_URL;
const API_USERNAME = process.env.API_USERNAME;
const API_PASSWORD = process.env.API_PASSWORD;

export const getDocs = async () => {
  try {
    const res = await fetch(`${API_URL}`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
}

export const getDoc = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
}

