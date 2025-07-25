import { useState } from "react";

export default function Home() {
  const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState("");

  const handleAdd = async () => {
    const res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, url }),
    });
    const data = await res.json();
    if (data.success) {
      setMsg(`✅ Eklendi: /l/${id}`);
    } else {
      setMsg(`❌ Hata: ${data.error}`);
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Logger</h1>
      <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={handleAdd}>Ekle</button>
      <p>{msg}</p>
    </main>
  );
}
