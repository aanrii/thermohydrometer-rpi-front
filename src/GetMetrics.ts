const GetMetrics = async (from: Date, to: Date) => {
  const fromNanos = from.getTime() * 1000 * 1000;
  const toNanos = to.getTime() * 1000 * 1000;

  const url = `${process.env.REACT_APP_GET_METRICS_API_ENDPOINT}?from=${fromNanos}&to=${toNanos}`;

  const res = await fetch(url, { mode: "cors" });
  if (!res.ok) {
    throw new Error("Failed to fecth");
  }

  const resBody = await res.json();
  if (resBody.errorMessage) {
    throw new Error(`Got error: ${resBody.errorMessage}`);
  }

  const metricsArray = (resBody as Array<any>)
    .map((m) => ({
      temperature: m.temperature,
      humidity: m.humidity,
      measuredAt: m.measured_at / 1000 / 1000,
    }))
    .filter((m) => m.humidity < 80)
    .sort((m1, m2) => m1.measuredAt - m2.measuredAt);

  return metricsArray;
};

export default GetMetrics;
