// components/InputBar.tsx
'use client';

import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from './ui/inputInputBar';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ArrowRight } from 'lucide-react'; // Import ArrowRight icon from Lucide React

interface InputBarFormValues {
  message: string;
}

const InputBar: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<InputBarFormValues>({
    defaultValues: {
      message: ''
    },
    mode: 'onChange'
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<InputBarFormValues> = async (data) => {
    try {
      setLoading(true);
      console.log("Submitted message:", data.message);
      // Perform your submit action here, e.g., API call
      reset(); // Clear the input field after submission
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full p-4">
          <FormField
            control={control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="sr-only">Message</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type your message..."
                    {...field}
                    disabled={loading}
                    icon={<ArrowRight />}
                    className="border rounded-l-md dark:bg-gray-700 dark:text-white resize-none overflow-auto"
                    style={{
                      minWidth: '300px',
                      maxHeight: '16em', // Set the maximum height of the textarea
                      height: 'auto'  // Allow the height to grow based on content
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default InputBar;
