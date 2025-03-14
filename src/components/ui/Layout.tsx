import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { theme } from '../../styles/theme';
import { Navigation } from './Navigation';

interface LayoutProps {
    children: ReactNode;
}

const Container = styled(motion.div)`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas:
        "sidebar header"
        "sidebar main";
    background-color: var(--background);
`;

const Header = styled.header`
    grid-area: header;
    background-color: var(--surface);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: ${theme.shadows.medium};
`;

const Logo = styled.h1`
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary);
`;

const Sidebar = styled.aside`
    grid-area: sidebar;
    background-color: var(--surface);
    padding: 1.5rem 1rem;
    box-shadow: ${theme.shadows.medium};
`;

const Main = styled(motion.main)`
    grid-area: main;
    padding: 2rem;
    overflow-y: auto;
`;

export const Layout = ({ children }: LayoutProps) => {
    return (
        <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Header>
                <Logo>Life OS</Logo>
                {/* Add user stats and other header content here */}
            </Header>
            <Sidebar>
                <Navigation />
            </Sidebar>
            <Main
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {children}
            </Main>
        </Container>
    );
}; 