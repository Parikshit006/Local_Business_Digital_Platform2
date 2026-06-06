export const INITIAL_MESSAGE = {
  id: "msg-0",
  role: "assistant",
  content: `Hi,\n\nI'm Unnati,\nyour LocalBoost Growth Companion.\n\nI can help you:\n\n✓ Explore Services\n\n✓ Understand Pricing\n\n✓ Register Your Business\n\n✓ Connect With Our Team\n\nWhat would you like help with today?`,
  timestamp: Date.now()
};

export const QUICK_ACTIONS = [
  { id: "explore", label: "Explore Services" },
  { id: "pricing", label: "Pricing Help" },
  { id: "register", label: "Register My Business" },
  { id: "contact", label: "Contact Team" },
];

export const FLOWS = {
  "explore": {
    assistantMessage: "Which area interests you?",
    options: [
      { id: "flow-web", label: "Website Development", route: "/services?category=Website" },
      { id: "flow-marketing", label: "Marketing", route: "/services?category=Marketing" },
      { id: "flow-branding", label: "Branding", route: "/services?category=Branding" },
      { id: "flow-automation", label: "Automation", route: "/services?category=Automation" },
    ]
  },
  "pricing": {
    assistantMessage: "How can I help you with pricing?",
    options: [
      { id: "flow-pricing-view", label: "View Pricing", route: "/pricing" },
      { id: "flow-pricing-compare", label: "Compare Services", route: "/services" },
      { id: "flow-pricing-custom", label: "Request Custom Quote", route: "/contact" }
    ]
  },
  "register": {
    assistantMessage: "Let's get your business on LocalBoost!",
    options: [
      { id: "flow-reg-verify", label: "Business Verification", route: "/business-setup" },
      { id: "flow-reg-docs", label: "Required Documents", route: "/about" },
      { id: "flow-reg-approval", label: "Approval Process", route: "/how-it-works" }
    ]
  },
  "contact": {
    assistantMessage: "How would you like to reach us?",
    options: [
      { id: "flow-contact-email", label: "Email Support", action: "mailto:support@localboost.com" },
      { id: "flow-contact-call", label: "Call Support", action: "tel:+1234567890" },
      { id: "flow-contact-wa", label: "WhatsApp Support", action: "https://wa.me/1234567890" }
    ]
  }
};
