import type { Feature } from "../types";

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  return (
    <div
      className="bg-white p-10 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-6xl mb-6">{feature.icon}</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        {feature.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </div>
  );
};

