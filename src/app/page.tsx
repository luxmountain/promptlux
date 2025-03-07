import PinList from "./components/Pins/PinList";
export default function Home() {
  return (
    <div className="mt-84 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <PinList/>
    </div>
  );
}
