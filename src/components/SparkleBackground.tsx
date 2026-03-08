const SparkleBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Purple orb */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-float-orb opacity-30 blur-[100px]"
        style={{
          background: "hsl(263 70% 60%)",
          top: "10%",
          left: "10%",
        }}
      />
      {/* Pink orb */}
      <div
        className="absolute w-[350px] h-[350px] rounded-full animate-float-orb-reverse opacity-25 blur-[100px]"
        style={{
          background: "hsl(330 65% 60%)",
          top: "30%",
          right: "10%",
        }}
      />
      {/* Small purple orb */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full animate-float-orb opacity-20 blur-[80px]"
        style={{
          background: "hsl(263 70% 70%)",
          bottom: "20%",
          left: "40%",
          animationDelay: "3s",
        }}
      />
    </div>
  );
};

export default SparkleBackground;
