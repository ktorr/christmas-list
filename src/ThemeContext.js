import React, { createContext, useContext, useState, useEffect } from 'react';
import THEMES from './themes';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [themeId, setThemeId] = useState(
        () => localStorage.getItem('christmasTheme') || 'winter-blue'
    );

    useEffect(() => {
        const theme = THEMES[themeId] || THEMES['winter-blue'];
        const root = document.documentElement;
        root.style.setProperty('--theme-bg', theme.bg);
        root.style.setProperty('--theme-primary', theme.primary);
        root.style.setProperty('--theme-primary-dark', theme.primaryDark);
        root.style.setProperty('--theme-title-text', theme.titleText);
        root.style.setProperty('--theme-link-hover', theme.linkHover);
        root.style.setProperty('--theme-scroll-accent', theme.scrollAccent);
        root.style.setProperty('--theme-scroll-accent-dark', theme.scrollAccentDark);
        root.setAttribute('data-theme', themeId);

        const faviconFile = themeId === 'christmas-forest' ? 'favicon.png' : 'faviconBlue.ico';
        const link = document.querySelector("link[rel='icon']");
        if (link) link.href = `${process.env.PUBLIC_URL}/${faviconFile}`;
    }, [themeId]);

    const changeTheme = (id) => {
        localStorage.setItem('christmasTheme', id);
        setThemeId(id);
    };

    return (
        <ThemeContext.Provider value={{ themeId, changeTheme, themes: THEMES }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
