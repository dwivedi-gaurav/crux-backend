interface CrUXSuccessResponse {
  url: string;
  data: {
    record: {
      key: {
        url: string;
        formFactor: string;
      };
      metrics: {
        [key: string]: {
          percentiles: {
            p75: number;
          };
          histogram: Array<{
            start: number;
            end: number;
            density: number;
          }>;
        };
      };
    };
  };
}

interface CrUXErrorResponse {
  url: string;
  error: ApiError;
}

interface ApiError {
  code: number;
  message: string;
  status: string;
  details?: unknown;
}

type CrUXResponse = CrUXSuccessResponse | CrUXErrorResponse;

export { CrUXSuccessResponse, CrUXErrorResponse, CrUXResponse, ApiError };
