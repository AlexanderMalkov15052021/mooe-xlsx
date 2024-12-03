import { ConverterStor } from "@/entities";
import { Button } from "antd/lib";
import { observer } from "mobx-react-lite";

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const DownloadBtn = observer(() => {
    const {
        store: { xlsx },
    } = ConverterStor;

    const exportExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data Report');

        worksheet.mergeCells('A1:B1');

        worksheet.columns = [
            { header: '', key: 'pointsName', width: 24 },
            { header: 'Points', key: 'pointsId', width: 10 },
            { header: 'Roads', key: 'roads', width: 10 },
            { header: 'Lanes', key: 'lanes', width: 10 },
        ];

        worksheet.addRow({
            pointsName: "Name",
            pointsId: "ID",
            roads: "ID",
            lanes: "ID",
        });

        const maxLength = Math.max(xlsx.Points.ID.length, xlsx.Roads.ID.length, xlsx.Lanes.ID.length);

        for(let i = 0; i < maxLength; i++) {
            worksheet.addRow({
                pointsName: xlsx.Points?.Name[i] ?? null,
                pointsId: xlsx.Points?.ID[i] ?? null,
                roads: xlsx.Roads?.ID[i] ?? null,
                lanes: xlsx.Lanes?.ID[i] ?? null
            });
        }

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
            cell.alignment = { horizontal: 'center' };
        });

        worksheet.getRow(2).eachCell((cell) => {
            cell.font = { bold: true };
            cell.alignment = { horizontal: 'center' };
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${"convert"}.xlsx`);
    };

    return <>
        <Button
            onClick={exportExcel}
            className="buttun-upload"
            disabled={xlsx ? false : true} type={"primary"}
        >
            Скачать .xlsx
        </Button>
    </>
});

export default DownloadBtn;