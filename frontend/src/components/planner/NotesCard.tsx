"use client";

import { useRef, useState } from "react";
import Card from "../../primitives/Card/Card";
import Input from "../../primitives/Input/Input";
import styles from "../../styles/components/NotesCard.module.css";

interface NotesCardProps {
    value?: string[];
    onChange?: (lines: string[]) => void;
}

const INITIAL_LINES = 6;

export default function NotesCard({
    value,
    onChange,
}: NotesCardProps) {
    const [lines, setLines] = useState<string[]>(
        value ?? Array(INITIAL_LINES).fill("")
    );

    const inputRefs = useRef<
        Array<HTMLInputElement | null>
    >([]);

    const updateLine = (
        index: number,
        nextValue: string
    ) => {
        const updated = [...lines];
        updated[index] = nextValue;

        setLines(updated);
        onChange?.(updated);
    };

    const addLine = (index: number) => {
        const updated = [...lines];

        updated.splice(index + 1, 0, "");

        setLines(updated);
        onChange?.(updated);

        requestAnimationFrame(() => {
            inputRefs.current[index + 1]?.focus();
        });
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        addLine(index);
    };

    return (
        <Card
            variant="tertiary"
            className={styles.card}
        >
            <h2 className={styles.title}>Notes</h2>

            <div className={styles.notebook}>
                {lines.map((line, index) => (
                    <div
                        className={styles.noteLine}
                        key={index}
                    >
                        <span
                            className={styles.hole}
                            aria-hidden="true"
                        />

                        <Input
                            ref={(element) => {
                                inputRefs.current[index] = element;
                            }}
                            variant="dotted"
                            value={line}
                            placeholder={
                                index === 0
                                    ? "Write something..."
                                    : ""
                            }
                            onChange={(event) =>
                                updateLine(
                                    index,
                                    event.target.value
                                )
                            }
                            onKeyDown={(event) =>
                                handleKeyDown(event, index)
                            }
                            className={styles.lineInput}
                            aria-label={`Note line ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </Card>
    );
}