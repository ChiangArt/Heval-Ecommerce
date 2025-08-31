import fs from "fs";
import path from "path";

const logFile = path.resolve("/var/log/heval-frontend.log"); 

if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, "", { flag: "w" });
}

function writeLog(type: "INFO" | "ERROR" | "WARN", ...args: unknown[]) {
  const timestamp = new Date().toISOString();
  const message = args.map(a => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ");
  const line = `[${timestamp}] [${type}] ${message}\n`;

  // Escribir en archivo
  fs.appendFile(logFile, line, err => {
    if (err) console.error("No se pudo escribir en el log:", err);
  });

  // También imprimir en consola
  switch (type) {
    case "INFO":
      console.log(line);
      break;
    case "ERROR":
      console.error(line);
      break;
    case "WARN":
      console.warn(line);
      break;
  }
}

export function logInfo(...args: unknown[]) {
  writeLog("INFO", ...args);
}

export function logError(...args: unknown[]) {
  writeLog("ERROR", ...args);
}

export function logWarn(...args: unknown[]) {
  writeLog("WARN", ...args);
}
