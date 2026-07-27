import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconGlobe = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3Z" />
  </svg>
);

export const IconMonitor = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </svg>
);

export const IconCalendar = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01" />
  </svg>
);

export const IconChat = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12Z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
  </svg>
);

export const IconPuzzle = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 4a2 2 0 0 1 4 0c0 .7.5 1 1 1h3a1 1 0 0 1 1 1v3c0 .5.3 1 1 1a2 2 0 0 1 0 4c-.7 0-1 .5-1 1v3a1 1 0 0 1-1 1h-3c-.5 0-1-.3-1-1a2 2 0 0 0-4 0c0 .7-.5 1-1 1H4a1 1 0 0 1-1-1v-3c0-.5-.3-1-1-1a2 2 0 0 1 0-4c.7 0 1-.5 1-1V6a1 1 0 0 1 1-1h3c.5 0 1-.3 1-1Z" />
  </svg>
);

export const IconWrench = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14.7 6.3a4 4 0 0 0-5.6 4.6L3 17l4 4 6.1-6.1a4 4 0 0 0 4.6-5.6l-2.8 2.8-2.8-.8-.8-2.8 2.6-2.2Z" />
  </svg>
);

export const IconBars = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 21h18" />
    <rect x="5" y="11" width="3.5" height="7" rx="1" />
    <rect x="10.5" y="7" width="3.5" height="11" rx="1" />
    <rect x="16" y="4" width="3.5" height="14" rx="1" />
  </svg>
);

export const IconPhone = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="7" y="2" width="10" height="20" rx="2.5" />
    <path d="M11 18h2" />
  </svg>
);

export const IconUsersGear = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <circle cx="18" cy="7" r="2.2" />
    <path d="M18 3.5v1M18 9.5v1M21 7h-1M16 7h-1" />
  </svg>
);

export const IconArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconChevronLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m14.5 6-6 6 6 6" />
  </svg>
);

export const IconChevronRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m9.5 6 6 6-6 6" />
  </svg>
);

export const IconPause = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9.5 5v14M14.5 5v14" />
  </svg>
);

export const IconPlay = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const IconCheckCircle = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
);

export const IconHelp = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.3 9.2a2.7 2.7 0 0 1 5.2 1c0 1.8-2.7 2.3-2.7 4M12 17h.01" />
  </svg>
);

export const IconChatBubble = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" />
  </svg>
);

export const IconDoc = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M19 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
    <path d="M9 13h6M9 17h4" />
  </svg>
);

export const IconCode = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />
  </svg>
);

export const IconEye = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconRocket = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.8-.8.8-2.2 0-3a2.1 2.1 0 0 0-3 0Z" />
    <path d="M12 15 9 12c1-4 4-8.5 10-9 .5 6-4.5 9-9 10Z" />
    <path d="M9 12H5s.5-2.5 2-3.5 3 0 3 0M12 15v4s2.5-.5 3.5-2 0-3 0-3" />
  </svg>
);

export const IconHeadset = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
    <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
    <path d="M20 19a4 4 0 0 1-4 3h-2" />
  </svg>
);

export const IconClock = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconSmile = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01" />
  </svg>
);

export const IconStar = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 3 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.2l1-5.9L3.5 9.2l5.9-.8Z" />
  </svg>
);

export const IconQuote = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9.5 6C6.5 7.4 5 9.9 5 13.5V18h5.5v-5.5H8c0-2 .6-3.4 2.4-4.4Z" />
    <path d="M19 6c-3 1.4-4.5 3.9-4.5 7.5V18H20v-5.5h-2.5c0-2 .6-3.4 2.4-4.4Z" />
  </svg>
);

export const IconTrendingUp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m3 17 6-6 4 4 8-8" />
    <path d="M17 7h4v4" />
  </svg>
);

export const IconSparkles = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3v4M12 17v4M5 12H1M23 12h-4M6.5 6.5 4 4M20 20l-2.5-2.5M17.5 6.5 20 4M4 20l2.5-2.5" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconUser = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </svg>
);

export const IconTag = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 11.5V5a2 2 0 0 1 2-2h6.5a2 2 0 0 1 1.4.6l8 8a2 2 0 0 1 0 2.8l-6.5 6.5a2 2 0 0 1-2.8 0l-8-8A2 2 0 0 1 3 11.5Z" />
    <path d="M8 8h.01" />
  </svg>
);

export const IconMail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const IconMapPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const IconPhoneCall = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 3h3l1.5 5-2 1.5a12 12 0 0 0 6 6l1.5-2 5 1.5v3a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2Z" />
  </svg>
);

export const IconPlus = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMenu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

/* Brand glyphs (filled) */
export const IconWhatsApp = (p: IconProps) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.75.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);

export const IconInstagram = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="M16.8 7.2h.01" />
  </svg>
);

export const IconLinkedin = (p: IconProps) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.4h3.28V21H3.3V8.4Zm5.3 0h3.14v1.72h.05c.44-.83 1.5-1.71 3.1-1.71 3.32 0 3.93 2.18 3.93 5.02V21h-3.28v-5.9c0-1.4-.03-3.22-1.96-3.22-1.96 0-2.26 1.53-2.26 3.11V21H8.6V8.4Z" />
  </svg>
);
