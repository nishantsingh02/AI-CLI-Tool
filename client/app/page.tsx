import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <h1 className="text-xl">Hi Nishu</h1>
      <Button>Send</Button>
    </div>
  );
}
