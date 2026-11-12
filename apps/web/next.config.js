/** @type {import('next').NextConfig} */
const nextConfig = {
    // MUDANÇA (segurança): remove o cabeçalho "X-Powered-By: Next.js", que só ajuda
    // um atacante a descobrir a tecnologia usada.
    poweredByHeader: false,

    // MUDANÇA (segurança): cabeçalhos aplicados a todas as respostas.
    //  - X-Content-Type-Options: impede o navegador de "adivinhar" o tipo do arquivo;
    //  - X-Frame-Options: proíbe embutir o app em iframe de outro site (clickjacking);
    //  - Referrer-Policy: não vaza a URL completa para sites externos;
    //  - Permissions-Policy: desliga recursos do navegador que o app não usa.
    // (Content-Security-Policy ficou de fora: exige configuração com nonces no Next
    // e é uma melhoria futura.)
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
                ],
            },
        ];
    },
    allowedDevOrigins: ['192.168.125.130:3000', 'localhost:3000', "192.168.245.130:3000", "192.168.40.130:3000", "192.168.15.3:3000"],
    experimental: {
        turbopack: {
            root: '../../',
        },
    },
};

export default nextConfig;
