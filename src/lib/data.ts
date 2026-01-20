export type Role = "teacher" | "student" | "admin";

export interface Student {
  id: string;
  name: string;
  classId: string;
  parentName: string;
  parentPhone: string;
  transportRoute?: string;
  attendance: AttendanceRecord[];
  homework: HomeworkSubmission[];
}

export interface Teacher {
  id: string;
  name: string;
  assignments: {
    classId: string;
    subjectId: string;
  }[];
}

export interface Class {
  id: string;
  name: string;
  section: string;
  studentIds: string[];
  timetable: Period[];
  students?: Student[]; // Option to include full student objects
}

export interface Subject {
  id: string;
  name: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  completed: boolean;
  completedDate?: string;
}

export interface Period {
  id: string;
  periodNumber: number;
  subjectId: string;
  classId: string;
  lessonId?: string;
}

export interface AttendanceRecord {
  date: string;
  present: boolean;
}

export interface Homework {
  id: string;
  classId: string;
  subjectId: string;
  title: string;
  description: string;
  dueDate: string;
}

export interface HomeworkSubmission {
  homeworkId: string;
  studentId: string;
  submittedAt: string;
  content: string;
  reviewed: boolean;
}

export interface FeeStructure {
  id: string;
  classId: string;
  totalFee: number;
  dueDate: string;
}

export interface FeePayment {
  id: string;
  studentId: string;
  amount: number;
  paidAt: string;
}

export interface TransportRoute {
  id: string;
  name: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  pickupPoint: string;
  dropPoint: string;
  studentIds: string[];
}

export interface Activity {
  id: string;
  title: string;
  type: "quiz" | "drawing" | "recitation" | "other";
  classId: string;
  date: string;
}

export interface Certificate {
  id: string;
  studentId: string;
  title: string;
  type: "lesson" | "activity";
  date: string;
}

// Dummy Data
export const subjects: Subject[] = [
  {
    id: "subj-1",
    name: "Mathematics",
    lessons: [
      { id: "les-1", number: 1, title: "Numbers 1-100", completed: false },
      { id: "les-2", number: 2, title: "Addition", completed: false },
      { id: "les-3", number: 3, title: "Subtraction", completed: false },
    ],
  },
  {
    id: "subj-2",
    name: "English",
    lessons: [
      { id: "les-4", number: 1, title: "Alphabet", completed: false },
      { id: "les-5", number: 2, title: "Simple Words", completed: false },
      { id: "les-6", number: 3, title: "Sentences", completed: false },
    ],
  },
];

export const teacher: Teacher = {
  id: "teacher-1",
  name: "Mrs. Smith",
  assignments: [
    { classId: "class-1", subjectId: "subj-2" }, // English for Class 3-A
    { classId: "class-2", subjectId: "subj-1" }, // Mathematics for Class 2
  ],
};

export const students: Student[] = [
  {
    id: "stud-1",
    name: "Aarav Sharma",
    classId: "class-1",
    parentName: "Mr. Sharma",
    parentPhone: "9876543210",
    transportRoute: "route-1",
    attendance: [
      { date: "2026-01-15", present: true },
      { date: "2026-01-16", present: true },
      { date: "2026-01-17", present: false },
    ],
    homework: [],
  },
  {
    id: "stud-2",
    name: "Priya Patel",
    classId: "class-1",
    parentName: "Mr. Patel",
    parentPhone: "9876543211",
    attendance: [
      { date: "2026-01-15", present: true },
      { date: "2026-01-16", present: false },
      { date: "2026-01-17", present: true },
    ],
    homework: [],
  },
  {
    id: "stud-3",
    name: "Rahul Kumar",
    classId: "class-1",
    parentName: "Mrs. Kumar",
    parentPhone: "9876543212",
    transportRoute: "route-1",
    attendance: [
      { date: "2026-01-15", present: true },
      { date: "2026-01-16", present: true },
      { date: "2026-01-17", present: true },
    ],
    homework: [],
  },
  {
    id: "stud-4",
    name: "Sneha Reddy",
    classId: "class-1",
    parentName: "Mr. Reddy",
    parentPhone: "9876543213",
    attendance: [
      { date: "2026-01-15", present: true },
      { date: "2026-01-16", present: true },
      { date: "2026-01-17", present: true },
    ],
    homework: [],
  },
  {
    id: "stud-5",
    name: "Vikram Singh",
    classId: "class-1",
    parentName: "Mrs. Singh",
    parentPhone: "9876543214",
    transportRoute: "route-1",
    attendance: [
      { date: "2026-01-15", present: true },
      { date: "2026-01-16", present: true },
      { date: "2026-01-17", present: false },
    ],
    homework: [],
  },
];

export const classes: Class[] = [
  {
    id: "class-1",
    name: "Class 3",
    section: "A",
    studentIds: students.map((s) => s.id),
    timetable: [
      { id: "per-1", periodNumber: 1, subjectId: "subj-1", classId: "class-1" },
      { id: "per-2", periodNumber: 2, subjectId: "subj-2", classId: "class-1" },
      { id: "per-3", periodNumber: 3, subjectId: "subj-1", classId: "class-1" },
    ],
  },
];

export const homework: Homework[] = [
  {
    id: "hw-1",
    classId: "class-1",
    subjectId: "subj-1",
    title: "Practice Addition",
    description: "Solve page 10, exercises 1-5",
    dueDate: "2026-01-20",
  },
  {
    id: "hw-2",
    classId: "class-1",
    subjectId: "subj-2",
    title: "Write Alphabet",
    description: "Write A-Z five times in notebook",
    dueDate: "2026-01-21",
  },
];

