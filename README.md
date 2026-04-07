Radar 33 - Inteligência Comercial para TikTok Shop
Este projeto é uma plataforma SaaS voltada para a mineração de produtos campeões e espionagem de afiliados no TikTok Shop. A ferramenta utiliza automação de busca e extração de dados em tempo real para identificar tendências e criadores de alta performance.

🚀 Arquitetura Tecnológica
Framework: Next.js 14+ (App Router).

Linguagem: TypeScript.

Estilização: Tailwind CSS & Lucide React (Ícones).

Infraestrutura de Dados: Apify SDK / API.

🛠️ Integrações Apify (Motores de Inteligência)
O sistema opera com dois motores distintos:

Radar de Produtos (Produto Campeão):

Actor: pratikdani/tiktok-shop-search-scraper.

Função: Realiza buscas por palavras-chave em territórios específicos (BR/US) e retorna metadados de produtos, volumes de vendas e preços.

Endpoint Interno: /api/radar.

Top Creators (Espião de Afiliados):

Actor: george.the.developer/tiktok-shop-affiliate-sales-scraper.

Função: Recebe a URL de um produto, resolve CAPTCHAs via proxies residenciais e extrai a lista de afiliados que estão vendendo o item, incluindo selos de performance.

Endpoint Interno: /api/creators.

📁 Estrutura de Arquivos Críticos
app/api/radar/route.ts: Handler para pesquisa de produtos. Implementa polling de 30s para aguardar o dataset do Apify.

app/api/creators/route.ts: Handler para extração de afiliados. Configurado com RESIDENTIAL_PROXY e captura de productUrl.

app/produtos/page.tsx: Interface de busca e grid de produtos. Implementa mapeamento profundo de JSON para extrair preços de SKUs e imagens de variações (sale_props).

app/creators/page.tsx: Dashboard de análise de criadores. Utiliza useSearchParams para processar a URL vinda do radar.

⚠️ Observações Técnicas para o Dev
1. Mapeamento de JSON (Data Scrapping)
O TikTok Shop possui uma estrutura de dados aninhada. O mapeamento atual no page.tsx está configurado para:

Extrair o preço real do primeiro objeto disponível em skus.

Priorizar imagens de variações em sale_props para evitar links quebrados/expirados do objeto principal.

2. Referrer Policy
Para que as imagens do TikTok carreguem no navegador sem erros 403 (Forbidden), é obrigatório manter a referrerPolicy="no-referrer" nas tags <img> e o meta tag correspondente no layout.tsx.

3. Proxies e Créditos
O robô de afiliados exige proxies residenciais. Certifique-se de que a conta do Apify tenha saldo/assinatura ativa para suportar a resolução de captchas do george.the.developer.

📈 Próximos Passos (Roadmap)
Caching de Banco de Dados: Implementar Supabase ou MongoDB nas rotas de API para salvar resultados de buscas comuns (ex: "shampoo") e reduzir custos de requisição no Apify.

Filtros Avançados: Adicionar filtros por volume de vendas (ex: +10k sold) e avaliação mínima na interface.

Exportação: Botão para exportar lista de criadores em CSV/Excel para gestão de CRM de afiliados.