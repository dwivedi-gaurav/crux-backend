import { config } from "dotenv";
import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import { CrUXResponse, ApiError } from "./types";

config();

const app = express();

const PORT = process.env.PORT || 3001;
const CRUX_API_KEY = process.env.CRUX_API_KEY;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const CRUX_API_URL = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${CRUX_API_KEY}`;

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

interface CruxRequestBody {
  urls: string[];
}

app.post(
  "/crux",
  async (req: Request<{}, {}, CruxRequestBody>, res: Response) => {
    const { urls } = req.body;

    if (!Array.isArray(urls) || urls.length === 0) {
      const error: ApiError = {
        code: 400,
        message: "Please provide an array of URLs.",
        status: "BAD_REQUEST",
      };
      return res.status(400).json(error);
    }

    try {
      const results: CrUXResponse[] = await Promise.all(
        urls.map(async (url) => {
          try {
            const response = await axios.post(
              CRUX_API_URL,
              { url },
              { headers: { "Content-Type": "application/json" } }
            );
            return { url, data: response.data };
          } catch (error: any) {
            return {
              url,
              error: {
                code: error.response?.data?.error.status || 500,
                message:
                  error.response?.data?.error?.message ||
                  "Failed to fetch data",
                status:
                  error.response?.DataTransfer?.error?.statusText ||
                  "INTERNAL_SERVER_ERROR",
                details: error.response?.DataTransfer?.error?.data || undefined,
              } as ApiError,
            };
          }
        })
      );

      res.json(results);
    } catch (err) {
      const error: ApiError = {
        code: 500,
        message: "Something went wrong while processing URLs",
        status: "INTERNAL_SERVER_ERROR",
        details: err instanceof Error ? err.message : undefined,
      };
      res.status(500).json(error);
    }
  }
);

app.listen(PORT, () => {
  console.log(`CrUX API server running on port ${PORT}`);
});
