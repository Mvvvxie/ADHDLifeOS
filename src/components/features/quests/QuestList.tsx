import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useStore } from '../../../store/useStore';
import { theme } from '../../../styles/theme';
import { Quest } from '../../../types';

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const QuestCard = styled(motion.div)`
    background-color: var(--surface);
    padding: 1.5rem;
    border-radius: ${theme.borderRadius.medium};
    box-shadow: ${theme.shadows.medium};
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`;

const QuestInfo = styled.div`
    flex: 1;
`;

const QuestTitle = styled.h3`
    margin: 0;
    color: var(--text-primary);
    font-size: 1.1rem;
`;

const QuestDescription = styled.p`
    margin: 0.5rem 0 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
`;

const QuestCategory = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    background-color: var(--surface-light);
    border-radius: ${theme.borderRadius.small};
    font-size: 0.8rem;
    color: var(--text-secondary);
`;

const QuestXP = styled.span`
    font-weight: 600;
    color: var(--primary);
`;

const QuestActions = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const ActionButton = styled(motion.button)`
    padding: 0.5rem;
    border: none;
    border-radius: ${theme.borderRadius.small};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color ${theme.transitions.fast};

    &.complete {
        background-color: var(--secondary);
        color: white;

        &:hover {
            background-color: var(--secondary-light);
        }
    }

    &.delete {
        background-color: var(--error);
        color: white;

        &:hover {
            background-color: #ff4444;
        }
    }
`;

interface QuestListProps {
    quests: Quest[];
}

export const QuestList = ({ quests }: QuestListProps) => {
    const { categories, completeQuest, deleteQuest } = useStore();

    const getCategory = (categoryId: string) => {
        return categories.find(cat => cat.id === categoryId);
    };

    return (
        <List>
            {quests.map((quest, index) => {
                const category = getCategory(quest.category);
                return (
                    <QuestCard
                        key={quest.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <QuestInfo>
                            <QuestTitle>{quest.title}</QuestTitle>
                            {quest.description && (
                                <QuestDescription>{quest.description}</QuestDescription>
                            )}
                            <QuestCategory>
                                {category?.icon} {category?.name}
                            </QuestCategory>
                            <QuestXP>+{quest.xp} XP</QuestXP>
                        </QuestInfo>
                        <QuestActions>
                            {!quest.completed && (
                                <ActionButton
                                    className="complete"
                                    onClick={() => completeQuest(quest.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    ✓
                                </ActionButton>
                            )}
                            <ActionButton
                                className="delete"
                                onClick={() => deleteQuest(quest.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                ×
                            </ActionButton>
                        </QuestActions>
                    </QuestCard>
                );
            })}
        </List>
    );
}; 