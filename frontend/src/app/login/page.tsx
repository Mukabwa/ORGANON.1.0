"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Card from "../../primitives/Card/Card";
import Input from "../../primitives/Input/Input";
import Button from "../../primitives/Button/Button";

import { useAuth } from "../../context/AuthContext";

import styles from "./page.module.css";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [submitting, setSubmitting] =
        useState(false);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        try {
            setSubmitting(true);

            await login(
                email,
                password
            );

            router.push("/planner/daily");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className={styles.page}>
            {/* ==================================================
                INTRODUCTION
                ================================================== */}

            <section className={styles.intro}>
                <div className={styles.brand}>
                    <h1>Organon</h1>

                    <p>
                        A gentle place for your plans
                    </p>
                </div>

                <div className={styles.divider}>
                    <span />
                    <i>✦</i>
                    <span />
                </div>

                <div className={styles.invitation}>
                    <p className={styles.eyebrow}>
                        CONTINUE YOUR JOURNEY
                    </p>

                    <p className={styles.instruction}>
                        Your space is waiting for you.
                    </p>
                </div>

                <p className={styles.quote}>
                    A little progress is still progress.
                </p>
            </section>

            {/* ==================================================
                LOGIN FORM
                ================================================== */}

            <section className={styles.formSection}>
                <Card
                    variant="standard"
                    className={styles.card}
                >
                    <div className={styles.formContent}>
                        <header className={styles.header}>
                            <p className={styles.formEyebrow}>
                                WELCOME BACK
                            </p>
                        </header>

                        <form
                            className={styles.form}
                            onSubmit={handleSubmit}
                        >
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                variant="dotted"
                                placeholder="you@example.com"
                                aria-label="Email address"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                                autoComplete="email"
                                required
                            />

                            <Input
                                id="password"
                                name="password"
                                type="password"
                                variant="dotted"
                                placeholder="Your password"
                                aria-label="Password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                autoComplete="current-password"
                                required
                            />

                            {error && (
                                <p
                                    className={
                                        styles.error
                                    }
                                >
                                    {error}
                                </p>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                className={styles.submit}
                                disabled={submitting}
                            >
                                {submitting
                                    ? "Entering..."
                                    : "Enter Organon"}
                            </Button>
                        </form>

                        <p className={styles.loginPrompt}>
                            New here?{" "}
                            <Link href="/register">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </Card>
            </section>
        </main>
    );
}