document.addEventListener("DOMContentLoaded", () => {
    const patientList = document.getElementById("patientList");

    // Sample patient data
    const patients = [
        { id: 1, name: "Patient 1" },
        { id: 2, name: "Patient 2" },
        { id: 3, name: "Patient 3" },
    ];

    // Populate patient table
    patients.forEach((patient) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = patient.id;

        const nameCell = document.createElement("td");
        nameCell.textContent = patient.name;

        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "View Patient Profile";
        editButton.addEventListener("click", () => {
            // Redirect to doctor.html with patient ID as a query parameter
            window.location.href = `doctor.html?patientId=${patient.id}`;
        });

        actionCell.appendChild(editButton);

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(actionCell);

        patientList.appendChild(row);
    });
});
