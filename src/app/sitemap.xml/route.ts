import Posts from "@/services/posts";
import { BLOG_HOST } from "@/utils/constants";

export const dynamic = "force-static";

export async function GET() {
  return new Response(getSitemap(), { headers: { "Content-Type": "text/xml" } });
}

function getSitemap() {
  const now = new Date();
  const urls = [
    {
      url: BLOG_HOST,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  Posts.getAll().forEach(post => {
    urls.push({
      url: new URL(`/posts/${post.id}`, BLOG_HOST).href,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    });
  });

  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
    ${urls
      .map(
        item => `
            <url>
              <loc>${item.url}</loc>
              <lastmod>${item.lastModified.toISOString()}</lastmod>
              <changefreq>${item.changeFrequency}</changefreq>
              <priority>${item.priority}</priority>
            </url>
          `,
      )
      .join("")}
    </urlset>
  `.trim();
}
