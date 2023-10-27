import clsx from "clsx";
import { useState } from "react";
import { StockPage } from "../previews/stock_page";

// const cards = [
//   {
//     title: "Inventory at-a-glance",
//     description:
//       "Effortlessly serialize your entire inventory through QR codes and keep tabs on stock at all times",
//   },
//   {
//     title: "Challan made easy",
//     description:
//       "Confidently create challans faster than ever before with our smart forms and get the reporting you need",
//   },
//   {
//     title: "Finance and costing",
//     description:
//       "Manage bill payments and compute automatic costings of processes, machinery, and employees.",
//   },
//   {
//     title: "Customized control for members",
//     description:
//       "Complete Access while maintaining control on who gets to see what with roles & permissions",
//   },
// ];
const cards = [
  {
    title: "Stock & Inventory",
    description:
      "Serialize inventory through QR codes and keep tabs on materials as it moves through production pipeline",
  },
  {
    title: "Challans And Bills",
    description:
      "Manage inward, outward and jobwork challans. Track payments using purchase, sales and jobwork bills",
  },
  {
    title: "Permission & Security",
    description:
      "Give access to everyone while maintaining complete control on who gets to see what",
  },
  {
    title: "Finances and Costing",
    description:
      "Compute costing of machines, processes, employees and have full control of your finances",
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  return (
    <section
      style={{
        background:
          "conic-gradient(from 90deg at 50% 50%, #275EEA 0deg, #6E59F0 93.74999642372131deg, #847AF5 159.3750035762787deg, #3273D4 219.375deg, #006EFF 360deg)",
      }}
      className="min-h-screen py-20 sm:py-28 flex flex-col items-center gap-y-14 sm:gap-y-20 bg-blue-600 px-4 sm:px-8 xl:px-0"
    >
      <h2 className="md:text-center text-2xl sm:text-4xl md:text-5xl tracking-tight text-white">
        Everything you need to run your production.
      </h2>
      <div className="w-full overflow-hidden flex flex-col xl:flex-row items-center justify-end gap-y-10 xl:gap-0 bg-white/5 xl:bg-transparent rounded-xl border border-white/10 xl:border-none">
        <div className="w-full sm:w-fit flex flex-row justify-start gap-x-2 overflow-x-auto p-4 pt-12 pb-4 sm:px-8 xl:px-0 xl:pb-0 sm:gap-x-6 xl:flex-col">
          {cards.map((card, index) => (
            <button
              onClick={() => setActive(index)}
              key={`featurecard_${index}`}
              className={clsx(
                "max-w-md min-w-fit group relative rounded-full px-5 py-3 text-left xl:rounded-l-xl xl:rounded-r-none xl:p-6",
                index == active
                  ? "bg-white text-black sm:text-primary-400 xl:text-white sm:bg-white xl:bg-white/10  xl:ring-white/10 xl:ring-1 xl:ring-inset"
                  : "text-white md:hover:bg-white/5  md:hover:ring-white/5"
              )}
            >
              <h3 className="rounded-full text-base sm:text-lg xl:rounded-l-xl xl:rounded-r-none">
                {card.title}
              </h3>
              <p className="hidden text-sm xl:block mt-3 text-primary-50 font-light">
                {card.description}
              </p>
            </button>
          ))}
        </div>
        <p className="xl:hidden block px-2 text-sm sm:text-base text-white text-center max-w-md">
          {cards[active].description}
        </p>
        <div className="xl:w-[60%] rounded-xl xl:rounded-r-none bg-white p-5">
          <StockPage />
        </div>
      </div>
    </section>
  );
}
