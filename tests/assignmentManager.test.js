
import { describe, it, expect } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const {
    createAssignment,
    changeCompletionStatus
} = require("../assignmentManager.js");

describe("Assignment Manager", function() {

    // Test 1: Create a valid assignment
    it("creates an assignment with the correct information", function() {

        const assignment = createAssignment(
            "Java Homework",
            "Computer Science",
            "2026-12-01",
            "Complete Chapter 5"
        );

        expect(assignment.title).toBe("Java Homework");
        expect(assignment.course).toBe("Computer Science");
        expect(assignment.dueDate).toBe("2026-12-01");
        expect(assignment.description).toBe("Complete Chapter 5");
    });

    // Test 2: New assignments start incomplete
    it("creates new assignments as incomplete", function() {

        const assignment = createAssignment(
            "Math Homework",
            "Math",
            "2026-12-02",
            ""
        );

        expect(assignment.completed).toBe(false);
    });

    // Test 3: Mark an assignment as completed
    it("marks an incomplete assignment as completed", function() {

        const assignment = { completed: false };

        const result = changeCompletionStatus(assignment);

        expect(result.completed).toBe(true);
    });

    // Test 4: Mark an assignment as incomplete
    it("marks a completed assignment as incomplete", function() {

        const assignment = { completed: true };

        const result = changeCompletionStatus(assignment);

        expect(result.completed).toBe(false);
    });

    // Test 5: Preserve existing assignment information
    it("preserves assignment information when changing status", function() {

        const assignment = createAssignment(
            "History Essay",
            "History",
            "2026-12-03",
            "Write three pages"
        );

        const result = changeCompletionStatus(assignment);

        expect(result).toEqual({
            ...assignment,
            completed: true
        });

        expect(assignment.completed).toBe(false);
    });

    // Test 6: Reject an empty assignment title
    it("rejects an assignment without a title", function() {

        expect(function() {
            createAssignment("", "Math", "2026-12-01", "");
        }).toThrow("Assignment title and due date are required.");
    });

    // Test 7: Reject a missing due date
    it("rejects an assignment without a due date", function() {

        expect(function() {
            createAssignment("Homework", "Math", "", "");
        }).toThrow("Assignment title and due date are required.");
    });

    // Test 8: Reject an invalid assignment
    it("rejects an invalid assignment", function() {

        expect(function() {
            changeCompletionStatus(null);
        }).toThrow("Invalid assignment.");
    });

    // Test 9: Support assignments saved during Sprint 1
    it("supports older assignments without a completion property", function() {

        const assignment = {
            title: "Old Homework"
        };

        const result = changeCompletionStatus(assignment);

        expect(result.completed).toBe(true);
    });
});
