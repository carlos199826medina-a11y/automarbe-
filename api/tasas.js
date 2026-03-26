
export default async function handler(req, res) {
  try {
    const r = await fetch('https://pydolarve.org/api/v2/dollar');
    const data = await r.json();
    const bcv = data?.monitors?.bcv?.price || null;
    const binance = data?.monitors?.binance?.price || null;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=1800');
    return res.json({ bcv, binance });
  } catch (e) {
    return res.status(500).json({ error: 'No se pudo obtener tasas' });
  }
}
