export const navLinks = [
  { id: "home", title: "Home", path: "/" },
  { id: "faq", title: "FAQs", path: "/faq" },
  { id: "channels", title: "Channels", path: "/channels" },
  { id: "team", title: "Team ", path: "/team" },
];

export const loggedLinks = [
  { id: "dash", title: "Dashboard", path: "/dashboard" },
  { id: "channel", title: "Channel", path: "/channel" },
  { id: "wallet", title: "Wallet", path: "/wallet" },
  { id: "faq", title: "FAQ", path: "/faq" },
  { id: "profile", title: "Profile", path: "/profile" },
];

export const sidebarLinks = [
  { id: "dash", title: "Dashboard", path: "/dashboard" },
  { id: "spammed logs", title: "Email Logs", path: "" },
  { id: "sender", title: "Senders", path: "" },
  { id: "rdp", title: "RDPs", path: "" },
  { id: "link", title: "Redirect", path: "" },
  { id: "resume", title: "Resumes", path: "" },
  { id: "social account", title: "Social Accounts", path: "" },
  { id: "service", title: "Services", path: "" },
  { id: "rat", title: "Malware Scripts", path: "" },
  { id: "drainer", title: "Drainers", path: "" },
  { id: "2fa", title: "2FA Bypassers", path: "" },
];

export const server = "https://server.rhs40gs.store";
export const devserver = "http://localhost:4000";

export const products = [
  {
    id: "2fa",
    title: "2fa cookie links",
    tools: [
      "2fa ByPasser (Cookie File)",
      "Office365 ",
      "Outlook ",
      "Gmail + Yahoo Mail",
    ],
  },
  {
    id: "redirect",
    title: "Redirects for inbox projects",
    tools: ["Redirects", "Link Encrypter", "Antibot", "Magic link"],
  },
  {
    id: "web3",
    title: "Smart Contracts",
    tools: ["Honeypot contract", "Rugpull contract"],
  },

  {
    id: "chatbot",
    title: "AI CHATBOT FOR TELEGRAM",
    tools: ["Telegram"],
  },
  {
    id: "scanner",
    title: "Wallet scanner bot",
    tools: [""],
  },
  {
    id: "attach",
    title: "ATTACHMENT SPAMMING",
    tools: [""],
  },
  {
    id: "rdp",
    title: "Remote desktop Protocol (RDP)",
    tools: ["usa", "germany", "united kingdom"],
  },
  {
    id: "social",
    title: "SOCIAL MEDIA ACCOUNT LIST",
    tools: ["Instagram (with followers)", "Facebook", "Reddit"],
  },
  {
    id: "resume",
    title: "Resume",
    tools: ["usa", "Australia", "Canada"],
  },
  {
    id: "smtp",
    title: "Premium SMTPs",
    tools: ["Kagoya", "Zimbra", "Gmobb", "T-mobile"],
  },
  {
    id: "mail",
    title: " Mail tools for office365 boxes",
    tools: ["Extractor", "Sorter", "Validator"],
  },
];

export const getAccessToken = () => {
  const storedAccessToken = sessionStorage.getItem("accessToken");

  // If storedAccessToken is null, return null or handle accordingly
  if (storedAccessToken === null) {
    return null;
  }

  try {
    return JSON.parse(storedAccessToken);
  } catch (e) {
    console.error("Error parsing access token:", e);
    return null;
  }
};

export const questionsAndAnswers = [
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

export function formatNumber(value, options = {}) {
  const {
    locale = "en-US",
    style = "decimal", // 'decimal', 'currency', 'percent'
    currency, // required if style is 'currency'
    minimumFractionDigits,
    maximumFractionDigits,
  } = options;

  const formatter = new Intl.NumberFormat(locale, {
    style,
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(value);
}
