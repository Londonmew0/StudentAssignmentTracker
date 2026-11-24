
// Get the HTML elements
const assignmentForm = document.getElementById("assignmentForm");
const assignmentsContainer = document.getElementById("assignments");
const errorMessage = document.getElementById("errorMessage");

// Provide browser storage to the storage component
// Dependency Inversion Principle
const assignmentStorage = new AssignmentStorage(localStorage);

// Load previously saved assignments
let assignments = assignmentStorage.loadAssignments();

// Save assignments using the storage component
function saveAssignments() {
    assignmentStorage.saveAssignments(assignments);
}

// Change an assignment's completion status
function toggleAssignmentCompletion(index) {

    assignments[index] = changeCompletionStatus(assignments[index]);

    saveAssignments();
    displayAssignments();
}

// Display all saved assignments
function displayAssignments() {

    // Clear the current assignment list
    assignmentsContainer.innerHTML = "";

    // Display a message if there are no assignments
    if (assignments.length === 0) {

        const message = document.createElement("p");

        message.textContent = "No assignments added yet.";

        assignmentsContainer.appendChild(message);

        return;
    }

    // Loop through every saved assignment
    assignments.forEach(function(assignment, index) {

        // Create the assignment container
        const assignmentItem = document.createElement("div");
        assignmentItem.classList.add("assignment-item");

        // Display the assignment title
        const title = document.createElement("h3");
        title.textContent = assignment.title;

        // Display the course name
        const course = document.createElement("p");
        course.textContent = "Course: " + assignment.course;

        // Display the due date
        const dueDate = document.createElement("p");
        dueDate.textContent = "Due Date: " + assignment.dueDate;

        // Display the description
        const description = document.createElement("p");

        description.textContent = "Description: " +
            (assignment.description || "No description provided.");

        // Display the completion status
        const status = document.createElement("p");

        status.textContent = assignment.completed
            ? "Status: Completed"
            : "Status: Incomplete";

        // Create the completion button
        const completeButton = document.createElement("button");

        completeButton.type = "button";

        completeButton.textContent = assignment.completed
            ? "Mark as Incomplete"
            : "Mark as Completed";

        // Change completion status when clicked
        completeButton.addEventListener("click", function() {

            toggleAssignmentCompletion(index);

        });

        // Apply completed assignment styling
        if (assignment.completed) {

            assignmentItem.classList.add("completed");

        }

        // Add all information to the assignment container
        assignmentItem.appendChild(title);
        assignmentItem.appendChild(course);
        assignmentItem.appendChild(dueDate);
        assignmentItem.appendChild(description);
        assignmentItem.appendChild(status);
        assignmentItem.appendChild(completeButton);

        // Add the assignment to the website
        assignmentsContainer.appendChild(assignmentItem);

    });
}

// Handle the assignment form
assignmentForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get the information entered by the user
    const title = document.getElementById("title").value.trim();

    const course = document.getElementById("course").value.trim();

    const dueDate = document.getElementById("dueDate").value;

    const description = document.getElementById("description").value.trim();

    try {

        // Create and validate the assignment using assignmentManager.js
        const newAssignment = createAssignment(
            title,
            course,
            dueDate,
            description
        );

        // Clear any previous error messages
        errorMessage.textContent = "";

        // Add the new assignment
        assignments.push(newAssignment);

        // Save assignments
        saveAssignments();

        // Update the assignment list
        displayAssignments();

        // Clear the form
        assignmentForm.reset();

    } catch (error) {

        // Display validation errors
        errorMessage.textContent = error.message;

    }

});

// Display previously saved assignments when the page loads
displayAssignments();
