import { createContext, useContext, useEffect, useRef, useState } from 'react';

const SelectContext = createContext(null);

const Select = ({
  value,
  defaultValue,
  onValueChange,
  open: openProp,
  onOpenChange,
  children,
  disabled = false,
  name,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlledValue = value !== undefined;
  const isControlledOpen = openProp !== undefined;

  const currentValue = isControlledValue ? value : internalValue;
  const currentOpen = isControlledOpen ? openProp : internalOpen;

  const setValue = (nextValue) => {
    if (!isControlledValue) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const setOpen = (nextOpen) => {
    if (!isControlledOpen) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        setValue,
        open: currentOpen && !disabled,
        setOpen,
        disabled,
        name,
      }}
    >
      <div className={`relative ${disabled ? 'opacity-60' : ''}`}>{children}</div>
      {name && <input type="hidden" name={name} value={currentValue} />}
    </SelectContext.Provider>
  );
};

const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a <Select>');
  }
  return context;
};

const SelectTrigger = ({ className = '', placeholder, children, ...props }) => {
  const { open, setOpen, disabled } = useSelect();
  return (
    <button
      type="button"
      className={`flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 ${className}`}
      aria-haspopup="listbox"
      aria-expanded={open}
      onClick={() => !disabled && setOpen(!open)}
      disabled={disabled}
      {...props}
    >
      <span className="truncate">{children ?? placeholder}</span>
      <span aria-hidden>▾</span>
    </button>
  );
};

const SelectValue = ({ placeholder }) => {
  const { value } = useSelect();
  return <span className="truncate">{value || placeholder}</span>;
};

const SelectContent = ({
  children,
  className = '',
  position = 'popper',
  align = 'end',
}) => {
  const { open, setOpen } = useSelect();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, setOpen]);

  if (!open) return null;

  const alignmentClass =
    align === 'start' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0';
  const positionClass = position === 'popper' ? 'absolute z-50 mt-2 w-full' : 'relative';

  return (
    <div
      ref={containerRef}
      className={`${positionClass} ${alignmentClass}`.trim()}
      role="presentation"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <ul
        className={`max-h-60 overflow-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg ${className}`}
        role="listbox"
      >
        {children}
      </ul>
    </div>
  );
};

const SelectItem = ({ value, children, className = '' }) => {
  const { setValue, setOpen, value: selected } = useSelect();
  const isActive = selected === value;

  return (
    <li
      role="option"
      aria-selected={isActive}
      onMouseDown={(event) => event.preventDefault()}
      onClick={(event) => {
        event.stopPropagation();
        setValue(value);
        setOpen(false);
      }}
      className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition hover:bg-primary-50 ${
        isActive ? 'bg-primary-100 text-primary-700' : 'text-slate-700'
      } ${className}`}
    >
      <span>{children}</span>
      {isActive && <span aria-hidden>✓</span>}
    </li>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
