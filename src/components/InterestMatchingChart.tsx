import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface InterestMatchingChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }>;
  };
}

const InterestMatchingChart: React.FC<InterestMatchingChartProps> = ({ data }) => {
  const options: ChartOptions<'radar'> = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        pointLabels: {
          color: '#9CA3AF',
          font: {
            size: 12,
          },
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#9CA3AF',
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        兴趣匹配度
      </h3>
      <div className="h-64">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default InterestMatchingChart;
