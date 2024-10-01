const API_URL = "http://localhost:3000/api/v1/employee";

function fetchEmployees() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const tableBody = document.getElementById("dataTable");
      tableBody.innerHTML = "";
      const list = data.data;
      list.forEach((item) => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteCell.appendChild(deleteButton);
        deleteButton.addEventListener("click", () => deleteEmployee(item.id));
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
}

// TODO
// add event listener to submit button
const submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", createEmployee);
// TODO
// add event listener to delete button
// TODO
function createEmployee() {
  // get data from input field
  // send data to BE
  // call fetchEmployees
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fetchEmployees();
    })
    .catch((error) => console.error(error));
  console.log(name);
}

// TODO
function deleteEmployee(id) {
  // get id
  // send id to BE
  // call fetchEmployees
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fetchEmployees();
    });
}

fetchEmployees();
