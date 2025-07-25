import { useState } from "react";
import links from "../data/links.json";

export default function Home() {
  const [url, setUrl] = useState("");
  const [newId, setNewId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.random().toString(36).substring(2, 8);
    alert(`GitHub'daki data/links.json dosyasına şunu ekle:\n\n"${id}": "${url}"`);
    setNewId(id);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🔗 Link Kısaltıcı</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="https://ornek.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "300px", padding: "0.5rem" }}
        />
        <button type="submit" style={{ marginLeft: "1rem" }}>Kısalt</button>
      </form>
      {newId && (
        <p style={{ marginTop: "1rem" }}>
          Kısa Link: <a href={`/l/${newId}`}>{window.location.origin}/l/{newId}</a>
        </p>
      )}
    </div>
  );
}
