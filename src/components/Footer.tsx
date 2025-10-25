import { SOCIAL_LINKS } from "../constants/data";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-semibold mb-4 text-gray-200">
              Created by
            </h4>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300"
            >
              Kristiyan Velkov
            </a>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-gray-200">
              Resources
            </h4>
            <div className="flex flex-col space-y-2">
              <a
                href={SOCIAL_LINKS.newsletter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300"
              >
                📧 Frontend World Newsletter
              </a>
              <a
                href={SOCIAL_LINKS.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300"
              >
                📝 Blog on Medium
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-gray-200">
              Support
            </h4>
            <div className="flex flex-col space-y-2">
              <a
                href={SOCIAL_LINKS.donate}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300"
              >
                💳 Donate via Stripe
              </a>
              <a
                href={SOCIAL_LINKS.githubSponsors}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300"
              >
                💖 GitHub Sponsors
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400">
            Open Source • MIT License • Part of Docker Official Documentation
          </p>
        </div>
      </div>
    </footer>
  );
};
