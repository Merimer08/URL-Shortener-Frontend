import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TrashIcon, ChartBarIcon, ClipboardIcon, CheckIcon, PencilIcon, RestoreIcon } from './ui';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
    });
};

const getStatus = (link) => {
    if (link.deleted_at) return { text: 'Archived', color: 'text-muted' };
    if (link.expires_at && new Date(link.expires_at) < new Date()) return { text: 'Expired', color: 'text-danger' };
    if (link.max_clicks && link.clicks_count >= link.max_clicks) return { text: 'Limit Reached', color: 'text-warning' };
    return { text: 'Active', color: 'text-success' };
};

const LinkTable = ({ links, view, onDelete, onRestore, onEdit, addToast }) => {
    const navigate = useNavigate();
    const [copiedCode, setCopiedCode] = useState(null);

    const handleCopy = (shortCode) => {
        const url = `${window.location.origin}${window.location.pathname}#/${shortCode}`;
        navigator.clipboard.writeText(url);
        setCopiedCode(shortCode);
        addToast("Short URL copied!", "success");
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Short URL</th>
                        <th scope="col">Original URL</th>
                        <th scope="col">Clicks</th>
                        <th scope="col">Status</th>
                        <th scope="col">Expires</th>
                        <th scope="col" className="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {links.map((link) => {
                        const status = getStatus(link);
                        const shortUrl = `${window.location.host}/#/${link.short_code}`;
                        return (
                            <tr key={link.id}>
                                <td>
                                    <div className="fw-semibold text-primary" style={{cursor: 'pointer'}} onClick={() => handleCopy(link.short_code)}>
                                        {shortUrl}
                                    </div>
                                </td>
                                <td>
                                    <div className="text-truncate" style={{maxWidth: '300px'}} title={link.original_url}>{link.original_url}</div>
                                </td>
                                <td>{link.clicks_count}</td>
                                <td>
                                    <span className={`fw-semibold ${status.color}`}>{status.text}</span>
                                </td>
                                <td>{formatDate(link.expires_at)}</td>
                                <td>
                                    <div className="d-flex align-items-center justify-content-end gap-1">
                                       {view === 'active' ? (
                                            <>
                                                <Button variant="ghost" size="sm" onClick={() => handleCopy(link.short_code)} title="Copy Short URL">
                                                    {copiedCode === link.short_code ? <CheckIcon style={{width: '1.25rem', height: '1.25rem'}} className="text-success" /> : <ClipboardIcon style={{width: '1.25rem', height: '1.25rem'}} />}
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => navigate(`/stats/${link.id}`)} title="View Stats">
                                                    <ChartBarIcon style={{width: '1.25rem', height: '1.25rem'}} />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => onEdit(link)} title="Edit Link">
                                                    <PencilIcon style={{width: '1.25rem', height: '1.25rem'}} className="text-primary" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => onDelete(link.id)} title="Archive Link">
                                                    <TrashIcon style={{width: '1.25rem', height: '1.25rem'}} className="text-danger" />
                                                </Button>
                                            </>
                                        ) : (
                                            <Button variant="ghost" size="sm" onClick={() => onRestore(link.id)} title="Restore Link">
                                                <RestoreIcon style={{width: '1.25rem', height: '1.25rem'}} className="text-success" />
                                                <span className="ms-1">Restore</span>
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default LinkTable;