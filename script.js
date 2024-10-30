function assignDoctor() {
    const doctorSelect = document.getElementById("doctorSelect");
    const assignedDoctor = document.getElementById("assignedDoctor");
    const selectedDoctor = doctorSelect.options[doctorSelect.selectedIndex].text;

    assignedDoctor.textContent = `Assigned Doctor: ${selectedDoctor}`;
}
