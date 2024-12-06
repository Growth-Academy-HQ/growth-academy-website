type ValidationRule = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean;
    validValues?: string[];
  };
  
  type ValidationRules = {
    [key: string]: ValidationRule;
  };
  
  type ValidationError = {
    field: string;
    message: string;
  };
  
  export const commonPatterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    // Add more patterns as needed
  };
  
  export const validateData = (data: any, rules: ValidationRules): ValidationError[] => {
    const errors: ValidationError[] = [];
  
    Object.entries(rules).forEach(([field, rule]) => {
      const value = data[field];
  
      // Required check
      if (rule.required && (!value || value.toString().trim() === '')) {
        errors.push({
          field,
          message: `${field} is required`
        });
        return;
      }
  
      if (value) {
        // Min length check
        if (rule.minLength && value.length < rule.minLength) {
          errors.push({
            field,
            message: `${field} must be at least ${rule.minLength} characters`
          });
        }
  
        // Max length check
        if (rule.maxLength && value.length > rule.maxLength) {
          errors.push({
            field,
            message: `${field} must not exceed ${rule.maxLength} characters`
          });
        }
  
        // Pattern check
        if (rule.pattern && !rule.pattern.test(value)) {
          errors.push({
            field,
            message: `${field} format is invalid`
          });
        }
  
        // Valid values check
        if (rule.validValues && !rule.validValues.includes(value)) {
          errors.push({
            field,
            message: `${field} must be one of: ${rule.validValues.join(', ')}`
          });
        }
  
        // Custom validation
        if (rule.custom && !rule.custom(value)) {
          errors.push({
            field,
            message: `${field} validation failed`
          });
        }
      }
    });
  
    return errors;
  };
  
  // Sanitize user input
  export const sanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove < and >
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  };
  
  // Example validation rules for different types of data
  export const validationRules = {
    marketingPlan: {
      planName: {
        required: true,
        minLength: 3,
        maxLength: 100
      },
      businessIdea: {
        required: true,
        minLength: 10,
        maxLength: 1000
      },
      targetMarket: {
        required: true,
        minLength: 10,
        maxLength: 500
      },
      currentStage: {
        required: true,
        validValues: ['idea', 'early', 'growing', 'established']
      },
      marketingGoals: {
        required: true,
        minLength: 10,
        maxLength: 1000
      },
      budget: {
        required: true,
        validValues: ['small', 'medium', 'large']
        // Removed the custom number validation since we're using predefined values
      }
    },
    contact: {
      fullName: {
        required: true,
        minLength: 2,
        maxLength: 100
      },
      email: {
        required: true,
        pattern: commonPatterns.email
      },
      message: {
        required: true,
        minLength: 10,
        maxLength: 1000
      }
    }
  };