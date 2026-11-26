
// Assignment Manager
// Handles assignment logic separately from
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

    // Validate the assignment list
    if (!Array.isArray(assignments)) {

        throw new Error("Invalid assignment list.");
    }

    // Validate the index
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

// Sort assignments by completion status and due date
function sortAssignments(assignments) {

    // Validate the assignment list
    if (!Array.isArray(assignments)) {

        throw new Error("Invalid assignment list.");
    }

    // Create a copy to preserve the original array
    return [...assignments].sort(function(a, b) {

        // Incomplete assignments appear first
        if (Boolean(a.completed) !== Boolean(b.completed)) {

            return Number(Boolean(a.completed)) -
                   Number(Boolean(b.completed));
        }

        // Sort by earliest due date
        return a.dueDate.localeCompare(b.dueDate);
    });
}

// Export functions for automated testing
if (typeof module !== "undefined" && module.exports) {

    module.exports = {
        createAssignment,
        changeCompletionStatus,
        deleteAssignment,
        sortAssignments
    };
}
