# Personal OS

Puerta de entrada pública de mi sistema personal. **Este repositorio es público: aquí no hay nada personal.**

| Pieza | Dónde |
|---|---|
| Puerta de entrada (esta web) | `veronicereus-lab.github.io/personal-os/personal-os.html` — solo pide la cuenta y abre el OS |
| El OS completo | Almacén **privado** de Supabase (bucket `app`), legible solo por la cuenta dueña |
| Los datos | Supabase, con acceso solo para la cuenta dueña |
| Google e IA | Desde el propio OS; la clave de la IA vive en los secretos de Supabase, nunca en esta web |

## Archivos

- `personal-os.html` — la puerta: entra con la cuenta, descarga el OS del almacén privado (o usa la copia del dispositivo) y lo abre.
- `index.html` — portada.
- `manifest.webmanifest`, `sw.js`, `icono-*.png` — para instalarla como app.

## Nunca subir aquí

`personal-os-app.html`, copias de seguridad (`.json`), archivos `.sql` con datos ni nada con información personal.
