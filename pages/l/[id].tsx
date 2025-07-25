import { useRouter } from "next/router";
import { useEffect } from "react";
import links from "../../data/links.json";

export default function RedirectPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (typeof id === "string") {
      const target = links[id];
      if (target) {
        window.location.href = target;
      }
    }
  }, [id]);

  return <p>Yönlendiriliyor…</p>;
}
