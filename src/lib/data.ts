export type Role = "teacher" | "student" | "admin" | "principal";

export interface Student {
  id: string;
  admissionNumber: string;
  rollNumber: string;
  name: string;
  classId: string;
  section: string;
  gender: "male" | "female" | "other";
  dob: string;
  aadharNumber?: string;
  bloodGroup?: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  alternatePhone?: string;
  address: string;
  city: string;
  pincode: string;
  transportRoute?: string;
  category: "General" | "SC" | "ST" | "OBC" | "Other";
  religion?: string;
  nationality?: string;
  previousSchool?: string;
  previousClassMarks?: number;
  tcNumber?: string;
  admissionDate: string;
  status: "active" | "inactive" | "transferred" | "passed_out";
  photo?: string;
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
  id: string;
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

// ==================== STAFF MANAGEMENT ====================
export type StaffType = "teaching" | "non_teaching" | "support";
export type LeaveType = "CL" | "EL" | "ML" | "SL" | "PL" | "UL" | "other";
export type StaffStatus = "active" | "inactive" | "on_leave" | "terminated";

export interface Staff {
  id: string;
  employeeId: string;
  name: string;
  role: StaffType;
  designation: string;
  department?: string;
  gender: "male" | "female" | "other";
  dob: string;
  joiningDate: string;
  qualification: string;
  experience: number;
  specializations?: string[];
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  aadharNumber?: string;
  panNumber?: string;
  bankName?: string;
  bankAccount?: string;
  ifscCode?: string;
  salary: number;
  status: StaffStatus;
  photo?: string;
}

export interface StaffAttendance {
  id: string;
  staffId: string;
  date: string;
  inTime?: string;
  outTime?: string;
  status: "present" | "absent" | "late" | "half_day";
  remarks?: string;
}

export interface LeaveApplication {
  id: string;
  staffId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  remarks?: string;
}

export interface PerformanceEvaluation {
  id: string;
  staffId: string;
  evaluationDate: string;
  academicYear: string;
  selfAppraisal: string;
  hodComments?: string;
  principalComments?: string;
  rating: number; // 1-5
  strengths: string[];
  areasForImprovement: string[];
  recommendation: "promote" | "continue" | "warning" | "terminate";
}

export interface Payroll {
  id: string;
  staffId: string;
  month: string;
  year: number;
  basicSalary: number;
  hra: number;
  da: number;
  otherAllowances: number;
  grossSalary: number;
  pf: number;
  tds: number;
  otherDeductions: number;
  netSalary: number;
  paymentDate?: string;
  status: "pending" | "paid";
}

// ==================== STUDENT MANAGEMENT ====================
export interface AdmissionEnquiry {
  id: string;
  studentName: string;
  parentName: string;
  phone: string;
  email?: string;
  classApplied: string;
  previousSchool?: string;
  enquiryDate: string;
  status: "new" | "followed" | "converted" | "lost";
  followUpDate?: string;
  notes?: string;
}

export interface Alumni {
  id: string;
  studentId: string;
  name: string;
  batch: string;
  passingYear: number;
  classId: string;
  currentStatus: "higher_education" | "employed" | "business" | "other";
  occupation?: string;
  organization?: string;
  city?: string;
  email?: string;
  phone?: string;
  achievements?: string;
}

export interface HealthRecord {
  id: string;
  studentId: string;
  bloodGroup: string;
  height: number;
  weight: number;
  allergies: string[];
  medicalConditions: string[];
  medications: string[];
  emergencyContact: string;
  emergencyPhone: string;
  lastCheckupDate?: string;
  doctorName?: string;
  visionLeft?: string;
  visionRight?: string;
  dentalHealth?: string;
}

export interface TransferCertificate {
  id: string;
  studentId: string;
  tcNumber: string;
  issueDate: string;
  reason: string;
  conduct: "good" | "satisfactory" | "average" | "poor";
  lastExamPassed: string;
  subjectsStudied: string[];
  totalWorkingDays: number;
  attendancePercentage: number;
  tcStatus: "applied" | "issued" | "collected";
  collectedBy?: string;
  collectedAt?: string;
}

// ==================== EXAMINATION MANAGEMENT ====================
export interface Exam {
  id: string;
  name: string;
  type: "periodic" | "half_yearly" | "annual" | "pre_board" | "class_test";
  classId: string;
  date: string;
  startTime: string;
  endTime: string;
  examType: string;
  maxMarks: number;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
}

export interface ExamTimetableEntry {
  id: string;
  examId: string;
  subjectId: string;
  date: string;
  startTime: string;
  endTime: string;
  maxMarks: number;
  roomNumber?: string;
  invigilatorId?: string;
}

export interface MarksEntry {
  id: string;
  examId: string;
  studentId: string;
  subjectId: string;
  marks: number;
  maxMarks: number;
  grade?: string;
  enteredBy: string;
  enteredAt: string;
  verified: boolean;
  verifiedBy?: string;
  remarks?: string;
}

export interface Result {
  id: string;
  examName: string;
  class: string;
  totalStudents: number;
  averageMarks: number;
  passPercentage: number;
  status: "pending" | "published" | "under_review";
}

export interface StudentProgress {
  studentId: string;
  academicYear: string;
  classId: string;
  subjects: {
    subjectId: string;
    subjectName: string;
    currentGrade: string;
    previousGrades: string[];
    improvementNeeded: boolean;
  }[];
  overallPercentage: number;
  trend: "improving" | "declining" | "stable";
}

// ==================== LIBRARY MANAGEMENT ====================
export interface Book {
  id: string;
  accessionNumber: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearOfPublication: number;
  edition?: string;
  category: string;
  subcategory?: string;
  price: number;
  rackNumber: string;
  shelfNumber: string;
  totalCopies: number;
  availableCopies: number;
  language: string;
  status: "available" | "issued" | "lost" | "damaged";
}

export interface BookIssue {
  id: string;
  bookId: string;
  studentId?: string;
  staffId?: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fine: number;
  status: "issued" | "returned" | "lost" | "renewed";
  issuedBy: string;
}

export interface BookReservation {
  id: string;
  bookId: string;
  studentId: string;
  reservationDate: string;
  status: "pending" | "available" | "cancelled" | "fulfilled";
}

// ==================== INVENTORY MANAGEMENT ====================
export interface Asset {
  id: string;
  assetCode: string;
  name: string;
  category:
    | "furniture"
    | "electronics"
    | "sports"
    | "lab_equipment"
    | "vehicles"
    | "books"
    | "stationery"
    | "other";
  description?: string;
  purchaseDate: string;
  purchaseValue: number;
  currentValue: number;
  depreciation: number;
  location: string;
  custodian?: string;
  condition: "excellent" | "good" | "fair" | "poor" | "scrapped";
  status: "in_use" | "under_maintenance" | "disposed" | "lost";
  image?: string;
}

export interface StockItem {
  id: string;
  itemCode: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
  minStockLevel: number;
  reorderLevel: number;
  lastRestockedDate?: string;
  costPerUnit: number;
  vendor?: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  date: string;
  vendorId: string;
  items: {
    itemId: string;
    quantity: number;
    rate: number;
    total: number;
  }[];
  totalAmount: number;
  status:
    | "draft"
    | "pending"
    | "approved"
    | "ordered"
    | "received"
    | "cancelled";
  approvedBy?: string;
  approvedAt?: string;
  expectedDelivery?: string;
}

export interface MaintenanceRequest {
  id: string;
  assetId: string;
  requestDate: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  assignedTo?: string;
  completedDate?: string;
  cost?: number;
}

// ==================== COMMUNICATION MANAGEMENT ====================
export interface Notice {
  id: string;
  title: string;
  content: string;
  type: "general" | "academic" | "event" | "urgent" | "holiday" | "exam";
  publishedBy: string;
  publishDate: string;
  expiryDate?: string;
  targetAudience: ("students" | "parents" | "staff" | "all")[];
  attachments?: string[];
  status: "draft" | "published" | "archived";
}

export interface Circular {
  id: string;
  circularNumber: string;
  title: string;
  content: string;
  issuedBy: string;
  issuedDate: string;
  targetAudience: string;
  attachment?: string;
  status: "active" | "superseded" | "archived";
}

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  type: "sms" | "email" | "whatsapp";
  variables: string[];
}

