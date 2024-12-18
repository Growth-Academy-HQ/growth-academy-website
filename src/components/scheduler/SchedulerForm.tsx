import * as React from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "../ui/use-toast";
import { Calendar } from "../ui/calendar";
import { useGoogleLogin } from '@react-oauth/google';
import { cn } from "../../utils/utils";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  appointment_date: z.date(),
  notes: z.string().optional(),
});

export function SchedulerForm() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [selectedTime, setSelectedTime] = React.useState<string>("");
  const [showTimeSlots, setShowTimeSlots] = React.useState(false);
  const [isGoogleUser, setIsGoogleUser] = React.useState(false);
  
  React.useEffect(() => {
    const hasGoogleAccount = user?.externalAccounts?.some(
      account => account.provider === 'google'
    );
    setIsGoogleUser(!!hasGoogleAccount);
  }, [user]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.firstName || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
      notes: "",
    },
  });

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar',
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenResponse.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            summary: 'Growth Academy Consultation',
            description: form.getValues('notes'),
            start: {
              dateTime: form.getValues('appointment_date').toISOString(),
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            end: {
              dateTime: new Date(form.getValues('appointment_date').getTime() + 60 * 60 * 1000).toISOString(),
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            attendees: [
              { email: form.getValues('email') },
              { email: 'contact.growthacademyhq@gmail.com' }
            ],
            conferenceData: {
              createRequest: {
                requestId: `${form.getValues('email')}-${Date.now()}`,
                conferenceSolutionKey: { type: 'hangoutsMeet' },
              },
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create calendar event');
        }

        toast({
          title: "Meeting scheduled!",
          description: "Check your email for the calendar invite with Google Meet link.",
        });
        form.reset();
        setSelectedTime("");
        setShowTimeSlots(false);
      } catch (error) {
        console.error('Scheduling error:', error);
        toast({
          title: "Error",
          description: "Failed to schedule meeting. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  async function handleNonGoogleUser() {
    try {
      const token = await getToken();
      const appointmentDate = form.getValues('appointment_date');
      console.log('Sending meeting request:', {
        date: appointmentDate,
        notes: form.getValues('notes'),
        email: form.getValues('email')
      });
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/schedule-meeting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: appointmentDate.toISOString(),
          notes: form.getValues('notes'),
          email: form.getValues('email')
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        toast({
          title: "Error",
          description: errorData.details || "Failed to schedule meeting",
          variant: "destructive",
        });
        return;
      }

      const data = await response.json();
      console.log('Meeting scheduled:', data);
      
      toast({
        title: "Meeting scheduled!",
        description: "You'll receive an email with the meeting details and Google Meet link.",
      });
      form.reset();
      setSelectedTime("");
      setShowTimeSlots(false);
    } catch (error) {
      console.error('Scheduling error:', error);
      toast({
        title: "Error",
        description: "Failed to schedule meeting. Please try again.",
        variant: "destructive",
      });
    }
  }

  async function onSubmit() {
    if (isGoogleUser) {
      try {
        login();
      } catch (error) {
        console.error('Login error:', error);
        toast({
          title: "Error",
          description: "Failed to authenticate with Google. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      await handleNonGoogleUser();
    }
  }

  const timeSlots = [
    "09:00", "10:00", "11:00", 
    "13:00", "14:00", "15:00"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ga-white">Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="bg-ga-black/50 border-ga-white/10 text-ga-white focus:border-ga-white/30" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ga-white">Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="bg-ga-black/50 border-ga-white/10 text-ga-white focus:border-ga-white/30" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="appointment_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ga-white">Select Date</FormLabel>
                <div className="rounded-lg border border-ga-white/10 p-4">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setShowTimeSlots(!!date);
                    }}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    className="text-ga-white rounded-md"
                    classNames={{
                      head_cell: "text-ga-white/60 font-normal",
                      cell: "text-ga-white h-9 w-9 font-normal p-0",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-ga-white/10 rounded-md",
                      day_selected: "bg-ga-white !text-ga-black hover:bg-ga-white focus:bg-ga-white",
                      day_today: "bg-ga-white/10 text-ga-white",
                      day_disabled: "text-ga-white/10 hover:bg-transparent",
                      nav_button: "text-ga-white hover:bg-ga-white/10 rounded-md",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {showTimeSlots && (
            <div className="space-y-2 animate-in fade-in-50">
              <FormLabel className="text-ga-white">Select Time</FormLabel>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant="outline"
                    className={cn(
                      "bg-ga-black/50 border-ga-white/10 text-ga-white hover:bg-ga-white hover:text-ga-black transition-colors",
                      selectedTime === time && "bg-ga-white text-ga-black"
                    )}
                    onClick={() => {
                      setSelectedTime(time);
                      const date = form.getValues("appointment_date") || new Date();
                      const [hours, minutes] = time.split(":");
                      date.setHours(parseInt(hours), parseInt(minutes));
                      form.setValue("appointment_date", date);
                    }}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ga-white">Notes (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className="bg-ga-black/50 border-ga-white/10 text-ga-white focus:border-ga-white/30" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={!form.getValues("appointment_date") || !selectedTime}
            className={cn(
              "w-full bg-ga-white text-ga-black hover:bg-ga-white/90 mt-6",
              (!form.getValues("appointment_date") || !selectedTime) && 
              "opacity-50 cursor-not-allowed"
            )}
          >
            Schedule Meeting
          </Button>
        </div>
      </form>
    </Form>
  );
}