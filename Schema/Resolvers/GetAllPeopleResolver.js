const axios = require("axios");

const GetAllPeopleResolver = async () => {
  try {
    const data = await axios
      .get("http://localhost:5000/person")
      .then((res) => res.data);
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = GetAllPeopleResolver
