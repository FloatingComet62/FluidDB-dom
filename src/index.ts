import fetch from "node-fetch"
import Ocean from "./ocean"
import { Response } from './types'

class FluidDB {
    constructor(private link: string) {
        this.link = link
    }
    async db() {
        const res = await fetch(`${this.link}/`)
        return await res.json() as Response
    }
    async getOcean(name: string) {
        const res = await (await fetch(`${this.link}/ocean/${name}`)).json() as Response
        if (res.success) {
            const ocean = new Ocean(name, this.link, res.message)
            return { success: true, data: ocean, message: "Successfully retrieved ocean" }
        }
        return { success: false, data: null, message: "Failed to get ocean" }
    }
    async addOcean(name: string) {
        const res = await (await fetch(`${this.link}/ocean/${name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })).json() as Response
        if (res.success) {
            const ocean = new Ocean(name, this.link, res.message)
            return { success: true, data: ocean, message: "Successfully added ocean" }
        }
        return { success: false, data: null, message: "Failed to create ocean" }
    }
    async deleteOcean(name: string) {
        const res = await (await fetch(`${this.link}/ocean/${name}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })).json() as Response
        if (res.success) return { success: true, data: null, message: "Successfully deleted ocean" }
        return { success: false, data: null, message: "Failed to delete ocean" }
    }
}

export default FluidDB