import https from 'https'

const testUrls = [
  'https://media.cashback.marketing/videos/real-estate/mhd%20reels%206.mp4',
  'https://media.cashback.marketing/videos/real-estate/green%20plaza.mp4',
  'https://media.cashback.marketing/videos/real-estate/Mhd.mp4',
  'https://media.cashback.marketing/videos/real-estate/I%20investment.mp4',
  'https://media.cashback.marketing/videos/events/costa-1_1.mp4'
]

function testRange(url) {
  return new Promise((resolve) => {
    const parsed = new URL(url)
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: 'GET',
      headers: {
        'Range': 'bytes=0-1048575',
        'User-Agent': 'Mozilla/5.0'
      }
    }

    const req = https.request(options, (res) => {
      resolve({
        url,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        acceptRanges: res.headers['accept-ranges'],
        contentLength: res.headers['content-length'],
        contentRange: res.headers['content-range'],
        contentType: res.headers['content-type'],
        cacheControl: res.headers['cache-control'],
        etag: res.headers['etag'],
        cfCacheStatus: res.headers['cf-cache-status'],
        corsHeader: res.headers['access-control-allow-origin'] || 'None'
      })
    })

    req.on('error', (err) => {
      resolve({ url, error: err.message })
    })

    req.end()
  })
}

export async function runHeaderCheck() {
  console.log('==================================================')
  console.log('TESTING HTTP 206 RANGE REQUESTS & HEADERS')
  console.log('==================================================')

  for (const url of testUrls) {
    const res = await testRange(url)
    console.log(`URL: ${url}`)
    console.log(`  -> Status: ${res.statusCode} ${res.statusMessage || ''}`)
    console.log(`  -> Content-Type: ${res.contentType}`)
    console.log(`  -> Accept-Ranges: ${res.acceptRanges}`)
    console.log(`  -> Content-Range: ${res.contentRange}`)
    console.log(`  -> Content-Length: ${res.contentLength}`)
    console.log(`  -> Cache-Control: ${res.cacheControl}`)
    console.log(`  -> ETag: ${res.etag}`)
    console.log(`  -> CF-Cache-Status: ${res.cfCacheStatus}`)
    console.log(`  -> Access-Control-Allow-Origin: ${res.corsHeader}`)
    console.log('--------------------------------------------------')
  }
}

runHeaderCheck()
