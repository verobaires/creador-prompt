import { useState } from "react";

const SECTIONS = [
  {
    id: "resumen",
    title: "1. Resumen ejecutivo",
    unit: "Unidades 1 y 6",
    color: "#5B4AB7",
    bg: "#EEEDFE",
    fields: [
      { key: "producto", label: "¿Cómo se llama tu producto o MVP?", placeholder: "Ej: App de selección de libros para el club de lectura" },
      { key: "usuario", label: "¿Quién es tu usuario específico?", placeholder: "Ej: Coordinadoras de clubes de lectura de 30-50 personas, que organizan la selección mensualmente por WhatsApp" },
      { key: "problema", label: "¿Qué problema real tiene ese usuario?", placeholder: "Ej: Pierden 2 horas por reunión coordinando votos y confirmaciones por mensaje" },
      { key: "mvp", label: "¿Qué construiste para validarlo?", placeholder: "Ej: Una app donde cada miembro elige su libro en 1 clic y automáticamente llega un email de confirmación" },
      { key: "hallazgo", label: "¿Cuál fue tu hallazgo principal?", placeholder: "Ej: 4 de 5 usuarias completaron la selección sin ayuda, pero ninguna supo que el email llegó" },
      { key: "accion", label: "¿Qué vas a hacer diferente en la próxima iteración?", placeholder: "Ej: Agregar una pantalla de confirmación visible en la app, no solo por email" },
    ],
    prompt: (f) => `Actúa como redactor de informes de producto.

Tengo un MVP llamado "${f.producto || '[nombre del producto]'}".

Mi usuario es: ${f.usuario || '[describir usuario]'}.

El problema que resuelve es: ${f.problema || '[describir problema]'}.

Para validarlo, construí: ${f.mvp || '[describir MVP]'}.

Mi hallazgo principal fue: ${f.hallazgo || '[describir hallazgo]'}.

La próxima acción que voy a tomar es: ${f.accion || '[describir acción]'}.

Escribí un resumen ejecutivo de exactamente 1 página (máximo 300 palabras) para el informe final de un curso de creación de producto con IA. 

El tono debe ser claro, directo y profesional. No uses jerga técnica innecesaria. Incluí: problema central, método de validación, hallazgo clave y próxima acción. NO lo escribas como introducción al producto: escribilo como síntesis de aprendizajes.`,
  },
  {
    id: "hipotesis",
    title: "2. Hipótesis priorizadas",
    unit: "Unidades 1 y 2",
    color: "#0F6E56",
    bg: "#E1F5EE",
    fields: [
      { key: "hipotesis1", label: "¿Cuál es tu hipótesis principal? (Usá: Si [acción], entonces [resultado medible])", placeholder: "Ej: Si el usuario puede seleccionar un libro en menos de 3 pasos, entonces el 80% completará la acción sin abandonar" },
      { key: "como_testeo1", label: "¿Cómo la testeaste?", placeholder: "Ej: Construí el MVP y lo probé con 5 coordinadoras durante 2 semanas" },
      { key: "resultado1", label: "¿Qué resultado obtuviste?", placeholder: "Ej: 4 de 5 completaron la acción. La que no completó encontró confuso el paso final" },
      { key: "hipotesis2", label: "¿Tenés una segunda hipótesis? (Opcional)", placeholder: "Ej: Si enviamos un email de confirmación, entonces los usuarios recordarán su elección" },
      { key: "resultado2", label: "¿Qué resultado obtuviste con la segunda hipótesis?", placeholder: "Ej: 0 de 5 mencionaron haber recibido el email. La confirmación visual es más efectiva" },
      { key: "users_involucrados", label: "¿Quiénes fueron los usuarios involucrados?", placeholder: "Ej: 5 coordinadoras de clubes de lectura, reclutadas por WhatsApp, entre 28 y 45 años" },
    ],
    prompt: (f) => `Actúa como analista de producto.

Tengo las siguientes hipótesis de mi MVP y sus resultados de testeo:

Hipótesis 1: ${f.hipotesis1 || '[hipótesis 1]'}
Cómo la testeé: ${f.como_testeo1 || '[método]'}
Resultado: ${f.resultado1 || '[resultado]'}

${f.hipotesis2 ? `Hipótesis 2: ${f.hipotesis2}
Resultado: ${f.resultado2 || '[resultado]'}` : ''}

Usuarios involucrados: ${f.users_involucrados || '[descripción de usuarios]'}

Redactá la sección "Hipótesis priorizadas" para un informe de producto. Incluí:
- Una tabla con cada hipótesis, su prioridad (Alta/Media/Baja), método de testeo y usuarios involucrados
- Para cada hipótesis, una breve interpretación del resultado: ¿se confirmó, se refutó o quedó sin conclusión?
- Usá estructura Si-Entonces para formular cada hipótesis si no están en ese formato
- Tono claro y basado en evidencia. Extensión: máximo 1 página.`,
  },
  {
    id: "hallazgos",
    title: "3. Hallazgos y evidencias",
    unit: "Unidades 2, 4 y 6",
    color: "#BA7517",
    bg: "#FAEEDA",
    fields: [
      { key: "dato_cuant1", label: "Dato cuantitativo 1 (ej: eventos en PostHog, registros en Supabase)", placeholder: "Ej: 12 eventos 'book_selected' en PostHog en 14 días, 5 usuarios únicos" },
      { key: "dato_cuant2", label: "Dato cuantitativo 2", placeholder: "Ej: 5 registros en tabla 'elecciones' de Supabase. Todos con libro_id diferente" },
      { key: "dato_cuant3", label: "Dato cuantitativo 3 (opcional)", placeholder: "Ej: 5 emails enviados via Resend. Tasa de apertura desconocida (sin tracking)" },
      { key: "cita1", label: "Cita textual de un usuario (palabras exactas)", placeholder: 'Ej: "No sabía que había mandado un email, pensé que me iba a llegar algo en la app"' },
      { key: "fuente_cita1", label: "¿De dónde viene esa cita?", placeholder: "Ej: WhatsApp, entrevista presencial, mensaje en el grupo del club" },
      { key: "observacion", label: "¿Qué observaste que no esperabas?", placeholder: "Ej: Todas las usuarias intentaron hacer click en la imagen del libro, no en el botón de seleccionar" },
    ],
    prompt: (f) => `Actúa como redactor de informes de producto con experiencia en triangulación de datos.

Tengo los siguientes datos de mi MVP:

DATOS CUANTITATIVOS:
- ${f.dato_cuant1 || '[dato 1]'}
- ${f.dato_cuant2 || '[dato 2]'}
${f.dato_cuant3 ? `- ${f.dato_cuant3}` : ''}

DATOS CUALITATIVOS:
- Cita textual de usuario: "${f.cita1 || '[cita]'}" (Fuente: ${f.fuente_cita1 || '[fuente]'})
- Observación: ${f.observacion || '[observación]'}

Redactá la sección "Hallazgos y evidencias" para un informe de producto. 
- Interpretá cada dato, no solo lo presentes: ¿qué significa ese número?
- Conectá los datos cuantitativos con los cualitativos: ¿se confirman o contradicen?
- Organizá en dos subsecciones: "Evidencias cuantitativas" y "Evidencias cualitativas"
- Cerrá con un párrafo de síntesis: el hallazgo más importante que surge de la triangulación
- Tono claro, basado en datos, sin especulación. Extensión: máximo 1.5 páginas.`,
  },
  {
    id: "nsm",
    title: "4. North Star Metric",
    unit: "Unidad 6",
    color: "#993C1D",
    bg: "#FAECE7",
    fields: [
      { key: "modelo", label: "¿Qué tipo de producto es el tuyo?", placeholder: "Ej: App de coordinación grupal (tipo SaaS B2C), marketplace de libros, herramienta de gestión interna" },
      { key: "nsm_candidata", label: "¿Cuál creés que es tu North Star Metric?", placeholder: "Ej: Cantidad de selecciones de libro completadas por sesión" },
      { key: "por_que_no_registros", label: "¿Por qué NO elegiste 'usuarios registrados' o 'visitas'?", placeholder: "Ej: Porque un usuario puede registrarse y nunca seleccionar nada. El valor real es la selección completada" },
      { key: "cuando_sube", label: "¿Cuándo sube tu NSM? ¿Qué tiene que hacer el usuario para que suba?", placeholder: "Ej: Sube cuando el usuario hace click en 'Seleccionar' y llega el email de confirmación" },
      { key: "metricas_vanidad", label: "¿Qué métrica podrías medir que sería vanidosa (que suba sin que el usuario reciba valor)?", placeholder: "Ej: Tiempo en la app (puede subir si el usuario está confundido), número de pantallas visitadas" },
    ],
    prompt: (f) => `Actúa como product manager experto en métricas de producto.

Mi producto es: ${f.modelo || '[tipo de producto]'}

La métrica que elegí como North Star Metric es: ${f.nsm_candidata || '[métrica candidata]'}

No elegí 'usuarios registrados' porque: ${f.por_que_no_registros || '[razón]'}

Esta métrica sube cuando: ${f.cuando_sube || '[condición]'}

Un ejemplo de métrica vanidosa que evité es: ${f.metricas_vanidad || '[métrica vanidosa]'}

Redactá la sección "North Star Metric" para un informe de producto. Incluí:
- Definición clara de la NSM elegida en una oración
- Justificación basada en los 3 criterios: mide valor real, es leading indicator, el equipo puede influir en ella
- Diferenciación explícita de métricas de vanidad que se descartaron y por qué
- Cómo se relaciona con las métricas de activación y retención
- Tono claro y sin jerga. Extensión: máximo 1 página.`,
  },
  {
    id: "dashboard",
    title: "5. Dashboard y métricas",
    unit: "Unidades 4, 5 y 6",
    color: "#185FA5",
    bg: "#E6F1FB",
    fields: [
      { key: "activacion_n", label: "¿Cuántos usuarios probaron el MVP?", placeholder: "Ej: 6 usuarios" },
      { key: "activacion_completo", label: "¿Cuántos completaron la acción clave (activación)?", placeholder: "Ej: 5 de 6 completaron la selección de libro" },
      { key: "retencion", label: "¿Cuántos volvieron a usarlo más de una vez?", placeholder: "Ej: 2 de 5 volvieron a la app para explorar otros libros. MVP demasiado nuevo para datos de retención" },
      { key: "evento_posthog", label: "¿Qué evento rastreaste en PostHog? ¿Cuántas veces se disparó?", placeholder: "Ej: 'book_selected' — se disparó 12 veces en 14 días. 5 usuarios únicos" },
      { key: "email_resend", label: "¿Cuántos emails se enviaron con Resend? ¿Qué decían?", placeholder: "Ej: 5 emails de confirmación. Asunto: 'Confirmación de selección'. Todos llegaron exitosamente" },
      { key: "interpretacion", label: "¿Qué te dice ese dashboard sobre la salud del producto?", placeholder: "Ej: La activación es alta (83%) pero la retención es baja. El MVP funciona para un uso, pero no hay razón para volver" },
    ],
    prompt: (f) => `Actúa como analista de datos de producto.

Estos son los datos de mi dashboard del MVP:

ACTIVACIÓN:
- ${f.activacion_n || '[N usuarios]'} probaron el MVP
- ${f.activacion_completo || '[N completaron]'} completaron la acción clave
- Tasa de activación: ${f.activacion_n && f.activacion_completo ? 'calcular del número' : '[calcular]'}

RETENCIÓN:
- ${f.retencion || '[dato de retención]'}

ENGAGEMENT (PostHog):
- ${f.evento_posthog || '[evento y frecuencia]'}

MENSAJERÍA (Resend):
- ${f.email_resend || '[emails enviados]'}

INTERPRETACIÓN DEL EQUIPO:
- ${f.interpretacion || '[qué significa todo esto]'}

Redactá la sección "Dashboard y métricas de tracción" para un informe de producto. 
- Organizá en subsecciones: Activación, Retención, Engagement
- Calculá tasas cuando sea posible (ej: tasa de activación = X/Y = Z%)
- Describí qué mostraría cada visualización (aunque no puedas incluir el gráfico real, describilo)
- Cerrá con una interpretación integrada: ¿qué dice el dashboard sobre la salud del producto?
- Señalá honestamente qué datos faltan y cómo se medirían
- Tono basado en datos, claro. Extensión: máximo 1.5 páginas.`,
  },
  {
    id: "iteracion",
    title: "6. Plan de iteración",
    unit: "Unidades 1, 5 y 6",
    color: "#3B6D11",
    bg: "#EAF3DE",
    fields: [
      { key: "aprendizaje_sorpresa", label: "¿Qué descubriste que cambió lo que ibas a hacer?", placeholder: "Ej: Creíamos que el email era suficiente como confirmación, pero ningún usuario lo notó. Esto cambia nuestra prioridad" },
      { key: "experimento1", label: "Próximo experimento 1 (Si → Entonces)", placeholder: "Ej: Si agregamos una pantalla de confirmación visible en la app después de seleccionar, entonces el 90% de usuarios sabrá que su elección fue registrada" },
      { key: "origen1", label: "¿De qué hallazgo surge ese experimento?", placeholder: "Ej: 0 de 5 usuarios mencionaron el email. La confirmación visual es necesaria" },
      { key: "metrica_exito1", label: "¿Cómo sabrías que ese experimento funcionó?", placeholder: "Ej: El 90% de usuarios puede decir espontáneamente que su selección fue registrada sin que se lo preguntemos" },
      { key: "experimento2", label: "Próximo experimento 2 (opcional)", placeholder: "Ej: Si agregamos un historial de selecciones anteriores, entonces los usuarios vuelven al mes siguiente" },
    ],
    prompt: (f) => `Actúa como product manager especializado en iteración ágil.

A partir de los hallazgos de mi MVP, definí el siguiente plan de iteración:

APRENDIZAJE QUE CAMBIA EL RUMBO:
${f.aprendizaje_sorpresa || '[aprendizaje sorpresa]'}

EXPERIMENTO 1:
- Hipótesis: ${f.experimento1 || '[hipótesis Si-Entonces]'}
- Surge del hallazgo: ${f.origen1 || '[hallazgo origen]'}
- Métrica de éxito: ${f.metrica_exito1 || '[métrica]'}

${f.experimento2 ? `EXPERIMENTO 2:
- Hipótesis: ${f.experimento2}` : ''}

Redactá la sección "Plan de iteración y próximos experimentos" para un informe de producto.
- Empezá con los aprendizajes que modificaron el plan original (Build-Measure-Learn)
- Para cada experimento: hipótesis en formato Si-Entonces, hallazgo que lo origina, métrica de éxito, prioridad
- Explicá cómo cada experimento se vincula con la North Star Metric
- Cerrá con una reflexión: ¿estás más cerca del Product-Market Fit? ¿Qué señales te faltaría ver?
- Tono estratégico y basado en evidencia. Extensión: máximo 1 página.`,
  },
];

