/**
 * Synthetic demo data for the IntelliCampus Early Alert POC.
 *
 * All student records are fictional. Data is designed to support
 * a compelling K26 demo with a mix of risk tiers, statuses, and
 * lifecycle states including two resolved cases.
 */

export const STUDENTS = [
  { id: "EA-1001", name: "Jamal Williams", tier: "red", program: "Engineering", advisor: "Dr. Sarah Chen", faculty: "Prof. Martinez", signals: 5, status: "New", created: "Mar 14, 2026", gpa: "2.1", prevGpa: "3.2", absences: 6, engDrop: 40, missedAssign: 2, term: "Spring 2026", year: "Sophomore", sid: "STU-20240892", course: "ENGR 201" },
  { id: "EA-1002", name: "Maria Santos", tier: "red", program: "Nursing", advisor: "Dr. James Park", faculty: "Prof. Nguyen", signals: 4, status: "Triaged", created: "Mar 8, 2026", gpa: "1.8", prevGpa: "2.9", absences: 8, engDrop: 55, missedAssign: 3, term: "Spring 2026", year: "Junior", sid: "STU-20230415", course: "NURS 310", prevTier: "yellow", reEvalDate: "Mar 13, 2026" },
  { id: "EA-1003", name: "Tyler Brooks", tier: "yellow", program: "Business", advisor: "Dr. Sarah Chen", faculty: "Prof. Adams", signals: 3, status: "Intervened", created: "Mar 10, 2026", gpa: "2.4", prevGpa: "2.8", absences: 3, engDrop: 20, missedAssign: 1, term: "Spring 2026", year: "Freshman", sid: "STU-20250103", course: "BUS 101" },
  { id: "EA-1004", name: "Aisha Patel", tier: "yellow", program: "Computer Science", advisor: "Dr. Lisa Wong", faculty: "Prof. Chen", signals: 2, status: "Monitoring", created: "Mar 8, 2026", gpa: "2.5", prevGpa: "3.0", absences: 2, engDrop: 15, missedAssign: 0, term: "Spring 2026", year: "Sophomore", sid: "STU-20240556", course: "CS 202" },
  { id: "EA-1005", name: "Kevin O'Brien", tier: "yellow", program: "Psychology", advisor: "Dr. James Park", faculty: "Prof. Rivera", signals: 3, status: "New", created: "Mar 14, 2026", gpa: "2.3", prevGpa: "2.7", absences: 4, engDrop: 25, missedAssign: 1, term: "Spring 2026", year: "Senior", sid: "STU-20220789", course: "PSY 401" },
  { id: "EA-1006", name: "Sofia Rodriguez", tier: "red", program: "Biology", advisor: "Dr. Lisa Wong", faculty: "Prof. Okafor", signals: 6, status: "New", created: "Mar 15, 2026", gpa: "1.5", prevGpa: "3.1", absences: 10, engDrop: 65, missedAssign: 4, term: "Spring 2026", year: "Junior", sid: "STU-20230201", course: "BIO 301" },
  { id: "EA-1007", name: "David Kim", tier: "yellow", program: "Engineering", advisor: "Dr. Sarah Chen", faculty: "Prof. Martinez", signals: 2, status: "Triaged", created: "Mar 12, 2026", gpa: "2.6", prevGpa: "3.1", absences: 2, engDrop: 18, missedAssign: 0, term: "Spring 2026", year: "Freshman", sid: "STU-20250067", course: "ENGR 101" },
  { id: "EA-1008", name: "Emma Thompson", tier: "yellow", program: "English", advisor: "Dr. James Park", faculty: "Prof. Williams", signals: 2, status: "Monitoring", created: "Mar 6, 2026", gpa: "2.4", prevGpa: "2.9", absences: 3, engDrop: 12, missedAssign: 1, term: "Spring 2026", year: "Sophomore", sid: "STU-20240330", course: "ENG 220" },
  { id: "EA-0994", name: "Rachel Foster", tier: "green", program: "Psychology", advisor: "Dr. James Park", faculty: "Prof. Rivera", signals: 3, status: "Resolved", created: "Feb 12, 2026", gpa: "2.9", prevGpa: "2.3", absences: 1, engDrop: 5, missedAssign: 0, term: "Spring 2026", year: "Junior", sid: "STU-20230612", course: "PSY 305", outcome: "Improved", resolvedDate: "Mar 10, 2026", prevTier: "yellow" },
  { id: "EA-0987", name: "Marcus Chen", tier: "red", program: "Engineering", advisor: "Dr. Sarah Chen", faculty: "Prof. Martinez", signals: 4, status: "Resolved", created: "Feb 5, 2026", gpa: "1.4", prevGpa: "2.6", absences: 14, engDrop: 72, missedAssign: 5, term: "Spring 2026", year: "Sophomore", sid: "STU-20240198", course: "ENGR 202", outcome: "Withdrawn", resolvedDate: "Mar 3, 2026" },
];

export const TREND_DATA = [
  { week: "Feb 3", red: 12, yellow: 68 },
  { week: "Feb 10", red: 15, yellow: 74 },
  { week: "Feb 17", red: 18, yellow: 82 },
  { week: "Feb 24", red: 22, yellow: 95 },
  { week: "Mar 3", red: 28, yellow: 108 },
  { week: "Mar 10", red: 34, yellow: 118 },
  { week: "Mar 16", red: 38, yellow: 124 },
];
