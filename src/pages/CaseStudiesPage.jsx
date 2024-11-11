import React from 'react';

const CaseStudyCard = ({ logo, title, challenge, solution, results }) => (
  <div className="bg-ga-gray/50 p-8 rounded-lg backdrop-blur-sm border border-ga-gray/20 hover:bg-ga-gray/70 transition-all group">
    <img src={logo} alt={title} className="h-12 mb-6 opacity-70 group-hover:opacity-100 transition-opacity" />
    
    <h3 className="text-xl font-alata mb-6">{title}</h3>
    
    <div className="space-y-6">
      <div>
        <h4 className="font-alata text-ga-light mb-2">CHALLENGE</h4>
        <p className="text-sm">{challenge}</p>
      </div>
      
      <div>
        <h4 className="font-alata text-ga-light mb-2">SOLUTION</h4>
        <p className="text-sm">{solution}</p>
      </div>
      
      <div>
        <h4 className="font-alata text-ga-light mb-2">RESULTS</h4>
        <ul className="text-sm space-y-2">
          {results.map((result, index) => (
            <li key={index} className="flex items-start">
              <span className="text-ga-light mr-2">•</span>
              {result}
            </li>
          ))}
        </ul>
      </div>
      
      <button className="mt-6 px-6 py-2 border border-ga-white rounded hover:bg-ga-white hover:text-ga-black transition-all">
        Learn More
      </button>
    </div>
  </div>
);

const CaseStudiesPage = () => {
  const caseStudies = [
    {
      logo: "/assets/dropbox-logo.svg",
      title: "Dropbox: Referral Marketing",
      challenge: "Dropbox needed a cost-effective way to acquire users in a competitive cloud storage market. Their initial paid ads were too expensive to sustain",
      solution: "Dropbox implemented a referral program that rewarded both the referrer and the referee with additional free storage space. This program incentivized users to invite friends and family to sign up for Dropbox, effectively turning users into brand ambassadors.",
      results: [
        "Increased sign-ups by 60%",
        "Achieved 3900% growth in 15 months, growing from 100,000 users to 4 million",
        "The referral program was responsible for 35% of daily sign-ups at its peak"
      ]
    },
    {
      logo: "/assets/airbnb-logo.svg",
      title: "Airbnb: Optimizing Listings and Leveraging Existing Platforms",
      challenge: "In the early days, Airbnb struggled to attract hosts and guests to its platform, competing against established hotel and accommodation services.",
      solution: "Airbnb's founders realized that many of their potential users were already posting property listings on Craigslist. They created a feature that allowed Airbnb hosts to automatically cross-post their listings to Craigslist, giving them immediate exposure to a wider audience.",
      results: [
        "Achieved significant growth in user base by tapping into Craigslist's massive audience",
        "Established a foothold in the market and built brand recognition as a trusted alternative to traditional hotels"
      ]
    },
    {
      logo: "/assets/linkedin-logo.svg",
      title: "LinkedIn: Building Early Network Effects with Invites",
      challenge: "LinkedIn needed to establish itself as a professional networking site, which required a large and active user base from the start.",
      solution: "LinkedIn implemented a contact import feature, allowing users to easily invite their existing contacts from email to connect on LinkedIn. This helped build initial momentum, as new users could immediately connect with people they knew.",
      results: [
        "LinkedIn's user base grew significantly in its early years, largely due to the network effects created by the contact import feature",
        "Reached 1 million users in just 16 months and became the go-to platform for professional networking"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-ga-black text-ga-white pt-20">
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-5xl font-alata mb-16">Case Studies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} {...study} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesPage;