import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Student,
  Teacher,
  Class,
  Subject,
  Lesson,
  Period,
  AttendanceRecord,
  Homework,
  HomeworkSubmission,
  FeeStructure,
  FeePayment,
  TransportRoute,
  Activity,
  Certificate,
  Role,
} from "./data";

// Extended interfaces for demo functionality
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

export interface SchoolSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  academicYear: string;
  workingDays: string[];
  schoolTimings: {
    start: string;
    end: string;
  };
  feeReminderDays: number;
  enableNotifications: boolean;
  enableSmsAlerts: boolean;
}

// Demo data with more comprehensive records
const initialStudents: Student[] = [
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
      { date: "2026-01-18", present: true },
      { date: "2026-01-19", present: true },
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
      { date: "2026-01-18", present: true },
      { date: "2026-01-19", present: false },
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
      { date: "2026-01-18", present: false },
      { date: "2026-01-19", present: true },
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
      { date: "2026-01-18", present: true },
      { date: "2026-01-19", present: true },
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
      { date: "2026-01-18", present: true },
      { date: "2026-01-19", present: false },
    ],
    homework: [],
  },
  // Add more students for other classes
  {
    id: "stud-6",
    name: "Ananya Gupta",
    classId: "class-2",
    parentName: "Mr. Gupta",
    parentPhone: "9876543215",
    attendance: [
      { date: "2026-01-15", present: true },
      { date: "2026-01-16", present: true },
      { date: "2026-01-17", present: true },
    ],
    homework: [],
  },
];

const initialTeachers: Teacher[] = [
  {
    id: "teacher-1",
    name: "Mrs. Smith",
    assignments: [
      { classId: "class-1", subjectId: "subj-1" }, // Math for Class 3-A
      { classId: "class-2", subjectId: "subj-2" }, // English for Class 2
    ],
  },
  {
    id: "teacher-2",
    name: "Mr. Johnson",
    assignments: [
      { classId: "class-1", subjectId: "subj-2" }, // English for Class 3-A
      { classId: "class-3", subjectId: "subj-1" }, // Math for Class 4
    ],
  },
  {
    id: "teacher-3",
    name: "Mrs. Davis",
    assignments: [
      { classId: "class-2", subjectId: "subj-3" }, // Science for Class 2
      { classId: "class-4", subjectId: "subj-3" }, // Science for Class 5
    ],
  },
];

const initialClasses: Class[] = [
  {
    id: "class-1",
    name: "Class 3",
    section: "A",
    studentIds: ["stud-1", "stud-2", "stud-3", "stud-4", "stud-5"],
    timetable: [
      { id: "per-1", periodNumber: 1, subjectId: "subj-1", classId: "class-1" },
      { id: "per-2", periodNumber: 2, subjectId: "subj-2", classId: "class-1" },
      { id: "per-3", periodNumber: 3, subjectId: "subj-1", classId: "class-1" },
      { id: "per-4", periodNumber: 4, subjectId: "subj-3", classId: "class-1" },
      { id: "per-5", periodNumber: 5, subjectId: "subj-1", classId: "class-1" },
    ],
  },
  {
    id: "class-2",
    name: "Class 2",
    section: "A",
    studentIds: ["stud-6"],
    timetable: [
      { id: "per-6", periodNumber: 1, subjectId: "subj-2", classId: "class-2" },
      { id: "per-7", periodNumber: 2, subjectId: "subj-1", classId: "class-2" },
      { id: "per-8", periodNumber: 3, subjectId: "subj-3", classId: "class-2" },
    ],
  },
  {
    id: "class-3",
    name: "Class 4",
    section: "B",
    studentIds: [],
    timetable: [
      { id: "per-9", periodNumber: 1, subjectId: "subj-1", classId: "class-3" },
      {
        id: "per-10",
        periodNumber: 2,
        subjectId: "subj-2",
        classId: "class-3",
      },
    ],
  },
  {
    id: "class-4",
    name: "Class 5",
    section: "A",
    studentIds: [],
    timetable: [
      {
        id: "per-11",
        periodNumber: 1,
        subjectId: "subj-3",
        classId: "class-4",
      },
      {
        id: "per-12",
        periodNumber: 2,
        subjectId: "subj-1",
        classId: "class-4",
      },
    ],
  },
];

