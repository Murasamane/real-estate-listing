const API = `https://api.real-estate-manager.redberryinternship.ge/api/`;
const TOKEN = "9cfc876d-e048-4a39-8c22-1bfe2da27476";

const headers = new Headers();
headers.append("Authorization", `Bearer ${TOKEN}`);
headers.append("Content-Type", "application/json");

export async function getAllEstates() {
  try {
    const response = await fetch(`${API}agents`, {
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
      fetch(`${API}regions`, { method: "GET", headers: headers }),
      fetch(`${API}cities`, { method: "GET", headers: headers }),
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
    throw err; // Rethrow the error
  }
}

export async function createAgent(agent) {
  try {
    const res = await fetch(
      `https://api.real-estate-manager.redberryinternship.ge/api/agents`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(agent),
      }
    );

    if (!res.ok) throw new Error("failed to create an agent");

    const data = res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
