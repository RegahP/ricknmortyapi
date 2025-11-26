import { Routes, Route, Link } from "react-router-dom";
import CharacterListPage from "./pages/CharacterListPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";

function App() {
  return (
    <div className="app flex flex-col min-h-screen">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-emerald-600">
            Rick &amp; Morty Explorer
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <Routes>
          <Route path="/" element={<CharacterListPage />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />
        </Routes>
      </main>

      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-3 text-xs text-slate-500">
          Rick &amp; Morty Explorer
        </div>
      </footer>
    </div>
  );
}

export default App;