const initialSubjects: Subject[] = [
  {
    id: "subj-1",
    name: "Mathematics",
    lessons: [
      { id: "les-1", number: 1, title: "Numbers 1-100", completed: false },
      { id: "les-2", number: 2, title: "Addition", completed: false },
      { id: "les-3", number: 3, title: "Subtraction", completed: false },
      { id: "les-4", number: 4, title: "Multiplication", completed: true },
      { id: "les-5", number: 5, title: "Division", completed: false },
    ],
  },
  {
    id: "subj-2",
    name: "English",
    lessons: [
      { id: "les-6", number: 1, title: "Alphabet", completed: true },
      { id: "les-7", number: 2, title: "Simple Words", completed: true },
      { id: "les-8", number: 3, title: "Sentences", completed: false },
      { id: "les-9", number: 4, title: "Grammar", completed: false },
    ],
  },
  {
    id: "subj-3",
    name: "Science",
    lessons: [
      { id: "les-10", number: 1, title: "Plants", completed: true },
      { id: "les-11", number: 2, title: "Animals", completed: false },
      { id: "les-12", number: 3, title: "Human Body", completed: false },
    ],
  },
];

const initialHomework: Homework[] = [
  {
    id: "hw-1",
    classId: "class-1",
    subjectId: "subj-1",
    title: "Practice Addition",
    description:
      "Solve page 10, exercises 1-5 from the textbook. Show all working steps.",
    dueDate: "2026-01-25",
  },
  {
    id: "hw-2",
    classId: "class-1",
    subjectId: "subj-2",
    title: "Write Alphabet",
    description:
      "Write A-Z five times in your notebook. Focus on proper letter formation.",
    dueDate: "2026-01-26",
  },
  {
    id: "hw-3",
    classId: "class-2",
    subjectId: "subj-2",
    title: "Reading Comprehension",
    description:
      "Read the story on page 15 and answer the questions at the end.",
    dueDate: "2026-01-24",
  },
];

const initialHomeworkSubmissions: HomeworkSubmission[] = [
  {
    id: "sub-1",
    homeworkId: "hw-1",
    studentId: "stud-1",
    submittedAt: "2026-01-23T10:30:00Z",
    content: "Completed all exercises with detailed working steps.",
    reviewed: true,
  },
  {
    id: "sub-2",
    homeworkId: "hw-2",
    studentId: "stud-1",
    submittedAt: "2026-01-24T14:15:00Z",
    content: "Wrote alphabet five times with neat handwriting.",
    reviewed: true,
  },
];

const initialActivities: Activity[] = [
  {
    id: "act-1",
    title: "Math Quiz - Addition & Subtraction",
    type: "quiz",
    classId: "class-1",
    date: "2026-01-25",
  },
  {
    id: "act-2",
    title: "Drawing Competition - My Favorite Animal",
    type: "drawing",
    classId: "class-1",
    date: "2026-01-30",
  },
  {
    id: "act-3",
    title: "Poetry Recitation",
    type: "recitation",
    classId: "class-2",
    date: "2026-02-02",
  },
];

const initialCertificates: Certificate[] = [
  {
    id: "cert-1",
    studentId: "stud-1",
    title: "Mathematics Excellence",
    type: "lesson",
    date: "2026-01-20",
  },
  {
    id: "cert-2",
    studentId: "stud-2",
    title: "Perfect Attendance - January",
    type: "activity",
    date: "2026-01-31",
  },
];

const initialUsers: User[] = [
  {
    id: "admin-1",
    name: "Principal Johnson",
    email: "principal@school.com",
    role: "admin",
    phone: "9876543200",
    createdAt: "2026-01-01T00:00:00Z",
    lastLogin: "2026-01-20T09:00:00Z",
  },
  {
    id: "teacher-1",
    name: "Mrs. Smith",
    email: "smith@school.com",
    role: "teacher",
    phone: "9876543201",
    createdAt: "2026-01-01T00:00:00Z",
    lastLogin: "2026-01-20T08:30:00Z",
  },
  {
    id: "teacher-2",
    name: "Mr. Johnson",
    email: "johnson@school.com",
    role: "teacher",
    phone: "9876543202",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "stud-1",
    name: "Aarav Sharma",
    email: "aarav@school.com",
    role: "student",
    phone: "9876543210",
    createdAt: "2026-01-01T00:00:00Z",
  },
];

const initialNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "teacher-1",
    title: "Homework Due Reminder",
    message:
      "Math homework for Class 3-A is due tomorrow. 3 students haven't submitted yet.",
    type: "warning",
    read: false,
    createdAt: "2026-01-19T16:00:00Z",
  },
  {
    id: "notif-2",
    userId: "stud-1",
    title: "Certificate Awarded",
    message:
      "Congratulations! You have been awarded the Mathematics Excellence certificate.",
    type: "success",
    read: false,
    createdAt: "2026-01-20T10:00:00Z",
  },
];

const initialSettings: SchoolSettings = {
  name: "Global Academy",
  address: "123 Education Street, Knowledge City, KC 12345",
  phone: "+1-234-567-8900",
  email: "info@globalacademy.edu",
  academicYear: "2025-2026",
  workingDays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  schoolTimings: {
    start: "08:00",
    end: "15:00",
  },
  feeReminderDays: 7,
  enableNotifications: true,
  enableSmsAlerts: true,
};

interface SchoolStore {
  // Data
  students: Student[];
  teachers: Teacher[];
  classes: Class[];
  subjects: Subject[];
  homework: Homework[];
  homeworkSubmissions: HomeworkSubmission[];
  activities: Activity[];
  certificates: Certificate[];
  users: User[];
  notifications: Notification[];
  settings: SchoolSettings;

  // Transport & Fees
  transportRoutes: TransportRoute[];
  feeStructures: FeeStructure[];
  feePayments: FeePayment[];

  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;

  // Actions
  login: (role: Role) => void;
  logout: () => void;