export default function PromptBuilder() {
  const [activeSection, setActiveSection] = useState(0);
  const [fields, setFields] = useState({});
  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const sec = SECTIONS[activeSection];
  const sectionFields = fields[sec.id] || {};

  const updateField = (key, value) => {
    setFields(prev => ({
      ...prev,
      [sec.id]: { ...(prev[sec.id] || {}), [key]: value }
    }));
  };

  const generatedPrompt = sec.prompt(sectionFields);

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const filledCount = sec.fields.filter(f => sectionFields[f.key]?.trim()).length;
  const progress = Math.round((filledCount / sec.fields.filter(f => !f.key.includes('2') || activeSection === 1).length) * 100);

  return (
    <div style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)", padding: "0 0 2rem" }}>

      {/* Header */}
      <div style={{ background: "var(--color-background-secondary)", borderBottom: "0.5px solid var(--color-border-tertiary)", padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>Generador de prompts — Informe Final</div>
        <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Completá los datos de cada sección y copiá el prompt listo para usar en Claude o ChatGPT</div>
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "0 1.25rem", marginBottom: "1.25rem" }}>
        {SECTIONS.map((s, i) => {
          const sFields = fields[s.id] || {};
          const filled = s.fields.filter(f => sFields[f.key]?.trim()).length;
          const isActive = i === activeSection;
          return (
            <button
              key={s.id}
              onClick={() => { setActiveSection(i); setShowPrompt(false); }}
              style={{
                padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: isActive ? 500 : 400,
                border: `0.5px solid ${isActive ? s.color : "var(--color-border-secondary)"}`,
                background: isActive ? s.bg : "var(--color-background-primary)",
                color: isActive ? s.color : "var(--color-text-secondary)",
                cursor: "pointer", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: 6
              }}
            >
              {s.title}
              {filled > 0 && (
                <span style={{ background: s.color, color: "#fff", borderRadius: 10, padding: "1px 6px", fontSize: 10 }}>
                  {filled}/{s.fields.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active section */}
      <div style={{ padding: "0 1.25rem" }}>
        <div style={{ background: "var(--color-background-primary)", border: `0.5px solid ${sec.color}30`, borderRadius: "var(--border-radius-lg)", overflow: "hidden", marginBottom: "1rem" }}>

          {/* Section header */}
          <div style={{ background: sec.bg, padding: "0.875rem 1.25rem", borderBottom: `0.5px solid ${sec.color}30`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: sec.color }}>{sec.title}</div>
              <div style={{ fontSize: 12, color: sec.color + "99", marginTop: 2 }}>{sec.unit}</div>
            </div>
            <div style={{ fontSize: 12, color: sec.color, background: sec.color + "20", padding: "4px 10px", borderRadius: 20 }}>
              {filledCount}/{sec.fields.length} campos
            </div>
          </div>

          {/* Fields */}
          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {sec.fields.map(field => (
              <div key={field.key}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", display: "block", marginBottom: 6 }}>
                  {field.label}
                </label>
                <textarea
                  value={sectionFields[field.key] || ""}
                  onChange={e => updateField(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  style={{
                    width: "100%", boxSizing: "border-box", padding: "8px 10px",
                    fontSize: 13, fontFamily: "var(--font-sans)", lineHeight: 1.5,
                    border: sectionFields[field.key]?.trim()
                      ? `0.5px solid ${sec.color}60`
                      : "0.5px solid var(--color-border-tertiary)",
                    borderRadius: "var(--border-radius-md)",
                    background: "var(--color-background-secondary)",
                    color: "var(--color-text-primary)",
                    resize: "vertical", outline: "none",
                    transition: "border 0.15s"
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Prompt area */}
        <div style={{ background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", overflow: "hidden" }}>
          <div style={{ padding: "0.875rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Prompt generado para esta sección</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setShowPrompt(!showPrompt)}
                style={{
                  padding: "5px 12px", fontSize: 12, borderRadius: "var(--border-radius-md)",
                  border: "0.5px solid var(--color-border-secondary)",
                  background: "var(--color-background-primary)", color: "var(--color-text-secondary)",
                  cursor: "pointer"
                }}
              >
                {showPrompt ? "Ocultar" : "Vista previa"}
              </button>
              <button
                onClick={copyPrompt}
                style={{
                  padding: "5px 14px", fontSize: 12, borderRadius: "var(--border-radius-md)",
                  border: `0.5px solid ${sec.color}`,
                  background: copied ? sec.color : "var(--color-background-primary)",
                  color: copied ? "#fff" : sec.color,
                  cursor: "pointer", fontWeight: 500, transition: "all 0.15s"
                }}
              >
                {copied ? "✓ Copiado" : "Copiar prompt ↗"}
              </button>
            </div>
          </div>

          {showPrompt && (
            <pre style={{
              margin: 0, padding: "1rem 1.25rem",
              fontSize: 12, fontFamily: "var(--font-mono)", lineHeight: 1.6,
              color: "var(--color-text-secondary)", whiteSpace: "pre-wrap", wordBreak: "break-word",
              maxHeight: 320, overflowY: "auto"
            }}>
              {generatedPrompt}
            </pre>
          )}

          {!showPrompt && (
            <div style={{ padding: "0.875rem 1.25rem", fontSize: 13, color: "var(--color-text-tertiary)" }}>
              Completá los campos de arriba y luego copiá el prompt. Pegalo directamente en Claude o ChatGPT para generar el texto de esa sección.
            </div>
          )}
        </div>

        {/* Instructions box */}
        <div style={{ marginTop: "1rem", padding: "0.875rem 1.25rem", background: "var(--color-background-info)", border: "0.5px solid var(--color-border-info)", borderRadius: "var(--border-radius-md)", fontSize: 13, color: "var(--color-text-info)", lineHeight: 1.6 }}>
          <span style={{ fontWeight: 500 }}>Cómo usar este generador:</span> completá los campos con tus datos reales del MVP → copiá el prompt → pegalo en Claude o ChatGPT → revisá el texto generado y ajustalo con tu voz → pegalo en la plantilla DOCX.
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
          <button
            onClick={() => { setActiveSection(Math.max(0, activeSection - 1)); setShowPrompt(false); }}
            disabled={activeSection === 0}
            style={{
              padding: "7px 16px", fontSize: 13, borderRadius: "var(--border-radius-md)",
              border: "0.5px solid var(--color-border-secondary)",
              background: "var(--color-background-primary)", color: activeSection === 0 ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
              cursor: activeSection === 0 ? "default" : "pointer", opacity: activeSection === 0 ? 0.5 : 1
            }}
          >
            ← Sección anterior
          </button>
          <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", alignSelf: "center" }}>
            {activeSection + 1} / {SECTIONS.length}
          </span>
          <button
            onClick={() => { setActiveSection(Math.min(SECTIONS.length - 1, activeSection + 1)); setShowPrompt(false); }}
            disabled={activeSection === SECTIONS.length - 1}
            style={{
              padding: "7px 16px", fontSize: 13, borderRadius: "var(--border-radius-md)",
              border: `0.5px solid ${activeSection < SECTIONS.length - 1 ? sec.color : "var(--color-border-secondary)"}`,
              background: activeSection < SECTIONS.length - 1 ? sec.bg : "var(--color-background-primary)",
              color: activeSection < SECTIONS.length - 1 ? sec.color : "var(--color-text-tertiary)",
              cursor: activeSection === SECTIONS.length - 1 ? "default" : "pointer",
              fontWeight: 500, opacity: activeSection === SECTIONS.length - 1 ? 0.5 : 1
            }}
          >
            Siguiente sección →
          </button>
        </div>
      </div>
    </div>
  );
}
