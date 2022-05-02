/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list (alphabetical ordering) of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 * Crosslake
 - Pedro Sousa Barreto <pedrob@crosslaketech.com>

 --------------
 ******/

"use strict"

import express from "express";
import {ExpressRoutes} from "./routes";

import * as Configs from "./config";

import {ConsoleLogger, ILogger} from "@mojaloop/logging-bc-logging-client-lib";
import {AppConfiguration} from "@mojaloop/platform-configuration-bc-client-lib";

const logger: ILogger = new ConsoleLogger();
const app = express();

let routes: ExpressRoutes;

let appConfig:AppConfiguration;

function setupExpress() {

    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
}

function setupRoutes() {
    routes = new ExpressRoutes(logger);

    app.use("/", routes.MainRouter);

    app.use((req, res) => {
        // catch all
        res.send(404);
    });
}

async function start():Promise<void>{
    appConfig = Configs.getConfigObj();
    await appConfig.init();
    await appConfig.bootstrap(true);

    await appConfig.fetch();

    const httpPortParam = appConfig.getParam("service-http-port");
    if(!httpPortParam)
        throw new Error("Missing service-http-port param");

    const httpPort = httpPortParam.currentValue;
    setupExpress();
    setupRoutes();

    const server = app.listen(httpPort, () =>console.log(`🚀 Example server ready at: http://localhost:${httpPort}`));
}


async function _handle_int_and_term_signals(signal: NodeJS.Signals): Promise<void> {
    logger.info(`Service - ${signal} received - cleaning up...`);
    process.exit();
}

//catches ctrl+c event
process.on("SIGINT", _handle_int_and_term_signals.bind(this));

//catches program termination event
process.on("SIGTERM", _handle_int_and_term_signals.bind(this));

//do something when app is closing
process.on('exit', () => {
    logger.info("Example server - exiting...");
});


start().catch((err:unknown) => {
    logger.fatal(err);
});
