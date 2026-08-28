"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Card from "../../primitives/Card/Card";
import Input from "../../primitives/Input/Input";
import Button from "../../primitives/Button/Button";

import { useAuth } from "../../context/AuthContext";

import styles from "./page.module.css";

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [error, setError] = useState("");
    const [submitting, setSubmitting] =
        useState(false);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError(
                "Your passwords do not match."
            );
            return;
        }

        try {
            setSubmitting(true);

            await register(
                name,
                email,
                password
            );

            router.push("/login");
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
                        BEGIN YOUR JOURNEY
                    </p>

                    <p className={styles.instruction}>
                        A little space for
                        everything ahead.
                    </p>
                </div>

                <p className={styles.quote}>
                    A little progress is still progress.
                </p>
            </section>

            {/* ==================================================
                REGISTER FORM
                ================================================== */}

            <section className={styles.formSection}>
                <Card
                    variant="standard"
                    className={styles.card}
                >
                    <div className={styles.formContent}>
                        <header className={styles.header}>
                            <p className={styles.formEyebrow}>
                                CREATE YOUR ACCOUNT
                            </p>
                        </header>

                        <form
                            className={styles.form}
                            onSubmit={handleSubmit}
                        >
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                variant="dotted"
                                placeholder="Your name"
                                aria-label="Your name"
                                value={name}
                                onChange={(event) =>
                                    setName(
                                        event.target.value
                                    )
                                }
                                autoComplete="name"
                                required
                            />

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
                                placeholder="Create a password"
                                aria-label="Password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                autoComplete="new-password"
                                required
                            />

                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                variant="dotted"
                                placeholder="Enter it again"
                                aria-label="Confirm password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                                }
                                autoComplete="new-password"
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
                                    ? "Creating account..."
                                    : "Create account"}
                            </Button>
                        </form>

                        <p className={styles.loginPrompt}>
                            Already have an account?{" "}
                            <Link href="/login">
                                Log in
                            </Link>
                        </p>
                    </div>
                </Card>
            </section>
        </main>
    );
}