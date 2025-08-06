import { faChartLine, faHandshake, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChartsAndInsightsView from './ChartsAndInsightsView';

interface ViewProps {
    data: any;
}

export default function NetworkLayoutView({ data }: ViewProps) {
    return (
        <>
            <div id="dashboard" className="section">
                <div className="mb-8">
                    <h1 className="text-3xl font-luxury font-bold text-gold-400 mb-2">
                        Network Portfolio
                    </h1>
                    <p className="text-gray-300">
                        Transform your connections into measurable, inheritable assets
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-xl p-6 card-hover border border-gold-400/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-gold-400">
                                {' '}
                                <FontAwesomeIcon icon={faChartLine} className="text-2xl" />{' '}
                            </div>
                            <div className="text-green-400 text-sm"> +0%</div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">$0M</div>
                        <div className="text-gray-400 text- sm">Network Value</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 card-hover border border-gold-400/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-gold-400">
                                <FontAwesomeIcon icon={faUser} className="text-2xl" />{' '}
                            </div>
                            <div className="text-green-400 text-sm"> +0%</div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{data?.totalCount}</div>
                        <div className="text-gray-400 text-sm">Active Connections</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 card-hover border border-gold-400/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-gold-400">
                                {' '}
                                <FontAwesomeIcon icon={faStar} className=" text-2xl" />{' '}
                            </div>
                            <div className="text-yellow-400 text-sm">→ Stable</div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">0</div>
                        <div className="text-gray-400 text-sm">Influence Score</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 card-hover border border-gold-400/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-gold-400">
                                {' '}
                                <FontAwesomeIcon icon={faHandshake} className=" text-2xl" />{' '}
                            </div>
                            <div className="text-green-400 text-sm"> +0%</div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{data?.weekCount}</div>
                        <div className="text-gray-400 text-sm">
                            New Introductions <span className="text-xs text-gray-300">(week)</span>
                        </div>
                    </div>
                </div>

                <ChartsAndInsightsView chartData={data?.lineChartData} />
            </div>
        </>
    );
}
