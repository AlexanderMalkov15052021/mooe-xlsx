import { ConverterStor } from "@/entities";
import { observer } from "mobx-react-lite";
import { ChangeEvent, FormEvent, useRef } from "react";

import styles from "./UploadForm.module.css";

const UploadForm = observer(() => {

    const {
        store: {
            isLoading, refFileName,
            setIsMessageShow, setIsLoading, setLoadingTime, setRefFileName, setMOOE
        },
    } = ConverterStor;

    const refTime = useRef([0, 0]);

    const readFile = (evt: ChangeEvent<HTMLInputElement>) => {

        if (!evt.target.files) return;

        if (evt.target.files[0].name.split(".").at(-1) !== "mooe") {
            setIsMessageShow(true);
            return
        };

        setIsLoading(true);

        const file = evt.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);

        setRefFileName(file.name);

        reader.onload = async () => {

            const interval = setInterval(() => {

                if (refTime.current[1] === 59) {
                    setLoadingTime([refTime.current[0] + 1, 0]);
                    refTime.current[0] += 1;
                    refTime.current[1] = 0;
                }
                else {
                    setLoadingTime([refTime.current[0], refTime.current[1] + 1]);
                    refTime.current[1] += 1;
                }

            }, 1000);

            try {

                const fileStr = reader.result as string;

                const mooeJson = JSON.parse(fileStr);

                setMOOE(mooeJson);

                setIsLoading(false);

                clearInterval(interval);

            } catch (err: any) {
                return console.error(err.stack);
            }

        };

        reader.onerror = () => {
            console.error(reader.error);
        };

    }

    const restFiles = (evt: FormEvent<HTMLFormElement>) => {
        setIsMessageShow(false);
        evt.currentTarget.reset();
        setRefFileName(null);
        setLoadingTime([0, 0]);
    }

    return <>
        <form onClick={isLoading ? evt => evt.preventDefault() : restFiles}>
            <label
                htmlFor="file-upload"
                className={
                    isLoading
                        ? `${styles.disabledUpload} ${styles["custom-file-upload"]}`
                        : `${styles["custom-file-upload"]}`
                }
            >
                {refFileName ? refFileName : "Выберите файл .mooe"}
            </label>
            <input
                className={styles.inputFileUpload}
                id="file-upload"
                type="file"
                onChange={isLoading ? evt => evt.preventDefault() : readFile}
            />
        </form>
    </>
});

export default UploadForm;