import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { XPBar } from '../components/ui/XPBar';
import { UserStats } from '../components/ui/UserStats';
import { Pomodoro } from '../components/features/pomodoro/Pomodoro';
import { QuestList } from '../components/features/quests/QuestList';
import { theme } from '../styles/theme';

const Container = styled(motion.div)`
    padding: 2rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
`;

const Section = styled(motion.div)`
    background-color: var(--surface);
    padding: 1.5rem;
    border-radius: ${theme.borderRadius.medium};
    box-shadow: ${theme.shadows.medium};
`;

const SectionTitle = styled.h2`
    margin: 0 0 1rem;
    color: var(--text-primary);
    font-size: 1.5rem;
`;

const CategoryProgress = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CategoryItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const CategoryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CategoryName = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-primary);
`;

const CategoryIcon = styled.span`
    width: 24px;
    text-align: center;
    font-size: 1.1rem;
`;

const CategoryXP = styled.div`
    color: var(--text-secondary);
    font-size: 0.9rem;
`;

const ProgressBarContainer = styled.div`
    width: 100%;
    height: 8px;
    background-color: var(--surface-light);
    border-radius: 4px;
    overflow: hidden;
`;

interface ProgressBarFillProps {
    progress: number;
    color: string;
}

const ProgressBarFill = styled(motion.div)<ProgressBarFillProps>`
    height: 100%;
    width: ${props => props.progress}%;
    background-color: ${props => props.color};
    border-radius: 4px;
`;

const Dashboard = () => {
    const { user, categories, quests } = useStore();

    const today = new Date().toISOString().split('T')[0];
    const todaysQuests = quests.filter(quest => {
        if (!quest.dueDate) return false;
        try {
            const questDate = new Date(quest.dueDate).toISOString().split('T')[0];
            return questDate === today && !quest.completed;
        } catch (error) {
            console.error('Invalid date for quest:', quest);
            return false;
        }
    });

    const upcomingQuests = quests.filter(quest => {
        if (!quest.dueDate) return false;
        try {
            const questDate = new Date(quest.dueDate).toISOString().split('T')[0];
            return questDate > today && !quest.completed;
        } catch (error) {
            console.error('Invalid date for quest:', quest);
            return false;
        }
    });

    return (
        <Container
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <Section>
                <SectionTitle>General Progress</SectionTitle>
                <UserStats user={user} />
            </Section>

            <Grid>
                <Section>
                    <SectionTitle>Today's Quests</SectionTitle>
                    {todaysQuests.length > 0 ? (
                        <QuestList quests={todaysQuests} />
                    ) : (
                        <p>No quests for today</p>
                    )}
                </Section>

                <Section>
                    <SectionTitle>Upcoming Quests</SectionTitle>
                    {upcomingQuests.length > 0 ? (
                        <QuestList quests={upcomingQuests} />
                    ) : (
                        <p>No upcoming quests</p>
                    )}
                </Section>

                <Section>
                    <SectionTitle>Category Progress</SectionTitle>
                    <CategoryProgress>
                        {categories.map(category => (
                            <CategoryItem key={category.id}>
                                <CategoryHeader>
                                    <CategoryName>
                                        <CategoryIcon dangerouslySetInnerHTML={{ __html: category.icon }} />
                                        {category.name}
                                    </CategoryName>
                                    <CategoryXP>
                                        Level {category.level} • {category.totalXP}/{category.maxXP} XP
                                    </CategoryXP>
                                </CategoryHeader>
                                <ProgressBarContainer>
                                    <ProgressBarFill
                                        progress={(category.totalXP / category.maxXP) * 100}
                                        color={category.color}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(category.totalXP / category.maxXP) * 100}%` }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                </ProgressBarContainer>
                            </CategoryItem>
                        ))}
                    </CategoryProgress>
                </Section>

                <Section>
                    <SectionTitle>Pomodoro Timer</SectionTitle>
                    <Pomodoro />
                </Section>
            </Grid>
        </Container>
    );
};

export default Dashboard; 