  // Student actions
  addStudent: (student: Omit<Student, "id">) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  // Teacher actions
  addTeacher: (teacher: Omit<Teacher, "id">) => void;
  updateTeacher: (id: string, updates: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;

  // Class actions
  addClass: (cls: Omit<Class, "id">) => void;
  updateClass: (id: string, updates: Partial<Class>) => void;
  deleteClass: (id: string) => void;

  // Homework actions
  addHomework: (homework: Omit<Homework, "id">) => void;
  updateHomework: (id: string, updates: Partial<Homework>) => void;
  deleteHomework: (id: string) => void;
  submitHomework: (submission: Omit<HomeworkSubmission, "id">) => void;

  // Attendance actions
  markAttendance: (studentId: string, date: string, present: boolean) => void;
  bulkMarkAttendance: (
    classId: string,
    date: string,
    attendance: Record<string, boolean>,
  ) => void;

  // Activity actions
  addActivity: (activity: Omit<Activity, "id">) => void;
  updateActivity: (id: string, updates: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;

  // Notification actions
  addNotification: (notification: Omit<Notification, "id">) => void;
  markNotificationAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;

  // Utility functions
  getStudentById: (id: string) => Student | undefined;
  getTeacherById: (id: string) => Teacher | undefined;
  getClassById: (id: string) => Class | undefined;
  getHomeworkById: (id: string) => Homework | undefined;
  getStudentsByClass: (classId: string) => Student[];
  getHomeworkByClass: (classId: string) => Homework[];
  getAttendanceForStudent: (studentId: string) => AttendanceRecord[];
  getNotificationsForUser: (userId: string) => Notification[];
}

export const useSchoolStore = create<SchoolStore>()(
  persist(
    (set, get) => ({
      // Initial data
      students: initialStudents,
      teachers: initialTeachers,
      classes: initialClasses,
      subjects: initialSubjects,
      homework: initialHomework,
      homeworkSubmissions: initialHomeworkSubmissions,
      activities: initialActivities,
      certificates: initialCertificates,
      users: initialUsers,
      notifications: initialNotifications,
      settings: initialSettings,

      // Transport & Fees (keeping existing demo data)
      transportRoutes: [
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
      ],
      feeStructures: [
        {
          id: "fee-1",
          classId: "class-1",
          totalFee: 12000,
          dueDate: "2026-04-30",
        },
      ],
      feePayments: [
        {
          id: "pay-1",
          studentId: "stud-1",
          amount: 6000,
          paidAt: "2026-01-10",
        },
        {
          id: "pay-2",
          studentId: "stud-2",
          amount: 12000,
          paidAt: "2026-01-05",
        },
        {
          id: "pay-3",
          studentId: "stud-3",
          amount: 12000,
          paidAt: "2026-01-08",
        },
        {
          id: "pay-4",
          studentId: "stud-4",
          amount: 3000,
          paidAt: "2026-01-12",
        },
      ],

      // Auth state
      currentUser: null,
      isAuthenticated: false,

      // Auth actions
      login: (role: Role) => {
        const user = get().users.find((u) => u.role === role);
        if (user) {
          set({ currentUser: user, isAuthenticated: true });
          // Update last login
          set((state) => ({
            users: state.users.map((u) =>
              u.id === user.id
                ? { ...u, lastLogin: new Date().toISOString() }
                : u,
            ),
          }));
        }
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      },

      // Student actions
      addStudent: (studentData) => {
        const newStudent: Student = {
          ...studentData,
          id: `stud-${Date.now()}`,
          attendance: [],
          homework: [],
        };
        set((state) => ({
          students: [...state.students, newStudent],
          users: [
            ...state.users,
            {
              id: newStudent.id,
              name: newStudent.name,
              email: `${newStudent.name.toLowerCase().replace(" ", ".")}@school.com`,
              role: "student",
              phone: newStudent.parentPhone,
              createdAt: new Date().toISOString(),
            },
          ],
        }));
      },

      updateStudent: (id, updates) => {
        set((state) => ({
          students: state.students.map((student) =>
            student.id === id ? { ...student, ...updates } : student,
          ),
        }));
      },

      deleteStudent: (id) => {
        set((state) => ({
          students: state.students.filter((student) => student.id !== id),
          classes: state.classes.map((cls) => ({
            ...cls,
            studentIds: cls.studentIds.filter((studentId) => studentId !== id),
          })),
          users: state.users.filter((user) => user.id !== id),
        }));
      },

      // Teacher actions
      addTeacher: (teacherData) => {
        const newTeacher: Teacher = {
          ...teacherData,
          id: `teacher-${Date.now()}`,
        };
        set((state) => ({
          teachers: [...state.teachers, newTeacher],
          users: [
            ...state.users,
            {
              id: newTeacher.id,
              name: newTeacher.name,
              email: `${newTeacher.name.toLowerCase().replace(" ", ".")}@school.com`,
              role: "teacher",
              createdAt: new Date().toISOString(),
            },
          ],
        }));
      },

      updateTeacher: (id, updates) => {
        set((state) => ({
          teachers: state.teachers.map((teacher) =>
            teacher.id === id ? { ...teacher, ...updates } : teacher,
          ),
        }));
      },

      deleteTeacher: (id) => {
        set((state) => ({
          teachers: state.teachers.filter((teacher) => teacher.id !== id),
          users: state.users.filter((user) => user.id !== id),
        }));
      },

      // Class actions
      addClass: (classData) => {
        const newClass: Class = {
          ...classData,
          id: `class-${Date.now()}`,
        };
        set((state) => ({
          classes: [...state.classes, newClass],
        }));
      },

      updateClass: (id, updates) => {
        set((state) => ({
          classes: state.classes.map((cls) =>
            cls.id === id ? { ...cls, ...updates } : cls,
          ),
        }));
      },

      deleteClass: (id) => {
        set((state) => ({
          classes: state.classes.filter((cls) => cls.id !== id),
          students: state.students.map((student) =>
            student.classId === id ? { ...student, classId: "" } : student,
          ),
        }));
      },

      // Homework actions
      addHomework: (homeworkData) => {
        const newHomework: Homework = {
          ...homeworkData,
          id: `hw-${Date.now()}`,
        };
        set((state) => ({
          homework: [...state.homework, newHomework],
        }));
      },

      updateHomework: (id, updates) => {
        set((state) => ({
          homework: state.homework.map((hw) =>
            hw.id === id ? { ...hw, ...updates } : hw,
          ),
        }));
      },

      deleteHomework: (id) => {
        set((state) => ({
          homework: state.homework.filter((hw) => hw.id !== id),
          homeworkSubmissions: state.homeworkSubmissions.filter(
            (sub) => sub.homeworkId !== id,
          ),
        }));
      },

      submitHomework: (submissionData) => {
        const newSubmission: HomeworkSubmission = {
          ...submissionData,
          id: `sub-${Date.now()}`,
        };
        set((state) => ({
          homeworkSubmissions: [...state.homeworkSubmissions, newSubmission],
        }));
      },

      // Attendance actions
      markAttendance: (studentId, date, present) => {
        set((state) => ({
          students: state.students.map((student) => {
            if (student.id === studentId) {
              const existingRecordIndex = student.attendance.findIndex(
                (record) => record.date === date,
              );
              if (existingRecordIndex >= 0) {
                // Update existing record
                const updatedAttendance = [...student.attendance];
                updatedAttendance[existingRecordIndex] = { date, present };
                return { ...student, attendance: updatedAttendance };
              } else {
                // Add new record
                return {
                  ...student,
                  attendance: [...student.attendance, { date, present }],
                };
              }
            }
            return student;
          }),
        }));
      },

      bulkMarkAttendance: (classId, date, attendance) => {
        Object.entries(attendance).forEach(([studentId, present]) => {
          get().markAttendance(studentId, date, present);
        });
      },

      // Activity actions
      addActivity: (activityData) => {
        const newActivity: Activity = {
          ...activityData,
          id: `act-${Date.now()}`,
        };
        set((state) => ({
          activities: [...state.activities, newActivity],
        }));
      },

      updateActivity: (id, updates) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id ? { ...activity, ...updates } : activity,
          ),
        }));
      },

