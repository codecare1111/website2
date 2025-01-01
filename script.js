document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.getElementById("formContainer");
    const hospitalSelect = document.getElementById("hospital");
    const doctorGroup = document.getElementById("doctorGroup");
    const doctorSelect = document.getElementById("doctor");
    const conditionSelect = document.getElementById("condition");

    // Sample data for hospitals and doctors
    const hospitalData = {
        "City Hospital": ["Dr. Smith", "Dr. Taylor"],
        "Green Valley Medical": ["Dr. Wilson", "Dr. Brown"],
        "Central Clinic": ["Dr. Davis", "Dr. Clark"]
    };

    // Function to populate hospital dropdown
    function populateHospitals() {
        hospitalSelect.innerHTML = '<option value="">Select Hospital</option>'; // Reset hospital options
        Object.keys(hospitalData).forEach(hospital => {
            const option = document.createElement("option");
            option.value = hospital;
            option.textContent = hospital;
            hospitalSelect.appendChild(option);
        });
    }

    // Function to populate doctors based on selected hospital
    function populateDoctors(selectedHospital) {
        if (selectedHospital && hospitalData[selectedHospital]) {
            doctorGroup.style.display = "block"; // Show doctor dropdown
            doctorSelect.innerHTML = '<option value="">Select Doctor</option>'; // Reset doctor options
            hospitalData[selectedHospital].forEach(doctor => {
                const option = document.createElement("option");
                option.value = doctor;
                option.textContent = doctor;
                doctorSelect.appendChild(option);
            });
        } else {
            doctorGroup.style.display = "none"; // Hide doctor dropdown if no hospital selected
            doctorSelect.innerHTML = ''; // Clear doctor options
        }
    }

    // Function to update form background based on selected condition
    function updateFormBackground(condition) {
        formContainer.className = `container ${condition.toLowerCase()}`; // Add appropriate condition class
    }

    // Event listeners
    hospitalSelect.addEventListener("change", () => {
        const selectedHospital = hospitalSelect.value;
        populateDoctors(selectedHospital);
    });

    conditionSelect.addEventListener("change", () => {
        const condition = conditionSelect.value;
        if (condition) updateFormBackground(condition);
    });

    // Initial population of hospital dropdown
    populateHospitals();
});
