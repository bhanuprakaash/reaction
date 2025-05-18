import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: string;
  color: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

const SuccessBlast: React.FC<{success: boolean}> = ({ success }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const colors: string[] = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-teal-500",
  ];

  const triggerBlast = (): void => {
    const newParticles: Particle[] = [];
    const particleCount: number = 30;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: `particle-${Date.now()}-${i}`,
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.random() * 400 - 200,
        y: -Math.random() * 500 - 100,
        scale: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * 360,
      });
    }

    setParticles((prevParticles) => [...prevParticles, ...newParticles]);

    setTimeout(() => {
      setParticles((prevParticles) =>
        prevParticles.filter((p) => !newParticles.includes(p))
      );
    }, 2000);
  };

  useEffect(() => {
    if (success) triggerBlast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <div className="pointer-events-none fixed left-0 bottom-0 w-full h-full z-50">
      <div className="relative h-full w-full">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${particle.color}`}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              rotate: 0,
              opacity: 0,
              bottom: "10%",
              left: "50%",
            }}
            animate={{
              x: particle.x,
              y: particle.y,
              scale: particle.scale,
              rotate: particle.rotation,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
            style={{
              width: "20px",
              height: "20px",
              marginLeft: "-10px",
              marginBottom: "-10px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SuccessBlast;
