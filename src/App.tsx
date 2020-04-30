import React, { useState } from "react";

import {
  getFileContent,
  stringToJson,
  SCORE_SEPERATER
} from "./util/fileUtils";

type ScoreType = {
  year: string;
  score: string;
};

type SeriesType = {
  field: string;
  data: ScoreType[];
};

const onChangeHandler = async (event: any, SetPreview: any) => {
  try {
    const content: any = await getFileContent(event.target.files[0]);
    const showPreview = stringToJson(content);
    SetPreview(showPreview);
  } catch (e) {
    console.error(e);
  }
};

export default function App() {
  const [preview, SetPreview] = useState([]);
  return (
    <div className="container">
      <input
        type="file"
        onChange={e => onChangeHandler(e, SetPreview)}
        className="form-control-file m-2"
      />

      {preview.length > 0 && (
        <>
          <h4 className="mt-2">Preview</h4>
          {renderPreviewTable(preview)}
          <button
            className="btn btn-primary"
            onClick={() => alert(JSON.stringify(preview))}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
}

const renderPreviewTable = (preview: SeriesType[]) => (
  <table className="table">
    <tbody>
      {preview.map((series: SeriesType) => (
        <tr key={series.field}>
          <td>{series.field}</td>
          {series.data.map((score: ScoreType, i: number) => (
            <td key={`${series.field}|${i}`}>
              {score.year}
              {SCORE_SEPERATER}
              {score.score}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
