const { FILE } = require("dns");
const fs = require("fs");
const { createServer } = require("http");

fs.writeFile("output.txt", "Hello World", (err) => {
  if (err) {
    console.error("Error writing file:", err);
  }
  console.log("File written successfully");
});

fs.appendFile("output.txt", "This is my world", (err) => {
  if (err) {
    console.error("Error appending file", err);
    return;
  }
  console.log("Content appended succefully");
});

fs.readFile("output.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }
  console.log("File Content:", data);
});

fs.open("NewFile.txt", "wx", (err, fd) => {
  if (err) {
    if (err.code === "EEXIST") {
      console.error("File already exists");
    } else {
      console.error("Error:", err);
    }
    return; // Stop execution if there's an error
  }

  fs.write(fd, "initial content", (err) => {
    if (err) {
      console.error("Write error:", err);
      return;
    }

    fs.close(fd, (err) => {
      if (err) {
        console.error("Close error:", err);
      } else {
        console.log("File created and written successfully");
      }
    });
  });
});

fs.unlink("output.txt", (err) => {
  if (err) {
    console.error("error deleting file", err);
  }
  console.log("file deleted successfully");
});

fs.access("newFile.txt", fs.constants.F_OK, (err) => {
  console.log(err ? "File does not exist" : "file Exist");
});

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/cohorts") {
    fs.readFile("cohorts.json", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-type": "application/json" });
        return res.end(JSON.stringify({ message: "Cohorts not found" }));
      }
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    });
  } else if (req.method === "POST" && req.url === "/cohorts") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const cohort = JSON.parse(body);
        fs.writeFile("cohorts.json", JSON.stringify(cohort, null, 2), (err) => {
          if (err) {
            res.writeHead(500);
            return res.end(JSON.stringify({ message: "Failed to save data" }));
          }
          res.writeHead(201, { "Content-type": "application/json" });
          res.end(JSON.stringify({ message: "CohortRegistered" }));
        });
      } catch (error) {
        res.writeHead(201, { "Content-type": "application/json" });
        res.end(JSON.stringify({ message: "invalid JSON" }));
      } finally {
      }
    });
  } else if (req.method === "PATCH" && req.url === "/cohorts") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const patch = JSON.parse(body);
        fs.readFile("cohorts.json", "utf8", (err, data) => {
          if (err) {
            res.writeHead(404, { "Content-type": "application/json" });
            res.end(JSON.stringify({ message: "cohorts data not found" }));
          }
          const existingCohort = JSON.parse(data);
          const updatedCohort = { ...existingCohort, ...patch };
          fs.writeFile(
            "cohorts.json",
            JSON.stringify(updatedCohort, null, 2),
            (err) => {
              if (err) {
                res.writeHead(500);
                return res.end(
                  JSON.stringify({ message: "Failed to update cohorts" })
                );
              }
              res.writeHead(200, { "Content-type": "application/json" });
              return res.end(
                JSON.stringify({
                  message: "cohorts updated",
                  note: updatedCohort,
                })
              );
            }
          );
        });
      } catch (error) {
        res.writeHead(400, { "Content-type": "application/json" });
        res.end(JSON.stringify({ message: "invalid JSON" }));
      }
    });
  } else if (req.method === "DELETE" && req.url === "/cohorts") {
    fs.unlink("cohorts.json", (err) => {
      if (err) {
        res.writeHead(400, { "Content-type": "application/json" });
        return res.end(JSON.stringify({ message: "Failed to update cohorts" }));
      }
      res.writeHead(200, { "Content-type": "application/json" });
      return res.end(JSON.stringify({ message: "Cohort deleted" }));
    });
  } else {
    res.writeHead(500, { "Content-type": "application/json" });
    return res.end(JSON.stringify({ message: "Route or method not allowed" }));
  }
});

const hostname = "localhost";

const port = 3003;

server.listen(port, hostname, () => {
  console.log("Here is my server:", port);
});
