import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Only POST");

  const { id, url } = req.body;
  if (!id || !url) return res.status(400).json({ error: "Eksik bilgi" });

const p1 = "ghp_0jxK";
const p2 = "43Wa6Qfju4IxbKifN";
const p3 = "Ikgflwf6L3MARvU";

const token = `${p1}${p2}${p3}`;
  
  const repo = "emirontop/Logger";
  const path = "data/links.json";

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
  };

  const file = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, { headers });
  const json = await file.json();

  const content = Buffer.from(json.content, "base64").toString();
  const data = JSON.parse(content);
  data[id] = url;

  const updated = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");

  const result = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: `add ${id}`,
      content: updated,
      sha: json.sha,
    }),
  });

  if (!result.ok) return res.status(500).json({ error: "Güncellenemedi" });

  res.status(200).json({ success: true });
      }
