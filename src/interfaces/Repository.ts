export interface Repository {
    name: string;
    avatarUrl: string;
    description: string;
    language: string;
} 


// Creación del arreglo con 5 instancias
export const repositoryList: Repository[] = [
    {
        name: "react-dashboard",
        avatarUrl: "https://i.pinimg.com/236x/13/ac/77/13ac7706f0a86b333e286ee6e721733b.jpg",
        description: "Un panel de control de administración moderno construido con React y Tailwind.",
        language: "TypeScript"
    },
    {
        name: "fastapi-backend",
        avatarUrl: "https://avatars.githubusercontent.com/u/191403375?v=4",
        description: "API REST de alto rendimiento para el manejo de usuarios y autenticación.",
        language: "Python"
    },
    {
        name: "awesome-utils",
        avatarUrl: "https://avatars.githubusercontent.com/u/191403375?v=4",
        description: "Colección de funciones utilitarias para el día a día en JavaScript vanilla.",
        language: "JavaScript"
    },
    {
        name: "flutter-ecommerce",
        avatarUrl: "https://i.pinimg.com/236x/13/ac/77/13ac7706f0a86b333e286ee6e721733b.jpg",
        description: "Aplicación móvil de comercio electrónico con soporte para iOS y Android.",
        language: "Dart"
    },
    {
        name: "rust-game-engine",
        avatarUrl: "https://avatars.githubusercontent.com/u/191403375?v=4",
        description: "Un motor de videojuegos 2D enfocado en el rendimiento y la seguridad de memoria.",
        language: "Rust"
    }
];