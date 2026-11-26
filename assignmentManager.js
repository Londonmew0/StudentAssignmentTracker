
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

// Change the completion status of an assignment
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

    if (!Array.isArray(assignments)) {
        throw new Error("Invalid assignment list.");
    }

    if (!Number.isInteger(index) ||
        index < 0 ||
        index >= assignments.length) {

        throw new Error("Invalid assignment index.");
    }

    return assignments.filter(function(assignment, currentIndex) {

        return currentIndex !== index;
    });
}

// NEW: Sort assignments by completion status and due date
function sortAssignments(assignments) {

    if (!Array.isArray(assignments)) {
        throw new Error("Invalid assignment list.");
    }

    return [...assignments].sort(function(a, b) {

        // Place incomplete assignments first
        if (Boolean(a.completed) !== Boolean(b.completed)) {

            return Number(Boolean(a.completed)) -
                   Number(Boolean(b.completed));
        }

        // Sort assignments by earliest due date
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
