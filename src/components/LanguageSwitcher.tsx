'use client';

import { useTranslation } from "@/context/TranslationContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LanguageSwitcher() {
    const { lang, setLang } = useTranslation();

    return (
        <Tabs defaultValue={lang} onValueChange={(value) => setLang(value as 'en' | 'ar')}>
            <TabsList>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">العربية</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
