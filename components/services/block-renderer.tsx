"use client"

import { ContentBlock } from "@/lib/types"
import { FeatureBlock } from "./blocks/feature-block"
import { ProcessBlock } from "./blocks/process-block"
import { TechStackBlock } from "./blocks/tech-stack-block"
import { BenefitsBlock } from "./blocks/benefits-block"
import { FAQBlock } from "./blocks/faq-block"

export function BlockRenderer({ block }: { block: ContentBlock }) {
    switch (block.type) {
        case "features":
            return <FeatureBlock data={block.data} />
        case "process":
            return <ProcessBlock data={block.data} />
        case "tech-stack":
            return <TechStackBlock data={block.data} />
        case "benefits":
            return <BenefitsBlock data={block.data} />
        case "faq":
            return <FAQBlock data={block.data} />
        default:
            return null
    }
}
