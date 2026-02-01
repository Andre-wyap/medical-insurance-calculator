export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Attempt to fetch the asset from the dist folder
    let response = await env.ASSETS.fetch(request);

    // If the request results in a 404 and it's not a direct file request (no extension),
    // serve index.html to support Single Page Application (SPA) routing.
    if (response.status === 404 && !url.pathname.includes('.')) {
      response = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
    }

    return response;
  },
};
