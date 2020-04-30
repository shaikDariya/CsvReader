export const SCORE_SEPERATER = "|";

export const getFileContent = (file: any) => {
  return new Promise((resolve, reject) => {
    const filerReader = new FileReader();
    filerReader.readAsText(file);
    filerReader.onload = () => resolve(filerReader.result);
    filerReader.onerror = e => reject(e);
  });
};

export const splitString = (str: string) => str.trim().split(/\n/);

export const stringToJson = (str: string) => {
  const rows = splitString(str);
  return rows.map(r => {
    const seriesData = r.split(",");
    const series = seriesData[0];
    const removeHeaders = seriesData.slice(1);
    const getData = removeHeaders.map(x => {
      const [year, score] = x.split(SCORE_SEPERATER);
      return { year, score };
    });
    return { field: series, data: getData };
  });
};
