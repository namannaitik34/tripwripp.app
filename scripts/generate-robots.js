// Simple robots.txt + sitemap placeholder generation for deployment
const { writeFileSync, mkdirSync, existsSync } = require('fs');
const { join } = require('path');

const publicDir = join(process.cwd(), 'public');
if (!existsSync(publicDir)) mkdirSync(publicDir);

const siteUrl = process.env.SITE_URL || 'https://www.tripwripp.com';

const robots = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;
writeFileSync(join(publicDir, 'robots.txt'), robots);

// Minimal static sitemap
const staticPages = ['/', '/about', '/contact', '/faq', '/gallery', '/packages', '/destinations'];
const now = new Date().toISOString();
const urls = staticPages.map(p => `<url><loc>${siteUrl}${p}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`).join('');
const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
writeFileSync(join(publicDir, 'sitemap.xml'), xml);

console.log('robots.txt & sitemap.xml generated');
