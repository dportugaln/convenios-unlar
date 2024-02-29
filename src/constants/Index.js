export const API_URL = "./data.json"
//const API_URL = "http://kakan2.unlar.edu.ar/kakan/?ai=kakan||3640&cl=leo&ua=UNLAR";
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