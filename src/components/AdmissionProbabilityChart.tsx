import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import type { ChartData, ChartOptions } from 'chart.js';

interface Application {
  id: number;
  school: string;
  major: string;
  batch: string;
  probability: number;
}

interface AdmissionProbabilityChartProps {
  applications?: Application[];
}

const AdmissionProbabilityChart: React.FC<AdmissionProbabilityChartProps> = ({ applications = [] }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Only show up to 8 applications for better visibility
    const displayApplications = applications.slice(0, 8);
    
    const data = {
      labels: displayApplications.map(app => app.school || `志愿 ${app.id}`),
      datasets: [
        {
          label: '录取概率',
          data: displayApplications.map(app => app.probability),
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 0.8)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        },
      ],
    };

    const options: ChartOptions<'radar'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: '#9CA3AF',
            font: {
              size: 14,
            },
            padding: 20,
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const app = applications[context.dataIndex];
              return [
                `学校: ${app.school || '未填写'}`,
                `专业: ${app.major || '未填写'}`,
                `批次: ${app.batch}`,
                `概率: ${app.probability}`
              ];
            }
          }
        }
      },
      scales: {
        r: {
          angleLines: {
            display: true,
            color: 'rgba(156, 163, 175, 0.2)'
          },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 20,
            color: 'transparent',
            backdropColor: 'transparent',
            display: false,
            callback: () => ''
          },
          pointLabels: {
            color: '#9CA3AF',
            font: {
              size: 12
            },
            callback: (value: string) => {
              // Truncate long school names
              const maxLength = 6;
              return value.length > maxLength 
                ? `${value.substring(0, maxLength)}...` 
                : value;
            }
          },
          grid: {
            color: 'rgba(156, 163, 175, 0.2)',
          },
        },
      },
    };

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'radar',
      data: data,
      options: options,
    });

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [applications]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">录取概率分析</h2>
      <div className="h-64">
        <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default AdmissionProbabilityChart;
