import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItemProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ children, href, className = '' }) => {
  if (href) {
    return (
      <li className="flex items-center">
        <Link to={href} className={`text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 ${className}`}>
          {children}
        </Link>
        <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
      </li>
    );
  }
  
  return (
    <li className="flex items-center">
      <span className={`text-gray-500 dark:text-gray-400 ${className}`}>
        {children}
      </span>
    </li>
  );
};

interface BreadcrumbProps {
  children: ReactNode;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> & { Item: typeof BreadcrumbItem } = ({ 
  children, 
  className = '' 
}) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {children}
      </ol>
    </nav>
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
