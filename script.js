
const assignmentForm = document.getElementById("assignmentForm");
const assignmentsContainer = document.getElementById("assignments");
const errorMessage = document.getElementById("errorMessage");

let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

function saveAssignments() {
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function displayAssignments() {
    assignmentsContainer.innerHTML = "";

    if (assignments.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No assignments added yet.";
        assignmentsContainer.appendChild(message);
        return;
    }

    assignments.forEach(function(assignment) {
        const assignmentItem = document.createElement("div");
        assignmentItem.classList.add("assignment-item");

        const title = document.createElement("h3");
        title.textContent = assignment.title;

        const course = document.createElement("p");
        course.textContent = "Course: " + assignment.course;

        const dueDate = document.createElement("p");
        dueDate.textContent = "Due Date: " + assignment.dueDate;

        const description = document.createElement("p");
        description.textContent = "Description: " +
            (assignment.description || "No description provided.");

        assignmentItem.appendChild(title);
        assignmentItem.appendChild(course);
        assignmentItem.appendChild(dueDate);
        assignmentItem.appendChild(description);

        assignmentsContainer.appendChild(assignmentItem);
    });
}

assignmentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const course = document.getElementById("course").value.trim();
    const dueDate = document.getElementById("dueDate").value;
    const description = document.getElementById("description").value.trim();

    if (title === "" || dueDate === "") {
        errorMessage.textContent =
            "Please enter an assignment title and due date.";
        return;
    }

    errorMessage.textContent = "";

    const newAssignment = {
        title: title,
        course: course,
        dueDate: dueDate,
        description: description
    };

    assignments.push(newAssignment);

    saveAssignments();
    displayAssignments();

    assignmentForm.reset();
});

displayAssignments();