      deleteActivity: (id) => {
        set((state) => ({
          activities: state.activities.filter((activity) => activity.id !== id),
        }));
      },

      // Notification actions
      addNotification: (notificationData) => {
        const newNotification: Notification = {
          ...notificationData,
          id: `notif-${Date.now()}`,
        };
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));
      },

      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notif) =>
            notif.id === id ? { ...notif, read: true } : notif,
          ),
        }));
      },

      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((notif) => notif.id !== id),
        }));
      },

      // Utility functions
      getStudentById: (id) => {
        return get().students.find((student) => student.id === id);
      },

      getTeacherById: (id) => {
        return get().teachers.find((teacher) => teacher.id === id);
      },

      getClassById: (id) => {
        return get().classes.find((cls) => cls.id === id);
      },

      getHomeworkById: (id) => {
        return get().homework.find((hw) => hw.id === id);
      },

      getStudentsByClass: (classId) => {
        return get().students.filter((student) => student.classId === classId);
      },

      getHomeworkByClass: (classId) => {
        return get().homework.filter((hw) => hw.classId === classId);
      },

      getAttendanceForStudent: (studentId) => {
        const student = get().students.find((s) => s.id === studentId);
        return student?.attendance || [];
      },

      getNotificationsForUser: (userId) => {
        return get().notifications.filter((notif) => notif.userId === userId);
      },
    }),
    {
      name: "school-store",
      // Only persist certain data to avoid bloat
      partialize: (state) => ({
        students: state.students,
        teachers: state.teachers,
        classes: state.classes,
        homework: state.homework,
        homeworkSubmissions: state.homeworkSubmissions,
        activities: state.activities,
        certificates: state.certificates,
        notifications: state.notifications,
        transportRoutes: state.transportRoutes,
        feePayments: state.feePayments,
      }),
    },
  ),
);

// Export utility hooks for specific data
export const useStudents = () => useSchoolStore((state) => state.students);
export const useTeachers = () => useSchoolStore((state) => state.teachers);
export const useClasses = () => useSchoolStore((state) => state.classes);
export const useHomework = () => useSchoolStore((state) => state.homework);
export const useCurrentUser = () =>
  useSchoolStore((state) => state.currentUser);
export const useNotifications = () =>
  useSchoolStore((state) => state.notifications);
