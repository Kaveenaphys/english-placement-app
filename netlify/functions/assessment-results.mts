import type { Config } from "@netlify/functions";
export default async (req: Request) => {
  if (req.method !== "GET") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const token = Netlify.env.get("NETLIFY_AUTH_TOKEN");

  if (!token) {
    return new Response(
      JSON.stringify({
        error: "Netlify authentication token is not configured.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const siteId = "fecbf776-e1e6-4004-bfae-d43eae771b51";

  try {
    const response = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/submissions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
  const errorText = await response.text();

  return new Response(
    JSON.stringify({
      error: "Netlify API request failed.",
      status: response.status,
      details: errorText,
    }),
    {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

    const submissions = await response.json();

    return new Response(
      JSON.stringify(submissions),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Assessment submission error:", error);

    return new Response(
      JSON.stringify({
        error: "An unexpected error occurred.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const config: Config = {
  path: "/api/assessment-results",
};