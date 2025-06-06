# backend-13

## Descripción

Este proyecto es un backend desarrollado en Node.js y TypeScript utilizando Express. Su principal funcionalidad es exponer una API REST para cifrar y descifrar nombres utilizando criptografía RSA. El sistema utiliza llaves pública y privada para realizar el cifrado y descifrado respectivamente.

## Características principales

- **Cifrado de nombres**: Recibe un nombre y lo cifra usando una llave pública RSA.
- **Descifrado de nombres**: Recibe un nombre cifrado (en base64) y lo descifra usando una llave privada RSA.
- **Validación de parámetros**: Utiliza Joi para validar que el nombre sea alfanumérico y de máximo 15 caracteres.
- **Manejo de errores centralizado** y logging.
- **Configuración por variables de entorno** para las rutas de las llaves.

## Estructura del proyecto

```
.
├── src/
│   ├── index.ts                # Punto de entrada del servidor Express
│   │   ├── router.ts           # Definición de rutas principales
│   │   └── encryption/
│   │       ├── controller.ts   # Controladores de cifrado/descifrado
│   │       ├── service.ts      # Lógica de negocio de cifrado/descifrado
│   │       └── model.ts        # Esquema de validación
│   └── shared/                 # Clases y modelos compartidos (errores, logger, etc.)
├── keys/                       # Llaves pública y privada (no incluidas en el repo)
├── package.json
├── tsconfig.json
└── README.md
```

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Compila el proyecto:

   ```bash
   npm run build
   ```

4. Crea un archivo `.env` en la raíz con las siguientes variables:

   ```
   PUBLICKEYPATH=./keys/public.pem
   PRIVATEKEYPATH=./keys/private.pem
   PORT=8080
   ```

   Asegúrate de tener las llaves en la carpeta `keys/`.

## Uso

- **Modo desarrollo**:

  ```bash
  npm run dev
  ```

- **Modo producción**:

  ```bash
  npm start
  ```

## Endpoints

### POST `/api/encrypt-name`

- **Descripción**: Cifra un nombre usando la llave pública.
- **Body**:
  ```json
  {
    "name": "NombreAlfanumerico"
  }
  ```
- **Respuesta**:
  ```json
  {
    "status": 200,
    "message": "All Good!",
    "data": "cadena_base64_cifrada"
  }
  ```

### POST `/api/decrypt-name`

- **Descripción**: Descifra un nombre cifrado usando la llave privada.
- **Body**:
  ```json
  {
    "encryptedName": "cadena_base64_cifrada"
  }
  ```
- **Respuesta**:
  ```json
  {
    "status": 200,
    "message": "All Good!",
    "data": "NombreOriginal"
  }
  ```

## Requisitos

- Node.js >= 14
- TypeScript >= 4.5
- Llaves RSA (pública y privada) en la carpeta `keys/`

## Autor

Daniel Hernandez
