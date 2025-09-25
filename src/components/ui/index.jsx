import React from 'react';

// ====== ICONS ====== //
export const LinkIcon = ({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

export const PlusIcon = ({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export const ChartBarIcon = ({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export const TrashIcon = ({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const ClipboardIcon = ({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m-6 4h.01M12 12h.01M16 12h.01" />
  </svg>
);

export const CheckIcon = ({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

export const PencilIcon = ({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

export const RestoreIcon = ({ className, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6-6m-6 6l6 6" />
  </svg>
);

/** ✅ Nuevo: icono de Archivar (ArchiveIcon) */
export const ArchiveIcon = ({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h18a1 1 0 011 1v4H2V4a1 1 0 011-1zm0 6h20v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9zm6 4a1 1 0 000 2h6a1 1 0 100-2H9z"/>
  </svg>
);

// ====== COMPONENTS ====== //

export const Card = ({ children, className = '' }) => (
  <div className={`card shadow-sm ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={`card-header ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '', style }) => (
  <div className={`card-body ${className}`} style={style}>
    {children}
  </div>
);

export const Button = ({ children, className = '', variant = 'primary', size, ...props }) => {
  const variantClasses = {
    primary: 'btn-primary',
    danger: 'btn-danger',
    ghost: 'btn-light',
  };
  const sizeClass = size ? `btn-${size}` : '';
  const baseClasses = 'btn';

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Input = ({ className = '', ...props }) => (
  <input
    className={`form-control ${className}`}
    {...props}
  />
);

export const Spinner = ({ className = '', style }) => (
  <div className={`spinner-border text-primary ${className}`} style={style} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);

export const Toast = ({ message, type, onDismiss }) => {
  const alertType = type === 'success' ? 'alert-success' : 'alert-danger';

  return (
    <div className={`alert ${alertType} alert-dismissible fade show`} role="alert">
      {message}
      <button type="button" className="btn-close" onClick={onDismiss} aria-label="Close"></button>
    </div>
  );
};

export const ToastContainer = ({ toasts, dismissToast }) => (
  <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
    {toasts.map((toast) => (
      <Toast key={toast.id} {...toast} onDismiss={() => dismissToast(toast.id)} />
    ))}
  </div>
);
