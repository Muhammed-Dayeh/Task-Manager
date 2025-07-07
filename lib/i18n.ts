export type Language = "en" | "ar" | "tr";

export interface Translations {
  // Header
  taskManager: string;
  organizeTasksEfficiently: string;
  addTask: string;

  // Stats
  totalTasks: string;
  activeTasks: string;
  completed: string;

  // Filters
  searchTasks: string;
  allTasks: string;
  active: string;
  allPriorities: string;
  highPriority: string;
  mediumPriority: string;
  lowPriority: string;

  // Task Form
  addNewTask: string;
  editTask: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  dueDateOptional: string;
  enterTaskTitle: string;
  enterTaskDescription: string;
  pending: string;
  inProgress: string;
  updateTask: string;
  cancel: string;

  // Task Item
  today: string;
  overdue: string;
  areYouSure: string;

  // Validation
  titleRequired: string;
  descriptionRequired: string;

  // Empty State
  noTasksFound: string;
  createFirstTask: string;

  // Priority levels
  high: string;
  medium: string;
  low: string;

  // Status
  tasks: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    taskManager: "Task Manager",
    organizeTasksEfficiently: "Organize your tasks efficiently",
    addTask: "Add Task",
    totalTasks: "Total Tasks",
    activeTasks: "Active Tasks",
    completed: "Completed",
    searchTasks: "Search tasks...",
    allTasks: "All Tasks",
    active: "Active",
    allPriorities: "All Priorities",
    highPriority: "High Priority",
    mediumPriority: "Medium Priority",
    lowPriority: "Low Priority",
    addNewTask: "Add New Task",
    editTask: "Edit Task",
    title: "Title",
    description: "Description",
    priority: "Priority",
    status: "Status",
    dueDate: "Due Date",
    dueDateOptional: "Due Date (Optional)",
    enterTaskTitle: "Enter task title",
    enterTaskDescription: "Enter task description",
    pending: "Pending",
    inProgress: "In Progress",
    updateTask: "Update Task",
    cancel: "Cancel",
    today: "Today",
    overdue: "Overdue",
    areYouSure: "Are you sure?",
    titleRequired: "Title is required",
    descriptionRequired: "Description is required",
    noTasksFound: "No tasks found",
    createFirstTask: "Create your first task to get started",
    high: "High",
    medium: "Medium",
    low: "Low",
    tasks: "Tasks",
  },
  ar: {
    taskManager: "مدير المهام",
    organizeTasksEfficiently: "نظم مهامك بكفاءة",
    addTask: "إضافة مهمة",
    totalTasks: "إجمالي المهام",
    activeTasks: "المهام النشطة",
    completed: "مكتملة",
    searchTasks: "البحث في المهام...",
    allTasks: "جميع المهام",
    active: "نشطة",
    allPriorities: "جميع الأولويات",
    highPriority: "أولوية عالية",
    mediumPriority: "أولوية متوسطة",
    lowPriority: "أولوية منخفضة",
    addNewTask: "إضافة مهمة جديدة",
    editTask: "تعديل المهمة",
    title: "العنوان",
    description: "الوصف",
    priority: "الأولوية",
    status: "الحالة",
    dueDate: "تاريخ الاستحقاق",
    dueDateOptional: "تاريخ الاستحقاق (اختياري)",
    enterTaskTitle: "أدخل عنوان المهمة",
    enterTaskDescription: "أدخل وصف المهمة",
    pending: "معلقة",
    inProgress: "قيد التنفيذ",
    updateTask: "تحديث المهمة",
    cancel: "إلغاء",
    today: "اليوم",
    overdue: "متأخرة",
    areYouSure: "هل أنت متأكد؟",
    titleRequired: "العنوان مطلوب",
    descriptionRequired: "الوصف مطلوب",
    noTasksFound: "لم يتم العثور على مهام",
    createFirstTask: "أنشئ مهمتك الأولى للبدء",
    high: "عالية",
    medium: "متوسطة",
    low: "منخفضة",
    tasks: "المهام",
  },
  tr: {
    taskManager: "Görev Yöneticisi",
    organizeTasksEfficiently: "Görevlerinizi verimli bir şekilde organize edin",
    addTask: "Görev Ekle",
    totalTasks: "Toplam Görevler",
    activeTasks: "Aktif Görevler",
    completed: "Tamamlanan",
    searchTasks: "Görevlerde ara...",
    allTasks: "Tüm Görevler",
    active: "Aktif",
    allPriorities: "Tüm Öncelikler",
    highPriority: "Yüksek Öncelik",
    mediumPriority: "Orta Öncelik",
    lowPriority: "Düşük Öncelik",
    addNewTask: "Yeni Görev Ekle",
    editTask: "Görevi Düzenle",
    title: "Başlık",
    description: "Açıklama",
    priority: "Öncelik",
    status: "Durum",
    dueDate: "Bitiş Tarihi",
    dueDateOptional: "Bitiş Tarihi (İsteğe Bağlı)",
    enterTaskTitle: "Görev başlığını girin",
    enterTaskDescription: "Görev açıklamasını girin",
    pending: "Beklemede",
    inProgress: "Devam Ediyor",
    updateTask: "Görevi Güncelle",
    cancel: "İptal",
    today: "Bugün",
    overdue: "Gecikmiş",
    areYouSure: "Emin misiniz?",
    titleRequired: "Başlık gerekli",
    descriptionRequired: "Açıklama gerekli",
    noTasksFound: "Görev bulunamadı",
    createFirstTask: "Başlamak için ilk görevinizi oluşturun",
    high: "Yüksek",
    medium: "Orta",
    low: "Düşük",
    tasks: "Görevler",
  },
};

export const getTranslation = (language: Language): Translations => {
  return translations[language];
};

export const isRTL = (language: Language): boolean => {
  return language === "ar";
};
