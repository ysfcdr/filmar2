import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const TARGET_URL = 'https://www.hdfilmcehennemi.nl/';
    
    const { data } = await axios.get(TARGET_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    const movies = [];

    $('.poster-pop, .poster').each((index, element) => {
      const title = $(element).find('.poster-title, h2').text().trim();
      const poster = $(element).find('img').attr('data-src') || $(element).find('img').attr('src');
      const link = $(element).find('a').attr('href');

      if (title && link) {
        movies.push({ title, poster, link });
      }
    });

    return NextResponse.json({ success: true, movies });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
