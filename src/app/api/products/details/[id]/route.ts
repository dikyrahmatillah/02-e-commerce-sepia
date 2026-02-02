import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "Product id is required." },
      { status: 400 },
    );
  }

  const upstreamUrl = `${process.env.API_BASE_URL}/products/details/${id}`;

  try {
    const upstream = await fetch(upstreamUrl, { cache: "no-store" });

    if (!upstream.ok) {
      return NextResponse.json(
        { message: "Failed to fetch product details." },
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
          error instanceof Error
            ? error.message
            : "Unable to fetch product details.",
      },
      { status: 500 },
    );
  }
}
