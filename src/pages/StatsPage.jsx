import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStats } from '../api/links';
import { Card, CardHeader, CardContent, Spinner } from '../components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Helper to format chart data
const formatDailyClicks = (data) => {
    return data.map(item => ({
        name: new Date(item.d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        clicks: item.c,
    }));
};

const formatSourceStats = (data) => {
    return data.map(item => ({
        name: item.name || 'Unknown',
        value: item.c,
    }));
};

const COLORS = ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1'];

// Chart Sub-components
const DailyClicksChart = ({ data }) => {
    const chartData = formatDailyClicks(data);
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clicks" fill="#0d6efd" />
            </BarChart>
        </ResponsiveContainer>
    );
};

const TopSourcesChart = ({ data }) => {
    const chartData = formatSourceStats(data);
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => `${entry.name} (${entry.value})`}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};

// Main Stats Page Component
const StatsPage = () => {
    const { linkId } = useParams();
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchStats = useCallback(async () => {
        if (!linkId) return;
        setIsLoading(true);
        setError(null);
        try {
            const data = await getStats(linkId);
            setStats(data);
        } catch (err) {
            setError('Failed to load statistics for this link.');
        } finally {
            setIsLoading(false);
        }
    }, [linkId]);
    
    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center" style={{height: '24rem'}}><Spinner style={{width: '4rem', height: '4rem'}} /></div>;
    }

    if (error) {
        return <div className="text-center py-5 text-danger">{error}</div>;
    }

    if (!stats) {
        return <div className="text-center py-5 text-muted">No statistics available.</div>;
    }
    
    const shortUrl = `${window.location.host}/#/${stats.link.short_code}`;

    return (
        <div>
            <div className="mb-4">
                 <Link to="/" className="text-primary text-decoration-none">&larr; Back to Dashboard</Link>
                 <h1 className="fw-bold mt-2">Statistics</h1>
                 <p className="text-muted">for <a href={stats.link.original_url} target="_blank" rel="noopener noreferrer" className="fw-semibold text-primary">{shortUrl}</a></p>
            </div>
            
            <div className="row g-3 mb-4">
                <div className="col-lg-4">
                    <Card>
                        <CardContent className="text-center">
                            <p className="text-muted mb-1">Total Clicks</p>
                            <p className="display-4 fw-bold text-primary">{stats.total}</p>
                        </CardContent>
                    </Card>
                </div>
                 <div className="col-lg-4">
                    <Card>
                        <CardContent className="text-center" style={{paddingTop: '2.1rem', paddingBottom: '2.1rem'}}>
                            <p className="text-muted mb-2">Original URL</p>
                            <p className="h5 fw-bold text-dark text-truncate" title={stats.link.original_url}>{stats.link.original_url}</p>
                        </CardContent>
                    </Card>
                </div>
                 <div className="col-lg-4">
                    <Card>
                        <CardContent className="text-center" style={{paddingTop: '2.1rem', paddingBottom: '2.1rem'}}>
                            <p className="text-muted mb-2">Created On</p>
                            <p className="h5 fw-bold text-dark">{new Date(stats.link.created_at).toLocaleDateString()}</p>
                        </CardContent>
                    </Card>
                 </div>
            </div>

            <Card className="mb-4">
                <CardHeader>
                    <h3 className="h6 fw-semibold mb-0">Clicks in Last 7 Days</h3>
                </CardHeader>
                <CardContent>
                    <DailyClicksChart data={stats.last7} />
                </CardContent>
            </Card>

            <div className="row g-3">
                <div className="col-md-6">
                    <Card>
                        <CardHeader>
                           <h3 className="h6 fw-semibold mb-0">Top Browsers</h3>
                        </CardHeader>
                        <CardContent>
                            <TopSourcesChart data={stats.browsers} />
                        </CardContent>
                    </Card>
                </div>
                <div className="col-md-6">
                     <Card>
                        <CardHeader>
                           <h3 className="h6 fw-semibold mb-0">Top Countries</h3>
                        </CardHeader>
                        <CardContent>
                            <TopSourcesChart data={stats.countries} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StatsPage;