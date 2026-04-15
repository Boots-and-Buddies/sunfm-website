"use client";

export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Dim vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,209,64,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(203,69,56,0.08) 0%, transparent 55%)",
        }}
      />

      {/* Slow moving glow */}
      <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-[#FFD140]/[0.04] blur-3xl animate-slow-drift" />
      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full bg-[#CB4538]/[0.04] blur-3xl animate-slow-drift-reverse" />
    </div>
  );
}
