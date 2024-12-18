import { SchedulerForm } from '../components/scheduler';

export default function SchedulerPage() {
  return (
    <div className="min-h-screen bg-ga-black pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-ga-white mb-6">Schedule a Meeting</h1>
        <div className="max-w-2xl mx-auto">
          <SchedulerForm />
        </div>
      </div>
    </div>
  );
} 