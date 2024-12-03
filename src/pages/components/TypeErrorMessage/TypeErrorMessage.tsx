import { ConverterStor } from "@/entities";
import { observer } from "mobx-react-lite";
import styles from "./TypeErrorMessage.module.css";

const TypeErrorMessage = observer(() => {

    const {
        store: { isMessageShow },
    } = ConverterStor;

    return isMessageShow && <p className={styles.message}>Необходим файл с расширением .mooe</p>
});

export default TypeErrorMessage;