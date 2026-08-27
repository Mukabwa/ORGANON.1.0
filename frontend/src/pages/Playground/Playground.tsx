import Button from "../../primitives/Button/Button";
import Card from "../../primitives/Card/Card";
import Input from "../../primitives/Input/Input";
import Icon from "../../primitives/Icon/Icon";
import Checkbox from "../../primitives/Checkbox/Checkbox";
import Switch from "../../primitives/Switch/Switch";
import Chip from "../../primitives/Chip/Chip";
import Divider from "../../primitives/Divider/Divider";
import ProgressBar from "../../primitives/ProgressBar/ProgressBar";



import styles from "./Playground.module.css";

export default function Playground() {
    return (
        <main className={styles.playground}>

            <h1>Organon Playground</h1>

            {/* ==========================================
                BUTTONS
            ========================================== */}

            <section className={styles.section}>

                <h2>Buttons</h2>

                <div className={styles.row}>

                    <Button>
                        Primary
                    </Button>

                    <Button variant="secondary">
                        Secondary
                    </Button>

                    <Button variant="muted">
                        Muted
                    </Button>

                    <Button disabled>
                        Disabled
                    </Button>

                </div>

            </section>


            {/* ==========================================
                CARDS
            ========================================== */}

            <section className={styles.section}>

                <h2>Cards</h2>

                <div className={styles.row}>

                    <Card variant="standard">

                        <h3>Standard Card</h3>

                        <p>
                            Default container for most UI.
                        </p>

                    </Card>


                    <Card variant="primary">

                        <h3>Primary Card</h3>

                        <p>
                            Featured content or important information.
                        </p>

                    </Card>


                    <Card variant="secondary">

                        <h3>Secondary Card</h3>

                        <p>
                            Alternative emphasis.
                        </p>

                    </Card>

                </div>

            </section>

            {/* ==========================================
    INPUTS
========================================== */}

            <section className={styles.section}>

                <h2>Inputs</h2>

                <div className={styles.row}>

                    <Input
                        variant="standard"
                        placeholder="Standard input"
                    />

                    <Input
                        variant="filled"
                        placeholder="Filled input"
                    />

                    <Input
                        variant="dotted"
                        placeholder="Dotted input"
                    />

                </div>

            </section>

            {/* ==========================================
    ICONS
========================================== */}

            <section className={styles.section}>

                <h2>Icons</h2>

                <div className={styles.row}>

                    <Icon
                        name="search"
                        variant="standard"
                    />

                    <Icon
                        name="calendar"
                        variant="standard"
                    />

                    <Icon
                        name="settings"
                        variant="standard"
                    />

                    <Icon
                        name="search"
                        variant="gradient"
                    />

                    <Icon
                        name="calendar"
                        variant="gradient"
                    />

                    <Icon
                        name="plus"
                        variant="capsule"
                    />

                    <Icon
                        name="back"
                        variant="capsule"
                    />

                    <Icon
                        name="home"
                        variant="capsule"
                    />

                </div>

            </section>

            {/* ==========================================
    CHECKBOXES
========================================== */}

            <section className={styles.section}>

                <h2>Checkboxes</h2>

                <div className={styles.row}>

                    <Checkbox
                        variant="standard"
                    />

                    <Checkbox
                        variant="gradient"
                    />

                    <Checkbox
                        variant="capsule"
                    />

                    <Checkbox
                        variant="standard"
                        checked
                        readOnly
                    />

                    <Checkbox
                        variant="gradient"
                        checked
                        readOnly
                    />

                    <Checkbox
                        variant="capsule"
                        checked
                        readOnly
                    />

                    <Checkbox
                        variant="circle-x"
                        checked
                        readOnly
                    />

                    <Checkbox
                        variant="circle-x"
                        readOnly
                    />

                </div>

            </section>

            {/* ==========================================
    SWITCHES
========================================== */}

            <section className={styles.section}>

                <h2>Switches</h2>

                <div className={styles.row}>

                    <Switch
                        variant="standard"
                    />

                    <Switch
                        variant="standard"
                        defaultChecked
                    />

                    <Switch
                        variant="gradient"
                    />

                    <Switch
                        variant="gradient"
                        defaultChecked
                    />

                    <Switch
                        variant="standard"
                        disabled
                    />

                    <Switch
                        variant="gradient"
                        disabled
                    />

                </div>

            </section>

            {/* ==========================================
    CHIPS
========================================== */}

            <section className={styles.section}>

                <h2>Chips</h2>

                <div className={styles.row}>

                    <Chip>
                        Chip
                    </Chip>

                    <Chip>
                        High Priority
                    </Chip>

                    <Chip>
                        Work
                    </Chip>

                    <Chip>
                        Completed
                    </Chip>

                </div>

            </section>

            {/* ==========================================
    DIVIDERS
========================================== */}

            <section className={styles.section}>

                <h2>Dividers</h2>

                <div className={styles.row}>

                    {/* Fade */}

                    <Divider
                        variant="fade"
                    />

                    {/* Ornament */}

                    <Divider
                        variant="ornament"
                    >
                        ✦
                    </Divider>

                    {/* Trail */}

                    <Divider
                        variant="trail"
                    >
                        ✦
                    </Divider>

                </div>


                <div className={styles.row}>

                    {/* Vertical Fade */}

                    <Divider
                        variant="fade"
                        orientation="vertical"
                    />

                    {/* Vertical Ornament */}

                    <Divider
                        variant="ornament"
                        orientation="vertical"
                    >
                        ✦
                    </Divider>

                    {/* Vertical Trail */}

                    <Divider
                        variant="trail"
                        orientation="vertical"
                    >
                        ✦
                    </Divider>

                </div>

            </section>

            {/* ==========================================
    PROGRESS BARS
========================================== */}

            <section className={styles.section}>

                <h2>Progress Bars</h2>

                <div className={styles.row}>

                    {/* Straight */}

                    <ProgressBar
                        variant="straight"
                        value={25}
                    />

                    <ProgressBar
                        variant="straight"
                        value={50}
                    />

                    <ProgressBar
                        variant="straight"
                        value={75}
                    />

                </div>


                <div className={styles.row}>

                    {/* Circle */}

                    <ProgressBar
                        variant="circle"
                        value={25}
                    />

                    <ProgressBar
                        variant="circle"
                        value={50}
                    />

                    <ProgressBar
                        variant="circle"
                        value={75}
                    />

                    <ProgressBar
                        variant="circle"
                        value={100}
                    />

                </div>


                <div className={styles.row}>

                    {/* Icon */}

                    <ProgressBar
                        variant="icon"
                        value={25}
                    />

                    <ProgressBar
                        variant="icon"
                        value={50}
                    />

                    <ProgressBar
                        variant="icon"
                        value={75}
                    />

                    <ProgressBar
                        variant="icon"
                        value={100}
                    />

                </div>

            </section>
        </main>
    );
}