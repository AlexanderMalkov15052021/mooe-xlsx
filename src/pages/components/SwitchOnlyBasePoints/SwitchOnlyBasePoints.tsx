import { ConverterStor } from "@/entities";
import { Switch } from "antd/lib";
import { observer } from "mobx-react-lite";

const SwitchOnlyBasePoints = observer(() => {
    const {
        store: {
            basePointSwitchText, setOnlyBasePoints
        },
    } = ConverterStor;

    const changeHandler = (checked: boolean) => setOnlyBasePoints(checked);


    return <>
        <Switch onChange={changeHandler} />
        <p>{basePointSwitchText}</p>
    </>
});

export default SwitchOnlyBasePoints;