import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center sm:items-start">
        <h1>lovely</h1>
        <Button>Lovely Man</Button>
      </main>
    </div>
  );
}
