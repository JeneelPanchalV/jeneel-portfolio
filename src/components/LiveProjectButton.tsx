interface LiveProjectButtonProps {
  dark?: boolean;
}

const LiveProjectButton = ({ dark = false }: LiveProjectButtonProps) => {
  return dark ? (
    <button className="rounded-full border-2 border-[#0C0C0C] text-[#0C0C0C] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#0C0C0C]/5 transition-colors">
      View on GitHub
    </button>
  ) : (
    <button className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors">
      View on GitHub
    </button>
  );
};

export default LiveProjectButton;
