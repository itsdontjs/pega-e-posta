import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { searchQuery, country_code } = await request.json();
    const API_TOKEN = process.env.APIFY_API_TOKEN;

    if (!API_TOKEN) return NextResponse.json({ error: "Token ausente" }, { status: 500 });

    const runRes = await fetch(`https://api.apify.com/v2/acts/pratikdani~tiktok-shop-search-scraper/runs?token=${API_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "keywords": searchQuery, 
        "country_code": country_code || "BR",
        "limit": 10
      })
    });

    const runData = await runRes.json();
    if (!runRes.ok || !runData.data) return NextResponse.json({ error: "Erro no robô Pratikdani" }, { status: 500 });

    const datasetId = runData.data.defaultDatasetId;

    let items = [];
    for (let i = 0; i < 6; i++) {
      await new Promise(r => setTimeout(r, 5000));
      const dsRes = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${API_TOKEN}`);
      const data = await dsRes.json();
      if (data && data.length > 0) {
        items = data;
        break;
      }
    }
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}