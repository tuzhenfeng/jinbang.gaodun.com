import React from 'react';

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
  padding?: 'normal' | 'none' | 'tight';
}

const TableCell: React.FC<TableCellProps> = ({
  children,
  className = '',
  align = 'left',
  padding = 'normal',
  ...props
}) => {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[align];

  const paddingClass = {
    normal: 'px-6 py-4',
    tight: 'px-3 py-2',
    none: 'p-0'
  }[padding];

  return (
    <td
      className={`whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 ${paddingClass} ${alignment} ${className}`}
      {...props}
    >
      {children}
    </td>
  );
};

export default TableCell;
