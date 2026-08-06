/**
 * GET /api/haramain?channel=makkah|madinah
 *
 * Returns the current live YouTube stream ID for the given Haramain channel.
 * Uses Next.js fetch caching to revalidate once per hour — the YouTube API
 * quota impact is minimal (1 search unit per channel per hour, max).
 *
 * The API key stays server-side only (no EXPO_PUBLIC_ prefix) so it is
 * never exposed to the browser.
 *
 * Response: { videoId: string | null, channel: string }
 */

import { NextRequest } from 'next/server'

const HARAMAIN_CHANNEL_IDS: Record<string, string> = {
  makkah:  'UCendS8RtIY5EMpWMnwpjpvQ',
  madinah: 'UC37tvO47bp_cKH1f4_VQCOA',
}

const FALLBACK_IDS: Record<string, string> = {
  makkah:  'fZvuHkHYaXk',
  madinah: 'SY8j_i2hVbc',
}

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const channel = request.nextUrl.searchParams.get('channel') ?? ''

  if (!HARAMAIN_CHANNEL_IDS[channel]) {
    return Response.json(
      { error: 'Invalid channel. Use makkah or madinah.' },
      { status: 400 },
    )
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    // No key configured — return fallback so the client still has something usable
    return Response.json({ videoId: FALLBACK_IDS[channel], channel, source: 'fallback' })
  }

  try {
    const ytUrl =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=id` +
      `&channelId=${HARAMAIN_CHANNEL_IDS[channel]}` +
      `&eventType=live` +
      `&type=video` +
      `&maxResults=1` +
      `&key=${apiKey}`

    // next.revalidate caches the upstream response for 1 hour on the server
    const res = await fetch(ytUrl, { next: { revalidate: 3600 } })

    if (!res.ok) {
      console.error(`[haramain] YouTube API error: ${res.status}`)
      return Response.json(
        { videoId: FALLBACK_IDS[channel], channel, source: 'fallback' },
      )
    }

    const data = (await res.json()) as {
      items?: Array<{ id: { videoId: string } }>
    }

    const videoId = data.items?.[0]?.id?.videoId ?? null

    return Response.json({
      videoId: videoId ?? FALLBACK_IDS[channel],
      channel,
      source: videoId ? 'live' : 'fallback',
    })
  } catch (err) {
    console.error('[haramain] Fetch failed:', err)
    return Response.json(
      { videoId: FALLBACK_IDS[channel], channel, source: 'fallback' },
    )
  }
}