export const feeStructure: FeeStructure = {
  id: "fee-1",
  classId: "class-1",
  totalFee: 12000,
  dueDate: "2026-04-30",
};

export const feePayments: FeePayment[] = [
  { id: "pay-1", studentId: "stud-1", amount: 6000, paidAt: "2026-01-10" },
  { id: "pay-2", studentId: "stud-2", amount: 12000, paidAt: "2026-01-05" },
  { id: "pay-3", studentId: "stud-3", amount: 12000, paidAt: "2026-01-08" },
  { id: "pay-4", studentId: "stud-4", amount: 3000, paidAt: "2026-01-12" },
];

export const transportRoutes: TransportRoute[] = [
  {
    id: "route-1",
    name: "Route A - North",
    vehicleNumber: "MH-12-AB-1234",
    driverName: "Mr. Kumar",
    driverPhone: "9988776655",
    pickupPoint: "Main Gate",
    dropPoint: "School",
    studentIds: ["stud-1", "stud-3", "stud-5"],
  },
];

export const activities: Activity[] = [
  {
    id: "act-1",
    title: "Math Quiz",
    type: "quiz",
    classId: "class-1",
    date: "2026-01-25",
  },
  {
    id: "act-2",
    title: "Drawing Competition",
    type: "drawing",
    classId: "class-1",
    date: "2026-01-30",
  },
];

export const certificates: Certificate[] = [];

// Today's timetable
export const getTodayTimetable = (classId: string): Period[] => {
  return classes.find((c) => c.id === classId)?.timetable || [];
};

// Get subject name
export const getSubjectName = (subjectId: string): string => {
  return subjects.find((s) => s.id === subjectId)?.name || "Unknown";
};

// Get lesson details
export const getLesson = (subjectId: string, lessonId: string) => {
  return subjects
    .find((s) => s.id === subjectId)
    ?.lessons.find((l) => l.id === lessonId);
};

// Get student by ID
export const getStudent = (studentId: string): Student | undefined => {
  return students.find((s) => s.id === studentId);
};

// Get class by ID
export const getClass = (classId: string): Class | undefined => {
  return classes.find((c) => c.id === classId);
};

// Get homework for class
export const getHomework = (classId: string): Homework[] => {
  return homework.filter((h) => h.classId === classId);
};

// Get student payment status
export const getStudentFeeStatus = (studentId: string) => {
  const paid = feePayments
    .filter((p) => p.studentId === studentId)
    .reduce((sum, p) => sum + p.amount, 0);
  const total = feeStructure.totalFee;
  return {
    total,
    paid,
    due: total - paid,
    isPaid: paid >= total,
  };
};

// Get student transport route
export const getStudentTransport = (
  studentId: string,
): TransportRoute | undefined => {
  const student = students.find((s) => s.id === studentId);
  if (!student?.transportRoute) return undefined;
  return transportRoutes.find((r) => r.id === student.transportRoute);
};

// Faculty Helpers
export const getTeacher = (teacherId: string): Teacher => {
  return teacher; // Simple stub for now since only one teacher exists
};

export const getTeacherClasses = (teacherId: string): Class[] => {
  const teacher = getTeacher(teacherId);
  return classes.filter((c) => teacher.assignments.some(a => a.classId === c.id));
};

export const getTeacherSubject = (teacherId: string, classId: string): string => {
  const teacher = getTeacher(teacherId);
  const assignment = teacher.assignments.find(a => a.classId === classId);
  return assignment ? getSubjectName(assignment.subjectId) : "Substitute";
};

export const getTeacherTimetable = (teacherId: string): Period[] => {
  return classes[0].timetable; // Simplified stub
};

export interface ClassSyllabus {
   classId: string;
   className: string;
   subjects: {
      subjectId: string;
      name: string;
      progress: number;
   }[];
}

export const getAllClassSyllabusProgress = (): ClassSyllabus[] => {
   return [
      {
         classId: "class-1",
         className: "Class 1",
         subjects: [
            { subjectId: "subj-1", name: "Mathematics", progress: 85 },
            { subjectId: "subj-2", name: "English", progress: 92 },
            { subjectId: "subj-3", name: "Science", progress: 40 },
         ]
      },
      {
         classId: "class-2",
         className: "Class 2",
         subjects: [
            { subjectId: "subj-1", name: "Mathematics", progress: 65 },
            { subjectId: "subj-2", name: "English", progress: 78 },
            { subjectId: "subj-3", name: "Science", progress: 55 },
         ]
      },
      {
         classId: "class-3",
         className: "Class 3",
         subjects: [
            { subjectId: "subj-1", name: "Mathematics", progress: 92 },
            { subjectId: "subj-2", name: "English", progress: 88 },
            { subjectId: "subj-3", name: "Science", progress: 75 },
         ]
      },
      {
         classId: "class-4",
         className: "Class 4",
         subjects: [
            { subjectId: "subj-1", name: "Mathematics", progress: 50 },
            { subjectId: "subj-2", name: "English", progress: 62 },
            { subjectId: "subj-3", name: "Science", progress: 45 },
         ]
      },
      {
         classId: "class-5",
         className: "Class 5",
         subjects: [
            { subjectId: "subj-1", name: "Mathematics", progress: 30 },
            { subjectId: "subj-2", name: "English", progress: 45 },
            { subjectId: "subj-3", name: "Science", progress: 35 },
         ]
      }
   ];
};
