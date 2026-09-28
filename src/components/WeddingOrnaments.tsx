import React from 'react';

/**
 * Ornate Baroque Filigree Corner (Gold / Metallic)
 */
export function BaroqueCorner({
  className = 'w-10 h-10',
  color = '#D4AF37',
  position = 'top-left',
}: {
  className?: string;
  color?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) {
  const rotationClass = {
    'top-left': '',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]',
  }[position];

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${rotationClass} pointer-events-none drop-shadow-xs`}
    >
      {/* Outer corner lines */}
      <path
        d="M6 94V20C6 12.268 12.268 6 20 6H94"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M14 94V26C14 19.3726 19.3726 14 26 14H94"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      {/* Delicate floral filigree flourish */}
      <path
        d="M20 20C28 22 36 30 36 40C36 48 30 54 22 54C14 54 10 46 12 38C14 30 22 24 30 24C42 24 50 34 50 48C50 62 40 72 26 74"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="20" r="3" fill={color} />
      <circle cx="56" cy="14" r="2" fill={color} />
      <circle cx="14" cy="56" r="2" fill={color} />
    </svg>
  );
}

/**
 * Botanical Floral Sprays (Watercolor style SVG)
 */
export function FloralSpray({
  variant = 'crimson',
  position = 'bottom-right',
  className = 'w-24 h-24',
}: {
  variant?: 'crimson' | 'peach' | 'vintage' | 'wildflower';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}) {
  const rotationClass = {
    'top-left': 'scale-[-1]',
    'top-right': 'scale-y-[-1]',
    'bottom-left': 'scale-x-[-1]',
    'bottom-right': '',
  }[position];

  if (variant === 'crimson') {
    // Red roses & golden botanical eucalyptus (Starlit Garden theme)
    return (
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} ${rotationClass} pointer-events-none drop-shadow-md`}
      >
        <g opacity="0.95">
          {/* Golden leaves background */}
          <path
            d="M90 60C110 30 145 25 155 40C165 55 140 80 115 80C95 80 85 70 90 60Z"
            fill="url(#goldLeaf)"
            opacity="0.85"
          />
          <path
            d="M50 100C40 120 45 150 60 155C75 160 95 135 90 115C85 100 70 90 50 100Z"
            fill="url(#goldLeaf)"
            opacity="0.85"
          />
          {/* Deep dark green leaves */}
          <path
            d="M100 105C125 90 150 100 155 115C160 130 135 145 115 135C100 125 95 115 100 105Z"
            fill="#1C3829"
          />
          <path
            d="M60 55C40 70 30 50 40 35C50 20 75 35 70 50Z"
            fill="#2D5A43"
          />

          {/* Large Crimson Rose */}
          <circle cx="115" cy="115" r="32" fill="url(#crimsonRoseGrad)" />
          <path
            d="M105 100C115 95 128 98 132 108C136 118 126 128 116 128C106 128 100 118 102 110"
            stroke="#FEE2E2"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M110 110C115 106 122 108 123 113C124 118 119 122 114 122"
            stroke="#FECDD3"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Secondary Velvet Rose */}
          <circle cx="75" cy="80" r="22" fill="url(#crimsonRoseDark)" />
          <path
            d="M68 70C75 66 83 69 86 76C89 83 82 89 75 89"
            stroke="#FECDD3"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Small rose bud */}
          <circle cx="138" cy="68" r="14" fill="#991B1B" />
          <circle cx="138" cy="68" r="9" fill="#DC2626" />
        </g>
        <defs>
          <linearGradient id="crimsonRoseGrad" x1="90" y1="90" x2="145" y2="145" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E11D48" />
            <stop offset="0.4" stopColor="#BE123C" />
            <stop offset="0.8" stopColor="#881337" />
            <stop offset="1" stopColor="#4C0519" />
          </linearGradient>
          <linearGradient id="crimsonRoseDark" x1="55" y1="60" x2="95" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#BE123C" />
            <stop offset="0.6" stopColor="#881337" />
            <stop offset="1" stopColor="#4C0519" />
          </linearGradient>
          <linearGradient id="goldLeaf" x1="50" y1="50" x2="150" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" />
            <stop offset="0.5" stopColor="#D4AF37" />
            <stop offset="1" stopColor="#92400E" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (variant === 'peach') {
    // Peach Peony & Watercolor soft roses (Golden Soirée theme)
    return (
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} ${rotationClass} pointer-events-none drop-shadow-sm`}
      >
        <g opacity="0.95">
          {/* Sage & Olive leaves */}
          <path
            d="M95 50C120 30 145 35 150 50C155 65 130 85 110 80C95 75 88 65 95 50Z"
            fill="#8BA888"
          />
          <path
            d="M50 95C35 120 40 145 55 150C70 155 90 130 85 110C80 95 65 88 50 95Z"
            fill="#A3B899"
          />
          {/* Large Peach Peony */}
          <circle cx="115" cy="115" r="34" fill="url(#peachRoseGrad)" />
          <path
            d="M102 100C114 94 126 96 132 105C138 114 130 126 118 126C108 126 100 116 102 108"
            stroke="#FFF7ED"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M108 110C114 106 122 108 124 114C126 120 120 124 114 124"
            stroke="#FFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Secondary blush peach rose */}
          <circle cx="70" cy="78" r="24" fill="url(#blushPeachGrad)" />
          <path
            d="M62 70C70 65 78 68 81 74C84 80 78 86 70 86"
            stroke="#FFF7ED"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.75"
          />
        </g>
        <defs>
          <linearGradient id="peachRoseGrad" x1="90" y1="90" x2="145" y2="145" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FED7AA" />
            <stop offset="0.4" stopColor="#FDBA74" />
            <stop offset="0.8" stopColor="#FB923C" />
            <stop offset="1" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="blushPeachGrad" x1="50" y1="55" x2="90" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE4E6" />
            <stop offset="0.5" stopColor="#FECDD3" />
            <stop offset="1" stopColor="#F43F5E" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (variant === 'vintage') {
    // Espresso / Coffee & Cream Vintage Botanical (Amber Noir theme)
    return (
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} ${rotationClass} pointer-events-none drop-shadow-md`}
      >
        <g opacity="0.9">
          {/* Vintage parchment botanical leaves */}
          <path
            d="M95 50C120 30 145 35 150 50C155 65 130 85 110 80C95 75 88 65 95 50Z"
            fill="#A89F91"
            opacity="0.6"
          />
          <path
            d="M50 95C35 120 40 145 55 150C70 155 90 130 85 110C80 95 65 88 50 95Z"
            fill="#8C8275"
            opacity="0.6"
          />
          {/* Large Vintage Coffee Rose */}
          <circle cx="115" cy="115" r="32" fill="url(#vintageCoffeeRose)" />
          <path
            d="M104 100C115 95 126 97 130 106C134 115 126 124 116 124"
            stroke="#F5EBE1"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Secondary beige rose */}
          <circle cx="70" cy="78" r="22" fill="url(#vintageBeigeRose)" />
        </g>
        <defs>
          <linearGradient id="vintageCoffeeRose" x1="90" y1="90" x2="145" y2="145" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E6D7C3" />
            <stop offset="0.5" stopColor="#C4AD93" />
            <stop offset="1" stopColor="#786350" />
          </linearGradient>
          <linearGradient id="vintageBeigeRose" x1="50" y1="55" x2="90" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5EBE1" />
            <stop offset="0.6" stopColor="#D5C3AE" />
            <stop offset="1" stopColor="#9E8771" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Wildflower (Poised Romance theme)
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${rotationClass} pointer-events-none drop-shadow-sm`}
    >
      <g opacity="0.95">
        <path d="M100 40C125 25 150 40 150 60C140 80 120 75 110 65Z" fill="#3B82F6" opacity="0.5" />
        <path d="M40 100C25 125 40 150 60 150C80 140 75 120 65 110Z" fill="#8B5CF6" opacity="0.5" />
        <circle cx="115" cy="115" r="30" fill="url(#wildflowerGrad)" />
        <circle cx="72" cy="75" r="20" fill="#EC4899" opacity="0.75" />
      </g>
      <defs>
        <linearGradient id="wildflowerGrad" x1="90" y1="90" x2="145" y2="145" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F472B6" />
          <stop offset="0.6" stopColor="#A855F7" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Traditional Double Happiness (囍) Gold/Red Calligraphy Medallion
 */
export function DoubleHappinessMedallion({
  size = 54,
  variant = 'gold',
}: {
  size?: number;
  variant?: 'gold' | 'red';
}) {
  const isGold = variant === 'gold';

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full flex items-center justify-center shadow-lg transition-transform ${
        isGold
          ? 'bg-gradient-to-tr from-[#B8860B] via-[#E6C687] to-[#FFF3D1] border-2 border-[#FAF5E4] text-[#5A3806]'
          : 'bg-gradient-to-tr from-[#991B1B] via-[#DC2626] to-[#EF4444] border-2 border-[#FDE68A] text-[#FEF08A]'
      }`}
    >
      {/* Outer circular dotted ring */}
      <div className="absolute inset-1 rounded-full border border-dashed border-current opacity-40 pointer-events-none" />
      <span className="font-serif font-black text-2xl tracking-tight select-none drop-shadow-xs">
        囍
      </span>
    </div>
  );
}

