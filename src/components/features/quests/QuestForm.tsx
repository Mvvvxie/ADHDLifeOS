import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../../store/useStore';
import { theme } from '../../../styles/theme';

const ModalOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const FormContainer = styled(motion.div)`
    background-color: var(--surface);
    padding: 2rem;
    border-radius: ${theme.borderRadius.medium};
    box-shadow: ${theme.shadows.large};
    max-width: 500px;
    width: 90%;
    position: relative;
`;

const CloseButton = styled(motion.button)`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${theme.borderRadius.small};
    transition: all ${theme.transitions.fast};

    &:hover {
        color: var(--text-primary);
        background-color: var(--surface-light);
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    color: var(--text-primary);
    font-weight: 500;
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid var(--surface-light);
    border-radius: ${theme.borderRadius.small};
    background-color: var(--background);
    color: var(--text-primary);
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: var(--primary);
    }
`;

const Select = styled.select`
    padding: 0.75rem;
    border: 1px solid var(--surface-light);
    border-radius: ${theme.borderRadius.small};
    background-color: var(--background);
    color: var(--text-primary);
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: var(--primary);
    }
`;

const CategoryOption = styled.option`
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const CategorySelect = styled(Select)`
    & option {
        background-color: var(--surface);
        color: var(--text-primary);
        padding: 8px;
    }
`;

const Button = styled(motion.button)`
    padding: 0.75rem 1.5rem;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: ${theme.borderRadius.small};
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color ${theme.transitions.fast};

    &:hover {
        background-color: var(--primary-light);
    }
`;

interface QuestFormProps {
    onClose: () => void;
}

export const QuestForm = ({ onClose }: QuestFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [xp, setXp] = useState('100');
    const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
    const addQuest = useStore(state => state.addQuest);
    const categories = useStore(state => state.categories);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !category) return;

        addQuest({
            title,
            description,
            category,
            xp: parseInt(xp),
            completed: false,
            dueDate
        });

        setTitle('');
        setDescription('');
        setCategory('');
        setXp('100');
        setDueDate(new Date().toISOString().split('T')[0]);
        onClose();
    };

    const handleContainerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <FormContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={handleContainerClick}
            >
                <CloseButton
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    ×
                </CloseButton>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="title">Quest Title</Label>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="category">Category</Label>
                        <CategorySelect
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <CategoryOption value="">Select a category</CategoryOption>
                            {categories.map(cat => (
                                <CategoryOption key={cat.id} value={cat.id}>
                                    {cat.name}
                                </CategoryOption>
                            ))}
                        </CategorySelect>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="xp">XP Reward</Label>
                        <Input
                            id="xp"
                            type="number"
                            value={xp}
                            onChange={(e) => setXp(e.target.value)}
                            min="1"
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            id="dueDate"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </FormGroup>

                    <Button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Add Quest
                    </Button>
                </Form>
            </FormContainer>
        </ModalOverlay>
    );
}; 