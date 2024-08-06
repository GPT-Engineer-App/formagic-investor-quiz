// Update this page (the content is just a fallback if you fail to update the page)

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  sophisticatedInvestor: z.boolean().optional(),
  equity: z.string().optional(),
  interestedIn: z.array(z.string()).optional(),
  mortgageInterest: z.enum(["residential", "investment", "both", "none"]).optional(),
  investmentExperience: z.boolean().optional(),
});

const Index = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      sophisticatedInvestor: false,
      equity: "",
      interestedIn: [],
      mortgageInterest: "none",
      investmentExperience: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send the data to your server or API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Investment Profile Form</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sophisticatedInvestor"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Sophisticated Investor</FormLabel>
                    <FormDescription>
                      Do you possess net assets of $2.5 million, have a gross income of $250,000 annually for the last two financial years, or intend to make a single investment of $500,000?
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="equity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Equity</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter amount" {...field} />
                  </FormControl>
                  <FormDescription>
                    How much equity do you have in your home and investments once you take out all the debt?
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interestedIn"
              render={() => (
                <FormItem>
                  <FormLabel>Interested In (Select one or more)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {["Property", "High return cash funds", "Capital Raise Fund"].map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="interestedIn"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(field.value?.filter((value) => value !== item));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mortgageInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Residential or Investment Mortgages</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="residential" />
                        </FormControl>
                        <FormLabel className="font-normal">Residential</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="investment" />
                        </FormControl>
                        <FormLabel className="font-normal">Investment</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="both" />
                        </FormControl>
                        <FormLabel className="font-normal">Both</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">None</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Are you interested in financing a home or investment property?
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="investmentExperience"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Investment Experience</FormLabel>
                    <FormDescription>
                      Do you currently have investment properties or have money in a hedge fund?
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormDescription className="text-center">
              Providing this information will allow us to send specific information about your situation.
              Our system will also create a personalized report that highlights the best current opportunities for you.
            </FormDescription>
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Index;
