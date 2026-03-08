"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Brain, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { serviceCategories, servicesData, industrySolutions } from "@/lib/services-data"

export function HeaderNav() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-2">

                {/* About */}
                <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-foreground hover:bg-primary/10 hover:text-primary data-[active]:text-primary")}>
                            About
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                {/* Mega Menu: Services */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-primary/10 hover:text-primary data-[active]:text-primary data-[state=open]:text-primary">
                        What We Do
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="w-[calc(100vw-6rem)] max-w-3xl p-5 bg-background/95 backdrop-blur-xl rounded-xl border border-border shadow-2xl">
                            {/* Service Columns — compact: icon + title only */}
                            <div className="grid grid-cols-3 gap-6">
                                {serviceCategories.map((category) => (
                                    <div key={category.title} className="space-y-2.5">
                                        <div className="border-b border-border/50 pb-2.5">
                                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary">
                                                {category.title}
                                            </h4>
                                        </div>
                                        <ul className="space-y-0.5">
                                            {category.services.map((slug) => {
                                                const service = servicesData[slug as keyof typeof servicesData]
                                                return (
                                                    <li key={slug}>
                                                        <Link href={`/services/${slug}`} legacyBehavior passHref>
                                                            <NavigationMenuLink asChild>
                                                                <a className="group flex items-center gap-2 rounded-md px-1.5 py-1.5 leading-none no-underline outline-none transition-colors hover:bg-primary/5">
                                                                    <service.icon className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary transition-colors shrink-0" />
                                                                    <span className="text-[13px] font-medium text-foreground group-hover:text-primary transition-colors whitespace-nowrap">{service.title}</span>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Solutions Strip */}
                            {industrySolutions.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-border/50">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Solutions</span>
                                            {industrySolutions.map((solution) => (
                                                <Link key={solution.href} href={solution.href} legacyBehavior passHref>
                                                    <NavigationMenuLink asChild>
                                                        <a className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/10 hover:border-primary/20 transition-all">
                                                            <span className="text-[13px] font-medium text-foreground group-hover:text-primary transition-colors">{solution.title}</span>
                                                            <ArrowRight className="w-3 h-3 text-primary/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                                                        </a>
                                                    </NavigationMenuLink>
                                                </Link>
                                            ))}
                                        </div>
                                        <Link href="/services" legacyBehavior passHref>
                                            <NavigationMenuLink asChild>
                                                <a className="text-[11px] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap">
                                                    All services <ArrowRight className="w-3 h-3" />
                                                </a>
                                            </NavigationMenuLink>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Case Studies */}
                <NavigationMenuItem>
                    <Link href="/case-studies" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-foreground hover:bg-primary/10 hover:text-primary")}>
                            Case Studies
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                {/* Blog */}
                <NavigationMenuItem>
                    <Link href="/blog" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-foreground hover:bg-primary/10 hover:text-primary")}>
                            Insights
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                {/* Careers - ADDED HERE */}
                <NavigationMenuItem>
                    <Link href="/careers" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-foreground hover:bg-primary/10 hover:text-primary")}>
                            Careers
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}
