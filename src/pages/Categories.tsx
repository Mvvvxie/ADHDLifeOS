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

const Categories = () => {
    return (
        <Container
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <Title>Categories</Title>
            <p>Organize your skills and track your progress by category.</p>
            {/* Add categories content here */}
        </Container>
    );
};

export default Categories; 