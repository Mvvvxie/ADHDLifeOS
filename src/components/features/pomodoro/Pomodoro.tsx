import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../../styles/theme';

const Container = styled(motion.div)`
    background-color: var(--surface);
    padding: 1.5rem;
    border-radius: ${theme.borderRadius.medium};
    box-shadow: ${theme.shadows.medium};
    text-align: center;
`;

const Timer = styled.div`
    font-size: 3rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 1rem 0;
`;

const Controls = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
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

    &:disabled {
        background-color: var(--surface-light);
        cursor: not-allowed;
    }
`;

const Mode = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 1rem;
`;

const ModeButton = styled(motion.button)<{ active: boolean }>`
    padding: 0.5rem 1rem;
    background-color: ${props => props.active ? 'var(--primary)' : 'var(--surface-light)'};
    color: ${props => props.active ? 'white' : 'var(--text-primary)'};
    border: none;
    border-radius: ${theme.borderRadius.small};
    font-size: 0.9rem;
    cursor: pointer;
    transition: all ${theme.transitions.fast};

    &:hover {
        background-color: ${props => props.active ? 'var(--primary-light)' : 'var(--surface)'};
    }
`;

type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

const TIMES = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

export const Pomodoro = () => {
    const [timeLeft, setTimeLeft] = useState(TIMES.work);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<PomodoroMode>('work');

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            // Play notification sound
            new Audio('/notification.mp3').play().catch(() => {});
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleModeChange = (newMode: PomodoroMode) => {
        setMode(newMode);
        setTimeLeft(TIMES[newMode]);
        setIsRunning(false);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setTimeLeft(TIMES[mode]);
        setIsRunning(false);
    };

    return (
        <Container
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Mode>
                <ModeButton
                    active={mode === 'work'}
                    onClick={() => handleModeChange('work')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Work
                </ModeButton>
                <ModeButton
                    active={mode === 'shortBreak'}
                    onClick={() => handleModeChange('shortBreak')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Short Break
                </ModeButton>
                <ModeButton
                    active={mode === 'longBreak'}
                    onClick={() => handleModeChange('longBreak')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Long Break
                </ModeButton>
            </Mode>
            <Timer>{formatTime(timeLeft)}</Timer>
            <Controls>
                <Button
                    onClick={toggleTimer}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isRunning ? 'Pause' : 'Start'}
                </Button>
                <Button
                    onClick={resetTimer}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Reset
                </Button>
            </Controls>
        </Container>
    );
}; 