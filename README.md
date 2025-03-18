# Cifrado y Almacenamiento Seguro

Este proyecto implementa un sistema de cifrado y almacenamiento seguro de mensajes con funcionalidades de encriptación, desencriptación y simulación de ataques de fuerza bruta.

## Requisitos Previos

-   Node.js (versión 14 o superior)
-   npm o pnpm

## Instalación

1. Instalar TypeScript globalmente:

```bash
npm install -g typescript
```

2. Clonar el repositorio e instalar dependencias:

```bash
git clone <url-del-repositorio>
cd cifrado-almacenamiento
pnpm install
```

## Compilación y Ejecución

1. Ejecutar la aplicación:

```bash
node index.js
```

## Seguridad

Este proyecto utiliza bcrypt para el hash de contraseñas y cifrado de mensajes. Es importante notar que la simulación de ataques de fuerza bruta es solo con fines educativos.

## Preguntas Frecuentes
1. **¿Por qué no es recomendable almacenar contraseñas en texto plano en una base de datos?**
   Las contraseñas en texto plano son vulnerables a exposición directa si la base de datos es comprometida.

2. **¿Cuál es la diferencia entre cifrado y hashing?**
   El cifrado es reversible con una clave, mientras el hashing genera una huella digital única e irreversible.

3. **¿Por qué una clave fija en el código es una mala práctica?**
   Las claves en el código son vulnerables a exposición a través del control de versiones.

4. **¿Cómo se puede proteger mejor una clave secreta en una aplicación real?**
   Usando variables de entorno o servicios de gestión de secretos en la nube.

5. **Si un atacante roba una base de datos con datos cifrados, pero sin la clave, ¿puede descifrarlos fácilmente?**
   No es viable sin la clave si se usa un algoritmo de cifrado fuerte.

6. **Menciona al menos dos ataques comunes contra sistemas de autenticación y cómo prevenirlos**
   La fuerza bruta se previene con límites de intentos, y la inyección SQL con consultas parametrizadas.

7. **¿Por qué bcrypt es más seguro que SHA-256 para almacenar contraseñas?**
   Bcrypt incluye salt automático y es intencionalmente lento para resistir ataques.

8. **¿Qué es un "salting" y por qué es importante en seguridad?**
   Es agregar datos aleatorios únicos a cada contraseña antes del hashing para prevenir ataques de diccionario.
