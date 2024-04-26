import { testPkg } from "@repo/test-pkg";

export default async function Page(): Promise<JSX.Element> {
  const t = await testPkg("Jack");
  console.log(t);
  return (
    <main className="bg-black">
      <h1>Web</h1>
    </main>
  );
}
