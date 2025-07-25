import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [newId, setNewId] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. Rastgele ID üret
    const id = Math.random().toString(36).substring(2, 8);

    // 2. API'yi çağır, linki ekle
    const res = await fetch("/api/add-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, url }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      setError(error || "Bilinmeyen hata");
      return;
    }

    // 3. Başarılıysa yeni ID ile state'i güncelle
    setNewId(id);
  };

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
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
            width: "300px",
            marginRight: "1rem",
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            border: "none",
            background: "#0070f3",
            color: "#fff",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Oluştur
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginBottom: 16 }}>❌ {error}</p>
      )}

      {newId && (
        <div style={{ lineHeight: 1.6 }}>
          <p>✅ Link oluşturuldu:</p>
          <a
            href={`/l/${newId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {window.location.origin}/l/{newId}
          </a>
          <p style={{ marginTop: 8 }}>
            Statistikleri görmek için:
            {" "}
            <a
              href={`/stats/${newId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {window.location.origin}/stats/{newId}
            </a>
          </p>
        </div>
      )}
    </main>
  );
}
