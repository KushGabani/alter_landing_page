import clsx from "clsx";
import { Suspense, lazy, useState } from "react";
import StockPage from "../previews/stock_page";
import { ClientCategory, StockCategory } from "../previews/models/types";

const CreateChallan = lazy(() => import("../previews/create_challan"));
const PermissionsPage = lazy(() => import("../previews/permissions_page"));
const FinancePage = lazy(() => import("../previews/finance_page"));

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
    component: <StockPage />,
  },
  {
    title: "Challans And Bills",
    description:
      "Manage inward, outward and jobwork challans. Track payments using purchase, sales and jobwork bills",
    component: (
      <CreateChallan
        category={new StockCategory("JOBWORK")}
        clientCategory={[new ClientCategory("JOBWORK_PARTY")]}
      />
    ),
  },
  {
    title: "Permission & Security",
    description:
      "Give access to everyone while maintaining complete control on who gets to see what",
    component: <PermissionsPage />,
  },
  {
    title: "Finances and Costing",
    description:
      "Compute costing of machines, processes, employees and have full control of your finances",
    component: <FinancePage />,
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
          <Suspense
            fallback={
              <div className="w-full h-[80vh] bg-neutral-50 flex items-center justify-center ]">
                <div className="relative p-3 w-fit border border-gray-100 rounded-md">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
          >
            <div className="animate-in">{cards[active].component}</div>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
