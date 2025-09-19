import React, { useState } from 'react';
import { createLink } from '../api/links';
import { Card, CardHeader, CardContent, Button, Input, Spinner, PlusIcon } from './ui';

const CreateLinkForm = ({ onLinkCreated, addToast }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [expiresAt, setExpiresAt] = useState('');
    const [maxClicks, setMaxClicks] = useState('');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!originalUrl) {
            addToast('Original URL is required.', 'error');
            return;
        }
        setIsLoading(true);
        try {
            await createLink({
                original_url: originalUrl,
                expires_at: expiresAt || null,
                max_clicks: maxClicks ? parseInt(maxClicks, 10) : null,
                notes: notes || null,
            });
            onLinkCreated();
            addToast('Link created successfully!', 'success');
            setOriginalUrl('');
            setExpiresAt('');
            setMaxClicks('');
            setNotes('');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            addToast(`Error: ${errorMessage}`, 'error');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Card className="mb-4">
            <CardHeader>
                <h2 className="h5 mb-0">Create a new short link</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-12">
                            <label htmlFor="original_url" className="form-label">Original URL</label>
                            <Input id="original_url" type="url" placeholder="https://example.com/very/long/url" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="expires_at" className="form-label">Expires At (Optional)</label>
                            <Input id="expires_at" type="datetime-local" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="max_clicks" className="form-label">Max Clicks (Optional)</label>
                            <Input id="max_clicks" type="number" min="1" placeholder="e.g., 100" value={maxClicks} onChange={(e) => setMaxClicks(e.target.value)} />
                        </div>
                         <div className="col-12">
                            <label htmlFor="notes" className="form-label">Notes (Optional)</label>
                            <Input id="notes" type="text" placeholder="A short description" value={notes} onChange={(e) => setNotes(e.target.value)} />
                        </div>
                    </div>
                    <div className="mt-4 d-flex justify-content-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Spinner style={{width: '1rem', height: '1rem'}} /> : <PlusIcon className="me-2" style={{width: '1.25rem', height: '1.25rem'}} />}
                            Shorten URL
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateLinkForm;