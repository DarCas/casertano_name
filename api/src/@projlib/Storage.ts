/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { bootstrap } from '@/@stdlib/environment'
import { mkdir } from '@/@stdlib/filesystem'
import { normalize } from 'node:path'

export const storage = mkdir(bootstrap.absPath('/@storage'))
export const storageTemplates = bootstrap.absPath('/src/templates')
export const storageWww = bootstrap.absPath('/../www')

export const getStorage = (path = '/'): string => normalize(`${storage}${path}`)
export const getStorageTemplates = (path: string = '/'): string => normalize(`${storageTemplates}${path}`)
export const getStorageWww = (path: string = '/'): string => normalize(`${storageWww}${path}`)
