document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const doctorId = document.getElementById("doctorId").value;
    const errorMessage = document.getElementById("errorMessage");

    if (doctorId === "12345") {
        window.location.href = "http://localhost/Project%20cc/patient-profile.php";
    } else {
        errorMessage.style.display = "block";
    }
});
