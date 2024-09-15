import axios from "axios";

const API = `https://api.real-estate-manager.redberryinternship.ge/api`;
// const TOKEN = "Bearer 9cfc876d-e048-4a39-8c22-1bfe2da27476";
const TOKEN = "9d02b658-960b-487e-ac02-9bcfe1af4285";

const headers = new Headers();
headers.append("Authorization", `Bearer ${TOKEN}`);
headers.append("Content-Type", "application/json");

export async function getAllEstates() {
  try {
    const response = await fetch(`${API}/agents`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) throw new Error("something went wrong");

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getRegionsAndCities() {
  try {
    const [regionsResponse, citiesResponse] = await Promise.all([
      fetch(`${API}/regions`, { method: "GET", headers: headers }),
      fetch(`${API}/cities`, { method: "GET", headers: headers }),
    ]);

    if (!regionsResponse.ok || !citiesResponse.ok) {
      throw new Error("Something went wrong");
    }

    const [regionsData, citiesData] = await Promise.all([
      regionsResponse.json(),
      citiesResponse.json(),
    ]);

    return { regions: regionsData, cities: citiesData };
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

export async function createAgent(agent) {
  const formData = new FormData();
  formData.append("name", agent.name);
  formData.append("surname", agent.surname);
  formData.append("email", agent.email);
  formData.append("phone", agent.phone);
  formData.append("avatar", agent.avatar[0]);

  try {
    await axios.post(
      "https://api.real-estate-manager.redberryinternship.ge/api/agents",
      formData,
      {
        headers: {
          Authorization: "Bearer 9d02b658-960b-487e-ac02-9bcfe1af4285",
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error posting data:",
      error.response ? error.response.data : error.message
    );
  }
}
