<?php
// Start PHP session for error handling or debugging if necessary
session_start();

// Define hospital and doctor data (could also be fetched from a database)
$hospitalData = [
    "City Hospital" => ["Dr. Smith", "Dr. Taylor"],
    "Green Valley Medical" => ["Dr. Wilson", "Dr. Brown"],
    "Central Clinic" => ["Dr. Davis", "Dr. Clark"]
];

// Function to dynamically generate hospital options
function generateHospitalOptions($hospitalData) {
    $options = '<option value="">Select Hospital</option>';
    foreach ($hospitalData as $hospital => $doctors) {
        $options .= '<option value="' . htmlspecialchars($hospital) . '">' . htmlspecialchars($hospital) . '</option>';
    }
    return $options;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Care Code</title>
    <link rel="stylesheet" href="styles.css">

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: url("image.jpg") no-repeat center center fixed;
            background-size: cover;
        }
        .container {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 8px;
            padding: 20px;
        }
        .critical {
            background-color: #f8d7da;
        }
        .moderate {
            background-color: #fff3cd;
        }
        .stable {
            background-color: #d4edda;
        }
    </style>
</head>
<body>
    <div class="container" id="formContainer">
        <h1>Patient Information Form</h1>
        <form id="patientForm" action="patient-insert.php" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="patientImage">Upload Patient Image:</label>
                <input type="file" id="patientImage" name="patientImage" accept="image/*" capture="camera" required>
            </div>

            <div class="form-group">
                <label for="patientName">Patient Name:</label>
                <input type="text" id="patientName" name="patientName" required>
            </div>

            <div class="form-group">
                <label for="patientAge">Age:</label>
                <input type="number" id="patientAge" name="patientAge" required>
            </div>

            <div class="form-group">
                <label for="gender">Gender:</label>
                <select id="gender" name="gender" required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div class="form-group">
                <label for="condition">Condition:</label>
                <select id="condition" name="condition" required>
                    <option value="">Select Condition</option>
                    <option value="Critical">Critical</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Stable">Stable</option>
                </select>
            </div>

            <div class="form-group">
                <label for="reason">Reason of Accident:</label>
                <textarea id="reason" name="reason" required></textarea>
            </div>

            <div class="form-group">
                <label for="ambulanceIncharge">Ambulance Incharge:</label>
                <input type="text" id="ambulanceIncharge" name="ambulanceIncharge" required>
            </div>

            <div class="form-group">
                <label for="hospital">Hospital:</label>
                <select id="hospital" name="hospital" required>
                    <?php echo generateHospitalOptions($hospitalData); ?>
                </select>
            </div>

            <div class="form-group" id="doctorGroup" style="display: none;">
                <label for="doctor">Available Doctors:</label>
                <select id="doctor" name="doctor">
                    <option value="">Select Doctor</option>
                </select>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const hospitalSelect = document.getElementById("hospital");
            const doctorGroup = document.getElementById("doctorGroup");
            const doctorSelect = document.getElementById("doctor");

            // Hospital-Doctor data (provided inline for simplicity)
            const hospitalData = <?php echo json_encode($hospitalData); ?>;

            // Show doctors when a hospital is selected
            hospitalSelect.addEventListener("change", () => {
                const selectedHospital = hospitalSelect.value;
                if (selectedHospital && hospitalData[selectedHospital]) {
                    doctorGroup.style.display = "block";
                    doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
                    hospitalData[selectedHospital].forEach(doctor => {
                        const option = document.createElement("option");
                        option.value = doctor;
                        option.textContent = doctor;
                        doctorSelect.appendChild(option);
                    });
                } else {
                    doctorGroup.style.display = "none";
                    doctorSelect.innerHTML = '';
                }
            });
        });
    </script>
</body>
</html>
