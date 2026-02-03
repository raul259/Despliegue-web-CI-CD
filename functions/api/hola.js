export async function onRequest(context) {
  return new Response(JSON.stringify({ 
    mensaje: "Hola desde el Edge de Cloudflare",
    infraestructura: "Cloudflare Pages Functions",
    autor: "rau1259"
  }), {
    headers: { "Content-Type": "application/json" },
  });
}