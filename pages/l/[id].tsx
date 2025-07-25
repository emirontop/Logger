import { useRouter } from "next/router";
import { useEffect } from "react";
import links from "../../data/links.json";

export default function Redirect() {
  const { query } = useRouter();

  useEffect(() => {
    if (typeof query.id === "string") {
      const url = links[query.id];
      if (url) location.href = url;
    }
  }, [query.id]);

  return <p>Yönlendiriliyor...</p>;
}
