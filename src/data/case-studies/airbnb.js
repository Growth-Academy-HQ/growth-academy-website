// src/data/case-studies/airbnb.js
export const airbnbCaseStudy = {
    company: "Airbnb",
    logo: "/assets/airbnb-logo.svg",
    title: "How Airbnb optimized listings by leveraging existing platforms",
    summary: "Airbnb's growth story reveals how the company ingeniously leveraged Craigslist's massive user base to bootstrap their marketplace and optimize their listing strategy.",
    challenge: "In 2009, Airbnb faced several critical challenges in building their two-sided marketplace:\n\n" +
      "- Low brand awareness and trust among potential hosts and guests\n" +
      "- Chicken-and-egg problem: needed both hosts and guests to build liquidity\n" +
      "- Limited marketing budget as a startup ($20,000 seed funding)\n" +
      "- Competition from established players like HomeAway and VRBO",
    solution: "Airbnb implemented a multi-faceted growth strategy centered around platform optimization:\n\n" +
      "- Created an integration that allowed hosts to cross-post listings to Craigslist automatically\n" +
      "- Developed professional photography service to improve listing quality\n" +
      "- Implemented data-driven pricing recommendations for hosts\n" +
      "- Built trust through detailed user profiles and review systems",
    results: {
      summary: "The platform optimization strategy delivered exceptional results:",
      bullets: [
        {
          metric: "10x",
          description: "increase in bookings for listings with professional photos"
        },
        {
          metric: "13%",
          description: "higher booking rates through price optimization"
        },
        {
          metric: "200%",
          description: "increase in qualified leads from cross-platform integration"
        },
        {
          metric: "100,000+",
          description: "listings achieved within 16 months"
        },
        {
          metric: "50%",
          description: "improvement in booking conversion rates"
        }
      ]
    },
    testimonial: {
      quote: "The professional photography program was a game-changer. It helped us solve the trust problem while simultaneously improving conversion rates. Sometimes you have to do things that don't scale to learn what actually works.",
      name: "Brian Chesky",
      role: "CEO & Co-founder, Airbnb",
      avatar: "/assets/brian-chesky-avatar.webp"
    },
    metrics: [
      {
        value: "10x",
        label: "Booking Increase"
      },
      {
        value: "200%",
        label: "Lead Growth"
      },
      {
        value: "50%",
        label: "Conversion Improvement"
      },
      {
        value: "100K+",
        label: "Active Listings"
      }
    ],
    timeline: [
      {
        date: "Mar 2009",
        title: "Platform Integration",
        description: "Launched Craigslist integration and cross-posting features"
      },
      {
        date: "Jun 2009",
        title: "Photography Program",
        description: "Initiated professional photography service for hosts"
      },
      {
        date: "Sep 2009",
        title: "Pricing Optimization",
        description: "Launched dynamic pricing recommendations"
      },
      {
        date: "Jan 2010",
        title: "Mobile Optimization",
        description: "Released mobile-first design and booking flow"
      },
      {
        date: "Jun 2010",
        title: "Scale Achievement",
        description: "Reached 100,000 active listings milestone"
      }
    ],
    tags: [
      "Platform Growth",
      "Marketplace Optimization",
      "Photography",
      "Trust Building",
      "Cross-platform Integration"
    ]
  };