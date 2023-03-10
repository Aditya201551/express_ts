import dotenv from "dotenv";
dotenv.config();

const getEnvironmentVariables = (name: string, required = true) => {
  if (!process.env[name] && required) {
    throw new Error(`Couldn't find environment variables: ${name}}`);
  } else {
    return process.env[name];
  }
};

export const serverConfig={
    PORT: getEnvironmentVariables("PORT"),
}