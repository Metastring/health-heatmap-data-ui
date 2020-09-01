const fs = require("fs")
const os = require("os")
const path = require("path")

export default (req, res) => {
  const {
    query: { name },
    method,
    body
  } = req;
  const saneName = path.join(os.homedir(), name)
  switch (method) {
    case "GET":
        if (saneName.endsWith(".pdf")) {
            const file = fs.createReadStream(saneName);
            const stat = fs.statSync(saneName);
            res.setHeader("Content-Length", stat.size);
            res.setHeader("Content-Type", "application/pdf");
            file.pipe(res);
        } else if (saneName.endsWith(".csv")) {
            const file = fs.createReadStream(saneName);
            const stat = fs.statSync(saneName);
            res.setHeader("Content-Length", stat.size)
            res.setHeader("Content-Type", "text/csv")
            file.pipe(res);
        }
        break;
    case "POST":
        if (saneName.endsWith(".csv")) {
            fs.writeFileSync(saneName, body)
            res.send("Saved")
        }
        break;
  }
  
};
