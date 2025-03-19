import PinListAll from "./components/Pins/PinListAll";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <PinListAll />
    </div>
  );
}
