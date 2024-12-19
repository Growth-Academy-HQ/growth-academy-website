import { useEffect } from "react";
import { useSubscriptions } from "../../utils/subscriptions";

export function SchedulerForm() {
  const { currentPlan, isLoading } = useSubscriptions();

  useEffect(() => {
    if (isLoading || !currentPlan) return; // Wait for subscription data

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isLoading, currentPlan]); // Re-run when subscription data changes

  if (isLoading || !currentPlan) {
    return (
      <div className="text-ga-white text-center py-4">
        Loading calendar...
      </div>
    );
  }

  const calendlyUrl =
    currentPlan === "pro"
      ? "https://calendly.com/diego-growthacademy-hq/consultation"
      : "https://calendly.com/diego-growthacademy-hq/growth-academy-consultation-growth-expert-plan";

  return (
    <div className="w-full">
      <div
        className="calendly-inline-widget rounded-lg shadow-lg"
        data-url={calendlyUrl}
        style={{ minWidth: "320px", height: "700px" }}
      ></div>
    </div>
  );
}