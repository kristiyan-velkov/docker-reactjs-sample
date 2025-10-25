export const OverviewTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#667eea]">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          🎯 Project Structure
        </h3>
        <ul className="space-y-4">
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            <strong>Dockerfile.dev</strong> - Development environment with hot
            reload
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            <strong>Dockerfile</strong> - Multi-stage production build with
            Nginx
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            <strong>compose.yaml</strong> - Docker Compose configuration
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong>nginx.conf</strong> - Nginx server configuration
          </li>
        </ul>
      </div>

      <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#667eea]">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">🔧 Tech Stack</h3>
        <ul className="space-y-4">
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            React 19 with TypeScript
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            Vite for blazing fast builds
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            Docker for containerization
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            Nginx for production serving
          </li>
          <li className="text-gray-700 leading-relaxed">
            ESLint & Vitest for quality
          </li>
        </ul>
      </div>
    </div>
  );
};
