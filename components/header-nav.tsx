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
import { serviceCategories, servicesData } from "@/lib/services-data"

export function HeaderNav() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-2">

                {/* About */}
                <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent theme-text hover:bg-primary/10 hover:text-primary data-[active]:text-primary")}>
                            About
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                {/* Mega Menu: Services */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent theme-text hover:bg-primary/10 hover:text-primary data-[active]:text-primary data-[state=open]:text-primary">
                        What We Do
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="w-[800px] p-6 md:w-[900px] lg:w-[1240px] bg-background/95 backdrop-blur-xl rounded-xl border border-border shadow-2xl">
                            <div className="grid grid-cols-3 gap-12">
                                {serviceCategories.map((category) => (
                                    <div key={category.title} className="space-y-6">
                                        <div className="border-b border-border/50 pb-4">
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">
                                                {category.title}
                                            </h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed opacity-80">
                                                {category.description}
                                            </p>
                                        </div>
                                        <ul className="space-y-1">
                                            {category.services.map((slug) => {
                                                const service = servicesData[slug as keyof typeof servicesData]
                                                return (
                                                    <li key={slug}>
                                                        <Link href={`/services/${slug}`} legacyBehavior passHref>
                                                            <NavigationMenuLink asChild>
                                                                <a className={cn(
                                                                    "group flex items-start gap-3 rounded-lg px-2 py-3 leading-none no-underline outline-none transition-colors hover:bg-primary/5 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                                )}>
                                                                    <div className="mt-0.5 p-1.5 bg-primary/5 rounded-md group-hover:bg-primary/20 transition-colors">
                                                                        <service.icon className="w-4 h-4 text-primary" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="text-sm font-medium theme-text group-hover:text-primary mb-1 transition-colors">{service.title}</div>
                                                                        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2 opacity-70">
                                                                            {service.description}
                                                                        </p>
                                                                    </div>
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
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Case Studies */}
                <NavigationMenuItem>
                    <Link href="/case-studies" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent theme-text hover:bg-primary/10 hover:text-primary")}>
                            Case Studies
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                {/* Blog */}
                <NavigationMenuItem>
                    <Link href="/blog" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent theme-text hover:bg-primary/10 hover:text-primary")}>
                            Insights
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                {/* Careers - ADDED HERE */}
                <NavigationMenuItem>
                    <Link href="/careers" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent theme-text hover:bg-primary/10 hover:text-primary")}>
                            Careers
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}
