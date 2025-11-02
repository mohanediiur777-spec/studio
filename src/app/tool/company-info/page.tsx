'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useApp } from '@/hooks/useApp';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import StepContainer from '@/components/tool/StepContainer';
import { useTranslation } from '@/context/TranslationContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LoadingSpinner from '@/components/LoadingSpinner';

const formSchema = z.object({
  salesRepName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
  companyWebsite: z.string().url({ message: 'Please enter a valid URL.' }),
  facebook: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
});

export default function CompanyInfoPage() {
  const router = useRouter();
  const { user, companyInfo, setCompanyInfo } = useApp();
  const { t, lang } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salesRepName: user?.name || companyInfo?.salesRepName || '',
      companyName: companyInfo?.companyName || '',
      companyWebsite: companyInfo?.companyWebsite || '',
      facebook: companyInfo?.facebook || '',
      linkedin: companyInfo?.linkedin || '',
      twitter: companyInfo?.twitter || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCompanyInfo(values);
    router.push('/tool/industry');
  }

  // Ensure translations are loaded before rendering the form
  if (!t || !t.companyInfo) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <StepContainer
      title={t.companyInfo.title}
      description={t.companyInfo.description}
      headerContent={<LanguageSwitcher />}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="salesRepName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.companyInfo.salesRepName}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.companyInfo.salesRepNamePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.companyInfo.companyName}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.companyInfo.companyNamePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="companyWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.companyInfo.companyWebsite}</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t.companyInfo.socialMedia}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/company/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input placeholder="https://facebook.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter / X</FormLabel>
                    <FormControl>
                      <Input placeholder="https://twitter.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">{t.common.nextStep}</Button>
          </div>
        </form>
      </Form>
    </StepContainer>
  );
}
