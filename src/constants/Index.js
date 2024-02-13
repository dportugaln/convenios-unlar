// export const API_URL = "https://convenios.unlar.edu.ar/convenios/1.0/rest/convenios"
// const API_URL = process.env.API_URL;
// const API_USERNAME = process.env.API_USERNAME;
// const API_PASSWORD = process.env.API_PASSWORD;

export const getConvenios = async () => {
    try {
      const res = await fetch(`${API_URL}`);
      return res.json();
    } catch (err) {
      throw new Error(err)
    }
  }
  
  export const getConvenio = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      return res.json();
    } catch (err) {
      throw new Error(err)
    }
  }