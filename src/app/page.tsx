import PinList from "./components/Pins/PinList";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <PinList />
    </div>
  );
}
