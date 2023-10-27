import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

type Props = {
  faq: {
    question: string;
    answer: string;
  }[];
};

const FaqAccordion = ({ faq }: Props) => {
  return (
    <Accordion type="single" collapsible>
      {faq.map((e, index) => (
        <AccordionItem
          key={`faq_${index}]`}
          value={`faq_${index}`}
          className="fade-in border-b-black-stroke border-t-black-stroke py-2 text-black"
        >
          <AccordionTrigger>{e.question}</AccordionTrigger>
          <AccordionContent className="text-slate-700">
            {e.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
