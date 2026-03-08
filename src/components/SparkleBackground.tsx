import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const SparkleBackground = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generated: Sparkle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setSparkles(generated);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            left: `${s.left}%`,
            bottom: `-${s.size}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: `radial-gradient(circle, hsl(43 96% 70%), hsl(280 50% 70%))`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default SparkleBackground;
