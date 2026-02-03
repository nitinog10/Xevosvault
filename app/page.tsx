import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-background min-h-screen font-sans">
      <ScrollyCanvas />
      <Projects />

      <footer className="py-12 text-center text-foreground/40 text-sm">
        <p>© {new Date().getFullYear()} xeVosVault. All rights reserved.</p>
      </footer>
    </main>
  );
}
