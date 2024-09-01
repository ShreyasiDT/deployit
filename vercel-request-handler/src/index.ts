import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: "dsf7ea9c3f8c7f0f26f0d21c5ce99d1ad6a",
  secretAccessKey:
    "123b4df203781dd711223ce931a2d7ca269cdbf81bb530de4548474584951b798be",
  endpoint:
    "https://234e21220f4758c1230870ba9c388712d42ef2.r2.cloudflarestorage.com",
});

const app = express();

app.get("/*", async (req, res) => {
  const host = req.hostname;

  const id = host.split(".")[0];
  const filePath = req.path;

  const contents = await s3
    .getObject({
      Bucket: "vercel",
      Key: `dist/${id}${filePath}`,
    })
    .promise();

  const type = filePath.endsWith("html")
    ? "text/html"
    : filePath.endsWith("css")
    ? "text/css"
    : "application/javascript";
  res.set("Content-Type", type);

  res.send(contents.Body);
});

app.listen(3001);
