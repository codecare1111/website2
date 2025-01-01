document.addEventListener("DOMContentLoaded", () => {
    const patientDetailsDiv = document.getElementById("patientDetails");
    const treatmentTableBody = document.getElementById("treatmentTable");
    const editPatientBtn = document.getElementById("editPatientBtn");

    // Sample patient data
    const patients = {
        1: {
            id: 1,
            name: "Patient 1",
            age: 30,
            gender: "Male",
            condition: "Stable",
            reason: "Minor injury",
            ambulanceIncharge: "John Doe",
            hospital: "City Hospital",
            doctor: "Dr. Taylor",
            treatments: [
                { date: "2024-12-10", time: "10:00 AM", treatment: "Wound cleaning", doctor: "Dr. Taylor" },
            ],
        },
    };

    // Get patientId from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get("patientId");
    const patientData = patients[patientId];

    if (!patientData) {
        patientDetailsDiv.innerHTML = "<p>Patient not found!</p>";
        return;
    }

    // Populate patient details
    function renderPatientDetails() {
        patientDetailsDiv.innerHTML = `
            <p><strong>Name:</strong> ${patientData.name}</p>
            <p><strong>Age:</strong> ${patientData.age}</p>
            <p><strong>Gender:</strong> ${patientData.gender}</p>
            <p><strong>Condition:</strong> ${patientData.condition}</p>
            <p><strong>Reason:</strong> ${patientData.reason}</p>
            <p><strong>Ambulance Incharge:</strong> ${patientData.ambulanceIncharge}</p>
            <p><strong>Hospital:</strong> ${patientData.hospital}</p>
            <p><strong>Assigned Doctor:</strong> ${patientData.doctor}</p>
        `;
    }

    // Populate treatment table
    function renderTreatmentTable() {
        treatmentTableBody.innerHTML = patientData.treatments
            .map(
                (treatment) => `
                <tr>
                    <td>${treatment.date}</td>
                    <td>${treatment.time}</td>
                    <td>${treatment.treatment}</td>
                    <td>${treatment.doctor}</td>
                </tr>
            `
            )
            .join("");
    }

    // Handle edit button click
    editPatientBtn.addEventListener("click", () => {
        const treatment = prompt("Enter new treatment details:");
        if (treatment) {
            const now = new Date();
            const date = now.toISOString().split("T")[0];
            const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            patientData.treatments.push({ date, time, treatment, doctor: patientData.doctor });
            renderTreatmentTable();
        }
    });

    // Initial render
    renderPatientDetails();
    renderTreatmentTable();
});
