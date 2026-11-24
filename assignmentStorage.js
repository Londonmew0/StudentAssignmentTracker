
/*
 * Assignment Storage
 *
 * Handles saving and loading assignments.
 * Accepts a storage provider instead of depending
 * directly on browser localStorage.
 */

class AssignmentStorage {

    constructor(storage) {
        this.storage = storage;
        this.key = "assignments";
    }

    // Load saved assignments
    loadAssignments() {
        const savedData = this.storage.getItem(this.key);

        return savedData ? JSON.parse(savedData) : [];
    }

    // Save assignments
    saveAssignments(assignments) {
        this.storage.setItem(
            this.key,
            JSON.stringify(assignments)
        );
    }
}

// Export for automated testing
if (typeof module !== "undefined" && module.exports) {
    module.exports = { AssignmentStorage };
}
