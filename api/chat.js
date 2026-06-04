export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    let body = req.body;
    
    // Zorg dat body een object is
    if (!body) {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      body = JSON.parse(Buffer.concat(chunks).toString());
    } else if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Anthropic error:', response.status, JSON.stringify(data).slice(0, 500));
    }
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).json({ error: err.message });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
