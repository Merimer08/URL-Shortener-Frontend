import React, { useState } from 'react';
import { createLink } from '../api/links';
import { Card, CardHeader, CardContent, Button, Input, Spinner, PlusIcon } from './ui';

const CreateLinkForm = ({ onLinkCreated, addToast }) => {
  const [targetUrl, setTargetUrl] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [maxClicks, setMaxClicks] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const normalizeUrl = (url) => {
    const trimmed = url.trim();
    if (!trimmed) return '';
    // si no empieza por http/https, prefijamos https://
    if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
    return trimmed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!targetUrl) {
      addToast?.('Original URL is required.', 'error');
      return;
    }

    const payload = {
      // 👈 NOMBRE QUE ESPERA EL BACKEND
      target_url: normalizeUrl(targetUrl),
      // opcionales
      expires_at: expiresAt || null,
      max_clicks: maxClicks ? parseInt(maxClicks, 10) : null,
      notes: notes || null,
    };

    setIsLoading(true);
    try {
      await createLink(payload); // POST /api/v1/links (JSON)
      onLinkCreated?.();
      addToast?.('Link created successfully!', 'success');
      setTargetUrl('');
      setExpiresAt('');
      setMaxClicks('');
      setNotes('');
    } catch (error) {
      // muestra mensaje claro (p.ej. 422 con detalle del validador)
      const msg = error instanceof Error ? error.message : 'Unknown error';
      addToast?.(`Error: ${msg}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <h2 className="h5 mb-0">Crea un nuevo short link</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="target_url" className="form-label">Original URL</label>
              <Input
                id="target_url"
                type="url"
                placeholder="https://example.com/very/long/url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="expires_at" className="form-label">Finalización (Opcional)</label>
              <Input
                id="expires_at"
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="max_clicks" className="form-label">Max Clicks (Opcional)</label>
              <Input
                id="max_clicks"
                type="number"
                min="1"
                placeholder="e.g., 100"
                value={maxClicks}
                onChange={(e) => setMaxClicks(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label htmlFor="notes" className="form-label">Notas (Opcinal)</label>
              <Input
                id="notes"
                type="text"
                placeholder="A short description"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? <Spinner style={{ width: '1rem', height: '1rem' }} />
                : <PlusIcon className="me-2" style={{ width: '1.25rem', height: '1.25rem' }} />}
              Shorten URL
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateLinkForm;
