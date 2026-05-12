export default function Logo() {
 return   <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/20">
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Laptop */}
        <rect
          x="4"
          y="5"
          width="16"
          height="10"
          rx="2"
          stroke="#A855F7"
          strokeWidth="1.8"
        />

        <path
          d="M2 18H22"
          stroke="#A855F7"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Electronic Pulse */}
        <path
          d="M9 10L11 8L13 12L15 10"
          stroke="#C084FC"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>;
};
