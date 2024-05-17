export async function POST(req: Request) {
  const data = await req.json();
  console.log("data :>> ", data);
  return Response.json(
    {
      ok: true,
    },
    {
      status: 200,
    }
  );
}
