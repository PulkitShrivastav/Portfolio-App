import MainSection from "~/mainSection/mainComp";
import type { Route } from "./+types/home";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Pulkit Shrivastav" },
  ];
}

export default function Home() {
  return <MainSection />
}
