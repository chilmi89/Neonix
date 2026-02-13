"use client";


import { ComponentShowcase } from "@/app/(backend)/_components/ui/ComponentShowcase";
import { GlassButton } from "@/app/(frontend)/_components/ui/GlassButton";
import { GlassBadge } from "@/app/(frontend)/_components/ui/GlassBadge";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { StatisticCard } from "@/app/(backend)/_components/data-display/StatisticCard";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    Users,
    DollarSign,
    Activity,
    ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, containerStagger } from "@/lib/motion";

export default function LibraryPage() {
    return (

        <motion.div
            variants={containerStagger}
            initial="initial"
            animate="animate"
            className="space-y-12 pb-20"
        >
            <div className="border-b border-glass-border pb-8">
                <h1 className="text-4xl font-bold text-glass-text">Component Library</h1>
                <p className="text-glass-text/60 mt-2">Ready-to-use glassmorphism components. Pure UI, copy-paste friendly.</p>
            </div>

            <ComponentShowcase
                title="Glass Button"
                description="Interactive buttons with glass effect and multiple variants."
                code={`<GlassButton variant="primary">Primary</GlassButton>
<GlassButton variant="outline">Outline</GlassButton>
<GlassButton variant="ghost">Ghost</GlassButton>`}
            >
                <div className="flex flex-wrap gap-4">
                    <GlassButton variant="primary">Primary Action</GlassButton>
                    <GlassButton variant="outline">Secondary Action</GlassButton>
                    <GlassButton variant="ghost">Ghost Button</GlassButton>
                </div>
            </ComponentShowcase>

            <ComponentShowcase
                title="Glass Badge"
                description="Status indicators with semi-transparent backgrounds."
                code={`<GlassBadge variant="success">Active</GlassBadge>
<GlassBadge variant="warning">Pending</GlassBadge>
<GlassBadge variant="danger">Failed</GlassBadge>`}
            >
                <div className="flex flex-wrap gap-4">
                    <GlassBadge variant="success">Success</GlassBadge>
                    <GlassBadge variant="warning">Warning</GlassBadge>
                    <GlassBadge variant="danger">Danger</GlassBadge>
                    <GlassBadge variant="info">Information</GlassBadge>
                    <GlassBadge>Default</GlassBadge>
                </div>
            </ComponentShowcase>

            <ComponentShowcase
                title="Glass Card"
                description="The primary container with backdrop blur and subtle noise texture."
                code={`<GlassCard className="max-w-sm">
  <h4 className="font-bold">Card Title</h4>
  <p className="text-sm opacity-60">This content is inside a glass card.</p>
</GlassCard>`}
            >
                <GlassCard className="max-w-sm">
                    <div className="space-y-2">
                        <h4 className="font-bold text-lg text-glass-text">Glass Surface</h4>
                        <p className="text-sm text-glass-text/60 leading-relaxed">
                            Our cards use a blend of backdrop blur, semi-transparent backgrounds, and low-opacity borders to achieve a high-end glass effect.
                        </p>
                        <GlassButton size="sm" className="mt-4">Read More</GlassButton>
                    </div>
                </GlassCard>
            </ComponentShowcase>

            <ComponentShowcase
                title="Input Fields"
                description="Clean inputs that blend perfectly with glass backgrounds."
                code={`<input 
  type="text" 
  placeholder="Enter something..." 
  className="bg-white/5 border border-glass-border rounded-xl px-4 py-2 outline-none focus:border-primary transition-all text-glass-text" 
/>`}
            >
                <div className="w-full max-w-md space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-glass-text"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-glass-text"
                    />
                </div>
            </ComponentShowcase>

            <ComponentShowcase
                title="Statistic Card"
                description="KPI indicators with icons and trend analysis."
                code={`<StatisticCard 
  label="Total Revenue" 
  value="$45,231.89" 
  trend={20.1} 
  icon={DollarSign} 
  description="+$2k from last month" 
  color="blue" 
/>`}
            >
                <div className="w-full max-w-sm">
                    <StatisticCard
                        label="Total Revenue"
                        value="$45,231.89"
                        trend={20.1}
                        icon={DollarSign}
                        description="+$2k from last month"
                        color="blue"
                    />
                </div>
            </ComponentShowcase>

            <ComponentShowcase
                title="Data Table"
                description="Generic data grid with responsive glass styling."
                code={`<DataTable 
  title="Recent Orders"
  data={data}
  columns={[
    { header: "Customer", accessor: "customer" },
    { header: "Amount", accessor: "amount" },
    { 
      header: "Status", 
      accessor: (item) => <GlassBadge>{item.status}</GlassBadge> 
    },
  ]}
/>`}
            >
                <div className="w-full">
                    <DataTable
                        title="Recent Orders"
                        data={[
                            { id: 1, customer: "Alice", amount: "$99.00", status: "Success" },
                            { id: 2, customer: "Bob", amount: "$49.00", status: "Pending" },
                        ]}
                        columns={[
                            { header: "Customer", accessor: "customer" },
                            { header: "Amount", accessor: "amount" },
                            {
                                header: "Status",
                                accessor: (item) => (
                                    <GlassBadge variant={item.status === "Success" ? "success" : "warning"}>
                                        {item.status}
                                    </GlassBadge>
                                )
                            },
                        ]}
                    />
                </div>
            </ComponentShowcase>

        </motion.div>

    );
}
