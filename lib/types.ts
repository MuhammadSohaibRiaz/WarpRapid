import { LucideIcon } from "lucide-react"

export type ServiceSlug =
    | "web-application-development"
    | "mobile-app-development"
    | "custom-software-development"
    | "ai-automation-workflow"
    | "custom-ai-integrations"
    | "cloud-infrastructure"
    | "technical-consulting"
    | "security-compliance"
    | "data-analytics"

export interface ServiceData {
    title: string
    subtitle: string
    icon: LucideIcon
    shortDescription: string
    heroImage?: string // Optional abstract pattern
    contentBlocks: ContentBlock[]
}

export type ContentBlock =
    | { type: "features"; data: FeatureBlock }
    | { type: "process"; data: ProcessBlock }
    | { type: "tech-stack"; data: TechStackBlock }
    | { type: "benefits"; data: BenefitBlock }
    | { type: "faq"; data: FAQBlock }
    | { type: "cta"; data: CTABlock }

export interface FeatureBlock {
    title: string
    items: {
        title: string
        description: string
        icon?: any // We'll render icons dynamically based on name or pass components
    }[]
}

export interface ProcessBlock {
    title: string
    steps: {
        title: string
        description: string
    }[]
}

export interface TechStackBlock {
    title: string
    technologies: string[] // List of tech names to map to logos
}

export interface BenefitBlock {
    title: string
    items: {
        title: string
        description: string
    }[]
}

export interface FAQBlock {
    title: string
    items: {
        question: string
        answer: string
    }[]
}

export interface CTABlock {
    title: string
    buttonText: string
    href: string
}
