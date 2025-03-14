import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Category, Quest, Milestone, TimeBlock, CalendarEvent, KanbanBoard, KanbanItem } from '../types';

const STORE_VERSION = '1.0.0'; // Add version control

interface AppState {
    version: string;
    user: User;
    categories: Category[];
    quests: Quest[];
    milestones: Milestone[];
    timeblocks: TimeBlock[];
    calendarEvents: CalendarEvent[];
    kanbanBoards: KanbanBoard[];
    
    // Quest actions
    addQuest: (quest: Omit<Quest, 'id' | 'completed'>) => void;
    completeQuest: (questId: string) => void;
    deleteQuest: (questId: string) => void;
    
    // Milestone actions
    addMilestone: (milestone: Omit<Milestone, 'id'>) => void;
    completeMilestone: (milestoneId: string) => void;
    deleteMilestone: (milestoneId: string) => void;
    updateMilestone: (milestone: Milestone) => void;
    
    // Calendar actions
    addTimeBlock: (timeblock: Omit<TimeBlock, 'id'>) => void;
    updateTimeBlock: (timeblock: TimeBlock) => void;
    deleteTimeBlock: (timeblockId: string) => void;
    
    addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
    updateCalendarEvent: (event: CalendarEvent) => void;
    deleteCalendarEvent: (eventId: string) => void;
    
    // Kanban actions
    addKanbanBoard: (board: Omit<KanbanBoard, 'id'>) => void;
    updateKanbanBoard: (boardId: string, updates: Partial<KanbanBoard>) => void;
    deleteKanbanBoard: (boardId: string) => void;
    moveKanbanItem: (itemId: string, sourceColumnId: string, targetColumnId: string, newIndex: number) => void;
    
    // User actions
    updateUserXP: (xp: number) => void;
}

const defaultCategories: Category[] = [
    {
        id: '1',
        name: 'Coding & GameDev',
        icon: '<i class="fas fa-code"></i>',
        color: '#FF6B6B',
        totalXP: 0,
        maxXP: 1000,
        level: 1,
        skills: ['Programming', 'Game Development', 'Web Development']
    },
    {
        id: '2',
        name: 'Azure Certification',
        icon: '<i class="fas fa-cloud"></i>',
        color: '#45B7D1',
        totalXP: 0,
        maxXP: 1000,
        level: 1,
        skills: ['Cloud', 'DevOps', 'Architecture']
    },
    {
        id: '3',
        name: 'Fitness',
        icon: '<i class="fas fa-dumbbell"></i>',
        color: '#4ECDC4',
        totalXP: 0,
        maxXP: 1000,
        level: 1,
        skills: ['Strength', 'Cardio', 'Flexibility']
    }
];

const defaultUser: User = {
    level: 1,
    totalXP: 0,
    nextLevelXP: 1000,
    availableXP: 0,
    streak: {
        current: 0,
        longest: 0,
        lastCompleted: null
    }
};

