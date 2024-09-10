import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import FaqComp from "../components/faq/FaqComp";
import { MdChecklist } from "react-icons/md";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const questionsAndAnswers = [
    {
      question: "What happens when my 2fa link is red?",
      answer:
        "Not to brag but Since you asked, Our 2fa links are bullet proof, from record it takes 2-3 months before Our link gets RED paged. But in situations where that happens we give you another link within 24hrs.",
    },
    {
      question: "Do you do test for redirects?",
      answer:
        "No, we don't do tests for redirect. By testing the redirect is revealed, So we don't test. But rest assured our redirects are fresh scans from reputable domains.",
    },
    {
      question: "Can I renew my RDP after it expires?",
      answer:
        "Absolutely! Your files are intact and can be renewed. simply send your RDP IP and it will be back up.",
    },
    {
      question: "Do you have a box that have invoice in it?",
      answer: `We don't answer questions like that, we send a list of domains and you pick from them ---> make payment ---> get login details for the box

       To give everyone equal chance we don't hand-pick boxes, we select at random or you select a domain yourself from the list.
       Fair!`,
    },
    {
      question: "Can I send gift item to my Client and receive the same day?",
      answer: `Yes you can, If you confirm order early enough in the day.`,
    },
    {
      question: "What is the minimum funds for merchant link services?",
      answer: `Minimum is $2000.`,
    },
    {
      question: "How long does the merchant link takes to pay out?",
      answer: `For existing merchant use, it takes 2days + 1 business day to clear in some cases. For New merchant use, 8days to clear.`,
    },
    {
      question: "What is the return policy for office boxes?",
      answer: `Office boxes would be replaced if login credentials are incorrect.
      We are aware that some customers buy then change password, we confirm boxes log in properly before sale. Old tricks don't work on old dawgs. If box is blocked from sending out we will replace. Those are the conditions under which we replace a box.`,
    },
    {
      question: "Do you sell one box to more than one person?",
      answer: `Hell no. we take great pride in what we do.`,
    },
    {
      question: "I bought a box it doesn't have transactions.",
      answer: `Boxes that don't have transaction could have log, cc, accounts or be used to create more tools depending on if it has priviledges of an admin and other settings, could be used for b2b or the smtp used for sending out messages via senders, you could payroll it or blackmail the box.
      Alot you can do so it's up to you to know your stuff.`,
    },
    {
      question: "Can I request a tool?",
      answer: `Yes you can Og.

      We are constantly updating what tools and services we provide.`,
    },
    {
      question: "Can I request a tool?",
      answer: `Yes you can Og.

      We are constantly updating what tools and services we provide.`,
    },
    {
      question: "Where can I get support?",
      answer: `You can contact us on telegram Here. or via Whatsapp Here`,
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    document.title = "RH4OGS - FAQ";
    return () => {
      document.title = "RH4OGS";
    };
  }, []);

  return (
    <section className="font-[Montserrat]">
      <div className="w-full  min-h-screen lg:max-w-[1000px] mx-auto mt-28 sm:mt-16 lg:mt-0 flex flex-col gap-6">
        <h3 className="uppercase font-semibold text-lg text-center py-5">
          Frequently asked questions
        </h3>

        <div className=" min-h-screen flex flex-col items-center">
          <div className="w-full max-w-2xl dark:bg-slate-950 bg-white">
            {questionsAndAnswers.map((item, index) => (
              <div key={index} className=" border-b py-4">
                <button
                  onClick={() => toggleAnswer(index)}
                  className="w-full text-left py-2 px-4 rounded focus:outline-none flex items-center justify-between gap-2 text-xs"
                >
                  {item.question} <FaPlus />
                </button>
                {activeIndex === index && (
                  <div className="  p-4 rounded mt-2 text-sm leading-7 font-thin">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs font-thin md:flex flex-col md:flex-row md:items-center md:justify-center gap-4 p-6">
          <FaqComp
            title={"Admin support on Telegram"}
            icon={<MdChecklist className="text-red-500" />}
          />
          <FaqComp
            title={"Main Channel"}
            icon={<MdChecklist className="text-green-500" />}
          />
          <FaqComp
            title={"Telegram Bot"}
            icon={<MdChecklist className="text-yellow-500" />}
          />
          <FaqComp
            title={"Whatsapp"}
            icon={<MdChecklist className="text-blue-500" />}
          />
          <FaqComp
            title={"Vendors Onboarding and inquiries  "}
            icon={<MdChecklist className="text-purple-500" />}
          />
        </div>
      </div>
    </section>
  );
};

export default Faq;
