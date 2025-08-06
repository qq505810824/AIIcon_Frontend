import {
    faArrowTrendUp,
    faExclamationTriangle,
    faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale, // X轴比例尺
    LinearScale, // Y轴比例尺
    PointElement, // 点元素
    LineElement, // 线元素
    Tooltip,
    Legend,
    ChartDataLabels
);

interface ViewProps {
    chartData: any
}


export default function ChartsAndInsightsView({
    chartData
}: ViewProps) {
    const data = {
        labels: chartData?.map((item: any) => item.date),
        datasets: [
            {
                label: 'Contacts Growth',
                data: chartData?.map((item: any) => item.count),
                backgroundColor: '#D4AF37',
                borderColor: 'rgba(212, 175,55, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }
        ]
    };

    //  const data = {
    //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    //     datasets: [
    //         {
    //             label: 'Network Value ($M)',
    //             data: [2.1, 2.3, 2.5, 2.4, 2.7, 2.8],
    //             backgroundColor: '#D4AF37',
    //             borderColor: 'rgba(212, 175,55, 0.1)',
    //             borderWidth: 2,
    //             fill: true,
    //             tension: 0.4
    //         }
    //     ]
    // };

    const options = {
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#D4AF37'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#9CA3AF'
                },
                grid: {
                    color: 'rgba(156, 163, 175,0.1) '
                }
            },
            y: {
                ticks: {
                    color: '#9CA3AF'
                },
                grid: {
                    color: 'rgba(156, 163, 175,0.1) '
                }
            }
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* <!-- Network Growth Chart --> */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gold-400/20">
                    <h3 className="text-xl font-semibold text-gold-400 mb-4">
                        Network Value Growth
                    </h3>
                    {/* <canvas id="networkChart" width="400" height="200"></canvas> */}
                    <Line data={data} options={options} className={`w-[400px] h-[200px]`} />
                </div>
                {/* <!-- AI Insights --> */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gold-400/20">
                    <h3 className="text-xl font-semibold text-gold-400 mb-4">
                        AI Insights & Recommendations
                    </h3>
                    <div className="space-y-4">
                        <div className="bg-gray-700 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <FontAwesomeIcon
                                        icon={faLightbulb}
                                        className="text-white text-sm"
                                    />
                                </div>
                                <div>
                                    <p className="text-white font-medium">
                                        High-Value Introduction Opportunity
                                    </p>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Connect Sarah Chen (TechCEO) with Marcus Rodriguez (VC
                                        Partner) - 89% compatibility match
                                    </p>
                                </div>{' '}
                            </div>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <FontAwesomeIcon
                                        icon={faExclamationTriangle}
                                        className="text-white text-sm"
                                    />
                                </div>
                                <div>
                                    <p className="text-white font-medium">
                                        Relationship Maintenance Alert
                                    </p>
                                    <p className="text-gray-300 text-sm mt-1">
                                        5 high-value connections haven't been contacted in 90+ days
                                    </p>
                                </div>{' '}
                            </div>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <FontAwesomeIcon
                                        icon={faArrowTrendUp}
                                        className="text-white text-sm"
                                    />
                                </div>
                                <div>
                                    <p className="text-white font-medium">
                                        Network Expansion Strategy
                                    </p>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Target fintech sector - 34% growth potential identified
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