export interface BulkMessage {
  id: string;
  templateId: string;
  message: string;
  sentBy: string;
  sentDate: string;
  targetGroup: "all_parents" | "class" | "staff" | "custom";
  targetIds: string[];
  channel: "sms" | "email" | "whatsapp";
  status: "scheduled" | "sent" | "failed";
  deliveryCount: number;
  failureCount: number;
}

// ==================== EXPENSE MANAGEMENT ====================
export interface Expense {
  id: string;
  expenseDate: string;
  category:
    | "salary"
    | "maintenance"
    | "supplies"
    | "utilities"
    | "transport"
    | "events"
    | "admin"
    | "other";
  description: string;
  amount: number;
  paymentMode: "cash" | "bank" | "upi" | "cheque";
  vendor?: string;
  invoiceNumber?: string;
  approvedBy?: string;
  receipt?: string;
  status: "pending" | "approved" | "paid";
}

export interface Budget {
  id: string;
  academicYear: string;
  category: string;
  budgetedAmount: number;
  spentAmount: number;
  balance: number;
  department?: string;
  status: "draft" | "approved" | "active" | "closed";
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email?: string;
  address: string;
  gstNumber?: string;
  bankDetails?: string;
  rating: number;
  status: "active" | "inactive";
}

// ==================== COMPLIANCE MANAGEMENT ====================
export interface ComplianceItem {
  id: string;
  requirement: string;
  category:
    | "affiliation"
    | "safety"
    | "financial"
    | "academic"
    | "staff"
    | "student";
  dueDate: string;
  status: "pending" | "in_progress" | "completed" | "overdue";
  responsiblePerson?: string;
  documents?: string[];
  notes?: string;
}

