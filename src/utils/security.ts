// Sanitize strings to prevent XSS attacks
export const sanitizeString = (str: string): string => {
    return str.replace(/[<>]/g, '');
  };
  
  // Generate CSRF token
  export const generateCSRFToken = (): string => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };
  
  // Secure storage wrapper with type safety
  export const secureStorage = {
    set: (key: string, value: any): void => {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error('Error saving to storage:', error);
      }
    },
  
    get: <T>(key: string): T | null => {
      try {
        const serializedValue = localStorage.getItem(key);
        return serializedValue ? JSON.parse(serializedValue) : null;
      } catch (error) {
        console.error('Error reading from storage:', error);
        return null;
      }
    },
  
    remove: (key: string): void => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from storage:', error);
      }
    }
  };
  
  // Input validation
  export const validateInput = (input: string, type: 'email' | 'url' | 'text' = 'text'): boolean => {
    const sanitized = sanitizeString(input);
    
    switch(type) {
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(sanitized);
      case 'url':
        try {
          new URL(sanitized);
          return true;
        } catch {
          return false;
        }
      default:
        return sanitized.length > 0;
    }
  };