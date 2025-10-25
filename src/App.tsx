import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { QuickStart } from "./components/QuickStart";
import { Footer } from "./components/Footer";

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
