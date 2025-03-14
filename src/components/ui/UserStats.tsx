import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { User } from '../../types';
import { XPBar } from './XPBar';

interface UserStatsProps {
    user: User;
}

const StatsContainer = styled(motion.div)`
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 8px;
    color: var(--text-primary);
`;

const Level = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--secondary);
    margin-bottom: 0.5rem;
`;

const XPText = styled.div`
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
`;

const StreakInfo = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
`;

export const UserStats: React.FC<UserStatsProps> = ({ user }) => {
    return (
        <StatsContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Level>Level {user.level}</Level>
            <XPText>
                {user.totalXP} / {user.nextLevelXP} XP
            </XPText>
            <XPBar currentXP={user.totalXP} maxXP={user.nextLevelXP} />
            <StreakInfo>
                <div>Current Streak: {user.streak.current}</div>
                <div>Best: {user.streak.longest}</div>
            </StreakInfo>
        </StatsContainer>
    );
}; 