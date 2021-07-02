const path = require('path');
const express = require('express');
const controller = require('./controller')

const router = express.Router()

router.post('share', controller.postShare)