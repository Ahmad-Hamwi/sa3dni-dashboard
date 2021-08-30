export const buildDatesQueryParams = (
  startDate?: Date,
  endDate?: Date
): any => {
  const queryParams: any = {};

  if (startDate) queryParams["startDate"] = startDate;

  if (endDate) queryParams["endDate"] = endDate;

  return queryParams;
};