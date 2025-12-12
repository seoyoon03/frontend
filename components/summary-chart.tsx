"use client"

import { useEffect, useRef } from "react"
import { Chart, ArcElement, Tooltip, Legend, type ChartConfiguration } from "chart.js"

Chart.register(ArcElement, Tooltip, Legend)

interface SummaryChartProps {
  vulnerabilityTypes: {
    [key: string]: number
  }
}

export function SummaryChart({ vulnerabilityTypes }: SummaryChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const labels = Object.keys(vulnerabilityTypes)
    const data = Object.values(vulnerabilityTypes)

    const colors = [
      "#EF4444", // red
      "#F97316", // orange
      "#EAB308", // yellow
      "#22C55E", // green
      "#3B82F6", // blue
      "#8B5CF6", // purple
      "#EC4899", // pink
    ]

    const config: ChartConfiguration<"pie"> = {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors.slice(0, labels.length),
            borderWidth: 2,
            borderColor: "#ffffff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "right",
            labels: {
              padding: 15,
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.parsed || 0
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
                const percentage = ((value / total) * 100).toFixed(1)
                return `${label}: ${value}개 (${percentage}%)`
              },
            },
          },
        },
      },
    }

    chartInstance.current = new Chart(ctx, config)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [vulnerabilityTypes])

  return (
    <div className="max-w-2xl mx-auto">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
