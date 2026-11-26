
// Get the HTML elements
const assignmentForm = document.getElementById("assignmentForm");
const assignmentsContainer = document.getElementById("assignments");
const errorMessage = document.getElementById("errorMessage");

// Provide browser storage to the storage component
const assignmentStorage = new AssignmentStorage(localStorage);

// Load previously saved assignments
let assignments = assignmentStorage.loadAssignments();

// Save assignments
function saveAssignments() {
    assignmentStorage.saveAssignments(assignments);
}

// Change an assignment's completion status
function toggleAssignmentCompletion(index) {

    assignments[index] = changeCompletionStatus(assignments[index]);

    saveAssignments();
    displayAssignments();
}

// Remove an assignment
function removeAssignment(index) {

    // Ask the user to confirm deletion
    const confirmed = window.confirm(
        "Are you sure you want to delete this assignment?"
    );

    // Stop if the user selects Cancel
    if (!confirmed) {
        return;
    }

    try {

        // Delete the selected assignment
        assignments = deleteAssignment(assignments, index);

        saveAssignments();
        displayAssignments();

    } catch (error) {

        errorMessage.textContent = error.message;
    }
}

// Display all saved assignments
function displayAssignments() {

    // Sort assignments before displaying them
    assignments = sortAssignments(assignments);

    // Clear the current assignment list
    assignmentsContainer.innerHTML = "";

    // Display a message if no assignments exist
    if (assignments.length === 0) {

        const message = document.createElement("p");
        message.textContent = "No assignments added yet.";

        assignmentsContainer.appendChild(message);

        return;
    }

    // Loop through the sorted assignments
    assignments.forEach(function(assignment, index) {

        // Create the assignment container
        const assignmentItem = document.createElement("div");
        assignmentItem.classList.add("assignment-item");

        // Display the assignment title
        const title = document.createElement("h3");
        title.textContent = assignment.title;

        // Display the course
        const course = document.createElement("p");
        course.textContent = "Course: " + assignment.course;

        // Display the due date
        const dueDate = document.createElement("p");
        dueDate.textContent = "Due Date: " + assignment.dueDate;

        // Display the description
        const description = document.createElement("p");

        description.textContent = "Description: " +
            (assignment.description || "No description provided.");

        // Display completion status
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

        // Handle completion button clicks
        completeButton.addEventListener("click", function() {

            toggleAssignmentCompletion(index);
        });

        // Create the delete button
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        // Handle delete button clicks
        deleteButton.addEventListener("click", function() {

            removeAssignment(index);
        });

        // Apply completed assignment styling
        if (assignment.completed) {

            assignmentItem.classList.add("completed");
        }

        // Create a container for both buttons
        const buttonContainer = document.createElement("div");

        buttonContainer.classList.add("assignment-buttons");

        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(deleteButton);

        // Add assignment information to the container
        assignmentItem.appendChild(title);
        assignmentItem.appendChild(course);
        assignmentItem.appendChild(dueDate);
        assignmentItem.appendChild(description);
        assignmentItem.appendChild(status);
        assignmentItem.appendChild(buttonContainer);

        // Display the assignment
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

        // Create and validate the assignment
        const newAssignment = createAssignment(
            title,
            course,
            dueDate,
            description
        );

        // Clear previous error messages
        errorMessage.textContent = "";

        // Add the new assignment
        assignments.push(newAssignment);

        // Save and display assignments
        saveAssignments();
        displayAssignments();

        // Clear the form
        assignmentForm.reset();

    } catch (error) {

        // Display validation errors
        errorMessage.textContent = error.message;
    }
});

// Display and sort saved assignments when the page loads
displayAssignments();
