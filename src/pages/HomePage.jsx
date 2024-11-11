import React from 'react';

const Header = () => (
  <header className="fixed top-0 w-full bg-ga-black/95 backdrop-blur-sm border-b border-ga-gray/20 z-50">
    <div className="container mx-auto px-6 py-4">
      <nav className="flex justify-between items-center">
        <img 
          src="/assets/growth-academy-logo.png" 
          alt="Growth Academy" 
          className="h-10"
        />
        <div className="flex gap-8">
          <a href="/about" className="font-alata hover:text-ga-light transition-colors">About</a>
          <a href="/case-studies" className="font-alata hover:text-ga-light transition-colors">Case Studies</a>
          <a href="/shop" className="font-alata hover:text-ga-light transition-colors">Shop</a>
          <a href="/contact" className="font-alata hover:text-ga-light transition-colors">Contact</a>
        </div>
      </nav>
    </div>
  </header>
);

const OfferingCard = ({ title, description, icon }) => (
  <div className="bg-ga-gray/50 p-8 rounded-lg backdrop-blur-sm border border-ga-gray/20 hover:bg-ga-gray/70 transition-all">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-ga-light">{description}</p>
  </div>
);

const Footer = () => (
  <footer className="bg-ga-gray/30 backdrop-blur-sm border-t border-ga-gray/20">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img 
            src="/assets/growth-academy-logo.png" 
            alt="Growth Academy" 
            className="h-12 mb-4"
          />
          <p className="text-ga-light">Empowering growth through education</p>
        </div>
        <div className="flex justify-center gap-6">
          <img src="/assets/linkedin-logo.svg" alt="LinkedIn" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/assets/airbnb-logo.svg" alt="Airbnb" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/assets/dropbox-logo.svg" alt="Dropbox" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  </footer>
);

const HomePage = () => {
  const offerings = [
    {
      title: "Marketing Mastery",
      description: "Learn advanced marketing strategies to grow your business effectively.",
      icon: "📈"
    },
    {
      title: "Customer Experience",
      description: "Master the art of delivering exceptional customer experiences.",
      icon: "🤝"
    },
    {
      title: "Business Growth",
      description: "Develop skills to scale your business sustainably.",
      icon: "🚀"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-grow pt-20">
        <section className="relative h-screen flex items-center">
          <div className="absolute inset-0 z-0">
            <video
              className="w-full h-full object-cover opacity-20"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/assets/dna-video.mp4" type="video/mp4" />
            </video>
          </div>
          
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Grow your skills,<br />Grow your business.
              </h1>
              <p className="text-xl mb-8 text-ga-light">
                Growth Academy HQ provides easy-to-understand content to elevate your
                marketing and customer experience skills. Whether you're just starting
                or looking to grow, we're here to help you succeed.
              </p>
              <a 
                href="/courses" 
                className="inline-block bg-ga-white text-ga-black px-8 py-4 rounded-lg font-bold hover:bg-ga-light transition-colors"
              >
                Start Learning NOW!
              </a>
            </div>
            <div>
              <img 
                src="/assets/workspace-with-laptop.png" 
                alt="Workspace" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-24 bg-ga-gray/10">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offerings.map((offering, index) => (
                <OfferingCard key={index} {...offering} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;