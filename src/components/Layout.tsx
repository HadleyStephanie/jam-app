import type { ReactNode } from "react";
import Header from "./Header";
import { Roboto_Serif } from "next/font/google";

const robotoSerif = Roboto_Serif({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={robotoSerif.className}>
      <Header />
      <main className="bg-stone-100">{children}</main>
    </div>
  );
}
