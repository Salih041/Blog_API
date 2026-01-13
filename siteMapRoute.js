import express from "express";
import Post from "./models/Post.js";

const router = express.Router();

let sitemapCache = null;
let lastCacheTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

router.get("/sitemap.xml", async (req, res) => {
    try {
        const currentTime = Date.now();
        if(sitemapCache && (currentTime - lastCacheTime) < CACHE_DURATION) {
            console.log("Sitemap found in cache.");
            res.header('Content-Type', 'application/xml');
            return res.send(sitemapCache);
        }

        console.log("Generating new sitemap.");

        const posts = await Post.find({statu : "published"}).select("slug updatedAt _id").sort({ firstPublishDate: -1 });
        const staticUrls = [
            'https://www.selamy.me',
            'https://www.selamy.me/login',
            'https://www.selamy.me/register',
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${staticUrls.map(url => `<url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
</url>`).join('')}
${posts.map(post => `<url>
    <loc>https://www.selamy.me/posts/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
</url>`).join('')}
</urlset>`;

        sitemapCache = sitemap;
        lastCacheTime = currentTime;
        res.header("Content-Type", "application/xml");
        res.send(sitemap);

    } catch (error) {
        console.error("Error generating sitemap:", error);
        res.status(500).end();
    }
})

export default router;

