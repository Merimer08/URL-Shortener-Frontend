import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Spinner } from './ui';

const EditLinkModal = ({ link, onClose, onUpdate, addToast }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [maxClicks, setMaxClicks] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  useEffect(() => {
    if (link) {
      setOriginalUrl(link.original_url);
      setExpiresAt(link.expires_at ? new Date(link.expires_at).toISOString().slice(0, 16) : '');
      setMaxClicks(link.max_clicks?.toString() ?? '');
      setNotes(link.notes ?? '');
    }
  }, [link]);
  
  useEffect(() => {
      const modalElement = modalRef.current;
      if (modalElement) {
          // @ts-ignore
          bsModalRef.current = new window.bootstrap.Modal(modalElement, {
              keyboard: false,
              backdrop: 'static'
          });

          modalElement.addEventListener('hidden.bs.modal', onClose);
      }

      return () => {
          if (modalElement) {
              modalElement.removeEventListener('hidden.bs.modal', onClose);
          }
          if (bsModalRef.current) {
              bsModalRef.current.dispose();
          }
      }
  }, [onClose]);

  useEffect(() => {
      if (link && bsModalRef.current) {
          bsModalRef.current.show();
      } else if (!link && bsModalRef.current) {
          bsModalRef.current.hide();
      }
  }, [link]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!link) return;
    setIsLoading(true);
    try {
      await onUpdate(link.id, {
        original_url: originalUrl,
        expires_at: expiresAt || null,
        max_clicks: maxClicks ? parseInt(maxClicks, 10) : null,
        notes: notes || null,
      });
      addToast('Link updated successfully!', 'success');
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      addToast(`Error: ${errorMessage}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!link) return null;

  return (
    <div className="modal fade" ref={modalRef} tabIndex={-1} aria-labelledby="editModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">Edit Link</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="edit_original_url" className="form-label">Original URL</label>
                <Input id="edit_original_url" type="url" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} required />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="edit_expires_at" className="form-label">Expires At (Optional)</label>
                  <Input id="edit_expires_at" type="datetime-local" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="edit_max_clicks" className="form-label">Max Clicks (Optional)</label>
                  <Input id="edit_max_clicks" type="number" min="1" value={maxClicks} onChange={(e) => setMaxClicks(e.target.value)} />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="edit_notes" className="form-label">Notes (Optional)</label>
                <Input id="edit_notes" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Spinner className="me-2" style={{width: '1rem', height: '1rem'}} />}
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditLinkModal;