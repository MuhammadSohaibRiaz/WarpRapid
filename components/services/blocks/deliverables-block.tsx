"use client"

import { DeliverablesBlock as DeliverablesBlockType } from "@/lib/types"
import { motion } from "framer-motion"
import { Package, FileCode2, Layout, Database, Server, Shield } from "lucide-react"

export function DeliverablesBlock({ data }: { data: DeliverablesBlockType }) {
    return (
        <section className="py-20 bg-primary/5 border-y border-primary/10">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-text">
                        {data.title}
                    </h2>
                    <p className="text-muted-foreground">What you get when we ship.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-6 bg-background rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="mt-1 p-2 bg-primary/10 rounded-lg text-primary">
                                <Package className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1 theme-text">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
