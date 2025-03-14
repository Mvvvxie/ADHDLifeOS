export interface User {
    level: number;
    totalXP: number;
    nextLevelXP: number;
    availableXP: number;
    streak: {
        current: number;
        longest: number;
        lastCompleted: string | null;
    };
}

export interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    totalXP: number;
    maxXP: number;
    level: number;
    skills: string[];
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    category: string;
    xp: number;
    completed: boolean;
    dueDate: string;
    milestoneId?: string; // Reference to a milestone if this quest is part of one
    timeblocks?: string[]; // Array of timeblock IDs associated with this quest
}

export interface Milestone {
    id: string;
    title: string;
    description: string;
    category: string;
    xp: number;
    completed: boolean;
    dueDate: string;
    quests: string[]; // Array of quest IDs that make up this milestone
    progress: number; // Percentage of completion based on completed quests
}

export interface TimeBlock {
    id: string;
    title: string;
    start: string; // ISO date string
    end: string; // ISO date string
    questId?: string; // Optional reference to a quest
    category: string;
    completed: boolean;
}

export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    start: string; // ISO date string
    end: string; // ISO date string
    allDay: boolean;
    category: string;
    type: 'event' | 'timeblock' | 'milestone';
    relatedId?: string; // ID of related quest/milestone if applicable
    completed?: boolean;
}

export interface KanbanBoard {
    id: string;
    title: string;
    category: string;
    columns: KanbanColumn[];
}

export interface KanbanColumn {
    id: string;
    title: string;
    items: KanbanItem[];
}

export interface KanbanItem {
    id: string;
    title: string;
    description?: string;
    type: 'quest' | 'milestone';
    relatedId: string; // ID of the related quest or milestone
    category: string;
    dueDate?: string;
    priority: 'low' | 'medium' | 'high';
}

export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    duration: number;
    category: string;
}

export interface PomodoroSettings {
    workTime: number;
    shortBreak: number;
    longBreak: number;
    completedPomodoros: number;
    totalFocusTime: number;
}

export interface AppData {
    version: string;
    user: User;
    categories: Category[];
    quests: Quest[];
    events: Event[];
    pomodoro: PomodoroSettings;
    milestones: Milestone[];
    timeblocks: TimeBlock[];
    calendarEvents: CalendarEvent[];
    kanbanBoards: KanbanBoard[];
} 