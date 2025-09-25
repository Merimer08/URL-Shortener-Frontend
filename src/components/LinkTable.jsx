import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TrashIcon,
  ChartBarIcon,
  ClipboardIcon,
  CheckIcon,
  PencilIcon,
  RestoreIcon,
  ArchiveIcon, // 👈 asegúrate de exportarlo en ./ui
} from './ui';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};

const getStatus = (link) => {
  if (link.deleted_at) return { text: 'Archived', color: 'bg-secondary' };
  if (link.expires_at && new Date(link.expires_at) < new Date()) return { text: 'Expired', color: 'bg-danger' };
  if (link.max_clicks && (link.click_count ?? 0) >= link.max_clicks) return { text: 'Limit Reached', color: 'bg-warning' };
  return { text: 'Active', color: 'bg-success' };
};

const LinkTable = ({ links, view, onArchive, onHardDelete, onRestore, onEdit, addToast }) => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    const url = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(url);
    setCopiedCode(code);
    addToast('Short URL copied!', 'success');
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
            const shortUrl = `${window.location.origin}/${link.code}`;

            return (
              <tr key={link.id}>
                <td>
                  <div
                    className="fw-semibold text-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleCopy(link.code)}
                    title="Click to copy"
                  >
                    {shortUrl}
                  </div>
                </td>

                <td>
                  <div
                    className="text-truncate"
                    style={{ maxWidth: '300px' }}
                    title={link.target_url}
                  >
                    {link.target_url}
                  </div>
                </td>

                <td>{link.click_count ?? 0}</td>

                <td>
                  <span className={`badge ${status.color}`}>{status.text}</span>
                </td>

                <td>{formatDate(link.expires_at)}</td>

                <td>
                  <div className="d-flex align-items-center justify-content-end gap-1">
                    {view === 'active' ? (
                      <>
                        {/* Copiar */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(link.code)}
                          title="Copy Short URL"
                        >
                          {copiedCode === link.code ? (
                            <CheckIcon style={{ width: '1.25rem', height: '1.25rem' }} className="text-success" />
                          ) : (
                            <ClipboardIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                          )}
                        </Button>

                        {/* Stats */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/stats/${link.id}`)}
                          title="View Stats"
                        >
                          <ChartBarIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                        </Button>

                        {/* Editar */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(link)}
                          title="Edit Link"
                        >
                          <PencilIcon style={{ width: '1.25rem', height: '1.25rem' }} className="text-primary" />
                        </Button>

                        {/* Archivar (soft delete) */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onArchive(link.id)}
                          title="Archive Link"
                        >
                          <ArchiveIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                        </Button>

                        {/* Eliminar permanentemente (hard delete) */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onHardDelete(link.id)}
                          title="Permanently Delete Link"
                        >
                          <TrashIcon style={{ width: '1.25rem', height: '1.25rem' }} className="text-danger" />
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* Restaurar */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRestore(link.id)}
                          title="Restore Link"
                        >
                          <RestoreIcon style={{ width: '1.25rem', height: '1.25rem' }} className="text-success" />
                          <span className="ms-1 d-none d-lg-inline">Restore</span>
                        </Button>

                        {/* Eliminar permanentemente */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onHardDelete(link.id)}
                          title="Permanently Delete Link"
                        >
                          <TrashIcon style={{ width: '1.25rem', height: '1.25rem' }} className="text-danger" />
                          <span className="ms-1 d-none d-lg-inline">Delete</span>
                        </Button>
                      </>
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
