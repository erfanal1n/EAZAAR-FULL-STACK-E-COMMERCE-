import { useState, useEffect } from 'react';
export const getResponsiveFontSize = (fontSizes, device = 'desktop') => {
  if (!fontSizes || typeof fontSizes !== 'object') {
    return 16;
  }
  
  const size = fontSizes[device] || fontSizes.desktop || 16;
  return typeof size === 'number' ? size : parseInt(size) || 16;
};

export const getDeviceType = () => {
  if (typeof window === 'undefined') {
    return 'desktop';
  }
  
  const width = window.innerWidth;
  
  if (width >= 1024) {
    return 'desktop';
  } else if (width >= 768) {
    return 'tablet';
  } else {
    return 'mobile';
  }
};

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(() => {
    if (typeof window === 'undefined') {
      return 'desktop';
    }
    return getDeviceType();
  });
  
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return deviceType;
};

export const createResponsiveTypographyStyles = (typography) => {
  if (!typography) return {};
  
  const baseStyles = {
    color: typography.color ? `${typography.color} !important` : undefined,
    fontFamily: typography.fontFamily ? `${typography.fontFamily} !important` : undefined,
    fontWeight: typography.fontWeight ? `${typography.fontWeight} !important` : undefined,
    lineHeight: typography.lineHeight,
    textAlign: typography.textAlign,
    textTransform: typography.textTransform,
    letterSpacing: typography.letterSpacing ? `${typography.letterSpacing}px` : undefined,
    fontSize: `${typography.fontSize?.desktop || 16}px`
  };
  
  Object.keys(baseStyles).forEach(key => {
    if (baseStyles[key] === undefined) {
      delete baseStyles[key];
    }
  });
  
  return baseStyles;
};