/**
 * Realistic 3D Wax Seal with Scalloped Edge and Monogram
 */
export function RealisticWaxSeal({
  initials = '囍',
  size = 64,
  variant = 'gold',
  onClick,
}: {
  initials?: string;
  size?: number;
  variant?: 'gold' | 'crimson' | 'rose' | 'amber';
  onClick?: () => void;
}) {
  const gradientStyles = {
    gold: {
      outer: 'from-[#8C6D1F] via-[#D4AF37] to-[#FCEEB5]',
      border: 'border-[#FFFBEB]/70',
      text: 'text-[#4A3206]',
      ring: 'border-[#5A3F0A]/40',
      shadow: 'shadow-[0_8px_20px_rgba(180,130,20,0.45)]',
    },
    crimson: {
      outer: 'from-[#580D18] via-[#991B1B] to-[#E11D48]',
      border: 'border-[#FECDD3]/50',
      text: 'text-[#FFE4E6]',
      ring: 'border-[#FFE4E6]/40',
      shadow: 'shadow-[0_8px_20px_rgba(120,20,20,0.5)]',
    },
    rose: {
      outer: 'from-[#9F1239] via-[#E11D48] to-[#FDA4AF]',
      border: 'border-[#FFF]/60',
      text: 'text-white',
      ring: 'border-white/40',
      shadow: 'shadow-[0_8px_20px_rgba(180,40,80,0.4)]',
    },
    amber: {
      outer: 'from-[#29221D] via-[#635345] to-[#BFA893]',
      border: 'border-[#F5EBE1]/60',
      text: 'text-[#F5EBE1]',
      ring: 'border-[#F5EBE1]/40',
      shadow: 'shadow-[0_8px_20px_rgba(40,30,20,0.5)]',
    },
  }[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`group relative rounded-full bg-gradient-to-tr ${gradientStyles.outer} border-2 ${gradientStyles.border} ${gradientStyles.shadow} flex items-center justify-center transform transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none`}
    >
      {/* Scalloped irregular melted wax rim */}
      <div className="absolute -inset-1 rounded-full bg-current opacity-15 filter blur-[1px] pointer-events-none" />

      {/* Inner embossed rim */}
      <div
        className={`w-4/5 h-4/5 rounded-full border-2 border-dashed ${gradientStyles.ring} flex items-center justify-center`}
      >
        <span
          className={`font-serif font-black text-xl sm:text-2xl ${gradientStyles.text} drop-shadow-sm select-none`}
        >
          {initials}
        </span>
      </div>
    </button>
  );
}

