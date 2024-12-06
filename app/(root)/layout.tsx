import { StreamVideoProvider } from "@/providers/StreamClientProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <StreamVideoProvider>
                {children}
            </StreamVideoProvider>
        </main>
    )
}
