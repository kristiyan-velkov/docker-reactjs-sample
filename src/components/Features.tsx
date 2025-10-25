import { FeatureCard } from "./FeatureCard";
import { FEATURES } from "../constants/data";

export const Features = () => {
  return (
    <section className="py-24 px-8 bg-gray-50">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-16">
        Why This Sample?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {FEATURES.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
};

