import "../styles/colors.css";
import "../styles/gradients.css";
import "../styles/effects.css";
import "../styles/materials.css";
import "../styles/scale.css";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}