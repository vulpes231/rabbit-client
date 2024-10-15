export const navLinks = [
  { id: "home", title: "Home", path: "/" },
  { id: "faq", title: "FAQs", path: "/faq" },
  { id: "channels", title: "Channels", path: "/channel" },
  { id: "contact", title: "Contact", path: "/contact" },
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

export const server = "https://rabbit-server.onrender.com";
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
