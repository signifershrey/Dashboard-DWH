// pages/api/proxy-donations.js
export default async function handler(req, res) {
  const { method, body } = req;

  // Define the external API endpoint
  const apiUrl = "https://www.docswithinborders.org/api/donations";

  try {
    // Forward the request to the external API with the same method and body if applicable
    const response = await fetch(apiUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization, // Forward auth if needed
        }),
      },
      body: method !== "GET" ? JSON.stringify(body) : undefined,
    });

    // If the response is not ok, throw an error to handle it in the catch block

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch data from external API.");
    }

    // Parse and forward the response back to the client
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy Error:", error.message);
    res.status(500).json({ message: "Error processing proxy request" });
  }
}
