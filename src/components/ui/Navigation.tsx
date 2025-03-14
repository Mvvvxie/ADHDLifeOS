import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../../styles/theme';

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const NavItem = styled(motion.create(Link))`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    color: var(--text-primary);
    text-decoration: none;
    border-radius: ${theme.borderRadius.medium};
    transition: background-color ${theme.transitions.fast};

    &:hover {
        background-color: var(--surface-light);
    }

    &.active {
        background-color: var(--primary);
        color: white;
    }
`;

const Icon = styled.span`
    width: 24px;
    text-align: center;
`;

const navItems = [
    { label: 'Dashboard', icon: '<i class="fas fa-chart-bar"></i>', path: '/' },
    { label: 'Quests', icon: '<i class="fas fa-tasks"></i>', path: '/quests' },
    { label: 'Calendar', icon: '<i class="fas fa-calendar-alt"></i>', path: '/calendar' },
    { label: 'Categories', icon: '<i class="fas fa-folder"></i>', path: '/categories' },
    { label: 'Stats', icon: '<i class="fas fa-chart-line"></i>', path: '/stats' },
    { label: 'Settings', icon: '<i class="fas fa-cog"></i>', path: '/settings' },
];

export const Navigation = () => {
    const location = useLocation();

    return (
        <Nav>
            {navItems.map((item, index) => (
                <NavItem
                    key={item.path}
                    to={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={location.pathname === item.path ? 'active' : ''}
                >
                    <Icon dangerouslySetInnerHTML={{ __html: item.icon }} />
                    {item.label}
                </NavItem>
            ))}
        </Nav>
    );
}; 