const defaultKanbanColumns = [
    { id: 'backlog', title: 'Backlog', items: [] },
    { id: 'todo', title: 'To Do', items: [] },
    { id: 'in-progress', title: 'In Progress', items: [] },
    { id: 'done', title: 'Done', items: [] }
];

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            version: STORE_VERSION,
            user: defaultUser,
            categories: defaultCategories,
            quests: [],
            milestones: [],
            timeblocks: [],
            calendarEvents: [],
            kanbanBoards: defaultCategories.map(cat => ({
                id: crypto.randomUUID(),
                title: `${cat.name} Board`,
                category: cat.id,
                columns: defaultKanbanColumns
            })),

            // Existing quest actions
            addQuest: (quest) => {
                const newQuest: Quest = {
                    ...quest,
                    id: crypto.randomUUID(),
                    completed: false,
                    dueDate: quest.dueDate || new Date().toISOString().split('T')[0]
                };
                set((state) => ({
                    quests: [...state.quests, newQuest]
                }));
            },

            completeQuest: (questId) => {
                set((state) => {
                    const quest = state.quests.find(q => q.id === questId);
                    if (!quest) return state;

                    // Update quest status
                    const updatedQuests = state.quests.map(q =>
                        q.id === questId ? { ...q, completed: true } : q
                    );

                    // Update category XP
                    const updatedCategories = state.categories.map(cat =>
                        cat.id === quest.category
                            ? {
                                ...cat,
                                totalXP: cat.totalXP + quest.xp,
                                level: Math.floor((cat.totalXP + quest.xp) / cat.maxXP) + 1
                            }
                            : cat
                    );

                    // Update user XP
                    const newTotalXP = state.user.totalXP + quest.xp;
                    const newLevel = Math.floor(newTotalXP / state.user.nextLevelXP) + 1;
                    const newNextLevelXP = newLevel * 1000;

                    return {
                        quests: updatedQuests,
                        categories: updatedCategories,
                        user: {
                            ...state.user,
                            totalXP: newTotalXP,
                            level: newLevel,
                            nextLevelXP: newNextLevelXP,
                            availableXP: state.user.availableXP + quest.xp
                        }
                    };
                });
            },
            deleteQuest: (questId) => {
                set((state) => ({
                    quests: state.quests.filter(q => q.id !== questId)
                }));
            },

            // Milestone actions
            addMilestone: (milestone) => {
                const newMilestone: Milestone = {
                    ...milestone,
                    id: crypto.randomUUID(),
                    completed: false,
                    progress: 0,
                    quests: []
                };
                set((state) => ({
                    milestones: [...state.milestones, newMilestone]
                }));
            },

            completeMilestone: (milestoneId) => {
                set((state) => ({
                    milestones: state.milestones.map(m =>
                        m.id === milestoneId ? { ...m, completed: true } : m
                    )
                }));
            },

            deleteMilestone: (milestoneId) => {
                set((state) => ({
                    milestones: state.milestones.filter(m => m.id !== milestoneId)
                }));
            },

            updateMilestone: (milestone) => {
                set((state) => ({
                    milestones: state.milestones.map(m =>
                        m.id === milestone.id ? milestone : m
                    )
                }));
            },

            // Calendar actions
            addTimeBlock: (timeblock) => {
                const newTimeBlock: TimeBlock = {
                    ...timeblock,
                    id: crypto.randomUUID()
                };
                set((state) => ({
                    timeblocks: [...state.timeblocks, newTimeBlock]
                }));
            },

            updateTimeBlock: (timeblock) => {
                set((state) => ({
                    timeblocks: state.timeblocks.map(tb =>
                        tb.id === timeblock.id ? timeblock : tb
                    )
                }));
            },

            deleteTimeBlock: (timeblockId) => {
                set((state) => ({
                    timeblocks: state.timeblocks.filter(tb => tb.id !== timeblockId)
                }));
            },

            addCalendarEvent: (event) => {
                const newEvent: CalendarEvent = {
                    ...event,
                    id: crypto.randomUUID()
                };
                set((state) => ({
                    calendarEvents: [...state.calendarEvents, newEvent]
                }));
            },

            updateCalendarEvent: (event) => {
                set((state) => ({
                    calendarEvents: state.calendarEvents.map(e =>
                        e.id === event.id ? event : e
                    )
                }));
            },

            deleteCalendarEvent: (eventId) => {
                set((state) => ({
                    calendarEvents: state.calendarEvents.filter(e => e.id !== eventId)
                }));
            },

            // Kanban actions
            addKanbanBoard: (board) => {
                const newBoard: KanbanBoard = {
                    ...board,
                    id: crypto.randomUUID()
                };
                set((state) => ({
                    kanbanBoards: [...state.kanbanBoards, newBoard]
                }));
            },

            updateKanbanBoard: (boardId, updates) => {
                set((state) => ({
                    kanbanBoards: state.kanbanBoards.map(b =>
                        b.id === boardId ? { ...b, ...updates } : b
                    )
                }));
            },

            deleteKanbanBoard: (boardId) => {
                set((state) => ({
                    kanbanBoards: state.kanbanBoards.filter(b => b.id !== boardId)
                }));
            },

            moveKanbanItem: (itemId, sourceColumnId, targetColumnId, newIndex) => {
                set((state) => {
                    const updatedBoards = state.kanbanBoards.map(board => {
                        const sourceColumn = board.columns.find(col => col.id === sourceColumnId);
                        const targetColumn = board.columns.find(col => col.id === targetColumnId);
                        
                        if (!sourceColumn || !targetColumn) return board;

                        const item = sourceColumn.items.find(i => i.id === itemId);
                        if (!item) return board;

                        const updatedColumns = board.columns.map(col => {
                            if (col.id === sourceColumnId) {
                                return {
                                    ...col,
                                    items: col.items.filter(i => i.id !== itemId)
                                };
                            }
                            if (col.id === targetColumnId) {
                                const newItems = [...col.items];
                                newItems.splice(newIndex, 0, item);
                                return {
                                    ...col,
                                    items: newItems
                                };
                            }
                            return col;
                        });

                        return {
                            ...board,
                            columns: updatedColumns
                        };
                    });

                    return {
                        kanbanBoards: updatedBoards
                    };
                });
            },

            // User actions
            updateUserXP: (xp) => {
                set((state) => ({
                    user: {
                        ...state.user,
                        availableXP: state.user.availableXP + xp
                    }
                }));
            }
        }),
        {
            name: 'life-os-storage',
            version: 1,
            migrate: (persistedState: any, version: number) => {
                if (version === 0) {
                    // Reset to default state if version is 0 (or not set)
                    return {
                        version: STORE_VERSION,
                        user: defaultUser,
                        categories: defaultCategories,
                        quests: [],
                        milestones: [],
                        timeblocks: [],
                        calendarEvents: [],
                        kanbanBoards: defaultCategories.map(cat => ({
                            id: crypto.randomUUID(),
                            title: `${cat.name} Board`,
                            category: cat.id,
                            columns: defaultKanbanColumns
                        }))
                    };
                }
                return persistedState;
            }
        }
    )
); 