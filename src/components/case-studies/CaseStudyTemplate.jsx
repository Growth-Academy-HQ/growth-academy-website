import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Share2, Download, BookOpen, X, Copy, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CaseStudyTemplate = ({ caseStudy }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const currentUrl = window.location.href;

  const handleShare = async (platform) => {
    const title = `Check out this case study: ${caseStudy.title}`;
    const text = `${caseStudy.summary}\n\nRead more at:`;
    
    switch (platform) {
      case 'copy':
        try {
          await navigator.clipboard.writeText(currentUrl);
          alert('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
          '_blank'
        );
        break;
      default:
        break;
    }
    setShowShareModal(false);
  };

  const handleDownload = () => {
    // Initialize PDF
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(24);
    doc.setTextColor(33, 33, 33);
    doc.text(caseStudy.title, 20, 30);

    // Summary
    doc.setFontSize(12);
    doc.setTextColor(66, 66, 66);
    const summaryLines = doc.splitTextToSize(caseStudy.summary, 170);
    doc.text(summaryLines, 20, 45);

    // Metrics
    doc.autoTable({
      startY: 60,
      head: [['Metric', 'Value']],
      body: caseStudy.metrics.map(metric => [
        metric.label,
        metric.value
      ]),
      theme: 'grid',
      headStyles: { fillColor: [33, 33, 33] },
      styles: { fontSize: 10 }
    });

    // Challenge Section
    doc.setFontSize(16);
    doc.setTextColor(33, 33, 33);
    doc.text('The Challenge', 20, doc.lastAutoTable.finalY + 20);
    
    doc.setFontSize(10);
    doc.setTextColor(66, 66, 66);
    const challengeLines = doc.splitTextToSize(caseStudy.challenge.replace(/<[^>]+>/g, ''), 170);
    doc.text(challengeLines, 20, doc.lastAutoTable.finalY + 30);

    // Solution Section
    doc.setFontSize(16);
    doc.text('The Solution', 20, doc.getTextDimensions(challengeLines).h + doc.lastAutoTable.finalY + 45);
    
    doc.setFontSize(10);
    const solutionLines = doc.splitTextToSize(caseStudy.solution.replace(/<[^>]+>/g, ''), 170);
    doc.text(solutionLines, 20, doc.getTextDimensions(challengeLines).h + doc.lastAutoTable.finalY + 55);

    // Results Section
    doc.addPage();
    doc.setFontSize(16);
    doc.text('The Results', 20, 20);
    
    doc.setFontSize(10);
    const resultsLines = doc.splitTextToSize(caseStudy.results.replace(/<[^>]+>/g, ''), 170);
    doc.text(resultsLines, 20, 30);

    // Timeline
    doc.autoTable({
      startY: doc.getTextDimensions(resultsLines).h + 40,
      head: [['Date', 'Milestone']],
      body: caseStudy.timeline.map(event => [
        event.date,
        `${event.title}: ${event.description}`
      ]),
      theme: 'grid',
      headStyles: { fillColor: [33, 33, 33] },
      styles: { fontSize: 10 }
    });

    // Testimonial
    if (caseStudy.testimonial) {
      doc.setFontSize(12);
      doc.setTextColor(33, 33, 33);
      doc.text('Testimonial', 20, doc.lastAutoTable.finalY + 20);

      doc.setFontSize(10);
      doc.setTextColor(66, 66, 66);
      const quoteLines = doc.splitTextToSize(`"${caseStudy.testimonial.quote}"`, 170);
      doc.text(quoteLines, 20, doc.lastAutoTable.finalY + 30);
      
      doc.setFontSize(10);
      doc.text(
        `- ${caseStudy.testimonial.name}, ${caseStudy.testimonial.role}`,
        20,
        doc.lastAutoTable.finalY + 30 + doc.getTextDimensions(quoteLines).h + 5
      );
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(
        'Growth Academy Case Study - Visit https://growth.academy for more insights',
        20,
        doc.internal.pageSize.height - 10
      );
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 40,
        doc.internal.pageSize.height - 10
      );
    }

    // Save the PDF
    doc.save(`${caseStudy.company.toLowerCase()}-case-study.pdf`);
  };

  const {
    company,
    logo,
    title,
    summary,
    challenge,
    solution,
    results,
    testimonial,
    metrics,
    timeline,
    tags
  } = caseStudy;

  return (
    <div className="bg-ga-black text-ga-white">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link 
              to="/case-studies" 
              className="inline-flex items-center text-ga-light hover:text-ga-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="mb-8">
                <img 
                  src={logo} 
                  alt={company} 
                  className="h-12 mb-6 opacity-75"
                />
                <h1 className="text-4xl md:text-5xl font-alata mb-6">{title}</h1>
                <p className="text-xl text-ga-light">{summary}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-4 py-1 rounded-full bg-ga-gray text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-6"
            >
              {metrics.map((metric, index) => (
                <div 
                  key={index}
                  className="bg-ga-gray p-6 rounded-lg"
                >
                  <div className="text-3xl font-bold mb-2">{metric.value}</div>
                  <div className="text-ga-light">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-ga-gray/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Challenge Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-alata mb-6">The Challenge</h2>
              <div className="prose prose-invert max-w-none">
                {challenge}
              </div>
            </motion.div>

            {/* Solution Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-alata mb-6">The Solution</h2>
              <div className="prose prose-invert max-w-none">
                {solution}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-alata mb-6">Implementation Timeline</h2>
              <div className="space-y-6">
                {timeline.map((event, index) => (
                  <div 
                    key={index}
                    className="flex gap-6"
                  >
                    <div className="w-24 flex-shrink-0 text-ga-light">
                      {event.date}
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{event.title}</h3>
                      <p className="text-ga-light">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-alata mb-6">The Results</h2>
              <div className="prose prose-invert max-w-none">
                {results}
              </div>
            </motion.div>

            {/* Testimonial */}
            {testimonial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-ga-gray p-8 rounded-lg"
              >
                <blockquote className="text-xl italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-ga-light">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Floating Action Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-ga-gray/80 backdrop-blur-lg border-t border-ga-white/10"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-ga-light">
              Share this case study
            </div>
            <div className="flex items-center gap-4">
              <button 
                className="p-2 hover:bg-ga-white/10 rounded-full transition-colors"
                onClick={() => setShowShareModal(true)}
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                className="p-2 hover:bg-ga-white/10 rounded-full transition-colors"
                onClick={handleDownload}
              >
                <Download className="w-5 h-5" />
              </button>
              <a
                href="https://payhip.com/b/peXsw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ga-white text-ga-black px-4 py-2 rounded-full hover:bg-ga-light transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Get the eBook
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
            />
            <motion.div
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ga-gray rounded-lg p-6 z-50 w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-alata">Share Case Study</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-ga-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => handleShare('copy')}
                  className="flex flex-col items-center gap-2 p-4 hover:bg-ga-white/10 rounded-lg transition-colors"
                >
                  <Copy className="w-6 h-6" />
                  <span className="text-sm">Copy Link</span>
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex flex-col items-center gap-2 p-4 hover:bg-ga-white/10 rounded-lg transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                  <span className="text-sm">Twitter</span>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex flex-col items-center gap-2 p-4 hover:bg-ga-white/10 rounded-lg transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                  <span className="text-sm">LinkedIn</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CaseStudyTemplate;