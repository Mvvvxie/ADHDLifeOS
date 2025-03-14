import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { QuestList } from '../components/features/quests/QuestList';
import { QuestForm } from '../components/features/quests/QuestForm';
import { theme } from '../styles/theme';

const Container = styled(motion.div)`
    padding: 2rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    margin: 0;
    color: var(--text-primary);
    font-size: 2rem;
`;

const AddButton = styled(motion.button)`
    padding: 0.75rem 1.5rem;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: ${theme.borderRadius.medium};
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color ${theme.transitions.fast};

    &:hover {
        background-color: var(--primary-light);
    }
`;

const Quests = () => {
    const { quests } = useStore();
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <Container
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <Header>
                <Title>Quests</Title>
                <AddButton
                    onClick={() => setIsFormOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span role="img" aria-label="Add quest">➕</span>
                    Add Quest
                </AddButton>
            </Header>

            <AnimatePresence>
                {isFormOpen && (
                    <QuestForm
                        onClose={() => setIsFormOpen(false)}
                    />
                )}
            </AnimatePresence>

            <QuestList quests={quests} />
        </Container>
    );
};

export default Quests; 