import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { productUrl } = await request.json();
    const API_TOKEN = process.env.APIFY_API_TOKEN;

    if (!API_TOKEN) return NextResponse.json({ error: "Token ausente" }, { status: 500 });
    // Se a URL vier como '#' ou vazia, o código para aqui
    if (!productUrl || productUrl === "#" || !productUrl.includes('http')) {
      return NextResponse.json({ error: "URL do produto inválida" }, { status: 400 });
    }

    const runRes = await fetch(`https://api.apify.com/v2/acts/george.the.developer~tiktok-shop-affiliate-sales-scraper/runs?token=${API_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "productUrl": productUrl, 
        "maxCreators": 10,
        "proxyConfiguration": { "useApifyProxy": true, "apifyProxyGroups": ["RESIDENTIAL"] }
      })
    });

    const runData = await runRes.json();
    if (!runRes.ok || !runData.data) return NextResponse.json({ error: "Erro ao iniciar robô do George" }, { status: 500 });

    const datasetId = runData.data.defaultDatasetId;

    let items = [];
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 6000));
      const dsRes = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${API_TOKEN}`);
      const data = await dsRes.json();
      if (data && data.length > 0) {
        items = data;
        break;
      }
    }
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}