// ==================== PARENT PORTAL ====================
export interface ParentAccount {
  id: string;
  parentId: string;
  email: string;
  password: string;
  isActive: boolean;
  lastLogin?: string;
  childrenIds: string[];
  notificationPreferences: {
    attendance: boolean;
    fees: boolean;
    homework: boolean;
    exam: boolean;
    events: boolean;
  };
}

export const students: Student[] = [
  {
    id: "stud-1",
    admissionNumber: "ADM2024001",
    rollNumber: "01",
    name: "Aarav Sharma",
    classId: "class-1",
    section: "A",
    gender: "male",
    dob: "2015-05-15",
    aadharNumber: "1234-5678-9012",
    bloodGroup: "O+",
    parentName: "Mr. Sharma",
    parentPhone: "9876543210",
    parentEmail: "sharma@gmail.com",
    address: "123, Main Street",
    city: "Mumbai",
    pincode: "400001",
    transportRoute: "route-1",
    category: "General",
    admissionDate: "2024-04-01",
    status: "active",
    attendance: [
      { date: "2026-01-15", present: true },
      { date: "2026-01-16", present: true },
      { date: "2026-01-17", present: false },
    ],
    homework: [],
  },
  {
    id: "stud-2",
    admissionNumber: "ADM2024002",
    rollNumber: "02",
    name: "Priya Patel",
    classId: "class-1",
    section: "A",
    gender: "female",
    dob: "2015-08-20",
    bloodGroup: "A+",
    parentName: "Mr. Patel",
    parentPhone: "9876543211",
    parentEmail: "patel@gmail.com",
    address: "456, Oak Avenue",
    city: "Mumbai",
    pincode: "400002",
    category: "OBC",
    admissionDate: "2024-04-01",
    status: "active",
    attendance: [
      { date: "2026-01-15", present: true },
      { date: "2026-01-16", present: false },
      { date: "2026-01-17", present: true },
    ],
    homework: [],
  },
  {
    id: "stud-3",
    admissionNumber: "ADM2024003",
    rollNumber: "03",
    name: "Rahul Kumar",
    classId: "class-1",
    section: "A",
    gender: "male",
    dob: "2015-03-10",
    bloodGroup: "B+",
    parentName: "Mrs. Kumar",
    parentPhone: "9876543212",
    address: "789, Pine Road",
    city: "Mumbai",
    pincode: "400003",
    transportRoute: "route-1",
    category: "General",
    admissionDate: "2024-04-01",
    status: "active",
    attendance: [
      { date: "2026-01-15", present: true },
      { date: "2026-01-16", present: true },
      { date: "2026-01-17", present: true },
    ],
    homework: [],
  },
  {
    id: "stud-4",
    admissionNumber: "ADM2024004",
    rollNumber: "04",
    name: "Sneha Reddy",
    classId: "class-1",
    section: "A",
    gender: "female",
    dob: "2015-07-25",
    bloodGroup: "AB+",
    parentName: "Mr. Reddy",
    parentPhone: "9876543213",
    address: "321, Elm Street",
    city: "Mumbai",
    pincode: "400004",
    category: "SC",
    admissionDate: "2024-04-01",
    status: "active",
    attendance: [
      { date: "2026-01-15", present: true },
      { date: "2026-01-16", present: true },
      { date: "2026-01-17", present: true },
    ],
    homework: [],
  },
  {
    id: "stud-5",
    admissionNumber: "ADM2024005",
    rollNumber: "05",
    name: "Vikram Singh",
    classId: "class-1",
    section: "A",
    gender: "male",
    dob: "2015-11-30",
    bloodGroup: "O-",
    parentName: "Mrs. Singh",
    parentPhone: "9876543214",
    address: "654, Maple Lane",
    city: "Mumbai",
    pincode: "400005",
    transportRoute: "route-1",
    category: "General",
    admissionDate: "2024-04-01",
    status: "active",
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

// Staff dummy data
export const staff: Staff[] = [
  {
    id: "staff-1",
    employeeId: "EMP001",
    name: "Mrs. Sarah Johnson",
    role: "teaching",
    designation: "Senior Teacher",
    department: "Science",
    gender: "female",
    dob: "1985-03-15",
    joiningDate: "2015-06-01",
    qualification: "M.Sc, B.Ed",
    experience: 10,
    specializations: ["Physics", "Chemistry"],
    phone: "9876543201",
    email: "sarah.johnson@school.edu",
    address: "123, Teacher Colony",
    city: "Mumbai",
    pincode: "400010",
    aadharNumber: "1111-2222-3333",
    panNumber: "ABCDE1234F",
    bankName: "State Bank",
    bankAccount: "1234567890",
    ifscCode: "SBIN0001234",
    salary: 65000,
    status: "active",
  },
  {
    id: "staff-2",
    employeeId: "EMP002",
    name: "Mr. Robert Williams",
    role: "teaching",
    designation: "Mathematics Teacher",
    department: "Mathematics",
    gender: "male",
    dob: "1982-07-22",
    joiningDate: "2018-01-15",
    qualification: "M.Sc Mathematics, B.Ed",
    experience: 8,
    specializations: ["Algebra", "Calculus"],
    phone: "9876543202",
    email: "robert.williams@school.edu",
    address: "456, Faculty Block",
    city: "Mumbai",
    pincode: "400011",
    panNumber: "BCDEF2345G",
    bankName: "HDFC Bank",
    bankAccount: "2345678901",
    ifscCode: "HDFC0001234",
    salary: 58000,
    status: "active",
  },
  {
    id: "staff-3",
    employeeId: "EMP003",
    name: "Ms. Emily Davis",
    role: "teaching",
    designation: "English Teacher",
    department: "English",
    gender: "female",
    dob: "1990-11-08",
    joiningDate: "2020-03-01",
    qualification: "M.A English, B.Ed",
    experience: 5,
    specializations: ["Literature", "Communication"],
    phone: "9876543203",
    email: "emily.davis@school.edu",
    address: "789, Teacher Nagar",
    city: "Mumbai",
    pincode: "400012",
    bankName: "ICICI Bank",
    bankAccount: "3456789012",
    ifscCode: "ICIC0001234",
    salary: 52000,
    status: "active",
  },
  {
    id: "staff-4",
    employeeId: "EMP004",
    name: "Mr. James Wilson",
    role: "teaching",
    designation: "Social Science Teacher",
    department: "Social Science",
    gender: "male",
    dob: "1988-05-30",
    joiningDate: "2019-07-10",
    qualification: "M.A History, B.Ed",
    experience: 6,
    specializations: ["History", "Geography"],
    phone: "9876543204",
    email: "james.wilson@school.edu",
    address: "321, Edu Village",
    city: "Mumbai",
    pincode: "400013",
    salary: 55000,
    status: "active",
  },
  {
    id: "staff-5",
    employeeId: "EMP005",
    name: "Mrs. Anita Sharma",
    role: "teaching",
    designation: "Primary Teacher",
    department: "Primary",
    gender: "female",
    dob: "1986-09-12",
    joiningDate: "2016-04-01",
    qualification: "D.El.Ed, B.A",
    experience: 9,
    phone: "9876543205",
    email: "anita.sharma@school.edu",
    address: "654, Primary Wing",
    city: "Mumbai",
    pincode: "400014",
    salary: 48000,
    status: "active",
  },
  {
    id: "staff-6",
    employeeId: "EMP006",
    name: "Mr. Kumar Singh",
    role: "non_teaching",
    designation: "Office Superintendent",
    department: "Administration",
    gender: "male",
    dob: "1975-02-25",
    joiningDate: "2010-05-15",
    qualification: "M.Com",
    experience: 15,
    phone: "9876543206",
    email: "kumar.singh@school.edu",
    address: "123, Admin Block",
    city: "Mumbai",
    pincode: "400015",
    salary: 45000,
    status: "active",
  },
  {
    id: "staff-7",
    employeeId: "EMP007",
    name: "Mrs. Meera Patel",
    role: "support",
    designation: "Librarian",
    department: "Library",
    gender: "female",
    dob: "1980-08-18",
    joiningDate: "2012-08-01",
    qualification: "M.Lib.Sc",
    experience: 13,
    phone: "9876543207",
    email: "meera.patel@school.edu",
    address: "456, Library Building",
    city: "Mumbai",
    pincode: "400016",
    salary: 35000,
    status: "active",
  },
  {
    id: "staff-8",
    employeeId: "EMP008",
    name: "Mr. Amit Kumar",
    role: "support",
    designation: "Accountant",
    department: "Accounts",
    gender: "male",
    dob: "1984-12-05",
    joiningDate: "2014-03-20",
    qualification: "M.Com, CA Inter",
    experience: 11,
    phone: "9876543208",
    email: "amit.kumar@school.edu",
    address: "789, Finance Block",
    city: "Mumbai",
    pincode: "400017",
    salary: 42000,
    status: "active",
  },
];

// Library books dummy data
export const books: Book[] = [
  {
    id: "book-1",
    accessionNumber: "ACC001",
    isbn: "978-0-13-4093413",
    title: "Mathematics for Class 5",
    author: "R.D. Sharma",
    publisher: "Dhanpat Rai",
    yearOfPublication: 2020,
    edition: "3rd",
    category: "Textbook",
    subcategory: "Mathematics",
    price: 350,
    rackNumber: "A1",
    shelfNumber: "1",
    totalCopies: 50,
    availableCopies: 42,
    language: "English",
    status: "available",
  },
  {
    id: "book-2",
    accessionNumber: "ACC002",
    isbn: "978-0-12-3456789",
    title: "English Grammar & Composition",
    author: "Wren & Martin",
    publisher: "S. Chand",
    yearOfPublication: 2019,
    category: "Textbook",
    subcategory: "English",
    price: 280,
    rackNumber: "A2",
    shelfNumber: "1",
    totalCopies: 40,
    availableCopies: 35,
    language: "English",
    status: "available",
  },
  {
    id: "book-3",
    accessionNumber: "ACC003",
    isbn: "978-0-00-0000001",
    title: "General Science Encyclopedia",
    author: "David McAuliffe",
    publisher: "Oxford University Press",
    yearOfPublication: 2018,
    category: "Reference",
    subcategory: "Science",
    price: 550,
    rackNumber: "B1",
    shelfNumber: "2",
    totalCopies: 15,
    availableCopies: 12,
    language: "English",
    status: "available",
  },
];

// Assets dummy data
export const assets: Asset[] = [
  {
    id: "asset-1",
    assetCode: "ASTFURN001",
    name: "Classroom Desk (Student)",
    category: "furniture",
    description: "Standard student desk with chair",
    purchaseDate: "2020-04-15",
    purchaseValue: 2500,
    currentValue: 2000,
    depreciation: 10,
    location: "Classroom 1",
    custodian: "Class 1 Teacher",
    condition: "good",
    status: "in_use",
  },
  {
    id: "asset-2",
    assetCode: "ASTCOMP001",
    name: "Dell Desktop Computer",
    category: "electronics",
    description: "Dell OptiPlex 3070",
    purchaseDate: "2021-06-20",
    purchaseValue: 45000,
    currentValue: 35000,
    depreciation: 15,
    location: "Computer Lab",
    condition: "excellent",
    status: "in_use",
  },
  {
    id: "asset-3",
    assetCode: "ASTPROJ001",
    name: "EPSON Projector",
    category: "electronics",
    description: "EPSON EB-X41 Projector",
    purchaseDate: "2022-01-10",
    purchaseValue: 35000,
    currentValue: 28000,
    depreciation: 10,
    location: "Conference Room",
    condition: "good",
    status: "in_use",
  },
];

// Expenses dummy data
export const expenses: Expense[] = [
  {
    id: "exp-1",
    expenseDate: "2026-01-15",
    category: "salary",
    description: "January 2026 Teaching Staff Salaries",
    amount: 450000,
    paymentMode: "bank",
    status: "paid",
  },
  {
    id: "exp-2",
    expenseDate: "2026-01-10",
    category: "maintenance",
    description: "Computer Lab AC Repair",
    amount: 8500,
    paymentMode: "cash",
    status: "paid",
  },
  {
    id: "exp-3",
    expenseDate: "2026-01-08",
    category: "supplies",
    description: "Stationery Items Purchase",
    amount: 12500,
    paymentMode: "cheque",
    vendor: "Office Supplies Co.",
    invoiceNumber: "INV-2026-001",
    status: "paid",
  },
  {
    id: "exp-4",
    expenseDate: "2026-01-05",
    category: "utilities",
    description: "Electricity Bill - December 2025",
    amount: 35000,
    paymentMode: "bank",
    status: "paid",
  },
  {
    id: "exp-5",
    expenseDate: "2026-01-20",
    category: "transport",
    description: "School Bus Fuel - January 2026",
    amount: 18000,
    paymentMode: "cash",
    status: "pending",
  },
];

// Compliance items dummy data
export const complianceItems: ComplianceItem[] = [
  {
    id: "comp-1",
    requirement: "CBSE Affiliation Renewal",
    category: "affiliation",
    dueDate: "2026-03-31",
    status: "in_progress",
    responsiblePerson: "Principal",
    notes: "Documents submitted, awaiting inspection",
  },
  {
    id: "comp-2",
    requirement: "Fire Safety Certificate Renewal",
    category: "safety",
    dueDate: "2026-02-28",
    status: "pending",
    responsiblePerson: "Administrative Officer",
  },
  {
    id: "comp-3",
    requirement: "Annual Health Checkup Camp",
    category: "student",
    dueDate: "2026-02-15",
    status: "pending",
    responsiblePerson: "Medical In-charge",
  },
  {
    id: "comp-4",
    requirement: "Staff Verification Report",
    category: "staff",
    dueDate: "2026-01-31",
    status: "completed",
    responsiblePerson: "HR Manager",
  },
  {
    id: "comp-5",
    requirement: "Financial Audit 2025-26",
    category: "financial",
    dueDate: "2026-04-30",
    status: "pending",
    responsiblePerson: "Accountant",
  },
];

// Notices dummy data
export const notices: Notice[] = [
  {
    id: "notice-1",
    title: "Parent-Teacher Meeting",
    content:
      "A Parent-Teacher Meeting is scheduled for Class 3-A on January 25, 2026, at 2:00 PM. All parents are requested to attend.",
    type: "event",
    publishedBy: "Principal",
    publishDate: "2026-01-20",
    expiryDate: "2026-01-25",
    targetAudience: ["parents"],
    status: "published",
  },
  {
    id: "notice-2",
    title: "Holiday Notice - Republic Day",
    content:
      "School will remain closed on January 26, 2026, on account of Republic Day. Classes will resume as normal on January 27.",
    type: "holiday",
    publishedBy: "Principal",
    publishDate: "2026-01-20",
    expiryDate: "2026-01-27",
    targetAudience: ["all"],
    status: "published",
  },
  {
    id: "notice-3",
    title: "Unit Test Schedule",
    content:
      "Unit Test for Class 3 will be conducted from January 28-30, 2026. Detailed timetable will be shared shortly.",
    type: "exam",
    publishedBy: "Academic Coordinator",
    publishDate: "2026-01-18",
    targetAudience: ["students", "parents"],
    status: "published",
  },
];

// ==================== EXAMINATION DUMMY DATA ====================
export const examinations: Exam[] = [
  {
    id: "exam-1",
    name: "Periodic Test 1",
    type: "periodic",
    classId: "class-1",
    date: "2026-01-28",
    startTime: "09:00",
    endTime: "11:00",
    examType: "Class 3-A",
    maxMarks: 100,
    status: "scheduled",
  },
  {
    id: "exam-2",
    name: "Half-Yearly Examination",
    type: "half_yearly",
    classId: "class-1",
    date: "2026-02-15",
    startTime: "09:00",
    endTime: "12:00",
    examType: "Class 3-A",
    maxMarks: 100,
    status: "scheduled",
  },
  {
    id: "exam-3",
    name: "Unit Test - Mathematics",
    type: "class_test",
    classId: "class-1",
    date: "2026-01-20",
    startTime: "10:00",
    endTime: "11:00",
    examType: "Class 3-A",
    maxMarks: 50,
    status: "completed",
  },
  {
    id: "exam-4",
    name: "Unit Test - English",
    type: "class_test",
    classId: "class-1",
    date: "2026-01-22",
    startTime: "10:00",
    endTime: "11:00",
    examType: "Class 3-A",
    maxMarks: 50,
    status: "completed",
  },
];

export const examResults: Result[] = [
  {
    id: "result-1",
    examName: "Unit Test - Mathematics",
    class: "Class 3-A",
    totalStudents: 5,
    averageMarks: 78,
    passPercentage: 100,
    status: "published",
  },
  {
    id: "result-2",
    examName: "Unit Test - English",
    class: "Class 3-A",
    totalStudents: 5,
    averageMarks: 82,
    passPercentage: 100,
    status: "published",
  },
  {
    id: "result-3",
    examName: "Periodic Test 1",
    class: "Class 3-A",
    totalStudents: 5,
    averageMarks: 0,
    passPercentage: 0,
    status: "pending",
  },
];

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
  return classes.filter((c) =>
    teacher.assignments.some((a) => a.classId === c.id),
  );
};

export const getTeacherSubject = (
  teacherId: string,
  classId: string,
): string => {
  const teacher = getTeacher(teacherId);
  const assignment = teacher.assignments.find((a) => a.classId === classId);
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
      ],
    },
    {
      classId: "class-2",
      className: "Class 2",
      subjects: [
        { subjectId: "subj-1", name: "Mathematics", progress: 65 },
        { subjectId: "subj-2", name: "English", progress: 78 },
        { subjectId: "subj-3", name: "Science", progress: 55 },
      ],
    },
    {
      classId: "class-3",
      className: "Class 3",
      subjects: [
        { subjectId: "subj-1", name: "Mathematics", progress: 92 },
        { subjectId: "subj-2", name: "English", progress: 88 },
        { subjectId: "subj-3", name: "Science", progress: 75 },
      ],
    },
    {
      classId: "class-4",
      className: "Class 4",
      subjects: [
        { subjectId: "subj-1", name: "Mathematics", progress: 50 },
        { subjectId: "subj-2", name: "English", progress: 62 },
        { subjectId: "subj-3", name: "Science", progress: 45 },
      ],
    },
    {
      classId: "class-5",
      className: "Class 5",
      subjects: [
        { subjectId: "subj-1", name: "Mathematics", progress: 30 },
        { subjectId: "subj-2", name: "English", progress: 45 },
        { subjectId: "subj-3", name: "Science", progress: 35 },
      ],
    },
  ];
};
