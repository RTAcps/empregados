function fetchJson(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch((error) => {
      showError("Error loading data", error);
      throw error;
    });
}

const baseUrl = "http://localhost:3000";

function listEmployees() {
  return fetchJson(`${baseUrl}/employees`);
}

function listRoles() {
  return fetchJson(`${baseUrl}/roles`);
}
