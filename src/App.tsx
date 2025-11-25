import { Routes, Route, Link } from "react-router-dom";
import CharacterListPage from "./pages/CharacterListPage.tsx";
import CharacterDetailPage from "./pages/CharacterDetailPage.tsx";

function App() {
  return (
    <div className="app">
      <header className="app-header" style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
        <Link to="/" className="app-title" style={{ textDecoration: "none", color: "#222" }}>
          <h1>Rick &amp; Morty Explorer</h1>
        </Link>
      </header>

      <main className="app-main" style={{ padding: "1rem", maxWidth: "960px", margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<CharacterListPage />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
