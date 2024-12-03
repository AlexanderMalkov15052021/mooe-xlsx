import { makeAutoObservable } from "mobx";

const allPointsText: string = "Все точки!";
const onlyBasePointsText: string = "Только базовые точки!";

class ConverterStor {
    isLoading: boolean = false;
    refFileName: string | null = null;
    loadingTime: number[] = [0, 0];
    isMessageShow: boolean = false;
    isOnlyBasePoints: boolean = false;

    basePointSwitchText: string = allPointsText;

    href: string = "";
    xlsx: any = null;
    mooe: any = null;

    constructor() {
        makeAutoObservable(this);
    }

    setOnlyBasePoints = (value: boolean) => {
        this.isOnlyBasePoints = value;
        this.basePointSwitchText = value ? onlyBasePointsText : allPointsText;
        this.setXLSX(this.mooe);
    }

    setLoadingTime = (val: number[]) => this.loadingTime = val;
    setIsMessageShow = (val: boolean) => this.isMessageShow = val;
    setRefFileName = (val: string | null) => this.refFileName = val;
    setIsLoading = (val: boolean) => this.isLoading = val;

    setMOOE = (doc: any) => {
        this.mooe = doc;
        this.setXLSX(doc);
    }

    setXLSX = (doc: any) => {

        // converter: https://products.aspose.app/cells/conversion/json-to-xlsx

        const objectWithId: any = {
            Points: {
                Name: [],
                ID: []
            },
            Roads: {
                ID: []
            },
            Lanes: {
                ID: []
            }
        };

        if (this.isOnlyBasePoints) {
            doc.mLaneMarks.map((obj: any) => {

                if (obj.mLaneMarkType === 11) {
                    objectWithId["Points"]["Name"].push(obj.mLaneMarkName);
                    objectWithId["Points"]["ID"].push(obj.mLaneMarkID);
                }

            });
        }
        else {
            doc.mLaneMarks.map((obj: any) => {

                objectWithId["Points"]["Name"].push(obj.mLaneMarkName);
                objectWithId["Points"]["ID"].push(obj.mLaneMarkID);

            });
        }

        doc.mRoads.map((obj: any) => {

            objectWithId["Roads"]["ID"].push(obj.mRoadID);
            objectWithId["Lanes"]["ID"].push(obj.mLanes[0].mLaneID);

        });

        this.xlsx = objectWithId;
    }
}

export const store = new ConverterStor();
