import React from "react";

const AboutModal = () => (
  <div
    className="modal fade"
    id="aboutModal"
    tabIndex="-1"
    aria-labelledby="aboutModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="aboutModalLabel">
            Acerca del proyecto
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Cerrar"
          ></button>
        </div>

        <div className="modal-body">
          <p className="mb-3">
            Esta aplicación (frontend React + API Laravel) permite{" "}
            <strong>acortar enlaces</strong>, 
            <strong>ver estadísticas de clics</strong> y{" "}
            <strong>definir reglas de expiración</strong> por fecha o por número de usos.
          </p>

          <h6 className="mt-3">Objetivo del proyecto</h6>
          <ul className="mb-3">
            <li>Practicar integración de <em>middleware</em> en Laravel.</li>
            <li>Generar rutas dinámicas para redirecciones cortas.</li>
            <li>Registrar eventos (clics) en base de datos.</li>
          </ul>

          <h6>Alcance (MVP)</h6>
          <ul className="mb-3">
            <li>Autenticación con Laravel Breeze/Fortify + Sanctum (modo tokens) para la API.</li>
            <li>CRUD de enlaces acortados.</li>
            <li>Redirección automática desde el enlace corto al destino original.</li>
            <li>Estadísticas básicas: total de clics, últimos 7 días, navegador, IP y país (opcional con geolocalización).</li>
            <li>Opciones de expiración por fecha límite o por número máximo de clics.</li>
            <li><em>Soft delete</em> para recuperación de enlaces borrados.</li>
          </ul>

          <h6>Reglas de negocio</h6>
          <ul>
            <li>Solo el dueño puede ver/editar/borrar sus enlaces.</li>
            <li>El <code>short_code</code> se genera automáticamente.</li>
            <li>Si <code>expires_at</code> ya pasó, la redirección se bloquea (se muestra mensaje).</li>
            <li>Si se alcanza <code>max_clicks</code>, se bloquea la redirección.</li>
            <li>Cada clic se registra en la tabla de clics y se incrementa <code>click_count</code>.</li>
            <li>Las URLs originales deben empezar por <code>http://</code> o <code>https://</code>.</li>
          </ul>

          {/* 🔥 Botones en la misma línea */}
          <div className="d-flex justify-content-between mt-4">
            <a
              href="https://github.com/Merimer08/URL-Shortener-Pro"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-secondary w-50 me-2"
            >
              Ver repositorio de la API (Laravel)
            </a>
            <a
              href="https://github.com/Merimer08/URL-Shortener-Frontend"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-success w-50 ms-2"
            >
              Ver repositorio del Front (React + JavaScript)
            </a>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AboutModal;
