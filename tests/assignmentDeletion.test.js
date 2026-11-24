
import { describe, it, expect, beforeEach } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const {
    createAssignment,
    deleteAssignment
} = require("../assignmentManager.js");

const {
    AssignmentStorage
} = require("../assignmentStorage.js");

describe("Assignment Deletion", function() {

    let assignments;

    // Create three assignments before each test
    beforeEach(function() {

        assignments = [
            createAssignment("Math Homework", "Math", "2026-12-01", ""),
            createAssignment("Java Homework", "Java", "2026-12-02", ""),
            createAssignment("History Essay", "History", "2026-12-03", "")
        ];
    });

    // Test 1: Delete a selected assignment
    it("deletes the selected assignment", function() {

        const updated = deleteAssignment(assignments, 1);

        expect(updated).toHaveLength(2);
        expect(updated[0].title).toBe("Math Homework");
        expect(updated[1].title).toBe("History Essay");
    });

    // Test 2: Delete the first assignment
    it("deletes the first assignment", function() {

        const updated = deleteAssignment(assignments, 0);

        expect(updated).toHaveLength(2);
        expect(updated[0].title).toBe("Java Homework");
    });

    // Test 3: Delete the last assignment
    it("deletes the last assignment", function() {

        const updated = deleteAssignment(assignments, 2);

        expect(updated).toHaveLength(2);
        expect(updated[1].title).toBe("Java Homework");
    });

    // Test 4: Delete the only remaining assignment
    it("returns an empty list after deleting the only assignment", function() {

        const updated = deleteAssignment([assignments[0]], 0);

        expect(updated).toEqual([]);
    });

    // Test 5: Reject a negative index
    it("rejects a negative index", function() {

        expect(function() {

            deleteAssignment(assignments, -1);

        }).toThrow("Invalid assignment index.");
    });

    // Test 6: Reject an index outside the array
    it("rejects an out-of-range index", function() {

        expect(function() {

            deleteAssignment(assignments, 10);

        }).toThrow("Invalid assignment index.");
    });

    // Test 7: Reject an invalid assignment list
    it("rejects an invalid assignment list", function() {

        expect(function() {

            deleteAssignment(null, 0);

        }).toThrow("Invalid assignment list.");
    });

    // Test 8: Preserve the original assignment list
    it("does not modify the original array", function() {

        deleteAssignment(assignments, 1);

        expect(assignments).toHaveLength(3);
        expect(assignments[1].title).toBe("Java Homework");
    });

    // Test 9: Reject deletion from an empty list
    it("rejects deletion from an empty list", function() {

        expect(function() {

            deleteAssignment([], 0);

        }).toThrow("Invalid assignment index.");
    });

    // Test 10: Verify deletion persists in storage
    it("keeps deleted assignments removed after reloading", function() {

        const data = new Map();

        // Create fake storage
        const fakeStorage = {

            getItem(key) {
                return data.has(key) ? data.get(key) : null;
            },

            setItem(key, value) {
                data.set(key, String(value));
            }
        };

        const storage = new AssignmentStorage(fakeStorage);

        // Save the original assignments
        storage.saveAssignments(assignments);

        // Delete the second assignment
        const updated = deleteAssignment(
            storage.loadAssignments(),
            1
        );

        // Save the updated assignments
        storage.saveAssignments(updated);

        // Simulate reloading the website
        const reloadedStorage = new AssignmentStorage(fakeStorage);

        const savedAssignments = reloadedStorage.loadAssignments();

        expect(savedAssignments).toHaveLength(2);

        expect(savedAssignments.map(function(assignment) {

            return assignment.title;

        })).not.toContain("Java Homework");
    });
});
