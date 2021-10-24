async function init() {
  const [roles, employees] = await Promise.all([listRoles(), listEmployees()]);

  initRoles(roles);
  updateEmployees(employees, roles);
  document.querySelector(".options").addEventListener("change", () => {
    updateEmployees(employees, roles);
  });
}

init();

function initRoles(roles) {
  const rolesEl = document.getElementById("roles");
  for (const role of roles) {
    const labelEl = document.createElement("label");
    const checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.value = role.id;
    const spanEl = document.createElement("span");
    spanEl.textContent = role.name;
    labelEl.append(checkboxEl, spanEl);
    rolesEl.append(labelEl);
  }
}

function updateEmployees(employees, roles) {
  const tbodyEl = document.getElementById("tbody");
  tbodyEl.innerHTML = "";

  const filteredEmployees = getFilteredEmployees(employees);
  sortEmployees(employees);

  document.getElementById("count").textContent = filteredEmployees.length;

  for (const employee of filteredEmployees) {
    const trEl = document.createElement("tr");
    const td0El = document.createElement("td");
    td0El.textContent = employee.id;
    const td1El = document.createElement("td");
    td1El.textContent = employee.name;
    const td2El = document.createElement("td");
    const role = roles.find((role) => role.id === employee.role_id);
    td2El.textContent = role.name;
    const td3El = document.createElement("td");
    td3El.textContent = employee.salary;
    trEl.append(td0El, td1El, td2El, td3El);
    tbodyEl.append(trEl);
  }
}

function getFilteredEmployees(employees) {
  const rolesIds = getSelectedRolesIds();
  return rolesIds.length === 0
    ? employees
    : employees.filter((employee) => rolesIds.indexOf(employee.role_id) !== -1);
}

function sortEmployees(employees) {
  const sortBy = document.getElementById("sortBy").value;
  switch (sortBy) {
    case "NA":
      employees.sort((a, b) => compare(a.name, b.name));
      break;
    case "ND":
      employees.sort((a, b) => -compare(a.name, b.name));
      break;
    case "SA":
      employees.sort((a, b) => compare(a.salary, b.salary));
      break;
    case "SD":
      employees.sort((a, b) => -compare(a.salary, b.salary));
      break;
  }
}

function compare(a, b) {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}

function getSelectedRolesIds() {
  const checkboxes = document.querySelectorAll("#roles input:checked");
  const ids = [];
  for (const checkbox of checkboxes) {
    ids.push(parseInt(checkbox.value));
  }
  return ids;
}
