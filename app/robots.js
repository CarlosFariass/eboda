export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/callback/', '/profile/'],
      },
    ],
    sitemap: 'https://eboda.com.br/sitemap.xml',
  };
}
