import React from "react";

// NOTA: Para que los iconos funcionen, necesitas tener instalada
// la librería react-icons o una similar (ej. Font Awesome si usas CDN/paquete).
// Asumiré que puedes usar un icono, en este ejemplo usaré un emoji simple.

const AboutModal = () => (
  <div
    className="modal fade"
    id="aboutModal"
    tabIndex="-1"
    aria-labelledby="aboutModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        
        {/*
          ==================================
          HEADER: Más atractivo y enfocado
          ==================================
        */}
        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title" id="aboutModalLabel">
            <i className="bi bi-info-circle-fill me-2"></i> {/* Icono de información */}
            Acerca de URL Shortener Pro
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white" // Clase para botón cerrar blanco en fondo oscuro
            data-bs-dismiss="modal"
            aria-label="Cerrar"
          ></button>
        </div>

        {/*
          ==================================
          BODY: Uso de Alertas y Badges
          ==================================
        */}
        <div className="modal-body">
          <div className="alert alert-info py-2" role="alert">
            <i className="bi bi-link-45deg me-2"></i>
            Esta aplicación combina **Frontend React** y **API Laravel** para ofrecer un servicio completo de gestión de enlaces.
          </div>
          
          <p className="mb-4 d-flex justify-content-around">
            <span className="badge bg-success p-2">
              <i className="bi bi-scissors me-1"></i> Acortar enlaces
            </span>
            <span className="badge bg-warning text-dark p-2">
              <i className="bi bi-graph-up me-1"></i> Ver estadísticas
            </span>
            <span className="badge bg-danger p-2">
              <i className="bi bi-stopwatch me-1"></i> Definir expiración
            </span>
          </p>

          
          {/*
            ==================================
            OBJETIVO
            ==================================
          */}
          <h5 className="mt-4 border-bottom pb-1 text-primary">Objetivo del proyecto 🎯</h5>
          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item">Practicar integración de <em>middleware</em> en Laravel.</li>
            <li className="list-group-item">Generar rutas dinámicas para redirecciones cortas.</li>
            <li className="list-group-item">Registrar eventos (clics) en base de datos.</li>
          </ul>

          
          {/*
            ==================================
            ALCANCE (MVP)
            ==================================
          */}
          <h5 className="border-bottom pb-1 text-primary">Alcance (MVP) 🛠️</h5>
          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item">Autenticación con Laravel Breeze/Fortify + Sanctum (modo tokens) para la API.</li>
            <li className="list-group-item">CRUD de enlaces acortados.</li>
            <li className="list-group-item">Redirección automática desde el enlace corto al destino original.</li>
            <li className="list-group-item">Estadísticas básicas: total de clics, últimos 7 días, navegador, IP y país (opcional con geolocalización).</li>
            <li className="list-group-item">Opciones de expiración por fecha límite o por número máximo de clics.</li>
            <li className="list-group-item"><em>Soft delete</em> para recuperación de enlaces borrados.</li>
          </ul>
          
          
          {/*
            ==================================
            REGLAS DE NEGOCIO
            ==================================
          */}
          <h5 className="border-bottom pb-1 text-primary">Reglas de negocio ⚙️</h5>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">Solo el dueño puede ver/editar/borrar sus enlaces.</li>
            <li className="list-group-item">El <code>short_code</code> se genera automáticamente.</li>
            <li className="list-group-item">Si <code>expires_at</code> ya pasó o se alcanza <code>max_clicks</code>, la redirección se bloquea (se muestra mensaje).</li>
            <li className="list-group-item">Cada clic se registra en la tabla de clics y se incrementa <code>click_count</code>.</li>
            <li className="list-group-item">Las URLs originales deben empezar por <code>http://</code> o <code>https://</code>.</li>
          </ul>

          
          {/*
            ==================================
            BOTONES DE REPOSITORIO
            ==================================
          */}
          <div className="d-flex flex-column flex-md-row justify-content-between mt-4 p-3 bg-light rounded shadow-sm">
            <a
              href="https://github.com/Merimer08/URL-Shortener-Pro"
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark w-100 mb-2 mb-md-0 me-md-2"
            >
              <i className="bi bi-github me-2"></i>
              Ver API (Laravel)
            </a>
            <a
              href="https://github.com/Merimer08/URL-Shortener-Frontend"
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark w-100 ms-md-2"
            >
              <i className="bi bi-github me-2"></i>
              Ver Front (React + JS)
            </a>
          </div>
        </div>
        
        {/*
          ==================================
          FOOTER
          ==================================
        */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Aceptar y cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AboutModal;