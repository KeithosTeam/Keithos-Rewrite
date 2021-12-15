const express = require('express')
const config = require('../../../../config.json')
const pkg = require('../../../../package.json')
const Schema = require('../../../models/config')
const apiSchema = require('../../../models/api')
const { mem, cpu, os } = require('node-os-utils');
const token = config.api.token
const router = express.Router();

const { auth, authenticate, newToken} = require("../utils/utils")

router.get("/", async (req, res) => {
    if (auth(req) === 'OK') {
        const { totalMemMb, usedMemMb } = mem.info();
        const data = {
        "version": pkg.version,
        "discordJS": pkg.dependencies["discord.js"],
        "nodejs": pkg.dependencies["node"],
        "express": pkg.dependencies["express"],
        "mongoose": pkg.dependencies["mongoose"],
        "tio.js": pkg.dependencies["tio.js"],
        "license": pkg.license,
        "os": await os.oos(),
        "cpuModel": cpu.model(),
        "cpuCores": cpu.count(),
        "cpuUsage": await cpu.usage(),
        "ram": totalMemMb,
        "ramUsage": usedMemMb
  
  
          
      }
      
      res.json(data)
  

    } else {
      res.end("Auth failure\ncode 0")
    }
  });

module.exports = router;