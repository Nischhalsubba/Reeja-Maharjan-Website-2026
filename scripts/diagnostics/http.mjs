export async function inspectUrl(url) {
  try {
    const response = await fetch(url, {
      redirect: 'manual',
      headers: {
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        'user-agent': 'reeja-portfolio-production-diagnostics/1.0'
      }
    });
    const body = await response.text();
    return {
      url: url.toString(),
      status: response.status,
      location: response.headers.get('location'),
      server: response.headers.get('server'),
      cfRay: response.headers.get('cf-ray'),
      cacheStatus: response.headers.get('cf-cache-status'),
      contentType: response.headers.get('content-type'),
      contentSecurityPolicy: response.headers.get('content-security-policy'),
      referrerPolicy: response.headers.get('referrer-policy'),
      bodyLength: body.length,
      markers: {
        currentHomepage: body.includes('Clinical care with research discipline.'),
        currentCv: body.includes('View CV'),
        legacyDownload: body.includes('Download CV'),
        legacyLocation: body.includes('Lalitpur'),
        retiredResume: body.includes('/resume.pdf')
      },
      preview: body.slice(0, 500)
    };
  } catch (error) {
    return { url: url.toString(), error: error instanceof Error ? error.message : String(error) };
  }
}
