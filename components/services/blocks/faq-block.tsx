"use client"

import { FAQBlock as FAQBlockType } from "@/lib/types"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQBlock({ data }: { data: FAQBlockType }) {
    return (
        <section className="py-20">
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-3xl font-bold mb-8 text-center theme-text">
                    {data.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                    {data.items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left font-semibold text-lg">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
