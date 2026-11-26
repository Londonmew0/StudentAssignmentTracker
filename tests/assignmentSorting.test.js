
import { describe, it, expect, beforeEach } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const {
    createAssignment,
    changeCompletionStatus,
    deleteAssignment,
    sortAssignments
} = require("../assignmentManager.js");

describe("Assignment Sorting", function() {

    let assignments;

    // Create sample assignments before each test
    beforeEach(function() {

        assignments = [
            createAssignment("History Essay", "History", "2026-12-15", ""),
            createAssignment("Math Homework", "Math", "2026-12-01", ""),
            createAssignment("Java Project", "Java", "2026-12-05", "")
        ];
    });

    // Test 1: Sort assignments by earliest due date
    it("sorts assignments by due date", function() {

        const sorted = sortAssignments(assignments);

        expect(sorted[0].title).toBe("Math Homework");
        expect(sorted[1].title).toBe("Java Project");
        expect(sorted[2].title).toBe("History Essay");
    });

    // Test 2: Completed assignments appear last
    it("places completed assignments after incomplete assignments", function() {

        assignments[1] = changeCompletionStatus(assignments[1]);

        const sorted = sortAssignments(assignments);

        expect(sorted[0].title).toBe("Java Project");
        expect(sorted[1].title).toBe("History Essay");
        expect(sorted[2].title).toBe("Math Homework");
        expect(sorted[2].completed).toBe(true);
    });

    // Test 3: Sort completed assignments by due date
    it("sorts completed assignments by due date", function() {

        assignments = assignments.map(changeCompletionStatus);

        const sorted = sortAssignments(assignments);

        expect(sorted[0].title).toBe("Math Homework");
        expect(sorted[1].title).toBe("Java Project");
        expect(sorted[2].title).toBe("History Essay");
    });

    // Test 4: Preserve the original assignment array
    it("does not modify the original array", function() {

        sortAssignments(assignments);

        expect(assignments[0].title).toBe("History Essay");
        expect(assignments[1].title).toBe("Math Homework");
        expect(assignments[2].title).toBe("Java Project");
    });

    // Test 5: Handle an empty assignment list
    it("returns an empty array when no assignments exist", function() {

        expect(sortAssignments([])).toEqual([]);
    });

    // Test 6: Handle a single assignment
    it("correctly handles one assignment", function() {

        const singleAssignment = [assignments[0]];

        expect(sortAssignments(singleAssignment))
            .toEqual(singleAssignment);
    });

    // Test 7: Reject an invalid assignment list
    it("rejects an invalid assignment list", function() {

        expect(function() {

            sortAssignments(null);

        }).toThrow("Invalid assignment list.");
    });

    // Test 8: Handle assignments with matching due dates
    it("preserves assignments with the same due date", function() {

        assignments[0].dueDate = "2026-12-01";

        const sorted = sortAssignments(assignments);

        expect(sorted).toHaveLength(3);
        expect(sorted[0].dueDate).toBe("2026-12-01");
        expect(sorted[1].dueDate).toBe("2026-12-01");
        expect(sorted[2].dueDate).toBe("2026-12-05");
    });

    // Test 9: Handle older assignments without completion status
    it("treats older assignments as incomplete", function() {

        delete assignments[1].completed;

        assignments[0].completed = true;

        const sorted = sortAssignments(assignments);

        expect(sorted[0].title).toBe("Math Homework");
        expect(sorted[2].title).toBe("History Essay");
    });

    // Test 10: Delete the correct assignment after sorting
    it("deletes the correct assignment after sorting", function() {

        const sorted = sortAssignments(assignments);

        const updated = deleteAssignment(sorted, 0);

        expect(updated).toHaveLength(2);
        expect(updated[0].title).toBe("Java Project");
        expect(updated[1].title).toBe("History Essay");
    });
});
