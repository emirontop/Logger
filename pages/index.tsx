import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [newId, setNewId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNewId("");
    setLoading(true);

    try {
      const id = Math.random().toString(36).substring(2, 8);

      const res = await fetch("/api/add-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "⚠️ Bilinmeyen bir hata oluştu.");
        return;
      }

      setNewId(id);
    } catch (err) {
      setError("🚫 Sunucuya bağlanırken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif", maxWidth: 600 }}>
      <h1>📝 Logger — Link Oluştur</h1>

      <form onSubmit={handleCreate} style={{ marginBottom: 16 }}>
        <input
          type="url"
          required
          placeholder="https://ornek.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "100%",
            maxWidth: "400px",
            marginRight: "1rem",
            border: "1px solid #ccc",
            borderRadius: 4,
            marginBottom: 8,
          }}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.5rem 1.2rem",
            border: "none",
            background: "#0070f3",
            color: "#fff",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {loading ? "Oluşturuluyor..." : "Oluştur"}
        </button>
      </form>

      {error && (
        <div
          style={{
            backgroundColor: "#ffe5e5",
            padding: "10px 14px",
            borderRadius: 6,
            color: "#d00",
            border: "1px solid #f99",
            marginBottom: 16,
          }}
        >
          ❌ {error}
        </div>
      )}

      {newId && (
        <div
          style={{
            backgroundColor: "#e6f7ff",
            padding: "10px 14px",
            borderRadius: 6,
            border: "1px solid #99d",
            color: "#036",
          }}
        >
          ✅ Link oluşturuldu:<br />
          <strong>
            <a href={`/l/${newId}`} target="_blank" rel="noopener noreferrer">
              {typeof window !== "undefined" ? window.location.origin : ""}/l/{newId}
            </a>
          </strong>
          <br />
          İstatistikler:{" "}
          <strong>
            <a href={`/stats/${newId}`} target="_blank" rel="noopener noreferrer">
              {typeof window !== "undefined" ? window.location.origin : ""}/stats/{newId}
            </a>
          </strong>
        </div>
      )}
    </main>
  );
}
