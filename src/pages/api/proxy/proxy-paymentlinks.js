// // // pages/api/proxy-donations.js
// // export default async function handler(req, res) {
// //   const { method, body } = req;

// //   // Define the external API endpoint
// //   const apiUrl = "https://www.docswithinborders.org/api/payment-links";

// //   try {
// //     // Forward the request to the external API with the same method and body if applicable
// //     const response = await fetch(apiUrl, {
// //       method,
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: method !== "GET" ? JSON.stringify(body) : undefined,
// //     });

// //     // If the response is not ok, throw an error to handle it in the catch block
// //     if (!response.ok) {
// //       throw new Error(`Failed to ${method} donation data`);
// //     }

// //     // Parse and forward the response back to the client
// //     const data = await response.json();
// //     res.status(response.status).json(data);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Error processing request" });
// //   }
// // }



// import { NextResponse } from "next/server";

// // Define the API URL for external service
// const API_URL = "https://www.doctorswithhope.com/api/payment-links";

// // Handle GET requests to fetch the payment links
// export async function GET() {
//   try {
//     const response = await fetch(API_URL, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: `Failed to fetch: ${response.statusText}` },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching payment links:", error);
//     return NextResponse.json(
//       { error: "An unexpected error occurred" },
//       { status: 500 }
//     );
//   }
// }

// // Handle PATCH requests to update the payment links
// export async function PATCH(request) {
//   try {
//     const body = await request.json();

//     // Send the PATCH request to the external API
//     const response = await fetch(API_URL, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return NextResponse.json(
//         { error: `Failed to update: ${errorText}` },
//         { status: response.status }
//       );
//     }

//     const updatedData = await response.json();
//     return NextResponse.json(updatedData, { status: 200 });
//   } catch (error) {
//     console.error("Error updating payment links:", error);
//     return NextResponse.json(
//       { error: "An unexpected error occurred" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";

// Set the runtime to edge
export const runtime = "edge";

// Define the API URL for external service
const API_URL = "https://www.doctorswithhope.com/api/payment-links";

// Handle GET requests to fetch the payment links
async function getPaymentLinks() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return new NextResponse(
        JSON.stringify({ error: `Failed to fetch: ${response.statusText}` }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching payment links:", error);
    return new NextResponse(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}

// Handle PATCH requests to update the payment links
async function updatePaymentLinks(request) {
  try {
    const body = await request.json();

    // Send the PATCH request to the external API
    const response = await fetch(API_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new NextResponse(
        JSON.stringify({ error: `Failed to update: ${errorText}` }),
        { status: response.status }
      );
    }

    const updatedData = await response.json();
    return new NextResponse(JSON.stringify(updatedData), { status: 200 });
  } catch (error) {
    console.error("Error updating payment links:", error);
    return new NextResponse(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}

// Default export handling API routes
export default async function handler(req) {
  if (req.method === "GET") {
    return await getPaymentLinks();
  }
  if (req.method === "PATCH") {
    return await updatePaymentLinks(req);
  }

  return new NextResponse(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
  });
}

