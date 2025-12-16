import React from 'react';

const Button = ({ children, onClick, variant = 'primary' }) => {
  const buttonStyle = {
    padding: '12px 24px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    background:
      variant === 'primary'
        ? 'linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)'
        : '#E5E7EB',
    color: variant === 'primary' ? '#FFFFFF' : '#374151',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
