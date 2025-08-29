export type Tokens = {
  colors: {
    background: string; surface: string; card: string; border: string; muted: string; text: string;
    primary: string; primaryText: string; danger: string; success: string;
  };
  spacing: { xs: number; sm: number; md: number; lg: number; xl: number };
  radius: { sm: number; md: number; lg: number };
  typography: { h1: number; h2: number; body: number; small: number };
};

export const lightTokens: Tokens = {
  colors: {
    background: '#f7fafc', surface: '#ffffff', card: '#ffffff', border: '#e5e7eb',
    muted: '#6b7280', text: '#111827', primary: '#0ea5e9', primaryText: '#ffffff',
    danger: '#dc2626', success: '#16a34a'
  },
  spacing: { xs: 6, sm: 10, md: 14, lg: 18, xl: 24 },
  radius: { sm: 10, md: 14, lg: 20 },
  typography: { h1: 22, h2: 18, body: 16, small: 14 }
};

export const darkTokens: Tokens = {
  colors: {
    background: '#0b1020', surface: '#121831', card: '#1a2242', border: '#273055',
    muted: '#8fa3d2', text: '#e6ecff', primary: '#5eead4', primaryText: '#0b1020',
    danger: '#f87171', success: '#86efac'
  },
  spacing: { xs: 6, sm: 10, md: 14, lg: 18, xl: 24 },
  radius: { sm: 10, md: 14, lg: 20 },
  typography: { h1: 22, h2: 18, body: 16, small: 14 }
};
