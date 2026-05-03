import { NextResponse } from "next/server";

function formatNumber(n: number): string {
  if (!n) return "–";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export async function POST(request: Request) {
  try {
    const { query = "tiktokshop" } = await request.json();
    const API_TOKEN = process.env.APIFY_API_TOKEN;

    if (!API_TOKEN) {
      return NextResponse.json({ error: "APIFY_API_TOKEN ausente" }, { status: 500 });
    }

    const hashtag = query.replace(/[^a-zA-Z0-9À-ÿ]/g, "").toLowerCase();

    const runRes = await fetch(
      `https://api.apify.com/v2/acts/clockworks~tiktok-scraper/runs?token=${API_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hashtags: [hashtag],
          resultsPerPage: 12,
          maxProfilesPerQuery: 1,
          shouldDownloadVideos: false,
          shouldDownloadCovers: false,
        }),
      }
    );

    const runData = await runRes.json();
    if (!runRes.ok || !runData.data?.defaultDatasetId) {
      return NextResponse.json({ error: "Erro ao iniciar scraper TikTok" }, { status: 500 });
    }

    const datasetId = runData.data.defaultDatasetId;

    let items: any[] = [];
    for (let i = 0; i < 12; i++) {
      await new Promise((r) => setTimeout(r, 5000));
      const dsRes = await fetch(
        `https://api.apify.com/v2/datasets/${datasetId}/items?token=${API_TOKEN}`
      );
      const data = await dsRes.json();
      if (Array.isArray(data) && data.length > 0) {
        items = data;
        break;
      }
    }

    const mapped = items.map((item: any) => ({
      id: item.id,
      author: item.authorMeta?.name || item.authorMeta?.nickName || "creator",
      title: item.text || "",
      thumbnail:
        item.covers?.default ||
        item.covers?.dynamic ||
        item.videoMeta?.coverUrl ||
        "",
      videoUrl: item.webVideoUrl || item.videoUrl || "",
      views: formatNumber(item.playCount),
      likes: formatNumber(item.diggCount),
    }));

    return NextResponse.json(mapped);
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