/**
 * Luxury Architectural Date Badge (Like in the user's reference)
 * Format:
 *   CHỦ NHẬT
 * THÁNG 10 | 26 | 2026
 */
export function ArchitecturalDateBadge({
  dateStr = '26/10/2026',
  textColor = 'text-stone-900',
  borderColor = 'border-stone-300',
  subTextColor = 'text-stone-500',
}: {
  dateStr?: string;
  textColor?: string;
  borderColor?: string;
  subTextColor?: string;
}) {
  // Parse standard dd/mm/yyyy or yyyy-mm-dd
  let day = '26';
  let month = '10';
  let year = '2026';

  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      day = parts[0];
      month = parts[1];
      year = parts[2];
    }
  } else if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      year = parts[0];
      month = parts[1];
      day = parts[2];
    }
  }

  return (
    <div className="inline-flex flex-col items-center select-none">
      <span
        className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] ${subTextColor} mb-1`}
      >
        Chủ Nhật
      </span>
      <div
        className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1 border-y ${borderColor}`}
      >
        <span className={`text-[10px] sm:text-xs font-serif uppercase tracking-widest ${subTextColor}`}>
          Tháng {month}
        </span>
        <div className={`w-[1px] h-4 bg-current opacity-30`} />
        <span className={`font-serif text-lg sm:text-2xl font-bold tracking-tight ${textColor}`}>
          {day}
        </span>
        <div className={`w-[1px] h-4 bg-current opacity-30`} />
        <span className={`text-[10px] sm:text-xs font-serif tracking-widest ${subTextColor}`}>
          {year}
        </span>
      </div>
    </div>
  );
}

/**
 * Romantic Calligraphy Ampersand (&)
 */
export function CalligraphyAmpersand({ color = '#D4AF37', className = 'text-2xl sm:text-3xl' }: { color?: string; className?: string }) {
  return (
    <span
      style={{ color }}
      className={`font-script italic font-normal mx-2.5 inline-block select-none drop-shadow-xs ${className}`}
    >
      &amp;
    </span>
  );
}
