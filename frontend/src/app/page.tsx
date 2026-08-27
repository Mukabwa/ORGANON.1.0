import AppShell from "../components/shell/AppShell";
import Playground from "../pages/Playground/Playground";

export default function HomePage() {
    return (
        <AppShell>
            <Playground />
        </AppShell>
    );
}