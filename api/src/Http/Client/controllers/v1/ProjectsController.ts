/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import { getStorageProjects } from "@/@projlib/Storage";
import { captureException } from "@/@stdlib/debug";
import { extname } from "@/@stdlib/filesystem";
import { HttpCodes } from "@/@stdlib/network";
import { AbstractClientController } from "@/Http/Client/controllers/AbstractClientController";
import { projects } from "@/database/json/projects.json";
import { compact } from "lodash";
import { readdir, stat } from "node:fs/promises";
import { env } from "node:process";

class ProjectsController extends AbstractClientController {
    private projectsFiles: string[] = []

    constructor(
        private readonly storageProjects = getStorageProjects(),
        private readonly IMAGE_EXTS = new Set(["webp", "png", "jpg", "jpeg"]),
        private readonly VIDEO_EXTS = new Set(["mp4"]),
    ) {
        super()
    }

    async listAction(_: Client.Request, res: Client.Response) {
        try {
            if (!projects.length) {
                return res.sendStatus(HttpCodes[ 'No Content' ])
            }

            this.projectsFiles = await readdir(this.storageProjects)

            res.status(HttpCodes.Found)

            if (!this.projectsFiles.length) {
                return res.toJson(projects)
            }

            for (const project of projects) {
                project.media = await this.listProjectMedia(project.slug)
            }

            return res.toJson(projects)
        } catch (e) {
            await captureException(e)

            return res.status(HttpCodes[ "Internal Server Error" ])
                .toJson(( e as Error ).message)
        }
    }

    private async listProjectMedia(slug: string): Promise<Projects.Project.Media[]> {
        try {
            return compact(await Promise.all(
                this.projectsFiles
                    .map(async file => {
                        if (!file.startsWith(`${slug}.`)) {
                            return undefined
                        }

                        const ext = extname(file)

                        if (!this.IMAGE_EXTS.has(ext) &&
                            !this.VIDEO_EXTS.has(ext)
                        ) {
                            return undefined
                        }

                        const mtime = ( await stat(getStorageProjects(`/${file}`)) )
                            .mtimeMs
                            .toFixed(0)

                        const url = new URL(`/images/projects/${file}?${mtime}`, env.NEXT_PUBLIC_API)

                        return {
                            src: url.toString(),
                            type: this.IMAGE_EXTS.has(ext) ? 'image' : 'video',
                        } satisfies Projects.Project.Media
                    }),
            ))
        } catch {
            return []
        }
    }
}

export const projectsController = new ProjectsController()
