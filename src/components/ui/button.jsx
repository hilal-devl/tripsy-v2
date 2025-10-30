import { forwardRef } from 'react';

const variants = {
  default:
    'bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
  outline:
    'border border-primary-200 bg-white text-primary-600 hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
  ghost:
    'bg-transparent text-primary-600 hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
};

const sizes = {
  default: 'h-10 px-4 py-2 text-sm font-medium rounded-lg transition',
  sm: 'h-9 px-3 text-sm font-medium rounded-lg transition',
  lg: 'h-11 px-6 text-base font-semibold rounded-lg transition',
};

const Button = forwardRef(function Button(
  { asChild = false, className = '', variant = 'default', size = 'default', ...props },
  ref
) {
  const Component = asChild ? 'span' : 'button';
  const variantClasses = variants[variant] ?? variants.default;
  const sizeClasses = sizes[size] ?? sizes.default;

  return (
    <Component
      ref={ref}
      className={`${sizeClasses} ${variantClasses} disabled:pointer-events-none disabled:opacity-60 ${className}`}
      type={Component === 'button' && !props.type ? 'button' : props.type}
      {...props}
    />
  );
});

export { Button };
