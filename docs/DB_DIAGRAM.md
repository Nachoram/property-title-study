# Diagrama de Base de Datos - Property Title Study

Pega el siguiente bloque HTML en un bloque `/html` de Notion para visualizar el diagrama completo.

---

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DB Diagram - Property Title Study</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Inter',sans-serif; background:#0f1117; color:#e1e4e8; padding:40px 20px; }
  h1 { text-align:center; font-size:28px; background:linear-gradient(135deg,#7c3aed,#2563eb); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:8px; }
  .subtitle { text-align:center; color:#8b949e; font-size:13px; margin-bottom:32px; }
  .legend { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:28px; }
  .legend-item { display:flex; align-items:center; gap:6px; font-size:12px; color:#8b949e; }
  .legend-dot { width:12px; height:12px; border-radius:3px; }
  .section { margin-bottom:36px; }
  .section-title { font-size:18px; font-weight:700; padding:10px 16px; border-radius:8px 8px 0 0; display:flex; align-items:center; gap:8px; }
  .section-title span { font-size:20px; }
  .s-gestion .section-title { background:linear-gradient(135deg,#1e3a5f,#1a1a2e); border-left:4px solid #3b82f6; }
  .s-ocr .section-title { background:linear-gradient(135deg,#1a3a2e,#1a1a2e); border-left:4px solid #10b981; }
  .s-analisis .section-title { background:linear-gradient(135deg,#3a1a3e,#1a1a2e); border-left:4px solid #a855f7; }
  .s-calendario .section-title { background:linear-gradient(135deg,#3a2a1a,#1a1a2e); border-left:4px solid #f59e0b; }
  .s-sistema .section-title { background:linear-gradient(135deg,#3a1a1a,#1a1a2e); border-left:4px solid #ef4444; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:16px; padding:16px; background:#161b22; border-radius:0 0 8px 8px; border:1px solid #21262d; border-top:none; }
  .table-card { background:#1c2128; border:1px solid #30363d; border-radius:8px; overflow:hidden; transition:border-color .2s; }
  .table-card:hover { border-color:#58a6ff; }
  .table-header { padding:10px 14px; font-weight:600; font-size:14px; display:flex; justify-content:space-between; align-items:center; }
  .table-header .rows { font-size:11px; font-weight:400; color:#8b949e; background:#21262d; padding:2px 8px; border-radius:10px; }
  .t-primary .table-header { background:linear-gradient(135deg,#1e3a5f,#0d1117); color:#58a6ff; }
  .t-ocr .table-header { background:linear-gradient(135deg,#064e3b,#0d1117); color:#34d399; }
  .t-analisis .table-header { background:linear-gradient(135deg,#4a1d6b,#0d1117); color:#c084fc; }
  .t-calendar .table-header { background:linear-gradient(135deg,#78350f,#0d1117); color:#fbbf24; }
  .t-system .table-header { background:linear-gradient(135deg,#7f1d1d,#0d1117); color:#f87171; }
  .cols { padding:0; }
  .col { display:grid; grid-template-columns:1fr auto auto; gap:6px; padding:6px 14px; font-size:12px; border-bottom:1px solid #21262d; align-items:center; }
  .col:last-child { border-bottom:none; }
  .col-name { font-weight:500; color:#c9d1d9; }
  .col-name.pk { color:#f0c000; }
  .col-name.pk::before { content:'🔑 '; font-size:10px; }
  .col-name.fk { color:#58a6ff; }
  .col-name.fk::before { content:'🔗 '; font-size:10px; }
  .col-type { color:#8b949e; font-size:11px; font-family:monospace; text-align:right; }
  .badge { font-size:9px; padding:1px 5px; border-radius:4px; font-weight:600; }
  .badge-pk { background:#f0c00020; color:#f0c000; }
  .badge-fk { background:#58a6ff20; color:#58a6ff; }
  .badge-extra { background:#a855f720; color:#c084fc; }
  .ocr-note { background:#064e3b40; border:1px solid #10b98140; border-radius:8px; padding:14px 18px; margin:16px; font-size:12px; color:#a7f3d0; line-height:1.6; }
  .ocr-note strong { color:#34d399; }
  .ocr-list { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:8px; padding:0 16px 16px; }
  .ocr-item { background:#1c2128; border:1px solid #30363d; border-radius:6px; padding:8px 12px; font-size:12px; display:flex; justify-content:space-between; align-items:center; }
  .ocr-item:hover { border-color:#34d399; }
  .ocr-item .name { color:#34d399; font-weight:500; }
  .ocr-item .extra { color:#8b949e; font-size:11px; }
  .relations { margin-top:36px; background:#161b22; border:1px solid #21262d; border-radius:8px; padding:20px; }
  .relations h3 { font-size:16px; margin-bottom:14px; color:#58a6ff; }
  .rel-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(400px,1fr)); gap:8px; }
  .rel { font-size:12px; padding:6px 12px; background:#1c2128; border-radius:6px; border:1px solid #30363d; display:flex; align-items:center; gap:8px; }
  .rel .arrow { color:#f59e0b; font-weight:700; }
  .rel .src { color:#58a6ff; }
  .rel .tgt { color:#34d399; }
</style>
</head>
<body>

<h1>🏛️ Property Title Study — Database Schema</h1>
<p class="subtitle">Supabase Project: fxqzivgtwpuhmhwprzba &nbsp;|&nbsp; Schema: public &nbsp;|&nbsp; 60+ tablas</p>

<div class="legend">
  <div class="legend-item"><div class="legend-dot" style="background:#3b82f6"></div> Gestión y Negocio</div>
  <div class="legend-item"><div class="legend-dot" style="background:#10b981"></div> Tablas OCR</div>
  <div class="legend-item"><div class="legend-dot" style="background:#a855f7"></div> Análisis</div>
  <div class="legend-item"><div class="legend-dot" style="background:#f59e0b"></div> Calendario</div>
  <div class="legend-item"><div class="legend-dot" style="background:#ef4444"></div> Sistema</div>
  <div class="legend-item">🔑 Primary Key</div>
  <div class="legend-item">🔗 Foreign Key</div>
</div>

<!-- ========== GESTIÓN Y NEGOCIO ========== -->
<div class="section s-gestion">
  <div class="section-title"><span>📋</span> 1. Gestión y Negocio</div>
  <div class="grid">

    <div class="table-card t-primary">
      <div class="table-header">estudios_titulos <span class="rows">86 rows</span></div>
      <div class="cols">
        <div class="col"><span class="col-name pk">id</span><span class="col-type">UUID</span><span class="badge badge-pk">PK</span></div>
        <div class="col"><span class="col-name">numero_operacion</span><span class="col-type">TEXT</span><span class="badge badge-extra">UQ</span></div>
        <div class="col"><span class="col-name">tipo_propiedad</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">finalidad_estudio</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">tiene_servidumbre</span><span class="col-type">BOOL</span><span></span></div>
        <div class="col"><span class="col-name">tiene_reglamento</span><span class="col-type">BOOL</span><span></span></div>
        <div class="col"><span class="col-name">cantidad_transacciones</span><span class="col-type">INT</span><span></span></div>
        <div class="col"><span class="col-name">detalle_transacciones</span><span class="col-type">JSONB</span><span></span></div>
        <div class="col"><span class="col-name">estado</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">nombre_propiedad</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">titulo_vigente</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name fk">user_id</span><span class="col-type">UUID</span><span class="badge badge-fk">FK→auth.users</span></div>
        <div class="col"><span class="col-name">created_at</span><span class="col-type">TIMESTAMPTZ</span><span></span></div>
        <div class="col"><span class="col-name">updated_at</span><span class="col-type">TIMESTAMPTZ</span><span></span></div>
      </div>
    </div>

    <div class="table-card t-primary">
      <div class="table-header">solicitud_documentos <span class="rows">977 rows</span></div>
      <div class="cols">
        <div class="col"><span class="col-name pk">id</span><span class="col-type">TEXT</span><span class="badge badge-pk">PK</span></div>
        <div class="col"><span class="col-name fk">user_id</span><span class="col-type">UUID</span><span class="badge badge-fk">FK→auth.users</span></div>
        <div class="col"><span class="col-name">estudio_id</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">nombre_documento</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">nombre_persona</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">rut_persona</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">estado</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">documento_url</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">operacion_id</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">tipo_documento</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">fase</span><span class="col-type">INT</span><span></span></div>
        <div class="col"><span class="col-name">propiedad_fojas</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">propiedad_numero</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">propiedad_anio</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">propiedad_comuna</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">doc_tipo / doc_entidad / doc_fecha</span><span class="col-type">TEXT/DATE</span><span></span></div>
        <div class="col"><span class="col-name">repetido / subido / enviado</span><span class="col-type">BOOL</span><span></span></div>
      </div>
    </div>

    <div class="table-card t-primary">
      <div class="table-header">profiles <span class="rows">3 rows</span></div>
      <div class="cols">
        <div class="col"><span class="col-name pk">id</span><span class="col-type">UUID</span><span class="badge badge-pk">PK</span></div>
        <div class="col"><span class="col-name fk">user_id</span><span class="col-type">UUID</span><span class="badge badge-fk">FK→auth.users</span></div>
        <div class="col"><span class="col-name">nombre</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">apellido</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">telefono</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">created_at / updated_at</span><span class="col-type">TIMESTAMPTZ</span><span></span></div>
      </div>
    </div>

    <div class="table-card t-primary">
      <div class="table-header">estudio_documentos_aislados <span class="rows">4 rows</span></div>
      <div class="cols">
        <div class="col"><span class="col-name pk">id</span><span class="col-type">UUID</span><span class="badge badge-pk">PK</span></div>
        <div class="col"><span class="col-name fk">estudio_id</span><span class="col-type">UUID</span><span class="badge badge-fk">FK→estudios_titulos</span></div>
        <div class="col"><span class="col-name fk">user_id</span><span class="col-type">UUID</span><span class="badge badge-fk">FK→auth.users</span></div>
        <div class="col"><span class="col-name">tipo_documento</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">estado_revision</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">texto_hallazgo</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">analisis_detalle</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">institucion</span><span class="col-type">TEXT</span><span></span></div>
      </div>
    </div>

    <div class="table-card t-primary">
      <div class="table-header">admin_google_tokens <span class="rows">1 row</span></div>
      <div class="cols">
        <div class="col"><span class="col-name pk">id</span><span class="col-type">UUID</span><span class="badge badge-pk">PK</span></div>
        <div class="col"><span class="col-name fk">user_id</span><span class="col-type">UUID</span><span class="badge badge-fk">FK→auth.users</span></div>
        <div class="col"><span class="col-name">provider_refresh_token</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">provider_access_token</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">token_updated_at</span><span class="col-type">TIMESTAMPTZ</span><span></span></div>
      </div>
    </div>

  </div>
</div>

<!-- ========== TABLAS OCR ========== -->
<div class="section s-ocr">
  <div class="section-title"><span>🤖</span> 2. Tablas OCR (Extracción IA)</div>

  <div class="ocr-note">
    <strong>Esquema Estandarizado:</strong> Todas las tablas OCR comparten las mismas columnas base:<br>
    <code>id</code> (UUID PK) · <code>user_id</code> (FK→auth.users) · <code>estudio_id</code> (FK→estudios_titulos) · <code>documento_url</code> (TEXT) · <code>numero_operacion</code> (TEXT) · <code>nombre_documento_ocr</code> (TEXT) · <code>texto_estructurado</code> (JSONB) · <code>analisis_integridad</code> (JSONB) · <code>extraccion_datos</code> (JSONB)
  </div>

  <div class="grid">
    <div class="table-card t-ocr">
      <div class="table-header">ocr_dominio_vigente <span class="rows">134 rows</span></div>
      <div class="cols">
        <div class="col"><span class="col-name">Columnas estándar OCR +</span><span class="col-type"></span><span></span></div>
        <div class="col"><span class="col-name" style="color:#c084fc">naturaleza_acto</span><span class="col-type">TEXT</span><span class="badge badge-extra">EXTRA</span></div>
      </div>
    </div>
    <div class="table-card t-ocr">
      <div class="table-header">ocr_escritura_cv <span class="rows">14 rows</span></div>
      <div class="cols">
        <div class="col"><span class="col-name">Columnas estándar OCR +</span><span class="col-type"></span><span></span></div>
        <div class="col"><span class="col-name" style="color:#c084fc">se_constituye_gravamen</span><span class="col-type">BOOL</span><span class="badge badge-extra">EXTRA</span></div>
      </div>
    </div>
    <div class="table-card t-ocr">
      <div class="table-header">ocr_gp <span class="rows">64 rows</span></div>
      <div class="cols">
        <div class="col"><span class="col-name">Columnas estándar OCR +</span><span class="col-type"></span><span></span></div>
        <div class="col"><span class="col-name" style="color:#c084fc">tiene_hipotecas</span><span class="col-type">BOOL</span><span class="badge badge-extra">EXTRA</span></div>
        <div class="col"><span class="col-name" style="color:#c084fc">tiene_servidumbres</span><span class="col-type">BOOL</span><span class="badge badge-extra">EXTRA</span></div>
        <div class="col"><span class="col-name" style="color:#c084fc">tiene_usufructos_uso_habitacion</span><span class="col-type">BOOL</span><span class="badge badge-extra">EXTRA</span></div>
        <div class="col"><span class="col-name" style="color:#c084fc">tiene_reglamento_copropiedad</span><span class="col-type">BOOL</span><span class="badge badge-extra">EXTRA</span></div>
        <div class="col"><span class="col-name" style="color:#c084fc">tiene_censos / embargos / ...</span><span class="col-type">BOOL</span><span class="badge badge-extra">+6 más</span></div>
      </div>
    </div>
  </div>

  <p style="padding:12px 16px;font-size:13px;color:#8b949e;font-weight:600;">📦 Tablas OCR con esquema estándar (sin columnas extra):</p>
  <div class="ocr-list">
    <div class="ocr-item"><span class="name">ocr_avaluo_fiscal</span><span class="extra">65 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_no_expropiacion_serviu</span><span class="extra">90 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_deuda_contribuciones</span><span class="extra">67 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_certificado_numero</span><span class="extra">52 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_recepcion_final</span><span class="extra">37 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_expropiacion_municipal</span><span class="extra">31 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_cedula_identidad</span><span class="extra">32 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_matrimonio</span><span class="extra">24 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_posesion_efectiva</span><span class="extra">18 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_inscripcion_posesion_efectiva</span><span class="extra">18 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_gasto_comun</span><span class="extra">14 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_escritura_constitucion_aporte</span><span class="extra">13 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_cip</span><span class="extra">10 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_informe_no_matrimonio</span><span class="extra">5 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_vigencia_poderes</span><span class="extra">5 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_inscripcion_comercio</span><span class="extra">5 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_estatutos_sociales</span><span class="extra">4 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_nacimiento</span><span class="extra">3 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_poderes</span><span class="extra">3 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_cesion_derechos_hereditario</span><span class="extra">2 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_directorio</span><span class="extra">2 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_rural_sag</span><span class="extra">2 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_escritura_reciliacion</span><span class="extra">2 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_donacion</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_reglamento_copropiedad</span><span class="extra">1 row</span></div>
    <div class="ocr-item"><span class="name">ocr_escritura_saneamiento</span><span class="extra">1 row</span></div>
    <div class="ocr-item"><span class="name">ocr_escritura_arrendamiento</span><span class="extra">1 row</span></div>
    <div class="ocr-item"><span class="name">ocr_inscripcion_especial_herencia</span><span class="extra">1 row</span></div>
    <div class="ocr-item"><span class="name">ocr_asignacion_roles</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_constitucion_sociedad</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_impuesto_herencia</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_plano_copropiedad</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_inscripcion_servidumbre</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_inscripcion_embargo</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_inscripcion_arrendamiento</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_inscripcion_reglamento_copropiedad</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_inscripcion_usufructo</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_inscripcion_hipoteca</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_escritura_aporte_capital</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_escritura_permuta</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_escritura_adjudicacion_particion_herencia</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_escritura_hipoteca</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_escritura_usufructo</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_escritura_servidumbre</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_sentencia_adjudicacion_remate</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_sentencia_donacion</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_sentencia_interdiccion</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_resolucion_embargo</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_certificado_defuncion</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_certificado_informaciones_previas</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_certificado_inscripcion_interdiccion</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_certificado_asignacion_roles_sii</span><span class="extra">0 rows</span></div>
    <div class="ocr-item"><span class="name">ocr_plano_subdivision_sag_cbr</span><span class="extra">0 rows</span></div>
  </div>
</div>

<!-- ========== ANÁLISIS ========== -->
<div class="section s-analisis">
  <div class="section-title"><span>🔍</span> 3. Análisis y Resultados</div>
  <div class="grid">
    <div class="table-card t-analisis">
      <div class="table-header">cadena_dominios <span class="rows">1 row</span></div>
      <div class="cols">
        <div class="col"><span class="col-name pk">id</span><span class="col-type">UUID</span><span class="badge badge-pk">PK</span></div>
        <div class="col"><span class="col-name fk">user_id</span><span class="col-type">UUID</span><span class="badge badge-fk">FK→auth.users</span></div>
        <div class="col"><span class="col-name fk">estudio_id</span><span class="col-type">UUID</span><span class="badge badge-fk">FK→estudios_titulos</span></div>
        <div class="col"><span class="col-name">numero_operacion</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">indice_cadena</span><span class="col-type">INT</span><span></span></div>
        <div class="col"><span class="col-name">causante_identificado</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">timestamp_estudio</span><span class="col-type">TIMESTAMPTZ</span><span></span></div>
        <div class="col"><span class="col-name">resumen_cadena</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">datos_correctos</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">reparo_no_correcto</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">reparo_no_exibicion</span><span class="col-type">JSONB</span><span></span></div>
        <div class="col"><span class="col-name">reparo_vigencia / defuncion</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">alerta_adulteracion</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">auditoria_detalle</span><span class="col-type">JSONB</span><span></span></div>
        <div class="col"><span class="col-name">hallazgos</span><span class="col-type">JSONB</span><span></span></div>
        <div class="col"><span class="col-name">conclusion_feliu</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">documentos_faltantes</span><span class="col-type">JSONB</span><span></span></div>
      </div>
    </div>
  </div>
</div>

<!-- ========== CALENDARIO ========== -->
<div class="section s-calendario">
  <div class="section-title"><span>📅</span> 4. Calendario y Reuniones</div>
  <div class="grid">
    <div class="table-card t-calendar">
      <div class="table-header">calendars <span class="rows">0 rows</span></div>
      <div class="cols">
        <div class="col"><span class="col-name pk">id</span><span class="col-type">UUID</span><span class="badge badge-pk">PK</span></div>
        <div class="col"><span class="col-name fk">user_id</span><span class="col-type">UUID</span><span class="badge badge-fk">FK→auth.users</span></div>
        <div class="col"><span class="col-name">name</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">color</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">is_primary</span><span class="col-type">BOOL</span><span></span></div>
      </div>
    </div>
    <div class="table-card t-calendar">
      <div class="table-header">calendar_events <span class="rows">0 rows</span></div>
      <div class="cols">
        <div class="col"><span class="col-name pk">id</span><span class="col-type">UUID</span><span class="badge badge-pk">PK</span></div>
        <div class="col"><span class="col-name fk">calendar_id</span><span class="col-type">UUID</span><span class="badge badge-fk">FK→calendars</span></div>
        <div class="col"><span class="col-name">title / description</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">start_time / end_time</span><span class="col-type">TIMESTAMPTZ</span><span></span></div>
        <div class="col"><span class="col-name">location / meeting_link</span><span class="col-type">TEXT</span><span></span></div>
      </div>
    </div>
    <div class="table-card t-calendar">
      <div class="table-header">meeting_agendas <span class="rows">0 rows</span></div>
      <div class="cols">
        <div class="col"><span class="col-name pk">id</span><span class="col-type">UUID</span><span class="badge badge-pk">PK</span></div>
        <div class="col"><span class="col-name fk">event_id</span><span class="col-type">UUID</span><span class="badge badge-fk">FK→calendar_events</span></div>
        <div class="col"><span class="col-name">title / description</span><span class="col-type">TEXT</span><span></span></div>
      </div>
    </div>
    <div class="table-card t-calendar">
      <div class="table-header">agenda_items <span class="rows">0 rows</span></div>
      <div class="cols">
        <div class="col"><span class="col-name pk">id</span><span class="col-type">UUID</span><span class="badge badge-pk">PK</span></div>
        <div class="col"><span class="col-name fk">agenda_id</span><span class="col-type">UUID</span><span class="badge badge-fk">FK→meeting_agendas</span></div>
        <div class="col"><span class="col-name">title / presenter</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">duration_minutes / order_index</span><span class="col-type">INT</span><span></span></div>
      </div>
    </div>
  </div>
</div>

<!-- ========== SISTEMA ========== -->
<div class="section s-sistema">
  <div class="section-title"><span>⚙️</span> 5. Sistema</div>
  <div class="grid">
    <div class="table-card t-system">
      <div class="table-header">debug_logs <span class="rows">48 rows</span></div>
      <div class="cols">
        <div class="col"><span class="col-name pk">id</span><span class="col-type">BIGINT</span><span class="badge badge-pk">PK</span></div>
        <div class="col"><span class="col-name">message</span><span class="col-type">TEXT</span><span></span></div>
        <div class="col"><span class="col-name">created_at</span><span class="col-type">TIMESTAMPTZ</span><span></span></div>
      </div>
    </div>
  </div>
</div>

<!-- ========== RELACIONES ========== -->
<div class="relations">
  <h3>🔗 Relaciones Principales (Foreign Keys)</h3>
  <div class="rel-grid">
    <div class="rel"><span class="src">estudios_titulos.user_id</span> <span class="arrow">→</span> <span class="tgt">auth.users.id</span></div>
    <div class="rel"><span class="src">profiles.user_id</span> <span class="arrow">→</span> <span class="tgt">auth.users.id</span></div>
    <div class="rel"><span class="src">solicitud_documentos.user_id</span> <span class="arrow">→</span> <span class="tgt">auth.users.id</span></div>
    <div class="rel"><span class="src">cadena_dominios.estudio_id</span> <span class="arrow">→</span> <span class="tgt">estudios_titulos.id</span></div>
    <div class="rel"><span class="src">cadena_dominios.user_id</span> <span class="arrow">→</span> <span class="tgt">auth.users.id</span></div>
    <div class="rel"><span class="src">estudio_docs_aislados.estudio_id</span> <span class="arrow">→</span> <span class="tgt">estudios_titulos.id</span></div>
    <div class="rel"><span class="src">Todas las ocr_*.estudio_id</span> <span class="arrow">→</span> <span class="tgt">estudios_titulos.id</span></div>
    <div class="rel"><span class="src">Todas las ocr_*.user_id</span> <span class="arrow">→</span> <span class="tgt">auth.users.id</span></div>
    <div class="rel"><span class="src">Algunas ocr_*.numero_operacion</span> <span class="arrow">→</span> <span class="tgt">estudios_titulos.numero_operacion</span></div>
    <div class="rel"><span class="src">calendar_events.calendar_id</span> <span class="arrow">→</span> <span class="tgt">calendars.id</span></div>
    <div class="rel"><span class="src">meeting_agendas.event_id</span> <span class="arrow">→</span> <span class="tgt">calendar_events.id</span></div>
    <div class="rel"><span class="src">agenda_items.agenda_id</span> <span class="arrow">→</span> <span class="tgt">meeting_agendas.id</span></div>
    <div class="rel"><span class="src">admin_google_tokens.user_id</span> <span class="arrow">→</span> <span class="tgt">auth.users.id</span></div>
  </div>
</div>

<p style="text-align:center;color:#484f58;font-size:11px;margin-top:32px;">
  Generado automáticamente · Property Title Study · Supabase · Marzo 2026
</p>

</body>
</html>
```
