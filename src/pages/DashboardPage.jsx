import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getLinks, deleteLink, updateLink, restoreLink, forceDeleteLink } from '../api/links';
import { Card, CardHeader, CardContent, Spinner, ToastContainer } from '../components/ui';
import EditLinkModal from '../components/EditLinkModal';
import CreateLinkForm from '../components/CreateLinkForm';
import LinkTable from '../components/LinkTable';

const DashboardPage = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [toasts, setToasts] = useState([]);
  // 'active' | 'trashed' | 'all'
  const [view, setView] = useState('active');
  const [editingLink, setEditingLink] = useState(null);

  const addToast = (message, type) => {
    const newToast = { id: Date.now(), message, type };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => dismissToast(newToast.id), 5000);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const fetchLinks = useCallback(
    async (page = 1, linkView = view) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getLinks(page, linkView, pagination.per_page || 10);
        setLinks(response.data || []);
        setPagination({
          current_page: response.current_page,
          last_page: response.last_page,
          per_page: response.per_page,
          total: response.total,
        });
      } catch (err) {
        setError('Failed to fetch links.');
      } finally {
        setIsLoading(false);
      }
    },
    [view, pagination.per_page]
  );

  useEffect(() => {
    fetchLinks(1, view);
  }, [fetchLinks, view]);

  const handleLinkCreated = () => {
    if (view === 'active') {
      fetchLinks(1);
    } else {
      setView('active');
    }
  };

  const handleUpdateLink = async (id, data) => {
    const updatedLink = await updateLink(id, data);
    setLinks(prev => prev.map(l => (l.id === id ? updatedLink : l)));
  };

  // ARCHIVAR (soft delete)
  const handleArchiveLink = async (id) => {
    if (!window.confirm('¿Archivar este enlace? (podrás restaurarlo)')) return;
    try {
      await deleteLink(id);
      addToast('Link archived successfully.', 'success');
      fetchLinks(pagination.current_page);
    } catch (err) {
      addToast('Failed to archive link.', 'error');
    }
  };

  // ELIMINAR PERMANENTEMENTE (hard delete)
  const handleHardDeleteLink = async (id) => {
    if (!window.confirm('Esto eliminará el enlace PERMANENTEMENTE. ¿Continuar?')) return;
    try {
      await forceDeleteLink(id);
      addToast('Link permanently deleted.', 'success');
      // si estabas en activos y haces hard delete, refresca igual
      fetchLinks(pagination.current_page);
    } catch (err) {
      addToast('Failed to delete permanently.', 'error');
    }
  };

  const handleRestoreLink = async (id) => {
    try {
      await restoreLink(id);
      addToast('Link restored successfully.', 'success');
      fetchLinks(pagination.current_page);
    } catch (err) {
      addToast('Failed to restore link.', 'error');
    }
  };

  const paginationButtons = useMemo(() => {
    const items = [];
    for (let number = 1; number <= pagination.last_page; number++) {
      items.push(
        <li
          key={number}
          className={`page-item ${pagination.current_page === number ? 'active' : ''}`}
        >
          <button onClick={() => fetchLinks(number)} className="page-link">
            {number}
          </button>
        </li>
      );
    }
    return items;
  }, [pagination.last_page, pagination.current_page, fetchLinks]);

  return (
    <div>
      <ToastContainer toasts={toasts} dismissToast={dismissToast} />

      <EditLinkModal
        link={editingLink}
        onClose={() => setEditingLink(null)}
        onUpdate={handleUpdateLink}
        addToast={addToast}
      />

      <CreateLinkForm onLinkCreated={handleLinkCreated} addToast={addToast} />

      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5 mb-0">Mis Links</h2>
            <div className="btn-group btn-group-sm">
              <button
                className={`btn ${view === 'active' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setView('active')}
              >
                Activos
              </button>
              <button
                className={`btn ${view === 'trashed' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setView('trashed')}
              >
                Archivados
              </button>
              <button
                className={`btn ${view === 'all' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setView('all')}
              >
                Todos
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading && (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '20rem' }}>
              <Spinner style={{ width: '3rem', height: '3rem' }} />
            </div>
          )}
          {error && <div className="text-center py-5 text-danger">{error}</div>}
          {!isLoading && !error && links.length === 0 && (
            <div className="text-center py-5 text-muted">No links encontrados.</div>
          )}
          {!isLoading && !error && links.length > 0 && (
            <LinkTable
              links={links}
              view={view}
              onArchive={handleArchiveLink}
              onHardDelete={handleHardDeleteLink}
              onRestore={handleRestoreLink}
              onEdit={(link) => setEditingLink(link)}
              addToast={addToast}
            />
          )}
        </CardContent>

        {pagination.last_page > 1 && (
          <div className="card-footer d-flex align-items-center justify-content-between">
            <div>
              <p className="mb-0 text-muted" style={{ fontSize: '0.875rem' }}>
                Showing <strong>{(pagination.current_page - 1) * pagination.per_page + 1}</strong> to{' '}
                <strong>{Math.min(pagination.current_page * pagination.per_page, pagination.total)}</strong> of{' '}
                <strong>{pagination.total}</strong> results
              </p>
            </div>
            <nav aria-label="Pagination">
              <ul className="pagination mb-0">
                <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => fetchLinks(Math.max(1, pagination.current_page - 1))}
                  >
                    Previous
                  </button>
                </li>
                {paginationButtons}
                <li
                  className={`page-item ${
                    pagination.current_page === pagination.last_page ? 'disabled' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      fetchLinks(Math.min(pagination.last_page, pagination.current_page + 1))
                    }
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardPage;
