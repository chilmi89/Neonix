"use client";


import { StatisticCard } from "@/app/(backend)/_components/data-display/StatisticCard";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import { GlassBadge } from "@/app/(frontend)/_components/ui/GlassBadge";
import {
  Users,
  DollarSign,
  ShoppingBag,
  Activity,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { containerStagger, slideUp } from "@/lib/motion";

const stats = [
  { label: "Total Revenue", value: "$45,231.89", trend: 20.1, icon: DollarSign, description: "+$2k from last month", color: "blue" },
  { label: "Active Users", value: "2,350", trend: 15.2, icon: Users, description: "+180 since yesterday", color: "emerald" },
  { label: "Sales", value: "+12,234", trend: -4.3, icon: ShoppingBag, description: "-2% from last week", color: "amber" },
  { label: "Active Now", value: "573", trend: 12, icon: Activity, description: "+201 since last hour", color: "rose" },
];

const recentOrders = [
  { id: 1, customer: "Alice Johnson", product: "Premium Plan", amount: "$99.00", status: "Success" },
  { id: 2, customer: "Bob Smith", product: "Standard Plan", amount: "$49.00", status: "Pending" },
  { id: 3, customer: "Charlie Brown", product: "Premium Plan", amount: "$99.00", status: "Failed" },
  { id: 4, customer: "Diana Prince", product: "Enterprise", amount: "$599.00", status: "Success" },
  { id: 5, customer: "Ethan Hunt", product: "Standard Plan", amount: "$49.00", status: "Success" },
];

export default function DashboardPage() {
  return (

    <motion.div
      variants={containerStagger}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-glass-text">Welcome back, John!</h1>
          <p className="text-glass-text/60">Here&apos;s what&apos;s happening with your projects today.</p>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary/30 flex items-center gap-2 hover:brightness-110 mb-transition">
          Download Report <ArrowUpRight size={18} />
        </button>
      </div>

      <motion.div
        variants={containerStagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={slideUp}>
            <StatisticCard {...(stat as any)} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={slideUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable
            title="Recent Orders"
            data={recentOrders}
            columns={[
              { header: "Customer", accessor: "customer" },
              { header: "Product", accessor: "product" },
              { header: "Amount", accessor: "amount" },
              {
                header: "Status",
                accessor: (item) => (
                  <GlassBadge variant={item.status === "Success" ? "success" : item.status === "Pending" ? "warning" : "danger"}>
                    {item.status}
                  </GlassBadge>
                )
              },
            ]}
          />
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-glass-text mb-6">Activity Feed</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Activity size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-glass-text">System update completed</p>
                  <p className="text-xs text-glass-text/40">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>

  );
}
