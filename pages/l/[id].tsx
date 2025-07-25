import { useRouter } from "next/router";
import { useEffect } from "react";
import links from "../../data/links.json";

type LinksType = {
  [key: string]: string;
};

export default function Redirect() {
  const { query } = useRouter();

  useEffect(() => {
    if (typeof query.id === "string") {
      const typedLinks = links as LinksType;  // Burada tip ataması yapıyoruz
      const url = (links as Record<string, string>)[query.id];
      if (url) location.href = url;
    }
  }, [query.id]);

  return <p>Yönlendiriliyor...</p>;
}
