import { createContext, useContext, useReducer, useEffect } from 'react';

// Theme Context
const ThemeContext = createContext();

// Theme Actions
const THEME_ACTIONS = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_THEME: 'SET_THEME',
  SET_ACCENT_COLOR: 'SET_ACCENT_COLOR',
  SET_FONT_SIZE: 'SET_FONT_SIZE',
  RESET_SETTINGS: 'RESET_SETTINGS'
};

// Initial State
const initialState = {
  theme: localStorage.getItem('theme') || 'dark',
  accentColor: localStorage.getItem('accentColor') || '#06B6D4',
  fontSize: localStorage.getItem('fontSize') || 'medium',
  animations: localStorage.getItem('animations') !== 'false'
};

// Theme Reducer
function themeReducer(state, action) {
  switch (action.type) {
    case THEME_ACTIONS.TOGGLE_THEME:
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return { ...state, theme: newTheme };
    
    case THEME_ACTIONS.SET_THEME:
      localStorage.setItem('theme', action.payload);
      return { ...state, theme: action.payload };
    
    case THEME_ACTIONS.SET_ACCENT_COLOR:
      localStorage.setItem('accentColor', action.payload);
      return { ...state, accentColor: action.payload };
    
    case THEME_ACTIONS.SET_FONT_SIZE:
      localStorage.setItem('fontSize', action.payload);
      return { ...state, fontSize: action.payload };
    
    case THEME_ACTIONS.RESET_SETTINGS:
      localStorage.removeItem('theme');
      localStorage.removeItem('accentColor');
      localStorage.removeItem('fontSize');
      localStorage.removeItem('animations');
      return initialState;
    
    default:
      return state;
  }
}

// Theme Provider Component
export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', state.theme);
    document.documentElement.style.setProperty('--accent-color', state.accentColor);
    document.documentElement.style.setProperty('--font-size-base', 
      state.fontSize === 'small' ? '14px' : 
      state.fontSize === 'large' ? '18px' : '16px'
    );
  }, [state]);

  const value = {
    ...state,
    toggleTheme: () => dispatch({ type: THEME_ACTIONS.TOGGLE_THEME }),
    setTheme: (theme) => dispatch({ type: THEME_ACTIONS.SET_THEME, payload: theme }),
    setAccentColor: (color) => dispatch({ type: THEME_ACTIONS.SET_ACCENT_COLOR, payload: color }),
    setFontSize: (size) => dispatch({ type: THEME_ACTIONS.SET_FONT_SIZE, payload: size }),
    resetSettings: () => dispatch({ type: THEME_ACTIONS.RESET_SETTINGS })
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
