import React from "react";

interface TimeTableProps {
    laps: string[][];
}

export function TimeTable({laps}: TimeTableProps) {
    return (
        laps.length > 0 ? <div className="mx-5">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Lap</th>
                        <th scope="col">Lap Time</th>
                        <th scope="col">Total Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {laps.map((item, index) => {
                        return (
                            <tr key={index + 666}>
                                <th scope="row">{(1 + index).toString().padStart(2, "0")}</th>
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                            </tr>)
                    }).reverse()}
                    </tbody>
                </table>
            </div>
            : <></>
    );
}