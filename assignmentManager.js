
/*
 * Assignment Manager
 *
 * Handles assignment-related operations separately
 * from the website's display and storage code.
 */

// Create a new assignment object
function createAssignment(title, course, dueDate, description) {

    // Validate required information
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

    // Check for an invalid assignment
    if (!assignment || typeof assignment !== "object") {
        throw new Error("Invalid assignment.");
    }

    return {
        ...assignment,
        completed: !assignment.completed
    };
}

// Export functions for automated testing in Node.js
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        createAssignment,
        changeCompletionStatus
    };
}
