import React from 'react';

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
  divide?: boolean;
}

const TableBody: React.FC<TableBodyProps> = ({ 
  children, 
  className = '',
  divide = true,
  ...props 
}) => {
  return (
    <tbody 
      className={`${divide ? 'divide-y divide-gray-200 dark:divide-gray-700' : ''} bg-white dark:bg-gray-800 ${className}`}
      {...props}
    >
      {children}
    </tbody>
  );
};

export default TableBody;
