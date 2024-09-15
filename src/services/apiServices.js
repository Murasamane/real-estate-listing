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
    const [regionsResponse, citiesResponse, agentsResponse] = await Promise.all(
      [
        fetch(`${API}/regions`, { method: "GET", headers: headers }),
        fetch(`${API}/cities`, { method: "GET", headers: headers }),
        fetch(`${API}/agents`, { method: "GET", headers: headers }),
      ]
    );

    if (!regionsResponse.ok || !citiesResponse.ok) {
      throw new Error("Something went wrong");
    }

    const [regionsData, citiesData, agentsData] = await Promise.all([
      regionsResponse.json(),
      citiesResponse.json(),
      agentsResponse.json(),
    ]);

    return { regions: regionsData, cities: citiesData, agents: agentsData };
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

export async function createListing(estate) {
  const formData = new FormData();
  formData.append("address", estate.address);
  formData.append("image", estate.image);
  formData.append("region_id", estate.region_id);
  formData.append("description", estate.description);
  formData.append("city_id", estate.city_id);
  formData.append("zip_code", estate.zip_code);
  formData.append("price", estate.price);
  formData.append("area", estate.area);
  formData.append("bedrooms", estate.bedrooms);
  formData.append("is_rental", estate.is_rental);
  formData.append("agent_id", estate.agent_id);

  try {
    await axios.post(
      "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
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
