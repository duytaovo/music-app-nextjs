import { cn } from "@/libs/utils";
import Content from "./(site)/components/Content";

export default function Home() {
  return (
    <main className={cn("flex-1  flex-col overflow-hidden")}>
      <Content />
    </main>
  );
}

