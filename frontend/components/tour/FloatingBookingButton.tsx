'use client';

interface FloatingBookingButtonProps {
  onClick: () => void;
  buttonText?: string;
  buttonIcon?: string;
  position?: 'bottom-right' | 'bottom-left';
  showOnMobile?: boolean;
}

export default function FloatingBookingButton({
  onClick,
  buttonText = 'Rezervasyon Yap',
  buttonIcon = 'calendar_month',
  position = 'bottom-right',
  showOnMobile = true,
}: FloatingBookingButtonProps) {
  const positionClasses = position === 'bottom-right' ? 'right-4 md:right-8' : 'left-4 md:left-8';
  const mobileVisibility = showOnMobile ? 'flex' : 'hidden md:flex';

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-4 md:bottom-8 ${positionClasses} ${mobileVisibility} items-center gap-2 bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary text-white font-bold px-4 py-3 md:px-6 md:py-4 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-110 active:scale-95 z-40 group`}
      aria-label={buttonText}
    >
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-primary opacity-75 animate-ping" />
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-green-600" />
      <span className="relative flex items-center gap-2">
        <span className="material-symbols-outlined text-xl md:text-2xl group-hover:animate-bounce">
          {buttonIcon}
        </span>
        <span className="hidden md:inline-block whitespace-nowrap text-sm md:text-base">
          {buttonText}
        </span>
      </span>
    </button>
  );
}
