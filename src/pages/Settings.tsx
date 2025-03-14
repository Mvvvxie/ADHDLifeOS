import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
    padding: 2rem;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
`;

const Settings = () => {
    return (
        <Container
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <Title>Settings</Title>
            <p>Customize your Life OS experience.</p>
            {/* Add settings content here */}
        </Container>
    );
};

export default Settings; 