<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="doctor.css">
</head>
<body>
    
</body>
</html>
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

// Get patient ID from URL
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $patientId = (int)$_GET['id'];

    // Fetch patient record
    $sql = "SELECT * FROM patients WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $patientId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "<h1>Patient Details</h1>";
        echo "<p><strong>ID:</strong> " . htmlspecialchars($row['id']) . "</p>";
        echo "<p><strong>Name:</strong> " . htmlspecialchars($row['patient_name']) . "</p>";
        echo "<p><strong>Age:</strong> " . htmlspecialchars($row['patient_age']) . "</p>";
        echo "<p><strong>Gender:</strong> " . htmlspecialchars($row['gender']) . "</p>";
        echo "<p><strong>Condition:</strong> " . htmlspecialchars($row['patientcondition']) . "</p>";
        echo "<p><strong>Reason:</strong> " . htmlspecialchars($row['reason']) . "</p>";
        echo "<p><strong>Ambulance Incharge:</strong> " . htmlspecialchars($row['ambulance_incharge']) . "</p>";
        echo "<p><strong>Hospital:</strong> " . htmlspecialchars($row['hospital']) . "</p>";
        echo "<p><strong>Doctor:</strong> " . htmlspecialchars($row['doctor']) . "</p>";
        if (!empty($row['patient_image'])) {
            echo "<p><strong>Image:</strong><br><img src='" . htmlspecialchars($row['patient_image']) . "' alt='Patient Image' width='200'></p>";
        } else {
            echo "<p><strong>Image:</strong> No image available.</p>";
        }
    } else {
        echo "<p>No details found for this patient.</p>";
    }
    $stmt->close();
} else {
    echo "<p>Invalid patient ID.</p>";
}

$conn->close();
?>
