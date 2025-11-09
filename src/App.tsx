import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { QuickStart } from "./components/QuickStart";

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <QuickStart />
      <Footer />
    </div>
  );
}

export default App;
