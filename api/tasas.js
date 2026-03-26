export default async function handler(req, res) {
  try {
    const r = await fetch('https://ve.dolarapi.com/v1/dolares', {
      headers: { 'User-Agent': 'AutomarbePOS/1.0' }
    });
    const data = await r.json();
    let bcv = null, binance = null;
    if (Array.isArray(data)) {
      const bcvItem = data.find(d => d.fuente === 'oficial');
      const binItem = data.find(d => d.fuente === 'paralelo');
      if (bcvItem) bcv = bcvItem.promedio || bcvItem.precio;
      if (binItem) binance = binItem.promedio || binItem.precio;
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=1800');
    return res.json({ bcv, binance });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
