import { NextResponse } from "next/server";

// Força o Vercel a estender o timeout dessa rota (Máx 60s no Hobby)
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { searchQuery, country_code } = await request.json();
    const API_TOKEN = process.env.APIFY_API_TOKEN;

    if (!API_TOKEN) {
      console.error("[RADAR] Erro: API_TOKEN da Apify não configurado.");
      return NextResponse.json({ error: "Token ausente no Vercel" }, { status: 500 });
    }

    console.log(`[RADAR] Iniciando extração para: ${searchQuery} (${country_code})`);

    const runRes = await fetch(
      `https://api.apify.com/v2/acts/pratikdani~tiktok-shop-search-scraper/run-sync-get-dataset-items?token=${API_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "keywords": searchQuery,
          "country_code": country_code || "BR",
          "limit": 10
        })
      }
    );

    if (!runRes.ok) {
      const errorText = await runRes.text();
      console.error("[RADAR] Falha na API da Apify:", errorText);
      return NextResponse.json({ error: "Erro ao se comunicar com a Apify" }, { status: 502 });
    }

    const items = await runRes.json();
    console.log(`[RADAR] Sucesso! ${items.length} produtos minerados.`);

    return NextResponse.json(items);

  } catch (error) {
    console.error("[RADAR] Exceção crítica:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
