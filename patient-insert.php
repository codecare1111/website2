<?php
// Database connection settings
$host = "localhost";
$username = "root";
$password = "";
$dbname = "testing"; // Replace with your database name

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form data is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize and collect input data
    $patientName = $conn->real_escape_string($_POST['patientName']);
    $patientAge = (int)$_POST['patientAge'];
    $gender = $conn->real_escape_string($_POST['gender']);
    $patientcondition = $conn->real_escape_string($_POST['condition']);
    $reason = $conn->real_escape_string($_POST['reason']);
    $ambulanceIncharge = $conn->real_escape_string($_POST['ambulanceIncharge']);
    $hospital = $conn->real_escape_string($_POST['hospital']);
    $doctor = isset($_POST['doctor']) ? $conn->real_escape_string($_POST['doctor']) : NULL;

    // Handle patient image upload
    if (isset($_FILES['patientImage']) && $_FILES['patientImage']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        $fileName = basename($_FILES['patientImage']['name']);
        $targetFilePath = $uploadDir . $fileName;

        // Ensure the uploads directory exists
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        if (move_uploaded_file($_FILES['patientImage']['tmp_name'], $targetFilePath)) {
            $patientImage = $targetFilePath;
        } else {
            echo "Error uploading image.";
            exit;
        }
    } else {
        $patientImage = NULL;
    }

    // Insert data into database
    $sql = "INSERT INTO patients (patient_name, patient_age, gender, patientcondition, reason, ambulance_incharge, hospital, doctor, patient_image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sisssssss", $patientName, $patientAge, $gender, $patientcondition, $reason, $ambulanceIncharge, $hospital, $doctor, $patientImage);

    if ($stmt->execute()) {
        echo "Patient data inserted successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
