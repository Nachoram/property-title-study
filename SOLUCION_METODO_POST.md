# Solución: Cambiar Método HTTP a POST en n8n

¡Has avanzado! El workflow ya está activo, pero ahora rechaza el tipo de conexión.

**Error actual en consola:**
> `"This webhook is not registered for POST requests. Did you mean to make a GET request?"`

Esto indica que el nodo Webhook en n8n espera un `GET`, pero le estamos enviando un `POST`.

**Pasos para arreglarlo:**
1.  Abre tu workflow en **n8n**.
2.  Haz doble clic en el nodo inicial **Webhook**.
3.  En el campo **"HTTP Method"**, selecciona **`POST`**.
4.  Cierra, guarda los cambios ("Save") y asegúrate de que el switch "Active" siga encendido.

Vuelve a probar el botón en la web y listo.
