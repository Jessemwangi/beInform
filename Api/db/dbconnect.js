'use strict'
import mysql from 'mysql'
import { dbConfigs } from './dbConfig'

export const db = mysql.createConnection(dbConfigs)