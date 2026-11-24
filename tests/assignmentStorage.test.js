
import { describe, it, expect, beforeEach } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const { AssignmentStorage } = require("../assignmentStorage.js");

const {
    createAssignment,
    changeCompletionStatus
} = require("../assignmentManager.js");

// Create fake storage for automated testing
function createFakeStorage() {

    const data = new Map();

    return {
        getItem(key) {
            return data.has(key) ? data.get(key) : null;
        },

        setItem(key, value) {
            data.set(key, String(value));
        }
    };
}

describe("Assignment Storage", function() {

    let fakeStorage;
    let assignmentStorage;

    // Create fresh storage before each test
    beforeEach(function() {

        fakeStorage = createFakeStorage();

        assignmentStorage = new AssignmentStorage(fakeStorage);
    });

    // Test 1: Load empty storage
    it("returns an empty list when no assignments exist", function() {

        expect(assignmentStorage.loadAssignments()).toEqual([]);
    });

    // Test 2: Save and load an assignment
    it("saves and loads an assignment correctly", function() {

        const assignments = [
            createAssignment(
                "Java Homework",
                "Computer Science",
                "2026-12-01",
                "Complete Chapter 5"
            )
        ];

        assignmentStorage.saveAssignments(assignments);

        expect(assignmentStorage.loadAssignments())
            .toEqual(assignments);
    });

    // Test 3: Save multiple assignments
    it("saves multiple assignments", function() {

        const assignments = [
            createAssignment("Homework 1", "Math", "2026-12-01", ""),
            createAssignment("Homework 2", "Java", "2026-12-02", "")
        ];

        assignmentStorage.saveAssignments(assignments);

        expect(assignmentStorage.loadAssignments()).toHaveLength(2);
    });

    // Test 4: Preserve completed status after reloading
    it("preserves completed status after reloading", function() {

        const assignment = createAssignment(
            "History Essay",
            "History",
            "2026-12-03",
            ""
        );

        const completedAssignment = changeCompletionStatus(assignment);

        assignmentStorage.saveAssignments([completedAssignment]);

        const reloadedStorage = new AssignmentStorage(fakeStorage);

        const savedAssignments = reloadedStorage.loadAssignments();

        expect(savedAssignments[0].completed).toBe(true);
    });

    // Test 5: Preserve incomplete status after reloading
    it("preserves incomplete status after reloading", function() {

        const assignment = {
            title: "Math Homework",
            completed: true
        };

        const incompleteAssignment = changeCompletionStatus(assignment);

        assignmentStorage.saveAssignments([incompleteAssignment]);

        const reloadedStorage = new AssignmentStorage(fakeStorage);

        expect(reloadedStorage.loadAssignments()[0].completed)
            .toBe(false);
    });

    // Test 6: Save an empty assignment list
    it("can save an empty assignment list", function() {

        assignmentStorage.saveAssignments([
            { title: "Old Homework" }
        ]);

        assignmentStorage.saveAssignments([]);

        expect(assignmentStorage.loadAssignments()).toEqual([]);
    });
});
