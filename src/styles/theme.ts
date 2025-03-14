export const theme = {
    colors: {
        background: '#1a1a1a',
        surface: '#2c2c2c',
        surfaceLight: '#3c3c3c',
        primary: '#9d46ff',
        primaryLight: '#b57aff',
        secondary: '#03dac6',
        secondaryLight: '#6efaeb',
        textPrimary: '#ffffff',
        textSecondary: 'rgba(255, 255, 255, 0.7)',
        error: '#cf6679',
    },
    shadows: {
        small: '0 2px 4px rgba(0,0,0,0.2)',
        medium: '0 4px 8px rgba(0,0,0,0.2)',
        large: '0 8px 16px rgba(0,0,0,0.2)',
    },
    transitions: {
        fast: '0.2s ease',
        normal: '0.3s ease',
        slow: '0.5s ease',
    },
    borderRadius: {
        small: '4px',
        medium: '8px',
        large: '16px',
    },
};

export const GlobalStyles = `
    :root {
        --background: ${theme.colors.background};
        --surface: ${theme.colors.surface};
        --surface-light: ${theme.colors.surfaceLight};
        --primary: ${theme.colors.primary};
        --primary-light: ${theme.colors.primaryLight};
        --secondary: ${theme.colors.secondary};
        --secondary-light: ${theme.colors.secondaryLight};
        --text-primary: ${theme.colors.textPrimary};
        --text-secondary: ${theme.colors.textSecondary};
        --error: ${theme.colors.error};
    }

    @font-face {
        font-family: 'Coolvetica';
        src: url('/fonts/coolvetica.woff2') format('woff2'),
             url('/fonts/coolvetica.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    body {
        background-color: var(--background);
        color: var(--text-primary);
        font-family: 'Coolvetica', sans-serif;
        margin: 0;
        padding: 0;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Coolvetica', sans-serif;
    }

    * {
        box-sizing: border-box;
    }
`; 