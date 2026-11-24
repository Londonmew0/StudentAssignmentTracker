
// Assignment Manager
// Handles assignment operations separately from
// the user interface and storage.

// Create and validate a new assignment
function createAssignment(title, course, dueDate, description) {

    if (!title || !title.trim() || !dueDate) {

        throw new Error("Assignment title and due date are required.");
    }

    return {
        title: title,
        course: course,
        dueDate: dueDate,
        description: description,
        completed: false
    };
}

// Change an assignment's completion status
function changeCompletionStatus(assignment) {

    if (!assignment || typeof assignment !== "object") {

        throw new Error("Invalid assignment.");
    }

    return {
        ...assignment,
        completed: !assignment.completed
    };
}

// Delete an assignment using its index
function deleteAssignment(assignments, index) {

    // Verify that the assignment list is an array
    if (!Array.isArray(assignments)) {

        throw new Error("Invalid assignment list.");
    }

    // Verify that the index is valid
    if (!Number.isInteger(index) ||
        index < 0 ||
        index >= assignments.length) {

        throw new Error("Invalid assignment index.");
    }

    // Return a new list without the selected assignment
    return assignments.filter(function(assignment, currentIndex) {

        return currentIndex !== index;

    });
}

// Export functions for automated testing
if (typeof module !== "undefined" && module.exports) {

    module.exports = {
        createAssignment,
        changeCompletionStatus,
        deleteAssignment
    };
}
