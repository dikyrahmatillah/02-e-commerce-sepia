import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const upstreamUrl = new URL(`${process.env.API_BASE_URL}/products`);
  if (query) {
    upstreamUrl.searchParams.set("query", query);
  }

  try {
    const upstream = await fetch(upstreamUrl.toString());

    if (!upstream.ok) {
      return NextResponse.json(
        { message: "Failed to fetch products." },
        { status: upstream.status },
      );
    }

    const data = await upstream.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Unable to fetch products.",
      },
      { status: 500 },
    );
  }
}
