import React from 'react';
import styled from '@emotion/styled';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const BarContainer = styled.div`
    width: 100%;
    height: 12px;
    background-color: var(--surface-light);
    border-radius: 6px;
    overflow: hidden;
    position: relative;
`;

const XPSegment = styled(motion.div)`
    height: 100%;
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
    border-radius: 6px;
    position: relative;
    overflow: hidden;
`;

const ShineEffect = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.2) 50%,
        transparent 100%
    );
`;

interface XPBarProps {
    currentXP: number;
    maxXP: number;
}

export const XPBar = ({ currentXP, maxXP }: XPBarProps) => {
    const progress = useMotionValue(0);
    const width = useTransform(progress, [0, 1], ['0%', '100%']);

    React.useEffect(() => {
        const targetProgress = currentXP / maxXP;
        animate(progress, targetProgress, {
            duration: 0.5,
            ease: 'easeOut'
        });
    }, [currentXP, maxXP, progress]);

    return (
        <BarContainer>
            <XPSegment style={{ width }}>
                <ShineEffect
                    animate={{
                        x: ['-100%', '100%']
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
            </XPSegment>
        </BarContainer>
    );
}; 