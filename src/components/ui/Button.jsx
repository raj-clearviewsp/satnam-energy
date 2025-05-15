import Link from 'next/link';

export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  // Determine button variant class
  const variantClasses = {
    primary: 'bg-sky-cyan text-white hover:bg-sky-cyan/90',
    secondary: 'bg-night-navy text-white hover:bg-night-navy/90',
    outline: 'border border-sky-cyan text-sky-cyan hover:bg-sky-cyan hover:text-white',
    text: 'text-sky-cyan hover:underline',
  };

  const buttonClasses = `px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
    variantClasses[variant]
  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  // Render as link if href is provided
  if (href) {
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}