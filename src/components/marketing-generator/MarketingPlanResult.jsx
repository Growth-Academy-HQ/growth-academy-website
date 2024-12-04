// src/components/marketing-generator/MarketingPlanResult.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2, FileText } from 'lucide-react';

const MarketingPlanResult = ({ plan, inputs, onBack }) => {
  const sections = [
    { title: 'Executive Summary', content: plan.content[0].text.match(/1\.\s*Executive Summary([\s\S]*?)2\./)?.[1]?.trim() },
    { title: 'Mission Statement', content: plan.content[0].text.match(/2\.\s*Mission Statement([\s\S]*?)3\./)?.[1]?.trim() },
    { title: 'Marketing Objectives', content: plan.content[0].text.match(/3\.\s*Marketing Objectives([\s\S]*?)4\./)?.[1]?.trim() },
    { title: 'SWOT Analysis', content: plan.content[0].text.match(/4\.\s*SWOT Analysis([\s\S]*?)5\./)?.[1]?.trim() },
    { title: 'Market Research', content: plan.content[0].text.match(/5\.\s*Market Research([\s\S]*?)6\./)?.[1]?.trim() },
    { title: 'Marketing Strategy', content: plan.content[0].text.match(/6\.\s*Marketing Strategy([\s\S]*?)7\./)?.[1]?.trim() },
    { title: 'Budget Allocation', content: plan.content[0].text.match(/7\.\s*Budget Allocation([\s\S]*?)$/)?.[1]?.trim() }
  ];

  const handleDownload = () => {
    console.log('Downloading plan...');
  };

  const handleShare = () => {
    console.log('Sharing plan...');
  };

  return (
    <div className="min-h-screen bg-ga-black/50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header with Plan Name */}
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="text-ga-white">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-alata text-ga-white">{inputs.planName}</h1>
              <p className="text-sm text-ga-light">Marketing Plan</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShare} className="gap-2 text-ga-white border-ga-white/10">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button variant="outline" onClick={handleDownload} className="gap-2 text-ga-white border-ga-white/10">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Input Summary Card */}
        <Card className="bg-ga-black/30 border-ga-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <div>
                <CardTitle className="text-ga-white">Plan Details</CardTitle>
                <CardDescription className="text-ga-light">Generated for {inputs.businessIdea}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-ga-white">Target Market:</p>
              <p className="text-ga-light">{inputs.targetMarket}</p>
            </div>
            <div>
              <p className="font-medium text-ga-white">Current Stage:</p>
              <p className="text-ga-light">{inputs.currentStage}</p>
            </div>
            <div>
              <p className="font-medium text-ga-white">Marketing Goals:</p>
              <p className="text-ga-light">{inputs.marketingGoals}</p>
            </div>
            <div>
              <p className="font-medium text-ga-white">Budget:</p>
              <p className="text-ga-light">{inputs.budget}</p>
            </div>
          </CardContent>
        </Card>

        {/* Marketing Plan Sections */}
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={index} className="bg-ga-black/30 border-ga-white/10">
                <CardHeader>
                  <CardTitle className="text-ga-white">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    {section.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MarketingPlanResult;