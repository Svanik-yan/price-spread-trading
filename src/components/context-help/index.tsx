import React, { useState } from 'react';

export interface ContextHelpProps {
  title: string;
  content: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
}

export function ContextHelp({ 
  title, 
  content, 
  placement = 'top', 
  children 
}: ContextHelpProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // 计算tooltip的位置类
  const getPlacementClass = () => {
    switch(placement) {
      case 'right': return 'start-100 top-50 translate-middle-y ms-2';
      case 'bottom': return 'top-100 start-50 translate-middle-x mt-2';
      case 'left': return 'end-100 top-50 translate-middle-y me-2';
      default: return 'bottom-100 start-50 translate-middle-x mb-2';
    }
  };
  
  return (
    <div 
      className="position-relative d-inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      
      {showTooltip && (
        <div 
          className={`position-absolute ${getPlacementClass()} z-3`} 
          style={{ width: '200px' }}
        >
          <div className="card border-info shadow">
            <div className="card-header bg-info bg-opacity-25 py-1 px-2">
              <h6 className="mb-0 text-info">
                <i className="bi bi-info-circle me-1"></i>
                {title}
              </h6>
            </div>
            <div className="card-body p-2">
              <small>{content}</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HelpIcon({ title, content, placement = 'top' }: Omit<ContextHelpProps, 'children'>) {
  return (
    <ContextHelp title={title} content={content} placement={placement}>
      <i className="bi bi-question-circle text-info" style={{ cursor: 'help' }}></i>
    </ContextHelp>
  );
} 