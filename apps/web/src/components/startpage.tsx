import { Hero } from "@/components/hero";
import { SectionFour } from "@/components/section-four";
import { SectionOne } from "@/components/section-one";
import { SectionSeven } from "@/components/section-seven";
import { SectionThree } from "@/components/section-three";
import { SectionTwo } from "@/components/section-two";
import { SectionFive } from "./section-five";

export function StartPage() {
  return (
    <>
      <Hero />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSeven />
    </>
  );
}
