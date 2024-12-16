// Retrieve patient data from localStorage
const patientData = JSON.parse(localStorage.getItem('patientData'));

// Get references to elements
const body = document.getElementById('body');
const doctorNameDiv = document.getElementById('doctorName');
const patientInfoDiv = document.getElementById('patientInfo');
const treatmentTable = document.getElementById('treatmentTable').querySelector('tbody');
const fileUploadForm = document.getElementById('fileUploadForm');
const fileUploadStatus = document.getElementById('fileUploadStatus');
const filePreviewDiv = document.getElementById('filePreview');

// Function to update the form's background color based on condition
function updateBackgroundColor(condition) {
    if (condition === 'critical') {
        body.style.backgroundColor = '#f8d7da'; // Light red
    } else if (condition === 'moderate') {
        body.style.backgroundColor = '#d4edda'; // Light green
    } else if (condition === 'stable') {
        body.style.backgroundColor = '#d1ecf1'; // Light blue
    }
}

// Initialize the form with patient data
if (patientData) {
    // Update background color
    updateBackgroundColor(patientData.condition);

    // Display patient information
    patientInfoDiv.innerHTML = `
        <h2>Patient Profile</h2>
        <p><strong>Name:</strong> ${patientData.name}</p>
        <p><strong>Age:</strong> ${patientData.age}</p>
        <p><strong>Gender:</strong> ${patientData.gender}</p>
        <p><strong>Condition:</strong> ${patientData.condition}</p>
        <p><strong>Reason for Accident:</strong> ${patientData.reason}</p>
        <p><strong>Medicines Given:</strong> ${patientData.medicines}</p>
        <p><strong>Hospital:</strong> ${patientData.hospital}</p>
        <p><strong>Ambulance In-charge:</strong> ${patientData.incharge}</p>
    `;

    // Display assigned doctor
    doctorNameDiv.textContent = `Assigned Doctor: Dr. ${patientData.doctor}`;
}

// Handle adding treatments
document.getElementById('doctorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get treatment details
    const treatment = document.getElementById('treatment').value;

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    // Get doctor's name
    const doctorName = patientData ? patientData.doctor : "Unknown";

    // Add entry to the table
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${date}</td>
        <td>${time}</td>
        <td>${treatment}</td>
        <td>Dr. ${doctorName}</td>
    `;
    treatmentTable.appendChild(row);

    // Clear the doctor's form
    document.getElementById('doctorForm').reset();
});

// Handle changing the assigned doctor
document.getElementById('changeDoctorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the new doctor's name
    const newDoctor = document.getElementById('newDoctor').value;

    // Update the assigned doctor in patient data
    if (patientData) {
        patientData.doctor = newDoctor;
        localStorage.setItem('patientData', JSON.stringify(patientData));
    }

    // Update the assigned doctor's name on the page
    doctorNameDiv.textContent = `Assigned Doctor: Dr. ${newDoctor}`;

    // Clear the change doctor form
    document.getElementById('changeDoctorForm').reset();
});

// Handle multiple file uploads
fileUploadForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the selected files
    const files = document.getElementById('patientReports').files;

    if (files.length > 0) {
        // Clear previous file preview
        filePreviewDiv.innerHTML = '';

        // Process each file
        for (const file of files) {
            const fileURL = URL.createObjectURL(file);

            // Display the file preview based on file type
            const fileItem = document.createElement('div');
            fileItem.classList.add('file-item');

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = fileURL;
                img.alt = file.name;
                fileItem.appendChild(img);
            } else if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                const object = document.createElement('object');
                object.data = fileURL;
                object.type = file.type;
                object.width = '100%';
                object.height = '500px';
                fileItem.appendChild(object);
            } else {
                fileItem.innerHTML = `<p>Unsupported file type: ${file.name}</p>`;
            }

            filePreviewDiv.appendChild(fileItem);
        }

        // Show success message
        fileUploadStatus.textContent = `${files.length} files uploaded successfully.`;
    } else {
        fileUploadStatus.textContent = 'Please select at least one file to upload.';
    }
});
// Save patient data to Firestore
if (patientData) {
    db.collection('patients').doc(patientData.name).set(patientData)
        .then(() => {
            console.log('Patient profile saved to Firestore.');
        })
        .catch((error) => {
            console.error('Error saving patient profile:', error);
        });
}

fileUploadForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const files = document.getElementById('patientReports').files;

    if (files.length > 0) {
        // Clear the previous file preview
        filePreviewDiv.innerHTML = '';

        const promises = Array.from(files).map((file) => {
            const storageRef = storage.ref(`reports/${patientData.name}/${file.name}`);
            return storageRef.put(file).then((snapshot) => {
                console.log(`Uploaded ${file.name}`);
                return storageRef.getDownloadURL();
            });
        });

        try {
            const urls = await Promise.all(promises);

            // Save file URLs to Firestore
            db.collection('patients').doc(patientData.name).update({
                reports: firebase.firestore.FieldValue.arrayUnion(...urls)
            });

            // Display file previews
            urls.forEach((url) => {
                const fileItem = document.createElement('div');
                fileItem.classList.add('file-item');

                if (url.endsWith('.jpg') || url.endsWith('.png')) {
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = 'Uploaded Report';
                    fileItem.appendChild(img);
                } else {
                    const link = document.createElement('a');
                    link.href = url;
                    link.target = '_blank';
                    link.textContent = 'View Report';
                    fileItem.appendChild(link);
                }

                filePreviewDiv.appendChild(fileItem);
            });

            fileUploadStatus.textContent = `${files.length} files uploaded successfully.`;
        } catch (error) {
            console.error('Error uploading files:', error);
            fileUploadStatus.textContent = 'Error uploading files.';
        }
    } else {
        fileUploadStatus.textContent = 'Please select at least one file to upload.';
    }
});
